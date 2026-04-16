import '../styles/Contact.css';

export default function Contact() {
  return (
    <div className="contact-section" id="contact">
      <p className="contact-label">Get in touch</p>
      <div className="contact-box">

        <div className="contact-left">
          <h2>Let's work<br /><em>together</em></h2>
          <p>I'm actively looking for Data Science and AI Engineering opportunities in the UK. If you have a role, project, or just want to connect — I'd love to hear from you.</p>

          <div className="contact-links">
            <a href="mailto:sohaib@email.com" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              sohaib@email.com
            </a>

            <a href="https://linkedin.com/in/sohaib" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
              linkedin.com/in/sohaib
            </a>

            <a href="https://github.com/sohaib" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </span>
              github.com/sohaib
            </a>

            <a href="#" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </span>
              Download CV
            </a>
          </div>
        </div>

        <div className="contact-right">
          <div className="form-row">
            <label>Your name</label>
            <input type="text" placeholder="Jane Smith" />
          </div>
          <div className="form-row">
            <label>Email address</label>
            <input type="email" placeholder="jane@company.com" />
          </div>
          <div className="form-row">
            <label>Message</label>
            <textarea rows="5" placeholder="Tell me about the role or project…" />
          </div>
          <button className="form-submit">
            Send message
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}