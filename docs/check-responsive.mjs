// Static CSS cascade checks only. This does not measure browser layout or visual crop.
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {JSDOM} from '../outputs/qa/node_modules/jsdom/lib/api.js';
import * as css from '../outputs/qa/node_modules/css-tree/lib/index.js';

const root=new URL('../',import.meta.url);
const dom=new JSDOM(await readFile(new URL('index.html',root),'utf8'));
const sheets=await Promise.all(['css/style.css','css/responsive.css'].map(async file=>css.parse(await readFile(new URL(file,root),'utf8'))));
const widths=[1920,1440,1280,1024,768,430,390,360];
function mediaMatches(query,width){
  // All current width queries are conjunctions. Reduced-motion rules are tested separately.
  if(query.includes('prefers-reduced-motion'))return false;
  const ranges=[...query.matchAll(/(min|max)-width:\s*(\d+)px/g)];
  assert.ok(ranges.length,`Unrecognized media query: ${query}`);
  return ranges.every(([,kind,value])=>kind==='min'?width>=Number(value):width<=Number(value));
}
function declarations(element,width){
  const values=new Map();
  function visit(nodes){
    nodes.forEach(node=>{
      if(node.type==='Atrule'){
        if(node.name==='media'&&mediaMatches(css.generate(node.prelude),width))visit(node.block.children);
        return;
      }
      if(node.type!=='Rule'||node.prelude.type!=='SelectorList')return;
      node.prelude.children.forEach(selector=>{
        const text=css.generate(selector);
        if(!element.matches(text))return;
        // The inspected selectors use IDs, classes and types (no :is/:where nesting).
        let specificity=0;
        css.walk(selector,item=>{
          if(item.type==='IdSelector')specificity+=100;
          if(['ClassSelector','AttributeSelector','PseudoClassSelector'].includes(item.type))specificity+=10;
          if(item.type==='TypeSelector'&&item.name!=='*')specificity++;
        });
        node.block.children.forEach(item=>{
          if(item.type!=='Declaration')return;
          const rank=(item.important?1e6:0)+specificity;
          const previous=values.get(item.property);
          if(!previous||rank>=previous.rank)values.set(item.property,{value:css.generate(item.value),rank});
        });
      });
    });
  }
  sheets.forEach(sheet=>visit(sheet.children));
  return Object.fromEntries([...values].map(([key,item])=>[key,item.value]));
}
for(const width of widths){
  const style=selector=>declarations(dom.window.document.querySelector(selector),width);
  const mobile=width<768;
  assert.ok(style('html')['--font'].includes('DM Sans'));
  assert.ok(style('.wordmark')['font-family'].includes('DM Sans'));
  assert.ok(style('.closing-wordmark')['font-family'].includes('DM Sans'));
  assert.equal(style('.hero h1')['letter-spacing'],'-.045em');
  assert.equal(style('.hero h1')['line-height'],'1.06');
  assert.equal(style('.product-name h3')['font-weight'],'500');
  assert.equal(style('.product-card .price')['font-weight'],'500');
  assert.ok(style('.product-description')['font-family'].includes('Pretendard'));
  assert.equal(style('.product-description')['font-weight'],'400');
  assert.equal(style('.back-to-top').position,'fixed');
  assert.equal(style('.back-to-top').width,mobile?'44px':'48px');
  assert.equal(style('.back-to-top').height,mobile?'44px':'48px');
  assert.equal(style('.philosophy').width,style('.essentials>.container').width);
  assert.equal(style('.philosophy')['max-width'],style('.essentials>.container')['max-width']);
  assert.equal(style('.product-grid')['grid-template-columns'],'repeat(2,minmax(0,1fr))');
  assert.equal(style('.essentials .section-heading')['text-align'],'center');
  assert.equal(style('.essentials .section-heading')['align-items'],'center');
  assert.equal(style('.journal-grid')['grid-template-columns'],mobile?'minmax(0,1fr)':'repeat(3,minmax(0,1fr))');
  assert.equal(style('.product-description')['-webkit-line-clamp'],'2');
  assert.equal(style('.ritual-summary').display,mobile?'block':'none');
  if(mobile){
    assert.equal(style('.product-name h3')['font-size'],'16px');
    assert.equal(style('.journal-card h3')['font-size'],'16px');
    assert.equal(style('.product-description')['font-size'],'14px');
    assert.equal(style('.product-card .price')['white-space'],'nowrap');
    assert.equal(style('.header-icon').width,'44px');
    assert.equal(style('.header-icon').height,'44px');
    assert.equal(style('.step-content p').display,'none');
    assert.equal(style('.hero-content').position,'absolute');
    assert.equal(style('.hero-image')['object-fit'],'cover');
    assert.match(style('.hero-image')['object-position'],/^84%\s*bottom$/);
  }
  const header=dom.window.document.querySelector('.site-header');
  header.classList.remove('header--overlay');
  header.classList.add('header--compact');
  dom.window.document.documentElement.classList.add('header-is-scrolled');
  assert.equal(style('html')['--header-compact'],mobile?'96px':width<=1100?'72px':'76px');
  assert.equal(style('.site-header').height,'var(--header-compact)');
  assert.equal(style('.site-header').background,'#fff');
  assert.equal(style('.wordmark')['font-size'],mobile?'26px':'34px');
  assert.ok(style('html')['scroll-padding-top'].includes('--header-compact'));
  if(mobile)assert.equal(style('.desktop-nav a')['line-height'],'44px');
  header.classList.remove('header--compact');
  header.classList.add('header--overlay');
  dom.window.document.documentElement.classList.remove('header-is-scrolled');
  console.log(`PASS static cascade ${width}px: products 2 columns, essentials heading centered, journal ${mobile?1:3} columns, summary ${mobile?'visible':'hidden'}${mobile?', type sizes and header targets checked':''}`);
}
dom.window.close();
console.log('NOT VERIFIED: horizontal overflow, actual text wrapping/crop/contrast, browser focus and native Enter/Space. Use docs/review.html for rendering checks.');
