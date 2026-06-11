// ══════════════════════════════════════════════════════════════════
//  ✏️  EDIT YOUR PORTFOLIO HERE
//  ──────────────────────────────────────────────────────────────────
//  Content for Hemant — UX & product designer. Project case-study copy
//  is synthesised from the public one-liners on findingyouhemant.framer.website;
//  swap years / descriptions / images for the real specifics any time.
//  Images use picsum placeholders — replace with real exports in /public.
// ══════════════════════════════════════════════════════════════════

import type { About, AccentColor, Project, SiteConfig } from '../types'

// Helper: deterministic placeholder image of a given size.
const ph = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const siteConfig: SiteConfig = {
  name: 'Hemant',
  tagline: 'UX & product designer — bringing change, fun, and newness to products.',
  issue: 'Early Winter — Vol. MMXXVI',
  email: 'hgusain307@gmail.com',
  socials: [
    { label: 'Behance', href: 'https://www.behance.net/gallery/220593565/Uphold-(mentorship-from-industry-experts)' },
    { label: 'Notion', href: 'https://www.notion.so/VEJEEZ-One-stop-shop-for-vegan-products-c287f50867854088b6fa4211cc7be3aa' },
    { label: 'Email', href: 'mailto:hgusain307@gmail.com' },
  ],
}

export const projects: Project[] = [
  {
    id: 'uphold',
    index: '01',
    title: 'Uphold',
    category: 'Mentorship Platform',
    year: '2025',
    client: 'Self-initiated',
    role: 'UX Research, UI/UX',
    tools: ['Figma', 'Maze'],
    summary: 'Mentorship from industry experts.',
    description: [
      'Uphold connects early-career talent with mentors who have actually done the work. The project began with research into how people look for guidance — and why most mentorship fizzles after the first call.',
      'The answer was a low-friction matching flow and a calm scheduling experience that makes the next conversation the easy default, so momentum survives past week one.',
    ],
    pullQuote: 'Good mentorship dies in the gap between calls — so design the next call to be effortless.',
    accentColor: 'blue' as AccentColor,
    coverImage: ph('uphold-cover', 900, 1100),
    externalUrl: 'https://www.behance.net/gallery/220593565/Uphold-(mentorship-from-industry-experts)',
    images: [
      { src: ph('uphold-1', 1600, 1000), alt: 'Uphold matching flow', layout: 'full', caption: 'Mentor-matching flow.' },
      { src: ph('uphold-2', 800, 1000), alt: 'Scheduling screen', layout: 'offset' },
    ],
  },
  {
    id: 'revibe',
    index: '02',
    title: 'Revibe',
    category: 'Sustainable Fashion',
    year: '2024',
    client: 'Concept',
    role: 'Product Design, Branding',
    tools: ['Figma', 'Illustrator'],
    summary: 'Save the planet by shopping, selling, and creating fashion.',
    description: [
      'Revibe is a circular-fashion marketplace where people shop, sell, and remake clothing — keeping garments in use and out of landfill.',
      'The design balances the logistics of resale with a joyful, creative browse, so sustainability feels like an upgrade rather than a sacrifice.',
    ],
    pullQuote: 'Sustainability should feel like an upgrade, not a sacrifice.',
    accentColor: 'green' as AccentColor,
    coverImage: ph('revibe-cover', 900, 1100),
    externalUrl: 'https://findingyouhemant.framer.website/page',
    images: [
      { src: ph('revibe-1', 1600, 1000), alt: 'Revibe marketplace', layout: 'full', caption: 'Shop · sell · create.' },
      { src: ph('revibe-2', 800, 1000), alt: 'Listing flow', layout: 'offset' },
    ],
  },
  {
    id: 'insight',
    index: '03',
    title: 'Insight',
    category: 'UX Research Tooling',
    year: '2024',
    client: 'Case study',
    role: 'UX Research, UI/UX',
    tools: ['Figma', 'Dovetail'],
    summary: 'Streamlining participant recruitment in UX research.',
    description: [
      'Insight takes the most painful part of research — finding the right participants — and turns screening, scheduling, and incentives into a single flow.',
      'Teams spend less time chasing people and more time learning from them, with a recruitment pipeline that stays honest about who actually qualifies.',
    ],
    pullQuote: 'The hardest part of research isn’t the questions — it’s finding the right people to ask.',
    accentColor: 'magenta' as AccentColor,
    coverImage: ph('insight-cover', 900, 1100),
    externalUrl: 'https://findingyouhemant.framer.website/insight',
    images: [
      { src: ph('insight-1', 1600, 1000), alt: 'Recruitment pipeline', layout: 'full', caption: 'Screening → scheduling → incentives.' },
      { src: ph('insight-2', 800, 1000), alt: 'Screener builder', layout: 'offset' },
    ],
  },
  {
    id: 'vejeez',
    index: '04',
    title: 'Vejeez!',
    category: 'E-commerce',
    year: '2023',
    client: 'Concept',
    role: 'Product Design, Branding',
    tools: ['Figma'],
    summary: 'Every vegan’s dream come true.',
    description: [
      'Vejeez! is a one-stop shop for vegan products — built so plant-based living stops meaning label-reading at every aisle.',
      'The work spans the brand, a forgiving search-and-filter system, and a checkout that makes the right choice the easy one.',
    ],
    pullQuote: 'Make the kind choice the easy choice.',
    accentColor: 'orange' as AccentColor,
    coverImage: ph('vejeez-cover', 900, 1100),
    externalUrl: 'https://www.notion.so/VEJEEZ-One-stop-shop-for-vegan-products-c287f50867854088b6fa4211cc7be3aa',
    images: [
      { src: ph('vejeez-1', 1600, 1000), alt: 'Vejeez storefront', layout: 'full', caption: 'One-stop vegan shop.' },
      { src: ph('vejeez-2', 800, 1000), alt: 'Filter system', layout: 'offset' },
    ],
  },
]

