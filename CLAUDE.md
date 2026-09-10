# Portfolio — Philip Baah Afriyie

A static portfolio site for **recruiters and hiring managers** evaluating Philip for AI/ML Engineer
and MLOps roles. Not a blog, not a playground, not a design experiment.

---

## 1. The one job

The resume already lists the work. What it cannot do is **prove** it — every repo is private and
every metric (7% WER, BLEU 81, 91.8% precision) is currently an unverifiable assertion. A reader
who cannot check a number discounts every number.

**This site exists to convert assertions into evidence.** Every decision below serves that. If a
change doesn't make the work more verifiable, more legible, or faster to evaluate, don't make it.

Evidence, ranked by strength:

1. **Public code** — real, readable repos a reviewer can clone. Load-bearing proof, highest
   priority. See §3a for which repos and the protocol for opening them.
2. **Architecture diagrams** — for an MLOps engineer, a correct system diagram is proof of thinking.
3. **Specific decisions with tradeoffs** — "we chose X over Y because Z" cannot be faked by someone
   who didn't do the work.
4. **Numbers with stated provenance** — a labelled internal benchmark beats a bare number.

---

## 2. Source of truth

`/home/philip/Documents/resume/01-resume.md` is the **only** source for facts about Philip.

- **Never invent, extrapolate, or round a metric, date, job title, or technology.**
- If the site needs a fact the resume doesn't contain, **ask Philip** — do not fill the gap.
- Every metric on the site must trace to a line in the resume or to something Philip confirmed in
  conversation. When a number is an internal, unpublished result, say so on the page:
  *"~7% WER on a held-out internal set"* — not *"7% WER"* presented as a published benchmark.
- Philip reviews and signs off on every factual claim before deploy. No exceptions.

### Claim precision — attribute contribution exactly

A portfolio invites the follow-up questions a resume lets you skip. A resume bullet gets six
seconds; a case study gets *"walk me through what happens when a Triton worker dies mid-call."*
Overstated ownership doesn't survive that, so state the actual contribution.

Known corrections to apply (confirmed by Philip, 2026-09-09):

- **A cloud engineer at Ayadata performs the deployments.** Every "deployed / provisioned /
  shipped the infrastructure" claim must be re-scoped to what Philip personally did — writing
  Dockerfiles, defining the Triton model repository and config, building the FastAPI gateway,
  specifying service requirements. Collaboration is credible and worth stating plainly:
  *"packaged the models for Triton and built the gateway; our cloud engineer provisioned the
  cluster."* Never write bare "deployed" for work Philip did not personally perform.

Use verbs that match reality: **built / designed / trained / fine-tuned / benchmarked** for his own
work; **worked with X to** or **handed off to** where it was shared. If Philip cannot answer a
detailed operational question about something, the site must not claim he owned it.

