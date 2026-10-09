const clamp = value => Math.max(0, Math.min(1, value));
const columns = 4;
const rows = { motion: 4 };

// Time-based damping keeps motion smooth on wheel, touch and high-refresh displays.
export function advanceOpeningMotion(state, target, elapsedMilliseconds) {
  target = clamp(target);
  const seconds = Math.max(0, Math.min(elapsedMilliseconds, 50)) / 1000;
  if (!seconds || state.position === target && Math.abs(state.velocity) < 1e-4) {
    return { position: state.position, velocity: state.velocity };
  }
  const frequency = 18;
  const offset = state.position - target;
  const coefficient = state.velocity + frequency * offset;
  const decay = Math.exp(-frequency * seconds);
  let position = target + (offset + coefficient * seconds) * decay;
  let velocity = (state.velocity - frequency * coefficient * seconds) * decay;
  const maximumStep = .9 * seconds;
  if (Math.abs(position - state.position) > maximumStep) {
    position = state.position + Math.sign(position - state.position) * maximumStep;
    velocity = Math.sign(velocity) * .9;
  }
  if ((target - state.position) * (target - position) < 0) {
    position = target;
    velocity = 0;
  }
  if (position <= 0 || position >= 1) velocity = 0;
  return { position: clamp(position), velocity };
}

// Metres in an orthographic stage: the two standing positions are 6.5 m apart.
export const bouquetStage = Object.freeze({ width: 8.5, floor: .9, separation: 6.5,
  groom: { x: 1, height: 1.8, anchor: .145, left: .01, right: .38 },
  bride: { x: 7.5, height: 1.7, anchor: .80, left: .50, right: .995 },
  sourceFloor: .925, sourceHeight: .76 });

export function bouquetActorGeometry(width, height, cellWidth, cellHeight, name) {
  const actor = bouquetStage[name];
  const metresToPixels = width / bouquetStage.width;
  const scale = actor.height * metresToPixels / (cellHeight * bouquetStage.sourceHeight);
  return { x: actor.x * metresToPixels - (actor.anchor - actor.left) * cellWidth * scale,
    y: height * bouquetStage.floor - cellHeight * bouquetStage.sourceFloor * scale,
    width: (actor.right - actor.left) * cellWidth * scale, height: cellHeight * scale,
    rootX: actor.x * metresToPixels, metresToPixels };
}

function samples(track, position, count, loop) {
  const base = Math.floor(position);
  const frame = loop ? base % count : Math.min(count - 1, base);
  const next = loop ? (frame + 1) % count : Math.min(count - 1, frame + 1);
  const blend = position - base;
  const result = [{ track, frame, opacity: 1 - blend }];
  if (blend > 0) result.push({ track, frame: next, opacity: blend });
  return result;
}

// Start with the shoulder tap and stop on the proposal or the first successful catch.
export function openingTimeline(value, sceneName = "proposal", reducedMotion = false) {
  const progress = reducedMotion ? 1 : clamp(value / .94);
  const start = sceneName === "bouquet" ? 0 : 2;
  const end = sceneName === "bouquet" ? 12 : 15;
  const rawPosition = start + progress * (end - start);
  const nearestFrame = Math.round(rawPosition);
  const position = Math.abs(rawPosition - nearestFrame) < 1e-9 ? nearestFrame : rawPosition;
  return { phase: position < (sceneName === "bouquet" ? 3 : 5) ? 0 : position < (sceneName === "bouquet" ? 12 : 10) ? 1 : 2,
    ended: progress === 1, actionPosition: position, samples: samples("motion", position, 16, false) };
}

// Exact endpoints meet the photographed release and catching hands.
export function bouquetFlight(position) {
  if (position === null || position <= 3 || position >= 12) return null;
  const progress = (position - 3) / 9;
  const releaseX = bouquetStage.bride.x + (.63 - bouquetStage.bride.anchor) * 1.5 * bouquetStage.bride.height / bouquetStage.sourceHeight;
  const catchX = bouquetStage.groom.x + (.25 - bouquetStage.groom.anchor) * 1.5 * bouquetStage.groom.height / bouquetStage.sourceHeight;
  const releaseY = (bouquetStage.sourceFloor - .21) * bouquetStage.bride.height / bouquetStage.sourceHeight;
  const catchY = (bouquetStage.sourceFloor - .30) * bouquetStage.groom.height / bouquetStage.sourceHeight;
  return { x: releaseX + (catchX - releaseX) * progress,
    y: releaseY + (catchY - releaseY) * progress + 1.6 * 4 * progress * (1 - progress),
    rotation: Math.sin(progress * Math.PI) * .35,
    opacity: Math.min(1, position - 3, 12 - position) };
}

