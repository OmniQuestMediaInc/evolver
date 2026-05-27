/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

describe('integrityCheck', function () {
  const integrity = require('../src/gep/integrityCheck');

  it('verify returns true when no .integrity file exists', function () {
    const result = integrity.verify();
    assert.strictEqual(result, true);
  });

  it('verify with force=true re-checks (idempotent when no .integrity)', function () {
    const r1 = integrity.verify();
    const r2 = integrity.verify(true);
    assert.strictEqual(r1, true);
    assert.strictEqual(r2, true);
  });

  it('isDegraded returns false initially', function () {
    assert.strictEqual(integrity.isDegraded(), false);
  });

  it('degradedDelay resolves immediately when not degraded', async function () {
    const start = Date.now();
    await integrity.degradedDelay();
    assert.ok(Date.now() - start < 100);
  });

  it('gate returns value unchanged when not degraded', function () {
    assert.strictEqual(integrity.gate(42), 42);
    assert.deepStrictEqual(integrity.gate({ ok: true }), { ok: true });
  });

  it('exports expected functions', function () {
    assert.strictEqual(typeof integrity.verify, 'function');
    assert.strictEqual(typeof integrity.isDegraded, 'function');
    assert.strictEqual(typeof integrity.degradedDelay, 'function');
    assert.strictEqual(typeof integrity.gate, 'function');
  });
});
