#!/usr/bin/env node
// Bundle one component into a self-contained HTML page:
//   node tools/build.mjs <Component.jsx> <harness.jsx> <out.html> [title]
// Inlines React 18 UMD, the Vello token CSS (verbatim from the design-system site),
// the component's CSS (Component.css beside the JSX, if present), and esbuild's JSX output.
// Fonts: vendor/fonts-local.css (the Google Fonts woff2 files, inlined) so the page opens offline.
// Avatars: https://i.pravatar.cc/144?img=NN in the harness is replaced by vendor/avatars/NN.jpg as a data URI.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const [jsx, harness, out, title = 'Vello ProviderCard'] = process.argv.slice(2);
if (!jsx || !harness || !out) { console.error('usage: build <Component.jsx> <harness.jsx> <out.html> [title]'); process.exit(2); }

const vendor = n => readFileSync(resolve(here, '..', 'vendor', n), 'utf8');
const compile = f => execFileSync('npx', ['--yes', 'esbuild@0.24.0', f, '--jsx=transform', '--format=iife', '--loader:.jsx=jsx', '--log-level=warning'], { encoding: 'utf8' });

const css = ['colors', 'typography', 'spacing', 'base'].map(n => vendor(n + '.css')).join('\n');
const compCss = existsSync(jsx.replace(/\.jsx$/, '.css')) ? readFileSync(jsx.replace(/\.jsx$/, '.css'), 'utf8') : '';
const fonts = vendor('fonts-local.css');
const inlineAvatars = js => js.replace(/https:\/\/i\.pravatar\.cc\/144\?img=(\d+)/g, (_, n) => 'data:image/jpeg;base64,' + readFileSync(resolve(here, '..', 'vendor', 'avatars', n + '.jpg')).toString('base64'));

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
/* ===== fonts, self-hosted (vendor/fonts-local.css) ===== */
${fonts}
/* ===== Vello design-system tokens, verbatim from vello-design-system.vercel.app  ===== */
${css}
/* ===== ${basename(jsx)} styles ===== */
${compCss}
</style>
</head>
<body>
<div id="root"></div>
<script>${vendor('react.production.min.js')}</script>
<script>${vendor('react-dom.production.min.js')}</script>
<script>
${compile(jsx)}
</script>
<script>
${inlineAvatars(compile(harness))}
</script>
</body>
</html>`;
writeFileSync(out, html);
console.log(`${out}  ${(html.length / 1024).toFixed(0)} KB`);
