import { Link } from 'react-router-dom'
import { projects, siteConfig } from '../data/portfolio'

/**
 * Work — the landing page, set as an irregular contact-sheet gallery.
 *
 * Every project image becomes a small, varied-size plate with an alphanumeric
 * index code (à la a magazine contents spread), laid out in a masonry of narrow
 * columns. Rendered statically (no reveal-opacity) so the landing is never
 * blank. Each plate links to its full case-study spread.
 */

const ACCENT_TEXT: Record<string, string> = {
  blue: 'text-blue',
  pink: 'text-pink',
  magenta: 'text-magenta',
  green: 'text-green',
  orange: 'text-orange',
}

type Tile = {
  src: string
  code: string
  title: string
  category: string
  id: string
  h: number
  accent: string
}

// Varied card heights → irregular masonry. Each card holds a tall page-style
// preview that pans top→bottom on hover — a "scroll-through" of the full design
// (à la godly.website). Swap the tall placeholders for real screenshots.
const HS = [300, 384, 340, 420, 320, 360]
const tall = (seed: string) => `https://picsum.photos/seed/${seed}/600/1600`

const TILES: Tile[] = projects.flatMap((p, pi) => {
  const n = 1 + p.images.length
  return Array.from({ length: n }, (_, i) => ({
    src: tall(`${p.id}-g${i}`),
    code: `${p.title[0].toUpperCase()}${pi + 1}·${String(110 + pi * 14 + i * 4)}`,
    title: p.title,
    category: p.category,
    id: p.id,
    h: HS[(pi + i) % HS.length],
    accent: ACCENT_TEXT[p.accentColor] ?? 'text-ink-40',
  }))
})

export default function WorkGallery() {
  return (
    <section id="work" aria-label="Selected Work" className="min-h-screen bg-paper text-ink">
      <div className="spread py-10 pb-28 sm:py-14 sm:pb-32">
        {/* Masthead */}
        <div className="flex flex-wrap items-end justify-between gap-y-3 border-b-2 border-ink pb-4">
          <div>
            <span className="label block text-ink-40">{siteConfig.issue}</span>
            <h1 className="mt-1 font-display text-3xl leading-none tracking-[-0.01em] sm:text-5xl">
              Hem<span className="text-blue">a</span>nt
            </h1>
          </div>
          <p className="label max-w-[42ch] sm:text-right">{siteConfig.tagline}</p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <span className="label text-ink-40">Index of Work</span>
          <span className="label text-ink-40">{TILES.length} plates</span>
        </div>

        {/* Scroll-through gallery — each card pans its preview top→bottom on hover */}
        <div className="mt-6 columns-2 gap-5 sm:gap-6 lg:columns-3 xl:columns-4">
          {TILES.map((t, i) => (
            <div key={i} className="mb-6 break-inside-avoid">
              <Link to={`/work/${t.id}`} className="group block">
                <div
                  className="overflow-hidden rounded-2xl bg-ink-08 shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
                  style={{ height: t.h }}
                >
                  <img
                    src={t.src}
                    alt={`${t.title} — ${t.category}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-[object-position] duration-[4000ms] ease-linear group-hover:object-bottom"
                  />
                </div>
                <div className="mt-2.5 flex items-baseline justify-between gap-2">
                  <span className={`font-tight text-[10px] font-semibold uppercase tabular-nums tracking-[0.1em] ${t.accent}`}>
                    {t.code}
                  </span>
                  <span className="truncate font-tight text-[11px] font-medium tracking-[-0.01em] text-ink">
                    {t.title}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
