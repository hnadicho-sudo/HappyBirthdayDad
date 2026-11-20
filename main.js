document.addEventListener("DOMContentLoaded", () => {
  const toast = document.querySelector(".toast");
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message; toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  };

  document.querySelectorAll('[data-action="menu"]').forEach(btn => {
    btn.addEventListener("click", () => document.querySelector(".nav-links")?.classList.toggle("open"));
  });

  document.querySelectorAll('[data-action="gift"]').forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("opened"); btn.innerHTML = '<span>💛</span><small>With love, Dad</small>';
      document.querySelector("[data-gift-message]")?.classList.remove("hidden");
      showToast("A little love, wrapped just for you.");
    });
  });

  document.querySelectorAll('[data-action="letter"]').forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector("[data-letter]")?.classList.toggle("hidden");
      btn.innerHTML = '<span>💌</span><small>Letter opened</small>';
    });
  });

  document.querySelectorAll("[data-reveal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const output = document.querySelector("[data-reveal-output]");
      if (!output) return;
      output.textContent = btn.dataset.reveal.replace(" | ", " — ");
      output.classList.remove("hidden");
    });
  });

  document.querySelectorAll("[data-flip]").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });

  document.querySelectorAll('[data-action="candles"]').forEach(btn => {
    btn.addEventListener("click", () => {
      const flame = document.querySelector("[data-flame]");
      flame?.classList.toggle("off");
      document.querySelector("[data-cake-message]")?.classList.remove("hidden");
      showToast(flame?.classList.contains("off") ? "Wish made! สุဒ္တောင်းလေး ပြည့်ပါစေ။" : "The candles are glowing again!");
    });
  });

  document.querySelectorAll('[data-action="confetti"]').forEach(btn => {
    btn.addEventListener("click", () => {
      const symbols = ["✦","✧","♥","✺","•"];
      for (let i = 0; i < 42; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti"; piece.textContent = symbols[Math.floor(Math.random()*symbols.length)];
        piece.style.left = Math.random()*100 + "vw";
        piece.style.animationDelay = Math.random()*.8 + "s";
        piece.style.fontSize = (10 + Math.random()*17) + "px";
        document.body.appendChild(piece);
        window.setTimeout(() => piece.remove(), 3800);
      }
      showToast("Happy Birthday, Dad! မွေးနေ့မှာ ပျော်ရွှင်ပါစေ ဖေဖေ။");
    });
  });
  const musicButton = document.createElement("button");
  musicButton.type = "button";
  musicButton.className = "music-toggle";
  musicButton.setAttribute("aria-label", "Play birthday piano music");
  musicButton.setAttribute("aria-pressed", "false");
  musicButton.innerHTML = '<span class="music-icon">♫</span><span class="music-label">Play music</span>';
  document.body.appendChild(musicButton);

  let audioContext;
  let musicTimer = null;
  let isPlaying = false;
  let melodyIndex = 0;

  const noteFrequency = {
    C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00,
    A4:440.00, B4:493.88, C5:523.25, D5:587.33, E5:659.25,
    F5:698.46, G5:783.99
  };
  const melody = [
    ["G4",.75],["G4",.25],["A4",1],["G4",1],["C5",1],["B4",2],
    ["G4",.75],["G4",.25],["A4",1],["G4",1],["D5",1],["C5",2],
    ["G4",.75],["G4",.25],["G5",1],["E5",1],["C5",1],["B4",1],["A4",2],
    ["F5",.75],["F5",.25],["E5",1],["C5",1],["D5",1],["C5",2]
  ];

  const playPianoNote = (name, durationSeconds) => {
    if (!audioContext || !noteFrequency[name]) return;
    const now = audioContext.currentTime;
    const output = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, now);
    output.gain.setValueAtTime(0.0001, now);
    output.gain.exponentialRampToValueAtTime(0.28, now + 0.012);
    output.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    [1, 2, 3].forEach((harmonic, index) => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = index === 0 ? "triangle" : "sine";
      oscillator.frequency.value = noteFrequency[name] * harmonic;
      oscillator.detune.value = index === 0 ? -3 : 2;
      oscillator.connect(filter);
      oscillator.start(now);
      oscillator.stop(now + durationSeconds);
    });
    filter.connect(output);
    output.connect(audioContext.destination);
  };

  const stopMusic = () => {
    isPlaying = false;
    if (musicTimer) window.clearTimeout(musicTimer);
    musicTimer = null;
    melodyIndex = 0;
    musicButton.classList.remove("playing");
    musicButton.setAttribute("aria-pressed", "false");
    musicButton.setAttribute("aria-label", "Play birthday piano music");
    musicButton.querySelector(".music-label").textContent = "Play music";
  };

  const playMelody = () => {
    if (!isPlaying) return;
    if (melodyIndex >= melody.length) melodyIndex = 0;

    const beatLength = 60 / 96;
    const [name, beats] = melody[melodyIndex];
    playPianoNote(name, Math.max(.18, beatLength * beats * .9));
    melodyIndex += 1;

    musicTimer = window.setTimeout(playMelody, beatLength * beats * 1000);
  };

  musicButton.addEventListener("click", async () => {
    if (isPlaying) {
      stopMusic();
      return;
    }

    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") await audioContext.resume();

    isPlaying = true;
    musicButton.classList.add("playing");
    musicButton.setAttribute("aria-pressed", "true");
    musicButton.setAttribute("aria-label", "Stop birthday piano music");
    musicButton.querySelector(".music-label").textContent = "Stop music";
    showToast("Playing “Happy Birthday” on piano.");
    playMelody();
  });
});
