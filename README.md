# FORME. — Beauty in its own form.

HTML5 / CSS3 / Vanilla JavaScript로 완성한 프리미엄 스킨케어 브랜드 콘셉트 홈페이지. 프레임워크나 설치가 필요한 런타임 의존성이 없습니다. 기존 프로젝트 파일 없이 시작했으며 모든 결과는 `forme/`에 생성했습니다.

## 실행

`index.html`을 브라우저로 열어 바로 사용할 수 있습니다. 이미지, CSS, 스크립트 및 폰트를 모두 로컬에 포함해 외부 CDN 없이 표시됩니다.

로컬 HTTP 실행은 Node.js가 설치된 환경에서 다음과 같이 진행합니다.

```powershell
cd C:\Users\luk_9\OneDrive\Documents\Git_Work\otherpr\monopr\forme
node serve.mjs
```

홈페이지: http://127.0.0.1:4173

반응형 검수 화면: http://127.0.0.1:4173/docs/review.html

서버 종료는 터미널에서 Ctrl+C. `node build.mjs`로 정적 배포용 `dist/`를 생성하며, `node check.mjs`로 파일과 참조 무결성을 확인합니다.

## 파일 구성

- `index.html`: 시맨틱 구조, 9개 섹션, SEO / Open Graph, 접근성 내비게이션과 상세 dialog
- `css/style.css`: 컬러·간격·타이포그래피 토큰, 12컬럼 비례를 활용한 레이아웃, 컴포넌트와 모션
- `css/responsive.css`: PC / 태블릿 / 모바일 전환, 375px / 390px 대응
- `js/main.js`: 제품 상세, 저널 본문, 검색과 안내 모달, 루틴 아코디언·제품 설명 동기화, 키보드 조작, 스크롤 등장
- `assets/images/`: AI 생성 사진 15개. 원본 PNG와 웹용 JPEG를 보관
- `assets/fonts/`: 영문·로고용 DM Sans와 한글 Pretendard 가변 폰트 및 OFL 라이선스. 기존 Inter 원본 보관. DM Sans의 출처·버전·해시는 `DM-Sans-SOURCE.json`에 기록
- `docs/typography-dm-sans.md`: DM Sans 적용 범위, 로고·한글 보존, 검사 결과와 실화면 미검증 항목
- `assets/favicon.svg`: 브랜드 이니셜 파비콘
- `docs/design-notes.md`: 레퍼런스 접근 결과, 디자인 방향, 섹션 설계와 검수 범위
- `docs/image-prompts.json`: 모든 이미지의 실제 생성 프롬프트
- `docs/review.html`: 1440 / 1280 / 1024 / 768 / 430 / 390 / 360px iframe 뷰포트와 기능 점검 화면
- `docs/final-ui-ux-review.md`: 최신 UI/UX 개선의 전후 비교, 수정 파일, 검수 결과와 미검증 항목
- `docs/ui-ux-review.md`: 이전 UI/UX 개선 기록
- `docs/check-interactions.mjs`: CSS 구문·DOM 동작·루틴 비동기 전환 회귀 검사
- `docs/check-responsive.mjs`: 7개 폭의 CSS 선언 검사. 실제 레이아웃 검사는 별도 필요
- `check.mjs`, `build.mjs`, `serve.mjs`: 정적 검사, 배포 폴더 생성, 로컬 서버
- `.openai/hosting.json`: Sites 프로젝트와 정적 배포 설정
- `dist/`: HTML / CSS / JS / JPEG / 폰트가 포함된 실행 가능한 정적 배포 결과

## 이미지 적용

총 15개 JPEG, 합계 약 2.75 MiB. 히어로를 제외한 본문 이미지에 lazy loading을 적용했습니다. 원본 PNG는 프로젝트에 보존하고 배포 결과에서는 제외합니다.

