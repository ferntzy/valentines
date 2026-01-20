// ==========================================
      // MUSIC FUNCTIONALITY
      // ==========================================
      const bgMusic = document.getElementById("bgMusic");
      const musicToggle = document.getElementById("musicToggle");
      let musicStarted = false;

      // Set volume low for background music
      bgMusic.volume = 0.3;
      bgMusic.play().catch((e) => console.log("Autoplay blocked:", e));
      // Start music on first user interaction
      document.addEventListener(
        "click",
        function initMusic() {
          if (!musicStarted) {
            bgMusic.play().catch((e) => console.log("Audio play failed:", e));
            musicStarted = true;
            musicToggle.classList.remove("paused");
          }
        },
        { once: true },
      );

      // Toggle music on button click
      musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
          bgMusic.play();
          musicToggle.classList.remove("paused");
        } else {
          bgMusic.pause();
          musicToggle.classList.add("paused");
        }
      });

      // ==========================================
      // PHOTO CARD FLIP FUNCTIONALITY
      // ==========================================
      const photoCards = document.querySelectorAll(".photo-card");
      const messageBoxes = document.querySelectorAll(".message-box");

      photoCards.forEach((card) => {
        card.addEventListener("click", function () {
          // Flip the card
          this.classList.toggle("flipped");

          // Get associated message
          const messageId = this.getAttribute("data-message");
          const messageBox = document.querySelector(
            `[data-message-id="${messageId}"]`,
          );

          // Show message with delay
          if (this.classList.contains("flipped")) {
            setTimeout(() => {
              messageBox.classList.add("visible");
              typewriterEffect(messageBox.querySelector("p"));
            }, 800);
          } else {
            messageBox.classList.remove("visible");
          }
        });
      });

      // ==========================================
      // TYPEWRITER EFFECT
      // ==========================================
      function typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = "";
        element.classList.add("typewriter");

        let i = 0;
        const speed = 30; // typing speed in milliseconds

        function type() {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          } else {
            element.classList.remove("typewriter");
            element.style.whiteSpace = "normal";
          }
        }

        type();
      }

      // ==========================================
      // FLOATING HEARTS
      // ==========================================
      const heartsContainer = document.getElementById("heartsContainer");
      const heartSymbols = ["💕", "💗", "💖", "💝", "❤️", "💓"];

      function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent =
          heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = Math.random() * 5 + 6 + "s";
        heart.style.animationDelay = Math.random() * 2 + "s";
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
          heart.remove();
        }, 10000);
      }

      // Create hearts periodically
      setInterval(createHeart, 2000);

      // Create initial hearts
      // Create initial hearts
      for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 500);
      }

      // ==========================================
      // SCROLL FADE-IN USING INTERSECTION OBSERVER
      // ==========================================
      const fadeElements = document.querySelectorAll(".fade-in");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        {
          threshold: 0.15,
        },
      );

      fadeElements.forEach((el) => observer.observe(el));

      // ==========================================
      // FINAL MESSAGE TYPEWRITER ON SCROLL
      // ==========================================
      const finalSection = document.querySelector(".final-section");
      const finalMessage = document.querySelector(".final-message");
      const finalText = document.getElementById("finalText");

      let finalTyped = false;

      const finalObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !finalTyped) {
              finalTyped = true;
              finalMessage.classList.add("visible");
              typewriterEffect(finalText);
            }
          });
        },
        {
          threshold: 0.4,
        },
      );

      finalObserver.observe(finalSection);

      // ==========================================
      // OPTIONAL: RANDOM TILT VARIATION (ARTISTIC)
      // ==========================================
      photoCards.forEach((card) => {
        const randomTilt = (Math.random() * 10 - 5).toFixed(1);
        card.style.transform += ` rotate(${randomTilt}deg)`;
      });


      const startDate = new Date("2025-11-14T16:34:00+08:00");  // ← CHANGE THIS to your actual first chat moment
// Format: "YYYY-MM-DDTHH:MM:SS+08:00"  (Philippine time = UTC+8)

function updateTimer() {
    const now = new Date();
    const diffMs = now - startDate;
    
    if (diffMs < 0) {
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days    = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    document.getElementById("days").textContent    = days;
    document.getElementById("hours").textContent   = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

// Start immediately + update every second
updateTimer();
setInterval(updateTimer, 1000);