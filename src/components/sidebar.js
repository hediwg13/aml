import { t, L } from "../i18n.js";
import { ACTORS, ENTITY_TYPES, sources } from "../data/dataset.js";

// Unique source orgs for the filter dropdown.
const ORGS = Array.from(new Set(sources.map((s) => s.org))).sort();

export function renderSidebar(state, api) {
  const f = state.filters;

  const actorCheck = (code) => {
    const a = ACTORS[code];
    const checked = f.actors.has(code) ? "checked" : "";
    return `
      <label class="check" data-actor="${code}">
        <input type="checkbox" ${checked} data-actor-input="${code}" />
        <span class="swatch" style="background:${a.color}"></span>
        <span class="lbl">${t(a.label, a.labelEn)}</span>
      </label>`;
  };

  const typeCheck = (key) => {
    const tp = ENTITY_TYPES[key];
    const checked = f.types.has(key) ? "checked" : "";
    return `
      <label class="check" data-type="${key}">
        <input type="checkbox" ${checked} data-type-input="${key}" />
        <span class="icon">${tp.icon}</span>
        <span class="lbl">${t(tp.label, tp.labelEn)}</span>
      </label>`;
  };

  const orgOpts = ORGS.map(
    (o) => `<option value="${o}" ${f.sourceOrgs.has(o) ? "selected" : ""}>${o}</option>`
  ).join("");

  return `
    <aside class="sidebar">
      <div class="sidebar-head">
        <h2>${t(L.filters.ko, L.filters.en)}</h2>
        <button class="btn-reset" id="resetBtn">${t(L.reset.ko, L.reset.en)}</button>
      </div>

      <div class="filter-group">
        <div class="filter-title">${t(L.actor.ko, L.actor.en)}</div>
        ${Object.keys(ACTORS).map(actorCheck).join("")}
      </div>

      <div class="filter-group">
        <div class="filter-title">${t(L.type.ko, L.type.en)}</div>
        ${Object.keys(ENTITY_TYPES).map(typeCheck).join("")}
      </div>

      <div class="filter-group">
        <div class="filter-title">
          ${t(L.yearRange.ko, L.yearRange.en)}
          <span class="year-display" id="yearDisplay">${f.yearMin} – ${f.yearMax}</span>
        </div>
        <div class="year-sliders">
          <input type="range" min="2018" max="2026" value="${f.yearMin}" id="yearMin" class="range" />
          <input type="range" min="2018" max="2026" value="${f.yearMax}" id="yearMax" class="range" />
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-title">${t(L.sourceOrg.ko, L.sourceOrg.en)}</div>
        <select id="sourceOrgs" multiple size="6">${orgOpts}</select>
        <div class="hint">${t("Ctrl/Cmd 클릭으로 다중 선택", "Ctrl/Cmd-click to multi-select")}</div>
      </div>

      <div class="filter-group sources-link">
        <div class="filter-title">${t(L.sourcesTitle.ko, L.sourcesTitle.en)}</div>
        <div class="sources-summary">${ORGS.length} ${t("개 출처 기관", "source organizations")}</div>
      </div>
    </aside>`;
}

export function bindSidebar(api) {
  const root = document.querySelector(".sidebar");

  // Actor checkboxes
  root.querySelectorAll("[data-actor-input]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const selected = Array.from(root.querySelectorAll("[data-actor-input]:checked")).map(
        (el) => el.dataset.actorInput
      );
      api.setActors(selected);
    });
  });

  // Type checkboxes
  root.querySelectorAll("[data-type-input]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const selected = Array.from(root.querySelectorAll("[data-type-input]:checked")).map(
        (el) => el.dataset.typeInput
      );
      api.setTypes(selected);
    });
  });

  // Year range sliders
  const yMin = root.querySelector("#yearMin");
  const yMax = root.querySelector("#yearMax");
  const display = root.querySelector("#yearDisplay");
  const apply = () => {
    let a = Number(yMin.value);
    let b = Number(yMax.value);
    if (a > b) [a, b] = [b, a];
    display.textContent = `${a} – ${b}`;
    api.setYearRange(a, b);
  };
  yMin.addEventListener("input", apply);
  yMax.addEventListener("input", apply);

  // Source orgs
  root.querySelector("#sourceOrgs").addEventListener("change", (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    api.setSourceOrgs(selected);
  });

  // Reset
  root.querySelector("#resetBtn").addEventListener("click", () => api.resetFilters());
}
