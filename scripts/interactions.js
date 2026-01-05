(() => {
  const header = document.querySelector('.floating-header');

  const handleNavClick = (event) => {
    const link = event.target.closest('a');
    if (!link || !link.hash) return;
    const target = document.querySelector(link.hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const observeScroll = () => {
    if (!header) return;
    const toggleClass = () => {
      const scrolled = window.scrollY > 12;
      header.style.background = scrolled
        ? 'rgba(15, 18, 32, 0.88)'
        : 'rgba(15, 18, 32, 0.7)';
      header.style.borderColor = scrolled ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.12)';
    };
    document.addEventListener('scroll', toggleClass, { passive: true });
    toggleClass();
  };

  const initNav = () => {
    document.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', handleNavClick);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    observeScroll();
  });
})();
