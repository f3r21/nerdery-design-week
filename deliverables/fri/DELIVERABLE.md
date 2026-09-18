# Friday · ProviderCard from the docs and tokens, then the audit

An engineer builds Vello's ProviderCard from the design-system docs and token files, without opening the real component, and proves where the result honours the system, where it drifts, and where it fails accessibility.

**Files.** `ProviderCard.html` (self-contained and offline: React 18 UMD + the token CSS from the live site + the three fonts and six avatars inlined + the compiled component; opens in any browser with no network), `ProviderCard.jsx` + `ProviderCard.css` (v2, guardrail active), `v1/` (the first generation, frozen: code, render, lint), `v2-render.png`, `reference-home-card.png` (the prototype's card, cropped), `spec-by-hand.md` (5.1), `CLAUDE.md` (the guardrail, 5.4), `tools/token-lint.mjs` and `tools/build.mjs`.


## 1. Before and after the guardrail

| | v1 (docs + tokens + spec) | v2 (same, with `CLAUDE.md` active) |
|---|---|---|
| Token lint (`tools/token-lint.mjs ProviderCard.css`) | 84 token · **10 drift · 2 raw-ramp** | 90 token · **0 drift · 0 raw-ramp** · 4 unresolved, each declared once with its question |
| Raw px outside a token | avatar 72, mark 22, badge 24, dot 8, chevron 40, chip 30 | dot → `--space-2`, chevron → `--space-10`; avatar, mark, badge, chip → `--pc-*` component tokens marked `unresolved` |
| Raw ramps | `--green-50`, `--green-200` on the walk chip | `--surface-brand-tint`, `--border-default` (drift-by-decision, see §2) |
| Layout under a 37-character name | **the whole page widened** (grid track grew to min-content) | ellipsis; `min-width: 0` on the card, `minmax(0, 1fr)` tracks |
| AA text contrast failures | 1 (Available badge, 4.10:1) | 0 |
| Stars | 18 px, meta row wrapped on "12 min walk" cards | 16 px, measured from the reference (83 CSS px for five stars) |

The guardrail's "compare the render before declaring done" step is what caught the last three rows; the lint alone catches only the first three.

## 2. Side by side against the reference screen (`reference-home-card.png`)

| Row | Reference (prototype home) | v2 | Verdict |
|---|---|---|---|
| Card surface, border, radius, padding | white, 1 px `#E5E4D6`, ~20 px, ~16 px | `--surface-card`, `--border-default`, `--radius-lg`, `--space-4` | matches |
| Avatar + trust mark | 72 px photo, olive shield bottom-right with paper rim | `--pc-avatar` 72 (unresolved), shield `--brand-primary` on `--text-on-brand`, rim `--color-bg` | matches visually; size unresolved |
| Name | Bricolage ~20 px semibold `#1B1C18` | `--font-display` `--text-lg` `--fw-semibold` `--text-strong` | matches |
| Available badge | persimmon tint `#FCE3D9`, text `#C5421F`, dot `#F0623B` | `--success-tint`, `--text-brand`, dot `--success` | **drift by decision.** The reference pair is 4.10:1 (fails AA at 12 px semibold) and Badge docs reserve `accent` for time-limited offers; a live state is `success` + `dot`. The DS's own ProviderCard uses `variant="brand"`. The prototype's persimmon reads as a planted issue |
| Chevron | 40 px sunken circle, glyph `#8D8F80` | `--space-10`, `--surface-sunken`, glyph `--text-muted` | matches size; glyph darkened from 2.82:1 to 4.32:1 (decorative anyway, `aria-hidden`) |
| Summary | Hanken ~16 px `#3D3F37`, two lines | `--text-base` `--text-body`, clamp 2 | matches (v1 had `--text-sm`; corrected by character-width measurement) |
| Price line | mono "from" + "$24" `#1B1C18`, "/ walk" sans `#6E7064` ~16 px | `--font-mono` `--text-base` / `--text-md` semibold; unit `--text-base` `--text-muted` | matches; amount size unresolved (base or md) |
| Walk chip | tint `#F4F7EB`, border `#D7E3BD`, mono 14 `#466621`, footprints icon, 30 px tall | `--surface-brand-tint` (#EBF1DB), `--border-default`, `--text-brand`, Lucide footprints, `--pc-chip-h` 30 | **drift by decision:** the reference tint is `--green-50`, a raw ramp with no alias. Visibly one step darker in v2 |
| Rating | five amber stars ~16 px + "4.9" mono 16, no count | `--rating`, 16 px stars `aria-hidden`, `--text-base` `--text-strong`, count when given | matches |
| Vertical rhythm | ~8 / 16 / 12 px | `--space-1` / `--space-3` / `--space-3` | ±4 px, unresolved |
| Card is tappable | chevron affordance, navigates to Neighbor detail | `<a aria-labelledby={name}>`, hover shadow + border, `--focus-ring` | matches the Tappable-cards pattern |

## 3. Accessibility findings (5.3)

| # | Issue | Evidence | Reference | Fix |
|---|---|---|---|---|
| 1 | Availability text fails AA | `--accent-press` #C5421F on `--accent-tint` #FCE3D9 = **4.10:1** at 12 px semibold | WCAG 1.4.3 (4.5:1) | `--text-brand` on `--success-tint` = 5.70:1; dot `--success` 4.12:1 as a graphic |
| 2 | Long name widened the container, pushing the chevron and rating off-screen | v1 render, "Alexandra Konstantinopoulou-Whitfield" | WCAG 1.4.10 reflow | `min-width: 0` on the card and name, `minmax(0, 1fr)` grid track, ellipsis |
| 3 | Chevron glyph 2.82:1 on the sunken circle | `--text-subtle` on `--surface-sunken` | WCAG 1.4.11 (3:1 for UI graphics) | decorative (`aria-hidden`) and darkened to `--text-muted`, 4.32:1 |
| 4 | Stars alone are 1.80:1 on white | `--rating` on `--surface-card` | Rating docs: "the number carries the 4.5:1 text contrast" | stars `aria-hidden`, visible score + visually-hidden "Rated 4.9 out of 5" |
| 5 | Card semantics | a card that navigates must be a link | Tappable-cards pattern; APG | root is `<a>` named by the heading; photo `alt=""` beside the name; trust mark carries a `<title>`; `:focus-visible` ring; motion only under `prefers-reduced-motion: no-preference` |
| 6 | New provider with no reviews | Rating docs: never show a rating for zero reviews | Rating guidelines | "New" badge instead of stars |

Highest-severity fix: #1, because it is on the reference screen itself and would ship.

## 4. The diff against the real `ProviderCard.jsx` (opened last)

| Dimension | Real component (`vello/03`) | Mine | What it means |
|---|---|---|---|
| **What it is** | service line, rating + count, **distance in miles** ("0.4 mi", map-pin), price "$28 / per hr" in a right-hand aside, **Book button**, optional metadata chips, Available as `Badge variant="brand"`; root is a `div` | the home screen's card: summary, **"6 min walk"** chip, "from $24 / walk", chevron, no button; root is a link | **The prototype's home card is not the DS ProviderCard.** Same name, different component. Miles vs walking minutes contradicts the brief's own example ("6 min walk", "minutes from your door"). Question 1 for the designer |
| Props | `name, service, rating (req), reviews, distance, price, priceUnit, verified, available, featured, interactive, badges, ctaLabel, onBook, onMessage` | `name, summary, price{amount,unit,from}, walkMinutes, rating, reviewCount, available, status, href, featured` | mine has no CTA and a `status` enum instead of `verified`; the DS has no `pending`/`unverified` on this card although VerifiedBadge defines four statuses |
| Tokens in the DS source | `gap: 14px`, `padding: 16px`, `border: 1.5px`, `margin-top: 6px / 10px`, `gap: 8px / 12px / 6px`, `svg 13px`, `letter-spacing: -0.01em`, `line-height: 1` | all `--space-*`, `--ls-snug`, `--lh-*`; four `--pc-*` unresolved | **The system's own component fails its own contributing rule** ("using tokens only, no hard-coded hex or px outside the scale"). 14 px and 6 px are not even on the 4 px rhythm |
| Name weight | `--fw-bold` | `--fw-semibold` | drift in mine, or in the reference: the screenshot reads semibold. Unresolved |
| Available badge | `brand` (olive) with dot | `success` (olive) with dot | same hue family; both disagree with the prototype's persimmon |
| Tap targets | `Button size="sm"` = **36 px** inside a hover-lifting `div` | one 44 px+ link, chevron decorative | the DS card breaks its own Button rule ("sm is only for dense desktop toolbars") on a mobile listing |
| Semantics | `div` with hover-lift and `cursor: pointer`, no link | `<a>` | the DS docs promise "one link (the provider) and one button"; the source ships neither link nor `as` |
| Avatar | `Avatar size="lg"` | 72 px component token | so the unresolved diameter is "whatever `lg` is"; still not printed anywhere |

### Audit against the Friday notebook

Two of this audit's claims were flagged "overstated" by the Friday notebook. Both are verbatim in `vello/02-ds-components.md`; the notebook read the shorter `Badge.prompt.md` and the Button usage line instead of the guidelines:

- Badge · Guidelines · Don't: **"Do not use accent badges for anything but a time-limited offer."**
- Button · Accessibility: **"md and lg meet the 44px minimum tap target; sm is 36px and is only for dense desktop toolbars."**

The notebook confirmed the third claim ("--accent (persimmon) on white is 3.3:1") verbatim. Kept all three; the AI auditor was wrong on two,.

## 5. Unresolved, for the designer

1. Which card is canonical for the home list: the DS `ProviderCard` (miles, Book button) or the prototype's card (walking minutes, chevron)? The brief's bet says minutes.
2. Availability: persimmon (prototype) or olive brand/success (DS component and Badge docs)? The persimmon pair fails AA.
3. Walk-chip tint: `--green-50` has no alias. Add `--surface-brand-tint-soft`, or accept `--surface-brand-tint`?
4. Avatar `lg`/`xl` diameter, VerifiedMark size on it, Badge `sm`/`md` heights, Rating `sm` star size. None printed.
5. Price amount: `--text-base` or `--text-md`? "from" same size as the amount?
6. Name weight: bold (DS source) or semibold (screen)?
7. Card gutter: 20 or 24 px?
8. The DS source hardcodes px; is the contributing rule aspirational or enforced? If enforced, `ProviderCard.jsx` needs a token pass.

## Assumptions and defaults

- `[ASSUMPTION]` the screenshot renders at `--container-app` 430 px (1.75 screenshot px per CSS px). If it is 390, every "~" size is 10% smaller.
- Fonts and avatars are inlined (`vendor/fonts-local.css`, `vendor/avatars/`); the page needs no network.
- Defaults I chose: React via `React.createElement` compiled by esbuild (no runtime Babel); status enum on the avatar instead of a boolean; "New" badge for zero reviews; chevron decorative rather than a second target.

## 6. Where I corrected Claude

| Claim | What was wrong | How verified |
|---|---|---|
| v1: summary at `--text-sm` (14 px) | The reference is 16 px | Character width: 35 characters over 234 CSS px = 6.7 px/char vs 6.0 at 14 px |
| v1: stars at 18 px | Reference is 16 px, and 18 made the meta row wrap on "12 min walk" cards | Five stars span 83 CSS px in the reference |
| v1 followed the screenshot's persimmon "Available" | It fails AA (4.10:1) and the Badge docs reserve accent for offers | Contrast computed from the token hex; DS source uses `variant="brand"` |
| The lint's first version passed `font-family: var(--font-display)` as drift and missed the `72px` declarations on v1 | Two regex bugs; the "before" count was wrong until fixed | Re-ran on the frozen `v1/` and diffed the reports |

