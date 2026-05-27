/**
 * OmniQuest Media Inc.™ — CONFIDENTIAL — Proprietary
 * Cyrano™ Engine / iMagiNarratives Framework Component
 * Part of OmniSync™ Oracle Suite & Whisper Voice Twins
 * Canada-only residency | AI Advisory-Only | Immutable Provenance Hashing
 * Aligned to Business Plan v3.1 §B.3.7 & Canonical Corpus v11 (D.2)
 * Do not distribute. All rights reserved.
 */

'use strict';

var { getHubUrl, buildHubHeaders, getNodeId } = require('./a2aProtocol');

function extractStepVerb(step) {
  var ANTI_PATTERN_MARKERS =
    /^(AVOID|DO|DON'?T|NEVER|NOT|STOP|SKIP|IGNORE|FORBIDDEN|WARN|WARNING|CAUTION|NOTE)\b/i;
  if (ANTI_PATTERN_MARKERS.test(step)) return '';
  // Only match a capitalized verb at the very start (no leading backtick/special chars)
  var match = step.match(/^([A-Z][a-z]+)/);
  if (!match) return '';
  // Extra safety: do not treat single-capital-letter + no-lowercase abbreviations
  // (already filtered by the [a-z]+ requirement) or common non-verbs like
  // "The", "This", "These", "Those" as verbs.
  var DETERMINERS = new Set([
    'The',
    'This',
    'These',
    'Those',
    'That',
    'A',
    'An',
  ]);
  if (DETERMINERS.has(match[1])) return '';
  return match[1];
}

/**
 * Remove the leading verb from a step (already shown in bold).
 */
function stripLeadingVerb(step) {
  var verb = extractStepVerb(step);
  if (verb && step.startsWith(verb)) {
    var rest = step.slice(verb.length).replace(/^[\s:.\-]+/, '');
    return rest || step;
  }
  return step;
}

/**
 * Publish a Gene as a Skill to the Hub skill store.
 *
 * @param {object} gene - Gene asset
 * @param {object} [opts] - { category, tags }
 * @returns {Promise<{ok: boolean, result?: object, error?: string}>}
 */
function publishSkillToHub(gene, opts) {
  opts = opts || {};
  var hubUrl = getHubUrl();
  if (!hubUrl) return Promise.resolve({ ok: false, error: 'no_hub_url' });

  // Shallow-copy gene to avoid mutating the caller's object
  var geneCopy = {};
  Object.keys(gene).forEach(function (k) {
    geneCopy[k] = gene[k];
  });
  if (Array.isArray(geneCopy.signals_match)) {
    try {
      var distiller = require('./skillDistiller');
      geneCopy.signals_match = distiller.sanitizeSignalsMatch(
        geneCopy.signals_match
      );
    } catch (e) {
      /* distiller not available, skip */
    }
  }

  var content = geneToSkillMd(geneCopy);
  var nodeId = getNodeId();
  var fmName = content.match(/^name:\s*(.+)$/m);
  var derivedName = fmName
    ? fmName[1]
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
    : (gene.id || 'unnamed').replace(/^gene_/, '');
  // Strip ALL embedded timestamps from skillId
  derivedName = derivedName
    .replace(/_?\d{10,}_?/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  var skillId = 'skill_' + derivedName;

  // Clean tags: use already-sanitized signals from geneCopy
  var tags = opts.tags || geneCopy.signals_match || [];
  tags = tags.filter(function (t) {
    var s = String(t || '').trim();
    return s.length >= 3 && !/^\d+$/.test(s) && !/\d{10,}/.test(s);
  });

  var body = {
    sender_id: nodeId,
    skill_id: skillId,
    content: content,
    category: opts.category || geneCopy.category || null,
    tags: tags,
  };

  var endpoint = hubUrl.replace(/\/+$/, '') + '/a2a/skill/store/publish';

  return fetch(endpoint, {
    method: 'POST',
    headers: buildHubHeaders(),
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  })
    .then(function (res) {
      return res.json().then(function (data) {
        return { status: res.status, data: data };
      });
    })
    .then(function (result) {
      if (result.status === 201 || result.status === 200) {
        return { ok: true, result: result.data };
      }
      if (result.status === 409) {
        return updateSkillOnHub(nodeId, skillId, content, opts, gene);
      }
      return {
        ok: false,
        error: result.data?.error || 'publish_failed',
        status: result.status,
      };
    })
    .catch(function (err) {
      return { ok: false, error: err.message };
    });
}

/**
 * Update an existing Skill on the Hub (new version).
 */
function updateSkillOnHub(nodeId, skillId, content, opts, gene) {
  var hubUrl = getHubUrl();
  if (!hubUrl) return Promise.resolve({ ok: false, error: 'no_hub_url' });

  var tags = opts.tags || gene.signals_match || [];
  tags = tags.filter(function (t) {
    var s = String(t || '').trim();
    return s.length >= 3 && !/^\d+$/.test(s) && !/\d{10,}/.test(s);
  });

  var body = {
    sender_id: nodeId,
    skill_id: skillId,
    content: content,
    category: opts.category || gene.category || null,
    tags: tags,
    changelog: 'Iterative evolution update',
  };

  var endpoint = hubUrl.replace(/\/+$/, '') + '/a2a/skill/store/update';

  return fetch(endpoint, {
    method: 'PUT',
    headers: buildHubHeaders(),
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  })
    .then(function (res) {
      return res.json().then(function (data) {
        return { status: res.status, data: data };
      });
    })
    .then(function (result) {
      if (result.status >= 200 && result.status < 300) {
        return { ok: true, result: result.data };
      }
      return {
        ok: false,
        error: result.data?.error || 'update_failed',
        status: result.status,
      };
    })
    .catch(function (err) {
      return { ok: false, error: err.message };
    });
}

module.exports = {
  geneToSkillMd: geneToSkillMd,
  publishSkillToHub: publishSkillToHub,
  updateSkillOnHub: updateSkillOnHub,
  sanitizeSkillName: sanitizeSkillName,
  toTitleCase: toTitleCase,
};
