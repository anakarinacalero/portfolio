// ParticleCurtain.jsx — galaxy/vortex text reveal.
// Particles flow in from the top like a stream, swirl into the word(s),
// hold while shimmering, and on mouse hover open a void around the cursor.
// Colors: lavender + pink palette only.

function ParticleCurtain({ text = "software development" }) {
  const canvasRef = React.useRef(null);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const palette = [
      "#ff5fb0", // fuchsia
      "#ff7ec4", // hot pink
      "#f5a3cc", // soft pink
      "#f7c5db", // pale pink
      "#e89ac8", // rose pink
      "#d57edb", // magenta-lavender
      "#c8a4ff", // light lavender
      "#b8a4ff", // lavender
      "#9d7cff", // violet
      "#7a6cf0", // purple
    ];
    const pickColor = () => palette[(Math.random() * palette.length) | 0];

    const sample = () => {
      if (!W || !H) return [];
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const octx = off.getContext("2d");
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      const fs = Math.min(W * 0.13, 220);
      // narrow viewports: keep text readable + fit two stacked words
      const adjFs = W < 640 ? Math.min(W * 0.16, 96) : fs;
      octx.font = `500 ${adjFs}px "Geist", system-ui, sans-serif`;
      octx.textAlign = "left";
      const parts = text.split(" ");
      const leftPad = W < 640 ? W * 0.08 : W * 0.12;
      if (parts.length >= 2) {
        const lh = adjFs * 1.05;
        const startY = H / 2 - ((parts.length - 1) * lh) / 2;
        parts.forEach((p, i) => octx.fillText(p, leftPad, startY + i * lh));
      } else {
        octx.fillText(text, leftPad, H * 0.55);
      }
      let data;
      try {
        data = octx.getImageData(0, 0, W, H).data;
      } catch (e) {
        return [];
      }
      const pts = [];
      const step = 4;
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 128) pts.push({ x, y });
        }
      }
      for (let i = pts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      return pts;
    };

    const particles = [];
    const ambient = [];
    const seed = () => {
      particles.length = 0;
      ambient.length = 0;
      const targets = sample();
      const N = Math.min(targets.length, 2200);
      for (let i = 0; i < N; i++) {
        const t = targets[i % targets.length];
        particles.push({
          tx: t.x, ty: t.y,
          x: t.x, y: t.y,
          vx: 0, vy: 0,
          color: pickColor(),
          size: 0.9 + Math.random() * 1.3,
          phase: Math.random() * Math.PI * 2,
          delay: 0,
        });
      }
      for (let i = 0; i < 1600; i++) {
        ambient.push({
          ox: Math.random() * W, oy: Math.random() * H,
          x: 0, y: 0,
          a: 0.2 + Math.random() * 0.55,
          s: 0.4 + Math.random() * 1.3,
          tw: Math.random() * Math.PI * 2,
          depth: 0.3 + Math.random() * 1.4,
          color: pickColor(),
        });
      }
    };

    let seeded = false;
    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      if (!W || !H) {
        // Layout hasn't settled yet — retry next frame, don't seed with 0 size.
        requestAnimationFrame(resize);
        return;
      }
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      seeded = true;
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = -1000, my = -1000;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -1000; my = -1000; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    const VOID_R = 120;
    const start = performance.now();
    let raf = 0;

    const loop = (now) => {
      if (!W || !H) { raf = requestAnimationFrame(loop); return; }
      const t = now - start;
      // trail fade
      ctx.fillStyle = "rgba(8,5,14,0.28)";
      ctx.fillRect(0, 0, W, H);

      // ambient stars w/ parallax tracking the cursor
      const cx = mx > -500 ? mx : W / 2;
      const cy = my > -500 ? my : H / 2;
      for (let i = 0; i < ambient.length; i++) {
        const s = ambient[i];
        const px = (cx - W / 2) * 0.04 * s.depth;
        const py = (cy - H / 2) * 0.04 * s.depth;
        s.x = s.ox - px;
        s.y = s.oy - py;
        s.tw += 0.02;
        const a = s.a * (0.5 + 0.5 * Math.sin(s.tw));

        // void around cursor for ambient too
        const adx = s.x - mx, ady = s.y - my;
        const ad2 = adx * adx + ady * ady;
        const fade = ad2 < VOID_R * VOID_R ? Math.sqrt(ad2) / VOID_R : 1;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = a * 0.7 * fade;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const localT = t - p.delay;
        if (localT < 0) continue;

        // void: push particles away from mouse
        const mdx = p.x - mx, mdy = p.y - my;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < VOID_R * VOID_R && md2 > 0.5) {
          const md = Math.sqrt(md2);
          const f = (1 - md / VOID_R) * 8;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        // pull toward target with swirl
        const dx = p.tx - p.x, dy = p.ty - p.y;
        const swirl = Math.min(0.06, 1500 / (Math.abs(dx) + Math.abs(dy) + 200));
        p.vx += dx * 0.10 - dy * swirl * 0.02;
        p.vy += dy * 0.10 + dx * swirl * 0.02;
        p.vx *= 0.78;
        p.vy *= 0.78;
        p.x += p.vx;
        p.y += p.vy;

        // shimmer
        p.phase += 0.04;
        const shimmer = 0.7 + 0.3 * Math.sin(p.phase);

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = shimmer;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className="dotfield" aria-hidden="true">
      <canvas ref={canvasRef} className="dotfield-canvas" />
    </div>
  );
}

window.ParticleCurtain = ParticleCurtain;
