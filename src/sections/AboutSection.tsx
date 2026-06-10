import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import { about, siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * About — set like an editorial article.
 *
 * Composition:
 *  • Blue background zone — full-bleed color, paper text reversed
 *  • Portrait image + standfirst split (asymmetric grid)
 *  • Running body copy in two columns
 *  • Colophon credits block at the foot
 *  • Micro-typography throughout: section marker, figure caption, credit labels
 */
export default function AboutSection() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduced ? 0.15 : 0.75, delay: reduced ? 0 : delay, ease },
  })

  return (
    <section
      id="about"
      ref={ref}
      className="bg-blue text-paper"
      aria-label="About"
    >
      <div className="spread py-20 sm:py-28">
        {/* Section header */}
        <motion.header {...rise(0)} className="border-b border-paper-15 pb-6">
          <div className="flex items-end justify-between">
            <span className="label text-paper-60">Colophon · About</span>
            <span className="label text-paper-60">{siteConfig.name}</span>
          </div>
          <h2 className="display mt-6 text-paper">About</h2>
        </motion.header>

        {/* Portrait + standfirst — asymmetric */}
        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8">
          <motion.div {...rise(0.08)} className="col-span-12 lg:col-span-7">
            {/* Large standfirst */}
            <p className="font-display text-2xl leading-snug text-paper sm:text-3xl lg:text-4xl">
              {about.intro}
            </p>
          </motion.div>

          <motion.div
            {...rise(0.12)}
            className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-9"
          >
            <LazyImage
              src={about.portrait}
              alt="Portrait of the designer"
              className="aspect-[3/4] w-full"
              imgClassName="object-cover grayscale mix-blend-luminosity"
            />
            <p className="label mt-3 text-paper-60">Fig. 01 — the designer</p>
          </motion.div>
        </div>

        {/* Running body copy */}
        <motion.div
          {...rise(0.16)}
          className="mt-14 border-t border-paper-15 pt-10"
        >
          <div className="columns-1 gap-10 lg:columns-2 [&>p]:mb-5 [&>p]:break-inside-avoid">
            {about.bio.map((para, i) => (
              <p
                key={i}
                className="font-body text-lg leading-relaxed text-paper"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Colophon block */}
        <motion.section
          {...rise(0.22)}
          className="mt-16 border-t border-paper-15 pt-6"
          aria-label="Colophon"
        >
          <p className="label mb-6 text-paper-40">Colophon</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {about.colophon.map((c) => (
              <div key={c.label}>
                <dt className="label mb-1 text-paper-60">{c.label}</dt>
                <dd className="font-body text-sm leading-snug text-paper">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.section>
      </div>
    </section>
  )
}
