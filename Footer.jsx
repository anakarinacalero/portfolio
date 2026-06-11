// Footer.jsx — minimal closing footer.

function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-mark">ac</span>
      <span className="footer-meta">© 2026 ana calero</span>
      <span className="footer-meta">·</span>
      <span className="footer-meta footer-es">hecho con cariño en bolivia</span>
      <span className="footer-meta" style={{ marginLeft: "auto" }}>
        v0.4.2 · last shipped 03.may.26
      </span>
    </footer>
  );
}

window.Footer = Footer;
