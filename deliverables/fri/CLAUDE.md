# Vello component guardrail (practice 5.4)

Read this before generating or editing any Vello UI. It turns the design-system rules and the product bet ("trust scales locally") into checks you can run. Source of truth: `vendor/*.css` (the tokens) and the design-system docs in `vello/01`, `02`, `04`. Never open `vello/03` (the real ProviderCard) while generating.

## Tokens: what to use

- Colors: only semantic aliases. Surfaces `--color-bg`, `--surface-card`, `--surface-sunken`, `--surface-brand-tint`, `--surface-accent-tint`. Text `--text-strong`, `--text-body`, `--text-muted`, `--text-brand`, `--text-on-brand`, `--text-on-deep`. Borders `--border-subtle`, `--border-default`, `--border-strong`, `--border-focus`. Actions `--brand-primary(-hover/-press/-tint)`, `--accent(-hover/-press/-tint)`. Status `--success(-tint)`, `--info(-tint)`, `--warning(-tint)`, `--danger(-tint)`, `--rating`.
- Type: `--font-display` for names and headings, `--font-sans` for UI and body, `--font-mono` for prices, distances, counts. Sizes `--text-2xs … --text-6xl`. Weights `--fw-*`. Line heights `--lh-*`. Tracking `--ls-*`.
- Space: `--space-1 … --space-32` (4 px rhythm). Radii `--radius-xs … --radius-pill`; cards `lg`, chips/buttons/avatars `pill`. Shadows `--shadow-xs … --shadow-xl`, `--shadow-brand` for the single featured slot. Motion `--dur-fast/base/slow`, `--ease-standard/out/spring`. Focus `--focus-ring`.
- **Namespace trap:** `--text-strong` is a color, `--text-sm` is a size. Write which one you mean; never abbreviate to "the text token".

## Banned

- Hex, `rgb()`, `hsl()` literals. Raw ramps (`--ink-*`, `--green-*`, `--coral-*`, `--amber-*`, `--sky-*`, `--red-*`, `--paper*`, `--forest-*`, `--white`) unless no alias fits, and then say so in a comment.
- `px` values for size, space, radius or type outside the scale. A dimension with no token (avatar diameter, mark size, chip height) is declared **once** as a component token at the top of the stylesheet (`--pc-avatar: 72px; /* unresolved: Avatar xl, ask the designer */`) and never repeated inline.
- Font names in code, numeric weights, `ms` durations.
- Two filled primaries in one group; persimmon next to olive; persimmon as the default CTA. Accent badges for anything but a time-limited offer.
- Hover, pressed or loading states that the reference screen does not show, unless the docs define them for that component.
- A `div` with `onClick`. Color as the only carrier of meaning. A trust mark that is a plain dot or check.

## Accessibility baseline (checkable)

1. Text ≥ 4.5:1 on its surface; large text (24 px+ semibold) and UI graphics ≥ 3:1. Compute it; don't eyeball it.
2. Tap targets ≥ 44 × 44 CSS px for anything interactive; decorative affordances (a chevron inside a tappable card) are `aria-hidden`.
3. A tappable card is `<a>` or `<button>`, with an accessible name from its heading (`aria-labelledby`).
4. Photos beside a visible name are `alt=""`; trust marks carry a `<title>` with the status label; stars are `aria-hidden` and the numeric score is the accessible content.
5. `:focus-visible` shows `--focus-ring`; never remove focus styling.
6. Every transition is wrapped in `prefers-reduced-motion` and only animates transform, opacity, shadow or border-color.
7. Long content (a name of 35+ characters, a two-line summary, a `$120` price) must not widen the container: `min-width: 0` on flex/grid children, ellipsis or clamp where the reference clamps.

## The bet, in code

Trust is visible: the trust mark uses shape + color (shield = background-checked, dashed circle = pending, hollow circle = unverified, star = top-rated). Distance and price are first-class, set in mono with tabular numerals. Unverified is shown honestly, never hidden.

## Before you say "done"

1. `node tools/token-lint.mjs ProviderCard.css` and `ProviderCard.jsx` exit 0, or every remaining row is a declared component token with an `unresolved:` comment.
2. Build (`node tools/build.mjs …`), render with headless Chrome, and put the render next to `reference-home-card.png`. Compare row by row: avatar, name line, summary, price line, chips. List every difference as "matches / drift / unresolved".
3. Run the contrast script on every text/surface pair you introduced.
4. Render the edge cases (long name, no photo, no rating, unverified, featured) and confirm nothing overflows.
5. Write the unresolved list. "Unresolvable is an answer."
