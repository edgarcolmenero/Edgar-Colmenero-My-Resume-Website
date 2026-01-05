(() => {
  const headerPill = document.querySelector('.header-pill');
  const navLinks = document.querySelectorAll('.nav__link');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;

  const closeMenu = () => {
    if (navMenu) navMenu.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  };

  const handleNavClick = (event) => {
    const link = event.target.closest('a');
    if (!link || !link.hash) return;
    const target = document.querySelector(link.hash);
    if (!target) return;
    event.preventDefault();

    const offset = (headerPill?.getBoundingClientRect().height || 0) + 18;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    closeMenu();
  };

  const observeScroll = () => {
    if (!headerPill) return;
    const toggleClass = () => {
      const scrolled = window.scrollY > 12;
      headerPill.classList.toggle('is-scrolled', scrolled);
    };
    document.addEventListener('scroll', toggleClass, { passive: true });
    toggleClass();
  };

  const initNav = () => {
    navLinks.forEach((link) => link.addEventListener('click', handleNavClick));

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        body.classList.toggle('nav-open', isOpen);
      });
    }

    document.addEventListener('click', (event) => {
      if (!navMenu || !navToggle) return;
      if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    observeScroll();
  });
})();
