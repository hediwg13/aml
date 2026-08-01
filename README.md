# ⚡ Illicit Crypto Flow Monitor · 불법 암호화폐 자금 흐름 모니터

이란·러시아·북한과 연관된 **공개 보고된** 불법 암호화폐 자금 흐름을 세계 지도와 차트로 시각화하는 교육용 AML(자금세탁방지)/제재 추적 대시보드입니다.

모든 데이터는 미국 재무부(OFAC)·finCEN·DOJ·FBI의 공식 발표와 TRM Labs·Chainalysis·Elliptic의 공개 연구, 그리고 주요 언론 보도에 기반합니다.

> ⚠️ **면책 고지**: 본 대시보드는 **교육 목적**입니다. 모든 USD 수치는 공개 보도된 **추정치**이며 독립적으로 감사되지 않았습니다. 법률·수사·규제 자문을 대체하지 않으며, 운영적 판단(지갑 주소 제재 스크리닝 등) 전에는 반드시 [OFAC SDN 목록](https://sanctionssearch.ofac.treas.gov/)에서 재검증해야 합니다.

---

## 🚀 실행

```bash
npm install      # 의존성 설치 (vite, leaflet, chart.js)
npm run dev      # 개발 서버 → http://localhost:5173
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기 → http://localhost:4173
```

요구사항: Node.js 18+ (현재 환경 Node 20.x에서 검증됨).

---

## 🧭 화면 구성

대시보드는 헤더(KPI) + 좌측 필터 + 두 개의 탭으로 구성됩니다. 필터는 두 탭에 걸쳐 공통 적용됩니다.

### 탭 1 — 🗺️ 지도 (Map)
- **Leaflet 다크 지도**(CARTO dark matter 타일) 위에 제재/귀속 엔티티를 마커로 표시
- **마커 색 = 행위자**: 🟡 이란 · 🔴 러시아 · 🟣 북한
- **마커 크기 = 공개 보도 USD**(로그 스케일)
- **곡선 = 자금 흐름**(점선, 굵기 ∝ 규모)
- 마커 클릭 → 팝업 → **"상세 보기"** → 상세 모달

### 탭 2 — 📊 데이터 (Data)
- **4종 Chart.js 그래프**
  - 행위자별 공개 보도 USD (막대)
  - 연도별 불법 자금, 행위자별 누적 (스택 막대)
  - 엔티티 유형별 분포 (도넛)
  - 상위 10개 엔티티 USD (가로 막대)
- **정렬 가능한 엔티티 테이블**(이름·행위자·유형·관할권·USD·지정일·출처)
- 행 클릭 → 상세 모달

### 공통
- **헤더 KPI 4종**: 추적 엔티티 수 / 공개 보도 USD 합산 / 제재 조치 수 / 관련 관할권 수
- **좌측 필터 패널**: 행위자(다중) · 유형(다중) · 연도 범위 슬라이더 · 출처 기관(다중) — 실시간 동기화
- **📚 출처 패널**(우하단 FAB): 44개 공개 출처를 기관별로 그룹화
- **완전 이중언어**: 모든 라벨 한국어·영어 병기

---

## 📦 기술 스택

| 영역 | 기술 |
|---|---|
| 빌드/개발 | Vite 5 + Vanilla JS (ES 모듈) |
| 지도 | Leaflet 1.9 (CARTO 다크 타일) |
| 차트 | Chart.js 4 |
| 상태 | 자체 경량 pub/sub (`state.js`) |
| 스타일 | 순수 CSS, 다크 테마, 반응형 |

---

## 🗂️ 프로젝트 구조

```
ZCodeProject/
├── index.html              # 진입 HTML (Leaflet CSS CDN)
├── package.json
├── vite.config.js
└── src/
    ├── main.js             # 부트스트랩: 탭 라우팅 + 렌더 파이프라인
    ├── state.js            # 중앙 필터 상태 + pub/sub + 필터링 로직
    ├── i18n.js             # t(ko,en) 이중언어 헬퍼 + 라벨 사전
    ├── format.js           # USD/날짜 포맷, HTML 이스케이프
    ├── styles.css          # 다크 테마 + 탭 + 반응형
    ├── data/
    │   ├── dataset.js      # ★ 핵심 데이터셋 (엔티티/흐름/이벤트/출처)
    │   └── coordinates.js  # 도시/관할권별 위경도
    └── components/
        ├── header.js       # 헤더 + KPI 카드
        ├── sidebar.js      # 필터 패널
        ├── map.js          # Leaflet 지도 + 마커 + 흐름 곡선 + 범례
        ├── charts.js       # 4종 Chart.js
        ├── table.js        # 정렬 가능 테이블
        ├── detailModal.js  # 엔티티 상세 모달
        └── sourcesPanel.js # 출처 오버레이
```

---

## 📊 데이터셋 구조 (`src/data/dataset.js`)

### `entities[]` — 제재/귀속 엔티티
```js
{
  id, name,
  type,        // exchange | mixer | darknet | threatActor | individual | stablecoin
  actor,       // IRAN | RUS | DPRK
  coord,       // COORDS 키 (믹서는 null → 지도 제외)
  jurisdiction,
  designationDate,      // ISO 또는 null (비제재 통로)
  authority,            // 법조항 (E.O. 14024 등)
  usdFigures: [{ value, context, year, sourceId }],  // 복수 보도치 공존 가능
  primarySourceId,
  walletAddresses,      // 1차 발표에 공개된 것만
  notes
}
```

### `flows[]` — 방향성 자금 흐름
```js
{ id, from, to, usd, year, actor, sourceId, note }
```

### `events[]` — 주요 해킹/단속 타임라인
### `sources[]` — 출처 마스터 (`{ id, org, title, url }`)

### 현재 규모
- **22개 엔티티** · **15개 자금 흐름** · **9개 이벤트** · **44개 출처**
- 모든 참조 무결 검증 완료(끊어진 sourceId 0건)

---

## 🔍 수록 데이터 요약

### 🇷🇺 러시아
- **Garantex** (에스토니아 등록 / 모스크바 운영, 2022-04-05, E.O. 14024) — TRM 사후 이체액 ~$100B+, Chainalysis $645M 불법
- **Hydra Market** (2022-04-05) — 2021년 매출 ~$1.7B
- **Suex** (체코 등록, 2021-09-21) — 최초 제재 거래소, $160M+ 불법
- **Chatex** (2021-11-08) · **Bitzlato** (홍콩, 2023-01-18, finCEN §9714(a), Hydra와 $700M+) · **Grinex** (후속, 2025-03) · **Zhdanova** (개인, BTC 주소 공개)

### 🇮🇷 이란
- **Nobitex** (테헤란, 2026-06-02, E.O. 13224+13902) — 이란 최대 거래소
- **Wallex · Bitpin · Ramzinex** (테헤란, "Economic Fury" 지정)
- **Zedcex · Zedxion** (영국 등록, 2026-01) — IRGC 위해 ~$1B 이동 (TRM)
- **CoinEx** (홍콩→이란 게이트웨이, Nobitex와 $2.7B)
- **CBI 지갑** (~$344M 동결) · **Sa'id al-Jamal/Houthi 지갑** · **2018 SamSam** (최초 암호화폐 SDN 주소 지정)

### 🇰🇵 북한
- **Lazarus Group / APT38** (2019-09-13, E.O. 13722) — 연도별 도난액: $1.7B('22) / $660M('23) / $1.34B('24) / ~$2B('25)
- **Blender.io** (2022-05-06, 최초 믹서 제재, $20.5M) · **Tornado Cash** (2022-08-08, 2024년 항소법원 판결 후 상태 주석) · **Sinbad.io** (2023-11-29)
- 주요 해킹: Ronin Bridge $620M · Bybit ~$1.5B(사상 최대)

---

## ⚖️ 데이터 신뢰성 원칙

- **공개 출처 URL만 사용** — 모든 수치에 기관(org)과 연도를 부여
- **기관 간 수치 상이 시 둘 다 보존** (예: CBI 지갑 — TRM $344M / Chainalysis $131M)
- **미검증 항목은 제외 또는 경고** (지갑 주소 등은 "OFAC SDN에서 재검증 필요" 명시)
- **finCEN은 Bitzlato 지갑 목록 미공개** → 명시적 메모
- 믹서(Blender/Tornado/Sinbad)는 물리적 관할권이 없어 **지도에서 제외**, 테이블·차트·흐름에는 표시

---

## 🧪 검증

- `npm run build` — 23개 모듈 변환, 에러 0건 ✅
- 데이터 참조 무결: 끊어진 `sourceId` 0건 (엔티티·흐름·USD 수치 전수 점검) ✅
- dev 서버 HTTP 200 응답, HMR 정상 ✅

---

## 📚 주요 출처 (전체 44건은 애플리케이션 내 📚 패널에서 확인)

- **U.S. Treasury / OFAC** — 공식 제재 발표 (jy0701, sb0225, sb0519, sb0248, sm556 …)
- **finCEN** — Bitzlato §9714(a) 조치, IRGC 경고
- **U.S. DOJ / FBI / IC3** — Garantex 단속, Ronin/Harmony/Stake/Bybit 귀속
- **TRM Labs** · **Chainalysis** · **Elliptic** — 블록체인 분석 보고서
- **Reuters** 등 주요 언론
