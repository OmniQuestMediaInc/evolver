/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

// Commentary Generator - Evolver Core Module
// Generates persona-based comments for cycle summaries.

var PERSONAS = {
  standard: {
    success: [
      'Evolution complete. System improved.',
      'Another successful cycle.',
      'Clean execution, no issues.',
    ],
    failure: [
      'Cycle failed. Will retry.',
      'Encountered issues. Investigating.',
      'Failed this round. Learning from it.',
    ],
  },
  greentea: {
    success: [
      'Did I do good? Praise me~',
      'So efficient... unlike someone else~',
      'Hmm, that was easy~',
      'I finished before you even noticed~',
    ],
    failure: [
      'Oops... it is not my fault though~',
      'This is harder than it looks, okay?',
      'I will get it next time, probably~',
    ],
  },
  maddog: {
    success: [
      'TARGET ELIMINATED.',
      'Mission complete. Next.',
      'Done. Moving on.',
    ],
    failure: [
      'FAILED. RETRYING.',
      'Obstacle encountered. Adapting.',
      'Error. Will overcome.',
    ],
  },
};

function getComment(options) {
  var persona = (options && options.persona) || 'standard';
  var success = options && options.success !== false;
  var duration = (options && options.duration) || 0;

  var p = PERSONAS[persona] || PERSONAS.standard;
  var pool = success ? p.success : p.failure;
  var comment = pool[Math.floor(Math.random() * pool.length)];

  return comment;
}

if (require.main === module) {
  console.log(
    getComment({ persona: process.argv[2] || 'greentea', success: true })
  );
}

module.exports = { getComment, PERSONAS };
