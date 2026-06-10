// ══════════════════════════════════════════════════════════════════
//  ✏️  EDIT YOUR PORTFOLIO HERE
//  ──────────────────────────────────────────────────────────────────
//  This single file holds ALL site content. Swap the dummy copy and
//  the picsum.photos placeholders for your real text and images.
//
//  • Images: replace the picsum.photos URLs with paths to your own
//    files (e.g. "/work/project-01/cover.jpg" placed in /public/work/).
//  • Keep the `index` values two digits ("01", "02", …) — they drive
//    the table-of-contents numbering.
//  • `layout` on each image controls placement on the detail spread:
//      'full'   → full-bleed
//      'offset' → smaller, offset thumbnail that breaks the grid
//      'grid'   → contact-sheet / index cell (placed in a small grid)
// ══════════════════════════════════════════════════════════════════

import type { About, AccentColor, Project, SiteConfig } from '../types'

// Helper: deterministic placeholder image of a given size.
// picsum's /seed/ endpoint keeps an image stable across reloads.
// TODO: replace these with your real images.
const ph = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const siteConfig: SiteConfig = {
  name: 'Bluetigercub',
  tagline: 'Editorial & brand design, set like print.',
  issue: 'Issue 01 — Vol. MMXXVI',
  email: 'hello@bluetigercub.studio',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Are.na', href: 'https://are.na/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Read.cv', href: 'https://read.cv/' },
  ],
}

