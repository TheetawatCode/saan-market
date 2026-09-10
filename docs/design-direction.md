# Saan Market design direction

## Design thesis

Saan Market should feel like a calm, contemporary Thai design journal that happens to be shoppable. The experience combines commerce storytelling, generous editorial pacing, and highly legible product information. It is premium but never cold, ornate, or exclusive.

Reference qualities—not copied layouts—are:

- Shopify-style balance between maker stories and transactional clarity.
- Starbucks-like calm rhythm, warm material photography, and approachable pacing.
- Meta-like clean product cards, confident scale, and clear calls to action.

Avoid dashboard chrome, generic SaaS card grids, repeated gradients, decorative glass, neon accents, and visual references that reduce Thai craft to tourist motifs.

## Design tokens

Tokens will live as CSS custom properties and be exposed through Tailwind where useful. Names describe purpose so themes can change without rewriting components.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#FCFBF7` | Primary warm off-white page |
| `--surface` | `#FFFFFF` | Cards and elevated reading surfaces |
| `--surface-muted` | `#F2F4F7` | Quiet grouped content |
| `--ink` | `#0B1736` | Primary deep-navy text |
| `--ink-muted` | `#536079` | Secondary text |
| `--navy` | `#102A56` | Dark bands and strong controls |
| `--indigo` | `#253B80` | Brand depth and selected states |
| `--cobalt` | `#2457E6` | Links, focus, and primary actions |
| `--cobalt-hover` | `#1945BE` | Primary hover/pressed direction |
| `--earth` | `#8A472F` | Restrained craft/story accent |
| `--earth-soft` | `#F1DED2` | Warm tags and editorial backgrounds |
| `--border` | `#D9DEE8` | Dividers and card boundaries |
| `--focus` | `#145CFF` | High-visibility focus ring |
| `--success` | `#24734C` | Success state, paired with text/icon |
| `--danger` | `#B4232C` | Error state, paired with text/icon |

Do not use `--earth` as small body text on the canvas without a contrast check. Color never carries status on its own.

### Typography

- **UI and body:** Geist Sans, with `Noto Sans Thai`, system sans-serif fallbacks. It should render English and Thai names cleanly at matching visual weight.
- **Editorial display:** begin with the same family at lighter weight and tighter tracking. Introduce a second display face only if real content proves it adds identity without harming performance.
- **Numeric data:** tabular numerals for prices, quantities, and totals.
- **Scale:** `12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 px`; mobile display sizes use fluid `clamp()` values rather than fixed desktop sizes.
- **Reading measure:** 60–70 characters for editorial copy; product metadata remains shorter and scannable.
- Body text does not fall below 16 px for primary reading content.

### Spacing, shape, and elevation

