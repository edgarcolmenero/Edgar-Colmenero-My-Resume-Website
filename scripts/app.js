(function () {
  const nav = document.querySelector('.top-bar__nav');
  const panels = Array.from(document.querySelectorAll('.content-panel'));
  const buttons = nav ? Array.from(nav.querySelectorAll('.nav-button')) : [];
  const defaultSection = 'timeline';

  const setActiveSection = (section) => {
    if (!section) return;

    panels.forEach((panel) => {
      const isMatch = panel.dataset.section === section;
      panel.classList.toggle('is-active', isMatch);
    });

    buttons.forEach((button) => {
      const isMatch = button.dataset.target === section;
      button.classList.toggle('is-active', isMatch);
    });
  };

  const handleNavClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('.nav-button');
    if (!button || !nav?.contains(button)) return;
    const section = button.dataset.target;
    setActiveSection(section);
  };

  if (nav) {
    nav.addEventListener('click', handleNavClick);
  }

  setActiveSection(defaultSection);
})();
