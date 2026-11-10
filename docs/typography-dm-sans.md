# FORME — DM Sans 적용 기록

2026-11-10. 영문 폰트와 타이포그래피만 조정했습니다. Git commit·push 및 외부 배포는 하지 않았습니다.

## 폰트 파일과 라이선스

Google Fonts의 공식 CSS API가 제공한 WOFF2를 변형 없이 로컬에 저장했습니다. 사이트 실행 중 Google Fonts CDN을 호출하지 않습니다.

- `assets/fonts/DMSansVariable.woff2`: Latin, 62,724 bytes
- `assets/fonts/DMSansVariable-LatinExt.woff2`: Latin Extended, 31,292 bytes
- `assets/fonts/DM-Sans-LICENSE.txt`: 원본 SIL Open Font License 1.1 전문
- `assets/fonts/DM-Sans-SOURCE.json`: 공식 파일 URL, Unicode 범위, 버전, SHA-256, 가변 축 기록

실제 WOFF2 내부에서 Version 4.004와 `wght` 100–1000, `opsz` 9–40을 확인했습니다. `@font-face`는 normal 스타일, 굵기 100 1000, font-display swap, 각 파일의 공식 Unicode 범위를 사용합니다. font-optical-sizing은 auto입니다. 이탤릭 파일이나 임의의 정적 굵기 파일은 추가하지 않았습니다.

공식 출처:

- [Google Fonts 메타데이터](https://github.com/google/fonts/blob/main/ofl/dmsans/METADATA.pb)
- [Google Fonts OFL 라이선스](https://github.com/google/fonts/blob/main/ofl/dmsans/OFL.txt)
- [폰트 제작자 저장소](https://github.com/googlefonts/dm-fonts)

## 적용과 미세 조정

| 대상 | 적용 |
|---|---|
| 기본 영문 | `--font: 'DM Sans', 'Pretendard', sans-serif` |
| Hero h1 | 기존 크기·위치·줄바꿈 유지, 400 / 자간 -0.045em / 행간 1.06 |
| 공통 h2 | 기존 크기·행간·간격 유지, 자간 -0.055em → -0.035em |
| 제품 카드 이름 | DM Sans 500, 자간 -0.025em. 기존 글자 크기 유지 |
| 가격·Ritual 제품명 | 500. 모바일의 기존 600을 500으로 조정 |
| 제품 모달 제목·가격 | 500. 기존 크기와 배치 유지 |
| 메뉴·버튼·영문 푸터 | 새 기본 폰트 상속. 크기·간격·클릭 영역 유지 |
| 한글 상품 설명 | Pretendard 400 명시. 크기·자간·행간 유지 |
| 두 FORME 로고 | 추가 요청에 따라 `.wordmark`, `.closing-wordmark`에도 DM Sans 적용. 기존 굵기·자간·크기·위치 및 스크롤 축소 설정 유지 |

기존 `InterVariable.woff2`, `PretendardVariable.woff2`와 라이선스를 보존했습니다. 두 DM Sans 파일은 한글 글리프를 포함하지 않아 한글은 기존 Pretendard로 대체됩니다. 현재 HTML·JavaScript의 모든 한글 음절이 Pretendard 파일에 있고 DM Sans에는 없음을 확인했습니다. DM Sans에 없는 원화 기호 등도 다음 폰트인 Pretendard를 사용합니다.

DM Sans Latin에 로컬 preload를 적용했습니다. 로고도 DM Sans로 변경하면서 불필요해진 Inter preload는 제거했습니다. font-display swap과 함께 초기 로딩 지연을 줄이는 설정이며, 실제 CLS가 0임을 의미하지는 않습니다.

## 보존 검사

작업 직전 스냅샷과 비교했습니다.

- body HTML 전체와 JavaScript 파일 동일: 콘텐츠·카피·제품 정보·인터랙션·헤더·푸터 구조 유지
- 폰트 관련 속성을 제외한 CSS 선언 동일: 레이아웃·컬럼·이미지 크기/비율·정렬·마진·패딩·색상·배경·브레이크포인트 유지
- 모든 기존 font-size 선언 유지
- 360 / 390 / 768 / 1280 / 1440 / 1920px에서 로고의 크기·굵기·자간·행간 선언 동일
- 한글 본문의 크기·굵기·자간·행간 선언 동일. 기존 한글 Journal 제목의 모바일 굵기도 유지

폰트 교체에 따른 글자 모양과 자연스러운 텍스트 폭 변화는 발생합니다. 실제 화면의 줄바꿈이 완전히 같다는 의미로 보고하지 않습니다.

## 검사 결과

요청한 360 / 390 / 768 / 1280 / 1440 / 1920px에서 적용 CSS 선언 및 로고·한글 보존 검사를 통과했습니다. 기존 430 / 1024px 선언 검사도 유지했습니다.

공식 동일 버전 TTF를 개발용 참고 자료로 읽어 가변 축 양 끝의 글자 전진 폭을 계산했습니다. 여섯 화면 폭 모두에서 의도된 Hero 줄과 제품명이 계산한 텍스트 영역에 들어가는 추정 결과를 얻었습니다. 예를 들어 360px에서 Hero 두 줄의 추정 폭은 약 192 / 265px이며 콘텐츠 폭은 320px입니다. 이것은 폰트 메트릭 추정이며 실제 브라우저 레이아웃 측정이 아닙니다.

기존 정적 검사, CSS 파싱·DOM 기능 검사, 빌드와 소스/dist 일치도 확인했습니다. 검수 페이지에 1920px과 DM Sans 로딩·로고 적용 검사 항목을 추가했습니다.

## 미검증 항목

브라우저 접근 호스트가 연결되지 않아 실제 PC·모바일 렌더링은 확인하지 못했습니다. 실제 글자 잘림·이미지와의 겹침, 메뉴·버튼의 시각적 기준선, 혼합 문장의 높이, 가로 스크롤 및 폰트 로딩 전후 CLS는 미검증입니다. 실화면 비교가 필요한 항목을 완료로 보고하지 않습니다.

`node serve.mjs` 실행 후 `http://127.0.0.1:4173/docs/review.html`에서 화면별 확인을 할 수 있습니다. 검수 페이지를 이번 작업에서 브라우저로 실행했다고 주장하지 않습니다.

## 변경 파일

`css/style.css`, `css/responsive.css`, `index.html`의 font preload, 새 폰트·라이선스·출처 파일 4개, `docs/check-responsive.mjs`, `docs/review.html`, 이 문서와 README를 변경했습니다. `dist`에는 해당 HTML·CSS·폰트·라이선스·출처 파일을 로컬 빌드로 반영했습니다. 기존 JavaScript·이미지·호스팅 설정은 이번 작업에서 변경하지 않았습니다.
