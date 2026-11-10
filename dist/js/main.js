'use strict';

const products = {
  serum: { name:'Balance Serum', ko:'밸런스 세럼', volume:'30 ml', price:'₩48,000', step:'03 / BALANCE', description:'피부의 상태를 살피고 나에게 필요한 만큼을 더하는 시간. 가벼운 레이어링을 지향하는 데일리 세럼 콘셉트입니다.', use:'토너 다음 단계에서 소량을 덜어 얼굴에 고르게 펴 바르는 루틴을 제안합니다.' },
  cream: { name:'Barrier Cream', ko:'배리어 크림', volume:'50 ml', price:'₩54,000', step:'04 / PROTECT', description:'손끝에서 피부로 이어지는 부드러운 감각. 일상의 마지막 케어를 위한 보습 크림 콘셉트입니다.', use:'세럼 다음 단계에서 얇게 펴 바르는 루틴을 제안합니다. 자외선 차단 기능을 의미하지 않으며, 아침에는 별도의 자외선 차단제가 필요합니다.' },
  cleanser: { name:'Daily Cleanser', ko:'데일리 클렌저', volume:'200 ml', price:'₩32,000', step:'01 / CLEANSE', description:'피부를 마주하는 가장 첫 번째 순간. 매일의 세안 시간을 담백하게 만드는 클렌저 콘셉트입니다.', use:'젖은 손에 적당량을 덜어 부드럽게 세안한 뒤 미온수로 충분히 헹구는 루틴을 제안합니다.' },
  toner: { name:'Essence Toner', ko:'에센스 토너', volume:'150 ml', price:'₩39,000', step:'02 / PREPARE', description:'다음 손길을 위한 차분한 준비. 피부에 천천히 펴 바르는 에센스 토너 콘셉트입니다.', use:'세안 후 손바닥에 소량을 덜어 가볍게 펴 바르는 루틴을 제안합니다.' }
};
const articles = {
  routine: { title:'피부를 위한 미니멀한 루틴', category:'RITUAL', image:'journal-routine', intro:'좋은 루틴은 제품의 개수로 정해지지 않습니다. 오늘의 피부를 살피고, 필요한 단계를 알아가는 작은 관찰에서 시작됩니다.', sections:[['시작은, 관찰하는 일','아침에 세안하기 전 잠시 피부를 살펴봅니다. 당김은 어떤지, 어제와 다른 감각이 있는지. 누군가에게 익숙한 순서가 나에게도 같은 답이 될 필요는 없습니다. 나만의 기록은 유행보다 오래 남는 기준이 됩니다.'],['네 가지 동사로 돌아가기','씻고, 준비하고, 균형을 살피고, 마무리하기. FORME는 이 네 가지 동사에서 일상의 리추얼을 상상합니다. 단계를 채우는 것보다 각 단계의 목적을 이해할 때, 나에게 필요한 것을 선택하기가 쉬워집니다.'],['반복할 수 있는 편안함','아무리 정교한 루틴이라도 일상에 부담이 된다면 지속하기 어렵습니다. 매일 같은 자리에 두는 제품, 익숙한 손길, 나를 위한 짧은 시간. 아름다움은 그 조용한 반복 안에서도 발견됩니다.'],['덜어낸 자리에 남는 것','미니멀리즘은 무조건 적게 사용하는 규칙이 아닙니다. 내게 맞는 것을 남기는 선택입니다. 피부 상태에 따라 필요한 케어를 조정하고, 지속되는 불편함은 전문가와 상담하세요.']] },
  object: { title:'일상의 오브제가 되는 스킨케어', category:'OBJECT', image:'journal-object', intro:'어떤 물건은 사용하는 순간뿐 아니라, 놓여 있는 모습으로도 우리의 일상에 영향을 줍니다. FORME가 용기의 형태를 고민하는 이유입니다.', sections:[['손이 기억하는 형태','복잡한 장식 대신 단정한 원통, 과장된 광택 대신 차분한 표면. 손에 쥐고 선반에 되돌려 놓는 반복까지 하나의 경험이 됩니다. 디자인은 눈으로 보는 순간에서 끝나지 않습니다.'],['공간을 빼앗지 않는 존재감','아이보리와 차콜은 빛의 방향에 따라 다른 표정을 가집니다. 욕실의 석재, 침실의 나무, 선반의 유리와 자연스럽게 이어지면서도 자신만의 윤곽을 남깁니다. 조화는 때로 가장 조용한 존재감입니다.'],['오래 바라볼 수 있는 것','빠르게 눈길을 끄는 것과 오래 곁에 두고 싶은 것은 다릅니다. 우리는 시간이 지나도 낯설지 않은 비례와 재료의 감각을 생각합니다. 물건을 고르는 기준이 조금 더 개인적이어도 좋습니다.'],['매일의 작은 풍경','아침 햇빛이 닿는 선반 한편에, 정갈하게 접은 수건 옆에. 스킨케어를 꺼내는 장면이 나를 돌보는 신호가 되기를 바랍니다. FORME의 형태는 그 풍경에서 출발합니다.']] },
  self: { title:'나만의 아름다움을 선택하는 기준', category:'PERSPECTIVE', image:'journal-self', intro:'아름다움에 관한 이야기는 넘쳐나지만, 나의 감각을 듣는 시간은 의외로 적습니다. 잠시 시선을 돌려 나에게 편안한 기준을 생각합니다.', sections:[['비교에서 한 걸음 떨어지기','서로 다른 피부와 서로 다른 일상에는 각자의 속도가 있습니다. 화면 속 누군가의 모습보다 오늘 거울 앞의 나를 먼저 봅니다. 피부 위에 지나간 시간과 자연스러운 표정도 나의 일부입니다.'],['좋아하는 감각을 알아가기','가볍게 펼쳐지는 질감, 손안에 들어오는 용기, 조용한 아침의 루틴. 작은 선호를 알아차리는 일이 취향의 시작입니다. 자신에게 맞는 감각을 찾는 과정은 서두를 필요가 없습니다.'],['나에게 필요한 질문','이 제품이 나의 일상에 필요한가요. 사용할 때 편안한가요. 정보가 충분히 설명되어 있나요. 자극적인 약속보다 이런 구체적인 질문이 선택을 도와줍니다. 모르는 정보는 확인하고, 불확실한 표현은 한 번 더 살펴보세요.'],['있는 그대로의 형태','FORME는 하나의 완성된 얼굴을 제안하지 않습니다. 당신만의 기준으로 선택하고, 당신의 속도로 돌보는 일. 본연의 형태에서 발견하는 아름다움은 그렇게 시작됩니다.']] }
};
const dialog = document.querySelector('#detail-dialog');
const dialogContent = document.querySelector('#dialog-content');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let returnFocus = null;

