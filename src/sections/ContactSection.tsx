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
      className="bg-ink text-paper"
      aria-label="Contact"
    >
      <div className="spread py-20 sm:py-32">
        {/* Section marker */}
        <motion.div
          {...rise(0)}
          className="flex items-end justify-between border-b border-paper-15 pb-6"
        >
          <span className="label text-paper-40">Get in touch</span>
          <span className="label text-paper-40">{siteConfig.issue}</span>
        </motion.div>

        {/* Headline */}
        <motion.p
          {...rise(0.06)}
          className="mt-10 max-w-prose font-body text-xl leading-snug text-paper-60 sm:text-2xl"
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
            <span className="border-b-2 border-paper-40 pb-1 transition-colors group-hover:border-paper">
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
          className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-paper-15 pt-6 sm:flex-row sm:items-center"
        >
          <span className="label text-paper-40">
            © {siteConfig.name} {new Date().getFullYear()}
          </span>
          <span className="label text-paper-40">
            Set in Bookmania & Rank
          </span>
          <span className="label text-paper-40">
            Built with Vite · React · Tailwind
          </span>
        </motion.div>
      </div>
    </section>
  )
}
