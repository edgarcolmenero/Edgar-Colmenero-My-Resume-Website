(() => {
  const fetchResume = async (path) => {
    try {
      const response = await fetch(path, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Unable to load resume data', error);
      return null;
    }
  };

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && typeof value === 'string') {
      node.textContent = value;
    }
  };

  const updateIdentity = (identity) => {
    if (!identity) return;
    const { descriptor, status, focus, metrics } = identity;

    setText('.top-bar__role', descriptor || 'Product engineer');
    setText('.identity-panel__descriptor', descriptor || 'Product-minded engineer');

    const statusNode = document.querySelector('[data-status="availability"]');
    if (statusNode) {
      statusNode.textContent = `Status: ${status || 'Open to opportunities'}`;
    }

    const setFactValue = (key, value) => {
      const factNode = document.querySelector(`[data-fact="${key}"] .fact__value`);
      if (factNode && value !== undefined && value !== null) {
        factNode.textContent = value;
      }
    };

    setFactValue('experience', metrics?.experience ?? '—');
    setFactValue('projects', metrics?.projects ?? '—');

    const focusValue = Array.isArray(focus) && focus.length
      ? focus.join(' · ')
      : 'Focused on thoughtful product engineering';
    setFactValue('focus', focusValue);
  };

  const applyCardChrome = (element) => {
    element.style.border = '1px solid var(--color-border)';
    element.style.background = 'var(--color-surface)';
    element.style.borderRadius = 'var(--radius-medium)';
    element.style.padding = 'var(--space-4)';
    element.style.transition = 'transform 160ms ease, background 160ms ease, box-shadow 160ms ease, border-color 160ms ease';
    element.addEventListener('pointerenter', () => {
      element.style.transform = 'translateY(-2px)';
      element.style.background = 'var(--color-surface-alt)';
      element.style.boxShadow = 'var(--shadow-soft)';
      element.style.borderColor = 'rgba(47, 122, 229, 0.4)';
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = 'translateY(0)';
      element.style.background = 'var(--color-surface)';
      element.style.boxShadow = 'none';
      element.style.borderColor = 'var(--color-border)';
    });
    element.addEventListener('focus', () => {
      element.style.transform = 'translateY(-2px)';
      element.style.background = 'var(--color-surface-alt)';
      element.style.boxShadow = 'var(--shadow-soft)';
      element.style.borderColor = 'rgba(47, 122, 229, 0.5)';
      element.style.outline = 'none';
    });
    element.addEventListener('blur', () => {
      element.style.transform = 'translateY(0)';
      element.style.background = 'var(--color-surface)';
      element.style.boxShadow = 'none';
      element.style.borderColor = 'var(--color-border)';
    });
  };

  const renderTimeline = (entries = []) => {
    const container = document.querySelector('[data-collection="timeline"]');
    if (!container) return;
    container.innerHTML = '';

    if (!entries.length) {
      const fallback = document.createElement('p');
      fallback.textContent = 'Timeline data will appear here once available.';
      container.appendChild(fallback);
      return;
    }

    const fragment = document.createDocumentFragment();

    entries.forEach((entry) => {
      const card = document.createElement('article');
      card.className = 'timeline-item';
      card.tabIndex = 0;
      applyCardChrome(card);

      const heading = document.createElement('div');
      heading.style.display = 'flex';
      heading.style.justifyContent = 'space-between';
      heading.style.alignItems = 'flex-start';
      heading.style.gap = 'var(--space-3)';

      const title = document.createElement('h3');
      title.textContent = entry.title;
      title.style.margin = '0';

      const time = document.createElement('span');
      time.textContent = entry.time;
      time.style.color = 'var(--color-muted)';
      time.style.fontSize = '0.95rem';

      heading.appendChild(title);
      heading.appendChild(time);

      const organization = document.createElement('p');
      organization.textContent = entry.organization;
      organization.style.fontWeight = '600';
      organization.style.color = 'var(--color-text)';

      const impact = document.createElement('p');
      impact.textContent = entry.impact;
      impact.style.marginTop = 'var(--space-2)';

      const tags = document.createElement('div');
      tags.setAttribute('aria-label', 'Skills and tools');
      tags.style.display = 'flex';
      tags.style.flexWrap = 'wrap';
      tags.style.gap = 'var(--space-2)';
      (entry.tags || []).forEach((tagText) => {
        const tag = document.createElement('span');
        tag.textContent = tagText;
        tag.style.padding = '2px 8px';
        tag.style.borderRadius = '999px';
        tag.style.background = 'rgba(47, 122, 229, 0.12)';
        tag.style.color = 'var(--color-accent)';
        tag.style.fontWeight = '600';
        tag.style.fontSize = '0.85rem';
        tags.appendChild(tag);
      });

      card.appendChild(heading);
      card.appendChild(organization);
      card.appendChild(impact);
      card.appendChild(tags);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  };

  const renderProjects = (projects = []) => {
    const container = document.querySelector('[data-collection="projects"]');
    if (!container) return;
    container.innerHTML = '';

    if (!projects.length) {
      const fallback = document.createElement('p');
      fallback.textContent = 'Projects will populate soon.';
      container.appendChild(fallback);
      return;
    }

    const fragment = document.createDocumentFragment();

    projects.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.tabIndex = 0;
      applyCardChrome(card);

      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'flex-start';
      header.style.gap = 'var(--space-3)';

      const name = document.createElement('h3');
      name.textContent = project.name;
      name.style.margin = '0';

      const status = document.createElement('span');
      status.textContent = project.status;
      status.style.textTransform = 'capitalize';
      status.style.fontWeight = '600';
      status.style.fontSize = '0.9rem';
      status.style.color = 'var(--color-accent)';

      header.appendChild(name);
      header.appendChild(status);

      const description = document.createElement('p');
      description.textContent = project.description;

      const stack = document.createElement('p');
      stack.textContent = (project.stack || []).join(' · ');
      stack.style.fontWeight = '600';
      stack.style.color = 'var(--color-text)';

      const outcome = document.createElement('p');
      outcome.textContent = project.outcome;
      outcome.style.marginTop = 'var(--space-2)';

      card.appendChild(header);
      card.appendChild(description);
      card.appendChild(stack);
      card.appendChild(outcome);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  };

  const renderAccomplishments = (metrics) => {
    const list = document.querySelector('[data-collection="accomplishments"]');
    if (!list) return;
    list.innerHTML = '';

    const metricItems = [
      {
        id: 'experience',
        label: 'Years of experience',
        context: 'Building resilient web products and leading cross-functional pods.',
        value: metrics?.experience ?? 0,
      },
      {
        id: 'projects',
        label: 'Projects shipped',
        context: 'End-to-end deliveries across analytics, commerce, and civic tech.',
        value: metrics?.projects ?? 0,
      },
      {
        id: 'technologies',
        label: 'Technologies leveraged',
        context: 'Balanced engineering depth with accessible, maintainable design.',
        value: metrics?.technologies ?? 0,
      },
    ];

    const fragment = document.createDocumentFragment();

    metricItems.forEach((item) => {
      const row = document.createElement('li');
      row.className = 'accomplishment-item';
      row.style.display = 'grid';
      row.style.gridTemplateColumns = '1fr auto';
      row.style.alignItems = 'center';
      row.style.gap = 'var(--space-2)';
      row.style.padding = 'var(--space-3)';
      row.style.border = '1px solid var(--color-border)';
      row.style.borderRadius = 'var(--radius-medium)';
      row.style.background = 'var(--color-surface-alt)';

      const textGroup = document.createElement('div');
      textGroup.style.display = 'grid';
      textGroup.style.gap = '2px';

      const label = document.createElement('span');
      label.textContent = item.label;
      label.style.fontWeight = '700';
      label.style.color = 'var(--color-text)';

      const context = document.createElement('span');
      context.textContent = item.context;
      context.style.color = 'var(--color-muted)';
      context.style.fontSize = '0.95rem';

      textGroup.appendChild(label);
      textGroup.appendChild(context);

      const value = document.createElement('span');
      value.dataset.counterId = item.id;
      value.textContent = '0';
      value.style.fontSize = '1.4rem';
      value.style.fontWeight = '700';
      value.style.color = 'var(--color-accent)';
      value.setAttribute('aria-live', 'polite');

      row.appendChild(textGroup);
      row.appendChild(value);
      fragment.appendChild(row);
    });

    list.appendChild(fragment);
    startCounters(metricItems);
  };

  const renderRoadmap = (items = []) => {
    const container = document.querySelector('[data-collection="roadmap"]');
    if (!container) return;
    container.innerHTML = '';

    if (!items.length) {
      const fallback = document.createElement('p');
      fallback.textContent = 'Roadmap will be published here.';
      container.appendChild(fallback);
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'roadmap-item';
      card.tabIndex = 0;
      applyCardChrome(card);

      const phase = document.createElement('h3');
      phase.textContent = item.phase;
      phase.style.marginBottom = 'var(--space-2)';

      const summary = document.createElement('p');
      summary.textContent = item.summary;

      card.appendChild(phase);
      card.appendChild(summary);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  };

  const startCounters = (metricItems) => {
    const list = document.querySelector('[data-collection="accomplishments"]');
    if (!list || !Array.isArray(metricItems)) return;

    const applyFinalValues = () => {
      metricItems.forEach((item) => {
        const node = list.querySelector(`[data-counter-id="${item.id}"]`);
        if (node) node.textContent = String(item.value);
      });
    };

    if (typeof Worker === 'undefined') {
      applyFinalValues();
      return;
    }

    const worker = new Worker('scripts/counters.worker.js');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pending = new Set(metricItems.map((item) => item.id));

    worker.addEventListener('message', (event) => {
      const { id, value } = event.data || {};
      if (!id) return;
      const node = list.querySelector(`[data-counter-id="${id}"]`);
      if (node && typeof value === 'number') {
        node.textContent = String(value);
        const targetValue = metricItems.find((item) => item.id === id)?.value ?? value;
        if (value >= targetValue) {
          pending.delete(id);
          if (pending.size === 0) {
            worker.terminate();
          }
        }
      }
    });

    worker.addEventListener('error', () => {
      applyFinalValues();
      worker.terminate();
    });

    worker.postMessage({
      type: 'start',
      metrics: metricItems.map((item) => ({ id: item.id, value: item.value })),
      reducedMotion,
    });
  };

  const hydrate = async () => {
    const data = await fetchResume('data/resume.json');
    if (!data) return;

    updateIdentity(data.identity);
    renderTimeline(data.timeline);
    renderProjects(data.projects);
    renderAccomplishments(data.identity?.metrics);
    renderRoadmap(data.roadmap);
  };

  document.addEventListener('DOMContentLoaded', hydrate);
})();
