// NextSteps.jsx — "What's Next?" learning roadmap.

function NextSteps() {
  const learning = [
    { label: "Angular", detail: "Building scalable and maintainable enterprise applications.", status: "active" },
    { label: "Microsoft Azure", detail: "Cloud services, deployment strategies, and AI integrations.", status: "active" },
    { label: "AI + Web integration", detail: "Best practices for applications that combine web technologies with AI-powered services.", status: "active" },
  ];
  const resources = [
    { name: "Microsoft Learn", href: "https://learn.microsoft.com" },
    { name: "Anthropic Skilljar", href: "https://anthropic.skilljar.com" },
    { name: "Official docs & technical blogs", href: null },
    { name: "Hands-on personal projects", href: null },
  ];
  return (
    <section className="nextsteps-section" id="next-steps">
      <div className="section-head">
        <span className="eyebrow">On the horizon</span>
        <h2>What's next.</h2>
      </div>
      <div className="nextsteps-layout">
        <div className="nextsteps-col">
          <p className="nextsteps-intro">
            Currently expanding expertise in modern frontend development and cloud technologies.
          </p>
          <div className="ns-block">
            <div className="ns-block-label">Currently learning</div>
            <ul className="ns-list">
              {learning.map(it => (
                <li key={it.label} className="ns-item">
                  <span className="ns-dot" />
                  <div>
                    <span className="ns-item-label">{it.label}</span>
                    <span className="ns-item-detail"> — {it.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="nextsteps-col">
          <div className="ns-block">
            <div className="ns-block-label">Learning resources</div>
            <ul className="ns-resource-list">
              {resources.map(r => (
                <li key={r.name} className="ns-resource">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  {r.href
                    ? <a href={r.href} target="_blank" rel="noopener noreferrer">{r.name}</a>
                    : <span>{r.name}</span>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

window.NextSteps = NextSteps;
