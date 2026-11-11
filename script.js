// ================================================================
// Gabriel Ceballos — site one-page
// Interações: menu fixo, scroll suave, reveal, cards expansíveis,
// highlight do link ativo, menu mobile.
// ================================================================

(function () {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav__links a');

  // Nav com borda ao rolar
  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
      mobileMenu.classList.toggle('is-open', !open);
    });
    // Fecha ao clicar num link
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        mobileMenu.classList.remove('is-open');
      });
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // Cards: expand/collapse
  document.querySelectorAll('.card__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      const full = card.querySelector('.card__full');
      const excerpt = card.querySelector('.card__excerpt');
      const isOpen = card.classList.toggle('is-open');
      if (isOpen) {
        full.hidden = false;
        excerpt.style.display = 'none';
        btn.setAttribute('aria-expanded', 'true');
      } else {
        full.hidden = true;
        excerpt.style.display = '';
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Highlight link ativo conforme seção visível
  const sections = ['#servico', '#na-pratica', '#como-funciona', '#planos', '#quem-escreve']
    .map(id => document.querySelector(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const map = new Map();
    navLinks.forEach(l => map.set(l.getAttribute('href'), l));
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach(l => l.classList.remove('is-active'));
          const link = map.get(id);
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => io2.observe(s));
  }

  // Ano no footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