| 이미지 | 적용 위치 |
|---|---|
| hero.jpg | 히어로 / Open Graph |
| philosophy.jpg | 브랜드 철학 |
| serum.jpg, cream.jpg, cleanser.jpg, toner.jpg | 4개 제품 카드 / 상세 모달 |
| texture-serum.jpg, texture-cream.jpg | 제형 화보 |
| cleanser.jpg, toner.jpg, serum.jpg, cream.jpg | 선택한 루틴 단계의 사진으로 전환 |
| ritual.jpg | 기존 그룹 화보 원본 보존; 단계별 제품 사진으로 표현 변경 |
| campaign-main.jpg, campaign-detail.jpg | 캠페인 모델 화보 |
| formula.jpg | 포뮬러·소재 콘셉트 |
| journal-routine.jpg, journal-object.jpg, journal-self.jpg | 저널 썸네일 / 기사 |

모든 사진은 내장 image_gen 도구로 이 프로젝트를 위해 생성했습니다. 세럼·크림을 기준으로 제품 화보에 참조 이미지를 사용했습니다. AI 생성물의 패키지는 콘셉트이며 제조 도면이 아닙니다. 사진 속 모델은 가상의 인물입니다. JPEG 변환 외에 생성 이미지를 인위적으로 합성하지 않았습니다.

## 구현 범위와 검수

정적 검사 통과: 9개 섹션, 단일 h1, 43개 고유 ID, 내부 링크, aria-controls·aria-describedby 대상, 이미지 15개의 JPEG 파일 완전성, CSS·JavaScript·폰트 연결, 모션 감소 지원, 가상 브랜드 고지. JavaScript 구문 검사와 정적 배포 폴더 생성 완료. CSS 파서 및 DOM 시뮬레이션에서 카드 모달, 포커스 복귀, 메뉴, 루틴의 사진·설명 연결, 빠른 재선택, 역순 로딩과 실패 복구 검사를 통과했습니다.

로컬 HTTP 홈페이지와 검수 페이지 모두 HTTP 200 응답을 확인했습니다. 온라인 배포는 완료되지 않았습니다. Sites 프로젝트를 생성했지만, 외부 저장소 동기화는 자동 승인 검토에서 사용자의 로컬 제작 승인 범위와 외부 전송 대상·범위를 이유로 거절됐습니다. 외부 업로드를 재개하려면 사용자 승인이 필요합니다.

**실제 브라우저 검수는 미완료입니다.** 최신 작업에서도 브라우저 연결 호스트가 없어 1440 / 1280 / 1024 / 768 / 430 / 390 / 360px의 실제 렌더링·크롭·대비·텍스트 겹침·네이티브 모달·터치 동작을 검증하지 못했습니다. CSS 선언·DOM 검사와 실제 검수의 구분은 [최신 보고서](docs/final-ui-ux-review.md)에 정리했습니다. `docs/review.html`에 일곱 뷰포트의 자동 검사와 섹션별 미리보기를 준비했습니다.

기존 Live Server에서도 최신 HTML, CSS 2개, JavaScript, 검수 페이지가 HTTP 200으로 제공됨을 확인했습니다. 홈페이지는 `http://127.0.0.1:5500/forme/index.html`, 검수 화면은 `http://127.0.0.1:5500/forme/docs/review.html`입니다. 이번 작업에서는 Git commit / push 및 외부 배포를 하지 않았습니다.

개발용 DOM 검사를 다시 실행하려면 아래 도구를 `outputs/`에만 설치합니다. 홈페이지 실행에는 필요하지 않습니다.

```powershell
npm install --prefix outputs/qa --cache outputs/npm-cache --no-package-lock --no-save --ignore-scripts jsdom css-tree
node docs/check-interactions.mjs
node docs/check-responsive.mjs
```

## 지원하지 않는 기능과 운영 전 필요사항

실제 상품 주문, 장바구니, 결제, 계정, 배송, 고객 상담 및 외부 SNS 연동은 구현하지 않았습니다. 구매처럼 보이는 미작동 버튼 대신 상세 모달과 안내를 제공합니다.

실제 운영 전 제품 처방·전성분·검증된 효능·사용상 주의사항, 사업자 정보와 고객센터, 공식 SNS 계정, 개인정보 관련 정책, 커머스 백엔드가 필요합니다. 확정되지 않은 성분·임상 수치·인증·사업자 정보는 만들지 않았습니다.
# forme
