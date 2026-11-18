# Design guide

How Simply Aerospace looks. It follows the shared "old money" look of Malcolm Syme's projects (the portfolio, Flight Deck Suite, Hot Mic, Syme Skyworks): navy, brass and cream, serif type, thin brass rules, kept modern. This guide matches website **v3.1.1**. The private archive keeps a copy; keep the two the same.

## Logo

The **Simply Aerospace mission patch** is the main logo (since Nov 17, 2026). Its gold is the shared brass, like every project's patch. The files are made by the archive's patch builder, never by hand.

| Where | Version |
|---|---|
| Home hero | Full patch, 160–220 px |
| Top bar | No-text patch, 36 px |
| Footer | No-text patch, 84 px (`icon-192.png`) |
| Favicon, browser tab | Tiny version (`favicon.svg`, `favicon.ico` 16/32/48) |
| Phone home screen | No-text on navy (`apple-touch-icon.png` 180 px, `icon-192/512.png`) |
| Share preview | Patch beside the wordmark (`og-image.png`, 1200 × 630) |
| Deck outro (from deck #25) | Full patch, about 300 px, above the title |
| Project Record cover | Full patch |

Use the full patch at about 180 px or more, the no-text version from about 33 to 180 px, and the tiny version at 32 px and under.

## Colour

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#141B26` | Page background |
| `--bg2` | `#0F1520` | Top bar, filter bars, inputs |
| `--card` | `#1A2333` | Cards, menus |
| `--deep` | `#0C1119` | Footer, patch fill |
| `--line` / `--line2` | brass at 16% / `#3A465C` | Rules / borders |
| `--gold` | `#C0A062` | Brass: accents, rules, eyebrows, primary buttons |
| `--gold-bright` | `#E2C88E` | Highlights, links, the current page |
| `--brass-dim` | `#7E6A45` | Quiet brass borders |
| `--text` | `#EDE6D3` | Cream: main text and headings |
| `--ink2` | `#B4AFA2` | Body text |
| `--dim` | `#98A0AB` | Labels, captions |
| Level badges | `#8fd19e` / `#6FB6E8` / `#E89A4C` | Junior / Flight / Senior |

## Type

- **Georgia only** (falling back to Palatino, then any serif). No web fonts.
- **Headings:** regular weight, large. The main title fades from cream to brass, and *emphasised* words are brass italic.
- **Labels ("eyebrows"):** 11–12.5 px, uppercase, wide letter spacing (0.18–0.3 em), in brass or grey.
- **Body:** 17 px, line height 1.65.

## Layout and parts

- Content width 1140 px.
- **Top bar:** sticky, 64 px. Brand on the left, then the direct links (Explainers · Myths · Mission Control · Glossary · More) and search. Below 880 px it turns into a full-width menu.
- **Cards:** 10 px corners and a 1 px border that turns brass on hover.
- **Buttons:** pill shaped. The primary button is a brass gradient with navy text; the secondary is outlined.
- **Chips and filters:** small outlined pills; the active one is brass.
- **Footer:**
  - the patch, a one-line description and the channel links;
  - three columns: Explore, Learn and About;
  - the Begley quote, centred;
  - a bottom row with the credit and trademark lines on the left (and a link to Legal), and a quiet version line on the right ("● Version · Updated · explainers", with no badge or glow).
  - Columns are left-aligned: four across on desktop, three link columns on tablets, two on phones.
- Works on phones (one column), tablets and desktops.

## Navigation

- Every page is at most two clicks away, through the top bar and the More menu.
- Search is on every page (press `/`), and also finds glossary terms.
- **All explainers** (`#/explainers`) filters by topic and level, and narrows down by any word.
- Explainer pages have a breadcrumb, previous/next links (and the `←` `→` keys), and related explainers.
- The current page is highlighted in the top bar. A brass reading-progress line runs along the bar's bottom edge, and the bar darkens slightly once the page is scrolled.
- A back-to-top button whose brass ring fills as you read, and a skip link.
- `Ctrl K` / `⌘K` opens search from anywhere.

## Signature touches (v3.1)

- **Myth ticker** on Home: the busted myths, crossed out, scroll past. Each links to its explainer; the ticker pauses on hover or focus.
- **Hero patch:** the orbit dot travels around the centre ring.
- **Card spotlight:** a soft brass light follows the mouse across cards.
- **Mission Control promo:** a slowly turning orbit around the mission count.
- All of them stop or switch off with "reduce motion".

## Motion and performance

- **Never put `overflow-x: hidden` on `html` or `body`.** It turns the body into its own scroll box, and the sticky top bar stops sticking (the v3.1.0 fix). Use `overflow-x: clip`.
- Animate only `transform` and `opacity`. Don't use `backdrop-filter`, animated shadows or per-frame scroll handlers (the one scroll handler runs in `requestAnimationFrame`).
- Sections fade up once as they come into view. All motion stops when the visitor turns on "reduce motion".

## Accessibility

- Everything can be reached with the keyboard, with a visible brass focus ring.
- There's a "Skip to content" link, and the menu buttons report whether they're open.
- Text keeps real contrast: cream and grey on navy.

## Credit line

Every page carries the credit line in the footer, and every document and deck carries it too:

> © Malcolm Syme · mcsyme11@gmail.com
> Simply Aerospace™ and the Simply Aerospace mission patch are trademarks of Malcolm Syme.

## Rules for every change

- **Big visual changes start as mock-ups or a preview branch** that Malcolm approves.
- **Check before calling it done:** desktop and phone widths, every page touched, and no console errors.

---
© Malcolm Syme · mcsyme11@gmail.com
