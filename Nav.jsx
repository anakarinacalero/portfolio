// Nav.jsx — full-width header, dockable. Bottom by default; clicks dock it to top.

function Nav({ active = null, docked = false, onDock }) {
  const links = [
    { id: "about",        label: "About" },
    { id: "technologies", label: "Technologies" },
    { id: "interests",    label: "Interests" },
    { id: "work",         label: "Projects" },
    { id: "next-steps",   label: "Next Steps" },
    { id: "contact",      label: "Contact" },
  ];

  const [theme, setTheme] = React.useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.getAttribute("data-theme") || "dark";
  });
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("ac-theme", theme); } catch (e) {}
  }, [theme]);

  React.useEffect(() => {
    try { const s = localStorage.getItem("ac-theme"); if (s) setTheme(s); } catch (e) {}
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");

  const handleNav = (e, id) => {
    setMenuOpen(false);
    e.preventDefault();
    if (!docked) {
      // Dock first; App scrolls to the section once unlocked.
      onDock && onDock(id);
    } else {
      window.acScrollTo ? window.acScrollTo(id) : (document.getElementById(id) || {}).scrollIntoView?.({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`nav-bar ${scrolled ? "scrolled" : ""} ${docked ? "docked-top" : "docked-bottom"} ${menuOpen ? "menu-open" : ""}`}>
      <div className="nav-bar-inner">
        <a className="nav-brand" href="#top" onClick={(e) => handleNav(e, "top")}>Ana Calero</a>
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => handleNav(e, l.id)}
               className={active === l.id ? "active" : ""}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
          </button>
          <a className="nav-cta" href="#contact" onClick={(e) => handleNav(e, "contact")}>
            Get in touch <Icon name="arrowRight" size={14} />
          </a>
          <button className="nav-burger" onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className="nav-mobile-panel" role="menu">
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => handleNav(e, l.id)}
             className={active === l.id ? "active" : ""}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}

window.Nav = Nav;
