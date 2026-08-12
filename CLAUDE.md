# Mindhive — Landing Page Build Brief

This file is the build spec for a GitHub Pages landing page for **Mindhive**
("Pakar Data & Kecerdasan Buatan (AI)"), a Malaysian data & AI consultancy
and training company. Source material: `Mindhive_Company_Profile.pdf`
(Canva-exported company profile, 9 pages, Bahasa Malaysia). Personnel/team
bios from the source PDF are intentionally excluded from the site per the
client's instruction.

**The site is dual-language: Bahasa Malaysia and English.** Default to
Bahasa Malaysia (the source material's language and the primary market),
with an English toggle. See §3 for the full parallel copy in both
languages and §6 for how the toggle should work technically.

## 1. Hosting & repo setup

- Target: GitHub Pages, served from an **organization repo**.
- Two valid patterns — pick one when you get to it:
  1. **Org site**: repo named exactly `<org-name>.github.io`, published from
     the root of the `main` branch. This becomes the org's primary GitHub
     Pages site at `https://<org-name>.github.io/`.
  2. **Project site**: any other repo name, published from `main` `/docs`
     folder or a `gh-pages` branch, served at
     `https://<org-name>.github.io/<repo-name>/`.
- Plan is to use GitHub Pages first, then move to a custom domain later
  (add a `CNAME` file + update DNS when that happens — not needed yet).
- No framework/build step required — this is a static site. Plain
  HTML/CSS(+light JS) is enough; keep it a single `index.html` (or
  `index.html` + `styles.css` + `script.js`) so it deploys with zero config.
- Steps for Claude Code to actually do the GitHub side (confirm the org/repo
  name with the user first — not yet decided):
  1. `gh repo create <org>/<repo-name> --public` (or use existing repo)
  2. Commit the site files to `main`
  3. In repo Settings → Pages, set source to `main` branch (root, or `/docs`
     depending on pattern chosen)
  4. Verify the published URL

## 2. Brand assets (extracted from source PDF)

**Logo**: hexagon/honeycomb outline mark + wordmark "mindhive" (lowercase,
navy, with a small blue dot over the "i"). The hexagon is the one
distinctive, brand-native visual motif — "hive" = honeycomb — and should be
used as a structural device throughout (icon frames, badge shapes, subtle
background pattern), not just in the logo.

**Colors** (sampled directly from the PDF):
- Navy (primary/dark): `#00293F`
- Mid blue (headings/accent): `#2D5F9C`
- Off-white background: `#F7F9FC`
- Slate (body text): `#35424E`
- Suggested single accent risk: warm amber/honey `#F5A623`, used sparingly
  (hover states, one highlight stat, honeycomb accent) — ties back to the
  "hive" name without breaking from the source navy/blue palette.

**Type direction**: source deck uses League Spartan Bold / Archivo Black
for display headings and Poppins for body — bold, geometric, rounded-
terminal sans. For the web, use a free equivalent pairing, e.g. **Sora** or
**Space Grotesk** for headings (geometric, confident, hexagon-friendly
letterforms) + **Inter** for body copy. Uppercase, letter-spaced Inter for
small eyebrow labels/section tags.

**UI motifs from the source deck to carry over**:
- Pill-shaped category tags with a colored outline (e.g. green outline for
  "Data warehousing", navy for "Generative AI", blue for "Data/AI training")
- Circular numbered badges (1, 2, 3) paired with a dark circular icon badge
  for each service
- Large soft-cornered image panels; a full-bleed dark navy panel behind a
  circular-cropped image on the hero
- Big stat callouts: "100% 'RECOMMENDED' OLEH PESERTA" and "RATING 5
  BINTANG DARIPADA 90% PESERTA"

No photos of the actual PDF are included in the repo — recreate icon
badges as simple SVG (hexagon/circle + line icon), not photographs.

## 3. Site content — dual language (BM default / EN toggle)

Every section below is given in Bahasa Malaysia first, English underneath.
Keep both versions equal in length/weight — this is a professional B2B
site, so the English isn't a lesser afterthought, it's a full parallel
copy deck. Company/product names (Mindhive, Tanyalah Ustaz, matrixC
Academy) and the client logos stay unchanged in both languages.

### Nav
**BM**: Perkhidmatan · Mengapa Kami · Hubungi Kami
**EN**: Services · Why Us · Contact Us

### Hero
**BM**
- Eyebrow: PAKAR DATA & KECERDASAN BUATAN (AI)
- Headline (write fresh, don't lift verbatim from PDF mission para) —
  land the idea that Mindhive helps businesses adopt data & AI safely and
  practically. Reference tone from source: "rakan strategik dalam
  transformasi digital — teknologi data & AI yang praktikal dan
  benar-benar manusiawi."
- CTA button: "Hubungi Kami" → mailto or #contact anchor

**EN**
- Eyebrow: DATA & ARTIFICIAL INTELLIGENCE (AI) SPECIALISTS
- Headline: same idea in English — Mindhive as a strategic partner in
  digital transformation, bringing practical, genuinely human data & AI
  technology to businesses. Write fresh, don't machine-translate the BM
  line word-for-word.
- CTA button: "Contact Us" → mailto or #contact anchor

### Mengapa Pilih Kami / Why Choose Us (3 cards)
1. **BM**: Penyelesaian Data & AI Menyeluruh — Kami bina solusi yang tepat
   untuk membantu perniagaan anda — dari integrasi data ke AI generatif.
   **EN**: End-to-End Data & AI Solutions — We build the right solution for
   your business — from data integration to generative AI.
2. **BM**: Pakar Berpengalaman, Hasil Terbukti — Pasukan profesional yang
   bertauliah dengan rekod kejayaan dalam pelbagai industri.
   **EN**: Experienced Experts, Proven Results — A certified professional
   team with a track record of success across industries.
3. **BM**: Rakan Strategik, Bukan Sekadar Vendor — Kami komited bantu anda
   menempuh perjalanan data & AI dari awal sehingga akhir.
   **EN**: A Strategic Partner, Not Just a Vendor — We're committed to
   supporting your data & AI journey from start to finish.

### Perkhidmatan Kami / Our Services (3 services)
1. **BM**: Generative AI Deployment — Kami membuat penerapan sistem
   kecerdasan AI yang komprehensif dari sistem infrastruktur sehingga ke
   antaramuka pengguna (user interface), supaya klien dapat memanfaatkan
   cara kerja yang terkehadapan.
   **EN**: Generative AI Deployment — We deploy comprehensive AI systems,
   from backend infrastructure through to the user interface, so clients
   can put next-generation ways of working to use.
2. **BM**: Data Warehousing / Gudang Data — Kami menawarkan perkhidmatan
   end-to-end data warehousing supaya klien dapat memanfaatkan Big Data
   Analytics secara bijak dan berautomasi tinggi.
   **EN**: Data Warehousing — We offer end-to-end data warehousing so
   clients can put Big Data Analytics to work, intelligently and with high
   automation.
3. **BM**: Latihan Data & AI — Jurulatih pakar kami yang bertauliah
   menerapkan pelbagai skil yang penting dalam bidang data & AI, dari
   paling asas sehingga kompetensi tahap tinggi.
   **EN**: Data & AI Training — Our certified expert trainers build the
   essential skills in data & AI, from the fundamentals through to
   advanced competency.
   - Stat callouts (numerals stay the same, label translates):
     **BM**: 100% "Disyorkan" oleh peserta · Rating 5 bintang daripada 90%
     peserta
     **EN**: 100% "Recommended" by participants · 5-star rating from 90%
     of participants

### Tim Kami Berpengalaman Dalam Sistem Data & AI / Our Track Record in Data & AI Systems

> **SUPERSEDED (client decision, Aug 2026).** The category split below is no
> longer used on the site. All clients now appear in a **single auto-scrolling
> carousel** with no category labels, using the real client logos extracted
> from page 5 of the source PDF (see `clients/` and README). Keep the category
> list here only as a record of which engagement was which.

Group under three pill categories (category label translates, logos don't):
- **BM**: Data warehousing / **EN**: Data warehousing — IMAN Publication,
  MHTC (Malaysia Healthcare Travel Council), Toyota, Alamflora, Daito
- **BM**: Generative AI / **EN**: Generative AI — Tanyalah Ustaz, BE
- **BM**: Latihan Data/AI / **EN**: Data/AI training — Proton, MPJ (Majlis
  Perbandaran Jasin), matrixC Academy

Render these as text/wordmark badges in hexagon or rounded tiles (no logo
image files were provided/extracted for reuse — use plain text badges or
source official logos separately if the client provides them later).

### Footer / Hubungi Kami — Contact Us
**BM**: Terima kasih
**EN**: Thank you
- Email: mindhive.data@gmail.com
- Phone: +6011-6125 2399
- (No physical address or personnel names — excluded per client instruction)

## 4. Content explicitly excluded

- Founder/CEO bio (Ikmal Nordin) and full leadership team section
  (CEO/CTO/COO bios) from PDF pages 2–3 — **do not include personnel names
  or bios** on the site, per client instruction. Company-level content only.

## 5. Language toggle — implementation

Simplest approach for a static, no-build-step site: keep both languages in
the same `index.html`, tagged with `data-lang="ms"` / `data-lang="en"` on
each translatable element (or on wrapper elements per section), default
`ms` visible, and a small vanilla-JS toggle in `script.js` that:
- Reads a `?lang=en` query param or a toggle click.
- Shows/hides elements by `data-lang` attribute (or swaps `textContent`
  from a small `translations` JS object — either pattern is fine, pick
  whichever keeps the HTML more readable).
- Persists the choice in-memory for the session (no localStorage needed for
  a simple marketing page; fine to add later if desired).
- Sets `<html lang="ms">` / `<html lang="en">` accordingly for
  accessibility/SEO.
- Nav toggle control: simple "BM / EN" text switch or flag-free pill toggle
  in the top-right of the nav bar — keep it small, not a hero element.

Don't reach for a JS framework or an i18n library for this — it's a single
static page with two language variants of a modest amount of copy.

## 6. Design process reminder for build time

Before writing code: run through the studio design-brief process — lock a
compact token system (the colors/type above are a starting point, not
gospel), sketch the layout in ASCII/prose, pick the one signature moment
(recommend: the hexagon/honeycomb motif carried through icon frames, the
logo badge grid, and a subtle background pattern), then build. Keep it
responsive down to mobile, respect reduced-motion, and keep the whole thing
to a single static HTML/CSS(+minimal JS) page — no build tooling needed for
a GitHub Pages static deploy.
