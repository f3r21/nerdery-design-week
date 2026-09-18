# Vello Design System — overview and foundations

**Source:** https://vello-design-system.vercel.app/docs/index.html#/overview  
**Extracted:** 2026-09-17

The rendered documentation pages for getting started, the reference kits, color, typography, spacing, radii and elevation, and motion. Token values appear as the site prints them.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/overview -->

Vello Design System

# Documentation

Vello is the design system for a neighborhood services marketplace — warm cream paper, deep forest brand, olive primary actions. 17 React components, 170 tokens, two reference kits. This site documents every variant, prop, guideline and accessibility requirement.

17 components

170 tokens

React 18

MIT-internal

## Getting started

Two files. Link the stylesheet for tokens and base styles, load the bundle for components.

```
<link rel="stylesheet" href="/styles.css">
<script src="/_ds_bundle.js"></script>

<script type="text/babel">
  const { Button, ProviderCard } = window.VelloDesignSystem_182a1b;
</script>
```

html

Copy

Components are plain React 18 function components — no build step required for prototyping. Icons come from Lucide; pass them as nodes (`<i data-lucide="heart" />`) and call `lucide.createIcons()` after render.

## Principles

### Warm before clever

Cream paper, soft radii, generous space. Vello should feel like a neighborhood noticeboard, not a marketplace dashboard.

### Trust is visible

Verification, ratings and distance are first-class UI, never fine print. Trust marks use shape plus color, never color alone.

### One action per screen

A single olive primary leads each surface. Persimmon is a rare emphasis, not a second CTA.

### Legible at arm’s length

Body text never below 14px, tap targets never below 44px, 4.5:1 contrast on all text.

## What is in the system

| Layer | Contents | Where |
| --- | --- | --- |
| Tokens | 170 CSS custom properties — color, type, space, radii, shadow, motion, z, containers | `tokens/*.css, entry styles.css` |
| Components | 17 React components across buttons, forms, cards, display, navigation, feedback | `components/**` |
| Patterns | Accent usage, trust marks, scroll affordance, tappable cards, voice | `guidelines/**` |
| Kits | Vello app (mobile) and Vello site (marketing) reference builds | `ui_kits/**` |

## Deploying this site

The docs are static HTML — no build step. Point Vercel at the repository root with no framework preset and no build command; the site is served from /docs.

```
# from the project root
npx vercel            # preview link
npx vercel --prod     # production link

# Framework preset: Other
# Build command:     (none)
# Output directory:  ./
```

shell

Copy

A root `vercel.json` rewrites `/` to this page, so the bare deployment URL opens the documentation. Everything else — token CSS, the component bundle, both kits — is served alongside it from the same origin.

## Jump in

Foundations

Components

Patterns

App kit

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/kits -->

Resources

# Reference kits

Two full builds that show the system in use. Open them to see composition, spacing rhythm and voice in a real context.

### Vello app

Mobile reference build — explore, results, provider, bookings and profile screens at 430px.

Open

### Vello site

Marketing reference build — hero, how it works, trust and content sections.

Open

### Patterns update

The working page where recent pattern decisions were drafted.

Open

## Contributing

Anything added to the system needs four things before it ships.

| Artifact | Why |
| --- | --- |
| `Component.jsx` | The implementation, using tokens only — no hard-coded hex or px outside the scale. |
| `Component.d.ts` | Typed props with JSDoc; this is what generates the props table here. |
| `Component.prompt.md` | A one-paragraph description and a canonical usage snippet. |
| `component.card.html` | A visual card so the component appears in the system browser. |

Add the component to `docs/docs-components-*.jsx` with its stories, props, do/don't and accessibility notes, then register it in `docs/docs-boot.jsx`.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/color -->

Foundations

# Color

Warm cream paper, deep forest brand, olive primary action, persimmon accent, amber for ratings. Reference the semantic aliases in product code — the raw ramps exist so the aliases can move.

## Semantic aliases

These are the tokens components use. Always reach for these first.

### Surfaces

--color-bg

#F6F2E7

--color-bg-subtle

#EFEADB

--surface-card

#FFFFFF

--surface-sunken

#EFEEE1

--surface-brand

#557E26

--surface-brand-deep

#16462F

--surface-brand-tint

#EBF1DB

--surface-accent-tint

#FCE3D9

### Actions

--brand-primary

#557E26

--brand-primary-hover

#466621

--brand-primary-press

#38511E

--brand-primary-tint

#EBF1DB

--accent

#F0623B

--accent-hover

#E2552C

--accent-press

#C5421F

--accent-tint

#FCE3D9

### Status

--success

#557E26

--success-tint

#EBF1DB

--info

#2D6FB5

--info-tint

#E1ECF7

--warning

#E09A1F

--warning-tint

#FCEFCF

--danger

#D64545

--danger-tint

#FBE3E3

--rating

#F4B740

## Text & borders