export const about: About = {
  portrait: ph('hemant-portrait', 900, 1200), // TODO: replace with a real portrait
  intro:
    'I’m Hemant — a UX and product designer. I’ve been designing digital solutions since 2022, and I aspire to bring change, fun, and newness to the products I touch.',
  bio: [
    'I believe good design should come from any corner of the world. I plan to spend my life using it as a universal language — collaborating with people across cultures and contexts to create experiences that matter.',
    'Across about three and a half years I’ve worked in ed-tech, fintech, e-commerce, design agencies, game design and SaaS — B2B, B2C and everything between — spanning user research, UI/UX, rapid prototyping, branding, illustration, and design strategy tied to real business goals.',
    'I’m inspired by Don Norman’s 21st-century design thinking, and by film, travel, and the shared human experience. At heart, always an artist.',
  ],
  colophon: [
    { label: 'Practice', value: 'UX & product design' },
    { label: 'Experience', value: 'Since 2022 · ~3.5 yrs' },
    { label: 'Industries', value: 'Ed-tech, fintech, e-comm, SaaS' },
    { label: 'Toolkit', value: 'Research · UI/UX · prototyping' },
    { label: 'Inspired by', value: 'Don Norman · film · travel' },
    { label: 'Ethos', value: 'Design as a universal language' },
  ],
  gallery: [
    { src: ph('hemant-1', 700, 880), caption: 'User flows', year: '2025' },
    { src: ph('hemant-2', 700, 760), caption: 'Prototyping', year: '2024' },
    { src: ph('hemant-3', 700, 900), caption: 'Research wall', year: '2024' },
    { src: ph('hemant-4', 700, 680), caption: 'Branding', year: '2023' },
    { src: ph('hemant-5', 700, 820), caption: 'Illustration', year: '2023' },
    { src: ph('hemant-6', 700, 720), caption: 'Workshop', year: '2022' },
    { src: ph('hemant-7', 700, 900), caption: 'Field notes', year: '2022' },
    { src: ph('hemant-8', 700, 700), caption: 'Always an artist', year: '2025' },
  ],
}
