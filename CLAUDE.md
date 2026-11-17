# Instructions for Claude working in this repository

This is the public website of **Simply Aerospace**, Malcolm Syme's educational aerospace channel: https://mcsyme11-byte.github.io/SimplyAerospace/, published by GitHub Pages from `main`. The work lives in the Claude project **Simply Aerospace**, whose brief loads into every chat. The project's decks, brand master files, documents and Project Record live in a separate **private archive repository** (named in the project brief). Never link to it from here.

**Every release:** follow [`docs/RELEASE-CHECKLIST.md`](docs/RELEASE-CHECKLIST.md) step by step. The **Site check** ([`.github/workflows/site-check.yml`](.github/workflows/site-check.yml), running [`tools/check_site.js`](tools/check_site.js)) runs on every push and pull request and must pass. Run it yourself before pushing: `node tools/check_site.js <previous index.html>`.

## Standing rules

- **This site is public.** No street address, school, age, PC names, file paths or callsigns. The only contact and credit is Malcolm Syme · mcsyme11@gmail.com.
- **Credit and trademark lines stay on everything:** the site footer, README, docs and icons carry "© Malcolm Syme · mcsyme11@gmail.com" and "Simply Aerospace™ and the Simply Aerospace mission patch are trademarks of Malcolm Syme." Never use ® unless a registration has been granted.
- When Malcolm asks a question ("why…", "what do you think?"), answer it only. Change nothing until he says go.
- **Mock-ups first:** big visual changes are shown as mock-ups or a preview branch, and published only after Malcolm's go.
- **Pitch, then wait:** new explainers are pitched first ("another 2"); nothing is built until Malcolm approves.
- **No mistakes:** every fact is checked against primary sources (NASA, NOAA, ESA and similar), and every explainer lists its sources. Never invent facts, figures or quotes.
- **Look:** follow [`docs/DESIGN.md`](docs/DESIGN.md). Logo usage follows its Logo table; the logo files come from the archive's patch builder, never edited by hand.
- **One file:** the site stays a single self-contained `index.html`, with its content in the data arrays near the top of the script (`VIDEOS`, `SOON`, `HORIZON`, `GLOSSARY`, `MISSIONS`). Adding an explainer means adding a data block, not new page code.
- **Versioning:** every release bumps `SITE_VERSION` and `BUILD_DATE` and adds a `## vX.Y.Z` section to `CHANGELOG.md`. A copy handed to Malcolm is named `simply-aerospace-VERSION`.
- **Privacy:** no cookies, analytics, trackers or accounts. The site keeps only the visitor's own progress in their browser (`sa_watched`, `sa_patches`, `sa_quiz_done`, `sa_level`). If that list changes, update the Legal page.
- **Performance:** animate only `transform` and `opacity`; no `backdrop-filter`, animated shadows or per-frame scroll handlers.
- **Check before calling a change done:** desktop and phone widths, every route touched, and no console errors.
- **After every release:** copy the site files into the private archive's `site/` folder and update its `CHANGELOG.md` and `docs/ROADMAP.md`, then push there. The archive's Project Record rebuilds itself and also checks this repo daily.
- **Hand-offs:** when another chat needs to know something, paste the full hand-off into the chat for Malcolm to copy, and also save it in the archive's `docs/handoffs/`.
- **Other chats own other repos** (for example the portfolio, `mcsyme11-byte.github.io`). Write a hand-off instead of changing them from here.
