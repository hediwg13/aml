---
name: matrix-terminal-design
description: Apply the Matrix design language (monospace, phosphor-glow green-on-black cyber-terminal) to this AML/sanctions dashboard. Use when refining the visual design — the dark cyber-terminal aesthetic defined by Space Mono typography, one green interaction accent (#2DB58A), and subtle phosphor glow.
---

# Matrix Design Language — Phosphor Terminal

This skill applies the **Matrix** design system (from
[bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills/tree/main/skills/matrix))
to this dark dashboard. Matrix is described as a "dark cyber-terminal visual
language with mono typography, dense data layouts, and one green interaction
accent."

## Why this fits

A cyber-terminal aesthetic suits a threat-intelligence / AML monitoring
dashboard — green-on-black reads as a monitoring console, monospace gives
financial figures an exactness, and dense data layouts are native to this
domain.

## Source tokens (verbatim from Matrix SKILL.md / DESIGN.md)

| Token | Value | Source |
|---|---|---|
| primary | `#2DB58A` | Matrix primary (the single green accent) |
| secondary | `#0B0C14` | Matrix secondary (near-black background) |
| success | `#16A34A` | Matrix success |
| warning | `#D97706` | Matrix warning |
| danger | `#DC2626` | Matrix danger |
| text | `#111827` | Matrix text (inverted for dark mode) |
| Font | `Space Mono` | Matrix primary/display/mono (all identical) |
| Type scale | `12/14/16/20/24/32` | Matrix sourceScale |
| Spacing | `4/8/12/16/24/32` | Matrix sourceScale |
| Rounded | `4px / 8px` | Matrix sm/md |

## Phosphor glow (authored — not in source)

Matrix's source files define no glow/shadow tokens, yet "phosphor glow" is the
defining trait of the brand. These values are authored to realize that intent
while keeping WCAG AA contrast:

```css
--glow-sm: 0 0 6px rgba(45, 181, 138, 0.45);
--glow-md: 0 0 12px rgba(45, 181, 138, 0.5);
--glow-text: 0 0 8px rgba(45, 181, 138, 0.55);
```

## Design rules

- **One green accent only.** `#2DB58A` is the single interaction color. Actor
  signal colors (Iran/Russia/DPRK) remain as semantic data colors, desaturated
  so green stays dominant.
- **Monospace everywhere.** Space Mono for all UI; JetBrains Mono as numeric
  fallback (slightly tighter for tabular figures).
- **Phosphor glow is subtle.** Apply `--glow-text` to headings/values and
  `--glow-sm` to active/focus states — never to body text (kills readability).
- **High-contrast borders, no heavy shadows.** Elevation comes from 1px borders
  in a faint green tint, not drop shadows.
- **Scanline overlay** is optional and very low opacity (≤5%) so it reads as
  texture, not noise.
- **Caps + letter-spacing** on labels/headers for the terminal vibe.
- **Cursor blink** on the brand title reinforces the terminal motif.
