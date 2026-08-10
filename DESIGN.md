---
name: "Wilson's Toolkit — Floating Gallery"
description: "A restrained, screenshot-led 3D gallery for recognizing and opening Wilson's tools."
colors:
  near-black: "#0a0a0a"
  pearl: "#f6f6f2"
  muted-pearl: "#9a9a96"
  focus-blue: "#b9d4ff"
  panel-black: "#111111"
  indicator-gray: "#555552"
  ambient-pearl: "rgba(255, 255, 255, 0.035)"
typography:
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(0.86rem, 1.35vw, 1.05rem)"
    fontWeight: 500
    lineHeight: 1.2
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  focus: "0.5rem"
  card: "1rem"
  pill: "999px"
spacing:
  xs: "0.6rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "2.5rem"
components:
  screenshot-card:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.pearl}"
    rounded: "{rounded.card}"
    width: "clamp(19rem, 43vw, 36rem)"
  screenshot-card-mobile:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.pearl}"
    rounded: "{rounded.card}"
    width: "min(82vw, 22rem)"
  caption:
    backgroundColor: "transparent"
    textColor: "{colors.pearl}"
    typography: "{typography.title}"
  wordmark:
    backgroundColor: "transparent"
    textColor: "{colors.pearl}"
    typography: "{typography.label}"
---

# Design System: Wilson's Toolkit — Floating Gallery

## Overview

**Creative North Star: "The Quiet Orbit"**

Wilson's Toolkit is presented as a restrained exhibition rather than a conventional directory. A near-black field recedes behind a ring of real product screenshots, allowing visitors to recognize each tool visually before opening it. Pearl typography is deliberately scarce, and the interface avoids descriptive blocks, card codes, visible item counts, and decorative chrome.

The signature is a full-viewport 3D ring: one large card faces the viewer while adjacent tools remain dimly visible at the edges. Soft depth, slow floating motion, inertial dragging, and precise snapping make the system spatial without becoming theatrical. This direction is anchored to design seed `user-pinned-39b98dd9` and to the first direction contract in `index.html`.

**Key Characteristics:**

- Near-black and pearl restrained palette with only functional muted and focus colors.
- Real 16:10 product screenshots are the dominant content and identity.
- Full-screen 3D ring with one active card, visible peripheral cards, and minimal navigation.
- Active-only caption on a transparent background; no visible card code or count.
- Archivo throughout, with compact weights, sizes, and tracking.
- Desktop timed snap, mobile manual control, hover lift, and drag inertia.

## Colors

The palette behaves like a dark gallery: near-black establishes silence, pearl carries the few essential labels, and muted neutrals only indicate secondary state.

### Primary

- **Pearl:** The high-contrast foreground for the wordmark, active tool name, active navigation mark, selection inversion, and open affordance.

### Neutral

- **Near Black:** The uninterrupted page and viewport ground.
- **Panel Black:** A reserved dark surface token inherited from the implementation; use only when a discrete panel surface is necessary.
- **Muted Pearl:** Secondary informational text when it must recede from the active tool.
- **Indicator Gray:** Inactive navigation dots and low-priority position cues.
- **Ambient Pearl:** A barely visible blurred field behind the ring; it adds atmosphere without reading as a spotlight.
- **Focus Blue:** The sole functional exception to the monochrome palette, reserved for accessible keyboard focus.

### Named Rules

**The Pearl Is Rare Rule.** Use pearl only for active or essential information; its scarcity creates hierarchy.

**The Screenshot Owns Color Rule.** Interface chrome remains neutral so the real tool screenshots supply the scene's color and detail.

## Typography

**Display Font:** Archivo (with sans-serif fallback)  
**Body Font:** Archivo (with sans-serif fallback)

**Character:** Archivo keeps the gallery matter-of-fact and contemporary. Typography acts as a precise label system, never as a competing editorial layer.

### Hierarchy

- **Title** (500, fluid compact size, approximately 1.2 line-height): Active tool names below the screenshot; single line with ellipsis when needed.
- **Label** (600, compact size, 0.08em tracking, uppercase where supplied): Wordmark and `OPEN` action; concise and architectural.
- **Assistive copy**: Headings, instructions, status updates, and counts remain screen-reader-only rather than adding visible density.

### Named Rules

**The Minimum Type Rule.** If the screenshot or interaction already communicates the information, do not add a visible heading, description, card code, or item count.

## Layout

The gallery occupies the complete small viewport height (`100svh`) and clips overflow. A fixed, pointer-transparent header places the wordmark at the upper-left while the ring fills the viewport beneath it. The active card is centered in three-dimensional space; its width scales fluidly from a compact minimum to a generous desktop maximum, and its 16:10 ratio preserves consistent screenshot framing.

