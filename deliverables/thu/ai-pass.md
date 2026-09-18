# Thursday · AI pass · Neighbor detail (Grace Lin)

Run after `human-pass.md` was finished. Inputs: the screenshot and the design-system docs and tokens (`vello/01`, `02`, `04`, `vendor/*.css`). Not given: the interview transcripts or the human pass. Prompt, verbatim from the manual:

> Critique this Vello screen against the attached design system. Structure it as: 1) visual hierarchy, 2) consistency with design-system tokens, 3) accessibility (contrast ratios, touch targets, focus, semantics), 4) missing UI states. For each issue: severity, the evidence, and the principle or standard it violates. Do not soften findings.

## 1. Visual hierarchy

| # | Severity | Finding | Evidence | Principle |
|---|---|---|---|---|
| H1 | Medium | The name appears twice at the same weight class: in the title bar ("Grace Lin") and as the hero heading. The eye lands on the hero name, then has to discard the duplicate | Title bar + heading | One focal point; redundancy costs scan time |
| H2 | Medium | The three stat tiles do not share a scale: "5.0" and "$40" are display-sized, "~1 hr" is a step smaller; the captions "39 reviews", "from / hr", "response" are three different phrasings | Stat row | Scale + consistency: siblings with one role get one size |
| H3 | Low | "About" and "What Grace offers" are the same heading size, but the offers list is the thing a requester books from. The primary content is not the most prominent | Section headings | Prominence should follow importance |
| H4 | Medium | The fixed "Book Grace" bar cuts the first offer card mid-row with a hard white edge and no fade, so the offers list can read as ending there | Bottom of the scroll region | Scroll affordance pattern: "both signals, always" (fade + peek) |
| H5 | Low | The "Home" tab is highlighted although the user is on a provider detail screen | Bottom nav | Navigation state should reflect location `[generic finding; see comparison]` |

## 2. Consistency with design-system tokens

| # | Severity | Finding | Evidence | Principle |
|---|---|---|---|---|
| T1 | High | "Available" uses the accent (persimmon) tint and text for a live status | Chip: `--accent-tint` bg, `--accent-press` text, `--accent` dot | Badge: "Do not use accent badges for anything but a time-limited offer"; live state = status color + `dot`. Accent usage: "one persimmon moment per screen, at most" is spent on a status |
| T2 | Low | Stat values, walk time and price are in JetBrains Mono with tabular figures | Tiles, chip | On-system: "mono for prices, distances and ratings" |
| T3 | Low | "Book Grace" is a filled olive primary, full width, paired with an outline icon secondary | CTA bar | On-system: one primary per surface, `lg fullWidth` at the bottom of a mobile screen |
| T4 | Low | The trust row "On Vello since 2025 · Background-checked by Vello" uses brand text on the brand tint with a shield icon | Trust row | On-system: shape + color, labeled on first mention |
| T5 | Medium | The stat tiles look like three cards fused into one container with hairline dividers; Card docs define `flat` bordered cards, not a segmented tile group. Either a new pattern or a one-off | Stat row | "Do not introduce new … extend instead"; contribute the component if it is meant to exist |
| T6 | Low | Chip heights differ: "Available" is shorter than "14 min walk" | Chips row | Badge sizes are `sm`/`md`; two sizes side by side reads as accidental |

## 3. Accessibility

| # | Severity | Finding | Evidence | Standard |
|---|---|---|---|---|
| A1 | High | "Available" text 4.10:1 (`#C5421F` on `#FCE3D9`) at 12 px semibold; the dot 2.63:1 | Computed from token hex | WCAG 1.4.3 (4.5:1 for text under 24 px), 1.4.11 (3:1 for graphics) |
| A2 | Low | Every other text/surface pair passes: body on cream 9.5:1, tile captions 5.0:1, walk chip 6.1:1, white on olive 4.7:1 | Computed | WCAG 1.4.3 |
| A3 | Medium | The heart (save) and the back arrow are ~20 px glyphs; their hit areas are not visible. If they are glyph-sized they fail | Header | 44 × 44 pt (manual), DS IconButton md = 44 |
| A4 | Medium | The heart and the round message control are icon-only. They need accessible names ("Save Grace", "Message Grace"); a screenshot cannot show whether they have them | Header, CTA bar | IconButton docs: "requires a label"; WCAG 4.1.2 |
| A5 | Low | The "5.0" tile has no stars and no "out of 5"; a screen reader hears "5.0, 39 reviews" | Stat row | Rating docs: the number is the accessible content; add context |
| A6 | Low | The status dot is decorative next to its label; the shield has a text label further down the screen. No color-alone meaning found | Chips, avatar | Trust pattern |
| A7 | Unverifiable | Focus order, `button` vs `div`, and the focus ring cannot be judged from an image | — | Manual 4.2 |

## 4. Missing UI states

| # | Severity | Missing state | Why it matters |
|---|---|---|---|
| S1 | High | Provider unavailable / fully booked | The chip has one state; the CTA still says "Book Grace" |
| S2 | Medium | New provider: 0 reviews | Rating docs: never show a rating with no reviews; the tile would read "0.0" or lie |
| S3 | Medium | Loading (photo, tiles, offers) and load error | The screen is data-heavy; no skeleton or retry exists |
| S4 | High | Booking failure after "Book Grace" (slot taken, payment declined, offline) | The only action on the screen has no error path |
| S5 | Low | Long name, no photo (initials fallback), many offers | Layout under real content |
| S6 | Low | "Saved" state of the heart | Accent usage names "a save / favorite state" as a legitimate persimmon moment; the screen shows only the unsaved outline |

Confidence note: H1–H5 and T1–T6 are judgments from the image and the docs; A3, A4, A7 depend on the implementation and are flagged as unverifiable rather than asserted.

## Addendum · below the fold

The pass above covers the first viewport. The offers list and reviews were checked against the source; findings and line numbers are in `DELIVERABLE.md` §5.
