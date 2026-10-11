// 사이트 전체가 공유하는 연구실 데이터.
// 메인 네트워크, Research 페이지, People 페이지가 모두 이 파일을 읽습니다.
// 새 연구/구성원을 추가하면 세 화면에 자동으로 반영됩니다.

// 연구 주제(네트워크의 주황색 노드)
const THEMES = {
  "education": "교육불평등",
  "shadow": "사교육",
  "highered": "고등교육",
  "labor": "노동시장",
  "class": "계층·이동",
  "gender": "젠더",
  "stem": "STEM",
  "family": "가족",
  "fertility": "저출산·고령화",
  "demography": "인구변동",
  "popstructure": "인구구조",
  "childcare": "아동보육",
  "lifecourse": "생애과정",
  "migration": "이주·소수자",
  "health": "건강",
  "poverty": "빈곤·복지",
  "hetero": "Heterogeneous effects"
};

// 구성원. role: 'director' | 'member'(석사과정) | 'alumni'(졸업생)
// school: 중앙대학교가 아닌 경우만 표시 (예: 한국교원대학교 재직 시절 지도 학생)
// 네트워크에는 학생(member, alumni) 중 연구가 연결된 사람만 초록색 노드로 표시됩니다.
const PEOPLE = [
  {
    "id": "choi",
    "name": "최율",
    "en": "Yool Choi",
    "role": "director",
    "title": "중앙대학교 사회학과 부교수",
    "bio": "",
    "education": [
      "2015 Ph.D., Sociology, University of California, Los Angeles",
      "2008 M.A., Sociology, 고려대학교",
      "2005 B.A., Sociology, 고려대학교"
    ],
    "career": [
      "2020– 중앙대학교 사회학과 부교수",
      "2017–2020 한국교원대학교 일반사회교육과 조교수",
      "2015–2016 한양대학교 SSK 다문화연구단 박사후연구원",
      "2013–2014 American Educational Research Association Dissertation Grant Fellow"
    ],
    "courses": [
      "학부: 불평등과 사회계층, 사회인구학, 사회조사방법론, 교육사회학",
      "대학원: 사회인구학, 교육사회학, 사회통계학, 사회불평등론"
    ],
    "notes": []
  },
  {
    "id": "krlee",
    "name": "이규림",
    "en": "Kyurim Lee",
    "role": "member",
    "title": "석사과정 (2025.3~)",
    "bio": "",
    "notes": []
  },
  {
    "id": "dhlee",
    "name": "이동현",
    "en": "",
    "role": "member",
    "title": "석사과정 (2026.3~)",
    "bio": "",
    "notes": []
  },
  {
    "id": "yjha",
    "name": "하유장",
    "en": "",
    "role": "member",
    "title": "석사과정 (2026.9~)",
    "bio": "",
    "notes": []
  },
  {
    "id": "hwkim",
    "name": "김화연",
    "en": "Hwayeon Kim",
    "role": "alumni",
    "title": "석사 (2024.9–2025.8)",
    "thesis": "파트너십·재생산과 결혼의 새로운 관계",
    "bio": "",
    "notes": [
      "2026 한국사회과학자료원 우수논문상 (석사학위논문)"
    ],
    "now": "막스플랑크 프리닥터럴 프로그램 장학생 (2026)"
  },
  {
    "id": "bcjeon",
    "name": "전병찬",
    "en": "Byeongchan Jeon",
    "role": "alumni",
    "title": "석사 (2023.3–2025.2)",
    "thesis": "공무원 시험 준비와 실패가 주관적 건강과 심리적 웰빙에 미치는 영향",
    "bio": "",
    "notes": [
      "2023 한국조사연구학회 추계학술대회 우수논문상"
    ],
    "now": "리서치 컨설팅 회사"
  },
  {
    "id": "hylee",
    "name": "이하영",
    "en": "Hayoung Lee",
    "role": "alumni",
    "title": "석사 (2022.3–2023.12)",
    "thesis": "여성은 왜 STEM 직업을 선택하지 않는가?: STEM 직업 결정요인에 대한 종단적 분석, 중학교부터 노동시장까지",
    "bio": "",
    "notes": [
      "2023 한국조사연구학회 추계학술대회 우수논문상"
    ],
    "now": "University of Iowa 사회학 박사과정"
  },
  {
    "id": "dhwon",
    "name": "원동휘",
    "en": "",
    "role": "alumni",
    "school": "한국교원대학교",
    "title": "석사 (2019.3–2021.2)",
    "thesis": "입시제도 변화에 따른 사회적 계층 간 교육성취 차이 분석",
    "bio": "",
    "notes": [],
    "now": "고등학교 교사"
  },
  {
    "id": "jsjeong",
    "name": "정준서",
    "en": "",
    "role": "alumni",
    "school": "한국교원대학교",
    "title": "석사 (2018.9–2020.2)",
    "thesis": "경쟁의식의 유형이 소수자 수용성에 미치는 영향",
    "bio": "",
    "notes": [],
    "now": "한국직업능력연구원 연구원"
  },
  {
    "id": "jjmoon",
    "name": "문정주",
    "en": "",
    "role": "alumni",
    "school": "한국교원대학교",
    "title": "석사 (2018.3–2020.2)",
    "thesis": "사회적 계층 수준에 따른 대학 입시제도 인식 분석: 담론과 실제 인식 간의 괴리를 중심으로",
    "bio": "",
    "notes": [],
    "now": "고등학교 교사"
  },
  {
    "id": "dykim",
    "name": "김도영",
    "en": "",
    "role": "alumni",
    "school": "한국교원대학교",
    "title": "석사 (2018.3–2020.2)",
    "thesis": "대졸 청년의 공무원 시험 준비 및 합격에 나타난 계층화 연구: 가구소득과 대학서열을 중심으로",
    "bio": "",
    "notes": [],
    "now": "고등학교 교사"
  }
];



