import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Restrained page transition: a short fade with a few px of upward drift.
 * Collapses to an instant cross-fade under prefers-reduced-motion.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.main
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -8 }}
      transition={{
        duration: reduced ? 0.15 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.main>
  )
}
