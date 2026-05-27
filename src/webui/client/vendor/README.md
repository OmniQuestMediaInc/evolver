<!--
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
-->

# Vendored client assets

| File | Source | Version | License |
|---|---|---|---|
| echarts.min.js | https://github.com/apache/echarts | 5.5.0 | Apache-2.0 |

Vendored so the local Web UI dashboard works fully offline and avoids
leaking a request hint (IP / User-Agent) to a third-party CDN.

## Upgrade procedure

1. `npm view echarts@<version> dist.shasum` to grab the published shasum.
2. `npm view echarts@<version> dist.tarball` to grab the tarball URL.
3. Download tarball, verify shasum, extract `package/dist/echarts.min.js`.
4. Replace the file here, bump the table above, run `node --test test/webui*.test.js`.
