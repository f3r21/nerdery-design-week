# Thursday · Comparative audit: human pass vs AI pass · Neighbor detail (Grace Lin)

An engineer audits the assigned Vello screen for hierarchy, token drift and accessibility, first alone and then with Claude, and resolves every disagreement against the design system or the standard.

**Screen:** `neighbor-detail-grace-lin.png`, assigned by the mentor ("Tu pantalla asignada es el detalle de un neighbor", Spanish for "your assigned screen is a neighbor's detail"). Not the same screen as the prototype's Neighbor detail (Maya Rivera), so the audit is against the capture and the design system only.

**Order of work.** `human-pass.md` first (dictated, no AI critique; Claude typed, measured pixels and computed ratios on request). Then `ai-pass.md` with the manual's starter prompt, given only the screen and the system. Then this comparison.

## 1. What each pass caught

| Finding | Human | AI | Resolved against | Verdict |
|---|---|---|---|---|
| "Available" chip in persimmon: off-system and fails AA (4.10:1, dot 2.63:1 by token; 2.70 sampled) | ✔ (planted #1) | ✔ (T1, A1) | Badge and Accent-usage docs; WCAG 1.4.3, 1.4.11 | **Both.** Highest-severity planted issue |
| Stat tiles not symmetric: "~1 hr" smaller, captions in three tones | ✔ (planted #2) | ✔ (H2) | Scale/consistency | **Both** |
| Missing states: unavailable, 0 reviews, loading, booking error | ✔ (planted #3) | ✔ (S1–S4) | Manual: "a missing empty state" | **Both** |
| **Distance that is not a walk** ("20 min by car / by bus"): the chip only knows walking; P04 lives 15 min away by bus and serves the block | ✔ | ✘ | Tuesday research, P04; the brief's own bet | **Human only.** Context the AI was not given and would not infer from the screen |
| "Home" tab lit on a detail screen | considered, **dismissed**: the detail is pushed from Home, the tab shows the parent section | ✔ flagged (H5, low) | NN/G mobile navigation patterns; standard tab-bar behaviour | **AI confidently wrong** on a context-dependent point; the human's dismissal stands |
| Fixed "Book Grace" bar cuts the offers list with a hard edge, no fade | noted, low confidence | ✔ (H4) | Scroll-affordance pattern ("both signals, always") | **Both, AI sharper** |
| Name appears twice (title bar + hero) | ✘ | ✔ (H1) | One focal point | **AI only** |
| "About" and "What Grace offers" share a size though offers are what you book | ✘ | ✔ (H3) | Prominence follows importance | **AI only** |
| Stat-tile group is a component the system does not define | ✘ | ✔ (T5) | Contributing rule | **AI only** |
| Chip heights differ ("Available" shorter than "14 min walk") | ✘ | ✔ (T6) | Badge sizes | **AI only**, low |
| Heart / back hit areas ≈ 20 px glyphs | "none fail"; unresolved without inspection | flagged as a risk (A3) | 44 pt rule | **Unverifiable from a screenshot**; both say ask |
| Icon-only controls need names | ✘ | ✔ (A4), unverifiable | IconButton docs, WCAG 4.1.2 | **AI only**, unverifiable |
| "Background-checked by Vello" is the trust signal the research rated below a neighbor's word | ✔ (also noted) | ✘ | Tuesday audit (P02, P05) | **Human only.** Product sense, not visible in the system |
| "Saved" heart state missing | ✘ | ✔ (S6) | Accent usage | **AI only**, low |

Counts (14 rows): both 4 · human only 2 · AI only 6 · AI wrong 1 · unverifiable 1.

## 2. What each pass uniquely does

- **The human pass** carried the two findings that need the user and the product: the bus/car distance and the vouch-over-badge trust signal. It also killed a generic finding (the lit Home tab) that a critique without the navigation model would ship.
- **The AI pass** was broader: 24 items against the human's rows in the table above; eight low-severity ones do not reach the table above (e.g. A5: the "5.0" tile has no stars and no "out of 5", so a screen reader hears "5.0, 39 reviews"). Two the human would not have listed: duplicate name, undefined tile component. It also asserted the tab-bar issue (low severity), which is the manual's "broad but shallow on context" exactly.
- The AI would have anchored the human on H1/H3/H5 if it had gone first. The human's three planted issues were High, Medium, Medium; the AI ranked the first High (T1, A1) but the tiles only Medium (H2) and split the states across four rows (S1–S4).

## 3. Planted issues, final list

1. **High.** "Available" in persimmon: off-system and fails AA. Fix: `success` + dot (`--text-brand` on `--success-tint`, 5.7:1).
2. **Medium.** Stat tiles: one scale for the three values, one caption style.
3. **Medium.** No states beyond the happy path: unavailable, 0 reviews, loading, booking error; plus a non-walking distance.

Also noted, lower confidence in the human pass and sharper in the AI pass: the fixed CTA bar with no scroll affordance over the offers list.

## 4. Token drift on this screen

| Element | Value on screen | Token | Verdict |
|---|---|---|---|
| Available chip | persimmon tint / press / accent | should be `--success-tint`, `--text-brand`, `--success` | drift |
| Walk chip | green tint, mono 12, brand text | `--surface-brand-tint`?, `--font-mono`, `--text-sm`, `--text-brand` | on-system (tint alias unresolved, as on Friday) |
| Stat values | mono, two sizes (17 px and 13 px) | one `--text-xl`? | drift (inconsistent) |
| Captions | `--text-muted` 5.0:1 | `--text-sm` `--text-muted` | on-system |
| CTA | olive filled, white text 4.7:1 | `--brand-primary`, `--text-on-brand` | on-system |
| Trust row | brand text on brand tint | `--text-brand`, `--surface-brand-tint` | **raw ramps**: the source sets `--green-700` / `--green-50` / `--green-200` (`vello/05:7191`), the same mistake v1 made on the walk chip (found below the fold, see §7) |

| Headings | Bricolage semibold | `--font-display`, `--text-xl`/`--text-lg` | on-system |

**Focus and keyboard.** Not checkable from a screenshot, and both passes say so rather than guess. If this were my code: focus order back → save (heart) → message → "Book Grace"; each shows the 3 px `--focus-ring` with a visible offset (Color docs: "never a color change alone"); the heart is an `IconButton` with `aria-label` and `aria-pressed`; "Available" and "14 min walk" are not focusable. Verification needs the DOM: the first question for whoever has the file.

## Where I corrected Claude

| Claim | What was wrong | How verified |
|---|---|---|
| AI pass H5: the lit "Home" tab is a navigation-state error (low, asserted as a defect) | The detail screen is only reachable from Home; a tab bar keeps the parent section selected on pushed screens | Prototype navigation model; NN/G mobile-navigation patterns (Wednesday notebook). Dismissed before the AI pass ran |
| AI pass S1–S4 stop at states the screen implies | The missing state that matters for supply is a non-walking distance; the walk chip hides providers like P04 | Tuesday transcripts (P04 header: "lives fifteen minutes away by bus"; P04: "I can't afford Kestrel Park", "They've never asked. Not once, in nine years"), the brief's bet |

## 5. Below the fold (AI pass addendum)

Both passes above stop at the first viewport. The rest of the screen (offers list, reviews, "Read all reviews") was checked against the prototype source (`vello/05-source-code.md:3983-4018`, CSS `:7187-7207`) and the scrolled captures of the assigned screen (`neighbor-detail-grace-lin-2.png`, `-3.png`). Claude's findings, verified by line; the human pass did not cover this region and says so.

| Finding | Evidence | Verdict |
|---|---|---|
| Offer rows are real buttons, label + price + chevron | `<button className="nbd__svcrow" type="button">` (`:3988`) | on-system: tappable row is a button, not a div |
| Review dates: 11 px mono in `--text-subtle` on the white card | `.nbd__revat{font-size:11px;color:var(--text-subtle)}` (`:7205`); `--text-subtle` = `--ink-400` #8D8F80 on #FFFFFF = **3.3:1** | **fails AA** (needs 4.5:1); 11 px is also below the scale's `--text-xs` 12 px |
| Two date formats in one list: "1 month ago" vs "Mar 2026" | `neighbor-detail-grace-lin-3.png` | inconsistency; pick relative or absolute |
| Per-review stars with no number (`starsOnly`) | `<Rating value={r.stars} size="sm" starsOnly />` (`:4009`); Rating docs: "Use starsOnly in dense rows where the number is repeated nearby" (`vello/02:645`); nothing repeats it here | off-guideline; amber stars on white are 1.8:1 as a graphic, so a 4-star review is hard to tell from 5 |
| Trust row built from raw ramps | `.nbd__since{color:var(--green-700);background:var(--green-50);border:1px solid var(--green-200)}` (`:7191`) | **raw ramps** in product code, against the contributing rule; corrects the "on-system" verdict in §4 |
| Off-scale sizes repeat: 10.5 px captions, 11 px units and dates, 13.5 px names, 14.5 px prices, `border: 1.5px` | `:7188`, `:7197-7199`, `:7204-7205` | token drift, same family as the DS ProviderCard's `14px` / `1.5px` |
| "Read all 39 reviews" only raises a toast: "All 39 reviews aren't in this prototype" | `:4015-4016` | a missing screen, one more for the states list |


