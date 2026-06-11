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
        paper: '#F7F5F0', // off-white / cream paper — the dominant surface
        ink: '#141414', // near-black — text almost everywhere
        blue: '#1A4BE8', // electric/royal blue — accent, used SPARINGLY
        // Secondary accent palette — used as full background zones only
        pink:    '#FF2D78',
        magenta: '#C8186C',
        green:   '#3DF03D',   // fluoro green
        orange:  '#FF5A1F',   // safety orange
        red:     '#E4002B',   // constructivist red
        yellow:  '#FFD400',   // bauhaus yellow
        // Pale zone tints — for soft pastel fields
        'blue-pale':   '#D6E0FF',
        'pink-pale':   '#FFE0EC',
        'green-pale':  '#D4FBCF',
        // a couple of derived tints for hairlines / muted micro-type
        'ink-60': 'rgba(20, 20, 20, 0.60)',
        'ink-40': 'rgba(20, 20, 20, 0.40)',
        'ink-15': 'rgba(20, 20, 20, 0.15)',
        'ink-08': 'rgba(20, 20, 20, 0.08)',
        // Paper-on-dark variants for reversed sections
        'paper-60': 'rgba(247, 245, 240, 0.60)',
        'paper-40': 'rgba(247, 245, 240, 0.40)',
        'paper-15': 'rgba(247, 245, 240, 0.15)',
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
