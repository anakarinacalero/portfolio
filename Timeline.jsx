// Timeline.jsx — career chronology.

const ITEMS = [
  { date: "2025 — present", title: "Freelancer", org: "Self-employed", desc: "Building custom web solutions and software products.", current: true },
  { date: "2023 — 2026", title: "Full Stack Software Developer", org: "Decrypt and Code", desc: "Developing full-stack applications and digital solutions." },
  { date: "2015 — 2020", title: "B.Sc. electrical Engineering", org: "Universidad de Carabobo, Venezuela", desc: "Thesis missing." },
];

function Timeline() {
  return (
    <section className="timeline-section" id="technologies">
      <div className="section-head">
        <span className="eyebrow">A short history</span>
        <h2>Where I've been.</h2>
      </div>
      <ol className="timeline">
        {ITEMS.map((it, i) => (
          <li key={i} className={`timeline-item ${it.current ? "current" : "past"}`}>
            <span className="timeline-date">{it.date}</span>
            <div className="timeline-body">
              <h4 className="timeline-title">
                {it.title} <span className="timeline-org">· {it.org}</span>
              </h4>
              {it.desc && <p className="timeline-desc">{it.desc}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

window.Timeline = Timeline;
