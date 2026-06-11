// InterestsSection.jsx — AI passion + self-taught mindset.

function InterestsSection() {
  const areas = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 4-3.5 7-7 9-3.5-2-7-5-7-9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2"/></svg>,
      title: "Artificial Intelligence",
      body: "I am passionate about AI and the transformational impact it is having on the software industry. I explore new models, emerging frameworks, and practical ways to integrate AI capabilities into everyday web applications.",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6-6-6M12 19h8"/></svg>,
      title: "Emerging technologies",
      body: "I enjoy experimenting with new tools the moment they land — whether that is a new runtime, a language feature, or an API pattern. Staying at the edge is how I keep growing.",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
      title: "Self-directed learning",
      body: "As a self-taught developer, continuous learning is core to how I work. I find special motivation in building knowledge from scratch, solving problems I've never seen before, and turning curiosity into production code.",
    },
  ];
  return (
    <section className="interests-section" id="interests">
      <div className="section-head">
        <span className="eyebrow">What drives me</span>
        <h2>Interests.</h2>
      </div>
      <div className="interests-grid">
        {areas.map(a => (
          <div key={a.title} className="interest-card">
            <span className="interest-icon">{a.icon}</span>
            <h4 className="interest-title">{a.title}</h4>
            <p className="interest-body">{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

window.InterestsSection = InterestsSection;