Fixed details (copy exactly, don't retype from memory):

| | |
|---|---|
| Name | Philip Baah Afriyie |
| Title | AI/ML Engineer · Speech, Vision & Applied MLOps |
| Location | Accra, Ghana — open to remote |
| Email | phil.afriyie900@gmail.com |
| GitHub | github.com/Philips-DR |
| LinkedIn | linkedin.com/in/philip-afriyie-a704a3338 |

---

## 3. Confidentiality — hard rules

The Ayadata work is an employer's IP. Violating this is worse than having no portfolio.

- **Never** publish proprietary source code, model weights, training data, or data samples.
- **Never** publish real customer, farmer, or employee data — including in screenshots. If a
  screenshot is ever added, redact before it enters the repo, not after.
- **Do** describe architecture, design decisions, and aggregate results at a level any engineer
  could reproduce independently. That is normal professional practice and is what recruiters want.
- Client and partner names: only those already named in the resume. Otherwise "an agricultural
  client", "a field operations partner".
- When in doubt, generalize the system and keep the reasoning. The reasoning is the valuable part.

---

## 3a. Making repos public — protocol

Philip's repos are the primary evidence, but **going public is irreversible in practice**: it
exposes the full git history (not just current files), and new public repos are cloned and indexed
by crawlers within minutes. Flipping back to private does not undo that.

**No repo's visibility changes without completing this audit and getting Philip's explicit
go-ahead on that specific repo.**

Current state (all private as of 2026-09-09):

| Repo | Language | Verdict |
|---|---|---|
| `docu-ai` | TypeScript | **Best candidate.** General-purpose tool, not employer IP. Audit and open first. |
| `voice-ai-survey-platform` | Python | **Ownership unresolved — see note below.** Default to private and present as an architecture case study until resolved. |
| `personal-ai-main` | Python | **Not personal work — keep private, not portfolio content.** See audit note below. |
| `second-brain` | — | Likely personal notes. Assume not publishable unless Philip says otherwise. |

**Note on `voice-ai-survey-platform`:** Philip states it was an exploratory project that never
reached production. The resume presents it as shipped and deployed under Ayadata employment. Until
that's reconciled, treat ownership as unresolved. Three facts decide it — where it was built (work
time and equipment vs. his own), whether it used employer data (the resume references *real
code-switched farmer speech*, which would be Ayadata's to hold), and what his contract's IP
assignment clause covers. Shipping status is **not** one of the deciding factors; employers own
unshipped internal prototypes too.

If it resolves to Philip's own independent work, treat it exactly like `docu-ai` — audit, README,
publish. If it resolves to employer work, it stays private and becomes a case study. Never publish
it in a modified form intended to obscure its origin: a derivative work has the same owner as the
original, so that adds risk without resolving anything.

Audit steps, per repo, before any visibility change:

1. **Confirm ownership** — is this Philip's work, or work-for-hire? Work-for-hire stays private.
2. **Scan full history** for secrets, not just HEAD — `.env`, `credentials.json`, `token.json`,
   `*.pem`, API keys, OAuth client secrets, connection strings. `docu-ai` uses OAuth 2.0, so treat
   credential files as present until proven absent.
3. **If a secret is found in history:** rotate the credential first, then either rewrite history or
   publish a fresh repo with no history. Deleting the file in a new commit is *not* sufficient.
4. **Scan for data** — no customer, farmer, or employee records; no real transcripts or audio.
5. **Scan for identifying detail** — internal hostnames, client names, Slack channels, ticket IDs.
6. **Make it presentable** — a repo with no README is weak evidence. Every public repo needs: what
   it does, why it exists, install, usage, architecture, and how it's tested.
7. **Then** ask Philip to confirm, and only then change visibility.

A well-documented public repo is strong evidence. A public repo with a leaked key is a
disqualifying event. The order matters.

### Audit results (2026-09-09)

**`docu-ai` — clean, ready pending Philip's go-ahead.** No secrets in history (verified across all
4 commits, full diff scan): no credential files ever committed, `.gitignore` correctly excludes
`credentials.json`/`client_secret_*.json`/`token.json`/`*.pdf`, no hardcoded API keys/tokens, no
real document IDs. The one test hitting the live Google API is opt-in (`DOCU_AI_LIVE_TESTS=1`),
skipped by default, and self-cleaning (trashes its test doc in `afterAll`). The existing README
already meets the "what/why/install/usage/architecture/testing" bar — no rewrite needed. A LICENSE
(MIT) is drafted and staged locally in the audit clone, not yet pushed. All 4 commits are authored
under `philip@ayadata.ai` — not a security issue, just worth knowing before this is public.
**Remaining step: Philip confirms → push the LICENSE → flip visibility to public.**

**`personal-ai-main` — reclassified, not portfolio material.** No secrets found either (all
`.env.example` fields blank, no leaked keys/tokens across history). But its own README states it
was **"built by the AyaData AI Solutions team"** — this is not personal work despite the repo name,
and stays private regardless of code quality. Separately: test fixtures in
`backend/tests/test_modules/test_email_handler.py`, `test_github_docs_handler.py`, and
`backend/tests/evals/fixtures.py` contain email addresses on the real `@ayadata.ai` domain
(`elton@ayadata.ai`, `henry@ayadata.ai`) alongside clearly synthetic ones (`alice@co.com`). Not
investigated further — whether those reference real colleagues is Philip's call, not something to
dig into further here. Also present: a `Personal AI Assistant Project Scope.docx` (18KB, untouched)
— worth Philip's own look regardless of the portfolio question, since scope docs often contain
planning detail (goals, timelines) not meant to ever go public.

---

## 4. Content rules

### Case study structure

