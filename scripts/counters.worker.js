const animateCounters = (stats) => {
  if (!Array.isArray(stats) || !stats.length) return;

  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    stats.forEach((stat) => {
      const target = Number(stat.value) || 0;
      const value = Math.round(target * eased);
      self.postMessage({ id: stat.id, value: value > target ? target : value });
    });

    if (progress < 1) {
      self.requestAnimationFrame(step);
    }
  };

  self.requestAnimationFrame(step);
};

self.addEventListener('message', (event) => {
  const { type, stats } = event.data || {};
  if (type !== 'start') return;
  animateCounters(stats);
});
