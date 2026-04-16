import '../styles/Contact.css';

export default function Contact() {
  return (
    <div className="contact-section" id="contact">
      <p className="contact-label">Get in touch</p>
      <div className="contact-box">

        <div className="contact-left">
          <h2>Let's work<br /><em>together</em></h2>
          <p>I'm actively looking for Data Analyst, AI Engineer and ML Engineer opportunities in the UK. If you have a role, project, or just want to connect — I'd love to hear from you.</p>

          <div className="contact-links">

            <a href="mailto:sohaib.waqar006@gmail.com" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              sohaib.waqar006@gmail.com
            </a>

            <a href="tel:+447832024133" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              +44 7832 024133
            </a>

            <a href="https://www.linkedin.com/in/muhammad-sohaib-878178229/" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
              linkedin.com/in/muhammad-sohaib
            </a>

            <a href="https://github.com/Sohaib-Waqar" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </span>
              github.com/Sohaib-Waqar
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
