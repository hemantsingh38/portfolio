import { CSSProperties, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import CursorPreview from '../components/CursorPreview'
import LazyImage from '../components/LazyImage'
import { projects } from '../data/portfolio'
import { useHasHover } from '../hooks/useHasHover'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { AccentColor, Project } from '../types'

// ── Color zone map ──────────────────────────────────────────────────
const ZONE_BG: Record<AccentColor, string> = {
  blue:    '#1A4BE8',
  pink:    '#FF2D78',
  magenta: '#C8186C',
  green:   '#3DF03D',
  orange:  '#FF5A1F',
}

// For green zone we use dark text (green is very bright); all others use paper
const ZONE_TEXT: Record<AccentColor, string> = {
  blue:    '#F7F5F0',
  pink:    '#F7F5F0',
  magenta: '#F7F5F0',
  green:   '#141414',
  orange:  '#F7F5F0',
}

// ── Inline project expand ───────────────────────────────────────────
function ProjectExpand({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduced = usePrefersReducedMotion()
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.1 : 0.6, delay: reduced ? 0 : delay, ease },
  })

  const full = project.images.filter(i => i.layout === 'full')
  const offset = project.images.filter(i => i.layout === 'offset')

  return (
    <motion.div
      key={project.id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: reduced ? 0.1 : 0.65, ease }}
      style={{ overflow: 'hidden' }}
      aria-label={`Project detail: ${project.title}`}
    >
      <div className="pb-16 pt-10">
        {/* Credits bar */}
        <motion.div
          {...rise(0.05)}
          className="flex flex-wrap items-start gap-x-8 gap-y-4 border-b pb-6"
          style={{ borderColor: 'currentColor', opacity: 1 }}
        >
          {[
            { label: 'Role',     value: project.role },
            { label: 'Client',   value: project.client },
            { label: 'Year',     value: project.year },
            { label: 'Category', value: project.category },
            { label: 'Tools',    value: project.tools.join(' · ') },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="label mb-0.5 opacity-60">{label}</p>
              <p className="font-body text-sm leading-snug">{value}</p>
            </div>
          ))}

          <button
            onClick={onClose}
            className="label ml-auto self-start opacity-60 transition-opacity hover:opacity-100"
            aria-label="Close project"
          >
            Close ✕
          </button>
        </motion.div>

        {/* Pull-quote */}
        <motion.blockquote
          {...rise(0.1)}
          className="my-10 max-w-prose"
        >
          <p className="font-display text-3xl leading-snug tracking-[-0.01em] sm:text-4xl lg:text-5xl">
            &ldquo;{project.pullQuote}&rdquo;
          </p>
        </motion.blockquote>

        {/* Full-bleed lead image */}
        {full[0] && (
          <motion.div {...rise(0.14)} className="mb-8">
            <div className="border-[6px] border-current sm:border-8">
              <LazyImage
                src={full[0].src}
                alt={full[0].alt}
                className="aspect-[16/9] w-full"
                imgClassName="object-cover"
              />
            </div>
            {full[0].caption && (
              <p className="label mt-2 opacity-60">{full[0].caption}</p>
            )}
          </motion.div>
        )}

        {/* Body copy + offset image — asymmetric grid */}
        <motion.div
          {...rise(0.18)}
          className="grid grid-cols-12 gap-x-6 gap-y-8"
        >
          {/* Body text */}
          <div className="col-span-12 lg:col-span-7">
            {project.description.map((para, i) => (
              <p key={i} className="body-justify mb-5 font-body text-lg leading-relaxed">
                {para}
              </p>
            ))}
            <Link
              to={`/work/${project.id}`}
              className="label mt-4 inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
            >
              Full case study →
            </Link>
          </div>

          {/* Offset image (right column) */}
          {offset[0] && (
            <div className="col-span-12 self-start lg:col-span-4 lg:col-start-9">
              <div className="border-4 border-current">
                <LazyImage
                  src={offset[0].src}
                  alt={offset[0].alt}
                  className="aspect-[3/4] w-full"
                  imgClassName="object-cover"
                />
              </div>
              {offset[0].caption && (
                <p className="label mt-2 opacity-60">{offset[0].caption}</p>
              )}
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  )
}

