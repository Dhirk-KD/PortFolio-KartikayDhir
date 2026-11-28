/* =====================================================
   main.js - small interactive bits
   1. Mobile menu open/close
   2. Pop-ups (resume, project PDFs, diagrams)
   3. 3D tilt on hover
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

/* ---------- 2. Pop-ups ----------
   A button with data-dialog-open="some-id" opens <dialog id="some-id">.
   A button with data-dialog-close, or a click on the dark area, closes it. */
document.querySelectorAll('[data-dialog-open]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const box = document.getElementById(btn.dataset.dialogOpen);
    const parent = btn.closest('dialog');            // a button inside a pop-up closes that pop-up first
    if (parent && parent !== box) parent.close();
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
  document.querySelectorAll('.card, .job-card:not(.p-card), .cert-fig img').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const box = el.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width  - 0.5;
      const y = (e.clientY - box.top)  / box.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ---------- 4. Projects page: filter buttons + 3D tilt with shine on the cards ---------- */
document.querySelectorAll('.chip-btn').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.chip-btn').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    const f = b.dataset.filter;
    document.querySelectorAll('.p-card').forEach((c) => c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
  });
});

if (canTilt) {
  document.querySelectorAll('.p-card').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-8px)`;
      const g = el.querySelector('.glare');
      if (g) { g.style.setProperty('--gx', ((x + 0.5) * 100) + '%'); g.style.setProperty('--gy', ((y + 0.5) * 100) + '%'); }
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}
