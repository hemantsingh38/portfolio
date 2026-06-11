import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import { projects, siteConfig } from '../data/portfolio'

/**
 * Work — the landing page, set as an irregular contact-sheet gallery.
 *
 * Every project image becomes a small, varied-size plate with an alphanumeric
 * index code (à la a magazine contents spread), laid out in a masonry of narrow
 * columns. Rendered statically (no reveal-opacity) so the landing is never
 * blank. Each plate links to its full case-study spread.
 */

type Tile = {
  src: string
  code: string
  title: string
  category: string
  id: string
  ar: string
}

// Varied aspect ratios → irregular heights in the masonry columns.
const AR = ['aspect-[4/5]', 'aspect-[1/1]', 'aspect-[3/4]', 'aspect-[5/4]', 'aspect-[2/3]', 'aspect-[5/6]']

const TILES: Tile[] = projects.flatMap((p, pi) => {
  const srcs = [p.coverImage, ...p.images.map((im) => im.src)]
  return srcs.map((src, i) => ({
    src,
    code: `${p.title[0].toUpperCase()}${pi + 1}·${String(110 + pi * 14 + i * 4)}`,
    title: p.title,
    category: p.category,
    id: p.id,
    ar: AR[(pi + i) % AR.length],
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

        {/* Irregular small gallery */}
        <div className="mt-6 columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4 xl:columns-5">
          {TILES.map((t, i) => (
            <div key={i} className="mb-5 break-inside-avoid">
              <Link to={`/work/${t.id}`} className="group block">
                <LazyImage
                  src={t.src}
                  alt={`${t.title} — ${t.category}`}
                  className={`w-full ring-1 ring-ink-15 transition group-hover:ring-ink ${t.ar}`}
                  imgClassName="object-cover transition duration-500 group-hover:opacity-90"
                />
                <div className="mt-1.5 flex items-baseline justify-between gap-2">
                  <span className="font-tight text-[10px] uppercase tabular-nums tracking-[0.1em] text-ink-40">
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
