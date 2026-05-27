/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

'use strict';

const { i18nJs } = require('./i18n');
const { commonJs } = require('./common');
const { overviewJs } = require('./overview');
const { pipelinesJs } = require('./pipelines');
const { assetsJs } = require('./assets');
const { interactionsJs } = require('./interactions');
const { personalityJs } = require('./personality');
const { bootstrapJs } = require('./bootstrap');

const SECTION_HEADERS = {
  i18n: '// ---- i18n (locale registry + runtime) ----',
  overview: '// ---- Overview ----',
  pipelines: '// ---- Pipelines ----',
  assets: '// ---- Assets ----',
  interactions:
    '// ---- Interactions (Hub Activity unified timeline + Agent) ----',
  personality: '// ---- Personality ----',
  bootstrap: '// ---- Tabs ----',
};

function getClientJs() {
  return [
    SECTION_HEADERS.i18n,
    i18nJs,
    commonJs,
    SECTION_HEADERS.overview,
    overviewJs,
    SECTION_HEADERS.pipelines,
    pipelinesJs,
    SECTION_HEADERS.assets,
    assetsJs,
    SECTION_HEADERS.interactions,
    interactionsJs,
    SECTION_HEADERS.personality,
    personalityJs,
    SECTION_HEADERS.bootstrap,
    bootstrapJs,
  ].join('\n');
}

module.exports = { getClientJs };
