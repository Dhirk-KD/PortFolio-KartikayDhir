/* =====================================================
   main.js - small interactive bits
   1. Mobile menu open/close
   2. Resume pop-up open/close
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

/* ---------- 2. Resume pop-up ---------- */
const dialog = document.getElementById('resume-dialog');

if (dialog) {
  const frame = document.getElementById('resume-frame');

  // Open: load the PDF the first time, then show the pop-up
  document.querySelectorAll('[data-resume-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!frame.getAttribute('src')) frame.setAttribute('src', frame.dataset.src);
      dialog.showModal();
    });
  });

  // Close: the Close button, or a click on the dark area around the pop-up
  dialog.querySelector('[data-resume-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}

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
