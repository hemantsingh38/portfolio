import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import SprayCanvas from '../components/SprayCanvas'
import { about, siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useHasHover } from '../hooks/useHasHover'

/**
 * About — a dark "graffiti wall" zone.
 *
 * Composition:
 *  • Near-black concrete surface, paper text reversed
 *  • SprayCanvas: neon aerosol that follows the cursor (static when reduced)
 *  • Scattered micro-graphics — registration marks, arrows, asterisks
 *  • Oversized ultra-condensed "ABOUT" lockup (Anton), tight tracking
 *  • Taped-up contact sheet of small studio pictures
 *  • Running bio + colophon set in compact condensed grotesque (Oswald)
 */

// Stable references (kept out of render so SprayCanvas' effect deps don't churn).
const SPRAY_COLORS = ['#3DF03D', '#FF2D78', '#FF5A1F', '#1A4BE8']

// Per-thumbnail tilt + vertical offset for the pinned-photo collage feel.
const TILT = [-4, 2.5, -1.5, 3.5, -2.5, 1.5, -3, 2]
const OFFSET = ['mt-0', 'mt-7', 'mt-3', 'mt-8', 'mt-2', 'mt-6', 'mt-1', 'mt-5']

type Deco = {
  c: string
  top: string
  left: string
  rot: number
  size: number
  color: string
  opacity?: number
}

// Scattered micro-graphics — kept mostly to the margins so they frame, not cover.
const DECOS: Deco[] = [
  { c: '✳', top: '7%', left: '3%', rot: -12, size: 30, color: '#3DF03D' },
  { c: '→', top: '13%', left: '90%', rot: 16, size: 34, color: '#FF2D78' },
  { c: '＋', top: '5%', left: '57%', rot: 20, size: 24, color: '#FF5A1F', opacity: 0.7 },
  { c: '⊕', top: '38%', left: '95%', rot: 0, size: 26, color: '#F7F5F0', opacity: 0.45 },
  { c: '✦', top: '52%', left: '1.5%', rot: 14, size: 24, color: '#FF2D78' },
  { c: '✕', top: '69%', left: '5%', rot: 8, size: 26, color: '#FF5A1F' },
  { c: '◆', top: '83%', left: '93%', rot: -6, size: 20, color: '#1A4BE8' },
  { c: '↗', top: '92%', left: '44%', rot: 0, size: 28, color: '#3DF03D' },
  { c: '●', top: '30%', left: '49%', rot: 0, size: 10, color: '#FF2D78' },
  { c: '✲', top: '60%', left: '88%', rot: -18, size: 22, color: '#F7F5F0', opacity: 0.5 },
]

// Near-black concrete: a fine speckle plus a soft top vignette.
const CONCRETE: CSSProperties = {
  backgroundColor: '#0b0b0d',
  backgroundImage:
    'radial-gradient(rgba(255,255,255,0.05) 0.5px, transparent 0.6px), radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.045), transparent 60%)',
  backgroundSize: '3px 3px, 100% 100%',
}

export default function AboutSection() {
  const reduced = usePrefersReducedMotion()
  const hasHover = useHasHover()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduced ? 0.15 : 0.7, delay: reduced ? 0 : delay, ease },
  })

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About"
      className="relative overflow-hidden text-paper"
      style={CONCRETE}
    >
      {/* Wet-paint wall — follows the cursor */}
      <SprayCanvas colors={SPRAY_COLORS} className="absolute inset-0 z-0 h-full w-full" />

      {/* Scattered micro-graphics */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        {DECOS.map((d, i) => (
          <span
            key={i}
            className="absolute font-stencil leading-none"
            style={{
              top: d.top,
              left: d.left,
              transform: `rotate(${d.rot}deg)`,
              fontSize: d.size,
              color: d.color,
              opacity: d.opacity ?? 0.85,
            }}
          >
            {d.c}
          </span>
        ))}
        <span className="vertical-rl absolute right-3 top-1/2 -translate-y-1/2 font-grotesk text-[11px] uppercase tracking-[0.15em] text-paper-40">
          About — Vol. MMXXVI
        </span>
      </div>

      <div className="spread relative z-10 py-20 sm:py-28">
        {/* Eyebrow */}
        <motion.div
          {...rise(0)}
          className="flex items-end justify-between border-b border-paper-15 pb-4"
        >
          <span className="font-grotesk text-[11px] uppercase tracking-[0.04em] text-paper-60">
            Colophon · About
          </span>
          <span className="font-grotesk text-[11px] uppercase tracking-[0.04em] text-paper-60">
            {siteConfig.name}
          </span>
        </motion.div>

        {/* Oversized condensed lockup */}
        <motion.header {...rise(0.06)} className="mt-8 sm:mt-10">
          <h2
            className="font-stencil uppercase leading-[0.82] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(4rem, 18vw, 15rem)' }}
          >
            Abo<span style={{ color: '#3DF03D' }}>u</span>t
          </h2>
          <p className="mt-6 max-w-[44ch] font-grotesk text-xl font-light leading-[1.15] tracking-[-0.01em] text-paper sm:text-2xl">
            {about.intro}
          </p>
          {hasHover && !reduced && (
            <p className="mt-5 font-grotesk text-[11px] uppercase tracking-[0.12em] text-paper-40">
              <span style={{ color: '#FF2D78' }}>✲</span> move your cursor — the
              wall is still wet
            </p>
          )}
        </motion.header>

        {/* Taped-up contact sheet */}
        <motion.div
          {...rise(0.12)}
          className="mt-14 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4"
        >
          {about.gallery.map((g, i) => (
            <figure
              key={i}
              className={`group ${OFFSET[i % OFFSET.length]}`}
              style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
            >
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -top-2 left-1/2 z-10 h-4 w-12 -translate-x-1/2 -rotate-3 bg-paper/20 backdrop-blur-[1px]"
                />
                <LazyImage
                  src={g.src}
                  alt={g.caption ?? 'Studio image'}
                  className="aspect-[4/5] w-full ring-1 ring-paper-15"
                  imgClassName="object-cover grayscale contrast-[1.1] transition duration-500 group-hover:grayscale-0"
                />
              </div>
              {g.caption && (
                <figcaption className="mt-2 font-grotesk text-[10px] uppercase tracking-[0.06em] text-paper-40">
                  {String(i + 1).padStart(2, '0')} · {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </motion.div>

        {/* Running bio */}
        <motion.div {...rise(0.16)} className="mt-16 border-t border-paper-15 pt-10">
          <div className="columns-1 gap-10 lg:columns-2 [&>p]:mb-5 [&>p]:break-inside-avoid">
            {about.bio.map((para, i) => (
              <p
                key={i}
                className="font-grotesk text-base font-light leading-[1.5] tracking-[-0.005em] text-paper sm:text-lg"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Colophon */}
        <motion.section
          {...rise(0.22)}
          aria-label="Colophon"
          className="mt-16 border-t border-paper-15 pt-6"
        >
          <p className="mb-6 font-grotesk text-[11px] uppercase tracking-[0.06em] text-paper-40">
            Colophon
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {about.colophon.map((c) => (
              <div key={c.label}>
                <dt className="font-grotesk text-[10px] uppercase tracking-[0.06em] text-paper-40">
                  {c.label}
                </dt>
                <dd className="mt-1 font-grotesk text-sm font-medium leading-snug tracking-[-0.01em] text-paper">
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