const header = document.querySelector('.site-header');
function updateHeader() {
  header.classList.toggle('header--overlay', window.scrollY <= 24);
}
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});
window.addEventListener('pageshow', updateHeader);

function openDialog(html, trigger) {
  returnFocus = trigger;
  dialogContent.innerHTML = html;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('locked');
  dialog.querySelector('.dialog-close').focus();
}
function productMarkup(key) {
  const p = products[key];
  return `<div class="dialog-product"><img src="assets/images/${key}.jpg" alt="${p.name} 제품 콘셉트" width="1122" height="1402"><div><p class="eyebrow">${p.step}</p><h2 id="dialog-title">${p.name}</h2><p>${p.ko} · ${p.volume}</p><p class="dialog-price">${p.price}</p><p>${p.description}</p><h3>리추얼 제안</h3><p>${p.use}</p><p class="dialog-disclaimer">포트폴리오용 콘셉트 제품입니다. 구매·장바구니·결제를 지원하지 않습니다. 가격, 사용법 및 제형은 데모 정보이며 실제 처방·전성분·효능은 확정되지 않았습니다.</p></div></div>`;
}
const info = {
  account: ['마이페이지', '<p>FORME.는 포트폴리오용 가상 브랜드로, 회원가입과 로그인 서비스를 운영하지 않습니다.</p><p>브랜드의 이야기와 데일리 스킨케어 리추얼을 홈페이지에서 만나보세요.</p>'],
  cart: ['장바구니', '<p>장바구니에 담긴 상품이 없습니다.</p><p>포트폴리오용 콘셉트 사이트로, 실제 상품 담기와 구매는 지원하지 않습니다.</p><p><a class="text-link" href="#essentials" data-close-dialog>제품 살펴보기 ↗</a></p>'],
  formula: ['성분과 처방에 관하여', '<p>FORME.의 제품은 포트폴리오를 위해 기획한 콘셉트입니다. 현재 전성분과 최종 처방은 확정되지 않았습니다.</p><h3>우리가 생각하는 설계 방향</h3><p>보습과 균형을 고려한 사용 경험, 부담 없이 반복할 수 있는 단계, 손끝에 닿는 질감을 중심으로 브랜드의 방향을 제안합니다.</p><h3>정보를 신뢰할 수 있도록</h3><p>특정 성분, 임상 결과, 인증, 저자극 여부 또는 피부 개선 효능을 주장하지 않습니다. 이미지 속 제형과 소재는 시각적 콘셉트이며 실제 제품 조성을 의미하지 않습니다.</p><p class="dialog-disclaimer">실제 출시 시 확정된 전성분, 사용 시 주의사항 및 검증된 정보가 제공되어야 합니다.</p>'],
  contact: ['고객센터 안내', '<p>FORME.는 포트폴리오용 가상 브랜드로, 실제 고객센터와 상담 채널을 운영하지 않습니다.</p><p>판매, 배송, 교환 및 반품 서비스는 제공되지 않습니다. 가상의 연락처나 이메일을 사용하지 않았습니다.</p>'],
  social: ['FORME. on Instagram', '<p>브랜드의 무드를 제안하는 포트폴리오 사이트입니다. 현재 연결된 공식 Instagram 계정은 없습니다.</p><p>캠페인과 브랜드의 이야기는 홈페이지의 Journal에서 확인하실 수 있습니다.</p>'],
  business: ['사업자 정보 안내', '<p>FORME. (포르메)는 웹 디자인 포트폴리오를 위한 가상 브랜드입니다.</p><p>실제 사업체나 판매자가 아니며 사업자등록번호, 통신판매업 신고번호, 주소 및 연락처가 없습니다.</p><p>사이트의 제품·가격·처방 방향은 콘셉트 정보입니다. 사진은 이 프로젝트를 위해 AI로 생성한 브랜드 비주얼이며 모델은 가상의 인물입니다.</p>']
};
function openSearch(trigger) {
  openDialog(`<div class="dialog-article"><p class="eyebrow">FORME. / SEARCH</p><h2 id="dialog-title">제품 검색</h2><label class="header-search-label" for="product-search">제품명으로 검색</label><input class="header-search-input" id="product-search" type="search" placeholder="세럼, 크림, 클렌저, 토너" autocomplete="off"><div class="header-search-results">${Object.entries(products).map(([key,p])=>`<button data-product="${key}" data-search-result="${key}"><span>${p.name}</span><span>${p.ko}</span></button>`).join('')}</div><p id="search-status" role="status">전체 제품 4개</p></div>`, trigger);
  const input = dialog.querySelector('#product-search');
  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase();
    let count = 0;
    dialog.querySelectorAll('[data-search-result]').forEach(button => {
      const p = products[button.dataset.searchResult];
      const matches = `${p.name} ${p.ko}`.toLocaleLowerCase().includes(query);
      button.hidden = !matches;
      if (matches) count++;
    });
    dialog.querySelector('#search-status').textContent = count ? `검색 결과 ${count}개` : '검색 결과가 없습니다.';
  });
  input.focus();
}

