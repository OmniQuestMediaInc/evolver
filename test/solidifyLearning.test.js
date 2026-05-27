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
const {
  classifyFailureMode,
  adaptGeneFromLearning,
  buildSoftFailureLearningSignals,
} = require('../src/gep/solidify');

describe('classifyFailureMode', () => {
  it('treats validation-only failures as soft and retryable', () => {
    const result = classifyFailureMode({
      constraintViolations: [],
      protocolViolations: [],
      validation: { ok: false, results: [{ ok: false, cmd: 'npm test' }] },
      canary: { ok: true, skipped: false },
    });
    assert.equal(result.mode, 'soft');
    assert.equal(result.reasonClass, 'validation');
    assert.equal(result.retryable, true);
  });

  it('treats destructive constraint failures as hard', () => {
    const result = classifyFailureMode({
      constraintViolations: ['CRITICAL_FILE_DELETED: MEMORY.md'],
      protocolViolations: [],
      validation: { ok: true, results: [] },
      canary: { ok: true, skipped: false },
    });
    assert.equal(result.mode, 'hard');
    assert.equal(result.reasonClass, 'constraint_destructive');
    assert.equal(result.retryable, false);
  });
});

describe('adaptGeneFromLearning', () => {
  it('adds structured success signals back into gene matching', () => {
    const gene = {
      type: 'Gene',
      id: 'gene_test',
      signals_match: ['error'],
    };
    adaptGeneFromLearning({
      gene,
      outcomeStatus: 'success',
      learningSignals: [
        'problem:performance',
        'action:optimize',
        'area:orchestration',
      ],
      failureMode: { mode: 'none', reasonClass: null, retryable: false },
    });
    assert.ok(gene.signals_match.includes('problem:performance'));
    assert.ok(gene.signals_match.includes('area:orchestration'));
    assert.ok(!gene.signals_match.includes('action:optimize'));
    assert.ok(Array.isArray(gene.learning_history));
    assert.equal(gene.learning_history[0].outcome, 'success');
  });

  it('records failed anti-patterns without broadening matching', () => {
    const gene = {
      type: 'Gene',
      id: 'gene_test_fail',
      signals_match: ['protocol'],
    };
    adaptGeneFromLearning({
      gene,
      outcomeStatus: 'failed',
      learningSignals: ['problem:protocol', 'risk:validation'],
      failureMode: { mode: 'soft', reasonClass: 'validation', retryable: true },
    });
    assert.deepEqual(gene.signals_match, ['protocol']);
    assert.ok(Array.isArray(gene.anti_patterns));
    assert.equal(gene.anti_patterns[0].mode, 'soft');
  });
});

describe('buildSoftFailureLearningSignals', () => {
  it('extracts structured tags from validation failures', () => {
    const tags = buildSoftFailureLearningSignals({
      signals: ['perf_bottleneck'],
      failureReason: 'validation_failed: npm test => latency remained high',
      violations: [],
      validationResults: [
        {
          ok: false,
          cmd: 'npm test',
          stderr: 'latency remained high',
          stdout: '',
        },
      ],
    });
    assert.ok(tags.includes('problem:performance'));
    assert.ok(tags.includes('risk:validation'));
  });
});
