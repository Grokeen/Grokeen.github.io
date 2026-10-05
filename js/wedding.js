(function () {
  "use strict";

  const toast = document.querySelector(".wedding-toast");
  let toastTimer;
  function notify(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 4000);
  }

  async function copyText(value, label) {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(value);
      notify(label + " 복사 완료.");
    } catch (_) {
      notify("복사할 수 없습니다. 주소나 번호를 길게 눌러 직접 복사해 주세요.");
    }
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      copyText(button.dataset.copy, button.dataset.copyLabel || "내용");
    });
  });

  const shareButton = document.querySelector("[data-share]");
  if (shareButton) {
    shareButton.addEventListener("click", async function () {
      const url = window.location.href.split("#")[0];
      if (navigator.share) {
        try {
          await navigator.share({ title: document.title, url: url });
        } catch (error) {
          if (error.name !== "AbortError") await copyText(url, "청첩장 링크");
        }
      } else {
        await copyText(url, "청첩장 링크");
      }
    });
  }

  const lightbox = document.querySelector(".wedding-lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    const fullPhoto = lightbox.querySelector("img");
    let photoLink;
    document.querySelectorAll("[data-gallery-image]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        photoLink = link;
        fullPhoto.src = link.href;
        fullPhoto.alt = link.querySelector("img").alt;
        lightbox.showModal();
      });
    });
    lightbox.querySelector(".wedding-lightbox-close").addEventListener("click", function () { lightbox.close(); });
    lightbox.addEventListener("click", function (event) {
      const rect = lightbox.getBoundingClientRect();
      if (event.target === lightbox && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) lightbox.close();
    });
    lightbox.addEventListener("close", function () {
      fullPhoto.removeAttribute("src");
      if (photoLink) photoLink.focus();
    });
  }

  const rawDate = document.body.dataset.weddingDatetime;
  if (!rawDate) return;
  const eventDate = new Date(rawDate);
  if (Number.isNaN(eventDate.getTime())) return;
  const timezone = "Asia/Seoul";
  const dayText = new Intl.DateTimeFormat("ko-KR", {
    timeZone: timezone, year: "numeric", month: "long", day: "numeric", weekday: "long"
  }).format(eventDate);
  const timeText = new Intl.DateTimeFormat("ko-KR", {
    timeZone: timezone, hour: "numeric", minute: "2-digit", hour12: true
  }).format(eventDate);
  document.querySelectorAll("[data-event-day]").forEach(function (element) { element.textContent = dayText; });
  document.querySelectorAll("[data-event-time]").forEach(function (element) { element.textContent = timeText; });

  function koreanDateParts(date) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone, year: "numeric", month: "numeric", day: "numeric"
    }).formatToParts(date);
    const values = {};
    parts.forEach(function (part) { if (part.type !== "literal") values[part.type] = Number(part.value); });
    return values;
  }

  const eventDay = koreanDateParts(eventDate);
  const calendar = document.querySelector(".wedding-calendar");
  if (calendar) {
    calendar.querySelector("caption").textContent = eventDay.year + ". " + String(eventDay.month).padStart(2, "0");
    const tbody = calendar.querySelector("tbody");
    const offset = new Date(Date.UTC(eventDay.year, eventDay.month - 1, 1)).getUTCDay();
    const totalDays = new Date(Date.UTC(eventDay.year, eventDay.month, 0)).getUTCDate();
    const totalCells = Math.ceil((offset + totalDays) / 7) * 7;
    let row;
    for (let index = 0; index < totalCells; index++) {
      if (index % 7 === 0) {
        row = document.createElement("tr");
        tbody.appendChild(row);
      }
      const cell = document.createElement("td");
      const day = index - offset + 1;
      if (day > 0 && day <= totalDays) {
        const number = document.createElement("span");
        number.textContent = String(day);
        cell.appendChild(number);
        if (day === eventDay.day) {
          cell.className = "is-wedding-day";
          cell.setAttribute("aria-label", day + "일, 예식일");
        }
      }
      row.appendChild(cell);
    }
    calendar.hidden = false;
  }

  const countdown = document.querySelector(".wedding-countdown");
  if (countdown) {
    const today = koreanDateParts(new Date());
    const days = Math.round((Date.UTC(eventDay.year, eventDay.month - 1, eventDay.day) - Date.UTC(today.year, today.month - 1, today.day)) / 86400000);
    countdown.textContent = days > 0 ? "우리의 결혼식까지 D-" + days : days === 0 ? "오늘, 우리의 새로운 시작에 함께해 주세요." : "함께 축하해 주셔서 감사합니다.";
    countdown.hidden = false;
  }
})();
