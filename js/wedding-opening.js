import { WebGLRenderer, PerspectiveCamera, ACESFilmicToneMapping, PCFSoftShadowMap } from "./vendor/three-r186/three.module.js";
import { createOpeningScene } from "./wedding-opening-scene.js";
import { clamp } from "./wedding-opening-state.js";

const opening = document.querySelector("[data-opening]");
if (opening) initializeOpening(opening);

function initializeOpening(root) {
  const canvas = root.querySelector("[data-opening-canvas]");
  const viewport = root.querySelector(".wedding-opening-sticky");
  const container = root.querySelector(".wedding-opening-scene");
  const caption = root.querySelector("[data-opening-caption]");
  const instruction = root.querySelector("[data-opening-instruction]");
  const phases = Array.from(root.querySelectorAll("[data-opening-phase]"));
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const captions = ["서로를 향한 마음, 같은 시작.", "작은 설렘이, 하나의 약속이 됩니다.", "너에게 전하는, 나의 가장 따뜻한 마음.", "이제, 같은 마음으로 함께 걸어갑니다."];
  let renderer, world, observer, resizeObserver;
  let pendingFrame = 0;
  let visible = true;
  let stopped = false;
  let phase = -1;
  let width = 0, height = 0;
  const camera = new PerspectiveCamera(40, 1, .1, 120);

  function fallback() {
    root.classList.remove("has-opening-scene", "is-scroll-opening");
    document.body.classList.remove("is-opening-active");
    caption.textContent = captions[0];
    instruction.textContent = "우리의 이야기가 시작됩니다.";
  }
  function progress() {
    if (preference.matches) return 1;
    const distance = root.offsetHeight - viewport.offsetHeight;
    return distance > 0 ? clamp(-root.getBoundingClientRect().top / distance) : 0;
  }
  function resize() {
    const nextWidth = Math.max(1, container.clientWidth);
    const nextHeight = Math.max(1, container.clientHeight);
    if (width !== nextWidth || height !== nextHeight) {
      width = nextWidth;
      height = nextHeight;
      renderer.setSize(width, height, false);
    }
  }
  function render() {
    pendingFrame = 0;
    if (stopped || document.hidden) return;
    const rect = root.getBoundingClientRect();
    document.body.classList.toggle("is-opening-active", rect.top <= 1 && rect.bottom > window.innerHeight * .55);
    if (!visible) return;
    try {
      resize();
      const value = progress();
      const state = world.apply(value);
      world.frameCamera(camera, width / height, value);
      renderer.render(world.scene, camera);
      if (phase !== state.phase) {
        phase = state.phase;
        caption.textContent = captions[phase];
        phases.forEach((element, index) => element.classList.toggle("is-current", index === phase));
      }
    } catch (_) {
      stop();
      fallback();
    }
  }
  function schedule() {
    if (!stopped && !pendingFrame && !document.hidden) pendingFrame = window.requestAnimationFrame(render);
  }
  function syncPreference() {
    root.classList.toggle("is-scroll-opening", !preference.matches);
    instruction.textContent = preference.matches ? "우리의 이야기가 시작됩니다." : "스크롤을 내려, 우리의 첫 순간을 만나세요.";
    schedule();
  }
  function lostContext(event) {
    event.preventDefault();
    stop();
    fallback();
  }
  function pageHide(event) { if (!event.persisted) stop(); }
  function stop() {
    if (stopped) return;
    stopped = true;
    window.cancelAnimationFrame(pendingFrame);
    observer?.disconnect();
    resizeObserver?.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pageshow", schedule);
    window.removeEventListener("pagehide", pageHide);
    document.removeEventListener("visibilitychange", schedule);
    canvas.removeEventListener("webglcontextlost", lostContext);
    preference.removeEventListener?.("change", syncPreference);
    preference.removeListener?.(syncPreference);
    world?.dispose();
    renderer?.dispose();
  }

  try {
    const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
    if (!context) return;
    renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0xf7f5ef, 0);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    world = createOpeningScene();
    resize();
    world.apply(preference.matches ? 1 : 0);
    world.frameCamera(camera, width / height, preference.matches ? 1 : 0);
    renderer.render(world.scene, camera);
    root.classList.add("has-opening-scene");
    syncPreference();
    if (window.IntersectionObserver) {
      observer = new window.IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        schedule();
      });
      observer.observe(root);
    }
    if (window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(schedule);
      resizeObserver.observe(container);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("pageshow", schedule);
    window.addEventListener("pagehide", pageHide);
    document.addEventListener("visibilitychange", schedule);
    canvas.addEventListener("webglcontextlost", lostContext);
    if (preference.addEventListener) preference.addEventListener("change", syncPreference);
    else preference.addListener?.(syncPreference);
  } catch (_) {
    stop();
    fallback();
  }
}
