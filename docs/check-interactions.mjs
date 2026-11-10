// DOM logic tests only: these do not verify rendering or native browser focus behavior.
// Install test tools under outputs/qa, leaving the website dependency-free.
import { JSDOM } from '../outputs/qa/node_modules/jsdom/lib/api.js';
import * as csstree from '../outputs/qa/node_modules/css-tree/lib/index.js';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = new URL('../',import.meta.url);
const html = await readFile(new URL('index.html',root),'utf8');
const source = await readFile(new URL('js/main.js',root),'utf8');
for(const file of ['css/style.css','css/responsive.css']) {
  const css = await readFile(new URL(file,root),'utf8');
  const errors=[];
  csstree.parse(css,{onParseError:error=>errors.push(error)});
  assert.equal(errors.length,0,`${file} CSS syntax`);
}
const tick = () => new Promise(resolve=>setImmediate(resolve));
async function fixture(reduced=false, animated=false) {
  const dom = new JSDOM(html,{url:'http://localhost/forme/index.html',runScripts:'outside-only',pretendToBeVisual:true});
  const {window:w} = dom;
  const media = new Map();
  w.matchMedia=query=>{
    if(!media.has(query))media.set(query,{matches:query.includes('reduced-motion')?reduced:false,addEventListener(){}});
    return media.get(query);
  };
  const pending = new Map();
  w.Image = class {
    set src(value) {this.path=value;}
    decode() {return new Promise((resolve,reject)=>pending.set(this.path,{resolve,reject}));}
  };
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  const layout={heroHeight:900};
  w.document.querySelector('.hero').getBoundingClientRect=()=>({top:-w.scrollY,bottom:layout.heroHeight-w.scrollY});
  const scrollCalls=[];
  w.scrollTo=options=>scrollCalls.push(options);
  const animations=[];
  if(animated)w.HTMLElement.prototype.animate=function(){
    let finish,cancel;
    const finished=new Promise((resolve,reject)=>{finish=resolve;cancel=()=>reject(new Error('cancelled'));});
    const animation={finished,finish,cancel};animations.push(animation);return animation;
  };
  w.eval(source);
  return {dom,w,d:w.document,pending,animations,layout,scrollCalls};
}
const a=await fixture(true);
const {d,w}=a;
assert.ok(d.querySelector('.site-header').classList.contains('header--overlay'));
assert.equal(d.querySelector('.site-header').classList.contains('header--compact'),false);
const topButton=d.querySelector('.back-to-top');
assert.ok(topButton.hidden,'Hidden while hero is visible');
w.scrollY=899;w.dispatchEvent(new w.Event('scroll'));
assert.ok(topButton.hidden,'Hidden with even one pixel of hero remaining');
w.scrollY=900;w.dispatchEvent(new w.Event('scroll'));
assert.equal(topButton.hidden,false,'Shown after leaving hero');
a.layout.heroHeight=1200;w.dispatchEvent(new w.Event('resize'));
assert.ok(topButton.hidden,'Resize rechecks the actual hero boundary');
a.layout.heroHeight=900;w.dispatchEvent(new w.Event('resize'));
assert.equal(topButton.hidden,false);
topButton.click();
assert.equal(a.scrollCalls.at(-1).top,0);
assert.equal(a.scrollCalls.at(-1).behavior,'auto','Respect reduced motion');
assert.equal(d.activeElement,d.querySelector('.wordmark'),'Return keyboard focus to the header');
w.scrollY=850;w.dispatchEvent(new w.Event('scroll'));
assert.ok(topButton.hidden,'Hide on reentering hero');
w.scrollY=1000;w.dispatchEvent(new w.Event('pageshow'));
assert.equal(topButton.hidden,false,'Restore on history navigation');
w.scrollY=0;w.dispatchEvent(new w.Event('pageshow'));
assert.ok(topButton.hidden);
w.scrollY=24;w.dispatchEvent(new w.Event('scroll'));
assert.ok(d.querySelector('.site-header').classList.contains('header--overlay'));
w.scrollY=25;w.dispatchEvent(new w.Event('scroll'));
assert.ok(d.querySelector('.site-header').classList.contains('header--compact'));
assert.ok(d.documentElement.classList.contains('header-is-scrolled'));
w.scrollY=48;w.dispatchEvent(new w.Event('scroll'));
assert.equal(d.querySelector('.site-header').classList.contains('header--overlay'),false);
w.scrollY=0;w.dispatchEvent(new w.Event('scroll'));
assert.ok(d.querySelector('.site-header').classList.contains('header--overlay'));
assert.equal(d.querySelector('.site-header').classList.contains('header--compact'),false);
assert.equal(d.documentElement.classList.contains('header-is-scrolled'),false);
w.scrollY=200;w.dispatchEvent(new w.Event('pageshow'));
assert.ok(d.querySelector('.site-header').classList.contains('header--compact'),'Restore compact header on history navigation');
w.scrollY=0;w.dispatchEvent(new w.Event('pageshow'));
assert.equal(d.querySelector('.site-header').classList.contains('header--compact'),false);
for(const card of d.querySelectorAll('.product-card')) {
  const button=card.querySelector('.card-trigger');button.click();
  assert.ok(d.querySelector('dialog').open);
  assert.equal(d.querySelector('#dialog-title').textContent,button.textContent);
  assert.ok(d.querySelector('.dialog-disclaimer').textContent.includes('구매·장바구니·결제를 지원하지 않습니다'));
  d.querySelector('.dialog-close').click();assert.equal(d.activeElement,button);
}
for(const card of d.querySelectorAll('.journal-card')) {
  const button=card.querySelector('.card-trigger');button.click();
  assert.equal(d.querySelector('#dialog-title').textContent,button.textContent);
  d.querySelector('.dialog-close').click();
}
const buttons=[...d.querySelectorAll('[data-step]')];
for(const button of buttons) {
  const previous=d.querySelector('[data-step][aria-expanded="true"]');
  const previousImage=d.querySelector('#ritual-image').getAttribute('src');
  const previousSummary=d.querySelector('#ritual-description').textContent;
  button.click();
  assert.equal(d.querySelector('[data-step][aria-expanded="true"]'),previous,'Keep the current panel while decoding');
  assert.equal(d.querySelector('#ritual-image').getAttribute('src'),previousImage);
  assert.equal(d.querySelector('#ritual-description').textContent,previousSummary);
  assert.equal(d.querySelector('.ritual-caption').getAttribute('aria-busy'),'true');
  a.pending.get(`assets/images/${button.dataset.ritualProduct}.jpg`).resolve();await tick();
  assert.equal(d.querySelectorAll('[data-step][aria-expanded="true"]').length,1);
  assert.equal(d.querySelectorAll('.step-content:not([hidden])').length,1);
  assert.ok(d.querySelector('#ritual-image').src.endsWith(`${button.dataset.ritualProduct}.jpg`));
  assert.equal(d.querySelectorAll('.ritual-image-stage img').length,1);
  const link=d.getElementById(button.getAttribute('aria-controls')).querySelector('[data-product]');
  assert.equal(link.dataset.product,button.dataset.ritualProduct);
  assert.equal(d.querySelector('#ritual-description').textContent,link.parentElement.querySelector('p').textContent,'Summary and panel stay in sync');
  assert.equal(d.querySelector('.ritual-caption').getAttribute('aria-busy'),'false');
  button.click();await tick();
  assert.equal(button.getAttribute('aria-expanded'),'true','Reselecting the current step keeps one panel open');
}
buttons[0].focus();buttons[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowUp',bubbles:true}));
assert.equal(d.activeElement,buttons[3]);
buttons[3].dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));assert.equal(d.activeElement,buttons[0]);
buttons[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(d.activeElement,buttons[3]);
for(const key of ['account','cart']) {
  const trigger=d.querySelector(`[data-info="${key}"]`);trigger.click();
  assert.ok(d.querySelector('dialog').open);
  d.querySelector('.dialog-close').click();assert.equal(d.activeElement,trigger);
}
const search=d.querySelector('[data-search]');search.click();
const input=d.querySelector('#product-search');input.value='세럼';input.dispatchEvent(new w.Event('input'));
assert.equal(d.querySelectorAll('[data-search-result]:not([hidden])').length,1);
d.querySelector('[data-search-result="serum"]').click();
assert.equal(d.querySelector('#dialog-title').textContent,'Balance Serum');
d.querySelector('.dialog-close').click();assert.equal(d.activeElement,search);
search.click();d.querySelector('#product-search').value='없는상품';d.querySelector('#product-search').dispatchEvent(new w.Event('input'));
assert.equal(d.querySelectorAll('[data-search-result]:not([hidden])').length,0);
assert.equal(d.querySelector('#search-status').textContent,'검색 결과가 없습니다.');
d.querySelector('.dialog-close').click();
assert.equal(d.querySelector('.menu-toggle'),null);
a.dom.window.close();

// Deliberately resolve old image requests after newer requests.
const b=await fixture(true);
const steps=[...b.d.querySelectorAll('[data-step]')];
steps[1].click();steps[2].click();
b.pending.get('assets/images/serum.jpg').resolve();await tick();
b.pending.get('assets/images/toner.jpg').resolve();await tick();
assert.ok(b.d.querySelector('#ritual-image').src.endsWith('serum.jpg'));
assert.equal(steps[2].getAttribute('aria-expanded'),'true');
// On image failure, restore the product that is actually displayed.
steps[3].click();b.pending.get('assets/images/cream.jpg').reject(new Error('image unavailable'));await tick();
assert.equal(steps[2].getAttribute('aria-expanded'),'true');
assert.equal(b.d.querySelector('#ritual-image-stage').getAttribute('aria-busy'),'false');
assert.equal(b.d.querySelector('.ritual-caption').getAttribute('aria-busy'),'false');
assert.equal(b.d.querySelector('#ritual-description').textContent,b.d.querySelector('#step-balance p').textContent);
b.dom.window.close();

// Rapid clicks also cancel the previous fade and eventually leave one image.
const c=await fixture(false,true);
const controls=[...c.d.querySelectorAll('[data-step]')];
controls[1].click();c.pending.get('assets/images/toner.jpg').resolve();await tick();
controls[3].click();c.pending.get('assets/images/cream.jpg').resolve();await tick();
c.animations.at(-1).finish();await tick();
assert.ok(c.d.querySelector('#ritual-image').src.endsWith('cream.jpg'));
assert.equal(c.d.querySelectorAll('.ritual-image-stage img').length,1);
c.w.scrollY=900;c.w.dispatchEvent(new c.w.Event('scroll'));
c.d.querySelector('.back-to-top').click();
assert.equal(c.scrollCalls.at(-1).behavior,'smooth','Smooth scroll when motion is allowed');
c.dom.window.close();

// A failed request during an earlier fade must leave a single matching image.
const e=await fixture(false,true);
const fadingSteps=[...e.d.querySelectorAll('[data-step]')];
fadingSteps[1].click();e.pending.get('assets/images/toner.jpg').resolve();await tick();
fadingSteps[3].click();e.pending.get('assets/images/cream.jpg').reject(new Error('offline during fade'));await tick();
assert.equal(e.d.querySelectorAll('.ritual-image-stage img').length,1);
assert.equal(fadingSteps[1].getAttribute('aria-expanded'),'true');
assert.ok(e.d.querySelector('#ritual-image').src.endsWith('toner.jpg'));
assert.equal(e.d.querySelector('#ritual-description').textContent,e.d.querySelector('#step-prepare p').textContent);
assert.equal(e.d.querySelector('.ritual-caption').getAttribute('aria-busy'),'false');
e.dom.window.close();
console.log('PASS: CSS syntax, product/journal/account/cart dialogs, search filtering and focus restoration, step/product/image mapping, single open panel, keyboard navigation, out-of-order image loads, failed image recovery, cancelled fades, reduced-motion path.');
console.log('DOM simulation only; browser rendering, native modal behavior and visual/touch-target verification remain unverified.');
