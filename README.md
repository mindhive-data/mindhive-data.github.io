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
| `logo.png` | Horizontal logo lockup, colour, transparent (nav). 454×132. |
| `logo-white.png` | Same lockup reversed to white, for the navy footer. |
| `favicon.png` | Logo mark on a navy rounded square. 256×256. |
| `clients/*.png` | The ten client logos in the carousel, transparent. |
| `.nojekyll` | Tells Pages to serve files as-is (no Jekyll build). |

## Logo assets

The logo is the **real Mindhive mark**, extracted from `Mindhive Company
Profile.pdf` (the source artwork is an embedded 451×343 raster with a white
background). It was un-composited off white to recover per-pixel alpha, then
the mark and wordmark were re-composed into a *horizontal* lockup — the PDF's
lockup is stacked, which doesn't fit a nav bar.

Because it's the client's real artwork, both blue gradient dots on the "i"s
are preserved. Display it at 30–44px tall; the source has enough resolution
for 3× displays at those sizes. **Don't put `logo.png` on a dark background** —
its wordmark is navy `#00293F` and disappears. Use `logo-white.png` there.

If the client later supplies vector originals (SVG/AI/EPS), swap these PNGs
out — the markup only needs the `src` and the 454:132 aspect ratio changed.

## Client carousel

The ten client logos in `clients/` also come from the source PDF (page 5),
trimmed to their artwork and scaled to fit a 260×104 box. They are **not**
grouped by service type — one continuous strip, per the client's instruction.

To swap in a better logo, drop a transparent PNG (or SVG) into `clients/`
and update the matching `<li class="ctile">` in `index.html`. Each logo
appears **twice** — once in the visible row and once in the duplicate row
marked `aria-hidden="true"` — and both copies must stay identical or the
loop will visibly jump. Update the `alt` on the first copy only; the
duplicate keeps `alt=""` so screen readers don't read the list twice.

How the loop works: two identical rows sit side by side and the track slides
by exactly one row width (`translateX(-50%)`), so the second copy lands
precisely where the first started. The strip pauses on hover, on keyboard
focus, and via the Pause button (WCAG 2.2.2). Under
`prefers-reduced-motion: reduce` it stops entirely and reflows into a static
wrapped grid showing every logo at once.

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

## Contact / WhatsApp

The phone row is a **WhatsApp deep link**, not a `tel:` link. There are two
`<a class="wabtn">` elements — one per language — so the pre-filled message
matches the page language without any JavaScript:

```
https://wa.me/601161252399?text=<url-encoded message>
```

The number is in **international format with the national leading 0 dropped**
(`+6011-6125 2399` → `601161252399`); wa.me rejects other formats. If the
number or the greeting changes, update **both** links. The `&` inside
"data & AI" must stay percent-encoded as `%26`, or WhatsApp will truncate
the message at that point.

The label sits in navy on WhatsApp green (7.6:1). White on that green is only
~1.7:1, so don't switch the label to white.

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
