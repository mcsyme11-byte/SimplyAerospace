<p align="center"><img src="../brand/simply-aerospace-patch-512.png" width="110" alt="Simply Aerospace mission patch"></p>

# Release checklist

Follow it for every change to the live site, in order. The automatic **Site check** enforces the starred (★) steps; the rest are on you.

## Before you start

1. **Approved?** New explainers were pitched and approved, and visual changes were shown as mock-ups or a preview and approved. If not, stop and ask.
2. **Up to date:** pull `main` first.

## Make the change

3. **Content:** edit the data arrays, not the page code, when adding explainers, glossary terms or missions. Every explainer needs:
   - `id`, `code`, `topic`, `level`, `title`, `teaser`, `standfirst`, `myth`, `truth`;
   - 3 sections and the "go deeper" list;
   - sources with `https` links and its reel link.
4. **Facts:** check every new fact against a primary source, and open every new source link to make sure it works.
5. ★ **Version:** bump `SITE_VERSION`, using MINOR for new content or features and PATCH for fixes, and set `BUILD_DATE` to today.
6. ★ **Change log:** add a `## vX.Y.Z — YYYY.MM.DD` section to `CHANGELOG.md`.
7. **Legal page:** if what the site stores or links to changed, update the Legal page.

## Check

8. ★ **Site check passes:** `node tools/check_site.js <previous index.html>`. It checks:
   - the version and change log;
   - the credit line;
   - that the script compiles;
   - that every file and icon exists;
   - the explainer, glossary and mission data;
   - that no personal details are on the site.
9. **Look at it:** at desktop (about 1280 px) and phone (about 390 px) widths, open Home, an explainer, the Glossary, Mission Control, the Legal page and every page you touched. Check that there are no console errors.

## Publish

10. **Commit and push to `main`** with a short plain-English message ("Release v2.9.0 — …"). GitHub Pages publishes in a minute or two.
11. **Site check on GitHub:** make sure the run for your push is green.
12. **Live check:** open the live site and confirm the footer shows the new version.

## Record it

13. **Archive:** copy the changed site files into the private archive's `site/`, then update its `CHANGELOG.md`, `docs/ROADMAP.md` (remove what shipped) and, for big changes, `docs/HISTORY.md`. Push.
14. **Project Record:** confirm the archive's "Project Record rebuilt (automatic)" commit arrives.
15. **Hand-offs:** if the portfolio or another project should know, paste the hand-off into the chat and save it in the archive's `docs/handoffs/`.
16. **Tell Malcolm** what shipped, in a line or two.

---
© 2026 Malcolm Syme · mcsyme11@gmail.com · Simply Aerospace™ and the Simply Aerospace mission patch are trademarks of Malcolm Syme.
