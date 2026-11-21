# Tokyo Transit & Tour Companion - Design System (DESIGN.md)

Stitch Project ID: `9283906253292486330`  
Design System Asset: `assets/653d2cfdb1a9486d84e2f7bfaf2e55b0`

---

## 1. Brand & Style Overview

이 디자인 시스템은 도쿄의 복잡하고 역동적인 도시 환경을 탐색하는 현장 가이드와 여행객을 위해 최적화되었습니다.
현대적인 일본의 기능주의 미니멀리즘(Functional Minimalism)과 초명확한 모바일 길찾기(Wayfinding) 원칙을 결합하여, 야외의 강한 햇빛 아래나 지하철 역사 내에서도 탁월한 가독성과 안정감을 제공합니다.

* **감성적 가치:** 직관적인 이동성, 긴급 상황 시 즉각적인 정보 인지, 한 손 조작 편의성
* **기본 뷰포트:** Mobile First (390px 기준), PC 화면에서는 `max-w-md` 중앙 정렬 앱 셸 레이아웃 유지

---

## 2. Color Tokens (색상 체계)

현대 일본 대중교통 인포메이션 시스템의 효율성과 가독성을 반영한 팔레트입니다.

### Core Brand & Functional Colors
| 토큰명 | Hex 코드 | 설명 및 용도 |
| :--- | :--- | :--- |
| `primary` | `#00236F` | 메인 딥 인디고 (타이틀, 주요 헤더) |
| `primary-container` | `#1E3A8A` | 일본 전통 쪽빛(Aizome) 인디고 - 주요 CTA 버튼, 활성 탭 |
| `primary-fixed` | `#DCE1FF` | 부드러운 인디고 틴트 (선택된 아이템 배경) |
| `secondary` | `#855300` | 딥 앰버 텍스트 |
| `secondary-container` | `#FEA619` / `#F59E0B` | 긴급 공지 배너, 주의 알림, 택시 카드 포인트 옐로우 |
| `tertiary` | `#00311F` | 딥 에메랄드 그린 |
| `tertiary-container` | `#004A31` / `#10B981` | 완료 상태 뱃지, 체크리스트 프로그레스 바 성공 색상 |
| `background` | `#F7F9FB` | 캔버스 기본 배경 (눈부심 방지 쿨그레이) |
| `surface` | `#FFFFFF` | 카드, 바텀시트, 모달 등 컴포넌트 표면 |
| `surface-container-low` | `#F2F4F6` | 비활성 탭, 보조 카드 배경 |
| `outline` | `#E2E8F0` / `#CBD5E1` | 구분선 및 테두리 (Slate 200/300) |
| `on-surface` | `#0F172A` / `#191C1E` | 메인 텍스트 (고대비 가독성 확보) |
| `on-surface-variant` | `#475569` | 보조 텍스트, 시간, 현지어 보조 발음 |
| `error` | `#BA1A1A` | 긴급 SOS, 삭제, 에러 뱃지 |

### Category Tag Colors
* **관광 (Sightseeing):** Blue Tag (`bg-blue-50 text-blue-700 border-blue-200`)
* **식사 (Dining):** Amber Tag (`bg-amber-50 text-amber-700 border-amber-200`)
* **숙소 (Stay):** Teal/Indigo Tag (`bg-indigo-50 text-indigo-700 border-indigo-200`)
* **이동 (Transit):** Slate Tag (`bg-slate-100 text-slate-700 border-slate-300`)

---

## 3. Typography & Hierarchy (타이포그래피)

다국어(한국어 한글, 일본어 한자/가나, 영문)의 완벽한 정렬과 가독성을 고려한 스케일입니다.

