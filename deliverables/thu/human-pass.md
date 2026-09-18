# Thursday · human pass, no AI · Neighbor detail (Grace Lin)

Screen: `neighbor-detail-grace-lin.png` (assigned by the mentor on Slack: "Tu pantalla asignada es el detalle de un neighbor", Spanish for "your assigned screen is a neighbor's detail"). Written before the AI pass.

Vocabulary to use (manual, Thursday): scale, weight, color/contrast, spacing, position · token vs one-off · 4.5:1, 44 px, color-alone, button-vs-div, focus · missing states.

## 1. Visual hierarchy

Eye path, first three things, mechanism for each:

1. Name "Grace Lin": scale (largest type on the screen) + weight (Bricolage extrabold) + position (centered, dead middle of the top third). Token: `--font-display`, `--text-2xl`, `--fw-bold`, `--text-strong`.
2. Profile photo: scale (the largest element in the top half, and the only photograph) + contrast (a photo on cream) + the olive shield sitting on it. Token: Avatar `xl` on `--color-bg`, VerifiedBadge in `--brand-primary`.
3. "Math & SAT tutoring": position (directly under the name) + spacing (isolated above the two chips); lighter weight, so it reads third. Token: `--font-sans`, `--text-base`, `--text-body`, `--space-2` below the name.

Where prominence and importance disagree:

- The three stat tiles share one role but not one size: "~1 hr" is smaller than "5.0" and "$40", so response time reads as less important than the system implies.
- Checked and dismissed: the "Home" tab stays lit on a detail screen. Correct: the detail is pushed from Home, the tab shows the parent section (standard tab-bar pattern).

## 2. Consistency with design-system tokens

| Element | What I see | Token it should use | On-system / off-system? |
|---|---|---|---|
| "Available" chip | persimmon tint background, red text, red dot | a live state is `success` + `dot` (Badge docs: accent only for time-limited offers; Accent usage: persimmon is a rare emphasis). The DS's own ProviderCard uses `variant="brand"` | **off-system** |
| Data values 5.0 · $40 · ~1 hr · "14 min walk" | all JetBrains Mono (correct: mono for data) | `--font-mono` + tabular numerals | on-system for the family |
| The three stat tiles | same role, not symmetric: "5.0" and "$40" sit at one size, "~1 hr" is visibly smaller; captions "39 reviews" / "from / hr" / "response" also differ in tone | one type-scale step for all three values (`--text-xl`?) and one caption style (`--text-sm` `--text-muted`) | **off-system / one-off**: same component, three sizes |
| "Book Grace" + round message button | one filled olive primary, full width, with a neutral outline secondary beside it | `Button variant="primary" size="lg" fullWidth` + `IconButton` secondary | **on-system**: one primary per surface, hierarchy is clear |

## 3. Accessibility

| Check | Finding | Evidence |
|---|---|---|
| Contrast (body text vs bg; badge text vs tint) | Everything passes except the "Available" chip: text **4.21:1 sampled / 4.10:1 by token** (`--accent-press` on `--accent-tint`) at 12 px semibold → fails AA. Its dot is 2.63:1 by token (2.70 sampled) → fails 3:1 as a graphic. Body on cream 9.5:1, tile captions 5.0:1, walk chip 6.1:1, "Book Grace" white on olive 4.7:1 | Ratios computed by script from pixel samples and token hex |
| Touch targets (44 px?) | Message button circle ≈ 46 px: passes. Heart and back arrow: glyphs ≈ 20 px; the hit area is not visible in a screenshot. No obvious failure; **unresolved** until inspected (DS IconButton md is 44) | Measured on the capture at 1.94 px per CSS px |
| Color-alone meaning | None. "Available" has its text next to the dot; the trust mark is a shield (shape) with the label "Background-checked by Vello" further down; stars carry the number 5.0 | Trust pattern: shape + color |
| Semantics / focus (button or div? labels?) | Not checkable from a screenshot. If it were my code: "Book Grace" is a `button`; the heart is an `IconButton` with a label ("Save Grace"); "Available" and "14 min walk" are text badges, not buttons; the stat tiles are a list; focus order back → heart → message → Book. **Unresolved** | Manual 4.2: "if this were your code" |

## 4. Missing UI states

- Provider **not available** (the chip only has one state on screen).
- **0 reviews** / new provider (Rating docs: no score, show "New").
- **Loading** (skeleton for photo, tiles, offers).
- **Error on "Book Grace"** (payment declined, slot gone, network).
- **Distance that is not a walk**: "20 min by car", "20 min by bus". The chip only knows walking; P04 in the research lives 15 minutes away by bus and serves the neighborhood anyway. A walking-only chip hides the real supply.

## 5. Suspected planted issues (severity · evidence · principle violated)

1. **High · "Available" chip in persimmon.** Off-system (Badge: accent is for time-limited offers; live states use `success` + dot) and fails AA: 4.10:1 text, 2.63:1 dot. A stressed requester scanning for "can I book her now" gets the one status signal in the warning-adjacent hue.
2. **Medium · The three stat tiles are not one component.** "5.0" and "$40" at one size, "~1 hr" smaller; captions in three tones. Visual hierarchy says response time matters less; the product bet ("trust through repeat bookings, fast local help") says it matters as much. Consistency, scale.
3. **Medium · No states beyond the happy path.** Unavailable, 0 reviews, loading, booking error, and a non-walking distance are all absent. Manual: "a missing empty state" is one of the planted kinds.

Also noted, lower confidence: the white "Book Grace" bar cuts the "What Grace offers" card mid-row with no fade, so the list may read as finished (Scroll affordance pattern); "Background-checked by Vello" is the trust claim the research (P02, P05) rated below a neighbor's word, so the vouch signal ("Priya has used her 11 times") is what this screen lacks.

Dictated by me and typed by Claude; every verdict above is mine, the measurements are the script's.
