// ProjectModal.jsx — project detail with image carousel + repo link.
// Images are drag-and-drop <image-slot>s so the user supplies real screenshots.

function ProjectModal({ project, onClose }) {
  const { id, title, desc, year, kind, tags = [], repo, shots = 3, images = [] } = project;
  const [active, setActive] = React.useState(0);
  const n = shots;

  const go = (dir) => setActive(a => (a + dir + n) % n);

  // Close on backdrop click (not when clicking the dialog)
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onBackdrop}>
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-label={title}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>

        {/* Carousel */}
        <div className="carousel">
          <div className="carousel-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {Array.from({ length: n }).map((_, i) => (
              <div className="carousel-slide" key={i}>
                <image-slot
                  id={`proj-${id}-${i}`}
                  style={{ width: "100%", height: "100%", display: "block" }}
                  shape="rect"
                  fit="cover"
                  src={images[i]}
                  placeholder={`Drop ${title} screenshot ${i + 1}`}
                ></image-slot>
              </div>
            ))}
          </div>

          {n > 1 && (
            <>
              <button className="carousel-arrow left" onClick={() => go(-1)} aria-label="Previous image">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="carousel-arrow right" onClick={() => go(1)} aria-label="Next image">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div className="carousel-dots">
                {Array.from({ length: n }).map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Detail */}
        <div className="modal-body">
          <div className="modal-eyebrow">
            <span>{year}</span><span>·</span><span>{kind}</span>
          </div>
          <h3 className="modal-title">{title}</h3>
          <p className="modal-desc">{desc}</p>
          <div className="modal-tags">
            {tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="modal-actions">
            <a className="btn btn-primary" href={repo} target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
              View repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ProjectModal = ProjectModal;
