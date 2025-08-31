// Page on-load reveal
document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');
  if (page) requestAnimationFrame(() => page.classList.add('is-visible'));

  // Reveal-on-scroll for elements with [data-reveal]
  const els = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.transform = 'translateY(0)';
          e.target.style.opacity = '1';
          e.target.style.transition = 'opacity .5s ease, transform .5s ease';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      io.observe(el);
    });
  } else {
    els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

  // Theme toggle (optional): add a button with id="theme-toggle" anywhere
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.dataset.theme = saved;
    else document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';

    toggle.addEventListener('click', () => {
      const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }
});
