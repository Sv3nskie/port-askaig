/* ==========================================================================
   Port Askaig Hotel — hero slider
   Crossfade + slow Ken Burns zoom on the active slide. Autoplays every 6s,
   pauses on hover / focus / when the tab is hidden. Dots, arrows, keyboard
   (← →) and touch swipe. Respects prefers-reduced-motion: no autoplay, no
   zoom — the controls still work.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.querySelector('[data-slider]');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.slider__img'));
  if (slides.length < 2) return;

  var numEl = root.querySelector('[data-slider-num]');
  var captionEl = root.querySelector('[data-slider-caption]');
  var dotsEl = root.querySelector('[data-slider-dots]');
  var prevBtn = root.querySelector('[data-slider-prev]');
  var nextBtn = root.querySelector('[data-slider-next]');

  var INTERVAL = 6000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var current = 0;
  var paused = false;
  var timer = null;

  /* ── dots ──────────────────────────────────────────────────────────── */
  var dots = slides.map(function (slide, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slider__dot';
    dot.setAttribute('aria-label', 'Show image ' + (i + 1));
    dot.addEventListener('click', function () { go(i); restart(); });
    dotsEl.appendChild(dot);
    return dot;
  });

  var pad = function (n) { return String(n).padStart(2, '0'); };

  function render() {
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
    numEl.textContent = pad(current + 1) + ' / ' + pad(slides.length);
    captionEl.textContent = slides[current].dataset.caption || '';
  }

  function go(i) {
    var n = slides.length;
    current = ((i % n) + n) % n;
    render();
  }

  /* ── autoplay ──────────────────────────────────────────────────────── */
  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(function () {
      if (!paused && !document.hidden) go(current + 1);
    }, INTERVAL);
  }

  function restart() {
    clearInterval(timer);
    timer = null;
    start();
  }

  root.addEventListener('mouseenter', function () { paused = true; });
  root.addEventListener('mouseleave', function () { paused = false; });
  root.addEventListener('focusin', function () { paused = true; });
  root.addEventListener('focusout', function () { paused = false; });

  prevBtn.addEventListener('click', function () { go(current - 1); restart(); });
  nextBtn.addEventListener('click', function () { go(current + 1); restart(); });

  /* ── keyboard ──────────────────────────────────────────────────────── */
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { go(current - 1); restart(); e.preventDefault(); }
    if (e.key === 'ArrowRight') { go(current + 1); restart(); e.preventDefault(); }
  });

  /* ── swipe ─────────────────────────────────────────────────────────── */
  var touchX = null;
  root.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
    paused = true;
  }, { passive: true });

  root.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); restart(); }
    touchX = null;
    paused = false;
  }, { passive: true });

  render();
  start();
})();
