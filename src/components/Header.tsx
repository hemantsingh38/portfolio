import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = ['cover', 'work', 'about', 'contact']

const NAV = [
  { id: 'cover', label: 'Cover' },
  { id: 'work',  label: 'Index' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Persistent sticky header set in micro-type.
 *
 * On the main single-page route (/): links are hash anchors (#cover, #work…)
 * that smooth-scroll to sections; the active link is driven by IntersectionObserver.
 *
 * On project detail pages (/work/:id): links go back to the home page with an
 * anchor so the correct section scrolls into view on landing.
 */
export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // Only watch sections when on the homepage
  const activeId = useActiveSection(isHome ? SECTION_IDS : [])

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm">
      <div className="spread">
        <div className="flex items-center justify-between border-b-2 border-ink py-3">
          {/* Masthead lockup */}
          <Link
            to="/"
            className="font-display text-lg font-medium leading-none tracking-[-0.01em] text-ink transition-colors hover:text-blue"
          >
            Bluetigercub
          </Link>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-5 sm:gap-8">
              {NAV.map((item) => {
                const isActive = isHome && activeId === item.id
                const href = isHome ? `#${item.id}` : `/#${item.id}`
                return (
                  <li key={item.id}>
                    <a
                      href={href}
                      className={`label transition-colors hover:text-blue ${
                        isActive ? 'text-blue' : 'text-ink-60'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Issue marker */}
          <span className="label hidden md:block">{siteConfig.issue}</span>
        </div>
      </div>
    </header>
  )
}
