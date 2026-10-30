/* =====================================================
   main.js - small interactive bits
   1. Mobile menu open/close
   2. Contact form: check, then send through Formspree
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

/* ---------- 2. Contact form ---------- */
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();                                   // we send it ourselves below
    const errorBox = document.getElementById('form-error');
    const status   = document.getElementById('form-status');
    const name     = form.elements['name'].value.trim();
    const email    = form.elements['email'].value.trim();
    const message  = form.elements['message'].value.trim();

    errorBox.textContent = '';
    status.hidden = true;

    // Check the fields first
    if (!name || !message) {
      errorBox.textContent = 'Please fill in your name and message.';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errorBox.textContent = 'Please enter a valid email address.';
      return;
    }

    // Reminder if the Formspree id has not been added yet
    if (form.action.includes('YOUR_FORM_ID')) {
      errorBox.textContent = 'The form is not set up yet. Please email me directly.';
      return;
    }

    // Send to Formspree
    try {
      const reply = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (reply.ok) {
        form.reset();
        status.className = 'notice ok';
        status.textContent = 'Thanks, your message was sent.';
      } else {
        status.className = 'notice bad';
        status.textContent = 'The message could not be sent. Please email me directly.';
      }
    } catch (err) {
      status.className = 'notice bad';
      status.textContent = 'The message could not be sent. Please email me directly.';
    }
    status.hidden = false;
  });
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
