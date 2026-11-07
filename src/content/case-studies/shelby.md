---
title: Shelby — my personal AI assistant
summary: >-
  A chat assistant that does real work through six tools I designed — meetings, Google Docs,
  Gmail, job applications, the web and audiobooks — each its own process, with nothing written,
  sent or deleted without my approval. In active development.
role: Personal project · my design, built with Claude Code as a pair programmer
period: August 2026 – present
stack:
  - Python
  - TypeScript
  - FastAPI
  - React
  - MCP
  - PostgreSQL
  - Docker
  - Claude (Anthropic API, AWS Bedrock)
  - Whisper
  - Pocket TTS
  - Tailscale
repo: https://github.com/Philips-DR/shelby
order: 3
featured: true
---

A chat assistant on my own laptop that does real work through tools: it records and transcribes
meetings, turns Markdown into formatted Google Docs, reads and drafts Gmail, checks job
applications against my own material, reads web pages, and narrates PDFs as audiobooks in a
cloned voice. I talk to it from the laptop or my phone, by typing or by voice, and it can read
its replies aloud.

**My design, built with Claude Code as a pair programmer.** I defined the system architecture,
the rules every part must follow and the features, and I reviewed and tested every change. Shelby
is in active development; this page describes it as of November 2026.

## Context & constraints

- **It acts on real accounts.** It reads and drafts my Gmail and builds Google Docs in my Drive.
  A language model must never send an email or delete a file on its own say-so.
- **One laptop, no usable GPU.** Speech recognition (Whisper) and a cloned narration voice
  (Pocket TTS) run on an 8-thread laptop processor, so every speech feature had to be fast enough
  on a CPU.
- **Reachable from my phone, not from the internet.** Only devices signed in to my own private
  network can reach it.
- **Testable without the world.** Every test suite must pass with no network, no credentials and
  no model.

## Architecture

<div class="my-8 overflow-x-auto" tabindex="0" role="region" aria-label="Architecture diagram; on a small screen it scrolls sideways">
<svg viewBox="0 0 800 290" role="img" aria-label="A browser on a phone or laptop talks to the web app, which calls the assistant's API. The assistant, running Claude, keeps its memory and audit log in PostgreSQL and starts six tools as separate processes over MCP on stdio: meet-ai for meetings, docu-ai for Google Docs, mail-ai for Gmail, apply-ai for job applications, web-ai for public web pages, and audiobook for narration in a cloned voice. Anything that writes, sends or deletes waits for approval." class="w-full min-w-[720px] text-slate-300">
  <defs>
    <marker id="arrow-shelby" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="10" y="20" width="170" height="64" rx="6" />
    <rect x="225" y="20" width="160" height="64" rx="6" />
    <rect x="430" y="20" width="190" height="64" rx="6" stroke="var(--color-accent)" fill="var(--color-accent)" fill-opacity="0.12" />
    <rect x="665" y="20" width="125" height="64" rx="6" />
    <line x1="180" y1="52" x2="221" y2="52" marker-end="url(#arrow-shelby)" />
    <line x1="385" y1="52" x2="426" y2="52" marker-end="url(#arrow-shelby)" />
    <line x1="624" y1="52" x2="661" y2="52" marker-start="url(#arrow-shelby)" marker-end="url(#arrow-shelby)" />
    <line x1="525" y1="84" x2="525" y2="140" />
    <line x1="70" y1="140" x2="730" y2="140" />
    <line x1="70" y1="140" x2="70" y2="166" marker-end="url(#arrow-shelby)" />
    <line x1="202" y1="140" x2="202" y2="166" marker-end="url(#arrow-shelby)" />
    <line x1="334" y1="140" x2="334" y2="166" marker-end="url(#arrow-shelby)" />
    <line x1="466" y1="140" x2="466" y2="166" marker-end="url(#arrow-shelby)" />
    <line x1="598" y1="140" x2="598" y2="166" marker-end="url(#arrow-shelby)" />
    <line x1="730" y1="140" x2="730" y2="166" marker-end="url(#arrow-shelby)" />
    <rect x="10" y="170" width="120" height="58" rx="6" />
    <rect x="142" y="170" width="120" height="58" rx="6" />
    <rect x="274" y="170" width="120" height="58" rx="6" />
    <rect x="406" y="170" width="120" height="58" rx="6" />
    <rect x="538" y="170" width="120" height="58" rx="6" />
    <rect x="670" y="170" width="120" height="58" rx="6" />
  </g>
  <g font-size="15" font-weight="600" fill="currentColor" text-anchor="middle">
    <text x="95" y="48">You</text>
    <text x="305" y="48">Web app</text>
    <text x="525" y="48">Assistant</text>
    <text x="727" y="48">PostgreSQL</text>
    <text x="70" y="195">meet-ai</text>
    <text x="202" y="195">docu-ai</text>
    <text x="334" y="195">mail-ai</text>
    <text x="466" y="195">apply-ai</text>
    <text x="598" y="195">web-ai</text>
    <text x="730" y="195">audiobook</text>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">
    <text x="95" y="68">phone or laptop</text>
    <text x="305" y="68">React, TypeScript</text>
    <text x="525" y="68">FastAPI + Claude</text>
    <text x="727" y="68">memory, audit log</text>
    <text x="70" y="214">meetings, Whisper</text>
    <text x="202" y="214">Google Docs</text>
    <text x="334" y="214">Gmail</text>
    <text x="466" y="214">job applications</text>
    <text x="598" y="214">public web pages</text>
    <text x="730" y="214">cloned voice</text>
    <text x="290" y="130">MCP over stdio · each tool its own process</text>
  </g>
  <text x="400" y="272" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.6">anything that writes, sends or deletes waits for my approval</text>
