import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import SinglePage from './pages/SinglePage'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

/**
 * Route structure:
 *  /           → The single-page scroll portfolio (Cover + Work + About + Contact)
 *  /work/:id   → Standalone project spread (for deep-links / sharing)
 *  *           → 404
 *
 * The multi-section homepage uses anchor navigation (#work, #about, #contact)
 * so there are no separate /work, /about, /contact routes.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Accessibility: skip straight to content */}
      <a
        href="#cover"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-blue focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <Routes>
        <Route path="/" element={<SinglePage />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
