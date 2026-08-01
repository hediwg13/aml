---
name: kraken-dark-dashboard-design
description: Apply the Kraken design language (purple-accented, data-dense) adapted for a dark-theme dashboard. Use when refining the visual design of this AML/sanctions dashboard — colors, typography, spacing, shadows, and component styling.
---

# Kraken Design Language — Dark Adaptation

This skill adapts the **Kraken** design system (from
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/kraken/DESIGN.md))
for use on a **dark-themed data dashboard**.

Kraken's native tokens are light-mode. The values below are the *adapted* tokens
used in this project — Kraken's color ratios, tint-based badges, 12px-max radius
discipline, and subtle elevation are preserved while inverting the surface
palette to dark.

## Why this fits

The dashboard's existing DNA — dark navy background, purple accent, data-dense
cards, tabular numerals — already overlaps Kraken. This skill formalizes that
overlap into a coherent token set.

## Adapted design tokens

### Color (dark-adapted)

| Token | Value | Source mapping |
|---|---|---|
| `--bg` | `#0b0c14` | Kraken near-black `#101114` darkened |
| `--bg-2` | `#11121d` | elevated surface |
| `--panel` | `#16182a` | card surface |
| `--panel-2` | `#1c1e34` | header/raised surface |
| `--border` | `#262842` | Cool Gray `#686b82` @ low alpha on dark |
| `--text` | `#f4f5fb` | white-on-dark |
| `--text-dim` | `#9497a9` | Kraken Silver Blue (verbatim) |
| `--muted` | `#686b82` | Kraken Cool Gray (verbatim) |
| `--accent` | `#7132f5` | **Kraken Purple (verbatim)** — primary CTA |
| `--accent-soft` | `rgba(133,91,251,0.16)` | Kraken Purple Subtle 16% (verbatim) |
| `--accent-deep` | `#5b1ecf` | Kraken Purple Deep (verbatim) |

Semantic / actor colors keep their signal role but are tuned to Kraken's
16%-tint badge pattern:

| Token | Solid | Tint (16%) |
|---|---|---|
| success | `#149e9e`→`#14a861` | `rgba(20,168,97,0.16)` |
| warn (Iran) | `#f5a524` | `rgba(245,165,36,0.16)` |
| danger (Russia) | `#f5475f` | `rgba(245,71,95,0.16)` |
| signal (DPRK) | `#8b5cf6` | `rgba(139,92,246,0.16)` |

### Typography

- UI font: Kraken-Product fallback → `Helvetica Neue, Inter, system-ui, "Apple SD Gothic Neo", "Malgun Gothic"`
- Type scale (dark-optimized sizes): display 22px / heading 15px / body 13px /
  caption 12px / micro 11px
- Letter-spacing tightened on headings (-0.01em) per Kraken Brand style
- Numerals: `font-variant-numeric: tabular-nums` for all USD/figures (Kraken
  data-density principle)

### Shape & elevation

- Border radius scale (Kraken): `6px` small · `8px` · `10px` · `12px` (max) ·
  `9999px` only for pills/badges — **buttons never exceed 12px**
- Shadows (Kraken subtle, dark-adjusted):
  - `--shadow: 0 8px 28px rgba(0,0,0,0.45)`
  - elevation = border + tiny shadow, NOT heavy drop shadows

### Component rules

- **Buttons**: primary = `#7132f5` bg / white text / 12px radius; subtle =
  `rgba(133,91,251,0.16)` bg / purple text
- **Badges/tags**: always tint bg (16%) + matching text color, 6–8px radius
- **Cards**: `--panel` surface, `1px solid --border`, 12px radius, no heavy
  shadow
- **KPI values**: tabular-nums, large display weight; label = Silver Blue

## Application note

Kraken is solid-fill + tint based — **avoid gradients** except the header brand
strip. Color hierarchy comes from tint opacity, not glow. When in doubt, use a
16% tint of the semantic color rather than a solid fill.
