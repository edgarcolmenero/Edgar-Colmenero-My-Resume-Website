const animateCounters = (items, reducedMotion) => {
  if (!Array.isArray(items) || !items.length) return;

  if (reducedMotion) {
    items.forEach((item) => {
      self.postMessage({ id: item.id, value: item.value });
    });
    return;
  }

  const start = performance.now();
  const duration = 1200;

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    items.forEach((item) => {
      const value = Math.round(item.value * eased);
      self.postMessage({ id: item.id, value });
    });

    if (progress < 1) {
      self.requestAnimationFrame(step);
    }
  };

  self.requestAnimationFrame(step);
};

self.addEventListener('message', (event) => {
  const { type, metrics, reducedMotion } = event.data || {};
  if (type !== 'start') return;

  const normalized = Array.isArray(metrics)
    ? metrics.map((item) => ({ id: item.id, value: Number(item.value) || 0 }))
    : [];

  animateCounters(normalized, Boolean(reducedMotion));
});
