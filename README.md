# Portfolio UI Kit — Ana Calero

A working hi-fidelity recreation of Ana Calero's portfolio site. Open `index.html` to see the full assembly.

## Components

| File | Purpose |
|---|---|
| `Aurora.jsx` | Signature radial-blob background. Drop into any section root. |
| `Nav.jsx` | Glassmorphic floating navigation pill with brand mark + CTA. |
| `Hero.jsx` | Display headline + lead + primary/secondary CTA + status pill. |
| `ProjectCard.jsx` | Featured & default project cards. Hover lift, gradient stroke variant. |
| `WorkGrid.jsx` | Responsive grid of `ProjectCard`s. |
| `Timeline.jsx` | Career chronology with lavender milestones. |
| `StackList.jsx` | "Tools I reach for" — a chipped tech list. |
| `Contact.jsx` | Email, social links, "available for work" status. |
| `Footer.jsx` | Minimal mono-styled footer with bilingual touch. |
| `Icon.jsx` | Tiny inline Lucide-style icon set used across the kit. |

## Stack
- React (UMD) + Babel standalone in the browser, no build step.
- All tokens come from the root `colors_and_type.css`.
- Animations are CSS-driven (no Framer Motion needed for this preview); production would swap in Framer Motion easily.

## Notes
This is a recreation of the **brief**, not of an existing live site — there is no codebase to mirror, so visuals follow the design system. Replace placeholder project copy with real work when ready.
