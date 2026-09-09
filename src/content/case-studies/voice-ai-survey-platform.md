---
title: Voice AI Survey Platform
summary: >-
  An unattended IVR system that conducts spoken telephone surveys in a local Ghanaian
  language — speech recognition, translation, classification, routing, and speech
  synthesis in one live pipeline. Prototype; not deployed to production.
role: Machine Learning Engineer — Ayadata GH
period: Nov 2023 – Present
stack:
  - Python
  - FastAPI
  - LiveKit
  - Claude on AWS Bedrock
  - Gunicorn
  - nginx
order: 1
featured: true
---

<p class="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
  Prototype — this system was designed and built end to end but never deployed to production or
  used on a real call. The results below are what was validated internally, not field results.
</p>

A phone-call-style survey agent that understands free-form spoken answers and branches to the
next question with no human operator on the line — designed for spoken telephone surveys in a
local Ghanaian language, with no assumption that a respondent will answer in a fixed format.

## Context & constraints

An unattended phone survey has less room for error than most conversational AI: there's no human
to fall back on when something goes wrong, and a respondent who gets confused mid-call usually
just hangs up rather than repeating themselves. That set the real constraints:

- **Every answer has to resolve to something**, because there's no operator to hand an unclear
  answer to.
- **The system has to survive its own infrastructure failing.** A crashed worker mid-call can't
  mean a dropped respondent.
- **Latency is part of the interface.** On a live phone call, a pause reads as the system being
  broken, not as it "thinking" — which ruled out adding a network round-trip to every single turn.
- **The same logic had to work live and offline**, so it could be tested and iterated on without
  burning real phone calls.

## Architecture

<svg viewBox="0 0 800 320" role="img" aria-label="Two front ends, LiveKit for live calls and FastAPI for batch audio, both call into one shared survey engine: speech recognition, machine translation, answer classification routed to one of five parsers by question type, dynamic question routing with a time-based shortening rule, and speech synthesis. Session state is written to disk after every turn so any worker can resume any call." class="my-8 w-full text-slate-700 dark:text-slate-300">
  <defs>
    <marker id="arrow-voiceai" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <g font-size="13" fill="currentColor">
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="20" y="20" width="170" height="50" rx="6" />
      <rect x="20" y="90" width="170" height="50" rx="6" />
    </g>
    <text x="105" y="50" text-anchor="middle" font-weight="600">LiveKit agent</text>
    <text x="105" y="120" text-anchor="middle" font-weight="600">FastAPI batch</text>
    <text x="105" y="65" text-anchor="middle" font-size="11" opacity="0.75">live calls</text>
    <text x="105" y="135" text-anchor="middle" font-size="11" opacity="0.75">recorded audio</text>
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="250" y="55" width="150" height="50" rx="6" />
    </g>
    <text x="325" y="85" text-anchor="middle" font-weight="600">Shared survey engine</text>
    <line x1="190" y1="45" x2="245" y2="70" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" />
    <line x1="190" y1="115" x2="245" y2="90" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" />
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="450" y="20" width="120" height="42" rx="6" />
      <rect x="450" y="72" width="120" height="42" rx="6" />
      <rect x="450" y="124" width="120" height="42" rx="6" />
      <rect x="450" y="176" width="120" height="42" rx="6" />
    </g>
    <text x="510" y="46" text-anchor="middle" font-size="12">Speech recognition</text>
    <text x="510" y="98" text-anchor="middle" font-size="12">Translation</text>
    <text x="510" y="150" text-anchor="middle" font-size="12">Answer classify</text>
    <text x="510" y="202" text-anchor="middle" font-size="12">Question routing</text>
    <line x1="400" y1="80" x2="445" y2="42" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" />
    <line x1="510" y1="62" x2="510" y2="70" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" />
    <line x1="510" y1="114" x2="510" y2="122" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" />
    <line x1="510" y1="166" x2="510" y2="174" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" />
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="630" y="72" width="150" height="42" rx="6" />
    </g>
    <text x="705" y="98" text-anchor="middle" font-weight="600" font-size="12">Speech synthesis</text>
    <line x1="570" y1="145" x2="700" y2="118" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" />
    <g stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 3">
      <rect x="450" y="240" width="300" height="46" rx="6" />
    </g>
    <text x="600" y="258" text-anchor="middle" font-size="12" font-weight="600">Disk-backed session state</text>
    <text x="600" y="275" text-anchor="middle" font-size="11" opacity="0.75">any Gunicorn worker can resume any in-progress call</text>
    <line x1="510" y1="166" x2="480" y2="238" marker-end="url(#arrow-voiceai)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3" />
  </g>
</svg>

Two front ends sit over one shared survey engine: a **LiveKit voice agent** for real-time calls,
using energy-based speech segmentation to detect turn boundaries without the latency of a heavier
VAD model, and a **FastAPI batch service** for processing recorded audio through the identical
pipeline. Both paths run the same declarative question graph, the same five answer parsers, and
the same routing logic — so behavior tested offline on recordings is the behavior a live caller
gets, and the survey design lives as data, not as branching code.

The engine itself: speech recognition → machine translation → answer classification → dynamic
question routing (a declarative graph with conditional branches and a time-based rule that
shortens an overrunning call) → speech synthesis. Every turn is logged for replay and audit.
Deployment target was Gunicorn behind nginx, with call session state written to disk after every
turn — so if the worker handling a call restarts, any other worker can pick the session back up
mid-conversation without the caller noticing.

## Key decisions

**Five answer-parsing strategies, chosen per question type, instead of one LLM call per turn.**
Negation-aware keyword matching, fuzzy multi-option scoring, regex quantity extraction, live LLM
entity extraction, and post-call theme coding each handle a different answer shape. The LLM path
is used only where the others can't resolve an answer, because a network round-trip on every
single turn would put a latency cost — and audible dead air — on the most common, simplest
answers to get it right on the rare, genuinely open-ended ones.

**Disk-backed session state instead of sticky sessions.** Making any worker able to resume any
call, by persisting session state to disk after each turn, meant the load balancer didn't need
call-affine routing and a worker restart didn't need to mean a lost respondent — at the cost of a
disk write per turn instead of an in-memory one.

**A declarative question graph instead of hardcoded branching logic.** Survey design changes as a
data change, not a code change, and the time-based shortening rule protects data quality on calls
that run long instead of letting them time out abruptly.

## Results

<!-- CONFIRM (Philip): this needs your numbers/specifics — what did internal testing actually
     cover? Call volume tested, WER-equivalent understanding rate, latency figures, anything
     concrete you can defend if asked. -->

Validated internally end to end — the full pipeline from incoming audio through routing to
synthesized response, and worker-restart session resumption — on test calls exercising the
question graph's conditional branches. It did not reach production and has no real-caller or
field results to report.

## What I'd do differently

<!-- CONFIRM (Philip): same as above — this is a plausible placeholder, not your actual
     retrospective. Replace with what you'd really say. -->

The path to production from here is mostly about scale and failure modes that only show up under
real load: real-carrier telephony integration and load testing at expected call volumes, and a
defined escalation path for the rare answer none of the five parsers can resolve with confidence,
rather than routing it to the LLM parser by default and hoping.
