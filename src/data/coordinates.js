// City / jurisdiction-level coordinates used by the map.
// Mixers (Tornado Cash, Blender.io, Sinbad.io) have no physical jurisdiction;
// they are intentionally given null coordinates so the map skips them while
// flows / tables / charts still reference them.

export const COORDS = {
  // Russia
  MOSCOW_RU: { lat: 55.7558, lng: 37.6173, city: "Moscow", country: "Russia" },
  ST_PETERSBURG_RU: { lat: 59.9343, lng: 30.3351, city: "St. Petersburg", country: "Russia" },
  PRAGUE_CZ: { lat: 50.0755, lng: 14.4378, city: "Prague", country: "Czech Republic" },
  TALLINN_EE: { lat: 59.437, lng: 24.7536, city: "Tallinn", country: "Estonia" },
  RIGA_LV: { lat: 56.9496, lng: 24.1052, city: "Riga", country: "Latvia" },
  HONG_KONG: { lat: 22.3193, lng: 114.1694, city: "Hong Kong", country: "Hong Kong SAR" },
  BISHKEK_KG: { lat: 42.8746, lng: 74.5698, city: "Bishkek", country: "Kyrgyzstan" },

  // Iran
  TEHRAN_IR: { lat: 35.6892, lng: 51.389, city: "Tehran", country: "Iran" },
  DUBAI_AE: { lat: 25.2048, lng: 55.2708, city: "Dubai", country: "United Arab Emirates" },

  // UK (Iran-linked UK-registered exchanges)
  LONDON_UK: { lat: 51.5074, lng: -0.1278, city: "London", country: "United Kingdom" },

  // North Korea
  PYONGYANG_KP: { lat: 39.0392, lng: 125.7625, city: "Pyongyang", country: "North Korea" },
  SINGAPORE: { lat: 1.3521, lng: 103.8198, city: "Singapore", country: "Singapore" },

  // Off-ramp jurisdictions for DPRK laundering
  BEIJING_CN: { lat: 39.9042, lng: 116.4074, city: "Beijing", country: "China" },
  HONG_KONG_CN: { lat: 22.3193, lng: 114.1694, city: "Hong Kong", country: "China" },
};
