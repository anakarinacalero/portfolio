// Contact.jsx — contact section with status + email + socials.

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-card">
        <span className="eyebrow">Say hello</span>
        <h2 className="contact-h">
          let's build something <em>thoughtful</em>.
        </h2>
        <p className="contact-lead">
          Available for backend & full-stack work. Open to remote and Bolivia-based teams.
        </p>
        <a className="btn btn-primary" href="mailto:hola@anacalero.dev">
          <Icon name="mail" size={14} /> anacalero@gmail.com
        </a>
        <div className="contact-socials">
          <a className="social" href="https://github.com/anakarinacalero"><Icon name="github" size={16} /> github</a>
          <a className="social" href="https://www.linkedin.com/in/ana-calero-207082414/"><Icon name="linkedin" size={16} /> linkedin</a>
        </div>
      </div>
    </section>
  );
}

window.Contact = Contact;
