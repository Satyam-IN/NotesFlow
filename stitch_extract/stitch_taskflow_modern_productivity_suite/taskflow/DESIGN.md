---
name: TaskFlow
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 24px
  margin: 32px
  space-xs: 4px
  space-sm: 8px
  space-md: 16px
  space-lg: 24px
  space-xl: 32px
---

## Brand & Style

This design system establishes a modern SaaS productivity aesthetic that balances clinical precision with approachable warmth. Designed for professionals managing complex task ecosystems, the visual language evokes focus, reliability, and calm efficiency. 

The aesthetic marries **Minimalism** with **Modern Corporate** influences: heavy whitespace, disciplined grid alignments, and a restrained color foundation paired with intentional, vibrant accents for status and state management. The interface avoids unnecessary ornamentation, ensuring content remains the undisputed hero.

## Colors

The color architecture relies on a deep indigo primary for core interactive states and primary actions, anchored by slate neutrals for structural framing and text hierarchy. Status tags utilize high-vibrancy, accessible semantic accents to ensure rapid visual parsing of task urgency and completion states across dense information displays.

## Typography

Typography strictly utilizes Inter to maintain a utilitarian, professional, and systematic feel. Scale steps are optimized for high-density data displays, ensuring legibility at small sizes while maintaining sculptural authority in larger dashboard headers. Tightened letter-spacing on headlines adds a modern SaaS polish.

## Layout & Spacing

A 12-column fluid grid system governs the layout, providing predictable reflow across viewports. Outer canvas margins contract gracefully from 32px on desktop to 16px on mobile. The spacing rhythm strictly follows an 8px base grid, ensuring consistent vertical pacing and component alignment throughout dense task boards and lists.

## Elevation & Depth

Visual hierarchy is communicated primarily through subtle, ambient shadows and layered tonal backgrounds rather than heavy borders. 

- **Surfaces:** Utilize slate-tinted neutral fills to separate panels, sidebars, and main canvases.
- **Shadows:** Use ultra-diffused, low-opacity shadows tinted with the primary slate hue (`0 4px 20px -2px rgba(100, 116, 139, 0.08)`) to create a soft, floating card effect without harsh lines.

## Shapes

The design system employs a **Rounded** shape language (`rounded` level 2). Core containers, cards, and input fields utilize a 0.5rem base border radius, scaling up to 1rem for modal containers and large structural wrappers. This approachable geometry softens the utilitarian density of the productivity workspace.

## Components

- **Buttons:** Primary buttons feature solid indigo fills, subtle hover elevation lifts, and 0.5rem rounding. Secondary actions use ghost or low-contrast slate outlines.
- **Chips & Status Tags:** Compact capsule elements utilizing vibrant semantic accent backgrounds with matching high-contrast text for rapid prioritization and state scanning.
- **Lists:** Clean row items featuring generous vertical padding, subtle hover states, and clear left-aligned status indicators or drag handles.
- **Checkboxes & Radios:** Precision-engineered 16px square/circular inputs with smooth state transitions, utilizing the primary indigo for checked states.
- **Input Fields:** Outlined text inputs with slate borders, clear focus rings in primary indigo, and integrated helper text or icon slots.
- **Cards:** Elevated container surfaces featuring 0.5rem rounding, subtle ambient shadows, and clear internal padding adhering to the 8px grid scale.
- **Additional (Task Board Columns / Kanban):** Specialized containers designed for drag-and-drop workflows, featuring sticky headers, dashed drop zones, and internal card stacking.