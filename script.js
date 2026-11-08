(function () {
  "use strict";

  var modal = document.getElementById("video-modal");
  var modalCard = modal.querySelector(".modal-card");
  var modalTitle = document.getElementById("modal-title");
  var modalIframe = document.getElementById("modal-iframe");
  var modalYtLink = document.getElementById("modal-yt-link");
  var closeButton = document.getElementById("modal-close");
  var lastFocused = null;

  function openModal(lesson) {
    var videoId = lesson.getAttribute("data-video");
    var title = lesson.getAttribute("data-title");
    var url = lesson.getAttribute("data-url");

    modalTitle.textContent = title;
    modalYtLink.href = url;
    modalIframe.title = title;
    modalIframe.src =
      "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";

    lastFocused = lesson;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeModal() {
    if (modal.hidden) {
      return;
    }

    modal.hidden = true;
    modalIframe.removeAttribute("src");
    modalIframe.title = "";
    document.body.style.overflow = "";

    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  }

  var lessons = document.querySelectorAll(".lesson");
  for (var i = 0; i < lessons.length; i++) {
    lessons[i].addEventListener("click", function () {
      openModal(this);
    });
  }

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "Tab" && !modal.hidden) {
      var focusable = modal.querySelectorAll(
        'a[href], button, iframe, [tabindex]:not([tabindex="-1"])'
      );
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
