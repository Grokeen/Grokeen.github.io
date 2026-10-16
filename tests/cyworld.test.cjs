const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const project = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(project, ".jekyll-local/site/index.html"), "utf8");
const script = fs.readFileSync(path.join(project, "js/cyworld.js"), "utf8");
const settlePlayback = () => new Promise((resolve) => setImmediate(resolve));

async function openHome({ playErrors = [], playPromises = [] } = {}) {
  const dom = new JSDOM(html, { url: "http://localhost:4000/", runScripts: "outside-only" });
  const { window } = dom;
  const NativeDate = window.Date;
  window.Date = class extends NativeDate {
    constructor(...args) { super(...(args.length ? args : [2024, 1, 29, 12])); }
  };
  const playback = new WeakMap();
  const music = { attempts: 0 };
  Object.defineProperty(window.HTMLMediaElement.prototype, "paused", {
    get() { return !playback.get(this); }
  });
  window.HTMLMediaElement.prototype.play = function () {
    const attempt = music.attempts++;
    if (playErrors[attempt]) return Promise.reject(new window.DOMException("Playback blocked", playErrors[attempt]));
    playback.set(this, true);
    this.dispatchEvent(new window.Event("play"));
    return playPromises[attempt] || Promise.resolve();
  };
  window.HTMLMediaElement.prototype.pause = function () {
    playback.set(this, false);
    this.dispatchEvent(new window.Event("pause"));
  };
  window.HTMLMediaElement.prototype.load = function () {};
  window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  window.eval(script);
  await settlePlayback();
  const $ = (selector) => window.document.querySelector(selector);
  const $$ = (selector) => [...window.document.querySelectorAll(selector)];
  const submit = (selector) => $(selector).dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
  const change = (selector, value, type = "change") => {
    $(selector).value = value;
    $(selector).dispatchEvent(new window.Event(type, { bubbles: true }));
  };
  return { dom, window, $, $$, submit, change, music };
}

test("built homepage opens all six pages and supports keyboard navigation", async () => {
  const { dom, window, $, $$ } = await openHome();
  try {
    assert.equal($("#panel-home").hidden, false);
    assert.equal($$(".page-panel:not([hidden])").length, 1);
    assert.equal($$(".book-tabs button").length, 6);
    for (const tab of $$(".book-tabs button")) {
      tab.click();
      assert.equal($("#panel-" + tab.dataset.panel).hidden, false);
      assert.equal(tab.getAttribute("aria-selected"), "true");
      assert.equal($$(".page-panel:not([hidden])").length, 1);
    }
    $("#tab-home").click();
    $("#tab-home").dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    assert.equal(window.document.activeElement, $("#tab-profile"));
    assert.equal($("#panel-profile").hidden, false);
    $("#tab-profile").dispatchEvent(new window.KeyboardEvent("keydown", { key: "End", bubbles: true }));
    assert.equal(window.document.activeElement, $("#tab-guestbook"));
    changeHash("#unknown");
    assert.equal($("#panel-home").hidden, false);
    function changeHash(hash) { window.history.replaceState(null, "", hash); window.dispatchEvent(new window.Event("hashchange")); }
  } finally { dom.window.close(); }
});

test("room views, mood, skin and wave selector work without persistent storage", async () => {
  const { dom, window, $, change } = await openHome();
  try {
    $("#room-tab-life").click();
    assert.equal($("#room-life").hidden, false);
    assert.equal($("#room-room").hidden, true);
    $("#room-tab-life").dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    assert.equal($("#room-room").hidden, false);
    change("#mood", "rainy");
    assert.equal($(".room-weather").textContent, "☂");
    $("button[data-skin=pink]").click();
    assert.equal(window.document.body.dataset.skin, "pink");
    assert.equal($("button[data-skin=blue]").getAttribute("aria-pressed"), "false");
    change("#wave-select", "photos");
    assert.equal($("#panel-photos").hidden, false);
    assert.equal($("#wave-select").value, "");
    assert.equal(window.localStorage.length, 0);
    assert.equal(window.sessionStorage.length, 0);
    assert.equal(window.document.cookie, "");
  } finally { dom.window.close(); }
});

