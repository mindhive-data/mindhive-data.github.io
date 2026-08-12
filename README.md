# mindhive-data.github.io

Landing page for **Mindhive** — *Pakar Data & Kecerdasan Buatan (AI)*.
Static site, no build step, served by GitHub Pages from the root of `main`.

**Live:** https://mindhive-data.github.io/

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page. Both languages live in the markup, tagged `data-lang="ms"` / `data-lang="en"`. |
| `styles.css` | Design tokens + all styling. No preprocessor. |
| `script.js` | Language switch, mobile nav, scroll reveal. Vanilla, ~150 lines. |
| `favicon.svg` | Hexagon mark. |
| `.nojekyll` | Tells Pages to serve files as-is (no Jekyll build). |
| `CLAUDE.md` | Build brief / content source of truth. |

## Editing content

Every translatable string appears twice, side by side:

```html
<h3>
  <span data-lang="ms">Latihan Data &amp; AI</span>
  <span data-lang="en">Data &amp; AI Training</span>
</h3>
```

**Edit both when you change copy.** Visibility is pure CSS driven off the
`<html lang>` attribute:

```css
:root:not([lang="en"]) [data-lang="en"] { display: none; }
:root[lang="en"] [data-lang="ms"] { display: none; }
```

Because the rule only ever *adds* `display: none`, elements keep their natural
layout and Bahasa Malaysia renders correctly even with JavaScript disabled.
`script.js` only flips the `lang` attribute and syncs `<title>` / meta tags.

Deep-link to English with `?lang=en` — e.g. https://mindhive-data.github.io/?lang=en

## Design tokens

Defined once at the top of `styles.css` under `:root`:

- Navy `#00293F` · Mid blue `#2D5F9C` · Off-white `#F7F9FC` · Slate `#35424E`
- Accent amber `#F5A623` — used sparingly (one hero word, primary CTA, one stat, one honeycomb cell)
- Category pill green `#17805B`
- Space Grotesk (display) + Inter (body), loaded from Google Fonts

The hexagon/honeycomb is the brand motif: the hero's 7-cell "flower", the
outline frames around every service icon, the tiling `<pattern id="comb">`
behind the hero and footer, and the bullet on each category pill.

## Local preview

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploying

Pushing to `main` republishes automatically (Settings → Pages → Source:
`main` / root). Give it 30–60 seconds.

## Custom domain (later)

1. Add a `CNAME` file at the repo root containing the bare domain, e.g. `mindhive.my`
2. DNS: four `A` records for the apex → `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`; plus `www` `CNAME` → `mindhive-data.github.io`
3. Settings → Pages → Custom domain, then tick **Enforce HTTPS** once the cert issues

## Not on this site, deliberately

Personnel names and leadership bios from the source company profile are
excluded per client instruction. Company-level content only.
