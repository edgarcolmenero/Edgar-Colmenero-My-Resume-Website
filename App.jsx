const app = document.getElementById('app');

app.innerHTML = `
  <div class="page">
    <header class="hero-header">
      <div class="container">
        <nav class="nav-pill" aria-label="Primary">
          <div class="nav-group nav-group--left">
            <a class="nav-link nav-link--active" href="#">Home</a>
            <a class="nav-link" href="#">About</a>
            <a class="nav-link" href="#">Skills</a>
          </div>
          <div class="nav-center" aria-label="Colmenero brand">
            <span class="nav-logo">EC</span>
            <span class="nav-label">COLMENERO</span>
          </div>
          <div class="nav-group nav-group--right">
            <a class="nav-link" href="#">Resume</a>
            <a class="nav-link" href="#">Production</a>
            <a class="nav-link" href="#">Contact</a>
          </div>
        </nav>
      </div>
    </header>

    <main class="hero">
      <div class="container hero-grid">
        <aside class="hero-quote reveal" style="--delay: 0.1s;">
          <div class="quote-mark">“</div>
          <p>
            <span class="gradient-text">Colmenero</span> engineers with intention — building scalable, reliable web and
            mobile systems.
          </p>
        </aside>

        <section class="hero-center reveal" style="--delay: 0.2s;">
          <div class="hello-wrap">
            <div class="hello-pill">Hello!</div>
            <div class="hello-lines" aria-hidden="true">
              <svg viewBox="0 0 90 16" role="presentation">
                <path d="M5 8h16" />
                <path d="M35 8h16" />
                <path d="M65 8h16" />
              </svg>
            </div>
          </div>

          <h1 class="hero-title">
            I'm <span class="gradient-text gradient-text--strong">Edgar Colmenero</span>, Full-Stack Engineer &amp; Data
            Science Scholar
          </h1>

          <div class="headline-squiggle" aria-hidden="true">
            <svg viewBox="0 0 120 40" role="presentation">
              <path
                d="M10 20c20-18 40-18 60 0s40 18 60 0"
                fill="none"
                stroke="url(#squiggleGradient)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient id="squiggleGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#7B6CFF" />
                  <stop offset="45%" stop-color="#8B5CF6" />
                  <stop offset="100%" stop-color="#A855F7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div class="portrait-stage">
            <div class="hero-circle" aria-hidden="true"></div>

            <div class="orbit" aria-hidden="true">
              <div class="orbit-logo orbit-logo--ravi">
                <img src="assets/logo-ravi.png" alt="Ravi logo placeholder" />
              </div>
              <div class="orbit-logo orbit-logo--swift">
                <img src="assets/logo-swiftsend.png" alt="SwiftSend logo placeholder" />
              </div>
              <div class="orbit-logo orbit-logo--colmenero">
                <div class="orbit-logo__inner">C</div>
              </div>
            </div>

            <img
              class="hero-portrait"
              src="assets/portrait-edgar.png"
              alt="Portrait placeholder"
            />
          </div>
        </section>

        <aside class="hero-experience reveal" style="--delay: 0.3s;">
          <div class="stars" aria-hidden="true">
            <span class="star"></span>
            <span class="star"></span>
            <span class="star"></span>
            <span class="star"></span>
            <span class="star"></span>
          </div>
          <div class="experience-years">02 Years</div>
          <div class="experience-label">Experience</div>
        </aside>
      </div>

      <div class="container hero-socials reveal" style="--delay: 0.4s;">
        <a class="social-icon social-icon--linkedin" href="#" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1 6h2v12H4V9Zm6 0h2v2.2h.03c.3-.6 1.5-2.2 3.7-2.2 2.7 0 4.3 1.7 4.3 5.4V21h-2v-6.7c0-2.2-.8-3.4-2.5-3.4-1.6 0-2.5 1.1-2.9 2.2-.1.3-.1.8-.1 1.3V21h-2V9Z"
            />
          </svg>
        </a>
        <a class="social-icon social-icon--github" href="#" aria-label="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.9-.7 2.4-1.1.1-.8.4-1.3.7-1.6-2.4-.3-5-1.2-5-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1.9-.2 1.9-.4 2.9-.4s2 .2 2.9.4c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.1c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
            />
          </svg>
        </a>
        <a class="social-icon social-icon--mail" href="#" aria-label="Email">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.2l8 5 8-5V7H4Zm16 10V9.3l-7.4 4.7a1 1 0 0 1-1.2 0L4 9.3V17h16Z" />
          </svg>
        </a>
        <a class="social-icon social-icon--behance" href="#" aria-label="Behance">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9.7 11.5c.9-.4 1.5-1.1 1.5-2.3 0-2.4-1.9-3.2-4.1-3.2H2v12h5.6c2.7 0 4.6-1.1 4.6-3.6 0-1.6-.9-2.6-2.5-2.9Zm-5.4-3h2.6c1 0 1.8.3 1.8 1.3 0 1-.7 1.4-1.7 1.4H4.3V8.5Zm2.7 7.3H4.3v-2.8h2.7c1.2 0 2 .4 2 1.4 0 1.1-.8 1.4-2 1.4Zm12.2-4.2c-.4-2.5-2.4-3.9-4.8-3.9-2.8 0-5 2-5 5.1 0 3 2 5 5 5 2.1 0 4-1.1 4.6-3.3h-2.1c-.3.9-1.2 1.4-2.4 1.4-1.6 0-2.6-1-2.7-2.4h7.4c0-.6 0-1.2-.1-1.9ZM14.5 10c1.4 0 2.2.8 2.4 2.1h-4.8c.2-1.3 1.1-2.1 2.4-2.1Zm3.1-3.1h-5v-1.4h5v1.4Z"
            />
          </svg>
        </a>
      </div>
    </main>
  </div>
`;
