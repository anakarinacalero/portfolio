// Aurora.jsx — signature radial-blob background.
// Colors come from CSS so light/dark themes can re-tint them.

function Aurora({ variant = "default", showGrid = true }) {
  return (
    <div className={`aurora-root ${variant === "subtle" ? "subtle" : ""}`} aria-hidden="true">
      <div className="aurora-blobs" />
      {showGrid && <div className="aurora-grid" />}
      <div className="aurora-vignette" />
    </div>
  );
}

window.Aurora = Aurora;
