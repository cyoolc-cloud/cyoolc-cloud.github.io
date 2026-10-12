// 연구실 소식 데이터 (메인 화면의 최근 소식 카드와 News 페이지가 함께 사용)
// 새 소식은 맨 위에 추가하세요. 날짜는 'YYYY-MM' 형식입니다.
const baseNewsItems = [
  {
    "id": "base-2026-09-uiowa",
    "date": "2026-09",
    "category": "진학",
    "title": "이하영, University of Iowa Sociology Ph.D. 과정 입학",
    "content": "2026년 9월 University of Iowa 사회학과 박사과정에 입학했습니다.",
    "url": ""
  },
  {
    "id": "base-2026-08-edsd",
    "date": "2026-08",
    "category": "수상",
    "title": "김화연, European Doctoral School of Demography 장학생 선발",
    "content": "독일 막스플랑크 인구연구소와 유럽 주요 인구학 교육기관이 연계해 운영하는 11개월 집중 훈련 프로그램(EDSD)의 장학생으로 선발되었습니다. 프로그램 참여와 체류 비용을 전액 지원받습니다.",
    "url": ""
  },
  {
    "id": "base-2026-07-symposium-kim",
    "date": "2026-07",
    "category": "발표",
    "title": "김화연·최율·이지원, 불평등연구회 학술 심포지움 발표",
    "content": "“Between ‘Deficit’ and ‘Choice’: Shifting Dynamics of Non-marital Childbearing in South Korea, 1997-2024”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2026-07-symposium-lee",
    "date": "2026-07",
    "category": "발표",
    "title": "이규림·최율, 불평등연구회 학술 심포지움 발표",
    "content": "“생애 초기 불평등은 어떻게 형성되는가?: ECEC 기관 및 비-기관 요인을 중심으로”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2026-05-poster-kim",
    "date": "2026-05",
    "category": "발표",
    "title": "김화연·최율·이지원, 한국인구학회 전기학술대회 포스터 발표",
    "content": "“‘선택’과 ‘제약’ 사이: 한국 비혼출산의 변화하는 동학, 1997-2024”를 포스터로 발표했습니다. (세종)",
    "url": ""
  },
  {
    "id": "base-2026-05-poster-lee",
    "date": "2026-05",
    "category": "발표",
    "title": "이규림·최율, 한국인구학회 전기학술대회 포스터 발표",
    "content": "“생애 초기 불평등은 어떻게 형성되는가?: ECEC 기관 및 비-기관 요인을 중심으로”를 포스터로 발표했습니다. (세종)",
    "url": ""
  },
  {
    "id": "base-2026-04-buffalo",
    "date": "2026-04",
    "category": "발표",
    "title": "김화연·최율·이지원, University at Buffalo 워크숍 발표",
    "content": "Journal of Comparative Family Studies 특집호 워크숍에서 비혼출산의 변화 동학을 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2026-03-paper",
    "date": "2026-03",
    "category": "출판",
    "title": "김화연·최율, 『한국인구학』 49(1) 논문 게재",
    "content": "“2010-2020년 아동보육 실태와 변화 양상: 인구주택총조사 자료를 중심으로”가 게재되었습니다.",
    "url": ""
  },
  {
    "id": "base-2026-ksdc-award",
    "date": "2026",
    "category": "수상",
    "title": "김화연, 한국사회과학자료원 우수논문상",
    "content": "석사학위논문으로 2026 한국사회과학자료원 우수논문상을 받았습니다.",
    "url": ""
  },
  {
    "id": "base-2025-12-ksa-lee",
    "date": "2025-12",
    "category": "발표",
    "title": "이규림·최율, 한국사회학회 후기사회학대회 발표",
    "content": "“초기 아동기 불평등 요인 탐색: 초기 아동기 불평등은 어떻게 형성되는가?”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2025-12-readi",
    "date": "2025-12",
    "category": "발표",
    "title": "이규림·최율, READI Student/Early-Career Seminar 발표",
    "content": "“How Does Cognitive Inequality Emerge in Early Childhood?”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2025-12-keio",
    "date": "2025-12",
    "category": "발표",
    "title": "김화연·최율, 게이오대학교 세미나 발표",
    "content": "Seminar on Family and Children in East Asia in the Context of Declining Fertility에서 “Decoupling Partnership and Reproduction from Marriage”를 발표했습니다. (도쿄)",
    "url": ""
  },
  {
    "id": "base-2025-08-grad-kim",
    "date": "2025-08",
    "category": "학위",
    "title": "김화연, 석사학위 취득",
    "content": "석사학위논문 “파트너십·재생산과 결혼의 새로운 관계”",
    "url": ""
  },
  {
    "id": "base-2025-02-grad-jeon",
    "date": "2025-02",
    "category": "학위",
    "title": "전병찬, 석사학위 취득",
    "content": "석사학위논문 “공무원 시험 준비와 실패가 주관적 건강과 심리적 웰빙에 미치는 영향”",
    "url": ""
  },
  {
    "id": "base-2025-02-paper-eh",
    "date": "2025-02",
    "category": "출판",
    "title": "Harris Hyun-soo Kim·최율, Ethnicity & Health 30(2) 논문 게재",
    "content": "“A paradox of white privilege: race, psychological resilience, and mental well-being during a public health crisis”가 게재되었습니다.",
    "url": ""
  },
  {
    "id": "base-2025-01-paper-demres",
    "date": "2025-01",
    "category": "출판",
    "title": "이지원·최율, Demographic Research 52(4) 논문 게재",
    "content": "“Decriminalization of adultery likely changed women’s views on divorce following spousal infidelity in South Korea”가 게재되었습니다.",
    "url": ""
  },
  {
    "id": "base-2024-12-ksa-kim",
    "date": "2024-12",
    "category": "발표",
    "title": "김화연·최율, 한국사회학회 후기사회학대회 발표",
    "content": "“결혼, 파트너십, 재생산의 새로운 관계: 한국 여성의 비혼동거와 비혼출산 태도 변화, 2010-2022”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2024-02-ipac",
    "date": "2024-02",
    "category": "발표",
    "title": "이하영, International Postgraduate & Academic Conference 2024 발표",
    "content": "“Why Don’t Women Choose STEM Careers?: A Longitudinal Analysis of the Determinants of STEM Careers, from Middle School to the Labor Market”을 발표했습니다. (온라인)",
    "url": ""
  },
  {
    "id": "base-2024-01-paper-pph",
    "date": "2024-01",
    "category": "출판",
    "title": "최율·Harris Hyun-soo Kim, Perspectives in Public Health 144(1) 논문 게재",
    "content": "“Social capital, food insecurity, and health outcomes in the US during the COVID-19 pandemic”이 게재되었습니다.",
    "url": ""
  },
  {
    "id": "base-2023-12-ksa-adultery",
    "date": "2023-12",
    "category": "발표",
    "title": "최율·이지원, 한국사회학회 후기사회학대회 발표",
    "content": "“The Impact of Adultery Law Abolition on Women’s Attitudes towards Divorce in South Korea”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2023-12-ksa-protestant",
    "date": "2023-12",
    "category": "발표",
    "title": "최율·백경민·장서현, 한국사회학회 후기사회학대회 발표",
    "content": "“Protestant religiosity and conservative attitudes on social issues”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2023-12-grad-lee",
    "date": "2023-12",
    "category": "학위",
    "title": "이하영, 석사학위 취득",
    "content": "석사학위논문 “여성은 왜 STEM 직업을 선택하지 않는가?: STEM 직업 결정요인에 대한 종단적 분석, 중학교부터 노동시장까지”",
    "url": ""
  },
  {
    "id": "base-2023-12-kasr-award",
    "date": "2023-12",
    "category": "수상",
    "title": "전병찬·이하영, 한국조사연구학회 추계학술대회 우수논문상",
    "content": "2023년 한국조사연구학회 추계학술대회에서 우수논문상을 받았습니다.",
    "url": ""
  },
  {
    "id": "base-2023-12-kasr",
    "date": "2023-12",
    "category": "발표",
    "title": "전병찬·이하영·최율, 한국조사연구학회 추계학술대회 발표",
    "content": "“실패자의 계층론: 공무원 시험 불합격자의 노동시장 진입에 관한 연구”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2023-12-ksa",
    "date": "2023-12",
    "category": "발표",
    "title": "전병찬·이하영·최율, 한국사회학회 후기사회학대회 발표",
    "content": "“실패자의 계층론: 공무원 시험 불합격자의 노동시장 진입에 관한 연구”를 발표했습니다.",
    "url": ""
  },
  {
    "id": "base-2023-09-paper",
    "date": "2023-09",
    "category": "출판",
    "title": "이하영·최율, 『한국인구학』 46(3) 논문 게재",
    "content": "“공학 전공 선택의 성별 격차 분석”이 게재되었습니다.",
    "url": ""
  },
  {
    "id": "base-2023-06-korea-univ",
    "date": "2023-06",
    "category": "발표",
    "title": "이하영·최율, International Conference on Lives of Women (and Men) in Contemporary Korea 발표",
    "content": "“Two-Stage Barriers in Choosing STEM Majors Based on Major Preferences”를 발표했습니다. (고려대학교)",
    "url": ""
  },
  {
    "id": "base-2023-02-ipac",
    "date": "2023-02",
    "category": "발표",
    "title": "이하영·최율, International Postgraduate & Academic Conference 2023 발표",
    "content": "“Two-Stage Barriers in Choosing STEM Majors Based on Major Preferences”를 발표했습니다. (온라인)",
    "url": ""
  },
  {
    "id": "base-2022-12-ksa",
    "date": "2022-12",
    "category": "발표",
    "title": "이하영·최율, 한국사회학회 정기사회학대회 발표",
    "content": "“전공선호에서 전공선택으로: STEM 선택의 이중 장애물”을 발표했습니다. (서울)",
    "url": ""
  },
  {
    "id": "base-2022-12-paper-rssm",
    "date": "2022-12",
    "category": "출판",
    "title": "계봉오·황선재·김지연·최율, Research in Social Stratification and Mobility 77 논문 게재",
    "content": "“Intragenerational occupational mobility of South Korea, 1998–2017: Implications of the gendered life course approach for mobility and inequality studies”가 게재되었습니다.",
    "url": ""
  }
];

// 소식 목록 (메인 화면과 News 페이지가 함께 사용)
const loadNewsItems = () => baseNewsItems;

// 축하할 소식(진학·수상·출판)에는 제목 끝에 「祝」 도장을 찍음
const CELEBRATE = ['진학', '수상', '출판'];
// 목록 순서대로 조금씩 늦게 찍혀서 도장이 차례로 '쿵, 쿵' 찍히는 느낌
const celebrateStamp = (item, i = 0) =>
  CELEBRATE.includes(item.category)
    ? `<span class="celebrate-stamp" style="animation-delay: ${(0.4 + i * 0.12).toFixed(2)}s" aria-label="축하">祝</span>`
    : '';
