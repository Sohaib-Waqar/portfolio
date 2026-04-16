export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      maxWidth: '960px',
      margin: '0 auto',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '0.82rem', color: 'var(--faint)' }}>
        Sohaib · UK Graduate
      </span>
      <span style={{ fontSize: '0.72rem', color: 'var(--faint)' }}>
        Built with Vite &amp; React ✦
      </span>
    </footer>
  );
}