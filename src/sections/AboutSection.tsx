import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { about, siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * About — clean, minimal, black-on-white. Standfirst + bio, a frameless photo
 * column, and a colophon. No colour, no decoration.
 */
const AR = ['aspect-[4/5]', 'aspect-[1/1]', 'aspect-[3/4]']

export default function AboutSection() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduced ? 0.15 : 0.6, delay: reduced ? 0 : delay, ease },
  })

  return (
    <section id="about" ref={ref} aria-label="About" className="min-h-screen bg-paper text-ink">
      <div className="spread py-12 pb-28 sm:py-16 sm:pb-32">
        <div className="flex items-end justify-between border-b border-ink pb-3">
          <span className="label text-ink-60">{siteConfig.name} — About</span>
          <span className="label text-ink-60">{siteConfig.issue}</span>
        </div>

        <motion.h2 {...rise(0.04)} className="display mt-10">
          About
        </motion.h2>
        <motion.p
          {...rise(0.08)}
          className="mt-6 max-w-[40ch] font-display text-2xl leading-[1.15] tracking-[-0.01em] sm:text-3xl"
        >
          {about.intro}
        </motion.p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <motion.div {...rise(0.12)} className="space-y-5">
            {about.bio.map((para, i) => (
              <p key={i} className="body-justify font-body text-lg leading-relaxed text-ink">
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div {...rise(0.16)} className="columns-2 gap-4">
            {about.gallery.slice(0, 6).map((g, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <span className={`block overflow-hidden rounded-xl bg-ink-08`}>
                  <img
                    src={g.src}
                    alt={g.caption ?? ''}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover ${AR[i % AR.length]}`}
                  />
                </span>
                <span className="label mt-1.5 block text-ink-40">
                  {g.year} · {g.caption}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.2)}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink-15 pt-8 sm:grid-cols-3"
        >
          {about.colophon.map((c) => (
            <div key={c.label}>
              <dt className="label text-ink-40">{c.label}</dt>
              <dd className="mt-1 font-body text-sm leading-snug text-ink">{c.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
