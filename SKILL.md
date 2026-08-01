---
name: anti-slop-dashboard-discipline
description: Layout & composition discipline synthesized from three anti-AI-slop skills (Krirox/anti-ai-slop-skills, Cuuper22/anti-slop-design, yetone/kill-ai-slop). Apply when changing this dashboard's structure, spacing, typography, or card grids. Each rule cites its source skill.
---

# Anti-Slop Discipline — Three-Skill Synthesis

This dashboard's design rules are synthesized from three anti-AI-slop skills.
Every rule cites its source so the reasoning is auditable.

- **Krirox** — [Krirox/anti-ai-slop-skills](https://github.com/Krirox/anti-ai-slop-skills): detection checklist + "4 root causes" (hierarchy, specificity, restraint, opinion).
- **Cuuper22** — [Cuuper22/anti-slop-design](https://github.com/Cuuper22/anti-slop-design): 15-rule checklist + domain-aware tokens. This dashboard uses the **`devtools` domain profile** (dark-first, dense, 6/8/12 radius, no shadows, 16-col bento).
- **yetone** — [yetone/kill-ai-slop](https://github.com/yetone/kill-ai-slop): 33-pattern catalog with scanner regex + numeric thresholds.

## Domain (Cuuper22 routing)

> "User says dashboard or admin" → **Dense** density.
> Domain `devtools` (closest to a monitoring tool) → `dark_default: true`, `density: medium-dense`, `shadow_style: none`, `layout_preference: bento`, `grid_columns: 16`, radius `6/8/12`.

## The rules

### L1. No equal-card stat grid (yetone #28, #29; Cuuper22 dataviz)
A grid of N identical cards is "a spreadsheet with borders, not a hierarchy."
KPIs must have a **hero metric + supporting metrics** structure, never equal weight.
- Hero: large, top-left, one number.
- Supporting: 3 smaller cards in a row, secondary.

### L2. Space by relationship, not by token (yetone #32; Cuuper22 Rule 10; Krirox root-cause #1)
One spacing value everywhere means nothing belongs to anything. Use the scale
**4 / 8 / 16 / 32 / 64** (Cuuper22 dense tier) applied by relationship:
- inside a component: 8
- between components: 12–16
- between sections: 24–32

### L3. Type scale ≥ 1.25× between steps (yetone #12; Cuuper22 Rule 13)
Flat hierarchy (14–18px band) pushes all weight onto gray shades. Pick few
steps with real contrast. This dashboard's scale: 11 / 13 / 16 / 22 — ratios
1.18 / 1.23 / 1.38. Merge steps that are only a pixel apart.

### L4. One depth method (yetone #20; Cuuper22 Rule 7; Krirox root-cause #3)
Border OR shadow, never both. devtools domain → `shadow_style: none`.
Panels use 1px border + surface ladder. Only modals/overlays get shadows.

### L5. Nesting ≤ 2 (yetone #31; Krirox root-cause #1)
No card inside a card. Group with spacing + hairline dividers, not wrappers.

### L6. Corners must nest (yetone #21)
inner radius = outer radius − padding. Don't apply one radius to every layer.

### L7. Accent is scarce (Krirox root-cause #3; Cuuper22 Rule 11)
One accent (`--accent`). Reserve it for active state + primary action.
Headings/labels use neutral text color; chart colors map to domain palette,
never the library default rainbow (max 6–7 colors, single hue for sequential).

### L8. State coverage (Krirox; Cuuper22 dataviz)
Empty / loading-skeleton / error / edge states required. "Including 2–3
instantly removes the slop signal."

### L9. Motion ≤ 200ms, no overshoot (yetone #26; Cuuper22 Rule 8)
Transitions 120–200ms, standard ease, only on state-carrying properties.
No `scale`/`translate` hover on cards. No cubic-bezier y ≥ 1.2.

## Numeric thresholds (yetone scanner, binding)
- box-shadow blur ≥ 60px → flag (oversized shadow)
- transition duration outside 120–200ms → flag (unless 0ms intentional cut)
- cubic-bezier y-value ≥ 1.2 → flag (overshoot)
- type step ratio < 1.25 → flag (flat hierarchy)
- two identical gaps within 120 chars → flag (monotone spacing)
- radius not adjusted for padding → flag (corners don't nest)

## What was removed (the slop this dashboard shed)
- Equal 4-card KPI grid → hero + supporting hierarchy (L1)
- Monotone 16px gaps → 4/8/16/32 scale by relationship (L2)
- Border + shadow on panels → border only (L4)
- Accent on every heading → neutral headings, scarce accent (L7)
- Earlier: CRT scanlines, blinking cursor, `$`/`>` prompts, glow text-shadows,
  colored left-border on modal, emoji logo (all decoration per Krirox root-cause #3)
