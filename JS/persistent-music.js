(function () {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;

  const KEY_PLAYING = 'molecularMuse.musicPlaying';
  const KEY_TIME = 'molecularMuse.musicTime';
  const KEY_UPDATED_AT = 'molecularMuse.musicUpdatedAt';

  let userInteracted = false;

  function safeNumber(value, fallback) {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function estimateCurrentTime() {
    const savedTime = safeNumber(localStorage.getItem(KEY_TIME), 0);
    const updatedAt = safeNumber(localStorage.getItem(KEY_UPDATED_AT), Date.now());
    const wasPlaying = localStorage.getItem(KEY_PLAYING) === 'true';

    if (!wasPlaying) return savedTime;

    const elapsed = Math.max(0, (Date.now() - updatedAt) / 1000);
    return savedTime + elapsed;
  }

  function storeState() {
    localStorage.setItem(KEY_TIME, audio.currentTime.toString());
    localStorage.setItem(KEY_UPDATED_AT, Date.now().toString());
    localStorage.setItem(KEY_PLAYING, audio.paused ? 'false' : 'true');
  }

  function applyResumeTime() {
    const targetTime = estimateCurrentTime();
    const duration = audio.duration;

    if (Number.isFinite(duration) && duration > 0) {
      audio.currentTime = targetTime % duration;
    } else {
      audio.currentTime = targetTime;
    }
  }

  function tryResumePlayback() {
    if (localStorage.getItem(KEY_PLAYING) !== 'true') return;

    applyResumeTime();

    audio.play().catch(function () {
      // Browser may block autoplay until the first user gesture.
    });
  }

  function startOnFirstInteraction() {
    if (userInteracted) return;

    userInteracted = true;
    tryResumePlayback();

    if (audio.paused) {
      audio.play().catch(function () {
        // If play still fails, we'll try again on the next interaction.
      });
    }
  }

  audio.addEventListener('loadedmetadata', function () {
    applyResumeTime();
    tryResumePlayback();
  });

  audio.addEventListener('play', storeState);
  audio.addEventListener('pause', storeState);
  audio.addEventListener('timeupdate', function () {
    if (!audio.paused) storeState();
  });

  window.addEventListener('beforeunload', storeState);

  ['click', 'touchstart', 'keydown'].forEach(function (eventName) {
    document.addEventListener(eventName, startOnFirstInteraction, { passive: true, once: false });
  });

  tryResumePlayback();
})();
