const computeYearsFromTimeline = (timelineYears) => {
  if (!Array.isArray(timelineYears) || !timelineYears.length) return null;
  const earliest = Math.min(...timelineYears.filter((year) => Number.isFinite(year)));
  if (!Number.isFinite(earliest)) return null;
  const currentYear = new Date().getFullYear();
  return Math.max(currentYear - earliest, 0);
};

const buildTargets = (metrics, derived) => {
  const targets = metrics.reduce((acc, item) => {
    acc[item.id] = Number(item.value) || 0;
    return acc;
  }, {});

  const timelineYears = derived?.timelineYears || [];
  const computedYears = computeYearsFromTimeline(timelineYears);
  if (Number.isFinite(computedYears)) targets.experience = Math.max(targets.experience, computedYears);

  const projectCount = Number(derived?.projectCount) || 0;
  if (projectCount) targets.projects = Math.max(targets.projects, projectCount);

  const focusCount = Number(derived?.focusCount) || 0;
  if (focusCount) targets.focus = Math.max(targets.focus || 0, focusCount);

  return targets;
};

const animateCounters = (targets, reducedMotion) => {
  const entries = Object.entries(targets);
  if (!entries.length) return;

  if (reducedMotion) {
    entries.forEach(([id, value]) => {
      self.postMessage({ id, value: Math.round(value), targetValue: Math.round(value) });
    });
    return;
  }

  const start = performance.now();
  const duration = 1200;

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    entries.forEach(([id, value]) => {
      const nextValue = Math.round(value * eased);
      self.postMessage({ id, value: nextValue, targetValue: Math.round(value) });
    });

    if (progress < 1) {
      self.requestAnimationFrame(step);
    }
  };

  self.requestAnimationFrame(step);
};

self.addEventListener('message', (event) => {
  const { type, metrics, derived, reducedMotion } = event.data || {};
  if (type !== 'start' || !Array.isArray(metrics)) return;

  const targets = buildTargets(metrics, derived);
  animateCounters(targets, Boolean(reducedMotion));
});
