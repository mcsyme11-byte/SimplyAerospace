// Simply Aerospace · Site check · © 2026 Malcolm Syme · mcsyme11@gmail.com
//
// The publishing checks every release must pass (docs/RELEASE-CHECKLIST.md). Runs automatically on GitHub
// (.github/workflows/site-check.yml) on every push and pull request, and by hand before publishing:
//   node tools/check_site.js [previous index.html]
// Exits with an error if anything would break the live site or leave a release half-done. No packages needed.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const PREV = process.argv[2];
const CREDIT = '© Malcolm Syme · mcsyme11@gmail.com';
const errors = [], warnings = [], passed = [];
const fail = m => errors.push(m), warn = m => warnings.push(m), ok = m => passed.push(m);
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const exists = f => fs.existsSync(path.join(ROOT, f));

const html = read('index.html');

// 1 · version and build date, bumped on every change to the site
const ver = (html.match(/SITE_VERSION\s*=\s*"([^"]+)"/) || [])[1];
const build = (html.match(/BUILD_DATE\s*=\s*"([^"]+)"/) || [])[1];
if (!/^\d+\.\d+\.\d+$/.test(ver || '')) fail(`SITE_VERSION is missing or not MAJOR.MINOR.PATCH (found "${ver}")`);
else ok(`version ${ver}`);
if (!/^\d{4}\.\d{2}\.\d{2}$/.test(build || '')) fail(`BUILD_DATE is missing or not YYYY.MM.DD (found "${build}")`);
else ok(`build date ${build}`);
if (PREV && fs.existsSync(PREV)) {
  const old = fs.readFileSync(PREV, 'utf8');
  const oldVer = (old.match(/SITE_VERSION\s*=\s*"([^"]+)"/) || [])[1];
  const oldBuild = (old.match(/BUILD_DATE\s*=\s*"([^"]+)"/) || [])[1];
  if (old !== html) {
    const cmp = (a, b) => { const x = a.split('.').map(Number), y = b.split('.').map(Number); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; };
    if (oldVer && ver && cmp(ver, oldVer) <= 0) fail(`index.html changed but SITE_VERSION wasn't bumped (still ${ver}; was ${oldVer})`);
    else if (oldVer) ok(`version bumped ${oldVer} → ${ver}`);
    if (oldBuild && build && build <= oldBuild) warn(`BUILD_DATE not moved forward (${oldBuild} → ${build})`);
  }
}

// 2 · the change log names this version
if (!exists('CHANGELOG.md')) fail('CHANGELOG.md is missing');
else if (ver && !read('CHANGELOG.md').includes(`## v${ver}`)) fail(`CHANGELOG.md has no "## v${ver}" section`);
else ok('change log entry');

// 3 · credit line
if (!html.includes(CREDIT) && !html.includes(CREDIT.replace('©', '&copy;'))) fail(`the credit line "${CREDIT}" isn't on the site`);
else ok('credit line');

// 4 · the script compiles
const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).filter(s => s.trim());
scripts.forEach((s, i) => { try { new vm.Script(s, { filename: `index.html <script ${i + 1}>` }); } catch (e) { fail(`script ${i + 1} doesn't compile: ${e.message}`); } });
if (scripts.length) ok(`${scripts.length} script block(s) compile`);

