import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.dirname(fileURLToPath(import.meta.url));
const html = await readFile(path.join(root,'index.html'),'utf8');
const css = await readFile(path.join(root,'css/style.css'),'utf8');
const js = await readFile(path.join(root,'js/main.js'),'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate element IDs');
assert.equal((html.match(/<section\b/g)||[]).length,9,'Nine main sections');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Single page heading');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  const target=match[1];
  if(target.startsWith('#')) {assert.ok(ids.includes(target.slice(1)),`Missing anchor ${target}`);continue;}
  if(/^(https?:|data:)/.test(target))continue;
  assert.ok((await stat(path.join(root,target))).size>0,`Missing local file ${target}`);
}
for(const match of css.matchAll(/url\('([^']+)'\)/g))assert.ok((await stat(path.resolve(root,'css',match[1]))).size>0,`Missing CSS asset ${match[1]}`);
for(const match of html.matchAll(/aria-controls="([^"]+)"/g))assert.ok(ids.includes(match[1]),`Missing controlled region ${match[1]}`);
for(const match of html.matchAll(/aria-describedby="([^"]+)"/g))for(const id of match[1].split(' '))assert.ok(ids.includes(id),`Missing description ${id}`);
const expectedRitual = ['cleanser','toner','serum','cream'];
for(const [index,key] of expectedRitual.entries()) {
  assert.ok(html.includes(`data-step="${index}" data-ritual-product="${key}"`),`Ritual mapping for ${key}`);
}
for(const type of ['product','journal']) {
  const cards = [...html.matchAll(new RegExp(`<article class="${type}-card reveal">([\\s\\S]*?)</article>`,'g'))];
  assert.equal(cards.length,type==='product'?4:3,`${type} card count`);
  for(const [,card] of cards)assert.equal((card.match(/<button\b/g)||[]).length,1,`Single keyboard target per ${type} card`);
}
const names=['hero','philosophy','serum','cream','cleanser','toner','texture-serum','texture-cream','ritual','campaign-main','campaign-detail','formula','journal-routine','journal-object','journal-self'];
let bytes=0;
for(const name of names){
  const image=await readFile(path.join(root,'assets/images',name+'.jpg'));
  assert.equal(image.readUInt16BE(0),0xffd8,`${name} JPEG signature`);
  assert.equal(image.readUInt16BE(image.length-2),0xffd9,`${name} complete JPEG`);
  bytes+=image.length;
}
assert.ok(css.includes('prefers-reduced-motion'),'Reduced motion support');
assert.ok(js.includes('showModal()'),'Native accessible dialog');
assert.ok(!html.includes('menu-toggle'),'Header has no hamburger menu');
assert.ok(html.includes('포트폴리오용 가상 브랜드'),'Fictional brand disclosure');
assert.ok(!/https?:\/\//.test(css),'Self-hosted styles and fonts');
const imagePrompts=JSON.parse(await readFile(path.join(root,'docs/image-prompts.json'),'utf8'));
assert.equal(imagePrompts.assets.length,15,'All image prompts recorded');
console.log(`PASS: 9 sections, ${ids.length} unique IDs, anchors and ARIA references, local assets, 15 complete JPEGs (${(bytes/1024/1024).toFixed(2)} MiB), font files, demo disclosure, reduced-motion hooks.`);
console.log('Browser rendering and live interactions require the review page; these static checks do not verify layout.');
