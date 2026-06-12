// AboutSection.jsx — personal bio with circular photo slot.

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-layout">

        <div className="about-photo-col">
          <div className="about-photo-ring">
            <img
              src="./assets/about/profile.png"
              alt="Ana Calero"
              style={{width:"100%",height:"100%",display:"block",objectFit:"cover"}}
            />
          </div>
        </div>

        <div className="about-text-col">
          <span className="eyebrow">About me</span>
          <h2 className="about-heading">Hello, I'm Ana.</h2>
          <p className="about-role">Full Stack Web Developer</p>
          <p className="about-body">
            I specialize in developing web applications within the .NET ecosystem
            and have a strong passion for Artificial Intelligence. I enjoy learning
            new technologies autonomously, tackling complex challenges, and
            transforming ideas into functional solutions that generate real impact.
          </p>

          <div className="about-pills">
            <span className="about-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
              Self-taught
            </span>
            <span className="about-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
              .NET ecosystem
            </span>
            <span className="about-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0V4.5A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 8A2.5 2.5 0 0 1 17 10.5v9a2.5 2.5 0 0 1-5 0v-9A2.5 2.5 0 0 1 14.5 8z"/></svg>
              AI enthusiast
            </span>
            <span className="about-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></svg>
              Bolivia · remote
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

window.AboutSection = AboutSection;