| Token | Value | Use |
| --- | --- | --- |
| `--text-strong` | #1B1C18 | Headings, prices, provider names |
| `--text-body` | #3D3F37 | Default body copy |
| `--text-muted` | #6E7064 | Secondary lines, metadata |
| `--text-subtle` | #8D8F80 | Placeholders, eyebrow labels, disabled |
| `--text-brand` | #466621 | Brand-colored text on cream (passes 4.5:1) |
| `--text-on-deep` | #F6F2E7 | Text on forest surfaces |
| `--border-subtle` | #EFEEE1 | Hairlines inside cards |
| `--border-default` | #E5E4D6 | Card and input borders |
| `--border-strong` | #D6D6C6 | Hover / emphasis borders |
| `--border-focus` | #557E26 | Focus outlines |

## Raw ramps

Do not reference these directly in product code unless no alias fits.

### Neutrals (warm)

--ink-900

#1B1C18

--ink-700

#3D3F37

--ink-500

#6E7064

--ink-400

#8D8F80

--ink-200

#D6D6C6

--ink-150

#E5E4D6

--ink-100

#EFEEE1

--paper

#F6F2E7

--paper-2

#EFEADB

--white

#FFFFFF

### Forest

--forest-900

#0E3A28

--forest-800

#16462F

--forest-700

#1D5337

--forest-600

#266B49

--forest-300

#8FB6A2

--forest-100

#DCE9E1

### Olive / moss

--green-900

#2B3D15

--green-800

#38511E

--green-700

#466621

--green-600

#557E26

--green-500

#6E9A3A

--green-400

#8FB663

--green-300

#B6CF92

--green-200

#D7E3BD

--green-100

#EBF1DB

--green-50

#F5F8EC

### Persimmon, amber, sky, red

--coral-700

#C5421F

--coral-600

#E2552C

--coral-500

#F0623B

--coral-300

#F7A488

--coral-100

#FCE3D9

--amber-700

#C77F12

--amber-600

#E09A1F

--amber-500

#F4B740

--amber-100

#FCEFCF

--sky-700

#235A93

--sky-600

#2D6FB5

--sky-100

#E1ECF7

--red-700

#B23636

--red-600

#D64545

--red-100

#FBE3E3

## Guidelines

Do

- Use --brand-primary (olive) for the one primary action on a surface.
- Use --text-brand for brand-colored text — --brand-primary on cream is borderline at body sizes.
- Pair every status color with an icon or shape so meaning survives colorblindness.
- Keep the cream paper background; white is for card surfaces sitting on it.

Don't

- Do not use persimmon and olive as two competing CTAs in one group.
- Do not tint body text with alpha or color-mix — contrast drops below 4.5:1.
- Do not introduce new hues; extend a ramp instead.
- Do not put --text-body on --surface-brand-deep; use --text-on-deep.

## Contrast reference

Accessibility

- Body text and UI labels meet 4.5:1 against their surface; headline-scale type (24px+ semibold) may sit at 3:1.
- --brand-primary on white is 4.6:1 — safe for button fills with white text and for 16px+ text.
- --accent (persimmon) on white is 3.3:1 — use it for fills with white text, never for small text on cream.
- --text-subtle is a placeholder color only; it does not meet 4.5:1 for content.
- Focus is a 3px ring (--focus-ring) with a visible offset, never a color change alone.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/typography -->

Foundations

# Typography

Bricolage Grotesque for display and headings, Hanken Grotesk for UI and body, JetBrains Mono for data — prices, distances, counts.

Bricolage Grotesque

Hanken Grotesk

JetBrains Mono

## Type roles

Utility classes ship with the system; apply them directly or copy the token combination.

.v-display · 60px / 700 / -0.02em

Help from the block

.v-h1 · 48px / 700

Trusted neighbors, nearby

.v-h2 · 30px / 600

Popular this week

.v-h3 · 24px / 600

Maya Rivera

.v-body · 16px / 1.6

Every provider on Vello is background-checked and vouched for by someone on your street.

.v-body-sm · 14px / 1.45

Dog walker · 3 yrs · 0.4 mi away

.v-eyebrow · 12px / 700 / 0.12em

Verified this week

.v-mono · tabular numerals

$28/hr · 4.9 ★ · 213 reviews

## Scale tokens

| Token | Value | Use |
| --- | --- | --- |
| `--text-2xs` | 11px | Micro labels, badge counts |
| `--text-xs` | 12px | Eyebrows, chips, captions |
| `--text-sm` | 14px | Secondary body, table cells, metadata |
| `--text-base` | 16px | Default body |
| `--text-md` | 18px | Lede paragraphs |
| `--text-lg` | 20px | Card titles |
| `--text-xl` | 24px | Section headings (h3) |
| `--text-2xl` | 30px | Page headings (h2) |
| `--text-3xl` | 38px | Feature headings |
| `--text-4xl` | 48px | Page titles (h1) |
| `--text-5xl` | 60px | Display |
| `--text-6xl` | 76px | Hero display, marketing only |

## Weights, line height, tracking

