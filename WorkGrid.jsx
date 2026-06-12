// WorkGrid.jsx — Projects carousel: big preview image per project,
// short description below, click to open the full modal.

const EXPERIENCE_SUMMARY = "Since 2023, I have been designing and delivering full-stack web applications using ASP.NET Core, C#, Blazor WebAssembly, and JavaScript, supporting multiple business workflows in a remote environment. I contributed to the development of a custom ERP platform from data modeling and API design to frontend implementation, creating solutions actively used by operations teams. My work included integrating more than 20 third-party REST APIs, such as Twilio and Gmail, to automate communication processes and connect external services with core business systems. I also developed a reusable Blazor component library that improved UI consistency and reduced code duplication across modules. To increase development efficiency, I incorporated AI-assisted tools such as GitHub Copilot and Claude Code into my workflow for scaffolding and repetitive development tasks. Throughout the software lifecycle, I collaborated closely with designers, product managers, and QA teams to deliver scalable, maintainable, and user-focused solutions.";

const PROJECTS = [
  {
    id: "bolsa",
    year: "2025", kind: "Platform", featured: true,
    title: "Stock Exchange Platform",
    blurb: "Authentication and KYC flows for a stock-trading platform — login, recovery, and identity verification.",
    desc: "Authentication and KYC flows for a stock-trading platform. Login, password recovery, error handling, and identity verification, designed to feel reassuring on something as sensitive as a brokerage account.",
    tags: ["React", "KYC", "UI/UX"],
    repo: "https://github.com/anacalero/bolsa-de-valores",
    shots: 3,
    images: ["assets/bolsa/login.png", "assets/bolsa/recuperacion.png", "assets/bolsa/error.png"],
  },
  {
    id: "facturas-claude",
    year: "2026", kind: "Tool",
    title: "FacturasClaude",
    blurb: "AI-powered invoice data extraction using Claude API — drop a bill, get structured totals, taxes, and line items back.",
    desc: "AI-powered invoice data extraction using Claude API. Drop in a utility bill or invoice and Claude reads it, returning structured totals, taxes, currency, and line-item breakdowns ready to use.",
    tags: ["Claude API", "OCR", "Automation"],
    repo: "https://github.com/anakarinacalero/FacturasClaude",
    shots: 3,
    images: ["assets/facturas/home.png", "assets/facturas/resultado.png", "assets/facturas/datos_comunes.jpg"],
  },
  {
    id: "examenapp",
    year: "2024", kind: "Tool",
    title: "ExamenApp",
    blurb: "A web app for building, taking, and grading exams online.",
    desc: "A web app for building, taking, and grading exams online — question authoring, timed test sessions, and results review in one place.",
    tags: ["C#", "EF Core"],
    repo: "https://github.com/anakarinacalero/ExamenApp",
    shots: 10,
    images: [
      "assets/examen/screenshot-01.png",
      "assets/examen/screenshot-02.png",
      "assets/examen/screenshot-03.png",
      "assets/examen/screenshot-04.png",
      "assets/examen/screenshot-05.png",
      "assets/examen/screenshot-06.png",
      "assets/examen/screenshot-07.png",
      "assets/examen/screenshot-08.png",
      "assets/examen/screenshot-09.png",
      "assets/examen/screenshot-10.png",
    ],
  },
  {
    id: "casa",
    year: "2023", kind: "Web",
    title: "Casa",
    blurb: "A side-project rental dashboard. Reactive, opinionated, fast.",
    desc: "A side-project rental dashboard. Reactive, opinionated, fast — the kind of side project that taught me more than most jobs.",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    repo: "https://github.com/anacalero/casa",
    shots: 3,
  },
];

function WorkGrid() {
  const [open, setOpen] = React.useState(null);   // project for modal
  const [active, setActive] = React.useState(0);   // carousel index
  const n = PROJECTS.length;

  const go = (dir) => setActive(a => (a + dir + n) % n);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch swipe on the carousel
  const touch = React.useRef({ x: 0, active: false });
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, active: true }; };
  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1);
    touch.current.active = false;
  };

  const cur = PROJECTS[active];

  return (
    <section className="work" id="work">
      <div className="section-head">
        <span className="eyebrow">Experience · 2023 — 2026</span>
        <h2>Full Stack Software Developer · Decrypt and Code</h2>
        <p className="proj-caption-desc" style={{ color: "var(--accent-lavender)" }}>2023 – Present · México (Remote)</p>
      </div>

      <p className="proj-caption-desc" style={{ maxWidth: "75ch", marginBottom: 64 }}>
        {EXPERIENCE_SUMMARY}
      </p>

      <div className="section-head">
        <h2>Personal Projects</h2>
        <p className="proj-caption-desc">Inspired by modules I built for ERP platform projects</p>
      </div>

      <div className="proj-carousel">
        <div className="proj-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="proj-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="proj-slide"
                onClick={() => setOpen(p)}
                aria-label={`Open ${p.title}`}
                tabIndex={i === active ? 0 : -1}
              >
                <img
                  src={p.images && p.images[0]}
                  alt={`${p.title} preview`}
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                />
                <span className="proj-slide-shade" aria-hidden="true"></span>
                <span className="proj-open-hint">
                  View project
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
                </span>
              </button>
            ))}
          </div>

          <button className="proj-arrow left" onClick={() => go(-1)} aria-label="Previous project">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="proj-arrow right" onClick={() => go(1)} aria-label="Next project">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Caption below */}
        <div className="proj-caption">
          <div className="proj-caption-head">
            <div className="proj-caption-meta">
              <span>{cur.year}</span><span>·</span><span>{cur.kind}</span>
              <span className="proj-count">{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            </div>
            <h3 className="proj-caption-title">{cur.title}</h3>
            <p className="proj-caption-desc">{cur.blurb}</p>
            <div className="proj-caption-tags">
              {cur.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <div className="proj-dots">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                className={`proj-dot ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Go to ${p.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

window.WorkGrid = WorkGrid;