export const projects: Project[] = [
  {
    id: 'reconnect',
    index: '01',
    title: 'Reconnect',
    category: 'Magazine / Art Direction',
    year: '2025',
    client: 'Kern Publishing',
    role: 'Art Direction, Editorial Design',
    tools: ['InDesign', 'Photoshop', 'Risograph'],
    summary: 'A 132-page art & design annual built on a flexible Swiss grid.',
    description: [
      'Reconnect is the flagship annual for an independent art-and-design publisher. The brief asked for a system elastic enough to hold thirty contributors — illustrators, photographers, type designers — without flattening their voices into a single house style.',
      'The answer was a deliberately quiet 12-column grid with generous margins, a strict micro-typographic language for indices and credits, and a single accent colour deployed only where the eye needed punctuation. The contributors supply the noise; the grid keeps the silence.',
      'Across the issue, full-bleed plates alternate with contact-sheet indices and offset thumbnails, so the reader feels the rhythm of turning to a new chapter rather than scrolling a feed.',
    ],
    pullQuote:
      'The contributors supply the noise. The grid keeps the silence.',
    accentColor: 'blue' as AccentColor,
    coverImage: ph('reconnect-cover', 800, 1000),
    images: [
      { src: ph('reconnect-1', 1600, 1000), alt: 'Reconnect cover spread', layout: 'full' },
      { src: ph('reconnect-2', 700, 900), alt: 'Table of contents detail', layout: 'offset', caption: 'Contents — set in tracked micro-type.' },
      { src: ph('reconnect-3', 800, 600), alt: 'Contributor index page', layout: 'grid' },
      { src: ph('reconnect-4', 800, 600), alt: 'Feature opener', layout: 'grid' },
      { src: ph('reconnect-5', 800, 600), alt: 'Photo essay plate', layout: 'grid' },
      { src: ph('reconnect-6', 1600, 1100), alt: 'Full-bleed photo essay', layout: 'full', caption: 'Photo essay, printed as a four-page gatefold.' },
    ],
  },
  {
    id: 'mexico-city',
    index: '02',
    title: 'Mexico in the Shift',
    category: 'Photo Book / Editorial',
    year: '2024',
    client: 'Angewandte Press',
    role: 'Design, Sequencing',
    tools: ['InDesign', 'Capture One'],
    summary: 'A risograph travel diary — pink endpapers, hand-set captions.',
    description: [
      'A self-initiated photo book documenting eight days in Mexico City. The design leans into the diaristic: a soft pink stock for the endpapers, a single inset photograph on the title page, and captions set small and close to the gutter like marginalia.',
      'The sequencing does the heavy lifting — wide establishing frames give way to tight, saturated interiors, and the white space is allowed to breathe between them.',
    ],
    pullQuote: 'What happened? What got lost? What do you know after eight days?',
    accentColor: 'pink' as AccentColor,
    coverImage: ph('mexico-cover', 800, 1100),
    images: [
      { src: ph('mexico-1', 1500, 1000), alt: 'Pink endpaper spread', layout: 'full' },
      { src: ph('mexico-2', 600, 800), alt: 'Inset title photograph', layout: 'offset' },
      { src: ph('mexico-3', 1600, 1050), alt: 'Street photograph, full bleed', layout: 'full', caption: 'Roma Norte, day three.' },
      { src: ph('mexico-4', 800, 600), alt: 'Interior detail', layout: 'grid' },
      { src: ph('mexico-5', 800, 600), alt: 'Market study', layout: 'grid' },
    ],
  },
  {
    id: 'my-big-night',
    index: '03',
    title: 'My Big Night Out',
    category: 'Campaign / Identity',
    year: '2024',
    client: 'Nocturna Beverages',
    role: 'Design Lead, Typography',
    tools: ['Illustrator', 'After Effects'],
    summary: 'An inclusive nightlife campaign with a loud, saturated photographic language.',
    description: [
      'A campaign built around a simple idea: everyone deserves a great night out. The art direction pairs high-flash, colour-soaked photography with a restrained editorial layout, letting the images shout while the type stays composed.',
      'The bilingual layout system sets headlines in the display serif and runs the body in tight justified columns, echoing a printed programme more than an ad.',
    ],
    pullQuote: 'The night is for everyone.',
    accentColor: 'orange' as AccentColor,
    coverImage: ph('night-cover', 800, 1000),
    images: [
      { src: ph('night-1', 1600, 1000), alt: 'Campaign key visual', layout: 'full' },
      { src: ph('night-2', 800, 1000), alt: 'Saturated portrait', layout: 'offset', caption: 'Key art, on-location flash.' },
      { src: ph('night-3', 800, 600), alt: 'Poster variant A', layout: 'grid' },
      { src: ph('night-4', 800, 600), alt: 'Poster variant B', layout: 'grid' },
      { src: ph('night-5', 800, 600), alt: 'Poster variant C', layout: 'grid' },
    ],
  },
  {
    id: 'rank-specimen',
    index: '04',
    title: 'Rank — A Specimen',
    category: 'Type Design / Specimen',
    year: '2023',
    client: 'Self-initiated',
    role: 'Type Design, Specimen Design',
    tools: ['Glyphs', 'InDesign'],
    summary: 'A warm text serif in eight weights, with a printed specimen to match.',
    description: [
      'Rank is a warm, slightly humanist text serif drawn for long-form reading. The family spans Thin through Bold with a true Book Italic, and the specimen was designed to show it doing real work — not lorem ipsum, but essays, captions, and dense credit blocks.',
      'The specimen itself became a study in restraint: a single accent colour, tight tracking on the labels, and enormous waterfall settings that let each weight earn its place on the page.',
    ],
    pullQuote: 'A typeface earns its keep in the small sizes, not the headlines.',
    accentColor: 'green' as AccentColor,
    coverImage: ph('rank-cover', 800, 1000),
    images: [
      { src: ph('rank-1', 1600, 1000), alt: 'Weight waterfall', layout: 'full', caption: 'Eight weights, Thin to Bold.' },
      { src: ph('rank-2', 700, 900), alt: 'Italic detail', layout: 'offset' },
      { src: ph('rank-3', 800, 600), alt: 'Glyph set', layout: 'grid' },
      { src: ph('rank-4', 800, 600), alt: 'Text setting', layout: 'grid' },
    ],
  },
  {
    id: 'me-we',
    index: '05',
    title: 'Me / We',
    category: 'Exhibition / Wayfinding',
    year: '2023',
    client: 'Stadtgalerie',
    role: 'Exhibition Graphics, Signage',
    tools: ['Illustrator', 'Cinema 4D'],
    summary: 'Identity and wayfinding for a group show on collective authorship.',
    description: [
      'Me / We explored the tension between the individual maker and the collective. The graphic system mirrored that theme: a fixed grid that every contributor could disrupt, and a signage language that toggled between intimate captions and room-scale statements.',
      'Vinyl lettering ran up the gallery columns as vertical spine labels, turning the architecture itself into a table of contents.',
    ],
    pullQuote: 'Where does the maker end and the room begin?',
    accentColor: 'magenta' as AccentColor,
    coverImage: ph('mewe-cover', 800, 1050),
    images: [
      { src: ph('mewe-1', 1600, 1000), alt: 'Gallery entrance graphics', layout: 'full' },
      { src: ph('mewe-2', 700, 950), alt: 'Vertical column lettering', layout: 'offset', caption: 'Spine labels on the gallery columns.' },
      { src: ph('mewe-3', 800, 600), alt: 'Wall caption system', layout: 'grid' },
      { src: ph('mewe-4', 800, 600), alt: 'Catalogue spread', layout: 'grid' },
      { src: ph('mewe-5', 800, 600), alt: 'Invitation card', layout: 'grid' },
    ],
  },
  {
    id: 'grafise-revu',
    index: '06',
    title: 'Grafise Revu',
    category: 'Identity / Editorial',
    year: '2022',
    client: 'Swiss Typographic Society',
    role: 'Redesign, Art Direction',
    tools: ['InDesign', 'Risograph'],
    summary: 'A homage-redesign of a mid-century Swiss typographic journal.',
    description: [
      'A speculative redesign of a 1960s Swiss typographic review. The work studies the originals — their flush-left grids, their phonetic experiments, their obsessive attention to the baseline — and rebuilds them for a contemporary press run.',
      'The result keeps the cool rationalism of the source material but warms it with the Rank text face and a single, sparing accent.',
    ],
    pullQuote: 'Rationalism, warmed by one degree.',
    accentColor: 'blue' as AccentColor,
    coverImage: ph('grafise-cover', 800, 1100),
    images: [
      { src: ph('grafise-1', 1500, 1000), alt: 'Cover pair', layout: 'full', caption: 'Two issues, flush-left masthead.' },
      { src: ph('grafise-2', 700, 900), alt: 'Grid study', layout: 'offset' },
      { src: ph('grafise-3', 800, 600), alt: 'Phonetic experiment', layout: 'grid' },
      { src: ph('grafise-4', 800, 600), alt: 'Baseline diagram', layout: 'grid' },
    ],
  },
]

export const about: About = {
  portrait: ph('portrait', 900, 1200), // TODO: replace with your portrait
  intro:
    'I’m an editorial and brand designer working between print and screen, with a soft spot for grids, micro-typography, and the quiet drama of a well-set page.',
  bio: [
    'Bluetigercub is the studio practice of a designer trained in the Swiss tradition and seduced, somewhere along the way, by the warmth of independent magazines. I design publications, identities, and the occasional typeface — and I treat a website like a spread that happens to scroll.',
    'My work tends to start with structure: a grid that can hold a lot of voices, a type system that behaves at 10px and at 10rem, a colour that earns its place by being used almost never. From there the content sets the pace.',
    'Previously in-house at a publishing house and a type foundry, I now work with cultural institutions, independent publishers, and brands that would rather read like a journal than an ad.',
  ],
  colophon: [
    { label: 'Practice', value: 'Editorial & brand design' },
    { label: 'Based in', value: 'Zürich / remote' },
    { label: 'Display type', value: 'Bookmania' },
    { label: 'Text type', value: 'Rank' },
    { label: 'Built with', value: 'Vite · React · Tailwind' },
    { label: 'Year', value: '2026' },
  ],
}
