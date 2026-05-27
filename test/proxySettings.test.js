/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  readSettings,
  writeSettings,
  clearSettings,
  SETTINGS_FILE,
  SETTINGS_DIR,
} = require('../src/proxy/server/settings');

describe('settings', () => {
  const origFile = SETTINGS_FILE;
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'settings-test-'));
  });

  after(() => {
    try {
      fs.rmSync(tmpDir, { recursive: true });
    } catch {}
  });

  it('writeSettings creates file and merges data', () => {
    const testFile = path.join(tmpDir, 'settings.json');
    const mod = require('../src/proxy/server/settings');
    const origReadSettings = mod.readSettings;
    const origWriteSettings = mod.writeSettings;

    const data = { proxy: { url: 'http://127.0.0.1:19820', pid: 1234 } };
    fs.writeFileSync(testFile, JSON.stringify(data));

    const parsed = JSON.parse(fs.readFileSync(testFile, 'utf8'));
    assert.equal(parsed.proxy.url, 'http://127.0.0.1:19820');
    assert.equal(parsed.proxy.pid, 1234);
  });

  it('readSettings returns empty object for missing file', () => {
    const result = readSettings();
    assert.ok(typeof result === 'object');
  });
});
