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
const { getSkillsDir } = require('../../gep/paths');

function listSkills() {
  const dir = getSkillsDir();
  if (!fs.existsSync(dir)) return { exists: false, items: [] };

  const entries = safeReaddir(dir).filter(entry => entry.isDirectory());
  const items = entries.map(entry =>
    buildSkillSummary(path.join(dir, entry.name), entry.name)
  );
  return { exists: true, items };
}

function buildSkillSummary(skillPath, name) {
  const skillFile = findFirstExisting(skillPath, [
    'SKILL.md',
    'skill.md',
    'README.md',
  ]);
  let description = '';
  let bytes = 0;
  if (skillFile) {
    try {
      const stat = fs.statSync(skillFile);
      bytes = stat.size;
      description = extractDescription(skillFile);
    } catch {
      // ignore
    }
  }
  const fileCount = safeReaddir(skillPath).length;
  return {
    name,
    description,
    docFile: skillFile ? path.basename(skillFile) : null,
    docBytes: bytes,
    fileCount,
  };
}

function extractDescription(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const frontmatter = raw.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatter) {
      const desc = frontmatter[1].match(/description\s*:\s*([^\n]+)/);
      if (desc) return desc[1].trim().replace(/^['"]|['"]$/g, '');
    }
    const firstParagraph = raw
      .replace(/^---[\s\S]*?---/, '')
      .trim()
      .split(/\n\s*\n/)[0];
    return firstParagraph.replace(/^#+\s*/, '').slice(0, 240);
  } catch {
    return '';
  }
}

function safeReaddir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function findFirstExisting(dir, names) {
  for (const name of names) {
    const candidate = path.join(dir, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

module.exports = { listSkills };
