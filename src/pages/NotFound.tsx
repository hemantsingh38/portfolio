import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="spread flex min-h-[70vh] flex-col items-start justify-center pt-10">
        <span className="label">Error · 404</span>
        <h1 className="display-xl mt-4 text-ink">
          Page <span className="text-blue">missing</span>
        </h1>
        <p className="mt-6 max-w-prose font-body text-lg text-ink-60">
          This page isn’t in the index. It may have been moved to another
          issue.
        </p>
        <Link
          to="/work"
          className="label-ink mt-8 inline-flex items-center gap-2 transition-colors hover:text-blue"
        >
          Return to the index <span aria-hidden="true">→</span>
        </Link>
      </section>
    </PageTransition>
  )
}