The ring uses a deep perspective and responsive radius. On desktop, the radius grows with viewport width but remains bounded so neighboring cards stay legible at the edges. At the mobile breakpoint (`42rem`), the card becomes at most 82% of the viewport width, header padding tightens, the caption moves closer to the image, `OPEN` is removed, and the navigation sits lower. Short landscape screens receive a reduced card maximum.

Navigation is a centered row of generous invisible hit areas containing tiny status marks. The current mark stretches into a pill. Do not surface numeric pagination or card numbering.

## Elevation & Depth

Depth is spatial first and shadow-based second. Cards sit on a true 3D ring with perspective, rotation, and distance-based opacity; the active card advances through contrast and stacking rather than a border. A broad soft shadow anchors each screenshot, while an extremely faint blurred pearl field prevents the central area from feeling empty.

### Shadow Vocabulary

- **Card Ambient:** `0 2.6rem 6rem rgba(0, 0, 0, 0.58)` grounds screenshots at rest without creating a hard edge.
- **Card Lift:** `0 3.2rem 7.5rem rgba(0, 0, 0, 0.72)` expands and deepens on hover or keyboard focus.

### Named Rules

**The Spatial Before Ornamental Rule.** Express hierarchy through ring position, opacity, scale, and soft elevation; do not add outlines, gradients, glass panels, or decorative borders.

## Shapes

Screenshot cards use a gently rounded 1rem silhouette with clipped imagery and no visible border. The navigation moves between circular inactive dots and a fully rounded active pill. Focusable utility surfaces may use a smaller 0.5rem corner, but the screenshot card radius is the signature shape and should remain consistent.

## Components

### Wordmark

- **Character:** A fixed, compact uppercase signature at the upper-left.
- **Color:** Pearl on transparent near-black.
- **Type:** Archivo semibold with 0.08em tracking.
- **Behavior:** The header ignores pointer input except for the wordmark link itself.

### Screenshot Cards

- **Corner Style:** Gently rounded image corners using the card radius.
- **Content:** Use real product screenshots with meaningful alternative text; do not replace them with illustrations, generic thumbnails, or fabricated UI.
- **Background:** No added card body; the image itself is the surface.
- **Shadow Strategy:** Soft ambient shadow at rest, stronger diffuse shadow during hover or focus.
- **Behavior:** Cards form an evenly spaced 3D ring. Angular distance lowers peripheral opacity to a restrained minimum while keeping neighboring tools present.
- **Hover / Focus:** Lift the surface, enlarge it slightly, and strengthen its shadow. Pressing settles it toward the plane with a subtle scale reduction.

### Active Caption

- **Style:** A two-column, transparent caption directly below the screenshot: tool name on the left and `OPEN` on the right.
- **State:** Only the active card reveals its caption; inactive captions remain both invisible and non-presentational.
- **Responsive:** Mobile retains only the tool name. Never add a card code, index, total, badge, or opaque caption tray.

### Ring Navigation

- **Style:** One compact status mark per tool, centered near the bottom and contained in a 2.75rem square hit target.
- **Default:** Inactive marks are small gray circles.
- **Active / Hover / Focus:** The mark widens into a pearl pill; no digits or labels are visually shown.

### Gallery Interaction

- **Drag:** Horizontal pointer motion rotates the ring directly; release preserves velocity, decays it, then snaps to the nearest card.
- **Keyboard:** Left and right arrows move between cards; Home and End target the bounds. Only the active card link participates in tab order.
- **Desktop timing:** When idle, unhovered, and motion is allowed, advance to the next card every 9 seconds using a 560ms eased snap.
- **Mobile timing:** Never autoplay at or below the mobile breakpoint; navigation is user-controlled.
- **Ambient motion:** Each card floats gently on a staggered 5.6-second loop. Reduced-motion preference collapses animation and transition duration.

## Do's and Don'ts

### Do:

- **Do** keep the near-black field visually quiet so the screenshot remains the first read.
- **Do** use authentic screenshots at 16:10 and preserve their full, recognizable interface.
- **Do** reveal the transparent caption only for the active card.
- **Do** preserve hover lift, keyboard focus, inertial dragging, and snap-to-card behavior.
- **Do** keep desktop autoplay slow and pausable, and disable it on mobile and for reduced motion.

### Don't:

- **Don't** add card codes, visible counts, descriptive paragraphs, category chips, or dashboard-style metadata.
- **Don't** place captions on opaque panels or attach extra chrome to screenshot cards.
- **Don't** introduce accent colors outside authentic screenshots except the functional focus color.
- **Don't** flatten the gallery into a conventional grid or hide all peripheral cards.
- **Don't** autoplay on mobile or override reduced-motion preferences.
