/**
 * LogoLoop — vanilla JS scrolling marquee for social links.
 * Targets any element with class "logoloop".
 */
(function () {
  const SMOOTH_TAU = 0.25;
  const COPIES = 4;

  function initLoop(container) {
    const track = container.querySelector('.logoloop__track');
    const firstList = container.querySelector('.logoloop__list');
    if (!track || !firstList) return;

    // Clone the list enough times to fill + overflow
    for (let i = 1; i < COPIES; i++) {
      const clone = firstList.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }

    const speed = parseFloat(container.dataset.speed) || 60; // px/s — negative = reverse
    const hoverSpeed = parseFloat(container.dataset.hoverSpeed ?? '0');

    let seqWidth = 0;
    let offset = 0;
    let velocity = 0;
    let targetVelocity = speed; // negative speed scrolls right
    let isHovered = false;
    let lastTs = null;
    let rafId = null;

    function measure() {
      seqWidth = firstList.getBoundingClientRect().width;
    }
    measure();
    window.addEventListener('resize', measure);

    track.addEventListener('mouseenter', () => { isHovered = true; });
    track.addEventListener('mouseleave', () => { isHovered = false; });

    function tick(ts) {
      rafId = requestAnimationFrame(tick);
      if (lastTs === null) { lastTs = ts; }
      const dt = Math.min((ts - lastTs) / 1000, 0.1);
      lastTs = ts;

      const target = isHovered ? hoverSpeed : targetVelocity;
      const ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocity += (target - velocity) * ease;

      if (seqWidth > 0) {
        offset = ((offset + velocity * dt) % seqWidth + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
    }

    // Pause when off-screen
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        lastTs = null;
        rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
      }
    });
    obs.observe(container);
  }

  function init() {
    document.querySelectorAll('.logoloop').forEach(initLoop);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
