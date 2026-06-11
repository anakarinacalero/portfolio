// App.jsx — root component, error boundary, scroll helper.
// Wires together all section components.

// ── Error boundary ────────────────────────────────────────────
// A single component crash must never blank the whole site.
class Boundary extends React.Component {
  constructor(p) { super(p); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { console.warn("[Boundary] caught:", err); }
  render() { return this.state.failed ? (this.props.fallback || null) : this.props.children; }
}

// ── Smooth scroll helper ──────────────────────────────────────
// Native behavior:'smooth' gets cancelled during dock re-renders,
// so we drive the animation ourselves with a cubic-ease rAF loop.
window.acScrollTo = function acScrollTo(id, dur) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  const targetY = Math.max(0, startY + el.getBoundingClientRect().top);
  const d = dur || 650;
  const t0 = performance.now();
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function step(now) {
    const p = Math.min(1, (now - t0) / d);
    window.scrollTo(0, startY + (targetY - startY) * ease(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
};

// ── App ───────────────────────────────────────────────────────
function App() {
  const [docked, setDocked] = React.useState(false);
  const [pending, setPending] = React.useState(null);
  const [activeSection, setActiveSection] = React.useState(null);
  const dockTop = React.useCallback((id) => {
    setDocked(true);
    setPending(typeof id === "string" ? id : null);
  }, []);
  const undock = React.useCallback(() => setDocked(false), []);

  const [slide, setSlide] = React.useState(0);
  const total = window.CATEGORY_SLIDES.length;
  const prev = () => setSlide(s => (s - 1 + total) % total);
  const next = () => setSlide(s => (s + 1) % total);

  // Lock body scroll while in landing state
  React.useEffect(() => {
    document.body.classList.toggle("locked", !docked);
    return () => document.body.classList.remove("locked");
  }, [docked]);

  // After docking + unlock, scroll to the requested section
  React.useEffect(() => {
    if (!docked || !pending) return;
    const id = pending;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => {
      window.acScrollTo(id);
      setPending(null);
    }));
    return () => cancelAnimationFrame(raf);
  }, [docked, pending]);

  // Re-lock once user scrolls back to the very top
  React.useEffect(() => {
    if (!docked) return;
    let hasLeft = false;
    const onScroll = () => {
      if (window.scrollY > 300) hasLeft = true;
      if (hasLeft && window.scrollY < 8) undock();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [docked, undock]);

  // Scroll-spy: highlight the nav link for the section near the viewport center
  React.useEffect(() => {
    if (!docked) return;
    const ids = ["about", "technologies", "interests", "work", "next-steps", "contact"];
    const sections = ids
      .map(id => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [docked]);

  return (
    <>
      <Aurora />
      <Nav active={activeSection} docked={docked} onDock={dockTop} />
      {!docked && <CategoryPill index={slide} onPrev={prev} onNext={next} />}
      <Boundary>
        <ParticleCurtain text={window.CATEGORY_SLIDES[slide].curtain} />
      </Boundary>
      <main className="container">
        <Hero docked={docked} onEnter={dockTop} />
        <AboutSection />
        <Timeline />
        <StackList />
        <InterestsSection />
        <WorkGrid />
        <NextSteps />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
