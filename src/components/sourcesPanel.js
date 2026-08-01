import { t, L } from "../i18n.js";
import { sources } from "../data/dataset.js";
import { esc } from "../format.js";

// Render a collapsible sources panel grouped by organization.
export function renderSourcesPanel() {
  const grouped = {};
  sources.forEach((s) => {
    if (!grouped[s.org]) grouped[s.org] = [];
    grouped[s.org].push(s);
  });

  const orgs = Object.keys(grouped).sort();

  const body = orgs
    .map((org) => {
      const items = grouped[org]
        .map(
          (s) =>
            `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" title="${esc(s.title)}">${esc(s.title)}</a></li>`
        )
        .join("");
      return `<details class="src-group"><summary>${esc(org)} <span class="muted">(${grouped[org].length})</span></summary><ul>${items}</ul></details>`;
    })
    .join("");

  return `
    <div class="sources-panel">
      <h3>${t(L.sourcesTitle.ko, L.sourcesTitle.en)} <span class="muted">(${sources.length})</span></h3>
      ${body}
    </div>`;
}

export function initSourcesToggle() {
  const btn = document.getElementById("sourcesToggle");
  const panel = document.getElementById("sourcesOverlay");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    panel.classList.toggle("open");
  });
  panel.addEventListener("click", (e) => {
    if (e.target === panel) panel.classList.remove("open");
  });
}
