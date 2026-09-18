# ProviderCard · spec without an inspect panel (practice 5.1)

**Source of the observed values:** `vello/09-prototype-screenshots/01-home-1.png` and `01-home-3.png` (the polished home screen), read next to `vendor/colors.css`, `typography.css`, `spacing.css` (the token files, as shipped in `vendor/`). Not read: `vello/03-ds-providercard.md` (the component's own page and source), so the diff against the real file stays honest.

**How this was made.** Pixel samples of the screenshot and the token tables, drafted with Claude and reviewed row by row by me. The manual labels 5.1 "no AI"; this one was not.

**Scale assumption.** The screenshot is 752 px wide; the app kit renders at `--container-app` 430 px, so 1 CSS px ≈ 1.75 screenshot px. Sizes marked `~` are estimates from that ratio; colors are exact pixel samples.

| Property | Observed value | Token, or "unresolved" |
|---|---|---|
| Page background behind the card | `#F6F2E7` | `--color-bg` |
| Card surface | `#FFFFFF` | `--surface-card` |
| Card border | `#E6E6D4` (1 px) | `--border-default` (#E5E4D6, sampled with antialias) |
| Card corner radius | ~20 px | `--radius-lg` (cards) |
| Card shadow | none visible at rest on cream | none (flat card on cream, per Card docs); `--shadow-sm` only if raised — **unresolved: flat or `--shadow-sm`?** |
| Card padding | ~16 px all sides | `--space-4` |
| Card outer gutter to screen edge | ~20–24 px | **unresolved: `--space-5` or `--space-6`** (Spacing docs say 16 px minimum; the screenshot reads wider) |
| Gap avatar → text column | ~16 px | `--space-4` |
| Avatar diameter | ~72–74 px | **unresolved: Avatar `xl`?** The docs name sizes xs…xl but print no px. 72 is on the 4 px rhythm but has no `--space-*` step |
| Avatar shape | circle, photo covers | `--radius-pill` |
| Trust mark on avatar | olive shield with cream check, paper rim, bottom-right corner, ~15 × 18 px | `VerifiedMark status="verified"` (olive `--brand-primary` #557E26 sampled), rim `--color-bg`; size **unresolved** (default 16?) |
| Name | "Maya Rivera", Bricolage Grotesque, ~20 px, semibold, `#1B1C18` | `--font-display` · `--text-lg` (card titles) · `--fw-semibold` · `--text-strong` |
| Availability badge | pill, bg `#FCE3D9`, text `#C5421F`, dot `#F0623B`, ~25 px tall, sits right of the name | bg `--accent-tint`, text `--accent-press`, dot `--accent`. **Question:** Badge docs say `accent` is for time-limited offers only and availability reads as a live state (`success` + `dot`). Deliberate or a planted mismatch? |
| Chevron affordance | circle `#EFEEE1`, ~40 px, glyph `#8D8F80`, top-right | `--surface-sunken`, glyph `--text-subtle`; Card `tappable` chevron. **40 px < 44 px tap target** if it is ever a control; treat as decorative (the whole card navigates) |
| Summary line | "Dog walker & pet sitter, just up on 4th Ave.", Hanken Grotesk, ~16 px, regular, `#3D3F37`, two lines max | `--font-sans` · `--text-base` · `--fw-regular` · `--text-body` · `--lh-normal` (first read as 14 px; corrected after the side-by-side, 6.7 px per character) |
| "from" | JetBrains Mono, ~16 px, regular, `#1B1C18` | `--font-mono` · **unresolved `--text-base` or `--text-sm`** · `--text-strong` |
| Price "$24" | JetBrains Mono, ~16–18 px, semibold, `#1B1C18`, tabular | `--font-mono` · **unresolved `--text-base` or `--text-md`** · `--fw-semibold` · `--text-strong` |
| Unit "/ walk" | Hanken Grotesk, ~16 px, `#6E7064` | `--font-sans` · `--text-base` · `--text-muted` (corrected from 14 after the side-by-side) |
| Walk chip background | `#F4F7EB` | **unresolved:** closest is `--green-50` #F5F8EC, a raw ramp with no semantic alias (Color docs: "Do not reference these directly … unless no alias fits"). `--brand-primary-tint` #EBF1DB is the alias but visibly darker |
| Walk chip border | `#D7E3BD` (1 px) | **unresolved:** `--green-200`, raw ramp, no alias |
| Walk chip text | "6 min walk", JetBrains Mono, ~14 px, medium, `#456420` | `--font-mono` · `--text-sm` · `--fw-medium` · `--text-brand` (#466621) |
| Walk chip icon | footprints, ~16 px, same color, 2 px stroke | Lucide `footprints`, `currentColor` |
| Walk chip shape / height | pill, ~30 px tall, ~12 px side padding | `--radius-pill` · height **unresolved** (Badge `md`?) · `--space-3` |
| Rating stars | five amber `#F4B740` filled stars, ~16 px (five span 83 CSS px) | `--rating`; Rating component, `size` **unresolved** (sm?) |
| Rating number | "4.9", JetBrains Mono, ~16 px, `#1B1C18`, no count on the home card | `--font-mono` · `--text-base` · `--text-strong`; review count omitted (Rating docs say show it when you have one: **question**) |
| Vertical rhythm inside the text column | name → summary ~4 px; summary → price ~12 px; price → chips ~12 px | `--space-1`, `--space-3`, `--space-3` |
| Gap between cards in the list | ~16 px | `--space-4` |
| Whole card is tappable | chevron + navigates to Neighbor detail | Card `as="a"`, `interactive`, `tappable`; hover lift one shadow step + border darkens (`--border-strong`); focus `--focus-ring` |
| Motion | none observed at rest | hover/focus `--dur-fast` `--ease-standard`; reduced-motion: instant |

## Handoff questions for the designer

1. Availability badge: accent tint for a live state contradicts the Badge guideline ("accent badges for time-limited offers only"). Which wins, the screen or the system?
2. Walk chip: the tint on screen (`#F4F7EB`) is `--green-50`, which has no semantic alias. Should it be `--brand-primary-tint`, or does the system need a `--surface-brand-tint-soft` alias?
3. Avatar `xl` diameter, VerifiedMark size on it, Badge `md` height, Rating star `size` in px: none are printed in the docs. What are they?
4. Price scale: is "$24" `--text-base` or `--text-md`? Is "from" the same size as the amount?
5. Card gutter: 20 or 24 px from the screen edge?
6. The home card omits the review count next to 4.9; Rating docs say show it when available. Intentional on the compact card?
7. The chevron circle is 40 px. Decorative only, or a second tap target (then it needs 44)?
8. Added after opening the real file: which card is canonical, the DS ProviderCard (miles, Book button) or the prototype's (walking minutes, chevron)? The brief's bet is minutes.

## Rows I would defend without the designer

Card surface, border, radius, padding; name role and token; summary role; unit and muted color; rating color; the tappable-card semantics. Everything else above carries an "unresolved" or a question.
