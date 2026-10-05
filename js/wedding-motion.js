(function () {
  "use strict";

  // Keep the invitation readable when JavaScript or motion APIs are unavailable.
  if (!window.matchMedia || !window.IntersectionObserver || !window.requestAnimationFrame || typeof document.documentElement.animate !== "function") return;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let cleanup = function () {};

  function startMotion() {
    const reveals = Array.from(document.querySelectorAll("[data-reveal]"));
    const animations = [];
    const active = new Set();
    const records = new Map();
    let pendingFrame = 0;
    let stopped = false;
    const clamp = function (value) { return Math.min(1, Math.max(0, value)); };

    function photoAnimation(image, story) {
      const animation = image.animate([
        { transform: story ? "translate3d(0, 10px, 0) scale(1.12)" : "translate3d(0, 1.5%, 0) scale(1.06)" },
        { transform: story ? "translate3d(0, -10px, 0) scale(1.02)" : "translate3d(0, -1.5%, 0) scale(1.12)" }
      ], { duration: 1000, fill: "both", easing: "linear" });
      animation.pause();
      animations.push(animation);
      return animation;
    }

    document.querySelectorAll("[data-scroll-photo]").forEach(function (element) {
      const image = element.querySelector("img");
      if (image) records.set(element, { type: "photo", animation: photoAnimation(image, false) });
    });
    document.querySelectorAll("[data-scroll-story]").forEach(function (element) {
      const images = Array.from(element.querySelectorAll("[data-story-image]"));
      const steps = Array.from(element.querySelectorAll("[data-story-step]"));
      if (!images.length || images.length !== steps.length) return;
      records.set(element, { type: "story", images: images, steps: steps,
        animations: images.map(function (image) { return photoAnimation(image, true); }),
        counter: element.querySelector("[data-story-counter]"), index: -1 });
    });

    function render() {
      pendingFrame = 0;
      if (stopped || document.hidden) return;
      const viewport = window.innerHeight;
      // Measure all visible targets before updating animation state.
      const updates = [];
      active.forEach(function (element) {
        const record = records.get(element);
        if (record.type === "photo") {
          const rect = element.getBoundingClientRect();
          updates.push({ record: record, progress: clamp((viewport - rect.top) / (viewport + rect.height)) });
        } else {
          let index = 0;
          let distance = Infinity;
          let progress = 0;
          record.steps.forEach(function (step, number) {
            const rect = step.getBoundingClientRect();
            const nextDistance = Math.abs(rect.top + rect.height / 2 - viewport * .58);
            if (nextDistance < distance) {
              distance = nextDistance;
              index = number;
              progress = clamp((viewport - rect.top) / (viewport + rect.height));
            }
          });
          updates.push({ record: record, index: index, progress: progress });
        }
      });
      updates.forEach(function (update) {
        const record = update.record;
        if (record.type === "photo") {
          record.animation.currentTime = update.progress * 1000;
        } else {
          record.animations[update.index].currentTime = update.progress * 1000;
          if (record.index !== update.index) {
            record.index = update.index;
            record.images.forEach(function (image, index) { image.classList.toggle("is-current", index === update.index); });
            record.steps.forEach(function (step, index) { step.classList.toggle("is-current", index === update.index); });
            if (record.counter) record.counter.textContent = String(update.index + 1).padStart(2, "0") + " / " + String(record.images.length).padStart(2, "0");
          }
        }
      });
    }

    function schedule() {
      if (!pendingFrame && !stopped && !document.hidden) pendingFrame = window.requestAnimationFrame(render);
    }
    const revealObserver = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    const motionObserver = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) active.add(entry.target);
        else active.delete(entry.target);
      });
      schedule();
    }, { rootMargin: "100px 0px" });

    document.body.classList.add("has-scroll-motion");
    reveals.forEach(function (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add("is-revealed");
      else revealObserver.observe(element);
    });
    records.forEach(function (_, element) { motionObserver.observe(element); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);

    return function () {
      stopped = true;
      window.cancelAnimationFrame(pendingFrame);
      revealObserver.disconnect();
      motionObserver.disconnect();
      animations.forEach(function (animation) { animation.cancel(); });
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      document.body.classList.remove("has-scroll-motion");
    };
  }

  function syncPreference() {
    cleanup();
    cleanup = preference.matches ? function () {} : startMotion();
  }
  syncPreference();
  if (preference.addEventListener) preference.addEventListener("change", syncPreference);
  else if (preference.addListener) preference.addListener(syncPreference);
})();