Every deep case study follows this order. It maps to how a hiring manager reads.

1. **One-line summary** — what it is, in plain language, no jargon.
2. **Context & constraints** — why it was hard. Constraints are the most under-used credibility
   signal in engineering portfolios; lead with the real ones (code-switched speech, unreliable
   telephony, no labelled data, latency budget).
3. **Architecture** — a diagram, plus prose walking the data path end to end.
4. **Key decisions** — 2–4 real forks in the road, each with the alternative and why it lost.
5. **Results** — measured, with provenance stated.
6. **What I'd do differently** — mandatory. This section is what distinguishes a senior engineer
   from a tool-lister. Never omit it, never make it a humblebrag.

### Voice

- First person, past tense, plain declarative sentences.
- Match the resume's register: specific and unshowy. The resume is well written — don't inflate it.
- **Ban:** "passionate", "cutting-edge", "leveraged", "seamless", "revolutionize", "journey",
  "in today's fast-paced world". Ban emoji in body copy.
- Prefer the concrete noun: "Kafka consumer group" over "event infrastructure".
- Short paragraphs. A recruiter skims before they read.

### Scope — do not exceed this

Three deep case studies, two short entries. More than that and nothing gets read.

**Deep:**
- Voice AI Survey Platform *(flagship — lead with this; it's the most distinctive thing here)*
- Akan–English Speech Pipeline *(fine-tuning → Triton serving; the MLOps depth story)*
- docu-ai *(the public repo; the verification-first engineering story)*

**Short (3–4 sentences each, on the homepage, no dedicated page):**
- Agentic document extraction (OCR → PostgreSQL → downstream agents)
- Computer vision for agriculture (91.8% / 94% precision, MMDetection + YOLOv8)

### Homepage

A recruiter gives this ~30 seconds. Above the fold must answer, without scrolling:
who he is, what he does, one line of proof, and how to contact him.

Then: three case studies as cards → short entries → skills → contact. Resume PDF downloadable in
one click from the header (copy it to `public/` and keep it in sync with `01-resume.md`).

No hero animation. No "scroll to explore". No splash screen.

---

## 5. Technical rules

**Stack:** Astro + Tailwind, static output, deployed to Vercel.

- Case studies are Markdown in an Astro content collection with a typed schema. Adding a case study
  must be "write a `.md` file" — never "hand-edit HTML in four places".
- **Zero client-side JS on content pages.** If a feature needs JS, justify it first. A theme toggle
  is acceptable; a scroll library is not.
- **No UI component libraries, no CSS-in-JS, no jQuery.** Tailwind utilities and a handful of
  `@apply`-free component classes are enough.
- Self-host fonts or use a system stack. No render-blocking third-party requests.
- Images: explicit `width`/`height`, lazy-load below the fold, use Astro's image pipeline. Diagrams
  as inline SVG so they stay crisp and theme-aware.
- Accessibility is non-negotiable: semantic landmarks, one `<h1>` per page, real focus states,
  4.5:1 contrast minimum, alt text on every diagram that describes the *system*, not the picture.
- **Single fixed dark theme — not adaptive, no toggle** (decided 2026-09-10, superseding an
  earlier light-first/adaptive rule that was never actually shown to Philip before being built).
  `color-scheme: dark` in `:root`; no `dark:` variant classes anywhere in the codebase — a plain
  class *is* the dark-mode value. One accent colour (`--color-accent`, `oklch(0.75 0.1 220)`),
  verified against every background it sits on: 9.35:1 on slate-950, 8.28:1 on slate-900, 6.78:1
  on slate-800. If a future change reintroduces `dark:` anywhere, that's a regression, not a
  variation to fix — grep for it (`grep -rn "dark:" src/`) and remove it.
- Responsive from 320px. Nothing scrolls horizontally except a deliberately scrollable diagram.

**Dev workflow:** run the dev server in background mode (`astro dev --background`; manage with
`astro dev stop` / `astro dev status` / `astro dev logs`) rather than foregrounding it. Full Astro
docs: <https://docs.astro.build> — see its routing, components, framework-components,
content-collections, and styling guides as needed. (Kept from the scaffold tool's generated notes,
preserved at `ASTRO-DEV-NOTES.md`.)

**Budgets (verify before every deploy):**

- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO.
- Total page weight < 500 KB on the homepage.
- Zero console errors, zero broken links.

**Deployment — Vercel:**

- Repo: `philip-portfolio`, connected to Vercel for push-to-deploy on `main`. **Currently
  private** (Philip's explicit choice, made while case-study content review was still open — see
  §3a and Phase 5) — flip to public once that's resolved. The deployed *site* is public regardless
  of repo visibility; Vercel builds from a private repo without issue.
- Astro's default static output is correct here. Do **not** add an SSR adapter — there is no server
  need, and static keeps it fast and free.
- Vercel auto-detects Astro; no `vercel.json` unless a redirect is actually required.
- Set `site` in `astro.config.mjs` to the final production URL (needed for `sitemap.xml` and
  canonical/OG tags). Update it if a custom domain is added later.
- Preview deploys on branches are fine for review; only `main` is production.
- Never commit: `node_modules/`, `dist/`, `.vercel/`, `.env`, anything from an Ayadata repo.

---

## 6. Design rules

**Reference:** <https://rahul-lumbhani-portfolio.vercel.app/> — use for *structure and polish*, not
as a template to clone.

Borrowed and built (confirmed against the live site, 2026-09-10 — this was originally a plan
written before Philip could see the result, and the gap between the two is exactly why it's worth
recording precisely now): clean header nav (Home / Work / About), a single fixed **dark theme**
(not adaptive — see §5), skip-to-content link, a headshot in the hero, project cards that link to
dedicated pages **with a small architecture-diagram preview** (`PipelineThumbnail.astro` —
simplified, no fine print, since a full diagram's text is illegible at card size), and the contact
section with social links.

Deliberately reject, on substance not just taste:

- **Filterable skill icon grids and tech-stack icon walls.** They're decorative and read as a
  junior-portfolio template. Philip's skills go in grouped text lists, as in the resume.
- **GitHub / LeetCode stat widgets.** Contribution graphs measure commit frequency, not engineering
  quality — and with most repos private they'd actively undersell him.
- **"Playful experiments" framing.** Philip's positioning is *production ML systems in a
  constrained environment*. Every word should support that, not undercut it.

The decisive difference from the reference: **its project cards are shallow, and depth is Philip's
entire differentiator.** Adopt the shell and its visual richness, then go far deeper on each case
study than it does.

Restraint reads as senior. Over-design reads as compensating.

- One accent colour. Everything else is a neutral ramp.
- Two type sizes for body text, three for headings. Generous line height (1.6+), measure capped
  around 70 characters.
- Whitespace over dividers, borders over shadows.
- No stock photography. No abstract AI imagery — no glowing brains, no neural-net wallpaper.
- The diagrams are the visual interest. Invest the design effort there.

---

## 7. Steps

Work through these in order. Don't start a phase before the previous one is signed off.

### Phase 0 — Resume accuracy pass (do this first)

The portfolio inherits every claim in `01-resume.md` and amplifies it. Fix the source before
building on top of it.

- [x] Walk the resume claim by claim with Philip; mark each as **did it / shared it / someone else**
- [x] Re-scope all deployment and infrastructure language per §2 "Claim precision"
- [x] Resolve the "shipped / deployed" wording on the voice AI survey platform → prototype, not
      deployed; same correction applied to the analytics dashboard and document extraction pipeline
      once Philip confirmed those were prototypes too
- [x] Reconsider the "MLOps" positioning → blended: **"AI/ML Engineer · Speech, Vision & Applied
      MLOps"**, keeping MLOps but no longer over the specialty
- [x] Trim the skills list to what Philip can be questioned on — Kubernetes confirmed as hands-on
      (2025) and kept; Kafka/Redis/Terraform/Ansible/Gunicorn/nginx kept, scoped to "writes the
      app code/config," cloud engineer owns provisioning and the running cluster
- [x] Produce a corrected resume → `01-resume.md` updated in place, 2026-09-09. **The PDF export is
      now stale — regenerate `Philip_Baah_Afriyie_Resume.pdf` from this file before sharing it
      anywhere.**

**Positioning note (resolved):** the strongest and rarest thing here is speech and vision for
low-resource African languages — ~7% WER on code-switched Twi, BLEU 81 Akan–English, 91.8%
precision on banana trees. Very few engineers anywhere have done that, and it cannot be bluffed.
The resume title now reflects this alongside applied MLOps; case studies should still lead with the
specialty first.

### Phase 1 — Scaffold
- [x] `npm create astro@latest` in this directory (minimal template, TypeScript strict)
- [x] `npx astro add tailwind`, then follow whatever it configures for the installed version
      (+ `@tailwindcss/typography` for case-study prose)
- [x] `git init`, `.gitignore` (+ `.vercel/`), first commit on `main`
- [x] Content collection + Zod schema for case studies (`title`, `summary`, `role`, `period`
      optional, `stack[]`, `order`, `featured`) — `src/content.config.ts`
- [x] Base layout, header, footer, 404 — single accent colour via `--color-accent` in
      `src/styles/global.css`
- [x] Copy `Philip_Baah_Afriyie_Resume.pdf` into `public/` (stale copy — regenerate before Phase 5)
- [x] Verify `npm run build` produces clean static output — 5 pages, 164 KB total, `astro check`
      clean

Three stub case-study `.md` files exist (frontmatter only, resume-sourced) so the collection →
dynamic route pipeline is proven end to end. Their bodies are explicit Phase 2 work.

### Phase 2 — Content (the real work; budget the most time here)
- [x] Homepage above-the-fold: name, title, one-line positioning, contact, resume link
- [x] Case study 1 — Voice AI Survey Platform (with architecture diagram)
- [x] Case study 2 — Akan–English Speech Pipeline (with architecture diagram)
- [x] Case study 3 — docu-ai (with architecture diagram)
- [x] Two short entries (document extraction, computer vision) on the homepage
- [x] Skills section — grouped as in the resume, no proficiency bars or percentage ratings
- [ ] **Philip reviews every factual claim** before proceeding — in particular every
      `<!-- CONFIRM (Philip): ... -->` marker left in the three case-study `.md` files (results
      and "what I'd do differently" sections drafted from stated facts, not your actual
      retrospective judgment). Search for them with:
      `grep -rn "CONFIRM (Philip)" src/content/case-studies/`

### Phase 3 — Evidence
- [x] Run the §3a audit on `docu-ai` — full history scan for OAuth credentials and `.env` — clean,
      see audit results above
- [x] Rotate any exposed credential, then clean history — n/a, nothing exposed
- [x] Write a real README — already excellent (pre-existing); MIT LICENSE drafted, staged locally,
      not pushed
- [ ] **Philip confirms** → push the LICENSE → make `docu-ai` public → then add its real repo link
      to the case study and homepage (not done yet — would 404 while private)
- [x] Run the §3a audit on `personal-ai-main` — reclassified as employer work, not portfolio
      material; stays private regardless of the public-code decision (see audit results above)
- [x] Architecture diagram — voice pipeline (telephony → ASR → MT → classify → route → TTS) —
      inline SVG in the Voice AI Survey Platform case study
- [x] Architecture diagram — serving stack (Triton, FastAPI gateway, Terraform/Ansible) — inline
      SVG in the Akan–English Speech Pipeline case study
- [x] Architecture diagram — docu-ai's parse/plan/emit/verify pipeline — inline SVG (added beyond
      the original three; it's the flagship public-code story and earned one)
- [~] Architecture diagram — event-driven agent infra (Kafka, Redis, LangGraph) — **cut**. This
      bullet belongs to the two homepage short entries (document extraction, analytics dashboard),
      and a full diagram there would break the "short = 3–4 sentences, no dedicated page" rule
      from §4. Not silently dropped — deliberately out of scope to protect the 3-deep/2-short cap.
- [ ] Philip reviews each diagram for technical accuracy

### Phase 4 — Polish
- [x] Dark/light both verified — **not just eyeballed**: computed actual WCAG contrast ratios
      (OKLCH → sRGB → relative luminance) for every color pair in use. Found and fixed two real
      failures: the light-mode `--color-accent` measured 3.67:1 on white (now 6.44:1 at a
      corrected lightness), and three `dark:text-slate-500` instances measured 4.24:1 on the dark
      background (now `dark:text-slate-400`, 7.87:1). Both were failing the 4.5:1 minimum this
      same document requires — worth knowing they shipped that way initially.
- [x] Responsive 320 → 1920 — reviewed the header specifically (name + 3 nav items + Resume
      button in one row was liable to overflow at 320px); fixed with `flex-wrap` and a
      shorter-name variant below the `sm` breakpoint. Everything else uses `flex-wrap`/stacking
      grids already. Not visually screenshot-tested (no browser available in this environment) —
      worth a real-device check in Phase 5.
- [x] Meta tags, Open Graph image, `sitemap.xml`, `robots.txt` — OG image hand-drawn as SVG and
      rasterized (`rsvg-convert`), OG/Twitter meta tags in `Layout.astro`, `@astrojs/sitemap`
      integration added, `robots.txt` added
- [~] Lighthouse ≥ 95 across the board — **could not run**: no Chrome/Chromium and no `lighthouse`
      CLI available in this environment. Substituted a manual audit instead: computed contrast
      ratios (see above), verified heading hierarchy/landmarks/alt text (below), checked total
      page weight (40 KB homepage HTML+CSS, well under the 500 KB budget), confirmed no
      render-blocking third-party requests. **A real Lighthouse run against the deployed URL in
      Phase 5 is still owed** — this substitute doesn't cover everything Lighthouse checks (e.g.
      actual paint timing).
- [x] Every link clicked — automated crawl of the built `astro preview` output found zero broken
      internal links across all 5 pages. External links (GitHub, LinkedIn, mailto) spot-checked;
      LinkedIn returns HTTP 999 to automated requests, which is LinkedIn's standard bot-blocking
      response, not a broken link — URL matches the resume's stated one exactly.
- [x] Every diagram has meaningful alt text — all 3 inline SVGs use `role="img"` with a full
      descriptive `aria-label`; zero `<img>` tags anywhere lack `alt`. Every page has exactly one
      `<h1>` and correct heading nesting; header/nav/main/footer landmarks present on every page.
- [x] Proofread — scanned for stray TODO/FIXME/placeholder markers (only the intentional Phase-5
      one in `astro.config.mjs` remains) and read through all case-study copy

### Phase 5 — Ship
- [x] Push to GitHub — **as `Philips-DR/philip-portfolio`, kept PRIVATE for now** (Philip's explicit
      choice) rather than the public repo originally planned here. This is the right call while the
      4 `CONFIRM (Philip)` markers in the case studies are still unresolved (see Phase 2) — a
      private repo means unreviewed draft claims aren't publicly visible. **Flip to public only
      once those are resolved**, alongside (not before) the Vercel deploy — no reason for the
      code to go public before the site itself does.
- [x] Import into Vercel, confirm the production build, verify the live URL — **live at
      <https://philip-portfolio-five.vercel.app/>** (Philip did the GitHub-access + import steps
      himself; `astro.config.mjs` and `robots.txt` updated to match and pushed, which triggered an
      automatic redeploy). Verified against the real deployed URL, not just localhost: all 5 pages
      resolve (including a real 404), all 3 SVG diagrams render correctly (zero escaped tags),
      resume PDF and OG image download, sitemap/robots.txt correct, and the contrast-fixed accent
      color confirmed present in the deployed CSS.
- [ ] Verify the live site on a real phone — still worth doing; only checked via curl/HTTP here,
      not an actual device or browser (none available in this environment)
- [ ] Update LinkedIn and the resume header with the URL — Philip's own accounts, his call on timing
- [ ] Once content is confirmed and the repo goes public: flip `docu-ai` public too (§3a), then add
      its real repo link to that case study

---

## 8. Definition of done

A stranger with 60 seconds knows what Philip does and what he's good at. A skeptical engineer with
10 minutes can read one case study, follow the architecture, click into real code, and conclude he
has actually built production ML systems.

---

## 9. Don't

- Don't restate the resume in bullet points and call it a portfolio.
- Don't add a blog with no posts, a testimonials section with no testimonials, or a "currently
  learning" list.
- Don't use skill bars, percentage proficiency ratings, or a years-of-experience counter.
- Don't add analytics, chat widgets, newsletter signups, or cookie banners.
- Don't inflate a resume claim to make a page sound better. The claims are already strong; a single
  exaggeration a reader catches destroys the credibility of everything else on the site.
- Don't ship a case study Philip hasn't reviewed for accuracy and confidentiality.
