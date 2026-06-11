export type View = 'work' | 'about' | 'connect' | 'playground'

const ITEMS: { id: View; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'connect', label: 'Connect' },
  { id: 'playground', label: 'Playground' },
]

/**
 * A floating page-switcher pill, fixed bottom-centre — the only chrome on the
 * single-page app. Switches the active "page" (Work gallery / About / Connect /
 * Playground) without a route change, echoing the floating index/info chips on
 * the reference portfolio sites.
 */
export default function FloatingNav({
  view,
  onChange,
}: {
  view: View
  onChange: (v: View) => void
}) {
  return (
    <nav
      aria-label="Pages"
      className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 rounded-full border border-ink-15 bg-paper/85 p-1 shadow-[0_12px_44px_-14px_rgba(20,20,20,0.5)] backdrop-blur-md">
        {ITEMS.map((it) => {
          const active = view === it.id
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              aria-current={active ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 font-tight text-[12px] font-medium uppercase tracking-[0.08em] transition-colors sm:px-4 ${
                active ? 'bg-ink text-paper' : 'text-ink-60 hover:text-ink'
              }`}
            >
              {it.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
