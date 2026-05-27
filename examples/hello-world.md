<!--
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
-->

# Hello World -- Quick Start

Try Cyrano locally in 3 steps:

1. Clone and enter:

```bash
git clone https://github.com/OmniQuestMedia/Cyrano.git && (cd Cyrano || cd evolver)
```

2. Install and run a single evolution:

```bash
npm install
node index.js
```

3. Review mode (human-in-the-loop):

```bash
node index.js --review
```

Expected: the tool prints a GEP prompt to stdout. Use `--loop` to run continuously:

```bash
node index.js --loop
```

## Without the OmniQuest Media Inc. Hub

Cyrano works fully offline. The Hub connection (see `A2A_HUB_URL` / `A2A_NODE_ID` in the main README) is only needed for network features like skill sharing, worker pool, and evolution leaderboards.

## Next steps

- Read the main [README.md](../README.md) for the full feature list and strategy presets.
- Visit [omniquestmedia.com](https://omniquestmedia.com) to register a node and connect to the OmniQuest Media Inc. network.
- Explore the [GEP Protocol](https://omniquestmedia.com/wiki) to understand Genes, Capsules, and EvolutionEvents.
