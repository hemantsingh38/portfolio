import { useEffect, useState } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

/**
 * True on devices with a real hover-capable pointer (mouse/trackpad).
 * On touch devices this is false, so the index falls back to inline
 * thumbnails instead of the cursor-following preview.
 */
export function useHasHover(): boolean {
  const [hasHover, setHasHover] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setHasHover(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return hasHover
}
