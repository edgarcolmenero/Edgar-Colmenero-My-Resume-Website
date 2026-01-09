const app = document.getElementById("app");

app.innerHTML = `
  <nav class="nav">
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
    <div class="hero-quote reveal-left">
      <div class="quote-mark">❝</div>
      <p>
        <span class="gradient-text">Colmenero</span> engineers with intention —
        building scalable, reliable web and mobile systems.
      </p>
    </div>

    <!-- CENTER -->
    <div class="hero-center">
      <div class="hello-pill reveal-top">
        Hello!
        <span class="hello-lines"></span>
      </div>

      <h1 class="hero-title reveal">
        I’m <span class="gradient-text">Edgar Colmenero</span>, Full-Stack Engineer &<br />
        <span class="data-line">
          Data Science Scholar
          <span class="data-lines"></span>
        </span>
      </h1>

      <div class="portrait-wrapper reveal">
        <div class="purple-orbit">
          <img class="orbit orbit-1" src="assets/Ravis.png" />
          <img class="orbit orbit-2" src="assets/S.png" />
          <img class="orbit orbit-3" src="assets/Clogo.png" />
        </div>

        <img class="portrait" src="assets/MeT.png" alt="Edgar Portrait" />

        <div class="cta-pill">
          <button class="btn primary">Portfolio →</button>
          <button class="btn ghost">Hire Me</button>
        </div>
      </div>
    </div>

    <!-- RIGHT EXPERIENCE -->
    <div class="hero-exp reveal-right">
      <div class="stars">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="years">02</div>
      <small>Experience</small>
    </div>

    <!-- SOCIALS -->
    <div class="socials reveal-bottom">
      <a class="icon linkedin" href="#"><img src="assets/linkedint.png"></a>
      <a class="icon github" href="#"><img src="assets/github.png"></a>
      <a class="icon behance" href="#"><img src="assets/behance.png"></a>
      <a class="icon email" href="#"><img src="assets/email.png"></a>
    </div>
  </section>
`;

// EXPERIENCE COUNT + STAR FILL
let years = document.querySelector(".years");
let stars = document.querySelectorAll(".stars span");

let count = 0;
const interval = setInterval(() => {
  if (count < 2) {
    count++;
    years.textContent = "0" + count;
    stars[count * 2 - 1]?.classList.add("filled");
  } else {
    stars.forEach(s => s.classList.add("filled"));
    clearInterval(interval);
  }
}, 400);
