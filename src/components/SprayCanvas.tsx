import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useHasHover } from '../hooks/useHasHover'

interface SprayCanvasProps {
  /** Neon spray colours, cycled as the cursor moves. */
  colors?: string[]
  /** Peak opacity of each airbrush burst — raise it for light backgrounds. */
  maxAlpha?: number
  /** Radius of the live airbrush cloud, in px. */
  radius?: number
  className?: string
}

const DEFAULT_COLORS = ['#3DF03D', '#FF2D78', '#FF5A1F', '#1A4BE8']

/**
 * A "wet wall" of spray paint that follows the pointer.
 *
 * The canvas sits behind the section content (pointer-events: none) and
 * listens for pointer movement on the window, mapping it into canvas space.
 * Each frame it (a) fades existing paint slightly toward transparent — a
 * trailing aerosol cloud — and (b) sprays a fresh airbrush burst at a lerped
 * origin so the trail glides rather than snaps.
 *
 * Touch devices and prefers-reduced-motion users get a static baked texture
 * instead of the live interaction.
 */
export default function SprayCanvas({
  colors = DEFAULT_COLORS,
  maxAlpha = 0.05,
  radius = 26,
  className = '',
}: SprayCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  const hasHover = useHasHover()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      // Reset transform then scale so 1 unit === 1 CSS px. (Setting width
      // also clears the canvas, so static mode re-bakes from the observer.)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // One airbrush burst: a disc of low-alpha specks around (x, y).
    const sprayBurst = (
      x: number,
      y: number,
      color: string,
      radius: number,
      count: number,
      maxAlpha: number,
    ) => {
      ctx.fillStyle = color
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = radius * Math.sqrt(Math.random())
        const px = x + Math.cos(angle) * r
        const py = y + Math.sin(angle) * r
        const dotR = Math.random() * 1.4 + 0.3
        const falloff = 1 - r / radius
        ctx.globalAlpha = maxAlpha * (0.25 + 0.75 * falloff) * Math.random()
        ctx.beginPath()
        ctx.arc(px, py, dotR, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // Static fallback: a few fixed clouds, no interaction.
    const bake = () => {
      ctx.clearRect(0, 0, width, height)
      const spots: [number, number][] = [
        [0.16, 0.28],
        [0.8, 0.2],
        [0.62, 0.66],
        [0.28, 0.8],
        [0.5, 0.46],
      ]
      spots.forEach(([fx, fy], i) => {
        const color = colors[i % colors.length]
        for (let p = 0; p < 5; p++) {
          sprayBurst(
            fx * width + (Math.random() - 0.5) * 70,
            fy * height + (Math.random() - 0.5) * 70,
            color,
            64 + Math.random() * 46,
            200,
            maxAlpha,
          )
        }
      })
    }

    resize()

    if (reduced || !hasHover) {
      const ro = new ResizeObserver(() => {
        resize()
        bake()
      })
      ro.observe(canvas)
      const id = window.requestAnimationFrame(bake)
      return () => {
        window.cancelAnimationFrame(id)
        ro.disconnect()
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Pointer state — mapped into canvas-local coordinates.
    let targetX = -1
    let targetY = -1
    let curX = -1
    let curY = -1
    let active = false
    let lastMove = 0
    let colorIndex = 0

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        active = false
        return
      }
      if (!active) {
        // Jump the origin to the entry point so we don't streak across.
        curX = x
        curY = y
      }
      targetX = x
      targetY = y
      active = true
      lastMove = performance.now()
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    const loop = () => {
      raf = window.requestAnimationFrame(loop)
      if (document.hidden) return

      // Fade existing paint toward transparent (trailing aerosol).
      ctx.globalCompositeOperation = 'destination-out'
      ctx.globalAlpha = 1
      ctx.fillStyle = 'rgba(0,0,0,0.014)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'

      if (!active || targetX < 0) return

      curX += (targetX - curX) * 0.32
      curY += (targetY - curY) * 0.32

      const idle = performance.now() - lastMove
      const intensity =
        idle < 550 ? 1 : Math.max(0, 1 - (idle - 550) / 1100)
      if (intensity <= 0) return

      colorIndex = (colorIndex + 0.02) % colors.length
      const color = colors[Math.floor(colorIndex)]
      sprayBurst(curX, curY, color, radius, Math.floor(64 * intensity), maxAlpha)

      // Occasional running drip for the wet-paint feel.
      if (Math.random() < 0.04 * intensity) {
        ctx.globalAlpha = 0.06
        ctx.strokeStyle = color
        ctx.lineWidth = 1 + Math.random() * 1.4
        const dx = (Math.random() - 0.5) * 22
        ctx.beginPath()
        ctx.moveTo(curX + dx, curY)
        ctx.lineTo(curX + dx, curY + 12 + Math.random() * 42)
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }
    raf = window.requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()
    }
  }, [reduced, hasHover, colors, maxAlpha, radius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block ${className}`}
    />
  )
}
