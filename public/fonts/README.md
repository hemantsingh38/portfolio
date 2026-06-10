# Fonts

Drop the **Rank** webfont files here. The `@font-face` rules in
`src/index.css` expect these exact filenames:

```
Rank-Thin.woff2        (weight 100)
Rank-Light.woff2       (weight 300)
Rank-Regular.woff2     (weight 400)
Rank-Book.woff2        (weight 450)
Rank-BookItalic.woff2  (weight 450, italic)
Rank-Medium.woff2      (weight 500)
Rank-Semibold.woff2    (weight 600)
Rank-Bold.woff2        (weight 700)
```

Until these files exist the site falls back to `Georgia, "Times New Roman", serif`.

> **Bookmania** (the display face) is loaded separately via Adobe Fonts /
> Typekit — see the commented `<link>` in `index.html`, not this folder.