document.addEventListener('click', event => {
  const product = event.target.closest('[data-product]');
  const article = event.target.closest('[data-article]');
  const information = event.target.closest('[data-info]');
  const search = event.target.closest('[data-search]');
  if (search) openSearch(search);
  if (event.target.closest('[data-close-dialog]')) dialog.close();
  if (product && products[product.dataset.product]) openDialog(productMarkup(product.dataset.product), dialog.contains(product) ? returnFocus : product);
  if (article && articles[article.dataset.article]) {
    const a = articles[article.dataset.article];
    openDialog(`<article class="dialog-article"><p class="eyebrow">FORME JOURNAL / ${a.category}</p><h2 id="dialog-title">${a.title}</h2><img src="assets/images/${a.image}.jpg" alt="${a.title}"><p>${a.intro}</p>${a.sections.map(([title,copy])=>`<h3>${title}</h3><p>${copy}</p>`).join('')}<p class="dialog-disclaimer">FORME.의 브랜드 관점을 담은 포트폴리오용 에디토리얼입니다.</p></article>`, article);
  }
  if (information && info[information.dataset.info]) {
    const [title,copy] = info[information.dataset.info];
    openDialog(`<div class="dialog-article"><p class="eyebrow">FORME. / INFORMATION</p><h2 id="dialog-title">${title}</h2>${copy}</div>`, information);
  }
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('locked');
  returnFocus?.focus({preventScroll:true});
});
const ritualButtons = [...document.querySelectorAll('[data-step]')];
const ritualStage = document.querySelector('#ritual-image-stage');
const ritualCaption = document.querySelector('.ritual-caption');
const ritualImageCache = new Map();
let ritualRequest = 0;
let ritualAnimation = null;
let renderedRitualButton = ritualButtons[0];
reducedMotion.addEventListener('change', event => {
  if (event.matches) ritualAnimation?.cancel();
});

