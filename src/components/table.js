import { t, L } from "../i18n.js";
import { ACTORS, ENTITY_TYPES, getSource, primaryUsd } from "../data/dataset.js";
import { formatUsd, formatUsdFull, esc } from "../format.js";

let sortKey = "usd";
let sortDir = -1;
let onEntitySelect = null;

export function initTable(onSelect) {
  onEntitySelect = onSelect;
}

export function renderTable(entities) {
  // Sort
  const sorted = [...entities].sort((a, b) => {
    let av, bv;
    switch (sortKey) {
      case "name":
        av = a.name.toLowerCase();
        bv = b.name.toLowerCase();
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      case "actor":
        av = a.actor;
        bv = b.actor;
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      case "type":
        av = a.type;
        bv = b.type;
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      case "date":
        av = a.designationDate || "0000";
        bv = b.designationDate || "0000";
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      case "usd":
      default:
        av = primaryUsd(a);
        bv = primaryUsd(b);
        return (av - bv) * sortDir;
    }
  });

  const arrow = (key) => (sortKey === key ? (sortDir === 1 ? "▲" : "▼") : "");

  const rows = sorted
    .map((e) => {
      const actor = ACTORS[e.actor];
      const tp = ENTITY_TYPES[e.type];
      const usd = primaryUsd(e);
      const src = getSource(e.primarySourceId);
      return `
      <tr data-entity="${esc(e.id)}">
        <td class="td-name">
          <span class="row-icon">${tp.icon}</span>
          <span>${esc(e.name)}</span>
        </td>
        <td><span class="tag" style="background:${actor.color}22;color:${actor.color}">${t(actor.label, actor.labelEn)}</span></td>
        <td>${t(tp.label, tp.labelEn)}</td>
        <td class="td-juris">${esc(e.jurisdiction || "—")}</td>
        <td class="td-usd">${usd ? formatUsd(usd) : "—"}</td>
        <td class="td-date">${e.designationDate ? esc(e.designationDate) : t(L.noDate.ko, L.noDate.en)}</td>
        <td class="td-src"><span title="${esc(src?.title || "")}">${esc(src?.org || "—")}</span></td>
      </tr>`;
    })
    .join("");

  const thead = `
    <thead><tr>
      <th data-sort="name">${t(L.colEntity.ko, L.colEntity.en)} <span class="arr">${arrow("name")}</span></th>
      <th data-sort="actor">${t(L.colActor.ko, L.colActor.en)} <span class="arr">${arrow("actor")}</span></th>
      <th data-sort="type">${t(L.colType.ko, L.colType.en)} <span class="arr">${arrow("type")}</span></th>
      <th>${t(L.colJurisdiction.ko, L.colJurisdiction.en)}</th>
      <th data-sort="usd">${t(L.colUsd.ko, L.colUsd.en)} <span class="arr">${arrow("usd")}</span></th>
      <th data-sort="date">${t(L.colDate.ko, L.colDate.en)} <span class="arr">${arrow("date")}</span></th>
      <th>${t(L.colSource.ko, L.colSource.en)}</th>
    </tr></thead>`;

  const wrap = document.getElementById("tableWrap");
  wrap.innerHTML = `
    <div class="table-head">
      <h3>${t(L.tableTitle.ko, L.tableTitle.en)}</h3>
      <span class="count">${sorted.length} ${t(L.results.ko, L.results.en)}</span>
    </div>
    <div class="table-scroll">
      <table>${thead}<tbody>${rows || `<tr><td colspan="7" class="empty">${t("필터와 일치하는 엔티티가 없습니다.", "No entities match the filters.")}</td></tr>`}</tbody></table>
    </div>`;

  // Bind sort headers
  wrap.querySelectorAll("th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortDir *= -1;
      else {
        sortKey = key;
        sortDir = -1;
      }
      renderTable(entities);
    });
  });

  // Bind row clicks
  wrap.querySelectorAll("tr[data-entity]").forEach((tr) => {
    tr.addEventListener("click", () => onEntitySelect && onEntitySelect(tr.dataset.entity));
  });
}