const opening = document.querySelector("[data-opening]");
if (opening) initializeOpening(opening);

function initializeOpening(root) {
  const canvas = root.querySelector("[data-opening-canvas]");
  const context = canvas.getContext("2d", { alpha: true });
  if (context) {
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
  }
  const viewport = root.querySelector(".wedding-opening-sticky");
  const container = root.querySelector(".wedding-opening-scene");
  const poster = root.querySelector("[data-opening-poster]");
  const caption = root.querySelector("[data-opening-caption]");
  const title = root.querySelector("[data-opening-title]");
  const instruction = root.querySelector("[data-opening-instruction]");
  const replay = root.querySelector("[data-opening-replay]");
  const phases = Array.from(root.querySelectorAll("[data-opening-phase]"));
  const buttons = Array.from(root.querySelectorAll("[data-opening-select]"));
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const scenes = {
    proposal: { motion: root.dataset.proposalMotion, first: 2, last: 15, theme: "groom", themeColor: "#f7f5ef",
      title: "너와 함께할 모든 날", label: "신랑이 신부의 어깨를 두 번 두드리는 모습으로 시작해, 한쪽 무릎을 꿇고 청혼하는 모습으로 끝나는 장면",
      phases: ["툭툭", "돌아보기", "청혼"],
      captions: ["어깨를 툭툭, 너를 부르는 작은 신호.", "돌아본 너와 눈을 맞추고.", "한쪽 무릎을 꿇고, 평생을 약속해."] },
    bouquet: { motion: root.dataset.bouquetMotion, first: 0, last: 12, theme: "bride", themeColor: "#fcf4f2",
      title: "마음이 닿는 순간", label: "6m 이상 떨어져 선 신부가 부케를 던지고, 신랑이 마지막에 두 손으로 받으며 끝나는 장면",
      phases: ["던질 준비", "던지기", "받기"],
      captions: ["멀리서도, 내 마음은 너에게.", "너에게 던지는, 가장 설레는 마음.", "두 손으로 받아, 소중히 간직할게."] }
  };
  let sceneName = root.dataset.openingDefault === "bouquet" ? "bouquet" : "proposal";
  let images;
  let pendingFrame = 0;
  let selectionRequest = 0;
  let visible = true;
  let stopped = false;
  let observer, resizeObserver;
  let lastPhase = -1;
  let motionState = null;
  let lastMotionTime = null;
  const assets = new Map();
  const layerCache = new WeakMap();

  function applyTheme(name) {
    const scene = scenes[name];
    document.body.dataset.weddingTheme = scene.theme;
    if (themeColor) themeColor.setAttribute("content", scene.themeColor);
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.openingSelect === name)));
  }

  function makeBouquetLayers(atlas) {
    const cellWidth = atlas.naturalWidth / columns;
    const cellHeight = atlas.naturalHeight / rows.motion;
    return Array.from({ length: 13 }, (_, frame) => {
      const result = {};
      ["groom", "bride"].forEach(name => {
        const actor = bouquetStage[name];
        const layer = document.createElement("canvas");
        layer.width = Math.ceil((actor.right - actor.left) * cellWidth);
        layer.height = cellHeight;
        const layerContext = layer.getContext("2d");
        layerContext.imageSmoothingEnabled = true;
        layerContext.imageSmoothingQuality = "high";
        layerContext.drawImage(atlas, (frame % columns + actor.left) * cellWidth,
          Math.floor(frame / columns) * cellHeight, (actor.right - actor.left) * cellWidth, cellHeight,
          0, 0, layer.width, layer.height);
        // The source already has true alpha; keep its hair, veil and gown edges.
        result[name] = layer;
      });
      return result;
    });
  }

  function progress() {
    const distance = root.offsetHeight - viewport.offsetHeight;
    return distance > 0 ? clamp(-root.getBoundingClientRect().top / distance) : 0;
  }

  function drawFrame(sample, width, height) {
    const image = images[sample.track];
    const cellWidth = image.naturalWidth / columns;
    const cellHeight = image.naturalHeight / rows[sample.track];
    context.globalAlpha = sample.opacity;
    if (sceneName === "bouquet") {
      ["groom", "bride"].forEach(name => {
        const geometry = bouquetActorGeometry(width, height, cellWidth, cellHeight, name);
        context.drawImage(images.layers[sample.frame][name], geometry.x, geometry.y, geometry.width, geometry.height);
      });
      return;
    }
    context.drawImage(image, sample.frame % columns * cellWidth, Math.floor(sample.frame / columns) * cellHeight,
      cellWidth, cellHeight, 0, 0, width, height);
  }

  function render(timestamp) {
    pendingFrame = 0;
    if (stopped || document.hidden) return;
    const rect = root.getBoundingClientRect();
    document.body.classList.toggle("is-opening-active", rect.top <= 1 && rect.bottom > window.innerHeight * .55);
    if (!visible || !images || !context) {
      motionState = null;
      lastMotionTime = null;
      return;
    }
    const targetProgress = progress();
    const now = typeof timestamp === "number" ? timestamp : Date.now();
    if (!motionState || preference.matches) {
      motionState = { position: targetProgress, velocity: 0 };
    } else {
      motionState = advanceOpeningMotion(motionState, targetProgress,
        lastMotionTime === null ? 1000 / 60 : now - lastMotionTime);
    }
    const settled = Math.abs(motionState.position - targetProgress) < 2e-5 && Math.abs(motionState.velocity) < 2e-4;
    if (settled) motionState = { position: targetProgress, velocity: 0 };
    lastMotionTime = settled ? null : now;
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const pixelWidth = Math.round(width * ratio);
    const pixelHeight = Math.round(height * ratio);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const state = openingTimeline(motionState.position, sceneName, preference.matches);
    state.samples.forEach((sample, index) => {
      context.globalCompositeOperation = index ? "lighter" : "source-over";
      drawFrame(sample, width, height);
    });
    context.globalCompositeOperation = "source-over";
    const flight = sceneName === "bouquet" && bouquetFlight(state.actionPosition);
    if (flight && images.flower) {
      const metresToPixels = width / bouquetStage.width;
      const flowerHeight = .30 * metresToPixels;
      const flowerWidth = flowerHeight * images.flower.naturalWidth / images.flower.naturalHeight;
      context.save();
      context.globalAlpha = flight.opacity;
      context.translate(flight.x * metresToPixels, height * bouquetStage.floor - flight.y * metresToPixels);
      context.rotate(flight.rotation);
      context.drawImage(images.flower, -flowerWidth / 2, -flowerHeight / 2, flowerWidth, flowerHeight);
      context.restore();
    }
    context.globalAlpha = 1;
    if (sceneName === "bouquet") {
      const background = context.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, "#fff7f3"); background.addColorStop(1, "#f1dfdb");
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
    }
    if (state.phase !== lastPhase) {
      lastPhase = state.phase;
      caption.textContent = scenes[sceneName].captions[state.phase];
      phases.forEach((element, index) => element.classList.toggle("is-current", index === state.phase));
    }
    if (!settled && !preference.matches) schedule();
  }

  function schedule() {
    if (!stopped && !pendingFrame && !document.hidden) pendingFrame = window.requestAnimationFrame(render);
  }

  function syncPreference() {
    motionState = null;
    lastMotionTime = null;
    root.classList.toggle("is-scroll-opening", Boolean(context) && Boolean(images) && !preference.matches);
    instruction.textContent = preference.matches || !context ? "두 장면 중 마음에 드는 순간을 골라 보세요." : "스크롤을 내려, 우리의 이야기를 이어 보세요.";
    if (replay) replay.hidden = preference.matches || !context;
    if (images) {
      poster.src = scenes[sceneName].motion;
      poster.parentElement.dataset.openingPosterFrame = String(preference.matches || !context ? scenes[sceneName].last : scenes[sceneName].first);
    }
    schedule();
  }

  function restart() {
    // Reset only this story; the sticky screen stays in place while progress rewinds.
    const pageRoot = document.documentElement;
    pageRoot.classList.add("is-opening-reset");
    window.scrollTo({ top: Math.max(0, root.getBoundingClientRect().top + window.scrollY), behavior: "auto" });
    pageRoot.classList.remove("is-opening-reset");
    motionState = null;
    lastMotionTime = null;
    schedule();
  }

  function visibilityChanged() {
    window.cancelAnimationFrame(pendingFrame);
    pendingFrame = 0;
    motionState = null;
    lastMotionTime = null;
    schedule();
  }

  function loadImage(src, track) {
    if (!assets.has(src)) {
      const pending = (async function () {
        const atlas = new Image();
        atlas.decoding = "async";
        const loaded = new Promise((resolve, reject) => {
          atlas.onload = resolve;
          atlas.onerror = () => reject(new Error("Opening image unavailable"));
        });
        atlas.src = src;
        await loaded;
        if (atlas.decode) await atlas.decode();
        if (!atlas.naturalWidth || !atlas.naturalHeight) throw new Error("Empty opening image");
        if (track !== "flower") {
          const cellAspect = atlas.naturalWidth * rows[track] / (atlas.naturalHeight * columns);
          if (Math.abs(cellAspect - 1.5) > .025) throw new Error("Opening frames must have a 3:2 aspect ratio");
        }
        return atlas;
      })();
      assets.set(src, pending);
      pending.catch(() => assets.delete(src));
    }
    return assets.get(src);
  }

  async function selectScene(name, fromStart = false) {
    const request = ++selectionRequest;
    applyTheme(name);
    root.setAttribute("aria-busy", "true");
    instruction.textContent = "우리의 순간을 불러오는 중입니다.";
    try {
      const scene = scenes[name];
      const loaded = await Promise.all([loadImage(scene.motion, "motion"),
        name === "bouquet" ? loadImage(root.dataset.bouquetSprite, "flower") : Promise.resolve(null)]);
      if (stopped || request !== selectionRequest) return;
      if (name === "bouquet" && context && !layerCache.has(loaded[0])) {
        layerCache.set(loaded[0], makeBouquetLayers(loaded[0]));
      }
      images = { motion: loaded[0], flower: loaded[1],
        layers: name === "bouquet" && context ? layerCache.get(loaded[0]) : null };
      sceneName = name;
      lastPhase = -1;
      title.textContent = scene.title;
      poster.parentElement.setAttribute("aria-label", scene.label);
      canvas.setAttribute("aria-label", scene.label + ", 스크롤로 재생");
      root.classList.toggle("is-bouquet-opening", name === "bouquet");
      applyTheme(name);
      phases.forEach((element, index) => { element.textContent = scene.phases[index]; });
      if (!context) {
        phases.forEach((element, index) => element.classList.toggle("is-current", index === 2));
      }
      if (context) root.classList.add("has-opening-scene");
      caption.textContent = scene.captions[context ? 0 : 2];
      syncPreference();
      if (fromStart) restart();
    } catch (_) {
      if (request !== selectionRequest) return;
      applyTheme(sceneName);
      instruction.textContent = "장면을 불러오지 못했어요. 다시 선택해 주세요.";
    } finally {
      if (request === selectionRequest) root.removeAttribute("aria-busy");
    }
  }

  const handlers = new Map();
  buttons.forEach(button => {
    const handler = () => selectScene(button.dataset.openingSelect, true);
    handlers.set(button, handler);
    button.disabled = false;
    button.addEventListener("click", handler);
  });
  if (replay) replay.addEventListener("click", restart);
  function pageHide(event) { if (!event.persisted) stop(); }
  function stop() {
    stopped = true;
    selectionRequest++;
    window.cancelAnimationFrame(pendingFrame);
    observer?.disconnect();
    resizeObserver?.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pageshow", schedule);
    window.removeEventListener("pagehide", pageHide);
    document.removeEventListener("visibilitychange", visibilityChanged);
    preference.removeEventListener?.("change", syncPreference);
    preference.removeListener?.(syncPreference);
    handlers.forEach((handler, button) => button.removeEventListener("click", handler));
    replay?.removeEventListener("click", restart);
    assets.clear();
    images = null;
  }
  if (window.IntersectionObserver) {
    observer = new window.IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); });
    observer.observe(root);
  }
  if (window.ResizeObserver) {
    resizeObserver = new window.ResizeObserver(schedule);
    resizeObserver.observe(container);
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("pageshow", schedule);
  window.addEventListener("pagehide", pageHide);
  document.addEventListener("visibilitychange", visibilityChanged);
  if (preference.addEventListener) preference.addEventListener("change", syncPreference);
  else preference.addListener?.(syncPreference);
  selectScene(sceneName);
}
