const revealItems = document.querySelectorAll('.reveal');
const nav = document.querySelector('.nav');

const setDelay = (element) => {
  const delay = element.getAttribute('data-delay');
  if (delay) {
    element.style.transitionDelay = `${delay}s`;
  }
};

revealItems.forEach(setDelay);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => {
  observer.observe(item);
});

const updateNavState = () => {
  if (!nav) {
    return;
  }
  nav.classList.toggle('nav--scrolled', window.scrollY > 10);
};

window.addEventListener('scroll', updateNavState, { passive: true });

window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal').forEach((item) => {
    item.classList.add('is-visible');
  });
  updateNavState();
});
