import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';
import '../styles/Projects.css';

const featured = PROJECTS.filter(p => p.featured);
const all      = PROJECTS.filter(p => !p.featured);

// Geometric SVG pattern per project (gives each card a unique feel)
function CardVisual({ project }) {
  const c = project.color;
  return (
    <div
      className="card-bg"
      style={{ background: project.bg }}
    >
      <svg
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity: 0.55 }}
        viewBox="0 0 960 480"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`rg-${project.id}`} cx="60%" cy="40%" r="55%">
            <stop offset="0%"   stopColor={c} stopOpacity="0.35" />
            <stop offset="100%" stopColor={c} stopOpacity="0"    />
          </radialGradient>
        </defs>
        <rect width="960" height="480" fill={`url(#rg-${project.id})`} />
        {/* Grid lines */}
        {[...Array(12)].map((_,i) => (
          <line key={`v${i}`}
            x1={i*88} y1="0" x2={i*88} y2="480"
            stroke={c} strokeOpacity="0.06" strokeWidth="1"
          />
        ))}
        {[...Array(7)].map((_,i) => (
          <line key={`h${i}`}
            x1="0" y1={i*80} x2="960" y2={i*80}
            stroke={c} strokeOpacity="0.06" strokeWidth="1"
          />
        ))}
        {/* Accent circle */}
        <circle cx="680" cy="160" r="180"
          fill="none" stroke={c} strokeOpacity="0.12" strokeWidth="1"
        />
        <circle cx="680" cy="160" r="110"
          fill="none" stroke={c} strokeOpacity="0.1" strokeWidth="1"
        />
        <circle cx="680" cy="160" r="45"
          fill={c} fillOpacity="0.08"
        />
      </svg>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="projects-page">

      {/* Hero Banner */}
      <div className="projects-hero">
        <p className="projects-hero-eyebrow">Selected work · {PROJECTS.length} projects</p>
        <h1>Featured<br /><em>Work</em></h1>
        <p>A selection of things I've built — from AI pipelines and data dashboards to immersive 3D web experiences.</p>
      </div>

      {/* Featured stacked cards */}
      <p className="featured-label">Featured</p>
      <div className="featured-list">
        {featured.map((project, i) => (
          <Link
            to={`/projects/${project.id}`}
            className="featured-card"
            key={project.id}
          >
            <CardVisual project={project} />
            <div className="card-gradient" />
            <span className="card-index">0{i + 1}</span>

            <div className="card-content">
              <div className="card-tags">
                {project.tags.map(tag => (
                  <span className="card-tag-pill" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="card-title-row">
                <h2 className="card-title">{project.title}</h2>
                <div className="card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              <p className="card-meta">{project.year} · {project.role}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* All other projects grid */}
      {all.length > 0 && (
        <div className="all-projects">
          <p className="all-projects-label">More Projects</p>
          <div className="projects-grid">
            {all.map(project => (
              <Link
                to={`/projects/${project.id}`}
                className="project-tile"
                key={project.id}
              >
                <span className="tile-year">{project.year}</span>
                <div className="tile-title">{project.title}</div>
                <div className="tile-desc">{project.description}</div>
                <div className="tile-tags">
                  {project.tags.map(tag => (
                    <span className="tile-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}