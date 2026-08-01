import { t, L } from "../i18n.js";
import { sources } from "../data/dataset.js";
import { esc } from "../format.js";

// Compact single-line footer sources grouped by org. Replaces the previous
// large FAB + modal overlay, which took too much visual real estate.
export function renderFooterSources() {
  const grouped = {};
  sources.forEach((s) => {
    if (!grouped[s.org]) grouped[s.org] = s;
  });
  // One representative link per org, sorted by org name.
  const orgs = Object.values(grouped).sort((a, b) => a.org.localeCompare(b.org));

  const links = orgs
    .map(
      (s) =>
        `<a href="${esc(s.url)}" target="_blank" rel="noopener" class="src-link" title="${esc(s.org)}">${esc(shortOrg(s.org))}</a>`
    )
    .join('<span class="src-sep">·</span>');

  return `<span class="src-label">${t("출처", "Sources")}:</span> ${links}`;
}

// Shorten org names for the footer (e.g. "U.S. Treasury / OFAC" → "OFAC").
function shortOrg(org) {
  if (org.includes("/")) return org.split("/").pop().trim();
  return org;
}
