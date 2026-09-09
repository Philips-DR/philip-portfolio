---
title: Akan–English Speech Pipeline
summary: >-
  Fine-tuned Whisper (ASR), a bidirectional NLLB-200 model (MT), and a custom Akan
  TTS voice on real, code-switched farmer speech, then packaged all three for serving
  behind NVIDIA Triton with a FastAPI gateway.
role: Machine Learning Engineer — Ayadata GH
period: Nov 2023 – Present
stack:
  - Hugging Face Transformers
  - PyTorch
  - NVIDIA Triton Inference Server
  - FastAPI
  - MLflow
  - Terraform
order: 2
featured: true
---

Fine-tuned speech recognition, machine translation, and text-to-speech for Akan, then packaged
all three for low-latency serving — built for real farmer speech, which is messier than the
clean, single-language audio most speech models are tuned on.

## Context & constraints

Farmer speech in the field mixes English brand names and numerals mid-sentence into Akan —
code-switching that off-the-shelf ASR and MT models handle poorly, because they're trained on
speech that stays in one language. Two other constraints shaped the work before any model
training started:

- **Akan orthography in the training transcripts was inconsistent** across thousands of samples,
  which meant a text-normalization pipeline had to exist before fine-tuning could produce a model
  that generalized rather than memorized transcript quirks.
- **Translation had to work in both directions** — Akan to English and English to Akan — since a
  one-way model only covers half of an actual conversation.
- **Serving latency mattered downstream**: these models feed a live pipeline, not a batch job, so
  inference speed was a design constraint on the serving layer, not an afterthought.

## Architecture

<svg viewBox="0 0 800 260" role="img" aria-label="Speech-to-text: Whisper fine-tuned on normalized, code-switched Akan transcripts. Machine translation: bidirectional NLLB-200 between Akan and English, tracked in MLflow. Text-to-speech: a custom-trained Akan voice. All three packaged for serving behind NVIDIA Triton, fronted by a FastAPI gateway handling auth and rate limiting, with Terraform and Ansible configs Philip authored that the cloud engineer applies to provision the running cluster." class="my-8 w-full text-slate-700 dark:text-slate-300">
  <defs>
    <marker id="arrow-akan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <g font-size="13" fill="currentColor">
    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="20" y="20" width="160" height="52" rx="6" />
      <rect x="20" y="90" width="160" height="52" rx="6" />
      <rect x="20" y="160" width="160" height="52" rx="6" />
    </g>
    <text x="100" y="42" text-anchor="middle" font-weight="600">STT</text>
    <text x="100" y="58" text-anchor="middle" font-size="11" opacity="0.75">Whisper, fine-tuned</text>
    <text x="100" y="112" text-anchor="middle" font-weight="600">MT</text>
    <text x="100" y="128" text-anchor="middle" font-size="11" opacity="0.75">NLLB-200, bidirectional</text>
    <text x="100" y="182" text-anchor="middle" font-weight="600">TTS</text>
    <text x="100" y="198" text-anchor="middle" font-size="11" opacity="0.75">custom Akan voice</text>

    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="240" y="20" width="170" height="192" rx="6" />
    </g>
    <text x="325" y="55" text-anchor="middle" font-weight="600" font-size="12">Text normalization</text>
    <text x="325" y="72" text-anchor="middle" font-size="11" opacity="0.75">Akan orthography</text>
    <text x="325" y="88" text-anchor="middle" font-size="11" opacity="0.75">cleanup, pre-training</text>
    <text x="325" y="150" text-anchor="middle" font-size="11" opacity="0.75">MLflow tracking:</text>
    <text x="325" y="167" text-anchor="middle" font-size="11" opacity="0.75">WER, BLEU,</text>
    <text x="325" y="184" text-anchor="middle" font-size="11" opacity="0.75">chrF++, ROUGE</text>

    <line x1="180" y1="46" x2="235" y2="46" marker-end="url(#arrow-akan)" stroke="currentColor" stroke-width="1.5" />
    <line x1="180" y1="116" x2="235" y2="116" marker-end="url(#arrow-akan)" stroke="currentColor" stroke-width="1.5" />

    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="470" y="90" width="150" height="52" rx="6" />
    </g>
    <text x="545" y="112" text-anchor="middle" font-weight="600" font-size="12">NVIDIA Triton</text>
    <text x="545" y="128" text-anchor="middle" font-size="11" opacity="0.75">low-latency serving</text>
    <line x1="410" y1="46" x2="465" y2="95" marker-end="url(#arrow-akan)" stroke="currentColor" stroke-width="1.5" />
    <line x1="410" y1="116" x2="465" y2="116" marker-end="url(#arrow-akan)" stroke="currentColor" stroke-width="1.5" />
    <line x1="180" y1="186" x2="465" y2="138" marker-end="url(#arrow-akan)" stroke="currentColor" stroke-width="1.5" />

    <g stroke="currentColor" stroke-width="1.5" fill="none">
      <rect x="670" y="90" width="110" height="52" rx="6" />
    </g>
    <text x="725" y="112" text-anchor="middle" font-weight="600" font-size="12">FastAPI</text>
    <text x="725" y="128" text-anchor="middle" font-size="11" opacity="0.75">auth, rate limit</text>
    <line x1="620" y1="116" x2="665" y2="116" marker-end="url(#arrow-akan)" stroke="currentColor" stroke-width="1.5" />

    <g stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="4 3">
      <rect x="470" y="180" width="310" height="46" rx="6" />
    </g>
    <text x="625" y="198" text-anchor="middle" font-size="12" font-weight="600">Terraform / Ansible (authored here)</text>
    <text x="625" y="215" text-anchor="middle" font-size="11" opacity="0.75">applied by our cloud engineer to provision the cluster</text>
    <line x1="545" y1="142" x2="545" y2="178" marker-end="url(#arrow-akan)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3" />
  </g>
