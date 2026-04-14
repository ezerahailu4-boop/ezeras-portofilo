/**
 * Galaxy WebGL background — vanilla JS port of the React Galaxy component.
 * Mounts a full-size canvas inside any element with id="galaxy-bg".
 */
(function () {
  const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}`;

  const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071,-0.7071,0.7071,0.7071)
#define PERIOD 3.0

float Hash21(vec2 p){
  p=fract(p*vec2(123.34,456.21));
  p+=dot(p,p+45.32);
  return fract(p.x*p.y);
}
float tri(float x){ return abs(fract(x)*2.0-1.0); }
float tris(float x){ float t=fract(x); return 1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0)); }
float trisn(float x){ float t=fract(x); return 2.0*(1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0)))-1.0; }

vec3 hsv2rgb(vec3 c){
  vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
  vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);
  return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);
}

float Star(vec2 uv,float flare){
  float d=length(uv);
  float m=(0.05*uGlowIntensity)/d;
  float rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));
  m+=rays*flare*uGlowIntensity;
  uv*=MAT45;
  rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));
  m+=rays*0.3*flare*uGlowIntensity;
  m*=smoothstep(1.0,0.2,d);
  return m;
}

vec3 StarLayer(vec2 uv){
  vec3 col=vec3(0.0);
  vec2 gv=fract(uv)-0.5;
  vec2 id=floor(uv);
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 offset=vec2(float(x),float(y));
      vec2 si=id+vec2(float(x),float(y));
      float seed=Hash21(si);
      float size=fract(seed*345.32);
      float glossLocal=tri(uStarSpeed/(PERIOD*seed+1.0));
      float flareSize=smoothstep(0.9,1.0,size)*glossLocal;
      float red=smoothstep(STAR_COLOR_CUTOFF,1.0,Hash21(si+1.0))+STAR_COLOR_CUTOFF;
      float blu=smoothstep(STAR_COLOR_CUTOFF,1.0,Hash21(si+3.0))+STAR_COLOR_CUTOFF;
      float grn=min(red,blu)*seed;
      vec3 base=vec3(red,grn,blu);
      float hue=atan(base.g-base.r,base.b-base.r)/(2.0*3.14159)+0.5;
      hue=fract(hue+uHueShift/360.0);
      float sat=length(base-vec3(dot(base,vec3(0.299,0.587,0.114))))*uSaturation;
      float val=max(max(base.r,base.g),base.b);
      base=hsv2rgb(vec3(hue,sat,val));
      vec2 pad=vec2(tris(seed*34.0+uTime*uSpeed/10.0),tris(seed*38.0+uTime*uSpeed/30.0))-0.5;
      float star=Star(gv-offset-pad,flareSize);
      float twinkle=trisn(uTime*uSpeed+seed*6.2831)*0.5+1.0;
      twinkle=mix(1.0,twinkle,uTwinkleIntensity);
      star*=twinkle;
      col+=star*size*base;
    }
  }
  return col;
}

void main(){
  vec2 focalPx=uFocal*uResolution.xy;
  vec2 uv=(vUv*uResolution.xy-focalPx)/uResolution.y;
  vec2 mouseNorm=uMouse-vec2(0.5);
  if(uAutoCenterRepulsion>0.0){
    vec2 centerUV=vec2(0.0,0.0);
    float centerDist=length(uv-centerUV);
    vec2 repulsion=normalize(uv-centerUV)*(uAutoCenterRepulsion/(centerDist+0.1));
    uv+=repulsion*0.05;
  } else if(uMouseRepulsion){
    vec2 mousePosUV=(uMouse*uResolution.xy-focalPx)/uResolution.y;
    float mouseDist=length(uv-mousePosUV);
    vec2 repulsion=normalize(uv-mousePosUV)*(uRepulsionStrength/(mouseDist+0.1));
    uv+=repulsion*0.05*uMouseActiveFactor;
  } else {
    uv+=mouseNorm*0.1*uMouseActiveFactor;
  }
  float autoRotAngle=uTime*uRotationSpeed;
  mat2 autoRot=mat2(cos(autoRotAngle),-sin(autoRotAngle),sin(autoRotAngle),cos(autoRotAngle));
  uv=autoRot*uv;
  uv=mat2(uRotation.x,-uRotation.y,uRotation.y,uRotation.x)*uv;
  vec3 col=vec3(0.0);
  for(float i=0.0;i<1.0;i+=1.0/NUM_LAYER){
    float depth=fract(i+uStarSpeed*uSpeed);
    float scale=mix(20.0*uDensity,0.5*uDensity,depth);
    float fade=depth*smoothstep(1.0,0.9,depth);
    col+=StarLayer(uv*scale+i*453.32)*fade;
  }
  gl_FragColor=vec4(col,1.0);
}`;

  function compileShader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  function createProgram(gl, vert, frag) {
    const p = gl.createProgram();
    gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, vert));
    gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    return p;
  }

  function initGalaxy(container) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:block;';
    container.prepend(canvas);

    const gl = canvas.getContext('webgl', { alpha: false });
    if (!gl) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    const uvLoc  = gl.getAttribLocation(program, 'uv');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    // uv same as position mapped 0-1
    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 2,0, 0,2]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const U = {};
    ['uTime','uResolution','uFocal','uRotation','uStarSpeed','uDensity',
     'uHueShift','uSpeed','uMouse','uGlowIntensity','uSaturation',
     'uMouseRepulsion','uTwinkleIntensity','uRotationSpeed','uRepulsionStrength',
     'uMouseActiveFactor','uAutoCenterRepulsion'].forEach(n => {
      U[n] = gl.getUniformLocation(program, n);
    });

    // Settings
    const cfg = {
      focal: [0.5, 0.5],
      rotation: [1.0, 0.0],
      starSpeed: 0.5,
      density: 1.0,
      hueShift: 260,      // purple-ish to match portfolio
      speed: 1.0,
      glowIntensity: 0.35,
      saturation: 0.6,
      mouseRepulsion: true,
      twinkleIntensity: 0.4,
      rotationSpeed: 0.05,
      repulsionStrength: 2.0,
      autoCenterRepulsion: 0.0,
    };

    let targetMouse = { x: 0.5, y: 0.5 };
    let smoothMouse = { x: 0.5, y: 0.5 };
    let targetActive = 0, smoothActive = 0;

    function resize() {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform3f(U.uResolution, w, h, w / h);
    }
    resize();
    window.addEventListener('resize', resize);

    // Set static uniforms
    gl.uniform2fv(U.uFocal, cfg.focal);
    gl.uniform2fv(U.uRotation, cfg.rotation);
    gl.uniform1f(U.uDensity, cfg.density);
    gl.uniform1f(U.uHueShift, cfg.hueShift);
    gl.uniform1f(U.uSpeed, cfg.speed);
    gl.uniform1f(U.uGlowIntensity, cfg.glowIntensity);
    gl.uniform1f(U.uSaturation, cfg.saturation);
    gl.uniform1i(U.uMouseRepulsion, cfg.mouseRepulsion ? 1 : 0);
    gl.uniform1f(U.uTwinkleIntensity, cfg.twinkleIntensity);
    gl.uniform1f(U.uRotationSpeed, cfg.rotationSpeed);
    gl.uniform1f(U.uRepulsionStrength, cfg.repulsionStrength);
    gl.uniform1f(U.uAutoCenterRepulsion, cfg.autoCenterRepulsion);

    // Mouse
    container.addEventListener('mousemove', function (e) {
      const r = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - r.left) / r.width;
      targetMouse.y = 1.0 - (e.clientY - r.top) / r.height;
      targetActive = 1.0;
    });
    container.addEventListener('mouseleave', function () { targetActive = 0.0; });

    let animId;
    function render(t) {
      animId = requestAnimationFrame(render);
      const time = t * 0.001;
      const lf = 0.05;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * lf;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * lf;
      smoothActive  += (targetActive  - smoothActive)  * lf;

      gl.uniform1f(U.uTime, time);
      gl.uniform1f(U.uStarSpeed, (time * cfg.starSpeed) / 10.0);
      gl.uniform2f(U.uMouse, smoothMouse.x, smoothMouse.y);
      gl.uniform1f(U.uMouseActiveFactor, smoothActive);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    animId = requestAnimationFrame(render);

    // Pause when off-screen for performance
    const obs = new IntersectionObserver(entries => {
      entries[0].isIntersecting
        ? (animId = requestAnimationFrame(render))
        : cancelAnimationFrame(animId);
    });
    obs.observe(container);
  }

  function init() {
    const el = document.getElementById('galaxy-bg');
    if (el) initGalaxy(el);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
