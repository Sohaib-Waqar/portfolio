import NeuralCanvas from './NeuralCanvas';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="eyebrow-dot" />
          Open to AI &amp; Data Science roles · UK Graduate
        </div>

        <h1>Building intelligent<br />systems from <em>curiosity</em></h1>

        <p className="hero-desc">
          I'm Muhammad Sohaib — a <strong>Computer Science graduate from the UK</strong> who explored
          machine learning, AR/VR, and full-stack web development during my degree.
          I learn fast, build real things, and turn new tools into working products.
          Now targeting <strong>Data Science &amp; AI Engineering</strong> roles.
        </p>

        <div className="hero-actions">
          <a href="/projects" className="btn-primary">
            View Projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost">
            Download CV
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <NeuralCanvas />
      <p className="canvas-hint">hold &amp; drag to rotate &nbsp;·&nbsp; scroll to zoom &nbsp;·&nbsp; hover nodes</p>
    </section>
  );
}