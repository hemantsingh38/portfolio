import { Link } from 'react-router-dom'
import { siteConfig } from '../data/portfolio'

/**
 * Slim persistent masthead bar — wordmark + issue. Page switching lives in the
 * floating nav (see FloatingNav), echoing the reference sites' floating chrome.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm">
      <div className="spread">
        <div className="flex items-center justify-between border-b-2 border-ink py-3">
          <Link
            to="/"
            className="font-display text-lg font-medium leading-none tracking-[-0.01em] text-ink transition-colors hover:text-blue"
          >
            {siteConfig.name}
          </Link>
          <span className="label hidden sm:block">{siteConfig.issue}</span>
        </div>
      </div>
    </header>
  )
}
