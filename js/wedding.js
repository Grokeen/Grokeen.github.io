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
    const motionPreference = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    const canAnimate = typeof fullPhoto.animate === "function";
    let photoLink;
    let photoAnimation;
    let preparing = false;
    let closing = false;
    lightbox.classList.toggle("has-photo-motion", canAnimate);

    function reduceMotion() { return motionPreference && motionPreference.matches; }

    function thumbnailTransform() {
      const photo = fullPhoto.getBoundingClientRect();
      const thumbnail = photoLink && photoLink.getBoundingClientRect();
      if (!thumbnail || !photo.width || !photo.height || thumbnail.bottom <= 0 || thumbnail.top >= window.innerHeight) {
        return "translate3d(0, 16px, 0) scale(.94)";
      }
      const x = thumbnail.left + thumbnail.width / 2 - photo.left - photo.width / 2;
      const y = thumbnail.top + thumbnail.height / 2 - photo.top - photo.height / 2;
      return "translate3d(" + x + "px, " + y + "px, 0) scale(" + thumbnail.width / photo.width + ", " + thumbnail.height / photo.height + ")";
    }

    function finishClosing() {
      if (lightbox.open) lightbox.close();
    }

    function closePhoto() {
      if (!lightbox.open || closing) return;
      closing = true;
      const current = window.getComputedStyle(fullPhoto);
      const transform = current.transform;
      const opacity = current.opacity;
      if (photoAnimation) photoAnimation.cancel();
      lightbox.classList.remove("is-opening");
      lightbox.classList.add("is-closing");
      if (reduceMotion()) {
        finishClosing();
      } else if (canAnimate) {
        photoAnimation = fullPhoto.animate([
          { transform: transform, opacity: opacity },
          { transform: thumbnailTransform(), opacity: 0 }
        ], { duration: 260, easing: "cubic-bezier(.4, 0, 1, 1)", fill: "forwards" });
        photoAnimation.finished.then(finishClosing, finishClosing);
      } else {
        window.setTimeout(finishClosing, 260);
      }
    }

    document.querySelectorAll("[data-gallery-image]").forEach(function (link) {
      link.addEventListener("click", async function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (preparing || lightbox.open) return;
        preparing = true;
        photoLink = link;
        fullPhoto.src = link.href;
        fullPhoto.alt = link.querySelector("img").alt;
        // Decode before measuring, so the first frame already has the right size.
        try {
          if (typeof fullPhoto.decode === "function") await fullPhoto.decode();
        } catch (_) {
          if (!fullPhoto.naturalWidth) {
            preparing = false;
            fullPhoto.removeAttribute("src");
            notify("사진을 불러올 수 없습니다. 잠시 후 다시 눌러 주세요.");
            return;
          }
        }
        preparing = false;
        document.documentElement.classList.add("has-wedding-lightbox");
        lightbox.classList.add("is-opening");
        lightbox.showModal();
        if (canAnimate && !reduceMotion()) {
          photoAnimation = fullPhoto.animate([
            { transform: thumbnailTransform(), opacity: .35 },
            { transform: "none", opacity: 1 }
          ], { duration: 460, easing: "cubic-bezier(.22, 1, .36, 1)" });
        }
      });
    });
    lightbox.querySelector(".wedding-lightbox-close").addEventListener("click", closePhoto);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closePhoto();
    });
    lightbox.addEventListener("cancel", function (event) {
      event.preventDefault();
      closePhoto();
    });
    lightbox.addEventListener("close", function () {
      if (photoAnimation) photoAnimation.cancel();
      photoAnimation = null;
      closing = false;
      lightbox.classList.remove("is-opening", "is-closing");
      document.documentElement.classList.remove("has-wedding-lightbox");
      fullPhoto.removeAttribute("src");
      if (photoLink) photoLink.focus({ preventScroll: true });
      photoLink = null;
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
