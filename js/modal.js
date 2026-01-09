// modal.js
// Handles open/close of modal and scroll locking

(function () {
  var modalEl = null;
  var dialogEl = null;
  var closeBtn = null;

  function cacheElements() {
    modalEl = document.getElementById("letter-modal");
    dialogEl = modalEl ? modalEl.querySelector(".modal-dialog") : null;
    closeBtn = document.getElementById("modal-close");
  }

  function openModal() {
    if (!modalEl) cacheElements();
    if (!modalEl) return;

    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modalEl) cacheElements();
    if (!modalEl) return;

    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function onBackdropClick(evt) {
    if (!dialogEl) return;
    if (!dialogEl.contains(evt.target)) {
      closeModal();
    }
  }

  function initModal() {
    cacheElements();
    if (!modalEl) return;

    modalEl.addEventListener("click", onBackdropClick);
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
  }

  window.ModalController = {
    init: initModal,
    open: openModal,
    close: closeModal,
  };
})();


