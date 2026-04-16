import { useParams, Link } from 'react-router-dom';
import PROJECTS from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) return (
    <div style={{ padding: '8rem 2rem', textAlign: 'center', color: 'var(--muted)' }}>
      Project not found. <Link to="/projects" style={{ color: 'var(--green)' }}>Go back</Link>
    </div>
  );

  return (
    <div style={{ paddingTop: '52px', minHeight: '100vh', background: project.bg }}>

      {/* Back link */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 2.5rem 0' }}>
        <Link to="/projects" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none', transition: 'color 0.2s'
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          All Projects
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '3rem 2.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.65rem', letterSpacing: '0.08em',
              color: project.color, border: `1px solid ${project.color}33`,
              padding: '0.18rem 0.6rem', borderRadius: '999px'
            }}>{tag}</span>
          ))}
        </div>

        <h1 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.0,
          letterSpacing: '-0.03em', color: '#fff',
          marginBottom: '2.5rem'
        }}>{project.title}</h1>

        {/* Meta grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1px', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px', overflow: 'hidden', marginBottom: '3rem'
        }}>
          {[
            { label: 'Year',  value: project.year },
            { label: 'Role',  value: project.role },
            { label: 'Stack', value: project.stack.join(', ') },
          ].map(item => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '1.2rem 1.3rem'
            }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem'
              }}>{item.label}</div>
              <div style={{ fontSize: '0.88rem', color: '#e8e8e8', fontWeight: 500 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: 'rgba(255,255,255,0.6)', lineHeight: 1.8,
          maxWidth: '62ch', fontWeight: 300
        }}>{project.description}</p>

        {/* Placeholder for screenshots/demo */}
        <div style={{
          marginTop: '3rem', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.02)',
          height: '400px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.15)', fontSize: '0.8rem',
          letterSpacing: '0.08em'
        }}>
          PROJECT SCREENSHOTS / DEMO EMBED GOES HERE
        </div>
      </div>
    </div>
  );
}