// CategoryPill.jsx — top-centered slide switcher with prev/next arrows.
// Each slide changes the curtain text and a small subtitle.

const CATEGORY_SLIDES = [
  { title: "SOFTWARE DEVELOPMENT", subtitle: "Building reliable systems end to end.", curtain: "Software Development" },
  { title: "FRONT AND BACKEND",    subtitle: "Pixel-perfect UIs and the APIs behind them.", curtain: "Front and Backend" },
  { title: "AI ENTHUSIAST",        subtitle: "Exploring practical machine learning.", curtain: "AI Enthusiast" },
  { title: "CLEAN PRACTICES",      subtitle: "Readable, tested, well-architected code.", curtain: "Clean Practices" },
  { title: "SCALABILITY FOCUSED",  subtitle: "Designed to grow without breaking.", curtain: "Scalability Focused" },
];

function CategoryPill({ index, onPrev, onNext }) {
  const s = CATEGORY_SLIDES[index];
  const touchRef = React.useRef({ x: 0, y: 0, active: false });
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, active: true };
  };
  const onTouchEnd = (e) => {
    if (!touchRef.current.active) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext(); else onPrev();
    }
    touchRef.current.active = false;
  };
  return (
    <div className="cat-pill" role="region" aria-label="Highlights"
         onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="cat-arrow" onClick={onPrev} aria-label="Previous">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div className="cat-text">
        <div className="cat-title">{s.title}</div>
        <div className="cat-sub">{s.subtitle}</div>
      </div>
      <button className="cat-arrow" onClick={onNext} aria-label="Next">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}

window.CategoryPill = CategoryPill;
window.CATEGORY_SLIDES = CATEGORY_SLIDES;
