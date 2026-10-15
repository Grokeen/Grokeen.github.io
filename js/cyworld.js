(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const tabs = $$(".book-tabs [role=tab]");
  const panelNames = new Set(tabs.map((tab) => tab.dataset.panel));

  function showPanel(name, focus = false) {
    if (!panelNames.has(name)) name = "home";
    tabs.forEach((tab) => {
      const selected = tab.dataset.panel === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      $("#panel-" + tab.dataset.panel).hidden = !selected;
      if (selected && focus) tab.focus();
    });
    // A fragment links to a page without adding personal data or network calls.
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => showPanel(tab.dataset.panel)));
  $$("[data-open-panel]").forEach((button) => {
    button.addEventListener("click", () => showPanel(button.dataset.openPanel, true));
  });
  $("#wave-select").addEventListener("change", (event) => {
    if (event.target.value) showPanel(event.target.value, true);
    event.target.value = "";
  });
  window.addEventListener("hashchange", () => showPanel(location.hash.slice(1)));

  function keyboardTabs(tablist, buttons, activate) {
    tablist.addEventListener("keydown", (event) => {
      if (!buttons.includes(event.target)) return;
      const index = buttons.indexOf(event.target);
      const vertical = tablist.getAttribute("aria-orientation") === "vertical";
      let next;
      if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) next = (index + 1) % buttons.length;
      if (event.key === (vertical ? "ArrowUp" : "ArrowLeft")) next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      activate(buttons[next]);
      buttons[next].focus();
    });
  }
  function updateTabOrientation() {
    $(".book-tabs").setAttribute("aria-orientation", window.innerWidth <= 730 ? "horizontal" : "vertical");
  }
  updateTabOrientation();
  window.addEventListener("resize", updateTabOrientation);
  keyboardTabs($(".book-tabs"), tabs, (tab) => showPanel(tab.dataset.panel));

  const roomTabs = $$("[data-room]");
  function showRoom(tab) {
    roomTabs.forEach((button) => {
      const selected = button === tab;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      $("#room-" + button.dataset.room).hidden = !selected;
    });
  }
  roomTabs.forEach((tab) => tab.addEventListener("click", () => showRoom(tab)));
  keyboardTabs($(".miniroom-heading [role=tablist]"), roomTabs, showRoom);

  $("#mood").addEventListener("change", (event) => {
    const moods = { happy: ["☀", "맑은 날"], calm: ["☁", "여유로운 날"], excited: ["✿", "설레는 날"], rainy: ["☂", "센치한 날"] };
    const [icon, label] = moods[event.target.value];
    $(".room-weather").textContent = icon;
    $(".room-weather").setAttribute("aria-label", label);
  });
  $$("[data-skin]").forEach((button) => button.addEventListener("click", () => {
    document.body.dataset.skin = button.dataset.skin;
    $$("[data-skin]").filter((item) => item.tagName === "BUTTON").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
  }));

  // Entries live in memory and disappear on reload; no cookies or local storage.
  const notes = new Map();
  const today = new Date();
  let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let displayedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const dateKey = (date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  const dateLabel = (date) => date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" });

  function renderCalendar() {
    const year = displayedMonth.getFullYear();
    const month = displayedMonth.getMonth();
    $("#calendar-month").textContent = year + ". " + String(month + 1).padStart(2, "0");
    const days = $("#calendar-days");
    days.replaceChildren();
    for (let blank = 0; blank < new Date(year, month, 1).getDay(); blank++) {
      const spacer = document.createElement("span");
      spacer.setAttribute("aria-hidden", "true");
      days.append(spacer);
    }
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const date = new Date(year, month, day);
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = day;
      button.setAttribute("aria-label", dateLabel(date));
      button.setAttribute("aria-pressed", String(dateKey(date) === dateKey(selectedDate)));
      button.classList.toggle("is-today", dateKey(date) === dateKey(today));
      button.classList.toggle("has-note", notes.has(dateKey(date)));
      button.addEventListener("click", () => {
        saveDraft();
        selectedDate = date;
        renderCalendar();
        $("#diary-message").focus();
      });
      days.append(button);
    }
    $("#diary-date").textContent = dateLabel(selectedDate);
    $("#diary-message").value = notes.get(dateKey(selectedDate)) || "";
    $("#diary-feedback").textContent = "";
  }
  function saveDraft() {
    const text = $("#diary-message").value.trim();
    if (text) notes.set(dateKey(selectedDate), text);
    else notes.delete(dateKey(selectedDate));
    $$("[data-diary-count]").forEach((count) => { count.textContent = notes.size; });
  }
  $("#month-prev").addEventListener("click", () => {
    saveDraft();
    displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
    selectedDate = new Date(displayedMonth);
    renderCalendar();
  });
  $("#month-next").addEventListener("click", () => {
    saveDraft();
    displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
    selectedDate = new Date(displayedMonth);
    renderCalendar();
  });
  $("#calendar-today").addEventListener("click", () => {
    saveDraft();
    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    renderCalendar();
  });
  $("#diary-form").addEventListener("submit", (event) => {
    event.preventDefault();
    saveDraft();
    renderCalendar();
    $("#diary-feedback").textContent = notes.has(dateKey(selectedDate)) ? "오늘의 기록을 이 창에 담았어요." : "기록을 비웠어요.";
  });

  $("#album-filter").addEventListener("change", (event) => {
    $$(".photo-card").forEach((card) => { card.hidden = event.target.value !== "all" && card.dataset.album !== event.target.value; });
  });
  const dialog = $("#photo-dialog");
  $$("[data-photo]").forEach((button) => button.addEventListener("click", () => {
    $("#photo-dialog-image").src = button.dataset.photo;
    $("#photo-dialog-image").alt = button.querySelector("img").alt;
    $("#photo-dialog-caption").textContent = button.querySelector("strong").textContent;
    dialog.showModal();
  }));
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });

  function filterBoard() {
    const query = $("#board-search").value.trim().toLocaleLowerCase();
    let count = 0;
    $$(".board-list li").forEach((row) => {
      row.hidden = !row.querySelector("a span").textContent.toLocaleLowerCase().includes(query);
      if (!row.hidden) count++;
    });
    $("#board-result").textContent = "전체 " + count + "개의 기록";
    $("#board-empty").hidden = count > 0;
  }
  $("#board-search").addEventListener("input", filterBoard);

  function deleteButton(action, label = "삭제") {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", action);
    return button;
  }
  function syncFriendCount() {
    const count = $("#friend-list").querySelectorAll("li:not(.empty-friend)").length;
    $("#friend-count").textContent = count;
    $(".empty-friend").hidden = count > 0;
  }
  $("#friend-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#friend-message");
    const message = input.value.trim();
    if (!message) { input.value = ""; input.focus(); return; }
    const row = document.createElement("li");
    const author = document.createElement("strong");
    author.textContent = "방문자";
    row.append(author, document.createTextNode(message), deleteButton(() => { row.remove(); syncFriendCount(); input.focus(); }));
    $("#friend-list").prepend(row);
    input.value = "";
    syncFriendCount();
  });
  function syncGuestCount() {
    const count = $("#guest-list").children.length;
    $$("[data-guest-count]").forEach((element) => { element.textContent = count; });
    $("#guest-empty").hidden = count > 0;
  }
  let guestSequence = 0;
  $("#guest-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#guest-message");
    const message = input.value.trim();
    if (!message) { input.value = ""; input.focus(); return; }
    const row = document.createElement("li");
    const header = document.createElement("div");
    header.className = "guest-entry-header";
    const author = document.createElement("strong");
    author.textContent = "NO. " + (++guestSequence) + " 방문자";
    const time = document.createElement("time");
    const now = new Date();
    time.dateTime = now.toISOString();
    time.textContent = now.toLocaleDateString("ko-KR");
    header.append(author, time, deleteButton(() => { row.remove(); syncGuestCount(); input.focus(); $("#guest-feedback").textContent = "방명록을 삭제했어요."; }));
    const body = document.createElement("p");
    body.textContent = message;
    row.append(header, body);
    $("#guest-list").prepend(row);
    input.value = "";
    syncGuestCount();
    $("#guest-feedback").textContent = "방명록에 인사를 남겼어요.";
  });

  const audio = $("#bgm");
  const playlist = $("#music-playlist");
  const tracks = [
    { src: playlist.dataset.first, title: "처음 뵙겠습니다", artist: "지나 · with 휘성" },
    { src: playlist.dataset.second, title: "아이스크림", artist: "MC몽" }
  ];
  let trackIndex = 0;
  let playRequest = 0;
  const playButton = $("#music-play");
  function syncPlayback() {
    const playing = !audio.paused;
    playButton.textContent = playing ? "Ⅱ" : "▶";
    playButton.setAttribute("aria-label", playing ? "음악 일시정지" : "음악 재생");
    playButton.setAttribute("aria-pressed", String(playing));
  }
  async function playMusic() {
    const request = ++playRequest;
    try { await audio.play(); if (request === playRequest) $("#music-status").textContent = "작은 방에 음악이 흐르고 있어요."; }
    catch (error) {
      if (request === playRequest && error.name !== "AbortError") $("#music-status").textContent = "재생할 수 없어요. 다시 재생 버튼을 눌러주세요.";
    }
    syncPlayback();
  }
  function changeTrack(direction) {
    const wasPlaying = !audio.paused;
    playRequest++;
    audio.pause();
    trackIndex = (trackIndex + direction + tracks.length) % tracks.length;
    audio.src = tracks[trackIndex].src;
    audio.load();
    const artist = document.createElement("small");
    artist.textContent = tracks[trackIndex].artist;
    $("#track-name").replaceChildren(document.createTextNode(tracks[trackIndex].title), artist);
    $("#music-time").textContent = "0:00";
    $("#music-status").textContent = "재생 버튼을 눌러 음악을 켜세요.";
    if (wasPlaying) playMusic();
    else syncPlayback();
  }
  playButton.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else { playRequest++; audio.pause(); $("#music-status").textContent = "음악을 잠시 멈췄어요."; }
  });
  $("#music-prev").addEventListener("click", () => changeTrack(-1));
  $("#music-next").addEventListener("click", () => changeTrack(1));
  $("#music-volume").addEventListener("input", (event) => { audio.volume = Number(event.target.value); });
  audio.volume = Number($("#music-volume").value);
  audio.addEventListener("play", syncPlayback);
  audio.addEventListener("pause", syncPlayback);
  audio.addEventListener("ended", () => { changeTrack(1); playMusic(); });
  audio.addEventListener("error", () => { $("#music-status").textContent = "음악 파일을 불러오지 못했어요. 다음 곡을 선택해 주세요."; syncPlayback(); });
  audio.addEventListener("timeupdate", () => {
    const seconds = Math.floor(audio.currentTime || 0);
    $("#music-time").textContent = Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
  });

  renderCalendar();
  filterBoard();
  showPanel(location.hash.slice(1));
})();
