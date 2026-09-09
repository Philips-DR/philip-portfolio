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
| `personal-ai-main` | Python | Audit before deciding. Personal, but check for keys and personal data. |
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
- Dark and light mode must both be correct. Define light on `:root`, override under
  `prefers-color-scheme: dark`.
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

- Repo: `philip-portfolio` (public), connected to Vercel for push-to-deploy on `main`.
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

Borrow: the clean header nav (Home / Work / About), dark-first palette, skip-to-content link,
featured-project cards that link to dedicated pages, and the contact section with social links.

Deliberately reject:

- **Filterable skill icon grids and tech-stack icon walls.** They're decorative and read as a
  junior-portfolio template. Philip's skills go in grouped text lists, as in the resume.
- **GitHub / LeetCode stat widgets.** Contribution graphs measure commit frequency, not engineering
  quality — and with most repos private they'd actively undersell him.
- **"Playful experiments" framing.** Philip's positioning is *production ML systems in a
  constrained environment*. Every word should support that, not undercut it.

The decisive difference from the reference: **its project cards are shallow, and depth is Philip's
entire differentiator.** Adopt the shell, then go far deeper on each case study.

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
- [ ] Homepage above-the-fold: name, title, one-line positioning, contact, resume link
- [ ] Case study 1 — Voice AI Survey Platform
- [ ] Case study 2 — Akan–English Speech Pipeline
- [ ] Case study 3 — docu-ai
- [ ] Two short entries
- [ ] Skills section — grouped as in the resume, no proficiency bars or percentage ratings
- [ ] **Philip reviews every factual claim** before proceeding

### Phase 3 — Evidence
- [ ] Run the §3a audit on `docu-ai` — full history scan for OAuth credentials and `.env`
- [ ] Rotate any exposed credential, then clean history (or republish without history)
- [ ] Write a real README: what it does, why, install, usage, architecture, test strategy
- [ ] Philip confirms → make `docu-ai` public → link it from the case study and homepage
- [ ] Run the §3a audit on `personal-ai-main`; decide with Philip whether it's portfolio-worthy
- [ ] Architecture diagram — voice pipeline (telephony → ASR → MT → classify → route → TTS)
- [ ] Architecture diagram — serving stack (Triton, FastAPI gateway, Terraform/Ansible)
- [ ] Architecture diagram — event-driven agent infra (Kafka, Redis, LangGraph)
- [ ] Philip reviews each diagram for technical accuracy

### Phase 4 — Polish
- [ ] Dark/light both verified
- [ ] Responsive 320 → 1920
- [ ] Meta tags, Open Graph image, `sitemap.xml`, `robots.txt`
- [ ] Lighthouse ≥ 95 across the board
- [ ] Every link clicked; every diagram has meaningful alt text
- [ ] Proofread aloud — typos on an engineer's portfolio are disproportionately damaging

### Phase 5 — Ship
- [ ] Create the public `philip-portfolio` repo and push
- [ ] Import into Vercel, confirm the production build, verify the live URL
- [ ] Verify the live site on a real phone and on desktop
- [ ] Update LinkedIn and the resume header with the URL

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
