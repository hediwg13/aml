import { t, L } from "../i18n.js";
import { formatUsd } from "../format.js";
import { entities, flows, sources } from "../data/dataset.js";

// Title bar only (logo + bilingual title + subtitle + estimate badge).
// KPI cards are rendered separately via renderKpi() and placed on the data tab.
export function renderHeader() {
  return `
    <header class="app-header">
      <div class="header-top">
        <div class="brand">
          <div class="logo">CFM</div>
          <div>
            <h1>${t(L.appTitle.ko, L.appTitle.en)}</h1>
            <p class="subtitle">${t(L.appSubtitle.ko, L.appSubtitle.en)}</p>
          </div>
        </div>
        <div class="badge">${t(L.estimateBadge.ko, L.estimateBadge.en)}</div>
      </div>
    </header>`;
}

// KPI block as a hierarchy: one hero metric (total reported USD) + three
// supporting metrics. Not an equal-weight 4-card grid (anti-slop L1).
// Computed from the full (unfiltered) dataset for stable totals.
export function renderKpi() {
  const entityCount = entities.length;

  // Sum of all reported USD figures (entities + flows), flagged as an estimate
  // in the disclaimer.
  let usdSum = 0;
  entities.forEach((e) => e.usdFigures.forEach((f) => (usdSum += f.value)));
  flows.forEach((fl) => (usdSum += fl.usd));

  const sanctionActions = entities.filter((e) => e.designationDate).length;

  const jurisdictions = new Set(
    entities.map((e) => (e.jurisdiction || "").split("/")[0].trim()).filter(Boolean)
  );

  const support = (val, label) => `
    <div class="kpi-support">
      <div class="kpi-support-value">${val}</div>
      <div class="kpi-support-label">${t(L[label].ko, L[label].en)}</div>
    </div>`;

  return `
    <div class="kpi-block">
      <div class="kpi-hero">
        <div class="kpi-hero-value">${formatUsd(usdSum)}</div>
        <div class="kpi-hero-label">${t(L.kpiUsd.ko, L.kpiUsd.en)}</div>
      </div>
      <div class="kpi-supporting">
        ${support(entityCount, "kpiEntities")}
        ${support(sanctionActions, "kpiActions")}
        ${support(jurisdictions.size, "kpiJurisdictions")}
      </div>
    </div>`;
}
