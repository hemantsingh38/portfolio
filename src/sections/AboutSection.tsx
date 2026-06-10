import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import SprayCanvas from '../components/SprayCanvas'
import { projects, about, siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useHasHover } from '../hooks/useHasHover'

/**
 * About — a bright white magazine "contents" spread.
 *
 * Homage to the Reconnect (Kern FW21) contents page:
 *  • White paper, ink type, generous right-hand white space
 *  • A soft pink aerosol blob that builds up under the cursor (SprayCanvas)
 *    over a baked CSS base blob, so a magenta mass is always on the page
 *  • A tight-tracked bold caps contents list with small page numbers; one
 *    entry flagged in accent like the printed "ME / WE"
 *  • Inline thumbnails pinned beside entries
 *  • Scattered micro-graphics — a red pixel block, an orange chip, a maze
 *  • A barely-legible micro-type column down the far margin
 */

// Pink aerosol — one hue family so it reads as a single magenta cloud on white.
const SPRAY_COLORS = ['#FF2D78', '#FF1F6F', '#FF4D90']

// The six projects become the left "contents", with ascending page numbers.
const PAGES = ['14', '23', '30', '40', '54', '72']
// Which entries carry an inline thumbnail (mirrors the print mix).
const THUMB_AT = new Set([0, 2, 4])
// me-we is index 4 — flagged accent, echoing the printed red "ME / WE".
const ACCENT_AT = 4

// Baked pink mass — always present, so the page matches the reference even
// before the cursor moves. The canvas then sprays live texture on top.
const BLOB: CSSProperties = {
  background:
    'radial-gradient(40% 48% at 33% 42%, rgba(255,45,120,0.40), rgba(255,45,120,0.16) 56%, transparent 72%),' +
    'radial-gradient(20% 24% at 44% 52%, rgba(255,31,111,0.46), transparent 70%)',
  filter: 'blur(3px)',
}

// Small abstract red pixel cluster (the "8-bit" micro-graphic).
const PIXELS = [
  [1, 0, 1, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0],
  [1, 1, 0, 1, 1],
]

type Mark = { c: string; top: string; left: string; rot: number; size: number; color: string; o?: number }
const MARKS: Mark[] = [
  { c: '✳', top: '6%', left: '2%', rot: -12, size: 22, color: '#1A4BE8', o: 0.8 },
  { c: '→', top: '4%', left: '46%', rot: 0, size: 20, color: '#141414', o: 0.55 },
  { c: '✦', top: '40%', left: '1%', rot: 14, size: 18, color: '#FF2D78' },
  { c: '＋', top: '88%', left: '4%', rot: 0, size: 18, color: '#FF5A1F', o: 0.8 },
  { c: '◆', top: '70%', left: '52%', rot: 0, size: 10, color: '#3DF03D' },
  { c: '✕', top: '12%', left: '93%', rot: 8, size: 18, color: '#141414', o: 0.5 },
  { c: '↗', top: '95%', left: '60%', rot: 0, size: 20, color: '#1A4BE8', o: 0.7 },
]

