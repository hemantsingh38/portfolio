import { useEffect, useRef, useState } from 'react'

/**
 * Watches a list of section ids via IntersectionObserver and returns
 * the id of whichever section is currently most visible in the viewport.
 *
 * Used by the Header to highlight the correct nav link as the user scrolls.
 */
export function useActiveSection(ids: string[], rootMargin = '-30% 0px -60% 0px') {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin },
    )

    const observer = observerRef.current
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [ids, rootMargin])

  return activeId
}
