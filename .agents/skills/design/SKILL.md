---
name: design
description: "Use when doing ANY frontend task — styling, layout, components, colors, typography, spacing — to apply the project's Notion-inspired design system. Triggers: adding or editing UI components; applying colors, fonts, spacing or shadows; creating cards, buttons, forms, modals, nav; reviewing visual consistency; generating new screens or layouts."
metadata:
  author: project
  version: "1.0.0"
---

# Design System — Notion-Inspired

This skill enforces the project's visual language. Read every token reference below before writing any UI code. Do not invent values; map every style decision to a named token.

## Core Philosophy

- **Warm paper canvas, not clinical white.** Page backgrounds use `canvas-soft` (#f6f5f4); cards and inputs use pure white `canvas` (#ffffff).
- **One structural accent.** `primary` (#0075de) is the only colour that paints actions (CTAs, links, focus rings). Never use an accent colour for a button or interactive fill.
- **Decoration vs. structure.** The sticker palette (purple, pink, orange, teal, green, sky) lives only in illustrations, icon tiles, and category dots — never as CTA fills or layout colours.
- **Weight carries hierarchy.** Headlines at 700 with aggressive negative tracking; body at 400. No decorative typefaces.
- **Barely-there elevation.** Shadows are many near-transparent layers, not a single hard drop. Most cards use a hairline only.

---

## Color Tokens

### Brand
| Token | Hex | Use |
|---|---|---|
| `primary` | #0075de | Primary CTA fill, links, active/focus signal |
| `primary-active` | #005bab | Pressed state of primary CTA |
| `secondary` | #213183 | Dark indigo hero band — use at most once per page |
| `on-primary` | #ffffff | Text/icon on primary blue surfaces |

### Surface
| Token | Hex | Use |
|---|---|---|
| `canvas` | #ffffff | Cards, panels, nav bar, form fields |
| `canvas-soft` | #f6f5f4 | Page background, footer band |
| `surface` | #ffffff | Alias for `canvas` in component specs |
| `hairline` | #e6e6e6 | 1px borders and dividers |

### Text
| Token | Hex | Use |
|---|---|---|
| `ink` | #000000 | Primary headings and body (render at ~95% alpha) |
| `ink-secondary` | #31302e | Secondary copy, footer text |
| `ink-muted` | #615d59 | Supporting / muted copy |
| `ink-faint` | #a39e98 | Captions, metadata, placeholders |

### Sticker / Decorative (illustrations only)
| Token | Hex |
|---|---|
| `accent-sky` | #62aef0 |
| `accent-purple` | #d6b6f6 |
| `accent-purple-deep` | #391c57 |
| `accent-pink` | #ff64c8 |
| `accent-orange` | #dd5b00 |
| `accent-orange-deep` | #793400 |
| `accent-teal` | #2a9d99 |
| `accent-green` | #1aae39 |
| `accent-brown` | #523410 |

---

## Typography

**Font family:** `NotionInter` → substitute `Inter` with explicit letter-spacing values below. Enable `lnum` and `locl` OpenType features on headings and body.

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `display-1` | 64px | 700 | 1.0 | −2.125px | Hero headline |
| `display-2` | 54px | 700 | 1.04 | −1.875px | Large section headlines |
| `heading-1` | 40px | 700 | 1.1 | −1px | Section headlines |
| `heading-2` | 26px | 700 | 1.23 | −0.625px | Sub-section headings |
| `heading-3` | 22px | 700 | 1.27 | −0.25px | Card titles |
| `title` | 20px | 600 | 1.4 | −0.125px | Feature titles, callouts |
| `body-md` | 16px | 400 | 1.5 | 0 | Default body copy |
| `body-sm` | 15px | 400 | 1.33 | 0 | Dense body, table rows, nav |
| `button` | 16px | 500 | 1.5 | 0 | Button labels |
| `caption` | 14px | 400 | 1.43 | 0 | Captions, footnotes |
| `eyebrow` | 12px | 600 | 1.33 | +0.125px | Pill badges, small labels |

---

## Spacing (base unit: 8px)

| Token | Value |
|---|---|
| `spacing-xxs` | 4px |
| `spacing-xs` | 8px |
| `spacing-sm` | 12px |
| `spacing-md` | 16px |
| `spacing-lg` | 24px |
| `spacing-xl` | 28px |
| `spacing-xxl` | 32px |

Card interior padding: `spacing-lg` (24px). Utility buttons: 4px / 14px. Form fields: 6px.

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `rounded-xs` | 4px | Form fields, small tags, inline chips |
| `rounded-sm` | 5px | Menu items, list rows, status pills |
| `rounded-md` | 8px | Utility/nav buttons, smaller cards |
| `rounded-lg` | 12px | Feature cards, illustration frames |
| `rounded-xl` | 16px | Large containers, image wells |
| `rounded-full` | 9999px | Marketing pill CTAs, badges, circular icon buttons |

**Critical contrast:** marketing CTAs → `rounded-full`; nav/utility buttons → `rounded-md`; form inputs → `rounded-xs`. Never mix these up.

---

## Elevation

| Level | CSS | Use |
|---|---|---|
| 0 — Flat | `border: 1px solid #e6e6e6` | Default cards on canvas |
| 1 — Soft | `box-shadow: 0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04)` | Raised cards, floating buttons |
| 2 — Elevated | `box-shadow: 0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04), 0 23px 52px rgba(0,0,0,.05)` | Modals, popovers |

---

## Components

### Buttons

**`button-primary`**
```
background: #0075de  |  color: #ffffff  |  font: 16px/500  |  border-radius: 9999px
press: background #005bab + scale(0.9)
```

**`button-secondary`**
```
background: #ffffff  |  color: #000000  |  font: 16px/500  |  border-radius: 9999px
border: none  |  shadow: level-1
```

**`button-utility`** (nav / plan-select)
```
background: #ffffff  |  color: #000000  |  font: 16px/500  |  border-radius: 8px
padding: 4px 14px  |  border: 1px solid #e6e6e6
```

**`button-icon-circular`**
```
background: rgba(0,0,0,.05)  |  border-radius: 9999px  |  press: scale(0.9)
```

### Cards

**`feature-card`**
```
background: #ffffff  |  border-radius: 12px  |  padding: 24px
border: 1px solid #e6e6e6  (flat, no shadow)
```

**`feature-card-elevated`** — same as above + level-1 shadow, no border.

**`pricing-plan-card`**
```
background: #ffffff  |  border-radius: 8px  |  padding: 24px
border: 1px solid #e6e6e6
```

**`pricing-plan-card-featured`** — same shape, `background: #f6f5f4`, no border.

### Forms

**`text-input`**
```
background: #ffffff  |  color: #000000  |  font: 15px/400
border: 1px solid rgb(221,221,221)  |  border-radius: 4px  |  padding: 6px
focus: level-1 shadow
```

### Navigation

**`nav-bar`**
```
background: #ffffff  |  color: #000000  |  font: 15px/400  |  padding: 16px
sticky; left wordmark → centre links → right login + button-utility CTA
collapses to hamburger below 768px
```

### Signature

**`hero-band`** — full-bleed `background: #213183`, white type at `display-1`, sticker constellation, `button-primary` + `button-secondary` pair.

**`badge-pill`**
```
background: #ffffff  |  color: #0075de  |  font: 12px/600/+0.125px  |  border-radius: 9999px
padding: 4px 8px
```

**`footer`**
```
background: #f6f5f4  |  color: #31302e  |  font: 14px/400  |  padding: 32px
```

---

## Layout

- **Max-width container:** 1080–1300px, centred, generous outer gutters.
- **Grid patterns:** 2-up / 3-up card grids for features; 4-column plan table on pricing.
- **Whitespace as grouping:** sections separated by large vertical gaps, not rules.
- **Full-bleed exception:** hero band only.

### Responsive Breakpoints
| Name | Width | Change |
|---|---|---|
| Wide | 1440px+ | Full multi-column, widest container |
| Desktop | 1080–1300px | Standard container, 3-up grids |
| Tablet | 768–840px | 2-up grids, nav condenses |
| Mobile | ≤600px | Single-column, hamburger nav, full-width CTAs |

---

## Rules (enforce on every UI task)

**Do**
- Use `canvas-soft` as the page background; `canvas` / `surface` for cards and fields.
- Reserve `primary` for the primary action and links only.
- Apply negative letter-spacing values explicitly on all headings.
- Use `rounded-full` for marketing CTAs, `rounded-md` for utility buttons, `rounded-xs` for inputs.
- Build elevation from many near-transparent layers, never a single hard shadow.
- Use the `secondary` dark indigo band at most once per page.

**Don't**
- Paint a CTA or structural fill with any sticker/accent colour.
- Introduce a second structural accent alongside `primary`.
- Apply `rounded-full` to form fields.
- Use heavy single-layer drop-shadows.
- Set body copy in weight 700 — keep 400 for body, 700 for headlines.
- Use pure white (#ffffff) as the full-page background.
