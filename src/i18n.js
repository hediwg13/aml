// Bilingual label helper. Every UI string is provided as (Korean, English).
// `t()` renders both languages so the dashboard is fully bilingual.

export function t(ko, en) {
  return `<span class="ko">${ko}</span><span class="en">${en}</span>`;
}

// Plain-text version (for attributes, chart labels where HTML isn't supported)
export function tt(ko, en, lang = "ko") {
  return lang === "ko" ? ko : en;
}

// Global dictionary of static labels used across components.
export const L = {
  appTitle: { ko: "불법 암호화폐 자금 흐름 모니터", en: "Illicit Crypto Flow Monitor" },
  appSubtitle: {
    ko: "이란·러시아·북한 관련 공개 제재·불법 자금 흐름 시각화",
    en: "Visualizing publicly-reported illicit crypto flows tied to Iran, Russia & North Korea",
  },
  // KPI labels
  kpiEntities: { ko: "추적 엔티티", en: "Tracked entities" },
  kpiUsd: { ko: "공개 보도 USD (합산)", en: "Publicly reported USD (sum)" },
  kpiActions: { ko: "제재 조치", en: "Sanctions actions" },
  kpiJurisdictions: { ko: "관련 관할권", en: "Jurisdictions" },
  // Filters
  filters: { ko: "필터", en: "Filters" },
  actor: { ko: "행위자", en: "Actor" },
  type: { ko: "유형", en: "Type" },
  yearRange: { ko: "연도 범위", en: "Year range" },
  sourceOrg: { ko: "출처 기관", en: "Source org" },
  reset: { ko: "초기화", en: "Reset" },
  all: { ko: "전체", en: "All" },
  // Map
  legend: { ko: "범례", en: "Legend" },
  markerSize: { ko: "마커 크기 = 공개 보도 USD", en: "Marker size = publicly reported USD" },
  flowThickness: { ko: "곡선 굵기 = 자금 흐름 규모", en: "Curve thickness = flow magnitude" },
  // Table
  tableTitle: { ko: "추적 엔티티 목록", en: "Tracked entities" },
  colEntity: { ko: "엔티티", en: "Entity" },
  colActor: { ko: "행위자", en: "Actor" },
  colType: { ko: "유형", en: "Type" },
  colJurisdiction: { ko: "관할권", en: "Jurisdiction" },
  colUsd: { ko: "공개 보도 USD", en: "Reported USD" },
  colDate: { ko: "지정일", en: "Designation" },
  colSource: { ko: "출처", en: "Source" },
  noDate: { ko: "해당 없음", en: "N/A" },
  // Charts
  chartByActor: { ko: "행위자별 공개 보도 USD", en: "Reported USD by actor" },
  chartByYear: { ko: "연도별 도난/불법 자금", en: "Illicit funds by year" },
  chartByType: { ko: "엔티티 유형별 분포", en: "Entity type distribution" },
  chartTopEntities: { ko: "상위 10개 엔티티 (USD)", en: "Top 10 entities (USD)" },
  // Detail modal
  detail: { ko: "상세 정보", en: "Detail" },
  reportedFigures: { ko: "공개 보도 수치", en: "Reported figures" },
  authority: { ko: "법조항", en: "Authority" },
  jurisdiction: { ko: "관할권", en: "Jurisdiction" },
  wallets: { ko: "지갑 주소", en: "Wallet addresses" },
  relatedFlows: { ko: "관련 자금 흐름", en: "Related flows" },
  context: { ko: "맥락", en: "Context" },
  primarySource: { ko: "주요 출처", en: "Primary source" },
  viewSource: { ko: "출처 보기", en: "View source" },
  close: { ko: "닫기", en: "Close" },
  verifyWarning: {
    ko: "주의: 지갑 주소는 실사 전 OFAC SDN 항목에서 재검증 필요.",
    en: "Caution: wallet addresses must be re-verified against the OFAC SDN entry before any operational use.",
  },
  // Sources
  sourcesTitle: { ko: "출처", en: "Sources" },
  // Disclaimer
  disclaimer: {
    ko: "본 대시보드는 교육 목적이며, 모든 수치는 미국 재무부·finCEN·DOJ·FBI 및 TRM Labs·Chainalysis·Elliptic의 공개 보도에 기반한 추정치입니다 (독립 감사 아님). 법률·수사·규제 자문을 대체하지 않습니다.",
    en: "Educational use only. All figures are publicly reported estimates (not independently audited) from U.S. Treasury/OFAC, finCEN, DOJ, FBI and TRM Labs, Chainalysis, Elliptic. This is not legal, investigative or regulatory advice.",
  },
  estimateBadge: { ko: "공개 출처 기반 추정치", en: "Public-source estimate" },
  results: { ko: "건 표시 중", en: "shown" },
};

export function L_(key, lang = "ko") {
  return L[key] ? L[key][lang] : key;
}
