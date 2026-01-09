// main.js
// Wires envelope click to audio, modal, and typewriter dialogue

(function () {
  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 0);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  onReady(function () {
    var envelopeBtn = document.getElementById("envelope-button");
    var textEl = document.getElementById("dialogue-text");
    var caretEl = document.getElementById("dialogue-caret");
    var cardEl = document.querySelector(".polaroid-card");
    var vnDialogueEl = document.querySelector(".vn-dialogue");
    var nameEl = document.getElementById("vn-name");
    var hasOpenedOnce = false;

    if (!envelopeBtn) return;

    if (window.ModalController && typeof window.ModalController.init === "function") {
      window.ModalController.init();
    }

    function handleOpen() {
      if (window.AudioController && typeof window.AudioController.playBgmWithFade === "function") {
        window.AudioController.playBgmWithFade();
      }

      if (window.ModalController && typeof window.ModalController.open === "function") {
        window.ModalController.open();
      }

      // trigger photo-from-envelope animation
      if (cardEl) {
        cardEl.classList.remove("animate-from-envelope");
        // force reflow so animation can restart if opened again
        // eslint-disable-next-line no-unused-expressions
        cardEl.offsetWidth;
        cardEl.classList.add("animate-from-envelope");
      }

      // hide dialogue bar until photo animation finishes
      if (vnDialogueEl) {
        vnDialogueEl.classList.remove("is-visible");
      }

      if (window.Dialogue && typeof window.Dialogue.typeWriter === "function") {
        if (typeof window.Dialogue.clearTyping === "function") {
          window.Dialogue.clearTyping();
        }
        // wait for photo animation (~3s) before showing dialogue
        setTimeout(function () {
          if (vnDialogueEl) {
            vnDialogueEl.classList.add("is-visible");
          }
          // wait for dialogue fade-in (~0.7s) before starting typewriter
          setTimeout(function () {
            var nameText = nameEl ? nameEl.getAttribute("data-name") || nameEl.textContent.trim() : "";
            window.Dialogue.typeWriter({
              textElement: textEl,
              caretElement: caretEl,
              nameElement: nameEl,
              nameText: nameText,
            });
          }, 750);
        }, 3200);
      }

      hasOpenedOnce = true;
    }

    envelopeBtn.addEventListener("click", function () {
      handleOpen();
    });

    // For accessibility / keyboard support (e.g., desktop testing)
    envelopeBtn.addEventListener("keyup", function (evt) {
      if (evt.key === "Enter" || evt.key === " ") {
        handleOpen();
      }
    });
  });
})();