// 연구(네트워크의 파란색 노드). kind: 'paper'(학술지 논문) | 'talk'(학회 발표)
// authors 안의 이름이 PEOPLE의 name과 같으면 해당 구성원과 연결됩니다.
// 논문 정보·키워드·요약은 논문모음.zip의 PDF에서 추출했습니다.
// plain: Research 페이지에 보이는 쉬운 설명 (초록 기반, 핵심 발견과 함의 중심)
const WORKS = [
  {
    "id": "p28",
    "label": "아동보육 실태와 변화",
    "title": "2010-2020년 아동보육 실태와 변화 양상: 인구주택총조사 자료를 중심으로",
    "titleAlt": "Childcare Arrangement Trends, 2010-2020: Evidence from Population and Housing Census Data",
    "year": 2026,
    "kind": "paper",
    "authors": [
      "김화연",
      "최율"
    ],
    "venues": [
      "한국인구학, 49(1), 69–96"
    ],
    "doi": "10.31693/KJPS.2026.03.49.1.3",
    "keywords": [
      "인구주택총조사",
      "아동보육",
      "공보육",
      "코로나19",
      "Population and housing census",
      "Childcare",
      "Public childcare",
      "COVID-19"
    ],
    "summary": "2010–2020년 인구주택총조사 표본 원자료를 분석한 결과, 공보육 중심으로 재편되던 아동보육이 코로나19 시기인 2020년에 다시 가족 중심으로 회귀했으며, 그 정도는 부모의 교육수준·경제활동·자녀 수·연령에 따라 달랐다.",
    "plain": "아이를 누가, 어디서 돌보는지는 여성의 일과 가정의 균형, 그리고 저출산 문제와 깊이 연결되어 있습니다. 이 연구는 인구주택총조사 자료를 활용해 2010년부터 2020년까지 12세 이하 자녀의 보육 형태가 어떻게 바뀌어 왔는지 살폈습니다. 보육 지원이 확대되면서 2015년까지는 어린이집 같은 공적 보육 중심으로 재편되었지만, 코로나19가 닥친 2020년에는 다시 가족이 직접 돌보는 방향으로 돌아갔습니다. 이러한 변화의 정도는 부모의 교육 수준과 경제활동 여부, 자녀 수, 부모의 나이에 따라 달랐습니다. 이는 보육 정책이 가구마다 다른 사정을 고려해 더 세밀하게 설계되어야 함을 시사합니다.",
    "themes": [
      "childcare",
      "family",
      "demography"
    ]
  },
  {
    "id": "nonmarital-birth",
    "label": "비혼출산의 변화하는 동학",
    "title": "‘선택’과 ‘제약’ 사이: 한국 비혼출산의 변화하는 동학, 1997-2024",
    "titleAlt": "Between ‘Deficit’ and ‘Choice’: Shifting Dynamics of Non-marital Childbearing in South Korea, 1997-2024",
    "year": 2026,
    "kind": "talk",
    "authors": [
      "김화연",
      "최율",
      "이지원"
    ],
    "venues": [
      "2026.07 불평등연구회 학술 심포지움, 서울",
      "2026.05 한국인구학회 전기학술대회 (포스터), 세종",
      "2026.04 Workshop for the Special Issue of the Journal of Comparative Family Studies, University at Buffalo"
    ],
    "themes": [
      "family",
      "fertility",
      "demography"
    ]
  },
  {
    "id": "early-childhood",
    "label": "생애 초기 불평등의 형성",
    "title": "생애 초기 불평등은 어떻게 형성되는가?: ECEC 기관 및 비-기관 요인을 중심으로",
    "titleAlt": "How Does Cognitive Inequality Emerge in Early Childhood?",
    "year": 2026,
    "kind": "talk",
    "authors": [
      "이규림",
      "최율"
    ],
    "venues": [
      "2026.07 불평등연구회 학술 심포지움, 서울",
      "2026.05 한국인구학회 전기학술대회 (포스터), 세종",
      "2025.12 READI Student/Early-Career Seminar",
      "2025.12 한국사회학회 후기사회학대회"
    ],
    "themes": [
      "childcare",
      "education",
      "lifecourse"
    ]
  },
  {
    "id": "p27",
    "label": "간통죄 폐지와 이혼 인식",
    "title": "Decriminalization of adultery likely changed women’s views on divorce following spousal infidelity in South Korea",
    "year": 2025,
    "kind": "paper",
    "authors": [
      "Jiwon Lee",
      "Yool Choi"
    ],
    "venues": [
      "Demographic Research, 52(4), 111–124"
    ],
    "doi": "10.4054/DemRes.2025.52.4",
    "keywords": [],
    "summary": "한국여성가족패널조사 1–5차 자료와 헌법재판소 간통죄 위헌 결정 시점을 활용한 이중차분 분석 결과, 간통죄 폐지 이후 여성들은 남편의 외도만으로 이혼이 정당화된다고 보는 경향이 낮아졌다.",
    "plain": "법은 처벌만이 아니라 사람들이 무엇을 옳고 그르다고 여기는지에도 영향을 줄 수 있습니다. 한국에서는 2015년 헌법재판소의 결정으로 간통죄가 폐지되었는데, 이것이 사회의 인식에 어떤 변화를 가져왔는지에 대한 실증 연구는 거의 없었습니다. 전국의 성인 여성을 대표하는 패널 조사를 활용해, 위헌 결정 시점을 전후한 여성들의 태도 변화를 살폈습니다. 그 결과 간통죄 폐지 이후 여성들은 남편의 외도 하나만으로 이혼이 정당화된다고 보는 경향이 낮아졌습니다. 이는 혼외관계에 대한 형사처벌을 없애는 결정이 배우자의 외도와 이혼을 바라보는 사회적 시각까지 바꿀 수 있음을 보여줍니다.",
    "themes": [
      "family",
      "gender"
    ]
  },
  {
    "id": "p26",
    "label": "백인 특권의 역설",
    "title": "A paradox of white privilege: race, psychological resilience, and mental well-being during a public health crisis",
    "year": 2025,
    "kind": "paper",
    "authors": [
      "Harris Hyun-soo Kim",
      "Yool Choi"
    ],
    "venues": [
      "Ethnicity & Health, 30(2), 173–196"
    ],
    "doi": "10.1080/13557858.2024.2430296",
    "keywords": [
      "Mental health paradox",
      "race",
      "psychological resilience",
      "vulnerability",
      "contextual effects",
      "COVID-19"
    ],
    "summary": "코로나19 팬데믹 기간 미국 인구조사국 가구 펄스 조사 자료를 다수준 모형으로 분석한 결과, 백인이 흑인보다 정신건강이 더 나빴으며 이 격차는 개인의 취약성이 크고 감염률·민족 이질성·구조적 불리함이 높은 지역에서 더 뚜렷했다.",
    "plain": "미국에서는 흑인이 사회경제적으로 더 불리한데도 백인보다 정신건강이 좋다는 '인종 역설'이 알려져 있습니다. 이 연구는 그 역설이 코로나19라는 비상한 시기에도 나타나는지를 전국 대표 조사 자료로 확인했습니다. 그 결과 팬데믹 기간 백인의 정신건강이 흑인보다 더 나빴으며, 이 차이는 소득이 낮거나 일자리가 불안하거나 식량이 부족한 사람들 사이에서 더 컸습니다. 또한 감염률이 높고, 인종·민족 구성이 다양하며, 구조적 불리함이 큰 지역에서 차이가 더 뚜렷했습니다. 이는 오랜 차별을 견뎌 온 흑인들이 심리적 회복력을 지니고 있음을 뒷받침하며, 역설적으로 '백인의 특권'에는 위기 상황에서 정신적 비용이 따를 수 있음을 시사합니다.",
    "themes": [
      "health",
      "migration"
    ]
  },
  {
    "id": "decoupling",
    "label": "결혼과 재생산의 분리",
    "title": "결혼, 파트너십, 재생산의 새로운 관계: 한국 여성의 비혼동거와 비혼출산 태도 변화, 2010-2022",
    "titleAlt": "Decoupling Partnership and Reproduction from Marriage: Period Effects on Korean Women’s Attitudes toward Non-marital Cohabitation and Childbearing after 2010",
    "year": 2025,
    "kind": "talk",
    "authors": [
      "김화연",
      "최율"
    ],
    "venues": [
      "2025.12 Seminar on Family and Children in East Asia in the Context of Declining Fertility, Keio University",
      "2024.12 한국사회학회 후기사회학대회, 서울"
    ],
    "themes": [
      "family",
      "fertility",
      "gender"
    ]
  },
  {
    "id": "p25",
    "label": "사회자본·식량불안·건강",
    "title": "Social capital, food insecurity, and health outcomes in the US during the COVID-19 pandemic",
    "year": 2024,
    "kind": "paper",
    "authors": [
      "Yool Choi",
      "Harris Hyun-soo Kim"
    ],
    "venues": [
      "Perspectives in Public Health, 144(1), 39–51"
    ],
    "doi": "10.1177/17579139221106339",
    "keywords": [
      "health inequalities",
      "mental health",
      "public health",
      "inequalities"
    ],
    "summary": "미국 인구조사국 가구 펄스 조사 자료를 다수준 모형으로 분석한 결과, 코로나19 이후 식량 부족은 주관적 건강을 악화시키고 우울 증상을 높였으며, 이러한 부정적 효과는 사회자본 수준이 높은 주에서 오히려 더 크게 나타났다.",
    "plain": "코로나19 대유행은 생계가 불안한 사람들에게 더 큰 타격을 주었습니다. 미국 전역의 대규모 가구 조사를 분석한 결과, 팬데믹 이후 먹을 것이 부족했던 사람들은 스스로 평가한 건강이 나빠지고 우울 증상이 높아졌습니다. 흔히 이웃 간 신뢰와 연결망 같은 '사회자본'이 풍부한 지역에서는 이런 어려움이 완화될 것이라 기대합니다. 그러나 이 연구에서는 사회자본이 높은 주에 사는 경우 식량 부족이 건강에 미치는 부정적 영향이 오히려 더 크게 나타났습니다. 이는 감염병 위기의 건강 부담이 경제적으로 취약한 사람들에게 불균등하게 쏠렸으며, 공동체의 힘이 언제나 보호막이 되는 것은 아님을 보여줍니다.",
    "themes": [
      "health",
      "poverty"
    ]
  },
  {
    "id": "stem-careers",
    "label": "여성과 STEM 진로",
    "title": "Why Don’t Women Choose STEM Careers?: A Longitudinal Analysis of the Determinants of STEM Careers, from Middle School to the Labor Market",
    "year": 2024,
    "kind": "talk",
    "authors": [
      "이하영"
    ],
    "venues": [
      "2024.02 International Postgraduate & Academic Conference 2024 (Online)"
    ],
    "themes": [
      "gender",
      "stem",
      "labor",
      "lifecourse"
    ]
  },
  {
    "id": "p24",
    "label": "공학 전공 선택의 성별 격차",
    "title": "공학 전공 선택의 성별 격차 분석",
    "titleAlt": "Analyzing the Gender Disparities in Engineering Major Selection",
    "year": 2023,
    "kind": "paper",
    "authors": [
      "이하영",
      "최율"
    ],
    "venues": [
      "한국인구학, 46(3), 1–32"
    ],
    "doi": "10.31693/KJPS.2023.09.46.3.1",
    "keywords": [
      "STEM",
      "공학",
      "성별 전공격차",
      "대학위계",
      "성별 고정관념",
      "STEM",
      "Engineering",
      "Gender Gap",
      "College Selectivity"
    ],
    "summary": "한국교육고용패널Ⅱ 자료로 이과계열 학생의 공학 전공 선택을 분석한 결과, 여성의 공학 선택 확률은 남성보다 약 30%p 낮고 관찰 가능한 요인으로 거의 설명되지 않으며, 성별 격차는 상위권보다 비상위권 대학에서 더 크게 나타났다.",
    "plain": "여학생의 학업 성취가 남학생을 앞서는데도 공학처럼 보상이 큰 분야에는 여전히 여성이 적습니다. 고등학교 2학년부터 대학교 1학년까지 이과계열 학생을 추적한 조사 자료를 분석한 결과, 여성이 공학을 전공으로 선택할 확률은 남성보다 약 30%p 낮았습니다. 놀랍게도 고등학교부터 대학 입학 시기까지 관찰할 수 있는 여러 요인을 폭넓게 고려해도 이 격차가 거의 설명되지 않았습니다. 또한 성별 격차는 상위권 대학보다 비상위권 대학에서 더 컸고, 비상위권 대학에서는 여러 요인이 격차의 일부를 설명했지만 상위권 대학에서는 거의 설명되지 않았습니다. 이는 성별 전공 분리를 줄이기 위한 정책이 누구를, 언제 대상으로 해야 하는지에 대해 구체적인 시사점을 줍니다.",
    "themes": [
      "highered",
      "gender",
      "stem"
    ]
  },
  {
    "id": "exam-failure",
    "label": "실패자의 계층론",
    "title": "실패자의 계층론: 공무원 시험 불합격자의 노동시장 진입에 관한 연구",
    "year": 2023,
    "kind": "talk",
    "authors": [
      "전병찬",
      "이하영",
      "최율"
    ],
    "venues": [
      "2023.12 한국사회학회 후기사회학대회",
      "2023.12 한국조사연구학회 추계학술대회"
    ],
    "themes": [
      "labor",
      "class"
    ]
  },
  {
    "id": "stem-barriers",
    "label": "STEM 선택의 이중 장애물",
    "title": "전공선호에서 전공선택으로: STEM 선택의 이중 장애물",
    "titleAlt": "Two-Stage Barriers in Choosing STEM Majors Based on Major Preferences",
    "year": 2023,
    "kind": "talk",
    "authors": [
      "이하영",
      "최율"
    ],
    "venues": [
      "2023.06 International Conference on Lives of Women (and Men) in Contemporary Korea, Korea University",
      "2023.02 International Postgraduate & Academic Conference 2023 (Online)",
      "2022.12 한국사회학회 정기사회학대회, 서울"
    ],
    "themes": [
      "highered",
      "gender",
      "stem"
    ]
  },
  {
    "id": "p23",
    "label": "한국의 세대 내 직업이동",
    "title": "Intragenerational occupational mobility of South Korea, 1998–2017: Implications of the gendered life course approach for mobility and inequality studies",
    "year": 2022,
    "kind": "paper",
    "authors": [
      "Bongoh Kye",
      "Sun-Jae Hwang",
      "Jiyeon Kim",
      "Yool Choi"
    ],
    "venues": [
      "Research in Social Stratification and Mobility, 77, 100660"
    ],
    "doi": "10.1016/j.rssm.2021.100660",
    "keywords": [
      "Intragenerational mobility",
      "Inequality",
      "Social mobility",
      "Life course",
      "Gender",
      "Korea"
    ],
    "summary": "미시계급 접근과 합성코호트 방법으로 1998–2017년 한국의 세대 내 직업이동을 분석한 결과, 남성과 달리 여성은 연령이 들어도 이동이 안정되지 않았고 미국과 달리 세대 내 이동이 증가하지 않아 불평등과 이동성의 관계에 대한 재고가 필요함을 보였다.",
    "plain": "소득 불평등이 커지는 시대에, 한 사람이 일생 동안 더 나은 직업으로 옮겨 갈 기회는 어떻게 달라졌을까요? 이 연구는 1998년부터 2017년까지 한국인의 생애 중 직업 이동을, 일을 쉬거나 그만두는 경우까지 포함해 성별과 나이에 따라 살폈습니다. 남성은 나이가 들수록 직업 이동이 안정되었지만 여성은 그렇지 않았고, 노동시장을 떠났다가 다시 들어오는 일도 여성에게서 훨씬 잦았습니다. 연구진은 급속한 경제 성장 속에서도 지속된 가부장적 문화가 이런 차이를 낳았다고 해석합니다. 또한 생애 중 직업 이동이 늘어 불평등 심화를 일부 상쇄했던 미국과 달리 한국에서는 이동이 늘지 않았으며, 이는 불평등과 사회이동의 관계를 성별화된 생애 경로의 관점에서 다시 생각해야 함을 시사합니다.",
    "themes": [
    "class",
    "lifecourse",
    "gender",
    "labor",
    "popstructure"
    ]
  },
  {
    "id": "p22",
    "label": "부모-자녀 동거의 변화",
    "title": "Are parents and children coresiding less than before? An analysis of intergenerational coresidence in South Korea, 1980–2015",
    "year": 2021,
    "kind": "paper",
    "authors": [
      "Bongoh Kye",
      "Yool Choi"
    ],
    "venues": [
      "Demographic Research, 45(1), 1–16"
    ],
    "doi": "10.4054/DemRes.2021.45.1",
    "keywords": [],
    "summary": "1980–2015년 한국 인구센서스 1% 자료와 Sullivan 방법을 활용해 세대 간 동거 양상의 변화를 분석한 결과, 연령구조 통제 시 부모와의 동거는 증가했으나 자녀와의 동거는 출산율 감소와 결혼 지연으로 크게 줄어 생애 중 자녀 동거 비율이 거의 절반으로 감소했다.",
    "plain": "부모와 자녀가 한 집에 사는 일은 아이를 돌보고 노부모를 부양하는 데 중요한 역할을 하기에, 고령화가 빠른 한국에서 특히 주목할 만한 문제입니다. 1980년부터 2015년까지의 인구센서스 자료를 분석해, 출산율 감소와 수명 연장, 결혼 양상의 변화가 세대 간 동거에 어떤 영향을 미쳤는지 살폈습니다. 인구 구성의 변화를 고려하면, 형제자매 수가 줄고 결혼이 늦어지면서 성인 자녀가 부모와 함께 사는 비율은 오히려 늘었습니다. 반면 저출산과 만혼으로 부모가 자녀와 함께 사는 비율은 크게 줄어, 일생 중 자녀와 함께 사는 기간의 비율은 거의 절반으로 감소했습니다. 이는 가족 안에서 이루어지던 돌봄 기반이 약해지고 있으며, 사회적 돌봄 체계에 대한 고민이 더 필요함을 시사합니다.",
    "themes": [
    "family",
    "demography",
    "popstructure",
    "fertility"
    ]
  },
  {
    "id": "p21",
    "label": "사회적경제기업과 직업만족도",
    "title": "기업 유형에 따른 주관적 고용의 질이 근로자의 전반적 직업만족도에 미치는 영향: 사회적경제기업을 중심으로",
    "titleAlt": "The Effect of Subjective Employment Quality on Job Satisfaction by the Firm Types: Focusing on Social Economy Enterprises",
    "year": 2021,
    "kind": "paper",
    "authors": [
      "정준서",
      "최율"
    ],
    "venues": [
      "현상과인식, 45(2), 83-112"
    ],
    "keywords": [
      "Social Economy Enterprises",
      "Subjective Quality of Employment",
      "Job Satisfaction"
    ],
    "summary": "고용노동부 실태조사와 한국노동패널 자료를 분석한 결과, 사회적경제기업 근로자의 주관적 고용의 질이 일반기업보다 대체로 높았으며, 사회적경제기업은 직업/직무의 질을, 일반기업은 근로조건의 질을 통해 더 큰 직업만족을 얻는 것으로 나타났다.",
    "plain": "사회적 가치를 함께 추구하는 사회적경제기업은 일하는 사람에게 더 좋은 일터일까요? 정부 실태조사와 노동패널 자료를 분석한 결과, 사회적경제기업 근로자가 스스로 느끼는 고용의 질은 일반기업보다 전반적으로 높았고, 세부 유형 가운데서는 소셜벤처가 대체로 높았습니다. 다만 만족의 원천은 서로 달랐습니다. 사회적경제기업 근로자는 하는 일과 직무 자체의 질에서 더 큰 만족을 얻은 반면, 일반기업 근로자는 근로조건의 질에서 더 큰 만족을 얻었습니다. 이러한 결과는 사회적경제기업이 일반기업과 구별되는 고유한 질적 특성을 지니고 있으며, 일터의 만족이 어떤 측면에서 비롯되는지는 기업 유형에 따라 다를 수 있음을 시사합니다.",
    "themes": [
      "labor"
    ]
  },
  {
    "id": "p20",
    "label": "대학 교육의 변화하는 가치",
    "title": "The changing value of college education in Korea: Focusing on its heterogeneous wage returns across birth cohorts (1956-1986)",
    "year": 2020,
    "kind": "paper",
    "authors": [
      "Yool Choi",
      "Harris Hyun-Soo Kim",
      "Doo Hwan Kim"
    ],
    "venues": [
      "KEDI Journal of Educational Policy, 17(2), 273-296"
    ],
    "doi": "10.22804/kjep.2020.17.2.006",
    "keywords": [
      "College education",
      "treatment effect heterogeneity",
      "educational inequality",
      "South Korea"
    ],
    "summary": "한국교육개발원의 교육 및 사회이동 조사를 이용해 세 출생 코호트의 대학 학위 임금효과를 분석한 결과, 평균 효과는 크게 감소하고 효과 이질성은 부적 선택에서 정적 선택으로 바뀌어 대학 학위가 사회 재생산을 강화해 왔음을 보였다.",
    "plain": "대학 졸업장은 오랫동안 한국 사회에서 더 나은 일자리와 소득으로 가는 사다리로 여겨져 왔습니다. 그런데 그 사다리는 모두에게 같은 높이일까요? 1956년부터 1986년 사이에 태어난 세 세대를 비교한 결과, 대학 학위가 임금을 높여 주는 평균적인 효과는 세대가 내려올수록 크게 줄었습니다. 또한 예전 세대에서는 대학에 갈 가능성이 낮았던 사람이 학위로 더 큰 이득을 보았지만, 최근 세대로 올수록 오히려 유리한 배경의 사람이 더 큰 이득을 얻는 방향으로 바뀌었습니다. 이는 대학 학위가 계층 이동의 통로라기보다 사회적 재생산을 강화하는 방향으로 작동해 왔고, 불리한 배경의 학생에게 돌아가는 경제적 혜택은 크게 줄었음을 보여줍니다.",
    "themes": [
    "highered",
    "class",
    "hetero",
    "popstructure"
    ]
  },
  {
    "id": "p19",
    "label": "세대 간 이동과 교육불평등",
    "title": "한국의 세대 간 사회이동과 교육 불평등: 2000년대 이후 경험적 연구에 대한 종합적 검토",
    "titleAlt": "Intergenerational Social Mobility and Educational Inequality in South Korea: A Comprehensive Review of Empirical Studies since 2000",
    "year": 2020,
    "kind": "paper",
    "authors": [
      "정인관",
      "최성수",
      "황선재",
      "최율"
    ],
    "venues": [
      "경제와사회, 127, 12-59"
    ],
    "doi": "10.18207/criso.2020..127.12",
    "keywords": [
      "Intergenerational stratification mobility",
      "Educational inequality",
      "Shadow education",
      "Cultural capital",
      "Social capital"
    ],
    "summary": "2000년대 이후 한국의 세대 간 사회이동과 교육기회 불평등에 관한 경험적 연구를 종합 검토한 결과, 최근 출생 코호트에서 직업·소득의 세대 간 상관성이나 최종학력 기회 불평등이 증가했다는 뚜렷한 증거는 찾기 어려웠으며, 교육 외 경로의 중요성 증대 가능성을 논의하였다.",
    "plain": "'개천에서 용 나기 어려워졌다'는 말처럼, 많은 한국인은 부모의 지위가 자녀의 삶을 점점 더 강하게 좌우한다고 느낍니다. 이 연구는 2000년대 이후 발표된 세대 간 사회이동과 교육 불평등에 관한 경험적 연구들을 종합적으로 검토했습니다. 그 결과 최근 세대로 올수록 부모와 자녀의 직업이나 소득이 더 강하게 이어졌다는 뚜렷한 증거는 찾기 어려웠고, 최종 학력에서 교육 기회의 불평등이 커졌다는 증거도 분명하지 않았습니다. 다만 몇몇 연구는 교육을 거치지 않고 부모의 지위가 자녀에게 직접 이어지는 경로의 중요성이 커지고 있을 가능성을 보여줍니다. 이는 사회적 인식과 경험적 증거 사이에 간극이 있으며, 그 이유를 설명하기 위한 새로운 질문이 필요함을 시사합니다.",
    "themes": [
      "class",
      "education",
      "shadow"
    ]
  },
  {
    "id": "p18",
    "label": "국제결혼 부부의 이혼",
    "title": "Marital dissolution of transnational couples in South Korea",
    "year": 2020,
    "kind": "paper",
    "authors": [
      "Yool Choi",
      "Doo-Sub Kim",
      "Jungkyun Ryu"
    ],
    "venues": [
      "Journal of Ethnic and Migration Studies, 46(14), 3014-3039"
    ],
    "doi": "10.1080/1369183X.2019.1585021",
    "keywords": [
      "Marital dissolution",
      "Marital stability",
      "Transnational marriage",
      "Heterogamy hypothesis",
      "Sham marriage"
    ],
    "summary": "2010~2014년 혼인·이혼 등록자료를 분석한 결과, 국제결혼은 혼인 후 48개월 내 이혼 위험이 내국인 간 결혼보다 매우 높았으며, 중국 출신 배우자와 동남아 출신 아내, 저학력 외국인 아내의 이혼 위험이 높고 국적 취득은 이혼 위험을 낮추는 것으로 나타났다.",
    "plain": "한국에서 국제결혼이 크게 늘었지만, 이들 부부가 실제로 얼마나 오래 결혼을 유지하는지는 정확히 알려져 있지 않았습니다. 통계청의 혼인·이혼 등록 자료를 분석한 결과, 국제결혼은 혼인 후 48개월 안에 이혼할 위험이 매우 높았습니다. 한국인 남편과 외국인 아내 부부의 약 19%가 이 기간에 이혼한 반면, 내국인 간 결혼은 약 6%에 그쳤습니다. 중국 출신 배우자, 동남아시아 출신 아내, 그리고 학력이 낮은 외국인 아내의 이혼 위험이 특히 높았으며, 한국 국적을 취득하면 이혼 위험이 낮아졌습니다. 이 연구는 결혼 기간에 따른 국제결혼의 실제 이혼 위험을 처음으로 제시한 것으로, 국적 취득처럼 이주 배우자의 법적 지위가 가족의 안정과 연결되어 있음을 보여줍니다.",
    "themes": [
    "migration",
    "family",
    "popstructure"
    ]
  },
  {
    "id": "p17",
    "label": "『사회과교육연구』 연구 동향",
    "title": "텍스트마이닝과 연결망 분석을 활용한 『사회과교육연구』의 연구 동향 분석",
    "titleAlt": "An Analysis of Research Trends in Journal of Research in Social Studies Education Using Text Mining and Network Analysis",
    "year": 2020,
    "kind": "paper",
    "authors": [
      "허수미",
      "김세현",
      "최율"
    ],
    "venues": [
      "사회과교육연구, 27(2), 1-26"
    ],
    "doi": "10.37409/RSSE.27.2.1",
    "keywords": [
      "사회과교육연구",
      "메타분석",
      "텍스트마이닝",
      "연결망분석",
      "비정형데이터",
      "Research in Social Studies Education",
      "Meta Analysis",
      "Text Mining",
      "Network Analysis",
      "Unstructured Data"
    ],
    "summary": "2003~2019년 『사회과교육연구』 게재 논문 전체를 텍스트마이닝, 연결망 분석, 질적 방법으로 메타분석하여 연구주제 간 불균형과 기초연구 약화, 교육과정·교과서·수업연구의 고립을 확인하고 통합형 연구와 새로운 메타연구의 필요성을 제안하였다.",
    "plain": "한 학문 분야가 어떤 주제에 관심을 쏟고 무엇을 놓쳐 왔는지 돌아보는 일은 그 분야의 앞날을 설계하는 데 중요합니다. 이 연구는 2003년부터 2019년까지 『사회과교육연구』에 실린 모든 논문을 대상으로, 텍스트 분석 기법과 질적 검토를 함께 사용해 연구 흐름을 살폈습니다. 그 결과 주제 간 편중은 점차 완화되고 있었지만, 시민성이나 민주주의처럼 사회과교육의 본질에 해당하는 기초 주제는 크게 약해진 것으로 나타났습니다. 또한 교육과정, 교과서, 수업 연구가 서로 연결되지 못한 채 따로 이루어지는 경향이 강했습니다. 이는 영역별 심층 연구와 함께 영역을 잇는 통합형 연구가 필요하며, 빅데이터 분석 등 새로운 방법을 활용한 메타연구도 활성화되어야 함을 시사합니다.",
    "themes": [
      "education"
    ]
  },
  {
    "id": "p16",
    "label": "경쟁의식과 소수자 수용성",
    "title": "이질적 경쟁의식이 소수자 수용성에 미치는 영향",
    "titleAlt": "Effects of Heterogeneous Consciousness of Competition on Acceptability of Minorities",
    "year": 2020,
    "kind": "paper",
    "authors": [
      "정준서",
      "최율"
    ],
    "venues": [
      "사회과학연구, 31(1), 113-139"
    ],
    "doi": "10.16881/jss.2020.01.31.1.113",
    "keywords": [
      "경쟁의식",
      "차별의식",
      "소수자",
      "구조적 경쟁",
      "의도적 경쟁",
      "Consciousness of Competition",
      "Minority",
      "Structural Consciousness of Competition",
      "Intentional Consciousness of Competition"
    ],
    "summary": "경쟁의식을 의도적 경쟁의식과 구조적 경쟁의식으로 구분하여 2017년 사회통합 조사를 분석한 결과, 의도적 경쟁의식은 모든 소수자 수용성에 부적 영향을, 구조적 경쟁의식은 다수 소수자 유형에 정적 영향을 미치는 것으로 나타났다.",
    "plain": "경쟁이 치열한 사회일수록 사람들이 소수자에게 더 배타적이 된다는 이야기를 흔히 듣습니다. 이 연구는 경쟁의식을 두 가지로 나누어 봅니다. 남을 이기려는 개인의 태도가 강조되는 '의도적 경쟁의식'과, 사회 구조가 사람들을 경쟁으로 내몬다고 보는 '구조적 경쟁의식'입니다. 2017년 사회통합 조사를 분석한 결과, 의도적 경쟁의식은 모든 유형의 소수자를 덜 받아들이게 했지만, 구조적 경쟁의식은 장애인, 이주민, 외모나 경쟁에서 뒤처진 사람 등 여러 소수자를 오히려 더 받아들이게 했습니다. 경쟁의식이 늘 차별을 부추긴다는 기존 생각과 달리, 경쟁을 어떻게 이해하느냐에 따라 차별에 미치는 방향이 정반대일 수 있음을 보여줍니다.",
    "themes": [
      "migration"
    ]
  },
  {
    "id": "p15",
    "label": "공무원 시험과 계층",
    "title": "대졸 청년의 공무원 시험 준비 및 합격에 나타난 계층수준과 교육성취의 효과",
    "titleAlt": "Analyzing class and education effect on trial to civil servant test and success in civil servant test",
    "year": 2019,
    "kind": "paper",
    "authors": [
      "김도영",
      "최율"
    ],
    "venues": [
      "경제와사회, 123, 40-74"
    ],
    "doi": "10.18207/criso.2019..123.40",
    "keywords": [
      "civil servant test",
      "class",
      "education",
      "labor market",
      "meritocracy",
      "Graduates Occupational Mobility Survey(GOMS)"
    ],
    "summary": "대졸자직업이동경로조사(GOMS) 자료를 분석한 결과, 공무원 시험 준비는 대체로 하층과 낮은 교육성취 집단에서 많지만 5급 시험은 상층·최상위대학의 준비가 두드러지며, 합격은 계층수준과 교육성취가 높을수록 높아 공무원 시험이 계층 재생산 경로로 작동할 수 있음을 보였다.",
    "plain": "공무원 시험은 집안 배경과 상관없이 실력만으로 겨루는 공정한 통로로 여겨지며, 많은 청년이 이 길에 몰리고 있습니다. 대학 졸업자 조사 자료를 분석해 보니, 공무원 시험 준비 자체는 형편이 어려운 계층과 교육 성취가 낮은 청년들 사이에서 더 많았습니다. 그러나 보상이 큰 5급 시험은 오히려 상층 가정과 최상위권 대학 출신이 많이 준비했고, 실제 합격은 모든 시험에서 계층이 높고 교육 성취가 높을수록 일관되게 더 잘 이루어졌습니다. 이는 겉으로는 '기회의 평등'을 보장하는 듯한 시험 제도 안에서도 기회가 사회경제적 자원에 따라 다르게 나뉘고 있음을 보여줍니다. 불리한 위치의 청년에게 더 큰 희망으로 보이는 공무원 시험이 실제로는 또 하나의 계층 재생산 경로가 될 수 있음을 시사합니다.",
    "themes": [
      "labor",
      "class",
      "education"
    ]
  },
  {
    "id": "p14",
    "label": "배제의 법칙으로서의 입시제도",
    "title": "배제의 법칙으로서의 입시제도: 사회적 계층 수준에 따른 대학 입시제도 인식 분석",
    "titleAlt": "College Admission System as a Rule of Exclusion: The Relationship between Social Class and Perception of College Admission System",
    "year": 2019,
    "kind": "paper",
    "authors": [
      "문정주",
      "최율"
    ],
    "venues": [
      "한국사회학, 53(3), 175-215"
    ],
    "keywords": [
      "대학 입시제도",
      "교육불평등",
      "배제의 법칙",
      "주관적 계층의식",
      "학생부종합전형",
      "정시전형",
      "College Entrance System",
      "Educational Inequality",
      "Rule of Exclusion",
      "Subjective Class Consciousness",
      "Comprehensive School Report Policy",
      "Regular Admission"
    ],
    "summary": "계층의식과 사회 신뢰 수준에 따른 입시제도 이해와 선호 차이를 분석한 결과, 상층일수록 입시제도 이해도가 높고 정시전형을 선호한 반면 신뢰가 높을수록 학생부종합전형을 선호하여, 입시제도 변화가 계층 간 전략적 투쟁의 산물일 수 있음을 시사한다.",
    "plain": "수능 위주의 정시와 학교생활기록부 중심의 학생부종합전형 중 어느 쪽이 더 공정한지를 둘러싼 논쟁은 한국 사회의 오랜 화두입니다. 이 연구는 사람들이 스스로 인식하는 계층 수준과 한국 사회에 대한 신뢰 정도에 따라 입시제도를 얼마나 이해하고 어떤 제도를 선호하는지 분석했습니다. 그 결과 스스로를 상층이라고 여길수록 입시제도를 더 잘 이해하고 정시전형을 선호했으며, 사회에 대한 신뢰가 높을수록 학생부종합전형을 선호했습니다. 이는 학생부종합전형이 '금수저 전형'이라는 비판적 담론과는 배치되는 결과입니다. 연구는 입시제도의 변화가 기회의 평등이나 공정성 같은 가치만이 아니라, 각 계층이 자신에게 유리한 방향으로 제도를 바꾸려는 전략적 경쟁의 결과일 수 있음을 시사합니다.",
    "themes": [
      "education",
      "class",
      "highered"
    ]
  },
  {
    "id": "p13",
    "label": "ICT 활용 교육의 동향",
    "title": "ICT를 활용한 교육의 동향과 전망",
    "titleAlt": "The Trends and Prospects of ICT based Education",
    "year": 2018,
    "kind": "paper",
    "authors": [
      "우현정",
      "조혜정",
      "최율"
    ],
    "venues": [
      "정보화정책, 25(4), 3-36"
    ],
    "doi": "10.22693/NIAIP.2018.25.4.003",
    "keywords": [
      "ICT",
      "교육",
      "디지털시민성",
      "평생 학습자",
      "플립러닝",
      "증강현실",
      "ICT",
      "education",
      "digital citizenship",
      "flipped learning",
      "augmented reality"
    ],
    "summary": "ICT 융합 교육에 관한 선행연구를 교육의 목표, 내용, 방법, 평가 측면에서 검토하여 디지털 시민성, SW교육, 플립러닝·증강현실, 컴퓨터 기반 평가 등의 동향을 정리하고 교육불평등 관점에서 그 가능성과 한계를 논의하였다.",
    "plain": "디지털 기술이 빠르게 발전하면서 학교 교육도 정보통신기술(ICT)과 결합한 새로운 모습으로 바뀌고 있습니다. 이 연구는 ICT를 활용한 교육에 관한 기존 연구들을 교육의 목표, 내용, 방법, 평가라는 네 측면에서 종합적으로 검토했습니다. 그 결과 목표 면에서는 사회에 능동적으로 참여하는 디지털 시민성의 함양이, 내용 면에서는 소프트웨어 교육이, 방법 면에서는 플립러닝(온라인으로 미리 학습하고 수업 시간에는 토론과 활동을 하는 방식)과 증강현실 활용이, 평가 면에서는 컴퓨터 기반 평가가 주요 흐름으로 정리되었습니다. 다만 교사 역량 강화와 교육환경 개선 같은 제도적 뒷받침이 없다면 그 효과가 반감될 수 있다고 지적합니다. 아울러 ICT 교육의 가능성과 한계를 교육 불평등의 관점에서 함께 논의합니다.",
    "themes": [
      "education"
    ]
  },
  {
    "id": "p12",
    "label": "외국인 여성의 출산결과",
    "title": "외국인 여성과 한국인 여성의 출산결과 비교: 조산아 및 저체중아를 중심으로",
    "titleAlt": "Birth Outcomes among Native-born and Foreign-born Women in Korea: Focusing on Preterm Birth and Low Birth Weight",
    "year": 2018,
    "kind": "paper",
    "authors": [
      "유정균",
      "최율"
    ],
    "venues": [
      "Journal of Health Informatics and Statistics, 43(4), 255-266"
    ],
    "doi": "10.21032/jhis.2018.43.4.255",
    "keywords": [
      "Preterm birth",
      "Low birth weight",
      "Foreign-born women",
      "Minority",
      "Epidemiological paradox"
    ],
    "summary": "2010-2016년 출생등록 자료를 활용해 외국인 여성과 한국인 여성의 조산 및 저체중아 출산 위험을 비교한 결과, 외국인 여성의 위험은 결혼 초기 첫째 출산에 집중되어 있어 초기 정착 지원의 필요성을 제기하였다.",
    "plain": "국제결혼으로 한국에 이주한 여성이 늘면서 이들의 임신과 출산 건강은 개인을 넘어 사회 전체의 과제가 되었습니다. 이 연구는 2010년부터 2016년까지 한국에서 출산한 모든 여성의 출생등록 자료를 활용해, 외국인 여성과 한국인 여성의 조산과 저체중아 출산 위험을 비교했습니다. 그 결과 첫째 아이의 경우 결혼 초기에는 외국인 여성의 위험이 더 높았지만, 결혼 기간이 길어질수록 오히려 한국인 여성의 위험이 더 높았습니다. 둘째 아이에서는 결혼 기간과 관계없이 외국인 여성의 위험이 더 낮았습니다. 이는 이주 여성의 출산 위험이 결혼 초기에 집중되어 있음을 보여주며, 한국 사회에 처음 정착하는 시기에 제도적·문화적 지원을 집중할 필요가 있음을 시사합니다.",
    "themes": [
      "migration",
      "health",
      "fertility"
    ]
  },
  {
    "id": "p11",
    "label": "미국 사교육과 SAT 점수",
    "title": "The Heterogeneous Effects of Shadow Education on SAT Scores",
    "year": 2018,
    "kind": "paper",
    "authors": [
      "Yool Choi"
    ],
    "venues": [
      "Development and Society, 47(3), 451-476"
    ],
    "doi": "10.21588/dns/2018.47.3.006",
    "keywords": [
      "shadow education",
      "private supplementary education",
      "heterogeneous effects",
      "positive selection",
      "negative selection"
    ],
    "summary": "ELS 2002 자료를 활용해 사교육이 SAT 점수에 미치는 효과가 참여 성향에 따라 이질적임을 분석한 결과, 사회경제적으로 유리한 학생일수록 사교육 효과가 더 크게 나타났으며 공적 자원 활용은 이를 완화하지 못하였다.",
    "plain": "학원 수업이나 일대일 과외 같은 사교육은 동아시아뿐 아니라 미국에서도 대학 입시를 둘러싸고 빠르게 늘고 있습니다. 이 연구는 미국 고등학생 추적 자료를 활용해, 사교육이 대입 시험인 SAT 점수에 미치는 효과가 사교육을 받을 가능성에 따라 어떻게 달라지는지 분석했습니다. 그 결과 사교육을 받을 가능성이 높은 학생들, 즉 사회경제적으로 유리하고 교육적 자원이 많은 학생일수록 사교육으로부터 더 큰 혜택을 얻었습니다. 또한 학교 등 공적 자원을 활용하는 것만으로는 이러한 효과의 차이가 줄어들지 않았습니다. 이는 미국에서 사교육이 이미 유리한 학생의 이점을 더 키워 계층 간 교육 격차를 넓히는 통로가 될 수 있음을 시사합니다.",
    "themes": [
      "shadow",
      "education",
      "hetero"
    ]
  },
  {
    "id": "p10",
    "label": "대학생 근로와 중도탈락",
    "title": "Student Employment and Persistence: Evidence of Effect Heterogeneity of Student Employment on College Dropout",
    "year": 2018,
    "kind": "paper",
    "authors": [
      "Yool Choi"
    ],
    "venues": [
      "Research in Higher Education, 59(1), 88-107"
    ],
    "doi": "10.1007/s11162-017-9458-y",
    "keywords": [
      "Student employment",
      "Dropout",
      "Effect heterogeneity",
      "National Longitudinal Survey of Youth 1997"
    ],
    "summary": "NLSY97 자료와 성향점수매칭 및 층화-다층분석을 활용하여 대학 재학 중 고강도 근로가 학업 지속에 부정적 영향을 미치며, 그 효과는 근로 참여 가능성이 높은 불리한 배경의 학생에게서 상대적으로 작음을 보였다.",
    "plain": "학비와 생활비를 벌기 위해 일하며 대학을 다니는 학생은 많지만, 이런 아르바이트가 학업을 끝까지 마치는 데 어떤 영향을 미칠까요? 미국 청년 패널 자료를 분석한 이 연구는 학업과 병행하는 고강도 근로가 대학을 중도에 그만둘 위험을 높인다는 점을 확인했습니다. 다만 그 부정적 영향은 모든 학생에게 같지 않았습니다. 고강도로 일할 가능성이 가장 높은 학생들, 즉 대체로 가장 불리한 사회적 배경을 가진 학생들에게서는 부정적 영향이 상대적으로 작게 나타났습니다. 이는 학생들이 일하는 이유와 그 영향이 집단마다 다를 수 있으므로, 근로의 부작용을 줄이려는 지원 정책도 학생 집단의 특성을 세심하게 고려해 설계되어야 함을 시사합니다.",
    "themes": [
      "highered",
      "labor",
      "hetero"
    ]
  },
  {
    "id": "p09",
    "label": "한일 노동시장·복지 이중화",
    "title": "Convergent or Divergent? The Hidden Dynamics of Institutional Changes in the Labor Markets and Social Welfare Systems in South Korea and Japan",
    "year": 2017,
    "kind": "paper",
    "authors": [
      "Sungik Cho",
      "Yool Choi"
    ],
    "venues": [
      "Politics & Policy, 45(4), 594-625"
    ],
    "doi": "10.1111/polp.12208",
    "keywords": [
      "Social Policy",
      "Labor Policy",
      "Labor Markets",
      "Welfare System",
      "Social Welfare Programs in Asia",
      "Institutional Change",
      "Institutional Complementarity",
      "Varieties of Capitalism",
      "Dualization",
      "Japan",
      "South Korea",
      "Interfirm Relations",
      "Subcontracting",
      "Nonstandard Workers"
    ],
    "summary": "한국과 일본의 노동시장 및 사회복지 이중화는 유사해 보이나, 대기업-하청 관계의 차이로 인해 일본은 협력적 관계 속 결합된 이중화를, 한국은 착취적 하청관계로 인한 탈결합된 이중화를 보인다고 주장한다.",
    "plain": "한국과 일본은 정규직과 비정규직이 나뉘는 노동시장, 그리고 비정규직에 대한 사회보장 확대라는 점에서 비슷한 변화를 겪어 온 것처럼 보입니다. 이 연구는 두 나라의 겉모습은 닮았지만 그 내부 구조와 작동 방식은 상당히 다르며, 그 차이를 만드는 핵심이 대기업과 하청기업 간의 관계라고 주장합니다. 일본에서는 협력적인 기업 간 관계가 완충 역할을 하면서 노동시장과 복지제도의 분절이 서로 맞물려 점진적으로 조정되었습니다. 반면 한국에서는 착취적인 하청 관계가 노동시장 분절을 심화시키고 정부의 노동·복지 규제를 약화시켰습니다. 그 결과 한국은 복지제도가 형식적으로는 모두를 포괄하도록 설계되어 있는데도 실제로는 사각지대가 지속된다는 점을 보여주며, 제도 설계만큼 산업 구조를 함께 보아야 함을 시사합니다.",
    "themes": [
      "labor",
      "poverty"
    ]
  },
  {
    "id": "p08",
    "label": "대학·전공 선택과 노동시장 진입",
    "title": "대입시기 대학 및 전공에 대한 선택이 노동시장 진입에 미치는 영향",
    "titleAlt": "The Effects of Selection of College and Major on Entry into the Labor Market",
    "year": 2017,
    "kind": "paper",
    "authors": [
      "이왕원",
      "최지은",
      "최율"
    ],
    "venues": [
      "고용직업능력개발연구, 20(1), 57-94"
    ],
    "keywords": [
      "학력주의",
      "선호전공",
      "대학전공 선택",
      "노동시장진입",
      "경쟁위험모형",
      "Credentialism",
      "Preference Major",
      "Selection of College and Major",
      "Labor Market Outcome",
      "Competing Risk Model"
    ],
    "summary": "대입시기 대학·전공 선택을 학력주의적 대학지향, 취업유리·취업불리 전공지향, 복합형의 네 유형으로 구분하고, 한국교육고용패널 자료와 경쟁위험분석으로 각 유형이 대졸자의 노동시장 진입에 미치는 영향을 분석하였다.",
    "plain": "수험생들은 흔히 '대학 간판'과 '원하는 전공' 사이에서 고민합니다. 이 연구는 대입 당시의 선택을 대학 서열을 우선한 선택, 취업에 유리한 전공을 우선한 선택, 취업에 불리하더라도 흥미에 따른 전공 선택, 대학과 전공을 함께 고려한 선택의 네 유형으로 나누고, 졸업 후 첫 취업과의 관계를 추적했습니다. 수능 성적이 비슷한 학생들끼리 비교했을 때, 대학 서열이나 취업에 유리한 전공을 택한 학생들은 비정규직으로 취업할 가능성이 낮고 대기업 정규직에 취업할 가능성이 높았습니다. 다만 상위권 대학 출신은 유리한 전공을 더해 큰 이득을 얻은 반면, 그 밖의 대학 출신은 유리한 전공을 택해도 효과가 주로 중소기업 정규직 취업에 그쳤습니다. 이는 한국 노동시장의 보상이 대학 서열과 소수 인기 학과에 지나치게 쏠려 있음을 보여줍니다.",
    "themes": [
      "highered",
      "labor"
    ]
  },
  {
    "id": "p07",
    "label": "콜레스테롤 검진 효과의 이질성",
    "title": "Do Regular Cholesterol Screenings Lead to Lower Cholesterol Levels and Better Health Behaviors for All? Spotlight on Middle-Aged and Older Adults in the United States",
    "year": 2017,
    "kind": "paper",
    "authors": [
      "Yool Choi",
      "Hyo Jung Lee"
    ],
    "venues": [
      "Journal of Aging and Health, 29(3), 389-414"
    ],
    "doi": "10.1177/0898264316635588",
    "keywords": [
      "cholesterol screening",
      "preventive health services",
      "cholesterol level",
      "Health and Retirement Study (HRS)",
      "heterogeneous effects"
    ],
    "summary": "건강과 은퇴 조사(HRS) 2008~2012년 자료에 성향점수매칭을 적용해 콜레스테롤 검진의 인과효과가 이용 가능성에 따라 어떻게 달라지는지 분석하였다. 검진 이용 가능성이 가장 낮은 집단이 검진을 받았을 때 가장 큰 혜택을 얻는 것으로 나타났다.",
    "plain": "콜레스테롤 검사 같은 예방 의료 서비스는 심장병과 뇌졸중 위험을 줄이는 데 중요하지만, 그 혜택이 누구에게나 같은지는 잘 알려지지 않았습니다. 이 연구는 미국 중·고령층을 대표하는 패널 자료를 활용해, 검사를 받을 가능성이 높은 사람과 낮은 사람 사이에서 검사의 효과가 어떻게 다른지 분석했습니다. 그 결과 평소 검사를 받을 가능성이 가장 낮은 사람들이 실제로 검사를 받았을 때 가장 큰 혜택을 얻었고, 검사를 받을 가능성이 가장 높은 사람들에게서는 효과가 가장 작았습니다. 이는 예방 의료의 공중보건 효과를 극대화하려면 의료 접근성이 낮은 취약 집단에 서비스를 우선적으로 연결하는 정책이 중요함을 시사합니다.",
    "themes": [
    "health",
    "hetero",
    "fertility"
    ]
  },
  {
    "id": "p06",
    "label": "계층귀속감과 상향이동의식",
    "title": "한국사회의 계층귀속감과 상향이동의식 변화: 연령, 기간 및 코호트 효과를 중심으로",
    "titleAlt": "Dynamics of Subjective Class Identification and Upward Mobility Consciousness in Korea: Time Trends and Age-Period-Cohort Effects",
    "year": 2016,
    "kind": "paper",
    "authors": [
      "이왕원",
      "김문조",
      "최율"
    ],
    "venues": [
      "한국사회학, 50(5), 247-284"
    ],
    "keywords": [
      "불평등",
      "계층귀속감",
      "상향이동",
      "연령",
      "기간",
      "코호트",
      "세대",
      "APC모형",
      "inequality",
      "class identification",
      "upward mobility",
      "age",
      "period",
      "cohort",
      "generation",
      "APC"
    ],
    "summary": "1999~2015년 사회조사 자료와 APC-D 모형을 활용해 한국인의 주관적 계층귀속감과 상향이동의식을 연령·기간·코호트 효과로 분해하였다. 계층귀속감과 세대내 상향이동의식에는 연령효과가, 세대간 상향이동의식에는 코호트효과가 결정적인 것으로 나타났다.",
    "plain": "'금수저·흙수저'라는 말이 유행할 만큼 한국 사회에서는 계층 이동에 대한 비관이 커져 왔습니다. 이 연구는 1999년부터 2015년까지의 사회조사 자료를 바탕으로, 스스로를 중상층이라고 느끼는 계층귀속감과 앞으로 계층이 올라갈 수 있다는 상향이동 기대가 어떻게 변해 왔는지를 나이, 시대, 세대의 영향으로 나누어 살펴보았습니다. 그 결과 계층귀속감과 본인 생애 안에서의 상향이동 기대는 주로 나이에 따라 달라졌고, 시대 변화의 영향도 일부 확인되었습니다. 반면 자녀 세대가 더 나아질 것이라는 세대 간 상향이동 기대는 어느 세대에 태어났는지에 따라 결정적으로 달라졌습니다. 이는 불평등에 대한 인식이 단순히 평균적으로 나빠지는 것이 아니라, 생애 단계와 세대 경험에 따라 복잡하게 분화되어 있음을 보여줍니다.",
    "themes": [
    "class",
    "lifecourse",
    "popstructure"
    ]
  },
  {
    "id": "p05",
    "label": "한국 사교육 효과의 이질성",
    "title": "Shadow education and educational inequality in South Korea: Examining effect heterogeneity of shadow education on middle school seniors' achievement test scores",
    "year": 2016,
    "kind": "paper",
    "authors": [
      "Yool Choi",
      "Hyunjoon Park"
    ],
    "venues": [
      "Research in Social Stratification and Mobility, 44, 22-32"
    ],
    "doi": "10.1016/j.rssm.2016.01.002",
    "keywords": [
      "Shadow education",
      "Private supplementary education",
      "Heterogeneous effects",
      "Positive selection",
      "Negative selection"
    ],
    "summary": "성향점수 기반의 두 가지 방법을 적용해 한국 중학교 3학년생의 사교육이 수학 성적에 미치는 이질적 효과를 분석하였다. 집중적 사교육의 효과는 사교육 이용 성향이 낮은, 즉 사회경제적으로 불리한 학생에게서 가장 크게 나타났다.",
    "plain": "한국 학생 대다수가 학원과 과외 같은 사교육을 받지만, 사교육의 효과가 모든 학생에게 똑같을까요? 이 연구는 중학교 3학년 학생들의 수학 성적을 분석해, 사교육을 받을 가능성이 높은 학생과 낮은 학생 사이에서 사교육 효과가 어떻게 다른지 살펴보았습니다. 그 결과 집중적인 수학 사교육의 효과는 평소 사교육을 받을 가능성이 낮은 학생들, 즉 사회경제적으로 불리한 배경의 학생들에게서 훨씬 크게 나타났습니다. 사교육을 가장 필요로 하면서도 접근하기 어려운 학생들이 정작 가장 큰 혜택을 볼 수 있다는 뜻입니다. 이는 교육 불평등을 줄이려면 불리한 학생들이 양질의 보충 학습에 접근할 수 있도록 지원하는 방안이 중요함을 시사합니다.",
    "themes": [
      "shadow",
      "education",
      "hetero"
    ]
  },
  {
    "id": "p04",
    "label": "저소득층 가구의 빈곤화 과정",
    "title": "한국 저소득층 가구의 빈곤화 과정에 관한 연구: 자기회귀교차지연(ARCL)모형을 통한 다중박탈 양상의 종단적 분석",
    "titleAlt": "Pauperization Process of the Lower Class Household in Korea: An ARCL Analysis of Triple-Helix Effects of Economic Deprivation, Depression and Family Conflict",
    "year": 2016,
    "kind": "paper",
    "authors": [
      "이왕원",
      "최율",
      "김문조"
    ],
    "venues": [
      "가족과 문화, 28(1), 162-206"
    ],
    "keywords": [
      "빈곤화",
      "신빈곤",
      "저소득층",
      "박탈",
      "우울",
      "가정불화",
      "자기회귀교차지연(ARCL)모형",
      "pauperization",
      "poverty",
      "low-income",
      "family",
      "deprivation",
      "depress",
      "conflict",
      "ARCL",
      "Korea"
    ],
    "summary": "한국복지패널 자료와 자기회귀교차지연모형을 활용해 저소득층 가구의 경제적 박탈, 가구 우울, 가정불화 간 관계를 종단적으로 분석하였다. 세 요인이 다중나선형으로 상호작용하며 빈곤을 재생산하는 '신빈곤' 모형이 가장 적합함을 확인하였다.",
    "plain": "가난은 단지 돈이 부족한 상태에 머무르지 않고, 가족의 마음과 관계에도 깊은 흔적을 남깁니다. 이 연구는 전국 복지 패널 자료를 활용해 저소득층 가구의 경제적 박탈, 가구원의 우울, 가정불화가 시간에 따라 서로 어떻게 영향을 주고받는지 추적했습니다. 기존에는 경제적 어려움이 우울과 불화를 낳는다는 일방향적 설명이 주를 이뤘지만, 분석 결과 세 요소가 나선처럼 얽혀 서로를 강화하며 빈곤을 재생산하는 모형이 현실을 가장 잘 설명했습니다. 이는 오늘날의 빈곤이 여러 차원의 박탈이 겹친 '신빈곤'의 성격을 띤다는 점을 보여줍니다. 빈곤 대책 역시 소득 지원에 그치지 않고 정서와 가족관계까지 함께 살피는 다차원적 접근이 필요함을 시사합니다.",
    "themes": [
      "poverty",
      "family"
    ]
  },
  {
    "id": "p03",
    "label": "고등교육 팽창의 역설",
    "title": "The Irony of the Unchecked Growth of Higher Education in South Korea: Crystallization of Class Cleavages and Intensifying Status Competition",
    "year": 2015,
    "kind": "paper",
    "authors": [
      "Doo Hwan Kim",
      "Yool Choi"
    ],
    "venues": [
      "Development and Society, 44(3), 435-463"
    ],
    "keywords": [
      "inequality in higher education",
      "higher education expansion",
      "politicization of education",
      "deregulation",
      "educational stratification"
    ],
    "summary": "국제기구의 높은 평가와 달리 한국인이 교육에 불만족하는 원인을 고등교육 불평등에서 찾고, 지난 수십 년간 고등교육의 무분별한 팽창과 정치적 동학이 교육 계층화와 지위경쟁 심화에 미친 영향을 역사적으로 검토하였다.",
    "plain": "국제기구는 한국 교육을 우수하고 공평하다고 높이 평가하지만, 정작 한국인들은 자국 교육에 깊은 불만을 갖고 있습니다. 이 연구는 그 간극의 핵심 원인을 대학 단계의 불평등에서 찾고, 지난 수십 년간 고등교육이 통제 없이 팽창해 온 역사적 과정을 추적합니다. 개인과 가족들의 교육 선택이 쌓이고 정치적 결정이 맞물리면서, 불평등을 줄일 것으로 기대되었던 대학 팽창이 오히려 지위 경쟁을 부추기고 계층 간 격차를 굳히는 아이러니한 결과를 낳았음을 보여줍니다. 출생 세대별 자료를 비교해 보면, 최근 세대일수록 가정배경과 명문대 진학의 관련성이 강해지는 경향도 확인됩니다. 대학 진학의 문이 넓어지는 것만으로는 교육을 통한 계층 이동이 보장되지 않는다는 점을 시사합니다.",
    "themes": [
      "highered",
      "education",
      "class"
    ]
  },
  {
    "id": "p02",
    "label": "청년층 취업선호도와 노동시장 진입",
    "title": "청년층 취업선호도와 노동시장 진입의 관계: 잠재집단분석과 생존분석을 통한 접근",
    "titleAlt": "Examining the Effects of Job Preference on Labor Market Outcomes in Korea",
    "year": 2015,
    "kind": "paper",
    "authors": [
      "최율",
      "이왕원"
    ],
    "venues": [
      "한국사회학, 49(5), 1-44"
    ],
    "keywords": [
      "청년실업",
      "취업선호도",
      "잠재집단분석",
      "경쟁위험모형",
      "Youth Unemployment",
      "Job Preference",
      "Latent Class Analysis",
      "Survival Analysis"
    ],
    "summary": "한국교육고용패널을 활용해 대졸자의 취업선호도를 잠재집단분석으로 네 유형으로 분류하고, 생존분석으로 첫 취업에 미치는 효과를 분석하였다. 취업선호도가 높은 집단은 대기업 정규직 취업 확률이 높아, 높은 '취업눈높이'가 오히려 좋은 일자리 진입에 정적 효과를 보였다.",
    "plain": "언론은 청년 실업의 원인으로 흔히 대졸자들의 '너무 높은 취업눈높이'를 지목하지만, 이를 실제로 검증한 연구는 드물었습니다. 이 연구는 대졸 청년들이 직장을 고를 때 중요하게 여기는 16가지 조건을 바탕으로 취업선호도를 네 가지 유형으로 나누고, 각 유형이 졸업 후 첫 취업에 어떤 차이를 만드는지 살펴보았습니다. 그 결과 모든 조건에서 기대 수준이 높은 집단일수록 대기업 정규직에 취업할 가능성이 높았고, 중소기업 정규직에 취업할 가능성은 낮았습니다. 이는 높은 눈높이가 구직의 걸림돌이라는 통념과 달리, 오히려 좋은 일자리 진입에 도움이 될 수 있음을 보여줍니다. 연구는 청년의 취업눈높이를 단순한 '최저 기준'이 아니라 목표와 희망, 전략을 담은 복합적인 가치로 이해해야 한다고 강조합니다.",
    "themes": [
      "labor",
      "highered"
    ]
  },
  {
    "id": "p01",
    "label": "해외 어학연수와 노동시장 성과",
    "title": "The effects of English training abroad on labor market outcomes in Korea",
    "year": 2015,
    "kind": "paper",
    "authors": [
      "Yool Choi"
    ],
    "venues": [
      "Research in Social Stratification and Mobility, 41, 11-24"
    ],
    "doi": "10.1016/j.rssm.2015.04.003",
    "keywords": [
      "English proficiency",
      "English training abroad",
      "Human capital",
      "Credentialism",
      "Transition from college to the labor market"
    ],
    "summary": "2007년 대졸자직업이동경로조사를 활용해 해외 어학연수가 한국 노동시장 성과에 미치는 영향을 생존분석과 분위회귀로 분석하였다. 어학연수는 좋은 일자리 취업과 임금에 상당한 정적 효과를 보였으며, 특히 비명문대 출신에게 학력 자격을 보완하는 수단으로 작용하였다.",
    "plain": "한국에서는 많은 대학생이 6개월에서 2년 정도 영어권 국가로 어학연수를 떠나는데, 이 경험이 실제로 취업과 소득에 도움이 될까요? 대졸자들의 졸업 후 진로를 추적한 전국 조사 자료를 분석한 결과, 평균적인 효과는 크지 않아 보이지만 어학연수는 좋은 일자리를 얻고 더 높은 임금을 받는 데 상당한 도움이 되는 것으로 나타났습니다. 특히 명문대를 나오지 않은 학생들에게 어학연수는 상대적으로 약한 학벌을 보완하는 수단으로 작용했습니다. 문제는 어학연수에 큰 비용이 든다는 점입니다. 따라서 이 결과는 경제적 여유가 없는 가정의 학생들이 이 경로에서 배제되면서, 노동시장의 기회가 결국 가정의 사회경제적 배경에 크게 좌우될 수 있음을 시사합니다.",
    "themes": [
      "labor",
      "highered"
    ]
  }
];

