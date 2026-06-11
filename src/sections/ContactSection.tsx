import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteConfig } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Contact — dark, reversed palette. The final resting note of the publication.
 *
 * Composition:
 *  • Near-black full-bleed zone (ink background, paper text)
 *  • Oversized display email address
 *  • Stacked social links in micro-type
 *  • Bottom colophon strip mirroring the header
 */
export default function ContactSection() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduced ? 0.15 : 0.7, delay: reduced ? 0 : delay, ease },
  })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-ink text-paper"
      aria-label="Contact"
    >
      {/* Constructivist red wedge — after El Lissitzky's "Beat the Whites with the Red Wedge" */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-[64%]" style={{ background: '#E4002B', clipPath: 'polygon(100% 0, 100% 100%, 0 46%)' }} />
        <div className="absolute left-[-6%] top-[66%] h-[3px] w-[56%] -rotate-[18deg]" style={{ background: 'rgba(247,245,240,0.7)' }} />
      </div>
      <div className="spread relative z-10 py-20 sm:py-32">
        {/* Section marker */}
        <motion.div
          {...rise(0)}
          className="flex items-end justify-between border-b-2 border-paper/30 pb-6"
        >
          <span className="label text-paper-60">Get in touch</span>
          <span className="label text-paper-60">{siteConfig.issue}</span>
        </motion.div>

        {/* Oversized folio */}
        <motion.div {...rise(0.04)} className="mt-8 flex items-end gap-6">
          <span aria-hidden className="folio text-paper">04</span>
          <span className="label pb-2 leading-tight text-paper-60">
            Connect
            <br />
            Homage 04 · Constructivism, 1919 — El Lissitzky
          </span>
        </motion.div>

        {/* Headline */}
        <motion.p
          {...rise(0.06)}
          className="mt-8 max-w-prose font-body text-xl leading-snug text-paper sm:text-2xl"
        >
          For commissions, collaborations, and conversations about print.
        </motion.p>

        {/* Oversized email */}
        <motion.div {...rise(0.1)} className="mt-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-block font-display leading-none text-paper"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 4.5rem)' }}
          >
            <span className="border-b-2 border-paper pb-1 transition-colors group-hover:border-paper-40">
              {siteConfig.email}
            </span>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.nav
          {...rise(0.16)}
          aria-label="Social links"
          className="mt-14"
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-paper-60 transition-colors hover:text-paper"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Bottom colophon strip */}
        <motion.div
          {...rise(0.22)}
          className="mt-24 flex flex-col items-start justify-between gap-4 border-t-2 border-paper/30 pt-6 sm:flex-row sm:items-center"
        >
          <span className="label text-paper-60">
            © {siteConfig.name} {new Date().getFullYear()}
          </span>
          <span className="label text-paper-60">
            Set in Bookmania & Rank
          </span>
          <span className="label text-paper-60">
            Built with Vite · React · Tailwind
          </span>
        </motion.div>
      </div>
    </section>
  )
}
