import CoverSection from '../sections/CoverSection'
import WorkSection from '../sections/WorkSection'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'

/**
 * The entire portfolio in one continuous vertical scroll.
 * Sections bleed into each other — no hard page breaks.
 *
 * Cover → Work/Index (with inline project expand) → About → Contact
 */
export default function SinglePage() {
  return (
    <main>
      <CoverSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
