# ProviderCard · design-fidelity audit (one page)

**Component:** `ProviderCard.html` (self-contained and offline: React 18, the design system's token CSS, the three fonts and the avatars inlined, plus the compiled component). Built from the docs, the token files and a hand spec, without opening the real `ProviderCard.jsx` until the diff at the end. Guardrail used: `CLAUDE.md` in this folder. Full detail: `DELIVERABLE.md`.

## Where the AI honored the system

| Element | Tokens used | Check |
|---|---|---|
| Card surface, border, radius, padding | `--surface-card` · `--border-default` · `--radius-lg` · `--space-4` | matches reference |
| Name | `--font-display` · `--text-lg` · `--fw-semibold` · `--text-strong` | matches |
| Summary, unit | `--font-sans` · `--text-base` · `--text-body` / `--text-muted` | matches (after one correction, below) |
| Price, walk time, score | `--font-mono`, tabular numerals, `--text-brand` on the chip | matches; mono for data per Typography docs |
| Trust mark | shield shape, `--brand-primary`, rim `--color-bg`, `<title>` | shape + color, per Trust pattern |
| Card semantics | `<a aria-labelledby>` · `--focus-ring` · reduced-motion guard | Tappable-cards pattern |

## Where it drifted, token by token (v1 → v2)

| v1 value | Rule broken | v2 |
|---|---|---|
| `--green-50`, `--green-200` on the walk chip | "Do not reference raw ramps unless no alias fits" | `--surface-brand-tint`, `--border-default`; the exact tint is question 3 |
| `8px` dot, `40px` chevron | 4 px scale exists as `--space-*` | `--space-2`, `--space-10` |
| `72px` avatar, `22px` mark, `24px` badge, `30px` chip | no token printed for these sizes | declared once as `--pc-*` with an `unresolved:` note, not repeated |
| summary `--text-sm`, stars `18px` | reference measures 16 px for both | `--text-base`, 16 px stars |
| long name widened the container | guardrail rule 7 | `min-width: 0`, ellipsis, `minmax(0,1fr)` |

Lint: **v1 10 drift + 2 raw ramps → v2 0 drift, 4 declared unresolved** (`v1/lint.txt`, `v2-lint.txt`; the JSX files lint clean too, `v1/lint-jsx.txt`, `v2-lint-jsx.txt`). Two caveats. v2 was generated after the v1 audit, so it benefits from it; a clean-room regeneration would be the stronger test. The lint reads CSS and inline px only, so a bare numeric prop such as the star `size={16}` is invisible to it and is listed under unresolved by hand.


## Where it failed accessibility, and the fix

| Finding | Ratio / rule | Fix |
|---|---|---|
| "Available" text on the accent tint, copied from the screen | **4.10:1**, fails AA at 12 px semibold (WCAG 1.4.3); dot 2.63:1, fails 3:1 (1.4.11) | `--text-brand` on `--success-tint` = 5.70:1; dot `--success` 4.12:1 |
| Chevron glyph on the sunken circle | 2.82:1 (1.4.11) | decorative (`aria-hidden`); darkened to `--text-muted`, 4.32:1 |
| Stars alone | 1.80:1 as graphic (1.4.11, 1.1.1) | `aria-hidden`; the number carries the contrast; visually-hidden "Rated 4.9 out of 5" |
| Zero-review provider | Rating docs: no score with no reviews (1.3.1) | "New" badge |

## Unresolved, for the designer

1. Which card is canonical: the DS ProviderCard (miles, Book button) or the prototype's (walking minutes, chevron)? The brief's bet is minutes.
2. Availability: persimmon (prototype) or olive (DS component and Badge docs)? The persimmon pair fails AA.
3. Walk-chip tint: `--green-50` has no alias. New alias, or accept `--surface-brand-tint`?
4. Avatar `lg`/`xl` diameter, mark size, Badge heights, Rating `sm` star size: none printed.
5. Price amount: `--text-base` or `--text-md`?
6. Name weight: bold (DS source) or semibold (screen)?
7. Card gutter: 20 or 24 px?
8. The DS source hardcodes `14px`, `1.5px`, `6px`: is the contributing rule enforced?

## The real file, opened last

The prototype's home card is not the DS `ProviderCard`: different props, miles vs minutes, a 36 px `sm` Book button vs a chevron, `div` vs link. The system's own source breaks its own "tokens only" rule. Full diff in `DELIVERABLE.md` §4.
