import { t, L } from "../i18n.js";
import {
  ACTORS,
  ENTITY_TYPES,
  getEntity,
  getSource,
  getCoord,
  primaryUsd,
} from "../data/dataset.js";
import { flows as allFlows } from "../data/dataset.js";
import { formatUsd, formatUsdFull, esc } from "../format.js";

let modalEl = null;

export function initModal() {
  modalEl = document.getElementById("modal");
  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl || e.target.dataset.close !== undefined) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

export function openModal(entityId) {
  const e = getEntity(entityId);
  if (!e) return;
  const actor = ACTORS[e.actor];
  const tp = ENTITY_TYPES[e.type];
  const coord = e.coord ? getCoord(e.coord) : null;
  const primarySrc = getSource(e.primarySourceId);

  // Figures
  const figures = e.usdFigures.length
    ? e.usdFigures
        .map((f) => {
          const s = getSource(f.sourceId);
          return `
          <li>
            <span class="fig-usd">${formatUsdFull(f.value)}</span>
            <span class="fig-ctx">${esc(f.context)} <span class="muted">(${f.year})</span></span>
            <a class="fig-src" href="${esc(s?.url)}" target="_blank" rel="noopener">${esc(s?.org)}</a>
          </li>`;
        })
        .join("")
    : `<li class="empty">${t("공개 수치 없음", "No public figure available")}</li>`;

  // Related flows (involving this entity, either direction)
  const related = allFlows.filter((fl) => fl.from === e.id || fl.to === e.id);
  const flowRows = related.length
    ? related
        .map((fl) => {
          const from = getEntity(fl.from);
          const to = getEntity(fl.to);
          const s = getSource(fl.sourceId);
          return `
          <li>
            <span class="flow-arc">${esc(from?.name)} <span class="arrow">→</span> ${esc(to?.name)}</span>
            <span class="fig-usd">${formatUsdFull(fl.usd)}</span>
            <span class="muted">${fl.year}</span>
            <a class="fig-src" href="${esc(s?.url)}" target="_blank" rel="noopener">${esc(s?.org)}</a>
          </li>`;
        })
        .join("")
    : `<li class="empty">${t("관련 흐름 없음", "No related flows")}</li>`;

  // Wallets
  const wallets =
    e.walletAddresses && e.walletAddresses.length
      ? `<div class="wallets">
          ${e.walletAddresses.map((w) => `<code>${esc(w)}</code>`).join("")}
          <div class="warn">${t(L.verifyWarning.ko, L.verifyWarning.en)}</div>
        </div>`
      : `<div class="muted">${t("공개된 지갑 주소 없음 (또는 finCEN/OFAC 미공개)", "No wallet address published")}</div>`;

  modalEl.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-card" role="dialog" aria-modal="true">
      <div class="modal-header" style="border-left:4px solid ${actor.color}">
        <div class="modal-title">
          <span class="row-icon">${tp.icon}</span>
          <h2>${esc(e.name)}</h2>
        </div>
        <button class="modal-close" data-close aria-label="close">✕</button>
      </div>
      <div class="modal-tags">
        <span class="tag" style="background:${actor.color}22;color:${actor.color}">${t(actor.label, actor.labelEn)}</span>
        <span class="tag">${t(tp.label, tp.labelEn)}</span>
        ${coord ? `<span class="tag">📍 ${esc(coord.city)}, ${esc(coord.country)}</span>` : ""}
      </div>
      <div class="modal-body">
        ${e.designationDate ? `<div class="kv"><b>${t(L.colDate.ko, L.colDate.en)}</b><span>${esc(e.designationDate)}</span></div>` : ""}
        ${e.authority ? `<div class="kv"><b>${t(L.authority.ko, L.authority.en)}</b><span>${esc(e.authority)}</span></div>` : ""}
        ${e.jurisdiction ? `<div class="kv"><b>${t(L.jurisdiction.ko, L.jurisdiction.en)}</b><span>${esc(e.jurisdiction)}</span></div>` : ""}

        <h3>${t(L.reportedFigures.ko, L.reportedFigures.en)}</h3>
        <ul class="fig-list">${figures}</ul>

        <h3>${t(L.relatedFlows.ko, L.relatedFlows.en)}</h3>
        <ul class="fig-list">${flowRows}</ul>

        <h3>${t(L.wallets.ko, L.wallets.en)}</h3>
        ${wallets}

        ${e.notes ? `<h3>${t(L.context.ko, L.context.en)}</h3><p class="notes">${esc(e.notes)}</p>` : ""}

        ${primarySrc ? `<div class="modal-source"><b>${t(L.primarySource.ko, L.primarySource.en)}:</b> <a href="${esc(primarySrc.url)}" target="_blank" rel="noopener">${esc(primarySrc.org)} — ${esc(primarySrc.title)}</a></div>` : ""}
      </div>
    </div>`;
  modalEl.classList.add("open");
}

export function closeModal() {
  if (modalEl) {
    modalEl.classList.remove("open");
    modalEl.innerHTML = "";
  }
}
