#!/usr/bin/env node
// Token lint for Vello components.
//   node tools/token-lint.mjs <file.jsx|file.css> [--json]
// Flags every raw value that should be a semantic token:
//   - hex colors, rgb()/rgba()/hsl() literals
//   - px values not on the 4px scale, or on the scale but written raw
//   - font-family literals, font-weight numbers, font-size px
//   - border-radius px, box-shadow literals, transition durations in ms
//   - raw-ramp tokens (--ink-*, --green-*, --coral-*, …) used where an alias exists
// Exit 0 with a table; exit 1 if any "drift" row exists. Source of the scale: vendor/*.css.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const file = process.argv[2];
if (!file) { console.error('usage: token-lint <file> [--json]'); process.exit(2); }
const json = process.argv.includes('--json');
const src = readFileSync(resolve(file), 'utf8');
const tokensCss = ['colors', 'typography', 'spacing'].map(n => readFileSync(resolve(here, '..', 'vendor', `${n}.css`), 'utf8')).join('\n');

// Known tokens, and the raw-ramp names that have a semantic alias.
const tokens = new Set([...tokensCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map(m => m[1]));
const rawRamps = /^--(ink|paper|white|forest|green|coral|amber|sky|red)(-\d+)?$/;
const scale = new Set([...tokensCss.matchAll(/--space-\d+:\s*(\d+)px/g)].map(m => Number(m[1])));
const findings = [];
const lines = src.split('\n');
// Component-scoped tokens: declared once in this file, with an `unresolved:` comment when no system token fits.
const declared = new Map();
for (const m of src.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);([^\n]*)/gm)) declared.set(m[1], /unresolved/i.test(m[3]) ? 'unresolved' : 'component');

const add = (line, kind, value, suggest) => findings.push({ line: line + 1, kind, value, suggest });

lines.forEach((text, i) => {
  if (/^\s*\/\//.test(text) || /^\s*\*/.test(text)) return;            // comments
  for (const m of text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) add(i, 'drift', m[0], 'a --color / --text / --surface / --border alias');
  for (const m of text.matchAll(/\b(rgba?|hsla?)\([^)]*\)/g)) {
    if (!/var\(--focus-ring/.test(text)) add(i, 'drift', m[0], '--focus-ring, --shadow-* or a color alias');
  }
  // px values, classified by the declaration they sit in (CSS `prop: value;` or JSX `prop: 'value'`).
  for (const d of text.matchAll(/(-{0,2}[a-zA-Z][a-zA-Z-]*)\s*:\s*([^;{}]+)/g)) {
    const prop = d[1].toLowerCase(), value = d[2];
    if (prop.startsWith('--')) { // a declaration of a component token
      for (const m of value.matchAll(/(?<![\w-])(\d+(?:\.\d+)?)px\b/g)) add(i, declared.get(prop) === 'unresolved' ? 'unresolved' : 'drift', `${prop}: ${m[0]}`, declared.get(prop) === 'unresolved' ? 'declared once, question for the designer' : 'a component token without an unresolved: note');
      continue;
    }
    for (const m of value.matchAll(/(?<![\w-])(\d+(?:\.\d+)?)px\b/g)) {
      const n = Number(m[1]);
      if (n <= 3) continue;                                                    // hairlines, rims, ring widths
      if (/font-?size/.test(prop)) add(i, 'drift', `${prop}: ${m[0]}`, '--text-xs … --text-xl (type scale)');
      else if (/radius/.test(prop)) add(i, 'drift', `${prop}: ${m[0]}`, '--radius-xs … --radius-pill');
      else if (scale.has(n)) add(i, 'drift', `${prop}: ${m[0]}`, `--space-${[...tokensCss.matchAll(/--space-(\d+):\s*(\d+)px/g)].find(x => Number(x[2]) === n)?.[1]}`);
      else add(i, 'drift', `${prop}: ${m[0]}`, 'not on the 4px scale: a --space-* step, or unresolved');
    }
  }
  for (const m of text.matchAll(/font-family\s*:\s*['"]?([A-Za-z][^;'"]*)/g)) if (!/^var\(/.test(m[1].trim())) add(i, 'drift', m[1].trim(), '--font-display / --font-sans / --font-mono');
  for (const m of text.matchAll(/fontFamily\s*:\s*['"]([^'"]*)['"]/g)) if (!/^var\(/.test(m[1])) add(i, 'drift', m[1], '--font-display / --font-sans / --font-mono');
  for (const m of text.matchAll(/font-weight\s*:\s*(\d{3})\b/g)) add(i, 'drift', m[1], '--fw-regular / --fw-medium / --fw-semibold / --fw-bold');
  for (const m of text.matchAll(/fontWeight\s*:\s*(\d{3})\b/g)) add(i, 'drift', m[1], '--fw-*');
  for (const m of text.matchAll(/(?<![\w-])(\d{2,4})ms\b/g)) add(i, 'drift', m[0], '--dur-fast / --dur-base / --dur-slow');
  for (const m of text.matchAll(/var\((--[a-z0-9-]+)\)/g)) {
    const t = m[1];
    if (!tokens.has(t)) add(i, declared.has(t) ? 'component' : 'unknown', t, declared.has(t) ? '' : 'not defined in tokens/*.css');
    else if (rawRamps.test(t)) add(i, 'raw-ramp', t, 'use the semantic alias ("Do not reference these directly … unless no alias fits")');
    else add(i, 'token', t, '');
  }
});

const counts = findings.reduce((a, f) => ((a[f.kind] = (a[f.kind] || 0) + 1), a), { drift: 0, 'raw-ramp': 0, unknown: 0, unresolved: 0, token: 0, component: 0 }); // zero counts print explicitly: "0 drift" must be a line in the file, not an absence
if (json) { console.log(JSON.stringify({ file, counts, findings }, null, 2)); }
else {
  console.log(`token-lint ${file}`);
  console.log(Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(' · ') || 'no values found');
  for (const f of findings.filter(f => f.kind !== 'token' && f.kind !== 'component')) console.log(`  L${f.line}  ${f.kind.padEnd(8)} ${f.value.padEnd(28)} → ${f.suggest}`);
}
process.exit(counts.drift || counts.unknown ? 1 : 0);
