import { useState, useEffect } from 'react';
import LAYERS from '../data/layers';

function useColumns() {
  const [cols, setCols] = useState(5);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 400)       setCols(1);
      else if (w < 600)  setCols(2);
      else if (w < 860)  setCols(3);
      else               setCols(5);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

export default function LayerCards() {
  const cols    = useColumns();
  const isMobile = cols <= 2;

  return (
    <div style={{ maxWidth: '960px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
      <p style={{
        fontSize: '0.7rem', letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1.1rem'
      }}>
        Career Architecture
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1px',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.07)'
      }}>
        {LAYERS.map(layer => (
          <div
            key={layer.id}
            style={{
              background: '#161616',
              padding: '1rem 0.9rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              minWidth: 0,
              transition: 'background 0.2s ease',
              cursor: 'default'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1c1c1c'}
            onMouseLeave={e => e.currentTarget.style.background = '#161616'}
          >
            {/* Tag */}
            <span style={{
              fontSize: '0.58rem',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: '#00e676',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {layer.name}
            </span>

            {/* Title */}
            <span style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: isMobile ? '0.75rem' : '0.62rem',
              fontWeight: 600,
              color: '#e8e8e8',
              lineHeight: 1.2
            }}>
              {layer.sub}
            </span>

            {/* Description */}
            <span style={{
              fontSize: isMobile ? '0.68rem' : '0.58rem',
              color: '#888',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: isMobile ? 'unset' : 3,
              WebkitBoxOrient: 'vertical',
              overflow: isMobile ? 'visible' : 'hidden'
            }}>
              {layer.desc}
            </span>

            {/* Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.2rem',
              marginTop: '0.2rem'
            }}>
              {layer.nodes.map(node => (
                <span key={node.label} style={{
                  fontSize: isMobile ? '0.6rem' : '0.52rem',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#555',
                  whiteSpace: 'nowrap'
                }}>
                  {node.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}