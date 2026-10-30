/* =====================================================
   main.js - small interactive bits
   1. Mobile menu open/close
   2. Pop-ups open/close
   ===================================================== */

/* ---------- 1. Mobile menu ---------- */
const menuBtn = document.querySelector('.menu-btn');
const menu    = document.getElementById('menu');

if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

/* ---------- 2. Pop-ups (resume, project PDF, network topology) ----------
   A button with data-dialog-open="some-id" opens <dialog id="some-id">.
   A button with data-dialog-close, or a click on the dark area, closes it. */
document.querySelectorAll('[data-dialog-open]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const box = document.getElementById(btn.dataset.dialogOpen);
    if (box) box.showModal();
  });
});

document.querySelectorAll('dialog').forEach((box) => {
  box.querySelectorAll('[data-dialog-close]').forEach((b) => b.addEventListener('click', () => box.close()));
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
});

/* ---------- 3. 3D tilt on hover (mouse only, off for reduced motion) ---------- */
const canTilt = window.matchMedia('(hover: hover)').matches &&
                !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canTilt) {
  document.querySelectorAll('.card, .job-card, .cert-fig img').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const box = el.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width  - 0.5;   // -0.5 to 0.5
      const y = (e.clientY - box.top)  / box.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}
