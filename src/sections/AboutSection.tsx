import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import SprayCanvas from '../components/SprayCanvas'
import { about, siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useHasHover } from '../hooks/useHasHover'

/**
 * About — a white editorial spread.
 *
 *  • White paper, ink type, a soft pink aerosol blob that builds under the
 *    cursor (SprayCanvas) over a baked CSS base blob.
 *  • Body copy set to the LEFT in a single column — a serif, mixed-case
 *    "About" heading (no shouty caps), intro, colophon, contact.
 *  • Personal photos scattered at random across the right, each a memory
 *    from a different year, tagged with a tiny micro-caption.
 *  • Scattered micro-graphics — a red pixel block, an orange chip, a maze.
 */

// Light pink aerosol — soft tints that, multiplied over white, settle into the
// same pink as the baked gradient (so the painted trail merges, not glows).
const SPRAY_COLORS = ['#FF7DB0', '#FF8FBC', '#FF6AA6']

// Soft baked pink mass under the live spray, weighted toward the photo side.
const BLOB: CSSProperties = {
  background:
    'radial-gradient(42% 50% at 60% 44%, rgba(255,45,120,0.40), rgba(255,45,120,0.16) 56%, transparent 74%),' +
    'radial-gradient(22% 26% at 52% 58%, rgba(255,31,111,0.46), transparent 70%)',
  filter: 'blur(3px)',
}

// Uniform photos scattered at spaced positions (lg+) — same size, no rotation,
// no overlap. Kept to the right side so the left body column stays clear.
const PHOTO_W = 132
const PHOTO_ASPECT = 'aspect-[4/5]'
const SCATTER = [
  { top: '0%', left: '48%' },
  { top: '2%', left: '64%' },
  { top: '0%', left: '80%' },
  { top: '30%', left: '47%' },
  { top: '32%', left: '63%' },
  { top: '30%', left: '80%' },
  { top: '60%', left: '55%' },
  { top: '62%', left: '71%' },
]

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
  { c: '✳', top: '5%', left: '2%', rot: -12, size: 20, color: '#1A4BE8', o: 0.75 },
  { c: '✦', top: '46%', left: '1%', rot: 14, size: 16, color: '#FF2D78' },
  { c: '＋', top: '90%', left: '3%', rot: 0, size: 16, color: '#FF5A1F', o: 0.8 },
  { c: '✕', top: '10%', left: '95%', rot: 8, size: 16, color: '#141414', o: 0.45 },
  { c: '◆', top: '64%', left: '50%', rot: 0, size: 9, color: '#3DF03D' },
  { c: '↗', top: '95%', left: '52%', rot: 0, size: 18, color: '#1A4BE8', o: 0.7 },
]

function PhotoCaption({ n, year, caption }: { n: number; year?: string; caption?: string }) {
  return (
    <figcaption className="mt-1.5 max-w-[20ch] font-tight text-[10px] leading-[1.3] tracking-tight text-ink-60">
      <span className="tabular-nums text-ink-40">{String(n).padStart(2, '0')}</span>
      {year && (
        <span className="ml-1.5 font-medium tabular-nums" style={{ color: '#FF2D78' }}>
          {year}
        </span>
      )}
      {caption && <span className="mt-0.5 block">{caption}</span>}
    </figcaption>
  )
}

