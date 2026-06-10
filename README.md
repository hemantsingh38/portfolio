# Bluetigercub

A personal editorial design portfolio — *a printed art magazine translated to
the web*. Cream paper, Bookmania headlines, Rank body copy, obsessive
micro-typography, and an electric blue used as rare punctuation.

Built with **Vite + React + TypeScript**, **Tailwind CSS**, **Framer Motion**,
and **React Router**.

---

## Quick start

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

The site runs out of the box with placeholder content and images — no fonts or
API keys required (it falls back to system serifs until you add the real
typefaces).

---

## Where to customise

### 1. Content — `src/data/portfolio.ts`

**This is the only file you need to edit for content.** It holds:

- `siteConfig` — name, tagline, issue number, email, socials
- `projects[]` — ~6 dummy projects (title, category, year, client, role,
  tools, summary, description paragraphs, pull-quote, cover + images)
- `about` — bio paragraphs, portrait, and colophon credits

Each project image takes an optional `layout` hint:

| hint     | result                                            |
| -------- | ------------------------------------------------- |
| `full`   | full-bleed image                                  |
| `offset` | smaller image that breaks/offsets the grid        |
| `grid`   | placed in the contact-sheet / index grid at the end |

Placeholder images use `picsum.photos`. Replace those URLs with paths to your
own files — e.g. put images in `public/work/` and reference `/work/cover.jpg`.

### 2. Display font — Bookmania (Adobe Fonts / Typekit)

1. Create a **Web Project** in [Adobe Fonts](https://fonts.adobe.com) that
   includes *Bookmania*.
2. Open `index.html` and find the comment:
   ```html
   <!-- TODO: add Typekit kit ID -->
   ```
3. Replace `XXXXXXX` with your kit ID and uncomment the `<link>`.

Until then, headings fall back to `Georgia, "Times New Roman", serif`.

### 3. Body font — Rank (self-hosted)

1. Add the Rank `.woff2` files to `public/fonts/` using the exact filenames
   listed in [`public/fonts/README.md`](public/fonts/README.md).
2. The `@font-face` rules are already wired up in `src/index.css`
   (look for `// TODO: add Rank font files`).

Until then, body copy falls back to `Georgia, "Times New Roman", serif`.

### 4. Theme tokens — `tailwind.config.js`

The palette and type tokens live under `theme.extend`:

```js
paper: '#F7F5F0'  // cream background
ink:   '#141414'  // near-black text
blue:  '#1A4BE8'  // accent — used sparingly
```

Font families (`font-display`, `font-body`), the micro-type sizes, and the
fluid `.display` / `.display-xl` heading utilities are defined here and in
`src/index.css`.

---

## Structure

```
src/
  data/portfolio.ts     ← edit your content here
  types.ts              ← content types
  App.tsx               ← routes + page transitions
  index.css             ← fonts, tokens, editorial utility classes
  components/
    Header.tsx          ← sticky micro-type nav (active item = blue)
    Footer.tsx          ← print-colophon footer
    PageTransition.tsx  ← restrained fade/slide between routes
    CursorPreview.tsx   ← cursor-following image (rAF + lerp)
    LazyImage.tsx       ← lazy load + fade-in
    ScrollToTop.tsx
  pages/
    Home.tsx            ← magazine cover
    Work.tsx            ← table-of-contents index (centerpiece)
    ProjectDetail.tsx   ← case-study spread
    About.tsx           ← editorial article + colophon
    Contact.tsx         ← large typographic contact
    NotFound.tsx
  hooks/
    usePrefersReducedMotion.ts
    useHasHover.ts
```

---

## Notes on the interactions

- **Cursor-follow preview** (Index page): the preview image is moved via a
  `requestAnimationFrame` loop that lerps toward the cursor — pointer position
  is held in refs, never in per-mousemove React state. It is disabled under
  `prefers-reduced-motion` and on touch devices, which fall back to small
  inline row thumbnails.
- **Page transitions** are short fades with a few pixels of drift, collapsing
  to a near-instant cross-fade under `prefers-reduced-motion`.
- **Images** lazy-load natively and fade in once decoded.
- Accessibility: semantic HTML, skip-to-content link, visible focus states,
  keyboard-navigable index (rows respond to focus the same as hover), and alt
  text driven from the data file.
