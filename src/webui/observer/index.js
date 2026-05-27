/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

'use strict';

const { getStatus } = require('./status');
const { getSafetyState } = require('./safety');
const { listRuns, getRun } = require('./runs');
const {
  getAssetOverview,
  listGenes,
  listCapsules,
  listEvents,
  listCandidates,
  listAssetCalls,
  getLineage,
} = require('./assets');
const { getInteractions } = require('./interactions');
const { getPersonality, getMemoryGraph } = require('./personality');
const { listSkills } = require('./skills');
const { getObserverPaths } = require('./paths');
const { tailText } = require('./jsonl');
const { redactText } = require('./redact');

function getEvolverLog(query = {}) {
  const tail = query.tail || 200;
  const text = tailText(getObserverPaths().evolverLogPath, tail);
  return { text: redactText(text), tail: Number(tail) || 200 };
}

module.exports = {
  getStatus,
  getSafetyState,
  listRuns,
  getRun,
  getAssetOverview,
  listGenes,
  listCapsules,
  listEvents,
  listCandidates,
  listAssetCalls,
  getLineage,
  getInteractions,
  getPersonality,
  getMemoryGraph,
  listSkills,
  getEvolverLog,
};
