import { useState, useRef } from 'react';
import SKILLS from '../data/skills';
import RadarChart from '../components/RadarChart';
import '../styles/Skills.css';

const SLIDES = [SKILLS.soft, SKILLS.hard];

export default function Skills() {
  const [active, setActive] = useState(0);

  // touch swipe
  const touchStartX = useRef(0);
  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (dx >  50 && active < SLIDES.length - 1) setActive(a => a + 1);
    if (dx < -50 && active > 0)                 setActive(a => a - 1);
  }

  const slide = SLIDES[active];

  return (
    <div className="skills-page">

      {/* Hero */}
      <div className="skills-hero">
        <p className="skills-hero-eyebrow">Capabilities · {SLIDES.length} categories</p>
        <h1>My <em>Skills</em></h1>
      </div>

      {/* Arrow nav — exactly like the reference image */}
      <div className="skills-nav">
        <button
          className="skills-nav-arrow"
          onClick={() => setActive(a => a - 1)}
          disabled={active === 0}
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <span className="skills-nav-title">{slide.title}</span>

        <button
          className="skills-nav-arrow"
          onClick={() => setActive(a => a + 1)}
          disabled={active === SLIDES.length - 1}
          aria-label="Next"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Slider */}
      <div
        className="skills-slider-outer"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="skills-slider-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((s, i) => (
            <div className="skills-slide" key={s.title}>

              {/* Only render radar when slide is visible — triggers re-animation */}
              <div className="radar-wrap">
                {active === i && (
                  <RadarChart items={s.items} color={s.color} />
                )}
              </div>

              {/* Dot indicators */}
              <div className="slide-dots">
                {SLIDES.map((_, di) => (
                  <button
                    key={di}
                    className={`slide-dot ${active === di ? 'active' : ''}`}
                    style={active === di ? { background: s.color } : {}}
                    onClick={() => setActive(di)}
                  />
                ))}
              </div>

              {/* Detail card — description only, no bars */}
              <div className="skill-detail">
                <div className="skill-detail-header">
                  <span className="skill-detail-title">{s.title}</span>
                  <span className="skill-detail-count">{s.items.length} skills</span>
                </div>
                <p className="skill-detail-desc">{s.description}</p>

                {/* Skill name pills only */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                  {s.items.map(item => (
                    <span key={item.label} style={{
                      fontSize: '0.68rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      border: `1px solid ${s.color}22`,
                      background: `${s.color}0d`,
                      color: s.color,
                      letterSpacing: '0.03em'
                    }}>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}