#!/usr/bin/env node
// Assembles each edition into a self-contained HTML file: shared shell + one dataset.
// No dependencies. Run: node build.js
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const shell = fs.readFileSync(path.join(SRC, 'shell.html'), 'utf8');

const EDITIONS = [
  { data: 'data.workplace.js', out: 'index.html' },
  { data: 'data.school.js',    out: 'teachers.html' }
];

for (const ed of EDITIONS) {
  const dataset = fs.readFileSync(path.join(SRC, ed.data), 'utf8').trim();
  // pull docTitle / docDesc out of the dataset for <head>
  const title = (dataset.match(/docTitle:\s*"((?:[^"\\]|\\.)*)"/) || [,''])[1];
  const desc  = (dataset.match(/docDesc:\s*"((?:[^"\\]|\\.)*)"/)  || [,''])[1];
  if (shell.indexOf('/*__DATASET__*/') === -1) throw new Error('shell missing /*__DATASET__*/ marker');
  const html = shell
    .replace('/*__DATASET__*/', dataset)
    .replace('__DOC_TITLE__', title)
    .replace('__DOC_DESC__', desc);
  fs.writeFileSync(path.join(__dirname, ed.out), html);
  console.log(`built ${ed.out}  (${(html.length/1024).toFixed(1)} KiB)  from ${ed.data}`);
}
