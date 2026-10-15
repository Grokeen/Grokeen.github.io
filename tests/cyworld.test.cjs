const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const project = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(project, ".jekyll-local/site/index.html"), "utf8");
const script = fs.readFileSync(path.join(project, "js/cyworld.js"), "utf8");

function openHome() {
  const dom = new JSDOM(html, { url: "http://localhost:4000/", runScripts: "outside-only" });
  const { window } = dom;
  const NativeDate = window.Date;
  window.Date = class extends NativeDate {
    constructor(...args) { super(...(args.length ? args : [2024, 1, 29, 12])); }
  };
  const playback = new WeakMap();
  Object.defineProperty(window.HTMLMediaElement.prototype, "paused", {
    get() { return !playback.get(this); }
  });
  window.HTMLMediaElement.prototype.play = function () {
    playback.set(this, true);
    this.dispatchEvent(new window.Event("play"));
    return Promise.resolve();
  };
  window.HTMLMediaElement.prototype.pause = function () {
    playback.set(this, false);
    this.dispatchEvent(new window.Event("pause"));
  };
  window.HTMLMediaElement.prototype.load = function () {};
  window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  window.eval(script);
  const $ = (selector) => window.document.querySelector(selector);
  const $$ = (selector) => [...window.document.querySelectorAll(selector)];
  const submit = (selector) => $(selector).dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
  const change = (selector, value, type = "change") => {
    $(selector).value = value;
    $(selector).dispatchEvent(new window.Event(type, { bubbles: true }));
  };
  return { dom, window, $, $$, submit, change };
}

test("built homepage opens all six pages and supports keyboard navigation", () => {
  const { dom, window, $, $$ } = openHome();
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

test("room views, mood, skin and wave selector work without persistent storage", () => {
  const { dom, window, $, change } = openHome();
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

test("mobile menu changes to horizontal keyboard navigation", () => {
  const { dom, window, $ } = openHome();
  try {
    window.innerWidth = 390;
    window.dispatchEvent(new window.Event("resize"));
    assert.equal($(".book-tabs").getAttribute("aria-orientation"), "horizontal");
    $("#tab-home").dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    assert.equal(window.document.activeElement, $("#tab-profile"));
    assert.equal($("#panel-profile").hidden, false);
  } finally { dom.window.close(); }
});

test("diary handles leap days, month boundaries and removal of an entry", () => {
  const { dom, $, $$, submit } = openHome();
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

test("guestbook treats markup as text, updates counters and resets on reload", () => {
  const { dom, $, submit } = openHome();
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
    const other = openHome();
    assert.equal(other.$("#guest-list").children.length, 0);
    other.dom.window.close();
    $("#guest-list button").click();
    assert.equal($("[data-guest-count]").textContent, "0");
    assert.equal($("#guest-empty").hidden, false);
  } finally { dom.window.close(); }
});

test("friend comments can be added and deleted without interpreting HTML", () => {
  const { dom, $, submit } = openHome();
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

test("photo album filters and opens the selected image", () => {
  const { dom, $, $$, change } = openHome();
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

test("board searches the built post list and handles no results", () => {
  const { dom, $, $$, change } = openHome();
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

test("music controls change playback, track and volume and report errors", async () => {
  const { dom, window, $, change } = openHome();
  try {
    const audio = $("#bgm");
    assert.equal(audio.paused, true);
    assert.equal(audio.volume, 0.4);
    $("#music-play").click();
    await Promise.resolve();
    assert.equal(audio.paused, false);
    assert.equal($("#music-play").getAttribute("aria-pressed"), "true");
    $("#music-next").click();
    await Promise.resolve();
    assert.match($("#track-name").textContent, /아이스크림/);
    assert.equal(audio.paused, false);
    $("#music-play").click();
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
