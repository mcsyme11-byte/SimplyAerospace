# Design guide

How Simply Aerospace looks: the website, the decks and the documents. Logo files and their size rules are in [`brand/BRAND.md`](../brand/BRAND.md). The website repo keeps a copy of this guide; keep the two the same.

## Logo

The **Simply Aerospace mission patch** is the main logo (since Nov 17, 2026).

| Where | Version |
|---|---|
| Website home hero | Full patch, about 176 px |
| Website top bar | No-text patch, 38–48 px |
| Favicon, browser tab | Tiny version (`favicon.svg`, `favicon.ico` 16/32/48) |
| Phone home screen | No-text on navy (`apple-touch-icon.png` 180 px, `icon-192/512.png`) |
| Share preview | Patch beside the wordmark on navy (`og-image.png`, 1200 × 630) |
| Deck outro (from deck #25) | Full patch, about 300 px, above the title |
| Project Record cover | Full patch PNG |
| Instagram profile picture | No-text on navy, 1080 px |

## Colour (website v2.8.0)

| Role | Hex |
|---|---|
| Backgrounds, navy to black | `#0b1420` / `#070c14` / `#000103` |
| Gold | `#C8A96E` (bright `#E4C88A` / `#FFD27A`) |
| Aviation blue, Flight badge | `#6FB6E8` |
| Propulsion amber, Senior badge | `#E89A4C` |
| Junior badge green | `#8fd19e` |

## Type

- **Website (v2.8.0):** Fraunces for headings, Newsreader for body text, Space Mono for labels.
- **Decks:** Georgia, cinematic "Interstellar" tone.

## Redesign in preview (Nov 2026)

A new look in the shared "old money" design of Malcolm's other projects (the portfolio, Flight Deck Suite, Hot Mic, Syme Skyworks) is in preview on the website repo's `redesign` branch:

- navy, brass and cream;
- Georgia only, with no web fonts;
- thin brass rules and pill buttons;
- faster navigation.

When Malcolm approves it, this guide is rewritten to match.

## Rules for every change

- **Big visual changes start as mock-ups or a preview** that Malcolm approves.
- **Performance:** animate only `transform` and `opacity`. Don't use `backdrop-filter`, animated shadows or per-frame scroll handlers.
- **Accessibility:** keyboard reachable, visible focus, real text contrast, and all motion off when the visitor turns on "reduce motion".
- **Check before calling it done:** desktop and phone widths, and no console errors.
- **Credit line** in the footer of every page, and on every document and deck: "© Malcolm Syme · mcsyme11@gmail.com · Simply Aerospace™".

---
© Malcolm Syme · mcsyme11@gmail.com