</svg>
</div>

The web app (React, TypeScript) and the backend are separate programs: they meet only over HTTP,
with an access token made fresh at each launch and written into the page by the web app's own
server, so nothing is ever pasted by hand.

The backend (FastAPI) holds the conversation with Claude and starts each tool as its own child
process, talking to it over the Model Context Protocol on stdio, the same protocol the model uses
to call it:

- **meet-ai** records meetings, transcribes them on the laptop and writes notes and minutes that
  cite the recording.
- **docu-ai** turns Markdown into a properly formatted Google Doc
  ([its own repo](https://github.com/Philips-DR/docu-ai)).
- **mail-ai** reads, searches, drafts and sends Gmail.
- **apply-ai** checks a job application: a posting's requirements against what my own material
  shows, and a draft's claims against what I have actually written.
- **web-ai** reads a public web page, and refuses anything that is not on the public internet.
- **audiobook** turns a PDF into an audiobook read in a voice cloned from a short recording.

PostgreSQL keeps the assistant's memory, its audit log and past conversations; the tools keep
their own files and never see the database. Everything runs in Docker on the laptop, and a
Tailscale sidecar gives my phone a private HTTPS address.

## Key decisions

**Tools as separate processes, not modules of one program.** An earlier assistant built as one
Python program had modules that quietly came to import each other's logins. Here no tool imports
another: they meet only through the assistant, over MCP. A crash or a hang stays inside one tool,
each tool keeps its own credentials, and each still runs alone from its own folder. docu-ai is
TypeScript, so it could not have shared a Python process anyway.

**The tools say what they do; the assistant enforces it in code.** Each tool marks in its MCP
annotations whether a call only reads. Anything that writes, sends or deletes waits for my
approval, and sending an email takes two presses with the whole email shown in between. A prompt
can ask a model to check first, but it cannot make it, so the gate is in code, not in the prompt.

**A faster voice, not a different one.** Piper was 9.5 times faster than real time on this
laptop, but it cannot speak in my cloned voice. I kept Pocket TTS and made it faster instead: an
8-bit model and two worker processes.

## Results

Measured on the laptop's processor:

- **Audiobook narration: 2.36 times real time, from 1.38,** on one 8-minute chapter. Whisper read
  that chapter back as accurately as the full model's render: 91.7% of the words in order,
  against 90.0%.
- **Dictation: an 8-second clip turned into text word for word in 2.0 seconds,** with Whisper's
  small English model kept loaded between clips.
- **More than 1,700 automated tests** across nine suites, all of which run with no network, no
  credentials and no model.

## Where it stands

Shelby is in active development, and more upgrades are on the way. What is built, how each part
was checked, and what comes next are written down as it goes, in the repo's
[plan](https://github.com/Philips-DR/shelby/blob/main/plan.md).
