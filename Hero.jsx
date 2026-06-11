// Hero.jsx — cinematic intro: curtain reveal, word-stagger, mouse-tracked glow,
// vertical slide-indicator rail (brainit-inspired).

function Hero() {
  const wrapRef = React.useRef(null);
  const glowRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;
    let raf = 0, tx = 0.5, ty = 0.4, cx = 0.5, cy = 0.4;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.transform = `translate(${cx * 100}%, ${cy * 100}%) translate(-50%,-50%)`;
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    wrap.addEventListener("mousemove", onMove);
    return () => { wrap.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const words = [
    { t: "backend", em: false },
    { t: "engineer", em: false, br: true },
    { t: "&", em: false },
    { t: "digital", em: true },
    { t: "craftsperson.", em: true },
  ];

  return (
    <section className={`hero ${ready ? "ready" : ""}`} id="top" ref={wrapRef}>
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />

      <aside className="slide-rail" aria-hidden="true">
        <span className="rail-num current">01</span>
        <span className="rail-line" />
        <span className="rail-num">04</span>
        <span className="rail-label">intro</span>
      </aside>

      <span className="status-pill reveal" style={{ "--d": "0ms" }}>
        <span className="status-dot" />
        Available for work
      </span>

      <h1 className="hero-headline">
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span className="word-wrap">
              <span className={`word ${w.em ? "em" : ""}`} style={{ "--d": `${120 + i * 80}ms` }}>
                {w.t}
              </span>
            </span>
            {w.br && <br />}
            {!w.br && i < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </h1>

      <p className="hero-lead reveal" style={{ "--d": "650ms" }}>
        I create modern .NET applications and clean, elegant interfaces designed with scalability, maintainability, and user experience in mind.
      </p>

      <div className="hero-cta-row reveal" style={{ "--d": "780ms" }}>
        <a className="btn btn-primary" href="#work">
          See selected work <Icon name="arrowRight" size={14} />
        </a>
        <a className="btn btn-secondary" href="#contact">
          Get in touch
        </a>
      </div>

      <div className="hero-meta reveal" style={{ "--d": "900ms" }}>
        <span><Icon name="dot" size={8} /> Latin America · Remote</span>
        <span>·</span>
        <span>.NET 9 · Blazor · SQL Server</span>
      </div>

      <a className="scroll-hint reveal" href="#work" style={{ "--d": "1100ms" }}>
        <span>scroll</span>
        <span className="scroll-bar"><span /></span>
      </a>
    </section>
  );
}

window.Hero = Hero;