test("mobile menu changes to horizontal keyboard navigation", async () => {
  const { dom, window, $ } = await openHome();
  try {
    window.innerWidth = 390;
    window.dispatchEvent(new window.Event("resize"));
    assert.equal($(".book-tabs").getAttribute("aria-orientation"), "horizontal");
    $("#tab-home").dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    assert.equal(window.document.activeElement, $("#tab-profile"));
    assert.equal($("#panel-profile").hidden, false);
  } finally { dom.window.close(); }
});

test("diary handles leap days, month boundaries and removal of an entry", async () => {
  const { dom, $, $$, submit } = await openHome();
  try {
    assert.equal($("#calendar-month").textContent, "2024. 02");
    assert.equal($$("#calendar-days button").length, 29);
    $("#diary-message").value = "작은 하루의 기록";
    submit("#diary-form");
    assert.equal($("[data-diary-count]").textContent, "1");
    $("#month-next").click();
    assert.equal($("#calendar-month").textContent, "2024. 03");
    assert.equal($$("#calendar-days button").length, 31);
    $("#calendar-today").click();
    assert.equal($("#diary-message").value, "작은 하루의 기록");
    $("#diary-message").value = "";
    submit("#diary-form");
    assert.equal($("[data-diary-count]").textContent, "0");
    assert.equal($$(".has-note").length, 0);
    $("#month-prev").click();
    assert.equal($("#calendar-month").textContent, "2024. 01");
    $("#month-prev").click();
    assert.equal($("#calendar-month").textContent, "2023. 12");
  } finally { dom.window.close(); }
});

test("guestbook treats markup as text, updates counters and resets on reload", async () => {
  const { dom, $, submit } = await openHome();
  try {
    $("#guest-message").value = "   ";
    submit("#guest-form");
    assert.equal($("#guest-list").children.length, 0);
    const text = '<img src=x onerror="alert(1)">반가워요';
    $("#guest-message").value = text;
    submit("#guest-form");
    assert.equal($("#guest-list p").textContent, text);
    assert.equal($("#guest-list img"), null);
    assert.equal($("[data-guest-count]").textContent, "1");
    const other = await openHome();
    assert.equal(other.$("#guest-list").children.length, 0);
    other.dom.window.close();
    $("#guest-list button").click();
    assert.equal($("[data-guest-count]").textContent, "0");
    assert.equal($("#guest-empty").hidden, false);
  } finally { dom.window.close(); }
});

test("friend comments can be added and deleted without interpreting HTML", async () => {
  const { dom, $, submit } = await openHome();
  try {
    $("#friend-message").value = "<b>좋은 하루!</b>";
    submit("#friend-form");
    assert.equal($("#friend-count").textContent, "1");
    assert.equal($("#friend-list b"), null);
    assert.equal($(".empty-friend").hidden, true);
    $("#friend-list button").click();
    assert.equal($("#friend-count").textContent, "0");
    assert.equal($(".empty-friend").hidden, false);
  } finally { dom.window.close(); }
});

test("photo album filters and opens the selected image", async () => {
  const { dom, $, $$, change } = await openHome();
  try {
    change("#album-filter", "landscape");
    assert.equal($$(".photo-card:not([hidden])").length, 1);
    $(".photo-card:not([hidden])").click();
    assert.equal($("#photo-dialog").open, true);
    assert.match($("#photo-dialog-image").src, /sunset\.svg$/);
    assert.equal($("#photo-dialog-image").alt, "노을이 머무는 시간");
    change("#album-filter", "room");
    assert.equal($$(".photo-card:not([hidden])").length, 2);
  } finally { dom.window.close(); }
});

test("board searches the built post list and handles no results", async () => {
  const { dom, $, $$, change } = await openHome();
  try {
    const total = $$(".board-list li").length;
    assert.ok(total > 0);
    const firstTitle = $(".board-list a span").textContent;
    change("#board-search", firstTitle, "input");
    assert.ok($$(".board-list li:not([hidden])").length > 0);
    change("#board-search", "no_such_post_7z9x", "input");
    assert.equal($$(".board-list li:not([hidden])").length, 0);
    assert.equal($("#board-empty").hidden, false);
    change("#board-search", "", "input");
    assert.equal($$(".board-list li:not([hidden])").length, total);
  } finally { dom.window.close(); }
});

