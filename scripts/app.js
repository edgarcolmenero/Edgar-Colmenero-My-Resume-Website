const app = document.getElementById("app");

app.innerHTML = `
  <nav class="nav reveal-down">
    <div class="nav-inner">
      <ul class="nav-left">
        <li class="active">Home</li>
        <li>About</li>
        <li>Services</li>
      </ul>

      <div class="nav-logo">
        <img src="assets/EClogo.png" alt="EC Logo" />
        <span>COLMENERO</span>
      </div>

      <ul class="nav-right">
        <li>Resume</li>
        <li>Production</li>
        <li>Contact</li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <!-- LEFT QUOTE -->
    <div class="hero-quote reveal-left reveal-delay-2">
      <div class="quote-mark">❝</div>
      <p>
        <span class="gradient-text">Colmenero</span> engineers with intention —
        building scalable, reliable web and mobile systems.
      </p>
    </div>

    <!-- CENTER -->
    <div class="hero-center reveal reveal-delay-1">
      <div class="hello-pill">
        Hello!
        <span class="hello-lines"></span>
      </div>

      <h1 class="hero-title">
        I’m <span class="gradient-text">Edgar Colmenero</span>, Full-Stack Engineer &<br />
        <span class="data-line">
          Data Science Scholar
          <span class="data-lines"></span>
        </span>
      </h1>

      <div class="portrait-wrapper">
        <div class="orbit-clip">
          <div class="purple-orbit"></div>
        </div>

        <div class="orbit-system">
          <div class="orbiting-logo" style="--start-angle: -30deg; --duration: 14s;">
            <img src="assets/Ravis.png" alt="Ravis logo" />
          </div>
          <div class="orbiting-logo" style="--start-angle: 90deg; --duration: 18s;">
            <img src="assets/S.png" alt="S logo" />
          </div>
          <div class="orbiting-logo" style="--start-angle: 200deg; --duration: 16s;">
            <img src="assets/Clogo.png" alt="C logo" />
          </div>
        </div>

        <img class="portrait" src="assets/MeT.png" alt="Edgar Portrait" />

        <div class="cta-pill">
          <button class="btn primary">Portfolio →</button>
          <button class="btn ghost">Hire Me</button>
        </div>
      </div>
    </div>

    <!-- RIGHT EXPERIENCE -->
    <div class="hero-exp reveal-right reveal-delay-2">
      <div class="stars">
        <svg class="star" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7b61ff"/>
              <stop offset="100%" stop-color="#a78bfa"/>
            </linearGradient>
          </defs>
          <polygon points="12,2 15,9 22,9 16.8,13.5 19,21 12,16.6 5,21 7.2,13.5 2,9 9,9" fill="none" stroke="url(#starGradient)" stroke-width="1.4"/>
        </svg>
        <svg class="star" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7b61ff"/>
              <stop offset="100%" stop-color="#a78bfa"/>
            </linearGradient>
          </defs>
          <polygon points="12,2 15,9 22,9 16.8,13.5 19,21 12,16.6 5,21 7.2,13.5 2,9 9,9" fill="none" stroke="url(#starGradient)" stroke-width="1.4"/>
        </svg>
        <svg class="star" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7b61ff"/>
              <stop offset="100%" stop-color="#a78bfa"/>
            </linearGradient>
          </defs>
          <polygon points="12,2 15,9 22,9 16.8,13.5 19,21 12,16.6 5,21 7.2,13.5 2,9 9,9" fill="none" stroke="url(#starGradient)" stroke-width="1.4"/>
        </svg>
        <svg class="star" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7b61ff"/>
              <stop offset="100%" stop-color="#a78bfa"/>
            </linearGradient>
          </defs>
          <polygon points="12,2 15,9 22,9 16.8,13.5 19,21 12,16.6 5,21 7.2,13.5 2,9 9,9" fill="none" stroke="url(#starGradient)" stroke-width="1.4"/>
        </svg>
        <svg class="star" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7b61ff"/>
              <stop offset="100%" stop-color="#a78bfa"/>
            </linearGradient>
          </defs>
          <polygon points="12,2 15,9 22,9 16.8,13.5 19,21 12,16.6 5,21 7.2,13.5 2,9 9,9" fill="none" stroke="url(#starGradient)" stroke-width="1.4"/>
        </svg>
      </div>
      <div class="years">00</div>
      <small>Experience</small>
    </div>

    <!-- SOCIALS -->
    <div class="socials reveal-bottom reveal-delay-3">
      <a class="icon linkedin" href="#"><img src="assets/linkedint.png" alt="LinkedIn"></a>
      <a class="icon github" href="#"><img src="assets/github.png" alt="GitHub"></a>
      <a class="icon behance" href="#"><img src="assets/behance.png" alt="Behance"></a>
      <a class="icon email" href="#"><img src="assets/email.png" alt="Email"></a>
    </div>
  </section>
`;

// EXPERIENCE COUNT + STAR FILL
let years = document.querySelector(".years");
let stars = document.querySelectorAll(".stars .star");

let count = 0;
let starIndex = 0;
const interval = setInterval(() => {
  if (count < 2) {
    count += 1;
    years.textContent = `0${count}`;
  }

  if (starIndex < stars.length) {
    stars[starIndex].classList.add("filled");
    starIndex += 1;
  }

  if (count >= 2 && starIndex >= stars.length) {
    clearInterval(interval);
  }
}, 320);
