// ──────────────────────────────────────────────────────────────────
//  Shared content types for the portfolio.
//  Edit the actual content in src/data/portfolio.ts — not here.
// ──────────────────────────────────────────────────────────────────

/** Layout hint for how a project image should be placed in the spread. */
export type ImageLayout = 'full' | 'offset' | 'grid'

export interface ProjectImage {
  src: string
  alt: string
  /** 'full' = full-bleed, 'offset' = smaller offset thumb, 'grid' = contact-sheet cell */
  layout?: ImageLayout
  caption?: string
}

/** Color zone key — drives background color when project is expanded inline. */
export type AccentColor = 'blue' | 'pink' | 'magenta' | 'green' | 'orange'

export interface Project {
  id: string
  /** Two-digit index used in the table-of-contents, e.g. "01". */
  index: string
  title: string
  category: string
  year: string
  client: string
  role: string
  tools: string[]
  /** One-line summary shown in listings. */
  summary: string
  /** Body copy, one entry per paragraph. */
  description: string[]
  /** Large editorial pull-quote on the detail spread. */
  pullQuote: string
  /** Image shown on the cover/index hover preview. */
  coverImage: string
  /** Sequence of images for the case-study spread. */
  images: ProjectImage[]
  /** Background color zone used when this project is expanded inline. */
  accentColor: AccentColor
}

export interface SiteConfig {
  name: string
  tagline: string
  issue: string
  email: string
  socials: { label: string; href: string }[]
}

export interface About {
  portrait: string
  /** Short standfirst / intro line. */
  intro: string
  bio: string[]
  /** Colophon-style credits: label → value. */
  colophon: { label: string; value: string }[]
  /** Small images for the About collage / contact sheet. */
  gallery: { src: string; caption?: string }[]
}
