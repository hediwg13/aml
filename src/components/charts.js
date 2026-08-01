import Chart from "chart.js/auto";
import { t, L } from "../i18n.js";
import { ACTORS, ENTITY_TYPES, getSource, primaryUsd } from "../data/dataset.js";
import { formatUsd } from "../format.js";

let charts = {};

const COMMON_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#cdd3e0", font: { size: 11 }, boxWidth: 12 },
      position: "bottom",
    },
    tooltip: {
      backgroundColor: "#11182a",
      titleColor: "#fff",
      bodyColor: "#cdd3e0",
      borderColor: "#2a3550",
      borderWidth: 1,
      padding: 10,
      callbacks: { label: (ctx) => ` ${ctx.dataset.label || ctx.label}: ${formatUsd(ctx.raw)}` },
    },
  },
  scales: {
    x: { ticks: { color: "#8a93a8" }, grid: { color: "#1c2540" } },
    y: { ticks: { color: "#8a93a8", callback: (v) => formatUsd(v) }, grid: { color: "#1c2540" } },
  },
};

export function renderCharts(entities, flows) {
  const actorColors = Object.fromEntries(Object.values(ACTORS).map((a) => [a.code, a.color]));

  // 1) USD by actor (bar) — sum of primary entity figure + flow usd per actor
  const byActor = {};
  Object.keys(ACTORS).forEach((k) => (byActor[k] = 0));
  entities.forEach((e) => (byActor[e.actor] += primaryUsd(e)));
  flows.forEach((fl) => (byActor[fl.actor] += fl.usd));

  // 2) Illicit funds by year (stacked by actor)
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const yearByActor = {};
  Object.keys(ACTORS).forEach((k) => (yearByActor[k] = years.map(() => 0)));
  flows.forEach((fl) => {
    const idx = years.indexOf(fl.year);
    if (idx >= 0) yearByActor[fl.actor][idx] += fl.usd;
  });
  // Add entity figures to the year too
  entities.forEach((e) =>
    e.usdFigures.forEach((u) => {
      const idx = years.indexOf(u.year);
      if (idx >= 0) yearByActor[e.actor][idx] += u.value;
    })
  );

  // 3) Entity type distribution (doughnut)
  const typeCounts = {};
  Object.keys(ENTITY_TYPES).forEach((k) => (typeCounts[k] = 0));
  entities.forEach((e) => (typeCounts[e.type] = (typeCounts[e.type] || 0) + 1));

  // 4) Top entities by USD
  const sorted = [...entities]
    .map((e) => ({ e, usd: primaryUsd(e) }))
    .filter((x) => x.usd > 0)
    .sort((a, b) => b.usd - a.usd)
    .slice(0, 10);

  const actorLabels = Object.fromEntries(Object.values(ACTORS).map((a) => [a.code, a.labelEn]));

  // --- Chart 1: by actor ---
  if (charts.actor) charts.actor.destroy();
  charts.actor = new Chart(document.getElementById("chartActor"), {
    type: "bar",
    data: {
      labels: Object.keys(byActor).map((k) => actorLabels[k]),
      datasets: [
        {
          label: "Reported USD",
          data: Object.values(byActor),
          backgroundColor: Object.keys(byActor).map((k) => actorColors[k]),
          borderRadius: 4,
        },
      ],
    },
    options: {
      ...COMMON_OPTS,
      plugins: {
        ...COMMON_OPTS.plugins,
        title: { display: true, color: "#e6e9f2", text: "Reported USD by actor", font: { size: 12 } },
        legend: { display: false },
      },
    },
  });

  // --- Chart 2: by year (stacked) ---
  if (charts.year) charts.year.destroy();
  charts.year = new Chart(document.getElementById("chartYear"), {
    type: "bar",
    data: {
      labels: years.map(String),
      datasets: Object.keys(ACTORS).map((k) => ({
        label: actorLabels[k],
        data: yearByActor[k],
        backgroundColor: actorColors[k],
      })),
    },
    options: {
      ...COMMON_OPTS,
      scales: {
        x: { ...COMMON_OPTS.scales.x, stacked: true },
        y: { ...COMMON_OPTS.scales.y, stacked: true },
      },
      plugins: {
        ...COMMON_OPTS.plugins,
        title: { display: true, color: "#e6e9f2", text: "Illicit funds by year (stacked by actor)", font: { size: 12 } },
        legend: { ...COMMON_OPTS.plugins.legend, labels: { ...COMMON_OPTS.plugins.legend.labels, boxWidth: 10 } },
      },
    },
  });

  // --- Chart 3: type doughnut ---
  if (charts.type) charts.type.destroy();
  const typeKeys = Object.keys(typeCounts).filter((k) => typeCounts[k] > 0);
  charts.type = new Chart(document.getElementById("chartType"), {
    type: "doughnut",
    data: {
      labels: typeKeys.map((k) => ENTITY_TYPES[k].labelEn),
      datasets: [
        {
          data: typeKeys.map((k) => typeCounts[k]),
          backgroundColor: ["#4f8cff", "#22c1a3", "#a855f7", "#f5a524", "#f5475f", "#8a93a8"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",
      plugins: {
        legend: { position: "right", labels: { color: "#cdd3e0", font: { size: 10 }, boxWidth: 10 } },
        tooltip: COMMON_OPTS.plugins.tooltip,
      },
    },
  });

  // --- Chart 4: top entities ---
  if (charts.top) charts.top.destroy();
  charts.top = new Chart(document.getElementById("chartTop"), {
    type: "bar",
    data: {
      labels: sorted.map((x) => x.e.name),
      datasets: [
        {
          label: "Reported USD",
          data: sorted.map((x) => x.usd),
          backgroundColor: sorted.map((x) => actorColors[x.e.actor]),
          borderRadius: 4,
        },
      ],
    },
    options: {
      ...COMMON_OPTS,
      indexAxis: "y",
      plugins: {
        ...COMMON_OPTS.plugins,
        title: { display: true, color: "#e6e9f2", text: "Top 10 entities (reported USD)", font: { size: 12 } },
        legend: { display: false },
      },
      scales: {
        x: { ...COMMON_OPTS.scales.x, ticks: { ...COMMON_OPTS.scales.x.ticks, callback: (v) => formatUsd(v) } },
        y: { ...COMMON_OPTS.scales.y, ticks: { color: "#8a93a8", autoSkip: false, font: { size: 9 } } },
      },
    },
  });
}
