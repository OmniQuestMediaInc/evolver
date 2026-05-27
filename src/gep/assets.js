/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

const { computeAssetId, SCHEMA_VERSION } = require('./contentHash');

/**
 * Format asset preview for prompt inclusion.
 * Handles stringified JSON, arrays, and error cases gracefully.
 */
function formatAssetPreview(preview) {
  if (!preview) return '(none)';
  if (typeof preview === 'string') {
    try {
      const parsed = JSON.parse(preview);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return JSON.stringify(parsed, null, 2);
      }
      return preview; // Keep as string if not array or empty
    } catch (e) {
      return preview; // Keep as string if parse fails
    }
  }
  return JSON.stringify(preview, null, 2);
}

/**
 * Validate and normalize an asset object.
 * Ensures schema version and ID are present.
 */
function normalizeAsset(asset) {
  if (!asset || typeof asset !== 'object') return asset;
  if (!asset.schema_version) asset.schema_version = SCHEMA_VERSION;
  if (!asset.asset_id) {
    try {
      asset.asset_id = computeAssetId(asset);
    } catch (e) {}
  }
  return asset;
}

module.exports = { formatAssetPreview, normalizeAsset };
