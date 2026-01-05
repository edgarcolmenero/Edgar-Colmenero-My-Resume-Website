(() => {
  let resumeCache = null;

  const fetchResume = async (path) => {
    if (resumeCache) return resumeCache;

    try {
      const response = await fetch(path, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      const parsed = await response.json();
      resumeCache = parsed;
      return parsed;
    } catch (error) {
      console.error('Unable to load resume data', error);
      const fallback = document.querySelector('[data-status="availability"]');
      if (fallback) fallback.textContent = 'Status: Loading interrupted — try refreshing.';
      return null;
    }
  };

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && typeof value === 'string') {
      node.textContent = value;
    }
  };

  const formatNumber = (value) => {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
      return numericValue % 1 === 0 ? `${numericValue}` : numericValue.toFixed(1);
    }
    if (typeof value === 'string' && value.trim()) return value;
    return '—';
  };

  const createTimelineMarker = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '32');
    svg.setAttribute('viewBox', '0 0 16 32');
    svg.setAttribute('aria-hidden', 'true');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '8');
    line.setAttribute('y1', '0');
    line.setAttribute('x2', '8');
    line.setAttribute('y2', '32');
    line.setAttribute('stroke', 'var(--color-border-strong)');
    line.setAttribute('stroke-width', '1.25');
    line.setAttribute('stroke-linecap', 'round');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '8');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '5');
    circle.setAttribute('fill', 'var(--color-surface)');
    circle.setAttribute('stroke', 'var(--color-accent)');
    circle.setAttribute('stroke-width', '2');

    svg.appendChild(line);
    svg.appendChild(circle);
    return svg;
  };

  const createBadge = (text) => {
    const tag = document.createElement('span');
    tag.textContent = text;
    tag.style.padding = '2px 8px';
    tag.style.borderRadius = '999px';
    tag.style.background = 'rgba(47, 122, 229, 0.12)';
    tag.style.color = 'var(--color-accent)';
    tag.style.fontWeight = '600';
    tag.style.fontSize = '0.9rem';
    return tag;
  };

  const startDescriptorCycle = (descriptor, focus) => {
    const roleNode = document.querySelector('.top-bar__role');
    const descriptorNode = document.querySelector('.identity-panel__descriptor');
    if (!roleNode || !descriptorNode) return;

    const focusLine = Array.isArray(focus) && focus.length ? `Building for ${focus[0].toLowerCase()}` : null;
    const options = [descriptor, 'Systems-focused product engineer', 'Delivery-minded technologist', focusLine]
      .filter((text) => typeof text === 'string' && text.trim())
      .filter((text, index, arr) => arr.indexOf(text) === index);

    if (!options.length) return;

    roleNode.textContent = options[0];
    descriptorNode.textContent = options[0];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (options.length === 1 || prefersReducedMotion) return;

    let index = 0;
    setInterval(() => {
      index = (index + 1) % options.length;
      const next = options[index];
      roleNode.textContent = next;
      descriptorNode.textContent = next;
    }, 14000);
  };

  const updateIdentity = (identity) => {
    if (!identity) return;
    const { descriptor, status, focus, metrics } = identity;

    const descriptorCopy = descriptor || 'Product-minded engineer';
    setText('.top-bar__role', descriptorCopy);
    setText('.identity-panel__descriptor', descriptorCopy);

    const statusNode = document.querySelector('[data-status="availability"]');
    if (statusNode) {
      const statusCopy = status || 'Available for thoughtful product teams';
      const now = new Date();
      const daytime = now.getHours();
      const micro = daytime < 12 ? 'Morning build window' : daytime < 18 ? 'Afternoon delivery mode' : 'Evening polish hour';
      statusNode.textContent = `Status: ${statusCopy} — ${micro}`;
    }

    const setFactValue = (key, value) => {
      const factNode = document.querySelector(`[data-fact="${key}"] .fact__value`);
      if (factNode && value !== undefined && value !== null) {
        factNode.textContent = formatNumber(value);
      }
    };

    setFactValue('experience', metrics?.experience ?? '—');
    setFactValue('projects', metrics?.projects ?? '—');

    const focusValue = Array.isArray(focus) && focus.length ? focus.join(' · ') : 'Focused on thoughtful product engineering';
    setFactValue('focus', focusValue);

    const focusList = document.querySelector('.identity-panel__tags');
    if (focusList && Array.isArray(focus)) {
      focusList.innerHTML = '';
      focus.slice(0, 4).forEach((item) => focusList.appendChild(createBadge(item)));
    }

    startDescriptorCycle(descriptorCopy, focus);
  };

  const applyCardChrome = (element) => {
    element.style.border = '1px solid var(--color-border)';
    element.style.background = 'var(--color-surface)';
    element.style.borderRadius = 'var(--radius-medium)';
    element.style.padding = 'var(--space-4)';
    element.style.boxShadow = '0 4px 12px rgba(10, 28, 60, 0.04)';
    element.style.transition =
      'transform var(--motion-duration) var(--motion-ease), background var(--motion-duration) var(--motion-ease), box-shadow var(--motion-duration) var(--motion-ease), border-color var(--motion-duration) var(--motion-ease)';
    element.addEventListener('pointerenter', () => {
      element.style.transform = 'translateY(-2px)';
      element.style.background = 'var(--color-surface-alt)';
      element.style.boxShadow = 'var(--shadow-soft)';
      element.style.borderColor = 'rgba(47, 122, 229, 0.4)';
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = 'translateY(0)';
      element.style.background = 'var(--color-surface)';
      element.style.boxShadow = '0 4px 12px rgba(10, 28, 60, 0.04)';
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
      element.style.boxShadow = '0 4px 12px rgba(10, 28, 60, 0.04)';
      element.style.borderColor = 'var(--color-border)';
    });
  };

  const renderTimeline = (entries = []) => {
    const container = document.querySelector('[data-collection="timeline"]');
    if (!container) return;
    container.innerHTML = '';

    if (!entries.length) {
      const fallback = document.createElement('p');
      fallback.className = 'collection-fallback';
      fallback.textContent = 'Timeline updates land here. Recent milestones will be posted shortly.';
      container.appendChild(fallback);
      return;
    }

    const fragment = document.createDocumentFragment();

    entries.forEach((entry, index) => {
      const card = document.createElement('article');
      card.className = 'timeline-item';
      card.tabIndex = 0;
      applyCardChrome(card);

      const layout = document.createElement('div');
      layout.style.display = 'grid';
      layout.style.gridTemplateColumns = 'auto 1fr';
      layout.style.gap = 'var(--space-3)';

      const marker = createTimelineMarker();
      marker.style.marginTop = index === 0 ? 'var(--space-1)' : '0';

      const content = document.createElement('div');
      content.style.display = 'grid';
      content.style.gap = 'var(--space-2)';

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
      time.className = 'timeline-item__meta';
      time.style.fontSize = '0.95rem';

      heading.appendChild(title);
      heading.appendChild(time);

      const organization = document.createElement('p');
      organization.textContent = entry.organization;
      organization.style.fontWeight = '600';
      organization.style.color = 'var(--color-text)';

      const impact = document.createElement('p');
      impact.textContent = entry.impact || 'Impact summary coming soon.';
      impact.style.marginTop = 'var(--space-2)';

      const tags = document.createElement('div');
      tags.setAttribute('aria-label', 'Skills and tools');
      tags.style.display = 'flex';
      tags.style.flexWrap = 'wrap';
      tags.style.gap = 'var(--space-2)';
      (entry.tags || []).forEach((tagText) => tags.appendChild(createBadge(tagText)));

      content.appendChild(heading);
      content.appendChild(organization);
      content.appendChild(impact);
      content.appendChild(tags);

      layout.appendChild(marker);
      layout.appendChild(content);
      card.appendChild(layout);
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
      fallback.className = 'collection-fallback';
      fallback.textContent = 'Projects are being documented. Delivery highlights will be added shortly.';
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
      status.textContent = project.status || 'in progress';
      status.style.textTransform = 'capitalize';
      status.style.fontWeight = '600';
      status.style.fontSize = '0.9rem';
      status.style.color = 'var(--color-accent)';

      header.appendChild(name);
      header.appendChild(status);

      const media = document.createElement('div');
      media.style.width = '100%';
      media.style.height = '150px';
      media.style.borderRadius = 'var(--radius-medium)';
      media.style.background = 'linear-gradient(135deg, rgba(47,122,229,0.12), rgba(47,122,229,0.04))';
      media.style.display = 'flex';
      media.style.alignItems = 'center';
      media.style.justifyContent = 'center';
      media.style.color = 'var(--color-muted)';
      media.style.fontWeight = '600';
      media.style.letterSpacing = '0.02em';
      media.textContent = project.image ? 'Preview ready' : 'Image placeholder';

      const description = document.createElement('p');
      description.textContent = project.description;

      const stack = document.createElement('p');
      stack.textContent = (project.stack || []).join(' · ');
      stack.style.fontWeight = '600';
      stack.style.color = 'var(--color-text)';

      const outcome = document.createElement('p');
      outcome.textContent = project.outcome ? `Outcome: ${project.outcome}` : 'Outcome: shipping in progress.';
      outcome.style.marginTop = 'var(--space-2)';

      const divider = document.createElement('hr');
      divider.style.border = 'none';
      divider.style.height = '1px';
      divider.style.background = 'var(--color-border)';
      divider.style.margin = 'var(--space-3) 0';

      card.appendChild(header);
      card.appendChild(media);
      card.appendChild(description);
      card.appendChild(stack);
      card.appendChild(outcome);
      card.appendChild(divider);

      const stackTags = document.createElement('div');
      stackTags.style.display = 'flex';
      stackTags.style.flexWrap = 'wrap';
      stackTags.style.gap = 'var(--space-2)';
      (project.stack || []).slice(0, 4).forEach((tech) => stackTags.appendChild(createBadge(tech)));
      card.appendChild(stackTags);

      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  };

  const renderAccomplishments = (metrics, accomplishments = []) => {
    const list = document.querySelector('[data-collection="accomplishments"]');
    if (!list) return;
    list.innerHTML = '';

    const metricItems = [
      {
        id: 'experience',
        label: 'Years of experience',
        context: 'Hands-on leadership across product, design, and engineering squads.',
        value: metrics?.experience ?? 0,
      },
      {
        id: 'projects',
        label: 'Projects shipped',
        context: 'End-to-end launches with measurable adoption and reliability.',
        value: metrics?.projects ?? 0,
      },
      {
        id: 'technologies',
        label: 'Technologies applied',
        context: 'Modern stacks paired with pragmatic delivery and maintainability.',
        value: metrics?.technologies ?? 0,
      },
      {
        id: 'focus',
        label: 'Focus areas practiced',
        context: 'Reinforced patterns across frontend systems, automation, and performance.',
        value: metrics?.focus ?? 0,
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

    if (accomplishments.length) {
      const divider = document.createElement('div');
      divider.style.height = '1px';
      divider.style.background = 'var(--color-border)';
      divider.style.margin = 'var(--space-3) 0';
      fragment.appendChild(divider);

      accomplishments.forEach((item) => {
        const textRow = document.createElement('div');
        textRow.style.display = 'grid';
        textRow.style.gridTemplateColumns = 'auto 1fr';
        textRow.style.gap = 'var(--space-2)';
        textRow.style.alignItems = 'center';
        textRow.style.padding = 'var(--space-2) 0';

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('width', '16');
        icon.setAttribute('height', '16');
        icon.setAttribute('viewBox', '0 0 16 16');
        icon.setAttribute('aria-hidden', 'true');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M6.2 10.3L3.5 7.6l-1 1 3.7 3.7 7.3-7.3-1-1z');
        path.setAttribute('fill', 'var(--color-accent)');
        icon.appendChild(path);

        const copy = document.createElement('p');
        copy.textContent = item;
        copy.style.margin = '0';

        textRow.appendChild(icon);
        textRow.appendChild(copy);
        fragment.appendChild(textRow);
      });
    }

    list.appendChild(fragment);
    startCounters(metricItems);
  };

  const renderRoadmap = (items = []) => {
    const container = document.querySelector('[data-collection="roadmap"]');
    if (!container) return;
    container.innerHTML = '';

    if (!items.length) {
      const fallback = document.createElement('p');
      fallback.className = 'collection-fallback';
      fallback.textContent = 'Roadmap will appear here with near-term bets and experiments.';
      container.appendChild(fallback);
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'roadmap-item';
      card.tabIndex = 0;
      applyCardChrome(card);

      const phaseRow = document.createElement('div');
      phaseRow.style.display = 'flex';
      phaseRow.style.alignItems = 'center';
      phaseRow.style.justifyContent = 'space-between';

      const phase = document.createElement('h3');
      phase.textContent = item.phase;
      phase.style.marginBottom = 'var(--space-2)';

      const accent = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      accent.setAttribute('width', '64');
      accent.setAttribute('height', '8');
      accent.setAttribute('viewBox', '0 0 64 8');
      accent.setAttribute('aria-hidden', 'true');
      const accentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      accentPath.setAttribute('d', 'M2 6c12-4 24-4 36 0s24 4 24 0');
      accentPath.setAttribute('stroke', 'var(--color-accent)');
      accentPath.setAttribute('stroke-width', '2');
      accentPath.setAttribute('fill', 'none');
      accentPath.setAttribute('stroke-linecap', 'round');
      accent.appendChild(accentPath);

      phaseRow.appendChild(phase);
      phaseRow.appendChild(accent);

      const summary = document.createElement('p');
      summary.textContent = item.summary || 'Details to follow.';

      card.appendChild(phaseRow);
      card.appendChild(summary);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  };

  const startCounters = (metricItems) => {
    const list = document.querySelector('[data-collection="accomplishments"]');
    if (!list || !Array.isArray(metricItems)) return;

    const data = resumeCache || {};
    const timelineYears = Array.isArray(data.timeline)
      ? data.timeline
          .map((entry) => {
            const match = String(entry.time || '').match(/(\d{4})/);
            return match ? Number(match[1]) : null;
          })
          .filter((year) => Number.isFinite(year))
      : [];
    const derived = {
      projectCount: Array.isArray(data.projects) ? data.projects.length : 0,
      focusCount: Array.isArray(data.identity?.focus) ? data.identity.focus.length : 0,
      timelineYears,
    };

    const applyFinalValues = (values) => {
      metricItems.forEach((item) => {
        const node = list.querySelector(`[data-counter-id="${item.id}"]`);
        const nextValue = values[item.id];
        if (node && nextValue !== undefined) node.textContent = String(nextValue);
      });
    };

    if (typeof Worker === 'undefined') {
      const fallbackValues = metricItems.reduce((acc, item) => {
        acc[item.id] = item.value;
        return acc;
      }, {});
      fallbackValues.focus = derived.focusCount || fallbackValues.focus;
      fallbackValues.projects = derived.projectCount || fallbackValues.projects;
      applyFinalValues(fallbackValues);
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
        const targetValue = event.data.targetValue || value;
        if (value >= targetValue) {
          pending.delete(id);
          if (pending.size === 0) {
            worker.terminate();
          }
        }
      }
    });

    worker.addEventListener('error', () => {
      const fallbackValues = metricItems.reduce((acc, item) => {
        acc[item.id] = item.value;
        return acc;
      }, {});
      applyFinalValues(fallbackValues);
      worker.terminate();
    });

    worker.postMessage({
      type: 'start',
      metrics: metricItems.map((item) => ({ id: item.id, value: item.value })),
      derived,
      reducedMotion,
    });
  };

  const hydrate = async () => {
    const data = await fetchResume('data/resume.json');
    if (!data) return;

    updateIdentity(data.identity);
    renderTimeline(data.timeline);
    renderProjects(data.projects);
    renderAccomplishments(data.identity?.metrics, data.accomplishments || []);
    renderRoadmap(data.roadmap);
  };

  document.addEventListener('DOMContentLoaded', hydrate);
})();