test("music starts automatically and its controls still change playback, track and volume", async () => {
  const { dom, window, $, change, music } = await openHome();
  try {
    const audio = $("#bgm");
    assert.match(html, /<audio\b[^>]*\bautoplay\b/);
    assert.equal(music.attempts, 1);
    assert.equal(audio.paused, false);
    assert.equal(audio.volume, 0.4);
    assert.match($("#music-status").textContent, /음악이 흐르고/);
    assert.equal($("#music-play").getAttribute("aria-pressed"), "true");
    $("#music-next").click();
    await settlePlayback();
    assert.match($("#track-name").textContent, /아이스크림/);
    assert.equal(audio.paused, false);
    $("#music-play").click();
    assert.equal(audio.paused, true);
    $("#tab-profile").click();
    assert.equal(audio.paused, true);
    $("#music-prev").click();
    assert.match($("#track-name").textContent, /처음 뵙겠습니다/);
    assert.equal(audio.paused, true);
    change("#music-volume", "0.75", "input");
    assert.equal(audio.volume, 0.75);
    audio.dispatchEvent(new window.Event("error"));
    assert.match($("#music-status").textContent, /불러오지 못했어요/);
  } finally { dom.window.close(); }
});

test("blocked autoplay resumes on a click, touch or keyboard interaction only once", async () => {
  for (const type of ["click", "touchend", "keydown"]) {
    const { dom, window, $, music } = await openHome({ playErrors: ["NotAllowedError"] });
    try {
      assert.equal($("#bgm").paused, true);
      assert.equal($("#music-play").getAttribute("aria-pressed"), "false");
      assert.match($("#music-status").textContent, /화면을 한 번/);
      const event = type === "keydown" ? new window.KeyboardEvent(type, { key: "a", bubbles: true }) : new window.Event(type, { bubbles: true });
      $("#panel-home").dispatchEvent(event);
      await settlePlayback();
      assert.equal($("#bgm").paused, false);
      assert.equal(music.attempts, 2);
      assert.equal($("#music-play").getAttribute("aria-pressed"), "true");
      $("#music-play").click();
      $("#tab-profile").click();
      assert.equal($("#bgm").paused, true);
      assert.equal(music.attempts, 2);
    } finally { dom.window.close(); }
  }
});

test("player controls handle blocked autoplay without immediately pausing or playing the old track", async () => {
  for (const control of ["#music-play", "#music-next"]) {
    const { dom, $, music } = await openHome({ playErrors: ["NotAllowedError"] });
    try {
      $(control).click();
      await settlePlayback();
      assert.equal($("#bgm").paused, false);
      assert.equal(music.attempts, 2);
      if (control === "#music-next") assert.match($("#bgm").src, /mc%EB%AA%BD\.mp3$/);
      $("#music-play").click();
      $("#music-prev").click();
      assert.equal($("#bgm").paused, true);
      assert.equal($("#bgm").autoplay, false);
      assert.equal(music.attempts, 2);
    } finally { dom.window.close(); }
  }
});

test("a late autoplay rejection cannot override an explicit pause", async () => {
  let rejectInitial;
  const pending = new Promise((resolve, reject) => { rejectInitial = reject; });
  const { dom, window, $, music } = await openHome({ playPromises: [pending] });
  try {
    $("#music-play").click();
    rejectInitial(new window.DOMException("Playback blocked", "NotAllowedError"));
    await settlePlayback();
    $("#tab-profile").click();
    assert.equal($("#bgm").paused, true);
    assert.equal(music.attempts, 1);
    assert.match($("#music-status").textContent, /잠시 멈췄어요/);
  } finally { dom.window.close(); }
});

test("audio failures stop automatic retries and ended tracks advance once", async () => {
  const failed = await openHome({ playErrors: ["NotSupportedError"] });
  try {
    failed.$("#tab-profile").click();
    assert.equal(failed.music.attempts, 1);
    assert.match(failed.$("#music-status").textContent, /재생할 수 없어요/);
  } finally { failed.dom.window.close(); }
  const { dom, window, $, music } = await openHome({ playErrors: ["NotAllowedError"] });
  try {
    $("#bgm").dispatchEvent(new window.Event("error"));
    $("#tab-profile").click();
    assert.equal(music.attempts, 1);
    assert.match($("#music-status").textContent, /불러오지 못했어요/);
    $("#music-play").click();
    await settlePlayback();
    $("#bgm").dispatchEvent(new window.Event("ended"));
    await settlePlayback();
    assert.equal(music.attempts, 3);
    assert.match($("#track-name").textContent, /아이스크림/);
    assert.equal($("#bgm").paused, false);
  } finally { dom.window.close(); }
});