function loadRitualImage(key) {
  if (!ritualImageCache.has(key)) {
    const image = new Image();
    image.src = `assets/images/${key}.jpg`;
    const ready = image.decode().catch(error => {
      ritualImageCache.delete(key);
      throw error;
    });
    ritualImageCache.set(key, ready);
  }
  return ritualImageCache.get(key);
}

function setRitualState(button) {
  ritualButtons.forEach(other => {
    const selected = button === other;
    other.setAttribute('aria-expanded', String(selected));
    other.querySelector('.step-symbol').textContent = selected ? '−' : '+';
    document.getElementById(other.getAttribute('aria-controls')).hidden = !selected;
    other.closest('.ritual-step').classList.toggle('active', selected);
  });
  document.querySelector('#ritual-number').textContent = `STEP 0${Number(button.dataset.step)+1}`;
  document.querySelector('#ritual-product').textContent = products[button.dataset.ritualProduct].name;
  document.querySelector('#ritual-description').textContent = document.getElementById(button.getAttribute('aria-controls')).querySelector('p').textContent;
}

async function selectRitual(button) {
  const key = button.dataset.ritualProduct;
  const request = ++ritualRequest;
  ritualStage.setAttribute('aria-busy', 'true');
  ritualCaption.setAttribute('aria-busy', 'true');
  try {
    await loadRitualImage(key);
    if (request !== ritualRequest) return;
    ritualAnimation?.cancel();
    const image = document.createElement('img');
    image.id = 'ritual-image';
    image.src = `assets/images/${key}.jpg`;
    image.alt = `STEP 0${Number(button.dataset.step)+1} ${button.querySelector('.step-name').textContent} — ${products[key].name} 제품 콘셉트`;
    image.width = 1122;
    image.height = 1402;
    image.decoding = 'async';
    const outgoing = [...ritualStage.querySelectorAll('img')];
    outgoing.forEach(item => item.removeAttribute('id'));
    ritualStage.append(image);
    // Commit the decoded image, expanded panel and product summary together.
    setRitualState(button);
    renderedRitualButton = button;
    if (!reducedMotion.matches && typeof image.animate === 'function') {
      ritualAnimation = image.animate([{opacity:0},{opacity:1}], {duration:240,easing:'ease-out'});
      await ritualAnimation.finished.catch(() => {});
    }
    // A late load or cancelled animation must never overwrite a newer selection.
    if (request !== ritualRequest) return;
    outgoing.forEach(item => item.remove());
  } catch {
    if (request === ritualRequest) {
      ritualAnimation?.cancel();
      ritualStage.querySelectorAll('img:not(#ritual-image)').forEach(image => image.remove());
      setRitualState(renderedRitualButton);
    }
  } finally {
    if (request === ritualRequest) {
      ritualStage.setAttribute('aria-busy', 'false');
      ritualCaption.setAttribute('aria-busy', 'false');
    }
  }
}
ritualButtons.forEach((button,index) => {
  button.addEventListener('click', () => selectRitual(button));
  button.addEventListener('pointerenter', () => loadRitualImage(button.dataset.ritualProduct).catch(() => {}));
  button.addEventListener('focus', () => loadRitualImage(button.dataset.ritualProduct).catch(() => {}));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % ritualButtons.length;
    if (event.key === 'ArrowUp') next = (index - 1 + ritualButtons.length) % ritualButtons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = ritualButtons.length - 1;
    if (next !== undefined) { event.preventDefault(); ritualButtons[next].focus(); }
  });
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }), {threshold:0.08,rootMargin:'0px 0px 20px 0px'});
  document.documentElement.classList.add('motion-ready');
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
