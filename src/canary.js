/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

// Canary script: run in a forked child process to verify index.js loads
// without crashing. Exit 0 = safe, non-zero = broken.
//
// This is the last safety net before solidify commits an evolution.
// If a patch broke index.js (syntax error, missing require, etc.),
// the canary catches it BEFORE the daemon restarts with broken code.
try {
  require('../index.js');
  process.exit(0);
} catch (e) {
  process.stderr.write(String(e.message || e).slice(0, 500));
  process.exit(1);
}