// 5 · every local file the page uses exists, and the icon set is complete
const refs = [...html.matchAll(/(?:href|src|content)="([^"#?:]+\.(?:png|jpg|jpeg|svg|ico|webmanifest|css|js|json|webp))(?:\?[^"]*)?"/gi)].map(m => m[1]);
const missing = [...new Set(refs)].filter(r => !/^\/\//.test(r) && !exists(r.replace(/^\.?\//, '')));
if (missing.length) fail('files the page links to are missing: ' + missing.join(', '));
for (const f of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'og-image.png', 'site.webmanifest']) if (!exists(f)) fail(`${f} is missing`);
try { const m = JSON.parse(read('site.webmanifest')); (m.icons || []).forEach(i => { if (!exists(i.src)) fail(`site.webmanifest names a missing icon: ${i.src}`); }); ok('icons and manifest'); }
catch (e) { fail('site.webmanifest is not valid JSON: ' + e.message); }

// 6 · the content data is complete
function grab(name) {
  const i = html.search(new RegExp('const ' + name + '\\s*=\\s*\\['));
  if (i < 0) return null;
  let j = html.indexOf('[', i), d = 0, k = j, str = null, esc = false;
  for (; k < html.length; k++) {
    const c = html[k];
    if (str) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '/' && html[k + 1] === '/') { k = html.indexOf('\n', k); continue; }
    if (c === '[' || c === '{') d++; else if (c === ']' || c === '}') { d--; if (d === 0) break; }
  }
  try { return vm.runInNewContext('(' + html.slice(j, k + 1) + ')', {}); } catch (e) { fail(`${name} can't be read: ${e.message}`); return null; }
}
const V = grab('VIDEOS') || [];
const LEVELS = ['Junior Engineer', 'Flight Engineer', 'Senior Engineer'], TOPICS = ['aviation', 'space', 'propulsion'];
const ids = new Set(), codes = new Set();
V.forEach((v, n) => {
  const who = v.id || `VIDEOS[${n}]`;
  for (const k of ['id', 'topic', 'code', 'title', 'teaser', 'level', 'standfirst', 'myth', 'truth']) if (!v[k]) fail(`${who}: "${k}" is empty`);
  if (ids.has(v.id)) fail(`${who}: duplicate id`); ids.add(v.id);
  if (codes.has(v.code)) fail(`${who}: duplicate code ${v.code}`); codes.add(v.code);
  if (!LEVELS.includes(v.level)) fail(`${who}: unknown level "${v.level}"`);
  if (!TOPICS.includes(v.topic)) fail(`${who}: unknown topic "${v.topic}"`);
  if (!Array.isArray(v.sections) || v.sections.length !== 3) warn(`${who}: expected 3 sections`);
  if (!Array.isArray(v.sources) || !v.sources.length) fail(`${who}: no sources`);
  (v.sources || []).forEach(s => { if (s.url && !/^https:\/\//.test(s.url)) warn(`${who}: source isn't https: ${s.url}`); });
  if (v.published && !(v.watch && (v.watch.instagram || v.watch.youtube))) warn(`${who}: published but has no reel link`);
});
ok(`${V.length} explainers checked`);
const G = grab('GLOSSARY') || [], M = grab('MISSIONS') || [];
G.forEach((g, n) => { if (!g.t || !g.d) fail(`GLOSSARY[${n}] is incomplete`); });
M.forEach((m, n) => { if (!m.id || !m.title || !(m.steps || []).length) fail(`MISSIONS[${n}] is incomplete`); });
ok(`${G.length} glossary terms, ${M.length} missions checked`);

// 7 · public site: no personal details
const text = fs.readdirSync(ROOT).filter(f => /\.(html|md|webmanifest|js)$/.test(f)).map(f => read(f)).join('\n');
const emails = [...new Set((text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || []))].filter(e => !/^(mcsyme11@gmail\.com|noreply@anthropic\.com|.+@example\.com)$/.test(e));
if (emails.length) fail('an e-mail address other than the creator\'s is on the site: ' + emails.join(', '));
if (/C:\\Users\\|\/Users\/[A-Za-z]|\/home\/[a-z]/.test(text)) fail('a personal folder path is on the site');
ok('privacy');

// 8 · branding: every file in the repo carries the credit; every document shows the patch; every PNG has the credit inside
{
  const { execSync } = require('child_process');
  let files = [];
  try { files = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean); } catch (e) { warn('git not available: branding check skipped'); }
  const TEXT = /\.(md|js|ya?ml|html|svg|webmanifest|css|py|sh)$/i;
  let n = 0;
  for (const f of files) {
    if (!exists(f)) continue;
    if (TEXT.test(f)) {
      const t = read(f); n++;
      if (!t.includes('©') || !t.includes('Malcolm Syme') || !t.includes('mcsyme11@gmail.com')) fail(`${f}: missing the credit "© … Malcolm Syme · mcsyme11@gmail.com"`);
      if (/\.md$/i.test(f)) {
        if (!/^<p align="center"><img src="[^"]*(patch|icon-)[^"]*"/.test(t)) fail(`${f}: no mission patch at the top`);
        if (!t.includes('Simply Aerospace™ and the Simply Aerospace mission patch are trademarks of Malcolm Syme')) fail(`${f}: no trademark line`);
      }
    } else if (/\.png$/i.test(f)) {
      n++;
      if (!fs.readFileSync(path.join(ROOT, f)).includes(Buffer.from('Malcolm Syme'))) fail(`${f}: no credit embedded in the image (tag it with the credit)`);
    }
  }
  if (files.length) ok(`branding on ${n} files`);
}

// 8 · Legal page and footer link, once the Legal page exists
if (/#\/legal/.test(html) && !/route.*legal|legal\s*:/i.test(html)) warn('a #/legal link exists but no legal route was found');

for (const m of passed) console.log('  ok  ' + m);
for (const m of warnings) console.log('WARN  ' + m);
for (const m of errors) console.log('FAIL  ' + m);
if (errors.length) { console.log(`\n${errors.length} problem(s): fix them before publishing (docs/RELEASE-CHECKLIST.md).`); process.exit(1); }
console.log(`\nSite check passed${warnings.length ? ' with ' + warnings.length + ' warning(s)' : ''}.`);
