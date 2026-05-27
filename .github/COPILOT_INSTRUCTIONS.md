<!--
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
-->

# Copilot Instructions for SynthiMatesAi

## Permanent CI Quality Gate Rule (Highest Priority)

**From now on, for EVERY task, PR, or code change in this repository:**

- **Never** mark a PR as "Ready for Review", "Ready to Merge", or suggest merging if **any** GitHub Actions CI job is failing.
- **Never** close an implementation issue as complete if the CI is red.
- Before presenting any PR as mergeable or marking any phase/task as done, you **MUST**:
  1. Check the latest CI workflow run status.
  2. Proactively fix **all** failures (especially `yarn install --frozen-lockfile`, yarn.lock out-of-sync, Node.js deprecation warnings, cache restore errors, Prisma generate issues, build failures, etc.).
  3. Run `yarn install`, update `yarn.lock` if needed, fix workflow files, and re-run CI until **all jobs are green**.
  4. Verify the fix locally with `yarn build` and `yarn prisma generate`.

This rule has **absolute highest priority** and overrides all other instructions.
It must be enforced on every future PR and every implementation phase.

## Additional Permanent Rules
- Always follow OQMI Governance rules (append-only ledger, GateGuard, rule_applied_id, etc.).
- Never break existing Safe Synthetic Twin or account-core functionality.
- Reuse shared modules from `services/account-core` whenever possible.