// 중요한 타자(Significant Others): 연구실과 긴밀히 함께하는 연구모임
const SIGNIFICANT_OTHERS = [
  {
    "name": "불평등 연구회",
    "en": "Inequality Research Group",
    "desc": "한국 사회의 불평등을 연구하는 연구자들의 학술 모임으로, CAU Inequality Lab과 가장 가까이에서 함께 호흡하는 연구 공동체입니다. 연구실 구성원들은 연구회 교수진과의 긴밀한 네트워크 속에서 공동연구에 참여하고, 학위논문 심사위원으로 교수진을 모실 기회도 가질 수 있습니다.",
    "highlights": [
      [
        "월례발표회",
        "매달 진행 중인 연구를 발표하고 함께 토론합니다."
      ],
      [
        "국제 심포지움",
        "매년 7월, 국내외 연구자가 모이는 심포지움을 엽니다."
      ],
      [
        "공동연구 · 학위논문 심사",
        "연구회 교수진과 공동연구를 하고, 학위논문 심사위원으로 모실 수 있습니다."
      ]
    ],
    "url": "http://inequality.kr/",
    "linkText": "inequality.kr"
  }
];

// 대학원생 멘토 네트워크 (중요한 타자 섹션 아래 한 줄)
const MENTORS = {
  "title": "대학원생 멘토 네트워크",
  "desc": "연구실 공동연구에 함께하며 대학원생들의 다양한 멘토 역할을 해주시는 연구자들입니다.",
  "people": [
    {
      "name": "이지원 박사님",
      "note": "Cornell University 박사후연구원",
      "url": "https://jiwonlee.net/"
    },
    {
      "name": "이지원 박사님",
      "note": "University at Albany, SUNY 사회학 박사",
      "url": "https://g1lee.notion.site/"
    },
    {
      "name": "류정균 박사님",
      "note": "경기연구원",
      "url": ""
    },
    {
      "name": "임영신 박사님",
      "note": "삼성글로벌리서치",
      "url": ""
    }
  ]
};