| Token | Value | Use |
| --- | --- | --- |
| `--fw-regular` | 400 | Body copy |
| `--fw-medium` | 500 | UI labels, nav |
| `--fw-semibold` | 600 | Headings, buttons |
| `--fw-bold` | 700 | Display, eyebrows |
| `--lh-tight` | 1.05 | Display only |
| `--lh-snug` | 1.18 | Headings |
| `--lh-normal` | 1.45 | UI text |
| `--lh-relaxed` | 1.6 | Long-form body |
| `--ls-tight` | -0.02em | Display |
| `--ls-snug` | -0.01em | Headings |
| `--ls-wider` | 0.12em | Uppercase eyebrows |

## Guidelines

Do

- Set headings in Bricolage Grotesque and everything else in Hanken Grotesk.
- Use mono with tabular numerals for prices, distances and ratings so columns align.
- Write in sentence case — headings, buttons, labels, empty states.
- Cap measure at roughly 66 characters for body copy.

Don't

- Do not use display type below 30px; it loses its character and legibility.
- Do not set body copy below 14px anywhere in product.
- Do not mix more than two weights in a single block of text.
- Do not use all caps outside the eyebrow role.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/spacing -->

Foundations

# Spacing & layout

A 4px rhythm. Every gap, pad and offset in Vello is a step on this scale — nothing in between.

## Scale

--space-

1

4

px

--space-

2

8

px

--space-

3

12

px

--space-

4

16

px

--space-

5

20

px

--space-

6

24

px

--space-

7

28

px

--space-

8

32

px

--space-

10

40

px

--space-

12

48

px

--space-

16

64

px

--space-

20

80

px

--space-

24

96

px

--space-

32

128

px

## Where each step goes

| Step | Typical use |
| --- | --- |
| `--space-1 / 2` | Icon-to-label gaps, badge padding |
| `--space-3` | Chip padding, tight list gaps |
| `--space-4` | Default gap between related elements; card padding (sm) |
| `--space-5 / 6` | Card padding, gaps between cards |
| `--space-8` | Block separation inside a screen |
| `--space-12 / 16` | Section spacing on mobile |
| `--space-20 / 24` | Section spacing on marketing pages |
| `--space-32` | Hero breathing room |

## Containers

| Token | Value | Use |
| --- | --- | --- |
| `--container-app` | 430px | Mobile app frame width — the Vello app kit renders at this width |
| `--container-narrow` | 720px | Long-form reading column |
| `--container-wide` | 1200px | Marketing page max width |

## Guidelines

Do

- Lay groups out with flex/grid and gap, using scale steps.
- Keep 16px minimum padding inside any card holding text.
- Keep 16px minimum margin from the screen edge on mobile.
- Double the step when jumping a hierarchy level (4 → 8 → 16).

Don't

- Do not hand-tune values like 13px or 22px.
- Do not space siblings with individual margins where a gap would do.
- Do not let tap targets fall below 44px even when the visual is smaller.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/elevation -->

Foundations

# Radii & elevation

Generous corners and soft, warm-tinted shadows. Vello elevation is low and diffuse — surfaces lift, they do not float.

## Corner radii

xs

6px

sm

10px

md

14px

lg

20px

xl

28px

2xl

36px

pill

pill

Inputs and small controls use `--radius-md`, cards `--radius-lg`, sheets and feature cards `--radius-xl`. Buttons, chips and avatars are always `--radius-pill`.

## Shadows

--shadow-xs

Hairline lift — inputs at rest

--shadow-sm

Resting cards on cream

--shadow-md

Raised cards, popovers

--shadow-lg

Floating cards, hover lift

--shadow-xl

Sheets and modals

--shadow-brand

Featured provider glow — olive-tinted

## Guidelines

Do

- Step one level on hover (sm → md) and return on press.
- Use --shadow-brand only for the single featured slot in a list.
- Pair elevation with a border on cream so edges stay readable.

Don't

- Do not stack elevated cards inside elevated cards.
- Do not use pure-black shadows; the system shadows are warm-tinted.
- Do not use elevation to signal state that needs a label.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/motion -->

Foundations

# Motion

Motion in Vello is short and calm. It confirms an action or shows where something came from — it never performs.

## Durations

| Token | Value | Use |
| --- | --- | --- |
| `--dur-fast` | 120ms | Hover, focus, chip toggles |
| `--dur-base` | 200ms | Most transitions — cards, tabs, sheets |
| `--dur-slow` | 320ms | Full-screen transitions, onboarding |

## Easing

#### Easing curves

Press play to compare. Each dot travels the same distance in 320ms.

Play

--ease-standard

Default — most transitions

--ease-out

Entrances, sheets, reveals

--ease-spring

Playful confirmations only

## Guidelines

Do

- Keep interface feedback under 200ms.
- Animate transform and opacity only.
- Honour prefers-reduced-motion — fall back to an instant state change.

Don't

- Do not animate color or shadow on scroll.
- Do not use spring easing on destructive or financial actions.
- Do not run more than one attention-seeking animation on a screen.

## Accessibility

Accessibility

- Every animation must be suppressible: wrap decorative motion in a prefers-reduced-motion media query.
- Never convey state with motion alone — a pulsing dot needs a text label too.
- Avoid parallax and large-area movement; they trigger vestibular discomfort.
