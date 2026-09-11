---
title: docu-ai
summary: >-
  Compiles a folder of Markdown into a single properly formatted Google Doc — real
  Docs styling, syntax-highlighted code, tables, images, chapters, and a clickable
  table of contents — with zero markdown residue in the output.
role: Personal project
stack:
  - TypeScript
  - Google Docs API
  - OAuth 2.0
  - Vitest
repo: https://github.com/Philips-DR/docu-ai
order: 3
featured: true
---

Compiles a folder of Markdown files into a single, properly formatted Google Doc — real Docs
styling rather than a wall of literal `#` and `**` characters, with syntax-highlighted code
blocks, tables, embedded images, one Docs tab per chapter, and a clickable table of contents.

## Context & constraints

The Google Docs API is a structural editing API, not a Markdown renderer: every heading, list,
code block and image has to be built out of low-level `batchUpdate` requests against character
offsets in a document. There's no "paste Markdown here" endpoint. Two things made this harder
than a typical converter:

- **No visual feedback loop.** The API returns success/failure on each request, not a rendering
  of the result — a wrong offset produces a malformed document you only discover by opening it.
- **Zero tolerance for residue.** A converter that leaves a stray `**bold**` or unconverted table
  pipe in the output isn't "mostly working" — it's broken, because the whole point is a document
  that reads as if a person formatted it directly in Docs.

## Architecture

<svg viewBox="0 0 800 200" role="img" aria-label="Pipeline: parse markdown into an AST, plan Docs API batch update requests from it, emit by calling the API, then verify by reading the built document back and lint-checking for residue" class="my-8 w-full text-slate-300">
  <defs>
    <marker id="arrow-docuai" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="10" y="70" width="150" height="60" rx="6" />
    <rect x="220" y="70" width="150" height="60" rx="6" />
    <rect x="430" y="70" width="150" height="60" rx="6" />
    <rect x="640" y="70" width="150" height="60" rx="6" />
    <line x1="160" y1="100" x2="215" y2="100" marker-end="url(#arrow-docuai)" />
    <line x1="370" y1="100" x2="425" y2="100" marker-end="url(#arrow-docuai)" />
    <line x1="580" y1="100" x2="635" y2="100" marker-end="url(#arrow-docuai)" />
    <path d="M 715 130 C 715 175, 85 175, 85 130" marker-end="url(#arrow-docuai)" />
  </g>
  <g font-size="15" font-weight="600" fill="currentColor" text-anchor="middle">
    <text x="85" y="95">Parse</text>
    <text x="295" y="95">Plan</text>
    <text x="505" y="95">Emit</text>
    <text x="715" y="95">Verify</text>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">
    <text x="85" y="115">markdown → AST</text>
    <text x="295" y="115">AST → batchUpdate</text>
    <text x="295" y="130">requests</text>
    <text x="505" y="115">calls Docs API</text>
    <text x="715" y="115">re-reads doc,</text>
    <text x="715" y="130">lints for residue</text>
  </g>
  <text x="400" y="192" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.6">feedback loop: verify re-runs against the live document, not a mock</text>
</svg>

The compiler is a **layered pure-function pipeline**: parse → plan → emit → verify.

1. **Parse** turns each Markdown file into an AST.
2. **Plan** walks the AST and produces a flat list of Google Docs `batchUpdate` requests — no
   network calls happen here, so this stage is pure and deterministic.
3. **Emit** sends the planned requests to the Docs API: one tab per chapter, a generated table of
   contents, syntax-highlighted code blocks, tables, and embedded images.
4. **Verify** closes the loop: it reads the built document back through the API and runs a
   *residue lint* — an assertion that no unconverted Markdown syntax survived — and confirms font
   application by exporting the document to PDF and checking the export, rather than trusting the
   API's write response.

## Key decisions

**Pure functions for parse and plan, isolated from the network.** Splitting "decide what the
document should contain" from "talk to Google" means the planner is testable with plain unit
tests and **golden request snapshots** — a stored expected list of API requests for a given input
— with no network access and no OAuth credentials required to run the test suite. The alternative,
building requests inline while walking the AST and calling the API as you go, would have made most
of the logic untestable without live credentials and a real document to write into.

**Verification-first, not trust-the-response.** The Docs API returning `200 OK` for a
`batchUpdate` call doesn't mean the document looks right — it means the request was
well-formed. The residue lint and the PDF-export font check both exist because "the API accepted
my request" and "the document is correct" turned out to be different claims, and the second one
is the only one that matters.

## Results

- Compiles a folder of Markdown into a single Google Doc with real Docs styling — headings, lists,
  syntax-highlighted code blocks, tables, embedded images, one tab per chapter, and a clickable
  table of contents.
- The residue lint and PDF-export font check give a repeatable definition of "done": zero
  unconverted Markdown syntax in the output, confirmed against the live document rather than
  assumed from the API response.
- The parse/plan layers are covered by golden-snapshot unit tests that run without network access
  or credentials.

## What I'd do differently

<!-- CONFIRM (Philip): this section needs your actual retrospective — I've drafted a plausible
     placeholder below from what the architecture implies, but you know what actually bit you.
     Replace or edit before this goes live. -->

Given more time, I'd extend the golden-snapshot tests to cover the emit stage too — right now the
verification loop (residue lint, PDF export check) is the safety net for emit-stage correctness,
but a snapshot test that mocks the Docs API and checks the exact request sequence would catch
regressions earlier and faster than a full round-trip through a real document.