// ── Main section ────────────────────────────────────────────────────
export default function WorkSection() {
  const hasHover = useHasHover()
  const reduced  = usePrefersReducedMotion()
  const useCursorPreview = hasHover && !reduced

  const [hoveredId,  setHoveredId]  = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10% 0px' })

  const hoveredProject  = projects.find(p => p.id === hoveredId) ?? null
  const expandedProject = projects.find(p => p.id === expandedId) ?? null

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

  const handleRowClick = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
    // Scroll the row into view after a brief delay so the expand animation
    // has room to start before we scroll
    setTimeout(() => {
      const el = document.getElementById(`project-row-${id}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }, [])

  // Dynamic zone background — transitions via CSS transition on the section
  const zoneBg   = expandedProject ? ZONE_BG[expandedProject.accentColor]   : '#F7F5F0'
  const zoneText = expandedProject ? ZONE_TEXT[expandedProject.accentColor]  : '#141414'

  const total = String(projects.length).padStart(2, '0')

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected Work"
      style={
        {
          backgroundColor: zoneBg,
          color: zoneText,
          transition: 'background-color 600ms cubic-bezier(0.22, 1, 0.36, 1), color 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        } as CSSProperties
      }
    >
      {useCursorPreview && (
        <CursorPreview
          src={hoveredProject ? hoveredProject.coverImage : null}
          alt={hoveredProject ? `${hoveredProject.title} preview` : ''}
          index={hoveredProject?.index}
          category={hoveredProject?.category}
          accent={hoveredProject ? ZONE_BG[hoveredProject.accentColor] : '#141414'}
        />
      )}

      <div className="spread py-16 sm:py-24">
        {/* Section header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="border-b pb-6"
          style={{ borderColor: expandedProject ? `${zoneText}33` : undefined }}
        >
          <div className="flex items-end justify-between">
            <span className="label" style={{ color: zoneText, opacity: 0.6 }}>
              Index of Work
            </span>
            <span className="label" style={{ color: zoneText, opacity: 0.6 }}>
              {total} entries
            </span>
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-1">
            <span aria-hidden className="folio" style={{ color: zoneText }}>02</span>
            <h2 className="display">Selected Work</h2>
          </div>
        </motion.header>

        {/* Column headings */}
        <div
          className="mt-6 hidden grid-cols-12 gap-x-6 sm:grid"
          style={{ opacity: 0.5 }}
        >
          <span className="label col-span-1">No.</span>
          <span className="label col-span-6">Project</span>
          <span className="label col-span-3">Category</span>
          <span className="label col-span-2 text-right">Year</span>
        </div>

        {/* Project rows */}
        <ul className="mt-2">
          {projects.map((p, i) => {
            const isExpanded = expandedId === p.id
            const delay = i * 0.06

            return (
              <li key={p.id} id={`project-row-${p.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-5% 0px' }}
                  transition={{ duration: 0.6, delay: reduced ? 0 : delay, ease }}
                >
                  {/* Row button */}
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(p.id)}
                    onBlur={() => setHoveredId(null)}
                    onClick={() => handleRowClick(p.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`expand-${p.id}`}
                    className="group w-full grid grid-cols-12 items-center gap-x-4 border-t py-5 text-left transition-opacity sm:gap-x-6 sm:py-6"
                    style={{
                      borderColor: `${zoneText}20`,
                      opacity: expandedId && !isExpanded ? 0.45 : 1,
                    }}
                  >
                    {/* Index */}
                    <span
                      className="col-span-2 self-center font-display text-2xl leading-none sm:col-span-1 sm:text-[2rem]"
                      style={{ opacity: 0.5 }}
                    >
                      {p.index}
                    </span>

                    {/* Title + inline thumb on touch */}
                    <span className="col-span-10 sm:col-span-6">
                      <span className="flex items-center gap-4">
                        {!useCursorPreview && (
                          <LazyImage
                            src={p.coverImage}
                            alt=""
                            className="h-12 w-10 shrink-0"
                            imgClassName="object-cover"
                          />
                        )}
                        <span className="font-display text-2xl leading-tight sm:text-3xl lg:text-4xl">
                          {p.title}
                        </span>
                      </span>
                      <span
                        className="label mt-2 block sm:hidden"
                        style={{ opacity: 0.6 }}
                      >
                        {p.category} · {p.year}
                      </span>
                    </span>

                    {/* Category (desktop) */}
                    <span
                      className="label col-span-3 hidden self-center sm:block"
                      style={{ opacity: 0.6 }}
                    >
                      {p.category}
                    </span>

                    {/* Year + expand indicator (desktop) */}
                    <span className="index-num col-span-2 hidden text-right sm:flex sm:items-center sm:justify-end sm:gap-3">
                      <span style={{ opacity: 0.6 }}>{p.year}</span>
                      <span
                        className="label transition-transform duration-300"
                        style={{
                          transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                          opacity: 0.5,
                        }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </span>
                  </button>

                  {/* Inline expand panel */}
                  <div id={`expand-${p.id}`} role="region" aria-label={`${p.title} details`}>
                    <AnimatePresence>
                      {isExpanded && (
                        <ProjectExpand
                          project={p}
                          onClose={() => setExpandedId(null)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </li>
            )
          })}
          <li className="border-t" style={{ borderColor: `${zoneText}20` }} aria-hidden="true" />
        </ul>

        {/* Footnote */}
        <p className="label mt-8 flex items-center gap-2" style={{ opacity: 0.5 }}>
          <span className="inline-block h-1.5 w-1.5 bg-current" aria-hidden="true" />
          {useCursorPreview
            ? 'Hover a row to preview · click to open the spread'
            : 'Tap a row to expand the project'}
        </p>
      </div>
    </section>
  )
}