export default function AboutSection() {
  const reduced = usePrefersReducedMotion()
  const hasHover = useHasHover()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduced ? 0.15 : 0.7, delay: reduced ? 0 : delay, ease },
  })

  const sideMeta = about.colophon.map((c) => `${c.label} — ${c.value}`).join('   ·   ')

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About"
      className="relative overflow-hidden bg-white text-ink"
    >
      {/* Baked pink mass + live aerosol that follows the cursor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={BLOB} />
      <SprayCanvas colors={SPRAY_COLORS} className="absolute inset-0 z-0 h-full w-full" />

      {/* Scattered micro-graphics, kept to the margins so they frame, not cover */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        {MARKS.map((m, i) => (
          <span
            key={i}
            className="absolute font-tight leading-none"
            style={{ top: m.top, left: m.left, transform: `rotate(${m.rot}deg)`, fontSize: m.size, color: m.color, opacity: m.o ?? 1 }}
          >
            {m.c}
          </span>
        ))}

        {/* Red pixel block */}
        <svg className="absolute hidden sm:block" style={{ top: '9%', left: '40%' }} width="36" height="36" viewBox="0 0 36 36">
          {PIXELS.flatMap((row, y) =>
            row.map((on, x) => (on ? <rect key={`${x}-${y}`} x={x * 7} y={y * 7} width="6.4" height="6.4" fill="#FF3B1E" /> : null)),
          )}
        </svg>

        {/* Orange→yellow chip */}
        <div className="absolute hidden h-10 w-16 sm:block" style={{ top: '30%', left: '36%', background: 'linear-gradient(150deg,#FF5A1F,#FFC400)' }} />

        {/* Tangled maze / scribble */}
        <svg className="absolute hidden lg:block" style={{ top: '82%', left: '90%' }} width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="#141414" strokeWidth="2">
          <path d="M2 6h12v12H6v12h18V6h12v28h12V14H50" />
          <path d="M2 34h8M30 34h22" />
        </svg>

        {/* Far-margin micro-type column */}
        <span className="vertical-rl absolute left-1.5 top-28 hidden font-tight text-[9px] uppercase tracking-[0.14em] text-ink-40 lg:block">
          {sideMeta}
        </span>
      </div>

      <div className="spread relative z-10 py-20 sm:py-28">
        {/* Running header */}
        <motion.div
          {...rise(0)}
          className="flex items-end justify-between border-b border-ink-15 pb-3 font-tight text-[10px] font-medium uppercase tracking-[0.16em] text-ink-60"
        >
          <span>Contents — About</span>
          <span>{siteConfig.issue}</span>
        </motion.div>

        <div className="mt-12 grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {/* ── Left: the contents list ─────────────────────────────── */}
          <motion.ol {...rise(0.06)} className="space-y-9">
            {projects.map((p, i) => {
              const accent = i === ACCENT_AT
              return (
                <li key={p.id} className="max-w-[20ch]">
                  <span
                    className="block font-tight text-[12px] font-medium tabular-nums tracking-tight"
                    style={accent ? { color: '#FF2D78' } : { color: 'rgba(20,20,20,0.55)' }}
                  >
                    {PAGES[i]}
                  </span>
                  <h3
                    className="mt-1 font-tight font-bold uppercase leading-[0.88] tracking-[-0.045em]"
                    style={{ fontSize: 'clamp(1.4rem,3.2vw,2.5rem)', color: accent ? '#FF2D78' : undefined }}
                  >
                    {p.title}
                  </h3>
                  {THUMB_AT.has(i) && (
                    <LazyImage
                      src={p.coverImage}
                      alt={p.title}
                      className="mt-3 w-32 ring-1 ring-ink-15"
                      imgClassName="aspect-[5/4] object-cover"
                    />
                  )}
                </li>
              )
            })}
          </motion.ol>

          {/* ── Right: the About content, set as numbered blocks ────── */}
          <div className="space-y-12 lg:pl-6">
            <motion.div {...rise(0.12)}>
              <span className="block font-tight text-[12px] font-medium tabular-nums tracking-tight text-ink-60">86</span>
              <h3 className="mt-1 font-tight font-bold uppercase leading-[0.88] tracking-[-0.045em]" style={{ fontSize: 'clamp(1.4rem,3.2vw,2.5rem)' }}>
                About
              </h3>
              <p className="mt-4 max-w-[42ch] font-tight text-lg font-light leading-[1.25] tracking-[-0.01em] text-ink sm:text-xl">
                {about.intro}
              </p>
              {hasHover && !reduced && (
                <p className="mt-4 font-tight text-[11px] uppercase tracking-[0.12em] text-ink-40">
                  <span style={{ color: '#FF2D78' }}>✲</span> move your cursor — the paint is still wet
                </p>
              )}
            </motion.div>

            <motion.div {...rise(0.16)}>
              <span className="block font-tight text-[12px] font-medium tabular-nums tracking-tight text-ink-60">105</span>
              <h3 className="mt-1 font-tight font-bold uppercase leading-[0.88] tracking-[-0.045em]" style={{ fontSize: 'clamp(1.1rem,2.2vw,1.6rem)' }}>
                Colophon
              </h3>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {about.colophon.map((c) => (
                  <div key={c.label}>
                    <dt className="font-tight text-[10px] uppercase tracking-[0.12em] text-ink-40">{c.label}</dt>
                    <dd className="mt-0.5 font-tight text-sm font-medium leading-snug tracking-[-0.01em]">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div {...rise(0.2)}>
              <span className="block font-tight text-[12px] font-medium tabular-nums tracking-tight text-ink-60">122</span>
              <h3 className="mt-1 font-tight font-bold uppercase leading-[0.88] tracking-[-0.045em]" style={{ fontSize: 'clamp(1.1rem,2.2vw,1.6rem)' }}>
                Contact
              </h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 inline-block font-tight text-base font-medium tracking-[-0.01em] underline decoration-ink-15 underline-offset-4 transition-colors hover:decoration-[#FF2D78]"
              >
                {siteConfig.email}
              </a>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-tight text-[11px] uppercase tracking-[0.1em] text-ink-60">
                {siteConfig.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p {...rise(0.24)} className="pt-2 text-right font-tight text-[10px] uppercase tracking-[0.14em] text-ink-40">
              {siteConfig.name} — Vol. MMXXVI
              <br />
              <span className="text-ink-60">about-spread-RZ.indd</span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
