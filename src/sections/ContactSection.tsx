import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Connect — clean, minimal, black-on-white. An oversized email and a short
 * line; nothing else.
 */
export default function ContactSection() {
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
    <section id="contact" ref={ref} aria-label="Connect" className="min-h-screen bg-paper text-ink">
      <div className="spread py-12 pb-28 sm:py-16 sm:pb-32">
        <div className="flex items-end justify-between border-b border-ink pb-3">
          <span className="label text-ink-60">Connect</span>
          <span className="label text-ink-60">{siteConfig.issue}</span>
        </div>

        <motion.p
          {...rise(0.06)}
          className="mt-12 max-w-[34ch] font-display text-2xl leading-[1.15] tracking-[-0.01em] sm:text-3xl"
        >
          For commissions, collaborations, and conversations — say hello.
        </motion.p>

        <motion.div {...rise(0.1)} className="mt-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-block font-display leading-none"
            style={{ fontSize: 'clamp(1.7rem, 6vw, 4.75rem)' }}
          >
            <span className="border-b-2 border-ink pb-1 transition-colors group-hover:border-ink-40">
              {siteConfig.email}
            </span>
          </a>
        </motion.div>

        <motion.ul {...rise(0.16)} className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {siteConfig.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-ink-60 transition-colors hover:text-ink"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.div
          {...rise(0.2)}
          className="mt-24 flex flex-col gap-3 border-t border-ink-15 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="label text-ink-40">© {siteConfig.name} {new Date().getFullYear()}</span>
          <span className="label text-ink-40">Set in Bookmania &amp; Rank</span>
          <span className="label text-ink-40">Built with Vite · React · Tailwind</span>
        </motion.div>
      </div>
    </section>
  )
}
