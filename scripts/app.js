(async function () {
  const selectors = {
    firstName: '[data-first-name]',
    lastName: '[data-last-name]',
    headline: '[data-headline]',
    availability: '[data-availability]',
    primaryCta: '[data-primary-cta]',
    secondaryCta: '[data-secondary-cta]',
    statCollection: '[data-stat-collection]',
    projects: '[data-projects]',
    capabilities: '[data-capabilities]',
    experience: '[data-experience]',
    growth: '[data-growth]',
    contactPitch: '[data-contact-pitch]',
    contactLinks: '[data-contact-links]',
    footerTagline: '[data-footer-tagline]'
  };

  const fetchResume = async () => {
    try {
      const response = await fetch('data/resume.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Resume request failed (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error('Unable to load resume data', error);
      return null;
    }
  };

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && typeof value === 'string') node.textContent = value;
  };

  const renderHero = (identity = {}) => {
    setText(selectors.firstName, identity.firstName || 'Edgar');
    setText(selectors.lastName, identity.lastName || 'Colmenero');
    setText(selectors.headline, identity.headline || 'Full-stack software engineer');
    setText(selectors.availability, identity.availability || 'Available for opportunities');
    setText(selectors.primaryCta, identity.cta?.primary || 'Explore Work');
    setText(selectors.secondaryCta, identity.cta?.secondary || 'Connect');
  };

  const renderStats = (stats = []) => {
    const container = document.querySelector(selectors.statCollection);
    if (!container) return;
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    stats.forEach((stat) => {
      const card = document.createElement('div');
      card.className = 'stat glass';

      const value = document.createElement('div');
      value.className = 'stat__value';
      value.dataset.counterId = stat.id;
      value.textContent = '0';
      value.dataset.targetValue = stat.value;
      if (stat.suffix) value.dataset.suffix = stat.suffix;

      const label = document.createElement('div');
      label.className = 'stat__label';
      label.textContent = stat.label;

      card.appendChild(value);
      card.appendChild(label);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  };

  const createPill = (text) => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = text;
    return pill;
  };

  const renderProjects = (projects = []) => {
    const container = document.querySelector(selectors.projects);
    if (!container) return;
    container.innerHTML = '';

    projects.slice(0, 2).forEach((project) => {
      const card = document.createElement('article');
      card.className = 'project-card';

      const meta = document.createElement('div');
      meta.className = 'project-card__meta';

      const titleGroup = document.createElement('div');
      const title = document.createElement('h3');
      title.className = 'project-card__title';
      title.textContent = project.title;

      const subtitle = document.createElement('p');
      subtitle.className = 'project-card__subtitle';
      subtitle.style.color = 'var(--text-muted)';
      subtitle.textContent = project.subtitle;

      titleGroup.appendChild(title);
      titleGroup.appendChild(subtitle);

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = project.status || 'Live';

      meta.appendChild(titleGroup);
      meta.appendChild(badge);

      const media = document.createElement('div');
      media.className = 'project-card__media';
      media.setAttribute('role', 'presentation');
      media.textContent = project.icon || '↗';

      const body = document.createElement('p');
      body.className = 'project-card__body';
      body.textContent = project.description;

      const pills = document.createElement('div');
      pills.className = 'pill-row';
      (project.tech || []).forEach((tech) => pills.appendChild(createPill(tech)));

      const outcome = document.createElement('div');
      outcome.className = 'outcome';
      outcome.textContent = project.outcome;

      card.appendChild(meta);
      card.appendChild(media);
      card.appendChild(body);
      card.appendChild(pills);
      card.appendChild(outcome);

      container.appendChild(card);
    });
  };

  const renderCapabilities = (items = []) => {
    const container = document.querySelector(selectors.capabilities);
    if (!container) return;
    container.innerHTML = '';

    items.forEach((capability) => {
      const card = document.createElement('article');
      card.className = 'capability-card';

      const title = document.createElement('h3');
      title.textContent = capability.title;

      const list = document.createElement('ul');
      capability.items?.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });

      card.appendChild(title);
      card.appendChild(list);
      container.appendChild(card);
    });
  };

  const renderExperience = (entries = []) => {
    const container = document.querySelector(selectors.experience);
    if (!container) return;
    container.innerHTML = '';

    entries.forEach((entry) => {
      const card = document.createElement('article');
      card.className = 'experience-card';

      const title = document.createElement('div');
      title.className = 'experience-card__title';
      title.textContent = entry.role;

      if (entry.type) {
        const pill = document.createElement('span');
        pill.className = 'pill';
        pill.textContent = entry.type;
        title.appendChild(pill);
      }

      const meta = document.createElement('div');
      meta.className = 'experience-card__meta';
      meta.textContent = `${entry.company} — ${entry.period}`;

      const summary = document.createElement('p');
      summary.textContent = entry.summary;
      summary.style.color = 'var(--text-muted)';

      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(summary);

      container.appendChild(card);
    });
  };

  const renderGrowth = (items = []) => {
    const container = document.querySelector(selectors.growth);
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'growth-item';

      const title = document.createElement('h3');
      title.textContent = item.phase;

      const summary = document.createElement('p');
      summary.textContent = item.summary;
      summary.style.color = 'var(--text-muted)';

      card.appendChild(title);
      card.appendChild(summary);
      container.appendChild(card);
    });
  };

  const renderContact = (contact = {}) => {
    const pitch = document.querySelector(selectors.contactPitch);
    if (pitch) pitch.textContent = contact.pitch || pitch.textContent;

    if (contact.headline) {
      const heading = document.querySelector('.contact-card__title');
      if (heading) heading.textContent = contact.headline;
    }

    const actions = document.querySelector(selectors.contactLinks);
    if (actions) {
      actions.innerHTML = '';
      (contact.links || []).forEach((link) => {
        const button = document.createElement('a');
        button.className = link.label === 'Email' ? 'button button--primary' : 'button button--ghost';
        button.href = link.href || '#';
        button.target = link.href?.startsWith('http') ? '_blank' : undefined;
        button.rel = link.href?.startsWith('http') ? 'noreferrer noopener' : undefined;
        button.textContent = link.label;
        actions.appendChild(button);
      });
    }
  };

  const renderFooter = (footer = {}) => {
    setText(selectors.footerTagline, footer.tagline || 'Product-minded Full-Stack Software Engineer');
    const footerLeft = document.querySelector('.footer__left span');
    if (footerLeft) footerLeft.textContent = `© ${footer.year || '2026'} Edgar Colmenero`;
  };

  const startCounters = (stats = []) => {
    const container = document.querySelector(selectors.statCollection);
    if (!container || !stats.length) return;

    const applyFinal = () => {
      stats.forEach((stat) => {
        const node = container.querySelector(`[data-counter-id="${stat.id}"]`);
        if (node) node.textContent = `${stat.value}${stat.suffix || ''}`;
      });
    };

    if (typeof Worker === 'undefined') {
      applyFinal();
      return;
    }

    let hasRun = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun) {
            hasRun = true;
            observer.disconnect();
            const worker = new Worker('scripts/counters.worker.js');
            worker.addEventListener('message', (event) => {
              const { id, value } = event.data || {};
              const node = container.querySelector(`[data-counter-id="${id}"]`);
              if (node && typeof value === 'number') {
                const suffix = node.dataset.suffix || '';
                node.textContent = `${value}${suffix}`;
              }
            });

            worker.addEventListener('error', () => {
              applyFinal();
              worker.terminate();
            });

            worker.postMessage({ type: 'start', stats });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(container);
  };

  const hydrate = async () => {
    const data = await fetchResume();
    if (!data) return;

    renderHero(data.identity);
    renderStats(data.identity?.stats || []);
    renderProjects(data.projects);
    renderCapabilities(data.capabilities);
    renderExperience(data.experience);
    renderGrowth(data.growth);
    renderContact(data.contact);
    renderFooter(data.footer);
    startCounters(data.identity?.stats || []);
  };

  document.addEventListener('DOMContentLoaded', hydrate);
})();
