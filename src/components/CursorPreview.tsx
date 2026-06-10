import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface CursorPreviewProps {
  /** Image src to show, or null when nothing is hovered. */
  src: string | null
  alt: string
}

/**
 * A small image that follows the cursor with a slight easing lag.
 *
 * Performance notes:
 *  • We do NOT set React state on every mousemove. The pointer position is
 *    held in refs and the element is moved via a requestAnimationFrame loop
 *    that lerps the rendered position toward the target — smooth + cheap.
 *  • Only `src`/visibility changes go through React state (here, via props).
 *
 * Rendered only when a hover-capable pointer exists and reduced-motion is
 * off — the parent (Work page) is responsible for that gate.
 */
export default function CursorPreview({ src, alt }: CursorPreviewProps) {
  const elRef = useRef<HTMLDivElement | null>(null)
  // target = where the cursor is; current = where the element is drawn
  const target = useRef({ x: -9999, y: -9999 })
  const current = useRef({ x: -9999, y: -9999 })
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const LERP = 0.14 // lower = more lag/float
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP
      current.current.y += (target.current.y - current.current.y) * LERP
      const el = elRef.current
      if (el) {
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
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
      <AnimatePresence>
        {src && (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-[260px] w-[200px] overflow-hidden bg-ink-08 shadow-[0_18px_50px_-20px_rgba(20,20,20,0.45)]"
          >
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
