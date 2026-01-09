// audio.js
// Handles background music playback (no fade-in)

(function () {
  const BGM_ID = "bgm";
  const TARGET_VOLUME = 0.7;

  let hasStarted = false;

  function playBgmWithFade() {
    if (hasStarted) return;
    const audio = document.getElementById(BGM_ID);
    if (!audio) return;

    hasStarted = true;
    audio.loop = true;
    audio.volume = TARGET_VOLUME;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(function () {
        // If autoplay is blocked even after gesture, allow retry later
        hasStarted = false;
      });
    }
  }

  // Expose to global scope
  window.AudioController = {
    playBgmWithFade: playBgmWithFade,
  };
})();


