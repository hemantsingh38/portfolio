import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

/**
 * Route structure:
 *  /           → Home: the Work gallery landing + a floating page-switcher
 *                (About / Connect / Playground swap in via state)
 *  /work/:id   → Standalone project case-study spread (deep-links / sharing)
 *  *           → 404
 */
export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Accessibility: skip straight to content */}
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-blue focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
