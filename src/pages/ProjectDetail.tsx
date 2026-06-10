import { Link, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import LazyImage from '../components/LazyImage'
import NotFound from './NotFound'
import { projects } from '../data/portfolio'
import type { ProjectImage } from '../types'

/**
 * Editorial case-study spread:
 *  • large hero image
 *  • micro-type credits sidebar (Role / Year / Client / Tools)
 *  • body copy in Rank
 *  • a pull-quote moment
 *  • a sequence of images in varied full-bleed / offset / grid layouts
 */
export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  const idx = projects.findIndex((p) => p.id === id)

  if (!project) return <NotFound />

  // next project for the "continue reading" footer
  const next = projects[(idx + 1) % projects.length]

  // group images by layout for placement
  const hero = project.images[0]
  const rest = project.images.slice(1)
  const gridImages = rest.filter((i) => i.layout === 'grid')
  const flowImages = rest.filter((i) => i.layout !== 'grid')

  return (
    <PageTransition>
      <article className="spread pt-10 sm:pt-16">
        {/* Eyebrow / breadcrumb */}
        <div className="flex items-center justify-between border-b border-ink-15 pb-4">
          <Link to="/#work" className="label transition-colors hover:text-blue">
            ← Index
          </Link>
          <span className="index-num text-ink-40">
            {project.index} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Title block */}
        <header className="grid grid-cols-12 gap-x-6 pt-10 sm:pt-14">
          <div className="col-span-12 lg:col-span-9">
            <p className="label mb-4">{project.category}</p>
            <h1 className="display text-ink">{project.title}</h1>
            <p className="mt-6 max-w-prose font-body text-lg leading-snug text-ink-60">
              {project.summary}
            </p>
          </div>
        </header>

        {/* Hero image */}
        {hero && (
          <figure className="mt-10">
            <LazyImage
              src={hero.src}
              alt={hero.alt}
              className="aspect-[16/9] w-full"
              imgClassName="object-cover"
            />
            {hero.caption && (
              <figcaption className="label mt-3">{hero.caption}</figcaption>
            )}
          </figure>
        )}

        {/* Body + credits sidebar */}
        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10">
          {/* Credits — set like print colophon metadata */}
          <aside className="col-span-12 lg:col-span-3">
            <dl className="space-y-5">
              <Credit label="Role" value={project.role} />
              <Credit label="Client" value={project.client} />
              <Credit label="Year" value={project.year} />
              <div>
                <dt className="label mb-1">Tools</dt>
                <dd>
                  <ul className="space-y-0.5">
                    {project.tools.map((t) => (
                      <li key={t} className="font-body text-sm">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          {/* Running text */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <div className="max-w-prose space-y-5">
              {project.description.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-lg leading-relaxed text-ink first:first-letter:float-left first:first-letter:mr-2 first:first-letter:font-display first:first-letter:text-6xl first:first-letter:leading-[0.8]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Pull-quote moment */}
        <blockquote className="my-20 border-y border-ink-15 py-12 sm:my-28 sm:py-16">
          <p className="font-display text-3xl leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
            <span className="text-blue">“</span>
            {project.pullQuote}
            <span className="text-blue">”</span>
          </p>
        </blockquote>

        {/* Flow images: full-bleed and offset, alternating */}
        <div className="space-y-16">
          {flowImages.map((img, i) => (
            <FlowImage key={i} img={img} flip={i % 2 === 1} />
          ))}
        </div>

        {/* Contact-sheet grid of remaining images */}
        {gridImages.length > 0 && (
          <section className="mt-16">
            <p className="label mb-4 border-t border-ink-15 pt-4">
              Plates · {String(gridImages.length).padStart(2, '0')}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {gridImages.map((img, i) => (
                <figure key={i}>
                  <LazyImage
                    src={img.src}
                    alt={img.alt}
                    className="aspect-[4/3] w-full"
                    imgClassName="object-cover"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Next project */}
        <nav className="mt-24 border-t border-ink-15 pt-6">
          <div className="flex items-end justify-between">
            <span className="label">Next in the index</span>
            <span className="index-num text-ink-40">{next.index}</span>
          </div>
          <Link to={`/work/${next.id}`} className="group mt-3 inline-block">
            <span className="font-display text-4xl leading-none transition-colors group-hover:text-blue sm:text-6xl">
              {next.title} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </nav>
      </article>
    </PageTransition>
  )
}

function Credit({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label mb-1">{label}</dt>
      <dd className="font-body text-sm leading-snug">{value}</dd>
    </div>
  )
}

/** A single full-bleed or offset image in the body flow. */
function FlowImage({ img, flip }: { img: ProjectImage; flip: boolean }) {
  if (img.layout === 'offset') {
    return (
      <figure className="grid grid-cols-12 gap-x-6">
        <div
          className={
            flip
              ? 'col-span-10 sm:col-span-7'
              : 'col-span-10 col-start-3 sm:col-span-7 sm:col-start-6'
          }
        >
          <LazyImage
            src={img.src}
            alt={img.alt}
            className="aspect-[4/5] w-full"
            imgClassName="object-cover"
          />
          {img.caption && (
            <figcaption className="label mt-3">{img.caption}</figcaption>
          )}
        </div>
      </figure>
    )
  }

  // 'full' (default)
  return (
    <figure>
      <LazyImage
        src={img.src}
        alt={img.alt}
        className="aspect-[16/10] w-full"
        imgClassName="object-cover"
      />
      {img.caption && (
        <figcaption className="label mt-3">{img.caption}</figcaption>
      )}
    </figure>
  )
}
