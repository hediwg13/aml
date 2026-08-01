// Small formatting utilities.

export function formatUsd(value) {
  if (!value && value !== 0) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value}`;
}

export function formatUsdFull(value) {
  if (!value && value !== 0) return "—";
  return `$${value.toLocaleString("en-US")}`;
}

export function formatDate(iso) {
  if (!iso) return null;
  return iso; // keep ISO; components decide display
}

// Escapes user-data-adjacent strings for safe HTML insertion.
export function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