</svg>

Three models, one serving layer. **Speech-to-text**: Whisper fine-tuned on real, code-switched
farmer speech, after a text-normalization pass cleaned inconsistent Akan orthography across
thousands of transcripts — normalization came first because a model trained directly on
inconsistent transcripts would learn the inconsistency along with the language. **Machine
translation**: a bidirectional Akan–English NLLB-200 model, with WER, BLEU, chrF++ and ROUGE
tracked in MLflow across training runs. **Text-to-speech**: a custom-trained Akan voice.

All three were packaged for serving behind an NVIDIA Triton server, fronted by a FastAPI gateway
handling auth and rate limiting, validated with a dashboard benchmarking latency and throughput.
I authored the Terraform and Ansible configuration for the serving cluster; our cloud engineer
applies it to provision and run the infrastructure.

## Key decisions

**Building a text-normalization pipeline before fine-tuning, rather than training on raw
transcripts.** Akan orthography wasn't consistent across the transcript set, and a model
fine-tuned directly on that inconsistency would reproduce it rather than learn past it. The
normalization pass added upfront work but meant the fine-tuning data actually represented the
language rather than the noise in how it happened to be transcribed.

**A bidirectional MT model instead of two one-way models.** A single Akan↔English NLLB-200 model
covers both directions of an actual conversation, rather than requiring two models and a routing
decision about which one to call.

**Triton for serving, with the IaC authored here and applied by the cloud engineer.** Packaging
the models for Triton and building the FastAPI gateway kept the model-serving concerns (batching,
latency, versioning) in my hands, while cluster provisioning went through Terraform/Ansible
configs I wrote but our cloud engineer runs — a split that let each side own what they were
positioned to own.

## Results

- **STT:** roughly 7% word error rate on real, code-switched farmer speech — an internal,
  held-out evaluation set, not a published benchmark.
- **MT:** BLEU score of 81 on the bidirectional Akan–English model, tracked in MLflow alongside
  chrF++ and ROUGE.
- **Serving:** validated with a dashboard benchmarking latency and throughput against the Triton
  deployment.

## What I'd do differently

<!-- CONFIRM (Philip): this is a drafted placeholder, not your actual retrospective — replace
     with what you'd really say you'd change. -->

Given more time, I'd invest earlier in an active-learning loop for the transcript set — sampling
the lowest-confidence Whisper outputs for human correction — rather than normalizing a fixed
transcript pool once and fine-tuning against it, since code-switched speech in the field keeps
producing new orthography edge cases after training.
