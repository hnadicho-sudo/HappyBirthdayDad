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
});
