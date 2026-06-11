import LazyImage from '../components/LazyImage'
import { about } from '../data/portfolio'

/**
 * Playground — offcuts and experiments. Minimal: a small masonry of plates,
 * black-on-white, no decoration.
 */
const AR = ['aspect-[4/5]', 'aspect-[1/1]', 'aspect-[3/4]', 'aspect-[5/6]']

export default function Playground() {
  return (
    <section id="playground" aria-label="Playground" className="min-h-screen bg-paper text-ink">
      <div className="spread py-12 pb-28 sm:py-16 sm:pb-32">
        <span className="label text-ink-40">Sketchbook · no grades</span>
        <h2 className="display mt-3">Playground</h2>
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
                className={`w-full overflow-hidden rounded-xl ${AR[i % AR.length]}`}
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
