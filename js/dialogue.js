// dialogue.js
// MESSAGE constant + typewriter effect with caret

(function () {
  // Easy-to-edit romantic message
  const MESSAGE =
    "亲爱的，生日快乐呀。谢谢你这些年一直在我身边，让平凡的日子也变得闪闪发光。以后的每一年，我都想牵着你的手，一起看更多的风景，一起变老。愿你永远被温柔对待，也愿我能给你最多的温柔。";

  var typingTimeout = null;

  function clearTyping() {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
  }

  function typeWriter(options) {
    var textEl = options.textElement;
    var caretEl = options.caretElement;
    var nameEl = options.nameElement;
    var nameText =
      options.nameText ||
      (nameEl ? nameEl.getAttribute("data-name") || nameEl.textContent.trim() : "");
    var text = options.text || MESSAGE;
    var nameSpeed = options.nameSpeed || 700; // 0.7s per character for name
    var textSpeed = options.textSpeed || 150; // faster for main message

    if (!textEl || !caretEl) return;

    clearTyping();

    // reset content
    if (nameEl) {
      nameEl.textContent = "";
    }
    textEl.textContent = "";

    var index = 0;
    var phase = nameEl && nameText ? "name" : "message";

    function tick() {
      if (phase === "name" && nameEl) {
        if (index <= nameText.length) {
          nameEl.textContent = nameText.slice(0, index);
          index += 1;
          typingTimeout = setTimeout(tick, nameSpeed);
          return;
        } else {
          phase = "message";
          index = 0;
        }
      }

      if (phase === "message") {
        if (index <= text.length) {
          textEl.textContent = text.slice(0, index);
          index += 1;
          typingTimeout = setTimeout(tick, textSpeed);
        } else {
          // keep caret blinking at the end
          typingTimeout = null;
        }
      }
    }

    caretEl.classList.add("is-active");
    tick();
  }

  window.Dialogue = {
    MESSAGE: MESSAGE,
    typeWriter: typeWriter,
    clearTyping: clearTyping,
  };
})();


