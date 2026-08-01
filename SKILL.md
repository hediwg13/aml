---
name: anti-slop-dashboard-layout
description: Layout & composition discipline for this dashboard. Apply when changing the dashboard's spatial structure — spacing, hierarchy, nesting, borders/shadows. Codifies the anti-AI-slop rules from impeccable.style, VibeCodeKit, and rohitg00's break-default-aesthetic so the UI stays intentional, not templated.
---

# Anti-Slop Layout Discipline

This dashboard's visual problems were never about color — they were **layout
anti-patterns**. This skill codifies the rules that keep the structure
intentional. Sources: [impeccable.style/slop](https://impeccable.style/slop),
[VibeCodeKit](https://vibecodekit.dev/ai-slop-design),
[rohitg00/awesome-claude-design](https://github.com/rohitg00/awesome-claude-design).

## The rules this dashboard must follow

### 1. Separation hierarchy (in order, stop early)
Separate content using the **first method that reads**, in this order:
1. **Whitespace** — always try this first.
2. **Tonal shift** — a 3–5% background-lightness step (the surface ladder).
3. **Elevation** — only on overlays (modals, dropdowns).
4. **Border** — last resort; never a flat gray line if a tonal step works.

### 2. One depth method, not two
A container uses **either** a 1px border **or** a shadow — never both. Panels
use border + surface ladder; only modals/dropdowns get shadows.

### 3. Flatten nesting (max depth 2)
No cards inside cards. If something needs separation inside a panel, use
spacing or a tonal shift — not another bordered wrapper.

### 4. Spacing rhythm, not monotony
Inside a component < between components < between sections. Concretely:
`--sp-2` (8) within a card, `--sp-3` (12) between cards, `--sp-5` (24)
between sections. Never one value (e.g. 16px) everywhere.

### 5. Kill the dashboard-tile tell
No colored left-border accent on cards. That shape — "rounded card with a
colored left rule" — is *the* canonical AI-dashboard tile. Actor identity is
expressed by a tag, never by structural decoration.

### 6. Structure is information, not decoration
Structural devices (prompt symbols, cursors, numbered eyebrows, glow) must
encode something real. If they only decorate, remove them. A blinking cursor,
a `$` prompt, a `>` prefix, a scanline overlay — all decoration, all removed.

### 7. Hierarchy must survive the squint test
At thumbnail size, sections should not all read as identical boxes. Vary
density: one tight zone, one breathing zone. Reserve the accent color for one
or two things that matter (active state, primary action), not every heading.

## Removed (the slop this dashboard shed)
- CRT scanline overlay · blinking `_` cursor · `$`/`>` prompt symbols
- `text-shadow` phosphor glow on headings/values (decorative, killed contrast)
- Colored left-border on modal header (dashboard-tile tell)
- Emoji logo `⚡` (icon-tile tell)
- Large sources modal/FAB (excessive real estate) → footer inline links

## What stays
- Space Mono typography (the one deliberate aesthetic choice)
- Single green accent `#2DB58A` used sparingly (active/primary only)
- Surface ladder `bg → bg-2 → panel → panel-2` for depth
- Desaturated actor signal colors (green stays dominant)
