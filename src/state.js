// Central reactive state with a tiny pub/sub. Components subscribe and
// re-render themselves when the filter set changes.

import { entities, flows, getSource } from "./data/dataset.js";

const state = {
  filters: {
    actors: new Set(["IRAN", "RUS", "DPRK"]),
    types: new Set(["exchange", "mixer", "darknet", "threatActor", "individual", "stablecoin"]),
    yearMin: 2018,
    yearMax: 2026,
    sourceOrgs: new Set(), // empty = all
  },
};

const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  for (const fn of listeners) fn(state);
}

export function setActors(arr) {
  state.filters.actors = new Set(arr);
  notify();
}

export function setTypes(arr) {
  state.filters.types = new Set(arr);
  notify();
}

export function setYearRange(min, max) {
  state.filters.yearMin = min;
  state.filters.yearMax = max;
  notify();
}

export function setSourceOrgs(arr) {
  state.filters.sourceOrgs = new Set(arr);
  notify();
}

export function resetFilters() {
  state.filters = {
    actors: new Set(["IRAN", "RUS", "DPRK"]),
    types: new Set(["exchange", "mixer", "darknet", "threatActor", "individual", "stablecoin"]),
    yearMin: 2018,
    yearMax: 2026,
    sourceOrgs: new Set(),
  };
  notify();
}

// ---- Filtering logic ------------------------------------------------------
// An entity matches if: its actor is selected, its type is selected, AND it has
// at least one USD figure or designation date in the year window. Source-org
// filter applies to its primarySourceId's org.

export function filteredEntities() {
  const f = state.filters;
  return entities.filter((e) => {
    if (!f.actors.has(e.actor)) return false;
    if (!f.types.has(e.type)) return false;
    const years = [];
    if (e.designationDate) years.push(Number(e.designationDate.slice(0, 4)));
    e.usdFigures.forEach((u) => years.push(u.year));
    const inRange = years.some((y) => y >= f.yearMin && y <= f.yearMax);
    if (!inRange && years.length > 0) return false;
    if (f.sourceOrgs.size > 0) {
      const src = getSource(e.primarySourceId);
      if (!src || !f.sourceOrgs.has(src.org)) return false;
    }
    return true;
  });
}

export function filteredFlows() {
  const f = state.filters;
  return flows.filter((fl) => {
    if (!f.actors.has(fl.actor)) return false;
    if (!(fl.year >= f.yearMin && fl.year <= f.yearMax)) return false;
    if (f.sourceOrgs.size > 0) {
      const src = getSource(fl.sourceId);
      if (!src || !f.sourceOrgs.has(src.org)) return false;
    }
    return true;
  });
}
