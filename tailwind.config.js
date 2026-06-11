/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // ─────────────────────────────────────────────────────────────
    //  Bluetigercub design tokens
    //  The palette is intentionally tiny: cream paper, near-black ink,
    //  and ONE electric blue used as rare punctuation.
    // ─────────────────────────────────────────────────────────────
    extend: {
      colors: {
        paper: '#FFFFFF', // pure white — the only surface
        ink: '#0A0A0A', // black — the only ink
        // Monochrome: every accent collapses to black for a strict B&W system
        blue:    '#0A0A0A',
        pink:    '#0A0A0A',
        magenta: '#0A0A0A',
        green:   '#0A0A0A',
        orange:  '#0A0A0A',
        red:     '#0A0A0A',
        yellow:  '#0A0A0A',
        // Pale tints → faint grey fields
        'blue-pale':   '#F4F4F4',
        'pink-pale':   '#F4F4F4',
        'green-pale':  '#F4F4F4',
        // Greys derived from black, for hairlines / muted micro-type
        'ink-60': 'rgba(10, 10, 10, 0.60)',
        'ink-40': 'rgba(10, 10, 10, 0.42)',
        'ink-15': 'rgba(10, 10, 10, 0.12)',
        'ink-08': 'rgba(10, 10, 10, 0.05)',
        // White-on-dark variants (rarely used now)
        'paper-60': 'rgba(255, 255, 255, 0.62)',
        'paper-40': 'rgba(255, 255, 255, 0.42)',
        'paper-15': 'rgba(255, 255, 255, 0.16)',
      },
      fontFamily: {
        // Headings / display — Bookmania (Adobe Fonts/Typekit). See index.css.
        display: ['bookmania', 'Georgia', "'Times New Roman'", 'serif'],
        // Body / captions — Rank (self-hosted @font-face). See index.css.
        body: ['Rank', 'Georgia', "'Times New Roman'", 'serif'],
        // Compact display — ultra-condensed (About "graffiti wall" zone).
        stencil: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        // Compact grotesque — condensed labels/body in the About zone.
        grotesk: ['Oswald', "'Arial Narrow'", 'Arial', 'sans-serif'],
        // Tight bold neo-grotesque — the About "contents" list (Helvetica-style).
        tight: ["'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // micro-type for labels, indices, captions
        micro: ['0.625rem', { lineHeight: '1.1', letterSpacing: '0.12em' }], // 10px
        'micro-sm': ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.1em' }], // 11px
        // editorial display sizes scale fluidly via clamp() utilities below
      },
      letterSpacing: {
        label: '0.16em',
      },
      maxWidth: {
        spread: '1600px', // the printed "spread" width
        prose: '64ch',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