export default function AboutSection() {
  const reduced = usePrefersReducedMotion()
  const hasHover = useHasHover()
  const ref = useRef<HTMLElement>(null)
  const glossRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Glossy laminate highlight tracks the pointer (rAF-throttled). Stays at its
  // static default when there's no hover pointer or reduced-motion is set.
  useEffect(() => {
    if (!hasHover || reduced) return
    const sectionEl = ref.current
    const gloss = glossRef.current
    if (!sectionEl || !gloss) return
    let raf = 0
    let nx = 50
    let ny = 28
    const onMove = (e: PointerEvent) => {
      const rect = sectionEl.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      if (x < -15 || x > 115 || y < -15 || y > 115) return
      nx = x
      ny = y
      if (!raf) {
        raf = window.requestAnimationFrame(() => {
          raf = 0
          gloss.style.setProperty('--mx', `${nx}%`)
          gloss.style.setProperty('--my', `${ny}%`)
        })
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [hasHover, reduced])

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
      {/* Soft gradient base + live aerosol that follows the cursor and builds
          up on repeated passes (fade={0}) — like colouring on paper. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={BLOB} />
      <SprayCanvas
        colors={SPRAY_COLORS}
        smooth
        maxAlpha={0.18}
        radius={40}
        fade={0}
        className="absolute inset-0 z-0 h-full w-full mix-blend-multiply"
      />

      {/* Scattered micro-graphics, kept to the margins/gutter */}
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
        <svg className="absolute hidden sm:block" style={{ top: '7%', left: '41%' }} width="36" height="36" viewBox="0 0 36 36">
          {PIXELS.flatMap((row, y) =>
            row.map((on, x) => (on ? <rect key={`${x}-${y}`} x={x * 7} y={y * 7} width="6.4" height="6.4" fill="#FF3B1E" /> : null)),
          )}
        </svg>

        {/* Orange→yellow chip */}
        <div className="absolute hidden h-9 w-14 sm:block" style={{ top: '35%', left: '43%', background: 'linear-gradient(150deg,#FF5A1F,#FFC400)' }} />

        {/* Tangled maze / scribble */}
        <svg className="absolute hidden lg:block" style={{ top: '84%', left: '90%' }} width="60" height="38" viewBox="0 0 64 40" fill="none" stroke="#141414" strokeWidth="2">
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
          <span>{siteConfig.name} — About</span>
          <span>{siteConfig.issue}</span>
        </motion.div>

        <div className="relative mt-12 lg:min-h-[940px]">
          {/* ── Left: the body copy ─────────────────────────────────── */}
          <motion.div {...rise(0.06)} className="relative z-10 lg:max-w-[30rem]">
            <span className="font-tight text-[11px] uppercase tracking-[0.16em] text-ink-40">
              The designer
            </span>
            <h2
              className="mt-3 font-display leading-[0.95] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)' }}
            >
              About
            </h2>
            <p className="mt-5 max-w-[40ch] font-tight text-base font-light leading-[1.45] tracking-[-0.005em] text-ink sm:text-lg">
              {about.intro}
            </p>
            {hasHover && !reduced && (
              <p className="mt-4 font-tight text-[11px] tracking-tight text-ink-40">
                <span style={{ color: '#FF2D78' }}>✲</span> move your cursor — the paint is still wet
              </p>
            )}

            <div className="mt-10 border-t border-ink-15 pt-6">
              <h3 className="font-tight text-base font-bold tracking-[-0.02em]">Colophon</h3>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {about.colophon.map((c) => (
                  <div key={c.label}>
                    <dt className="font-tight text-[10px] uppercase tracking-[0.12em] text-ink-40">{c.label}</dt>
                    <dd className="mt-0.5 font-tight text-sm font-medium leading-snug tracking-[-0.01em]">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 border-t border-ink-15 pt-6">
              <h3 className="font-tight text-base font-bold tracking-[-0.02em]">Contact</h3>
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
            </div>

            <p className="mt-10 font-tight text-[10px] uppercase tracking-[0.14em] text-ink-40">
              {siteConfig.name} — Vol. MMXXVI · <span className="text-ink-60">about-spread-RZ.indd</span>
            </p>
          </motion.div>

          {/* ── Right: scattered memory photos (lg+) ────────────────── */}
          <motion.div {...rise(0.14)} className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
            {about.gallery.map((g, i) => {
              const s = SCATTER[i % SCATTER.length]
              return (
                <figure
                  key={i}
                  className="pointer-events-auto absolute"
                  style={{ top: s.top, left: s.left, width: PHOTO_W }}
                >
                  <LazyImage
                    src={g.src}
                    alt={g.caption ?? 'A memory'}
                    className={`w-full ring-1 ring-ink-15 ${PHOTO_ASPECT}`}
                    imgClassName="object-cover"
                  />
                  <PhotoCaption n={i + 1} year={g.year} caption={g.caption} />
                </figure>
              )
            })}
          </motion.div>

          {/* ── Right photos collapse into a loose grid on small screens ── */}
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:hidden">
            {about.gallery.map((g, i) => (
              <figure key={i}>
                <LazyImage
                  src={g.src}
                  alt={g.caption ?? 'A memory'}
                  className={`w-full ring-1 ring-ink-15 ${PHOTO_ASPECT}`}
                  imgClassName="object-cover"
                />
                <PhotoCaption n={i + 1} year={g.year} caption={g.caption} />
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Glossy plastic laminate — a static diagonal streak + a soft highlight
          that tracks the cursor. Subtle, above content, never blocks input. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.18) 47%, rgba(255,255,255,0.04) 53%, transparent 64%)',
            mixBlendMode: 'soft-light',
          }}
        />
        <div
          ref={glossRef}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at var(--mx,50%) var(--my,28%), rgba(255,255,255,0.22), rgba(255,255,255,0) 40%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </section>
  )
}
