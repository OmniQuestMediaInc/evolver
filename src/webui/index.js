/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

'use strict';

const { WebUiServer } = require('./server/http');

async function startWebUi(opts = {}) {
  const server = new WebUiServer(opts);
  const info = await server.start();
  return { server, ...info };
}

module.exports = {
  startWebUi,
  WebUiServer,
};