* **Font Family:** `Pretendard`, `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Hiragino Sans`, `Noto Sans CJK KR`, sans-serif
* **Display Large (36px / 44px, Bold):** 주요 환영 문구 및 택시 카드 대형 현지어 표기
* **Headline Large (24px / 32px, Bold):** 섹션 메인 타이틀, 투어 일차 표기
* **Headline Small (20px / 28px, SemiBold):** 모달 제목, 바우처 메인 제목
* **Title Medium (17px / 24px, SemiBold):** 일정 장소명, 공지사항 헤드라인
* **Body Large (16px / 24px, Regular):** 긴급 공지 본문, 주요 설명
* **Body Medium (14px / 20px, Regular):** 일정 메모, 체크리스트 항목 텍스트
* **Body Small (13px / 18px, Regular):** 주소, 비고, 서브 번역
* **Label Medium (12px / 16px, SemiBold):** 카테고리 태그, 상태 뱃지, D-Day 뱃지

---

## 4. Spacing & Elevation (간격 및 입체감)

### Spacing Scale
* `space-xs`: `4px` (`0.25rem`)
* `space-sm`: `8px` (`0.5rem`)
* `space-md`: `16px` (`1rem`) - 모바일 기본 패딩 및 마진
* `space-lg`: `24px` (`1.5rem`)
* `space-xl`: `32px` (`2rem`)

### Elevation & Shadow
* **Level 1 (기본 카드):** `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05);` + `border: 1px solid #E2E8F0`
* **Level 2 (진행 중 / 활성 카드):** `box-shadow: 0 4px 6px -1px rgba(30, 58, 138, 0.08);` + `border-left: 3px solid #2563EB`
* **Level 3 (모달 / 고정 바텀 내비게이션):** `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1);` + `backdrop-filter: blur(12px)`

---

## 5. Key Component Specs

### 1) 상단 고정 공지 배너 (Pinned Notice Banner)
* **배경 및 보더:** `#FFFBEB` (Light Amber), 보더 `1px solid #FCD34D`
* **아이콘:** 확성기(`📢`) 또는 벨 아이콘 (`#D97706`)
* **구성:** 볼드 알림 텍스트 + 우측 콤팩트 `수정` 버튼 (터치 시 인라인 편집 또는 모달 오픈)

### 2) 체크리스트 & 프로그레스 바 (Checklist Widget)
* **프로그레스 바:** 높이 8px, 배경 `#E2E8F0`, 채움 `#10B981` (실시간 % 반영)
* **체크박스 크기:** 최소 24px 터치 영역, 체크 시 Emerald 채움 및 애니메이션 체크마크

### 3) 일정 타임라인 카드 (Itinerary Card)
* **타임 노드:** 완료(초록 체크), 진행 중(파랑 펄스 링), 예정(슬레이트 아웃라인)
* **연결선:** 2px 세로 라인 (`#E2E8F0`, 완료 구간은 `#10B981`)
* **상태 토글:** 원클릭으로 `예정` ↔ `진행 중` ↔ `완료` 순환 토글

### 4) 현지어 택시 카드 (Tokyo Taxi Card)
* **목적:** 일본어 소통이 어려운 여행객이 기사님께 바로 폰을 보여주는 카드
* **디자인:** 상단 옐로우 뱃지 `🚕 기사님께 보여주세요 (TAXI CARD)`
* **대형 폰트:** `渋谷エクセルホテル東急 までお願いします` (최소 22px~26px 볼드)
* **보조 정보:** 일본어 주소 + 한국어 발음/해석 + `주소 복사` & `지도 보기` 버튼

### 5) 디지털 바우처 카드 및 QR 모달
* **미리보기:** 항공편/호텔/입장권 요약 카드 + 목업 QR 썸네일
* **모달 팝업:** 클릭 시 화면 중앙에 고해상도 목업 QR 코드 + 바코드 스트립 + 예약번호 대형 표기

### 6) 현지 비상연락처 (SOS Panel)
* **가이드 직통:** 가장 눈에 띄는 대형 통화 버튼 (`tel:` 링크 지원)
* **대사관 및 긴급신고:** 주일한국대사관, 영사콜센터, 경찰 110, 구급 119 원터치 연결
