/* Financial-Independence shared site data + i18n (window.FI)
   ───────────────────────────────────────────────────────────
   ▸ 새 프로젝트 추가: PROJECTS 배열에 항목 하나만 추가하면
     홈 · 프로젝트 목록 · 상세(Project.dc.html?id=…) 가 자동 반영됩니다.
   ▸ 스토어/이메일 등 실제 링크는 아래 TODO 표시를 채우세요. */
(function () {
  if (window.FI) return; /* 한 페이지에서 여러 컴포넌트가 불러도 단 한 번만 초기화하고 리스너를 공유합니다. */
  var KEY = 'fi_lang';
  var listeners = new Set();

  function getLang() {
    try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'ko'; }
    catch (e) { return 'ko'; }
  }
  function setLang(l) {
    try { localStorage.setItem(KEY, l); } catch (e) {}
    listeners.forEach(function (fn) { try { fn(l); } catch (e) {} });
  }
  function onLangChange(fn) {
    listeners.add(fn);
    function h(e) { if (e.key === KEY) fn(getLang()); }
    window.addEventListener('storage', h);
    return function () { listeners.delete(fn); window.removeEventListener('storage', h); };
  }
  function bindLang(component) {
    if (!component || typeof component.setState !== 'function') return function () {};
    component.setState({ lang: getLang() });
    return onLangChange(function (l) { component.setState({ lang: l }); });
  }
  function text(lang, ko, en) {
    return lang === 'ko' ? ko : en;
  }

  var COMPANY = {
    name: 'Financial-Independence',
    nameKo: '파이낸셜 인디펜던스',
    tagline: { ko: '만들고, 출시하고, 운영합니다', en: 'We build, ship, and run.' },
    blurb: {
      ko: '웹·모바일 제품을 직접 기획, 개발, 운영하는 제품 개발 회사입니다. 좋은 제품을 실제로 출시하고 지속 가능하게 운영합니다.',
      en: 'A product development company that plans, builds and operates web and mobile products, shipping real products and keeping them sustainable.'
    },
    email: 'ihavesookchi@gmail.com',
    year: 2026
  };

  var PROJECTS = [
    {
      id: 'dividend-analysis',
      released: true,
      logo: 'assets/projects/dividend-analysis/da-logo.png',
      mark: 'DA',
      accent: '#1e3a8a',
      accentDeep: '#0f1f4a',
      accentSoft: '#e8eefc',
      name: { ko: 'Dividend Analysis', en: 'Dividend Analysis' },
      sub: { ko: '배당 현금흐름 시뮬레이터', en: 'Dividend cashflow simulator' },
      category: { ko: '핀테크 · 투자', en: 'Fintech · Investing' },
      tagline: { ko: '배당 수익을 월별 현금흐름으로', en: 'Your dividends, modeled month by month' },
      summary: {
        ko: 'ETF·주식의 배당 현금흐름을 월 단위로 시뮬레이션합니다. 종목 검색부터 재투자 비교까지 하나의 흐름으로 이어집니다.',
        en: 'Simulate the monthly dividend cash flow of ETFs and stocks from search to reinvestment comparison in a single flow.'
      },
      desc: {
        ko: '계정이나 가입 없이도 종목을 검색하고, 실시간형 시세·환율·지수를 확인한 뒤, 매월 매수 → 배당 → 재투자를 시뮬레이션해 재투자/미재투자 결과를 나란히 비교할 수 있는 경량 투자 분석 서비스입니다. 웹과 모바일에서 동일하게 동작합니다.',
        en: 'A lightweight investment tool for ticker search, live-style prices, FX and indices, then month-by-month buy, dividend and reinvestment simulation. No account required, works the same on web and mobile.'
      },
      platforms: ['Web', 'iOS', 'Android'],
      tech: ['Expo', 'React Native Web', 'React 19', 'Cloudflare Workers', 'KV', 'D1'],
      primaryCta: { ko: '웹에서 바로 사용', en: 'Open the web app' },
      url: 'https://dividend-analysis.financial-independence.workers.dev',
      storeIos: null,      /* TODO: App Store 링크 */
      storeAndroid: null,  /* TODO: Google Play 링크 */
      hero: 'assets/projects/dividend-analysis/da-web-main.png',
      heroKind: 'web',
      heroExtra: 'assets/projects/dividend-analysis/da-mobile-main.jpg',
      gallery: [
        { src: 'assets/projects/dividend-analysis/da-web-main.png', kind: 'web', cap: { ko: '메인: 시장 스냅샷과 종목 검색', en: 'Home: market snapshot and search' } },
        { src: 'assets/projects/dividend-analysis/da-web-analysis.png', kind: 'web', cap: { ko: '분석: 조건 입력과 재투자 비교', en: 'Analysis: inputs and reinvestment comparison' } },
        { src: 'assets/projects/dividend-analysis/da-web-result.png', kind: 'web', cap: { ko: '결과: 요약 카드와 월별 표', en: 'Result: summary cards and monthly table' } },
        { src: 'assets/projects/dividend-analysis/da-mobile-main.jpg', kind: 'phone', cap: { ko: '모바일 메인', en: 'Mobile home' } },
        { src: 'assets/projects/dividend-analysis/da-mobile-result.jpg', kind: 'phone', cap: { ko: '모바일 결과', en: 'Mobile result' } }
      ],
      features: [
        { k: '검색', t: { ko: '종목 검색 · 최근 본 상품', en: 'Search & recents' }, d: { ko: '250ms 디바운스 검색으로 호출을 줄이고, 최근 본 상품을 자동으로 기억합니다.', en: '250ms-debounced search to cut calls, with recently viewed tickers remembered automatically.' } },
        { k: '시세', t: { ko: '시세 · 환율 · 지수', en: 'Prices, FX & indices' }, d: { ko: 'USD/KRW 환율과 KOSPI·KOSDAQ 스냅샷을 미니 차트와 함께 보여줍니다.', en: 'USD/KRW rate plus KOSPI·KOSDAQ snapshots with sparkline mini-charts.' } },
        { k: '분석', t: { ko: '배당 재투자 시뮬레이션', en: 'Reinvestment simulation' }, d: { ko: '매월 매수 → 배당 → 정수 주수 재투자를 계산해 재투자/미재투자를 비교합니다.', en: 'Models buy → dividend → whole-share reinvest each month and compares with/without reinvesting.' } },
        { k: '반응형', t: { ko: '웹·모바일 반응형', en: 'Responsive web & mobile' }, d: { ko: '데스크톱은 2열, 모바일은 카드형으로 정보 밀도를 자동 전환합니다.', en: 'Two-column on desktop and card layout on mobile, with density adapted to the viewport.' } }
      ],
      stats: [
        { v: '12', u: 'mo', l: { ko: '월 단위 시뮬레이션', en: 'month-by-month sim' } },
        { v: '2', u: '', l: { ko: '재투자/미재투자 비교', en: 'reinvest scenarios' } },
        { v: '0', u: '₩', l: { ko: '가입 없이 무료', en: 'free, no signup' } }
      ]
    },
    {
      id: 'deposit-guard',
      released: true,
      logo: 'assets/projects/deposit-guard/dg-logo.png',
      mark: '보증',
      accent: '#2e34c4',
      accentDeep: '#191c66',
      accentSoft: '#ebedfc',
      name: { ko: '보증금 지켜', en: 'Deposit Guard' },
      sub: { ko: '전월세 보증금 증거팩 생성기', en: 'Rental deposit evidence pack' },
      category: { ko: '생활 · 부동산', en: 'Utility · Housing' },
      tagline: { ko: '원상복구 분쟁으로부터 보증금을 지켜드립니다', en: 'Protect your deposit from move-out disputes' },
      summary: {
        ko: '전월세 입주·퇴거 시 방 상태를 기록해 분쟁에 대비하는 증거팩 생성기. 체크리스트와 사진을 PDF 한 부로 정리합니다.',
        en: 'Document your rental on move-in and move-out to prepare for disputes, turning a checklist and photos into one PDF evidence pack.'
      },
      desc: {
        ko: '입주할 때와 나갈 때 방 상태를 체크리스트와 사진으로 기록하면, 촬영 시각이 자동으로 찍힌 증거 사진과 비교 내역을 담은 PDF 증거팩을 만들어 줍니다. 서버 없이 기기에 안전하게 저장되는 오프라인 우선 설계로, 보증금 반환 분쟁에 대비할 수 있습니다.',
        en: 'Record your unit with a checklist and photos at move-in and move-out, and the app produces a PDF evidence pack with auto-stamped photos plus a before/after comparison. Offline-first and stored safely on-device with no server, so you are ready if a deposit dispute arises.'
      },
      platforms: ['iOS', 'Android'],
      tech: ['Flutter', 'Dart', 'sqflite', 'Firebase Auth', 'Cloud Firestore', 'PDF'],
      primaryCta: { ko: '앱 다운로드', en: 'Download the app' },
      url: null,
      storeIos: '#',      /* TODO: App Store 링크 */
      storeAndroid: 'https://play.google.com/store/apps/details?id=com.financial_independence.deposit_guard',
      hero: 'assets/projects/deposit-guard/dg-home.png',
      heroKind: 'phone',
      heroExtra: 'assets/projects/deposit-guard/dg-areas.png',
      gallery: [
        { src: 'assets/projects/deposit-guard/dg-home.png', kind: 'phone', cap: { ko: '홈: 진행 중인 기록', en: 'Home: records in progress' } },
        { src: 'assets/projects/deposit-guard/dg-areas.png', kind: 'phone', cap: { ko: '점검 구역 · 진행률', en: 'Inspection areas & progress' } },
        { src: 'assets/projects/deposit-guard/dg-inspect.png', kind: 'phone', cap: { ko: '항목 점검: 사진과 상태', en: 'Item check: photo and status' } },
        { src: 'assets/projects/deposit-guard/dg-pdf.png', kind: 'phone', cap: { ko: 'PDF 증거 보고서', en: 'PDF evidence report' } },
        { src: 'assets/projects/deposit-guard/dg-export.png', kind: 'phone', cap: { ko: '리포트 미리보기 · 생성', en: 'Report preview & export' } }
      ],
      features: [
        { k: '체크', t: { ko: '입주·퇴거 체크리스트', en: 'Move-in & move-out checklist' }, d: { ko: '방 상태를 항목별로 점검하고 입주와 퇴거 시점을 나란히 비교합니다.', en: 'Check the unit item by item and compare move-in against move-out side by side.' } },
        { k: '사진', t: { ko: '사진 자동 스탬프', en: 'Auto-stamped photos' }, d: { ko: '촬영 시각과 항목 정보가 사진에 자동으로 새겨져 증거 효력을 높입니다.', en: 'Capture time and item info are stamped onto each photo to strengthen it as evidence.' } },
        { k: 'PDF', t: { ko: 'PDF 증거팩 생성', en: 'PDF evidence pack' }, d: { ko: '커버·요약·상태·비교·체크리스트·사진을 한 부의 PDF로 정리해 공유합니다.', en: 'Cover, summary, status, comparison, checklist and photos collected into one shareable PDF.' } },
        { k: '오프라인', t: { ko: '오프라인 우선 저장', en: 'Offline-first storage' }, d: { ko: '서버 없이 기기(sqflite)에 저장되어 인터넷 없이도 기록하고 보관합니다.', en: 'Stored on-device with sqflite and no server, so you can record and keep everything without a connection.' } }
      ],
      stats: [
        { v: '2', u: '', l: { ko: '입주·퇴거 기록', en: 'move-in & move-out' } },
        { v: '1', u: 'PDF', l: { ko: '한 부로 정리되는 증거', en: 'pack, one file' } },
        { v: '0', u: '', l: { ko: '서버 없는 오프라인', en: 'servers, offline first' } }
      ],
      pricing: [
        { name: { ko: 'Free', en: 'Free' }, price: { ko: '무료', en: 'Free' }, note: { ko: '사진 15장 · PDF 미리보기', en: '15 photos · PDF preview' } },
        { name: { ko: 'PDF 1회권', en: 'Single PDF' }, price: { ko: '1,900원', en: '₩1,900' }, note: { ko: 'PDF 1회 생성', en: 'One PDF export' } },
        { name: { ko: 'Pro', en: 'Pro' }, price: { ko: '9,900원', en: '₩9,900' }, note: { ko: '사진 무제한 · 워터마크 제거 · 백업', en: 'Unlimited · no watermark · backup' }, highlight: true }
      ]
    }
  ];

  function byId(id) {
    for (var i = 0; i < PROJECTS.length; i++) if (PROJECTS[i].id === id) return PROJECTS[i];
    return null;
  }

  window.FI = {
    getLang: getLang, setLang: setLang, onLangChange: onLangChange,
    bindLang: bindLang, text: text,
    COMPANY: COMPANY, PROJECTS: PROJECTS, byId: byId
  };
})();
