import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  function close() { setOpen(false); }

  return (
    <>
      <header className="header">
        <Link to="/" className="logo" onClick={close}>Sohaib</Link>

        {/* Desktop nav */}
        <nav className="nav">
          <a href="#about">About</a>
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
          <a href="#contact" className="nav-cta">Hire Me</a>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className={`hamburger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        <nav className="mobile-nav">
          <a href="#about"   onClick={close}>About</a>
          <Link to="/projects" onClick={close}>Projects</Link>
          <Link to="/skills"   onClick={close}>Skills</Link>
          <a href="#contact" className="mobile-cta" onClick={close}>Hire Me</a>
        </nav>
      </div>

      {/* Backdrop */}
      {open && <div className="drawer-backdrop" onClick={close} />}
    </>
  );
}