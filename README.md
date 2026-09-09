# Philip Baah Afriyie — Portfolio

Source for [philip-portfolio.vercel.app](https://philip-portfolio.vercel.app) — a portfolio site
built for recruiters and hiring managers evaluating Philip for AI/ML Engineer roles.

Project rules, content scope, confidentiality boundaries, and the build plan live in
[`CLAUDE.md`](./CLAUDE.md) — read that before making changes.

## Stack

Astro (static output) + Tailwind CSS v4, deployed to Vercel.

## Structure

```
src/
├─ content/case-studies/   # one Markdown file per case study
├─ content.config.ts       # case-study frontmatter schema
├─ layouts/Layout.astro    # base layout (header, footer, meta)
├─ components/             # Header, Footer
└─ pages/
   ├─ index.astro          # homepage
   ├─ work/[id].astro      # case-study route, one per content entry
   └─ 404.astro
```

Adding a case study is: add a `.md` file to `src/content/case-studies/` with the required
frontmatter (see `src/content.config.ts`) and a body. No other file needs to change.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the static site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check |

See [`ASTRO-DEV-NOTES.md`](./ASTRO-DEV-NOTES.md) for background-mode dev-server commands and
Astro documentation links.
