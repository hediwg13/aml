import L from "leaflet";
import { t, L as Labels } from "../i18n.js";
import { ACTORS, ENTITY_TYPES, getCoord, getSource, primaryUsd, getEntity } from "../data/dataset.js";
import { formatUsd, formatUsdFull, esc } from "../format.js";

let mapInstance = null;
let markersLayer = null;
let flowsLayer = null;
let onEntitySelect = null;

// Radius scaling: maps USD -> pixel radius. Log-scaled for huge range.
function radiusFor(usd) {
  if (!usd) return 6;
  const r = 6 + Math.log10(Math.max(usd, 1)) * 2.4;
  return Math.min(Math.max(r, 6), 32);
}

function weightFor(usd) {
  if (!usd) return 1;
  const w = 1 + Math.log10(Math.max(usd, 1)) / 2.2;
  return Math.min(Math.max(w, 1), 9);
}

export function initMap(onSelect) {
  onEntitySelect = onSelect;
  mapInstance = L.map("map", {
    center: [30, 20],
    zoom: 2,
    minZoom: 2,
    worldCopyJump: true,
    attributionControl: true,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }
  ).addTo(mapInstance);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
    { subdomains: "abcd", maxZoom: 19, opacity: 0.85 }
  ).addTo(mapInstance);

  markersLayer = L.layerGroup().addTo(mapInstance);
  flowsLayer = L.layerGroup().addTo(mapInstance);

  // Legend
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = `
      <div class="legend-title">${t(Labels.legend.ko, Labels.legend.en)}</div>
      ${Object.values(ACTORS)
        .map(
          (a) =>
            `<div class="legend-row"><span class="dot" style="background:${a.color}"></span>${t(
              a.label,
              a.labelEn
            )}</div>`
        )
        .join("")}
      <div class="legend-sep"></div>
      <div class="legend-note">${t(Labels.markerSize.ko, Labels.markerSize.en)}</div>
      <div class="legend-note">${t(Labels.flowThickness.ko, Labels.flowThickness.en)}</div>`;
    return div;
  };
  legend.addTo(mapInstance);
}

// Force Leaflet to recompute its layout — call after the map container
// becomes visible again (e.g. after switching back to the map tab). Without
// this, tiles render incorrectly because the container had zero size while hidden.
export function invalidateMap() {
  if (!mapInstance) return;
  mapInstance.invalidateSize();
}

// Curved polyline between two latlngs (simple quadratic bezier offset).
function curved(latlng1, latlng2) {
  const lat1 = latlng1.lat,
    lng1 = latlng1.lng;
  const lat2 = latlng2.lat,
    lng2 = latlng2.lng;
  const mx = (lat1 + lat2) / 2;
  const my = (lng1 + lng2) / 2;
  const dx = lat2 - lat1;
  const dy = lng2 - lng1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = dist * 0.18;
  // perpendicular offset for arc
  const cx = mx + (-dy / (dist || 1)) * offset;
  const cy = my + (dx / (dist || 1)) * offset;
  const pts = [];
  const steps = 32;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * cx + t * t * lat2;
    const y = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * cy + t * t * lng2;
    pts.push([x, y]);
  }
  return pts;
}

export function renderMap(entities, flows) {
  if (!mapInstance) return;
  markersLayer.clearLayers();
  flowsLayer.clearLayers();

  // Aggregate flow usd per from->to pair so we render one curve per pair.
  const pairMap = new Map();
  flows.forEach((fl) => {
    if (!getEntity(fl.from) || !getEntity(fl.to)) return;
    const fromC = getEntity(fl.from).coord;
    const toC = getEntity(fl.to).coord;
    if (!fromC || !toC) return; // skip edges involving coordinate-less mixers
    const fromCoord = getCoord(fromC);
    const toCoord = getCoord(toC);
    if (!fromCoord || !toCoord) return;
    const key = `${fl.from}->${fl.to}`;
    const prev = pairMap.get(key) || { fromCoord, toCoord, usd: 0, actor: fl.actor, ids: [] };
    prev.usd += fl.usd;
    prev.ids.push(fl.id);
    pairMap.set(key, prev);
  });

  // Draw flow curves first (under markers)
  pairMap.forEach((p) => {
    const color = ACTORS[p.actor]?.color || "#888";
    const pts = curved(
      L.latLng(p.fromCoord.lat, p.fromCoord.lng),
      L.latLng(p.toCoord.lat, p.toCoord.lng)
    );
    L.polyline(pts, {
      color,
      weight: weightFor(p.usd),
      opacity: 0.5,
      dashArray: "4 6",
    }).addTo(flowsLayer);
  });

  // Draw entity markers
  entities.forEach((e) => {
    if (!e.coord) return;
    const c = getCoord(e.coord);
    if (!c) return;
    const actor = ACTORS[e.actor];
    const usd = primaryUsd(e);
    const radius = radiusFor(usd);
    const tp = ENTITY_TYPES[e.type] || { icon: "•" };

    const marker = L.circleMarker([c.lat, c.lng], {
      radius,
      color: actor.color,
      weight: 2,
      fillColor: actor.color,
      fillOpacity: 0.55,
    });

    const popupHtml = `
      <div class="popup">
        <div class="popup-head">
          <span class="popup-icon">${tp.icon}</span>
          <span class="popup-name">${esc(e.name)}</span>
        </div>
        <div class="popup-meta">
          <span class="tag" style="background:${actor.color}22;color:${actor.color}">
            ${t(actor.label, actor.labelEn)}
          </span>
          <span class="tag">${t(tp.label, tp.labelEn)}</span>
        </div>
        <div class="popup-row"><b>${t("위치", "Location")}:</b> ${esc(c.city)}, ${esc(c.country)}</div>
        ${usd ? `<div class="popup-row"><b>${t("최대 보도액", "Largest reported")}</b>: ${formatUsdFull(usd)}</div>` : ""}
        ${e.designationDate ? `<div class="popup-row"><b>${t("지정일", "Designated")}</b>: ${esc(e.designationDate)}</div>` : ""}
        <button class="popup-btn" data-detail="${esc(e.id)}">${t("상세 보기", "View detail")}</button>
      </div>`;

    marker.bindPopup(popupHtml, { className: "custom-popup", maxWidth: 280 });
    marker.on("popupopen", (ev) => {
      const btn = ev.popup._contentNode.querySelector("[data-detail]");
      if (btn) btn.addEventListener("click", () => onEntitySelect && onEntitySelect(e.id));
    });
    marker.on("click", () => marker.openPopup());
    marker.addTo(markersLayer);
  });
}
