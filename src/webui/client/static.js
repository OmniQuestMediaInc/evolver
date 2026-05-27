/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { getIndexHtml } = require('./indexHtml');
const { getClientJs } = require('./clientJs');
const { getStylesCss } = require('./stylesCss');

let _vendorEchartsCache = null;
function getVendorEcharts() {
  if (!_vendorEchartsCache) {
    _vendorEchartsCache = fs.readFileSync(
      path.join(__dirname, 'vendor', 'echarts.min.js')
    );
  }
  return _vendorEchartsCache;
}

module.exports = {
  getIndexHtml,
  getClientJs,
  getStylesCss,
  getVendorEcharts,
};
