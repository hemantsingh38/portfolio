import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface CursorPreviewProps {
  /** Image src to show, or null when nothing is hovered. */
  src: string | null
  alt: string
  /** Two-digit project index, e.g. "01". */
  index?: string
  /** Category line shown under the image. */
  category?: string
  /** Accent colour for the top hairline bar. */
  accent?: string
}

/**
 * An editorial preview card that trails the cursor (to its lower-right).
 *
 * The pointer position lives in refs and the card is moved via a single
 * requestAnimationFrame loop that lerps toward the target — smooth + cheap,
 * no React state per mousemove. On appear it wipes open with a clip-path so it
 * reads like a printed plate being revealed rather than a floating thumbnail.
 *
 * Rendered only when a hover-capable pointer exists and reduced-motion is off
 * — the parent (Work section) gates that.
 */
export default function CursorPreview({ src, alt, index, category, accent = '#141414' }: CursorPreviewProps) {
  const elRef = useRef<HTMLDivElement | null>(null)
  const target = useRef({ x: -9999, y: -9999 })
  const current = useRef({ x: -9999, y: -9999 })
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const LERP = 0.16
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP
      current.current.y += (target.current.y - current.current.y) * LERP
      const el = elRef.current
      if (el) {
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
      style={{ willChange: 'transform' }}
    >
      {/* Offset the card to the lower-right of the cursor */}
      <div style={{ transform: 'translate(28px, -52%)' }}>
        <AnimatePresence mode="wait">
          {src && (
            <motion.figure
              key={src}
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="w-[228px]"
            >
              <span className="block h-[3px] w-full" style={{ backgroundColor: accent }} />
              <span className="block aspect-[4/5] w-full overflow-hidden bg-ink-08 shadow-[0_14px_44px_-26px_rgba(20,20,20,0.55)]">
                <img src={src} alt={alt} className="h-full w-full object-cover" />
              </span>
              <figcaption className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-lg leading-none tabular-nums text-ink">{index}</span>
                <span className="label text-ink-60">{category}</span>
              </figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
