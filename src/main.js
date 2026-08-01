import "./styles.css";
import { t, L } from "./i18n.js";
import {
  getState,
  subscribe,
  setActors,
  setTypes,
  setYearRange,
  setSourceOrgs,
  resetFilters,
  filteredEntities,
  filteredFlows,
} from "./state.js";
import { renderHeader, renderKpi } from "./components/header.js";
import { renderSidebar, bindSidebar } from "./components/sidebar.js";
import { initMap, renderMap, invalidateMap } from "./components/map.js";
import { renderCharts } from "./components/charts.js";
import { initTable, renderTable } from "./components/table.js";
import { initModal, openModal } from "./components/detailModal.js";
import { renderFooterSources } from "./components/sourcesPanel.js";

const api = { setActors, setTypes, setYearRange, setSourceOrgs, resetFilters };

// Active tab: "map" | "data"
let activeTab = "map";

function selectEntity(id) {
  openModal(id);
}

// Render only the parts that belong to the currently visible tab. Charts and
// the table live on the data tab; the map lives on the map tab. Both are
// driven by the same central filter state.
function render() {
  const ents = filteredEntities();
  const fls = filteredFlows();
  renderMap(ents, fls);
  if (activeTab === "data") {
    renderCharts(ents, fls);
    renderTable(ents);
  }
}

function buildLayout() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderHeader()}
    <div class="layout">
      <div id="sidebarMount"></div>
      <main class="main">
        <div class="tabs" role="tablist">
          <button class="tab active" data-tab="map" role="tab">
            ${t("지도", "Map")}
          </button>
          <button class="tab" data-tab="data" role="tab">
            ${t("데이터", "Data")}
          </button>
        </div>

        <section class="tab-pane active" id="pane-map" role="tabpanel">
          <div class="map-wrap">
            <div id="map"></div>
          </div>
        </section>

        <section class="tab-pane" id="pane-data" role="tabpanel">
          <div id="kpiMount"></div>
          <div class="charts-grid">
            <div class="chart-card"><canvas id="chartActor"></canvas></div>
            <div class="chart-card"><canvas id="chartYear"></canvas></div>
            <div class="chart-card"><canvas id="chartType"></canvas></div>
            <div class="chart-card wide"><canvas id="chartTop"></canvas></div>
          </div>
          <div id="tableWrap" class="table-wrap"></div>
        </section>
      </main>
    </div>
    <footer class="disclaimer">
      <span>${t(L.disclaimer.ko, L.disclaimer.en)}</span>
      <span class="footer-sources" id="footerSources"></span>
    </footer>
    <div id="modal" class="modal"></div>
  `;

  // Sidebar
  document.getElementById("sidebarMount").innerHTML = renderSidebar(getState(), api);
  bindSidebar(api);

  // Footer sources — compact inline links grouped by org
  document.getElementById("footerSources").innerHTML = renderFooterSources();

  // Tab switching
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

function switchTab(name) {
  if (name === activeTab) return;
  activeTab = name;

  document.querySelectorAll(".tab").forEach((b) =>
    b.classList.toggle("active", b.dataset.tab === name)
  );
  document.querySelectorAll(".tab-pane").forEach((p) =>
    p.classList.toggle("active", p.id === `pane-${name}`)
  );

  if (name === "map") {
    // The map was rendered while hidden; force Leaflet to recompute its size.
    invalidateMap();
  } else if (name === "data") {
    // KPI + charts were never rendered (hidden) — render now.
    document.getElementById("kpiMount").innerHTML = renderKpi();
    const ents = filteredEntities();
    const fls = filteredFlows();
    renderCharts(ents, fls);
    renderTable(ents);
  }
}

function init() {
  buildLayout();
  initMap(selectEntity);
  initTable(selectEntity);
  initModal();
  render();

  // Re-render on filter change
  subscribe(() => render());
}

document.addEventListener("DOMContentLoaded", init);