- Spacing base: 4 px; common steps `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Component radius: 8–12 px; product imagery: 16–24 px; pills only for compact tags and controls.
- Borders are quiet 1 px hairlines. Cards rely on spacing and structure before shadows.
- Default shadow: `0 12px 32px rgb(11 23 54 / 0.08)` for rare floating surfaces such as cart drawers.
- No broad glassmorphism. A translucent sticky header is acceptable only when contrast remains stable over content.

## Layout system

- Mobile-first, full-width canvas with safe 20 px gutters.
- Content container: 1280 px maximum; editorial text container: 720 px maximum.
- Gutters grow to 32 px at tablet and 48–64 px at wide desktop.
- Primary grid: 4 columns on mobile, 8 on tablet, 12 on desktop.
- Sections use generous vertical rhythm: roughly 64 px mobile, 96–128 px desktop.
- Product grids: 2 columns on standard mobile where content remains legible, 3 on tablet, 4 on desktop. Very narrow viewports may collapse to 1 column.
- Use intentional asymmetry for editorial modules, but keep purchasing information aligned and predictable.

## Core component direction

- **Header:** quiet wordmark, Shop/Collections/Our Story links, search, and cart count. Mobile navigation uses a labelled disclosure or dialog with reliable focus handling.
- **Announcement bar:** optional single-line service message; never an auto-rotating carousel.
- **Hero:** one strong product or interior photograph, short editorial headline, supporting copy, and one primary action. Avoid crowded overlays on detailed imagery.
- **Product card:** fixed image ratio, product name, short provenance/category label, baht price, and optional single badge. The whole card may be discoverable, but nested controls must remain semantically valid.
- **Collection tile:** image-led and editorial, with title and concise context rather than dashboard metadata.
- **Filters and sort:** URL-backed, keyboard operable, and easy to clear. Mobile filters use a modal sheet with an explicit result count and apply action.
- **Product gallery:** stable aspect ratios, useful alternative text, thumbnails with selected state, and no forced hover-only discovery.
- **Purchase panel:** clear price, option labels, stock message, quantity, delivery expectation, and a dominant add-to-cart action.
- **Cart drawer/page:** line items, editable quantity, removal confirmation/undo where practical, subtotal, and transparent simulated-checkout language.
- **Form fields:** persistent labels, help/error text, at least 44 px control height, and visible focus. Placeholder text is never the label.
- **Footer:** deep navy close with service notes, navigation, fictional-brand disclosure, and project context.

Every component must define default, hover, focus-visible, active, disabled, loading, empty, error, and success behavior when those states apply.

## Responsive behavior

- Design and test at 320, 375, 768, 1024, and 1440 px, plus content-driven widths between them.
- Navigation condenses before links wrap or collide.
- Editorial split layouts stack with text before non-essential imagery unless the story requires another reading order.
- Product names can wrap to two lines without shifting price alignment unpredictably.
- Filter controls become a modal sheet on smaller screens; applied filters remain visible as removable chips.
- Product detail becomes a single reading flow on mobile and a gallery/purchase split on desktop.
- Cart drawer becomes a full-screen dialog on compact viewports.
- Never hide essential product, price, availability, or delivery information solely to make a layout fit.
- Support text zoom to 200% and reflow without horizontal page scrolling.

## Image direction

- Contemporary Thai homes, tactile natural materials, and real-feeling use contexts rather than isolated generic stock objects.
- Product set: handwoven textiles, stoneware, reclaimed teak accessories, natural-fiber baskets, and understated desk/home objects.
- Lighting: soft daylight with honest texture and moderate contrast; avoid orange “exotic” grading.
- Palette: off-white plaster, indigo textile, dark timber, cobalt details, clay, and muted greenery.
- Composition alternates clean catalog crops with wider editorial scenes. Reserve text-safe negative space intentionally.
- Use consistent product aspect ratios and art direction to prevent layout shift. Images ship through `next/image` with meaningful `sizes` and intrinsic dimensions.
- Product names and maker stories are fictional and culturally respectful; avoid sacred imagery as decoration or vague “tribal” language.

## Motion

- Motion explains state: menu entry, cart feedback, filter changes, and image transitions.
- Use 150–250 ms for controls and 300–450 ms for larger surfaces with restrained easing.
- Avoid scroll-jacking, continuous ambient motion, parallax that affects reading, and auto-advancing carousels.
- Under `prefers-reduced-motion: reduce`, remove non-essential transforms and smooth scrolling while keeping state changes understandable.

## Accessibility notes

- Target WCAG 2.2 AA and verify real token pairings, not isolated swatches.
- Preserve semantic source order across breakpoints. CSS layout must not create a confusing focus or reading order.
- Use one descriptive `h1` per page and a logical heading hierarchy beneath it.
- Focus rings use a 2 px or greater visible outline with separation from the component edge.
- Interactive product imagery needs accessible names; decorative lifestyle imagery uses empty alt text.
- Icon-only buttons receive programmatic names and 44 × 44 px targets.
- Dialogs require an accessible name, initial focus, focus containment, Escape handling, and focus return.
- Announce cart updates and async results politely; urgent validation errors receive clear focus management.
- Validate keyboard navigation, 200% zoom, 320 px reflow, high contrast, reduced motion, and screen-reader output manually in addition to automated checks.

## Review checklist

- Does the page feel like a distinct Thai lifestyle storefront rather than a generic template?
- Is the primary shopping action obvious without overpowering the story?
- Can product name, price, availability, and next action be understood at a glance?
- Are spacing and type doing more work than decoration?
- Are all states usable by keyboard, touch, zoom, and assistive technology?
- Does mobile feel intentionally composed rather than merely stacked?
