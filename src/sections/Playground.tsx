import type { CSSProperties } from 'react'
import LazyImage from '../components/LazyImage'
import { about } from '../data/portfolio'

/**
 * Playground — offcuts and experiments. A deliberately looser page: scattered
 * primary/Memphis shapes behind a small masonry of sketchbook plates.
 */

const AR = ['aspect-[4/5]', 'aspect-[1/1]', 'aspect-[3/4]', 'aspect-[5/6]']

const triangle: CSSProperties = {
  width: 0,
  height: 0,
  borderLeft: '22px solid transparent',
  borderRight: '22px solid transparent',
  borderBottom: '36px solid #4C5BFF',
}

export default function Playground() {
  return (
    <section
      id="playground"
      aria-label="Playground"
      className="relative min-h-screen overflow-hidden bg-paper text-ink"
    >
      {/* Scattered shapes — Bauhaus primaries + a Memphis squiggle */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute right-[8%] top-[14%] h-24 w-24 rounded-full bg-red sm:h-32 sm:w-32" />
        <span className="absolute left-[4%] top-[40%] h-16 w-16 bg-yellow sm:h-24 sm:w-24" />
        <span className="absolute hidden sm:block" style={{ ...triangle, position: 'absolute', right: '22%', top: '8%' }} />
        <svg className="absolute hidden lg:block" style={{ top: '64%', left: '10%' }} width="150" height="40" viewBox="0 0 150 40" fill="none" stroke="#19C8A6" strokeWidth="6" strokeLinecap="round">
          <path d="M4 20 q11 -17 22 0 t22 0 t22 0 t22 0 t22 0" />
        </svg>
        <span className="absolute bottom-[12%] right-[12%] h-10 w-20 rounded-t-full" style={{ background: '#FF5C8A' }} />
      </div>

      <div className="spread relative z-10 py-12 pb-28 sm:py-16 sm:pb-32">
        <span className="label text-ink-40">Sketchbook · no grades</span>
        <h2 className="display mt-3">
          Play<span className="text-blue">ground</span>
        </h2>
        <p className="mt-5 max-w-prose font-body text-lg leading-snug text-ink-60 sm:text-xl">
          Offcuts, experiments, and things made for the joy of it — type tests, motion
          studies, branding scraps, and the occasional happy accident.
        </p>

        <div className="mt-10 columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4">
          {about.gallery.map((g, i) => (
            <div key={i} className="mb-5 break-inside-avoid">
              <LazyImage
                src={g.src}
                alt={g.caption ?? 'experiment'}
                className={`w-full overflow-hidden rounded-2xl ${AR[i % AR.length]}`}
                imgClassName="object-cover"
              />
              <span className="mt-1.5 block font-tight text-[10px] uppercase tracking-[0.1em] text-ink-40">
                {g.year} · {g.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
