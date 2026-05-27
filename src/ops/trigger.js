/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

// Evolver Wake Trigger - Evolver Core Module
// Writes a signal file that the wrapper can poll to wake up immediately.

const fs = require('fs');
const path = require('path');
const { getWorkspaceRoot } = require('../gep/paths');

var WAKE_FILE = path.join(getWorkspaceRoot(), 'memory', 'evolver_wake.signal');

function send() {
  try {
    fs.writeFileSync(WAKE_FILE, 'WAKE');
    console.log('[Trigger] Wake signal sent to ' + WAKE_FILE);
    return true;
  } catch (e) {
    console.error('[Trigger] Failed: ' + e.message);
    return false;
  }
}

function clear() {
  try {
    if (fs.existsSync(WAKE_FILE)) fs.unlinkSync(WAKE_FILE);
  } catch (e) {}
}

function isPending() {
  return fs.existsSync(WAKE_FILE);
}

if (require.main === module) {
  send();
}

module.exports = { send, clear, isPending };
