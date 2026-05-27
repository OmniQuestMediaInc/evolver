/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

// Evolver Operations Module (src/ops/)
// Non-Feishu, portable utilities for evolver lifecycle and maintenance.

module.exports = {
  lifecycle: require('./lifecycle'),
  skillsMonitor: require('./skills_monitor'),
  cleanup: require('./cleanup'),
  trigger: require('./trigger'),
  commentary: require('./commentary'),
  selfRepair: require('./self_repair'),
};
