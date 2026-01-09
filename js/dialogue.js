// dialogue.js
// MESSAGE constant + typewriter effect with caret

(function () {
  // Easy-to-edit romantic message
  const MESSAGE =
    "现在是 1月9日 晚上 11点59分，可爱的周芳琳小姐，生日快乐😌。 我应该是最后一个祝你生日快乐的吧🤭我可能不是第一个，但 我希望我是最后一个😌。所以 如果有一天 你觉得你身边一个人都没有的时候，不妨回头看看，也许我就在那里😌。希望你天天开心，希望你可以成为自己所希望的大人，希望这个世界温柔待你，希望你 芳而不俗，琳如美玉😌。";

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


