import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import { projects, siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Cover — reads like the front of a publication.
 *
 * Composition moves:
 *  • Oversized Bookmania masthead filling most of the viewport width
 *  • Two-column asymmetric split: left rail (small) / hero image (large)
 *  • Hero image slightly overlaps into the WorkSection below (negative margin)
 *  • Vertical spine label rotated along the right edge
 *  • Scroll-linked parallax on the hero image
 *  • Staggered reveal animation on all type elements
 */
export default function CoverSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.15 : 0.75, delay: reduced ? 0 : delay, ease },
  })

  const hero = projects[0]

  return (
    <section
      id="cover"
      ref={sectionRef}
      className="relative bg-paper pb-0 pt-10 sm:pt-16"
      aria-label="Cover"
    >
      <div className="spread">
        {/* Top masthead rail */}
        <motion.div
          {...rise(0)}
          className="flex items-end justify-between border-b-2 border-ink pb-4"
        >
          <span className="label-ink">{siteConfig.issue}</span>
          <span className="label hidden sm:block">{siteConfig.tagline}</span>
          <span className="label-ink">Folio · 01</span>
        </motion.div>

        {/* Main masthead */}
        <div className="relative pt-8 sm:pt-12">
          <motion.h1
            {...rise(0.06)}
            className="display-xl text-ink leading-[0.88]"
          >
            Blue
            <span className="text-blue">tiger</span>
            <br />
            cub
          </motion.h1>

          {/* Vertical spine label */}
          <motion.span
            {...rise(0.32)}
            className="vertical-rl label absolute right-0 top-2 hidden text-ink-40 lg:block"
          >
            An editorial design portfolio
          </motion.span>
        </div>

        {/* Sub-deck + oversized folio */}
        <motion.div
          {...rise(0.16)}
          className="mt-8 flex items-start justify-between gap-10"
        >
          <p className="body-justify max-w-prose font-body text-lg leading-snug text-ink sm:text-xl">
            {siteConfig.tagline} A studio practice in publications, identities,
            and the occasional typeface — set with the patience of print.
          </p>
          <span aria-hidden className="folio hidden shrink-0 text-blue lg:block">01</span>
        </motion.div>

        {/* Two-column asymmetric layout: cover lines + hero */}
        <motion.div
          {...rise(0.26)}
          className="mt-10 grid grid-cols-12 gap-x-4 gap-y-8 sm:gap-x-8"
        >
          {/* Left: cover lines (small column) */}
          <div className="order-2 col-span-12 flex flex-col justify-between sm:order-1 sm:col-span-3 lg:col-span-2">
            <ul className="space-y-6">
              {projects.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <a
                    href="#work"
                    className="group block"
                    aria-label={`Go to ${p.title}`}
                  >
                    <span className="index-num text-blue">{p.index}</span>
                    <span className="mt-1 block font-display text-xl leading-tight transition-colors group-hover:text-blue">
                      {p.title}
                    </span>
                    <span className="label mt-0.5 block">{p.category}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#work"
              className="label-ink mt-10 hidden items-center gap-2 transition-colors hover:text-blue sm:inline-flex"
            >
              Open the index <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Right: hero image — overflows slightly into WorkSection */}
          <div className="order-1 col-span-12 sm:order-2 sm:col-span-9 lg:col-span-10">
            <Link to={`/work/${hero.id}`} className="group block">
              <div className="overflow-hidden border-[6px] border-blue sm:border-[10px]">
                <motion.div style={reduced ? undefined : { y: heroY }}>
                  <LazyImage
                    src={hero.coverImage}
                    alt={`${hero.title} — cover image`}
                    className="aspect-[3/4] w-full sm:aspect-[16/10]"
                    imgClassName="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.015]"
                  />
                </motion.div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="label">Featured · {hero.category}</span>
                <span className="label">{hero.year}</span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Bleed line into next section */}
        <div className="mt-16 border-t-2 border-ink" aria-hidden="true" />
      </div>
    </section>
  )
}
