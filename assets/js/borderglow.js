/**
 * BorderGlow — vanilla JS port of the React BorderGlow component.
 * Attach to any element that has the class "border-glow-card".
 */
(function () {
  const COLORS = ['#c084fc', '#f472b6', '#38bdf8'];
  const GRADIENT_POSITIONS = ['80% 55%','69% 34%','8% 6%','41% 38%','86% 85%','82% 18%','51% 4%'];
  const GRADIENT_KEYS = ['--gradient-one','--gradient-two','--gradient-three','--gradient-four','--gradient-five','--gradient-six','--gradient-seven'];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

  function setGradientVars(el) {
    for (let i = 0; i < 7; i++) {
      const c = COLORS[COLOR_MAP[i]];
      el.style.setProperty(GRADIENT_KEYS[i], `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
    }
    el.style.setProperty('--gradient-base', `linear-gradient(${COLORS[0]} 0 100%)`);
  }

  function getCenter(el) {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }

  function getEdgeProximity(el, x, y) {
    const [cx, cy] = getCenter(el);
    const dx = x - cx, dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }

  function getCursorAngle(el, x, y) {
    const [cx, cy] = getCenter(el);
    const dx = x - cx, dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    return deg;
  }

  function initCard(card) {
    // inject edge-light span if missing
    if (!card.querySelector('.edge-light')) {
      const span = document.createElement('span');
      span.className = 'edge-light';
      card.prepend(span);
    }
    // wrap children (except edge-light) in border-glow-inner if not already wrapped
    if (!card.querySelector('.border-glow-inner')) {
      const inner = document.createElement('div');
      inner.className = 'border-glow-inner';
      Array.from(card.children).forEach(child => {
        if (!child.classList.contains('edge-light')) inner.appendChild(child);
      });
      card.appendChild(inner);
    }

    setGradientVars(card);

    card.addEventListener('pointermove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);
      card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
      card.style.setProperty('--cursor-angle', angle.toFixed(3) + 'deg');
    });

    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--edge-proximity', '0');
    });
  }

  function init() {
    document.querySelectorAll('.border-glow-card').forEach(initCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
