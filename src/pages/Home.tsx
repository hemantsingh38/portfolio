import { useState } from 'react'
import WorkGallery from '../sections/WorkGallery'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import Playground from '../sections/Playground'
import FloatingNav, { type View } from '../components/FloatingNav'

/**
 * The single-page app. Work (the gallery) is the landing; a floating pill
 * switches between Work / About / Connect / Playground as distinct "pages"
 * (state, not routes — keeps deep-links to /work/:id intact).
 */
export default function Home() {
  const [view, setView] = useState<View>('work')

  const go = (v: View) => {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <>
      {view === 'work' && <WorkGallery />}
      {view === 'about' && <AboutSection />}
      {view === 'connect' && <ContactSection />}
      {view === 'playground' && <Playground />}
      <FloatingNav view={view} onChange={go} />
    </>
  )
}
