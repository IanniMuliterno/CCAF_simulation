#!/usr/bin/env node
/**
 * Validates the question bank. Run before opening a pull request:
 *   node scripts/validate.js
 *
 * Checks structure, answer validity, explanation-token references,
 * and reports domain coverage against the published blueprint weights.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DOMAINS = {
  D1: { name: 'Agentic Architecture & Orchestration', weight: 27 },
  D2: { name: 'Tool Design & MCP Integration', weight: 18 },
  D3: { name: 'Claude Code Configuration & Workflows', weight: 20 },
  D4: { name: 'Prompt Engineering & Structured Output', weight: 20 },
  D5: { name: 'Context Management & Reliability', weight: 15 },
};
const SCENARIOS = ['CS', 'CC', 'MA', 'DP', 'CI', 'DE'];
const SOURCES = ['modeled', 'modeled-adv', 'modeled-gap'];

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync(path.join(__dirname, '..', 'questions.js'), 'utf8'),
  sandbox
);
const questions = sandbox.window.CCAF_QUESTIONS;

const errors = [];
const warnings = [];
const seen = new Set();

if (!Array.isArray(questions) || questions.length === 0) {
  console.error('FAIL: questions.js did not define a non-empty window.CCAF_QUESTIONS');
  process.exit(1);
}

for (const q of questions) {
  const at = `[${q && q.id ? q.id : '<missing id>'}]`;

  if (!q.id) errors.push(`${at} missing id`);
  else if (seen.has(q.id)) errors.push(`${at} duplicate id`);
  else seen.add(q.id);

  if (!DOMAINS[q.dom]) errors.push(`${at} dom must be one of ${Object.keys(DOMAINS).join(', ')}`);
  if (!SCENARIOS.includes(q.scen)) errors.push(`${at} scen must be one of ${SCENARIOS.join(', ')}`);
  if (!SOURCES.includes(q.src)) errors.push(`${at} src must be one of ${SOURCES.join(', ')}`);

  if (!q.stem || !q.stem.trim()) errors.push(`${at} empty stem`);
  if (!q.exp || !q.exp.trim()) errors.push(`${at} empty explanation`);

  if (!Array.isArray(q.opts) || q.opts.length < 2 || q.opts.length > 6) {
    errors.push(`${at} needs between 2 and 6 options`);
    continue;
  }
  if (q.opts.some(o => !o || !o.trim())) errors.push(`${at} has an empty option`);

  if (!Array.isArray(q.correct) || q.correct.length === 0) {
    errors.push(`${at} needs at least one correct index`);
    continue;
  }
  if (new Set(q.correct).size !== q.correct.length) errors.push(`${at} repeats a correct index`);
  for (const c of q.correct) {
    if (!Number.isInteger(c) || c < 0 || c >= q.opts.length) {
      errors.push(`${at} correct index ${c} is out of range`);
    }
  }
  if (q.correct.length === q.opts.length) errors.push(`${at} marks every option correct`);
  if (q.correct.length > 1 && !q.multi) {
    errors.push(`${at} has multiple answers but is missing multi:true`);
  }
  if (q.multi && q.correct.length === 1) {
    warnings.push(`${at} sets multi:true but has a single answer`);
  }
  if (q.multi && !/select\s+(two|three|all)/i.test(q.stem)) {
    warnings.push(`${at} is multi-response but the stem does not say how many to select`);
  }

  // {n} tokens in explanations must reference real option indices
  const tokens = [...q.exp.matchAll(/\{(\d+)\}/g)].map(m => Number(m[1]));
  for (const n of tokens) {
    if (n >= q.opts.length) errors.push(`${at} explanation references {${n}} but only has ${q.opts.length} options`);
  }
  for (const n of tokens) {
    if (q.correct.includes(n)) {
      warnings.push(`${at} explanation token {${n}} points at a correct option — tokens normally cite distractors`);
    }
  }
  // bare letter references break under shuffling
  if (/\b(?:Option\s+[A-D]|answer\s+[A-D])\b/.test(q.exp)) {
    errors.push(`${at} explanation names a literal option letter; use {n} tokens instead (options are shuffled)`);
  }
}

// coverage report
const counts = {};
Object.keys(DOMAINS).forEach(d => (counts[d] = 0));
questions.forEach(q => { if (counts[q.dom] !== undefined) counts[q.dom]++; });

console.log(`\nQuestions: ${questions.length}\n`);
console.log('Domain coverage vs blueprint weight');
for (const [d, meta] of Object.entries(DOMAINS)) {
  const pct = (counts[d] / questions.length) * 100;
  const drift = pct - meta.weight;
  const flag = Math.abs(drift) > 7 ? '  <-- consider rebalancing' : '';
  console.log(
    `  ${d}  ${String(counts[d]).padStart(3)}  ${pct.toFixed(1).padStart(5)}%  target ${String(meta.weight).padStart(2)}%${flag}`
  );
}

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  warnings.forEach(w => console.log('  ! ' + w));
}

if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  errors.forEach(e => console.log('  x ' + e));
  console.log('\nFAILED\n');
  process.exit(1);
}

console.log('\nAll checks passed.\n');
