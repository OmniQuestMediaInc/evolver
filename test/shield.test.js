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

describe('shield', function () {
  const shield = require('../src/gep/shield');

  it('exports expected functions', function () {
    assert.strictEqual(typeof shield.activate, 'function');
    assert.strictEqual(typeof shield.check, 'function');
    assert.strictEqual(typeof shield.isDegraded, 'function');
    assert.strictEqual(typeof shield.protectModule, 'function');
  });

  it('isDegraded returns false when no debugger attached', function () {
    assert.strictEqual(shield.isDegraded(), false);
  });

  it('activate does not throw', function () {
    assert.doesNotThrow(function () {
      shield.activate();
    });
  });

  it('check does not throw', function () {
    assert.doesNotThrow(function () {
      shield.check();
    });
  });

  it('protectModule freezes an object', function () {
    const mod = { fn: function () {} };
    shield.protectModule(mod);
    assert.ok(Object.isFrozen(mod));
  });

  it('protectModule handles null gracefully', function () {
    assert.doesNotThrow(function () {
      shield.protectModule(null);
    });
  });

  it('module exports are frozen', function () {
    assert.ok(Object.isFrozen(shield));
  });
});
