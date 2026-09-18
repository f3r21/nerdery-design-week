# Evidence for every claim in the demo

Each claim on a slide or in the script, with its source and the verbatim sentence.
Sources: MONDAY…FRIDAY = the course manual (Ravn internal, not in this package); 01/02/04 = `vello/01-ds-foundations.md`, `02-ds-components.md`, `04-ds-patterns.md`; Brief = the course site's Product Brief tab (not in this package).

Legend: ✅ verbatim in a source · 🟡 supported by the source, wording is mine · ⚪ no notebook source (convention, my measurement, or a mentor's spoken guidance)

## Step 1 · Purpose, four questions (+ Wednesday line)

| Claim | Status | Source, verbatim |
|---|---|---|
| 89 state rows, an endpoint contract | ✅ local | `wed/post-a-request-flow.html`: 89 `<tr>` data rows across H/E/F/R/B/V/P tables, 14 endpoints, 18 gaps |
| Every screen must answer job / main action / success / failure; failure is the one most skipped; purpose in one sentence | ⚪ | Office hour with the mentors, as relayed by the user ("Four Questions Framework … Failure state is the one most often skipped, causing demo-only screens"). Not in any notebook |
| The happy path is the easy part; states to always check | ✅ | WEDNESDAY: "The happy path - everything works, user succeeds - is the easy 20%. The other 80% is the error states, the empty states, the loading states, the permission states, the cancellations and timeouts." · "States to always check: empty (no data yet), loading (waiting), error (something failed), success (it worked), partial (some data), and permission-denied (not allowed). If a flow doesn't say what happens in each, it's incomplete" |
| "One olive primary" | ✅ | 01-ds-foundations · Principles: "One action per screen. A single olive primary leads each surface. Persimmon is a rare emphasis, not a second CTA." |

## Step 2 · Eye path

| Claim | Status | Source, verbatim |
|---|---|---|
| Name weight extrabold; tiles 17 px / 13 px; chip 12 px semibold | ✅ local | `vello/05-source-code.md:7178` (`font-weight:800`), `:7186-7187` (`.nbd__statv` 17px, `--sm` 13px), `:7279` (`.nb__avail` 12px, 600) |
| Hierarchy mechanisms: scale, weight, color/contrast, spacing, position | ✅ | THURSDAY · Concepts: "It's created through scale (bigger = more important), weight (bolder draws the eye), color and contrast (high contrast pops), spacing (whitespace isolates and elevates), and position (top and left get seen first in left-to-right cultures)." · NN/G 5 Principles: "Visual hierarchy can be implemented through variations in scale, value, color, spacing, placement" |
| The shield is shape + color, as the system asks | ✅ | 04-ds-patterns · Trust & verification: "Every verification signal in Vello uses a distinct shape as well as a color, so it survives greyscale, colorblindness and a bad phone screen in sunlight." · 02 · VerifiedBadge Don't: "Never substitute a plain green dot or check for the shield — the shape is the accessible signal." |
| "Done before any AI pass" | ✅ (method) | THURSDAY: "So the method is to do your own pass first, then Claude's, then compare - because if you let the AI go first, it anchors your thinking and you stop seeing independently." |

## Step 3 · "Available" chip

| Claim | Status | Source, verbatim |
|---|---|---|
| Accent badges only for time-limited offers | ✅ local | `vello/02-ds-components.md:580` · Badge · Guidelines · Don't: "Do not use accent badges for anything but a time-limited offer." **NotebookLM reported "not found" twice; the line is in the file.** |
| Live states use a status color with a dot | ✅ | `vello/02:566` Badge prop `dot`: "Leading status dot for live states." · `:573` "Pair status color with an icon or dot so meaning is not color-only." · 05-source-code · Badge.prompt.md: "Use dot for live-status, icon for trust signals." |
| "One persimmon moment per screen, at most" | ✅ | 04-ds-patterns · Accent usage · Where persimmon belongs |
| The system's own ProviderCard sets Available in olive | ✅ local | `vello/03-ds-providercard.md`, source: `{available ? <Badge variant="brand" size="sm" dot>Available</Badge> : null}`. Not in any notebook (03 kept out on purpose) |
| 4.10:1 fails AA at 12 px semibold; dot 2.63:1 fails 3:1 | ✅ computed + standard | WebAIM: "WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and user interface components" · "Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger." Ratios: `--accent-press` #C5421F on `--accent-tint` #FCE3D9 = 4.10 (token hex); `--accent` #F0623B on `--accent-tint` #FCE3D9 = 2.63 (token hex); sampled from the capture 4.21 text, 2.70 dot. Say the token values |
| Persimmon on white is 3.3:1, never for small text on cream | ✅ | 01 · Color · Contrast reference: "--accent (persimmon) on white is 3.3:1 — use it for fills with white text, never for small text on cream." |
| Same chip is persimmon on the prototype's own Neighbor detail (Maya Rivera) and on the home cards | ✅ local | `vello/09-prototype-screenshots/08-neighbor-detail-1.png`, `01-home-1.png` |

## Step 4 · Stat tiles

| Claim | Status | Source, verbatim |
|---|---|---|
| Mono for data is right | ✅ | 01 · Typography: "JetBrains Mono for data — prices, distances, counts." · Do: "Use mono with tabular numerals for prices, distances and ratings so columns align." |
| Same role, two sizes = hierarchy failure | 🟡 | THURSDAY: "The second most common is the opposite: the most visually prominent thing isn't the most important thing." The size difference is my measurement on the capture (source: 13 px vs 17 px, `vello/05:7186-7187`) |
| The prototype's own detail screen has the same asymmetry ("~20 min" smaller) | ✅ local | `08-neighbor-detail-1.png` |

## Step 5 · Below the fold

| Claim | Status | Source, verbatim |
|---|---|---|
| Review dates 11 px in `--text-subtle`, 3.3:1 on the white card, fails AA | ✅ local | `vello/05-source-code.md:7205` `.nbd__revat{flex:none;font-family:var(--font-mono);font-size:11px;color:var(--text-subtle)}`; `fri/vendor/colors.css:88` `--text-subtle: var(--ink-400)`, `:15` `--ink-400: #8D8F80`; #8D8F80 on #FFFFFF = 3.30 (WCAG formula) |
| Trust row built from raw ramps | ✅ local | `vello/05-source-code.md:7191` `.nbd__since{…color:var(--green-700);background:var(--green-50);border:1px solid var(--green-200)…}`; `vello/01-ds-foundations.md` Raw ramps: "Do not reference these directly in product code unless no alias fits." |
| Stars with no number, against the Rating guideline | ✅ | `vello/05-source-code.md:4009` `<Rating value={r.stars} size="sm" starsOnly />`; `vello/02-ds-components.md:645` "Use starsOnly in dense rows where the number is repeated nearby." (nothing repeats it) |
| Two date formats in one list | ✅ local | `thu/neighbor-detail-grace-lin-3.png`: "1 month ago" and "Mar 2026" |
| "Read all reviews" only raises a toast | ✅ local | `vello/05-source-code.md:4015-4016` `onToast(\`All ${n.reviews} reviews aren't in this prototype\`)` |
| Offer rows are real buttons | ✅ local | `vello/05-source-code.md:3988` `<button … className="nbd__svcrow" type="button">` |

## Step 6 · Missing states (+ Tuesday)

| Claim | Status | Source, verbatim |
|---|---|---|
| P02 hired on a neighbor's word: "That's the check." | ✅ | `Vello_Interview_P02.md:37`: "Well, no, I mean, Denise vouched for her. That's the check." · `tue/DELIVERABLE.md` audited correction |
| "Background-checked by Vello" ranked below a neighbor's word | ✅ local | `tue/audit.md` (P02, P05); `thu/DELIVERABLE.md` §1 human-only row |
| A missing empty state is a planted-issue kind | ✅ | THURSDAY · Vello example: "deliberately planted UX issues - a broken hierarchy, a contrast failure, a missing empty state, a component that ignores the design system's tokens." |
| Never show a rating with no reviews; show "New" | ✅ | 02 · Rating · Don't: "Do not show a rating for a provider with no reviews — show a \"New\" badge instead." |
| P04 lives 15 min away by bus | ✅ | Vello_Interview_P04.md, context header: "44, self-employed six years, works across Kestrel Park and two adjacent areas, lives fifteen minutes away by bus". **Header, not P04's own sentence**; the demo now says "interview header" |
| P04 in her own words | ✅ | P04: "I don't live in Kestrel Park either. I can't afford Kestrel Park. Most of the people cleaning those houses live somewhere else. So if it's neighbours only, where does that leave me?" · "They've never asked. Not once, in nine years. They care that I come on the day I said and that I'm the same person every week." · "getting from one to the other is forty minutes with the bus, so I can't fill it." |
| The brief's scope is walking distance / minutes | 🟡 brief not in the package | Vello · Product Brief (open the Brief tab if asked): "Help, minutes from your door." · "all sourced from within walking distance." · "Hyperlocal scope: one neighborhood at a time, not city-wide." |

## Step 7 · Claude's pass

| Claim | Status | Source, verbatim |
|---|---|---|
| 24 items → 14 rows | ✅ local | `thu/ai-pass.md`: 24 rows H1–H5, T1–T6, A1–A7, S1–S6; `thu/DELIVERABLE.md` §1 table: 14 rows |
| Home tab flagged at low severity | ✅ local | `thu/ai-pass.md:15` "| H5 | Low |" |
| AI critique is broad but shallow on context; own pass first | ✅ | THURSDAY: "research consistently finds that AI critique is broad but shallow on context: it catches generic issues well and misses the ones that depend on knowing the user, the goal, or the product's specific bet." |
| The three-way gap | ✅ | THURSDAY: "some only surface in the group when someone says \"wait, a stressed requester would never find the cancel button here\" - the kind of context-dependent insight AI is weakest at. That three-way gap is the entire point of the day." |
| Lit Home tab on a detail screen is correct | ⚪ + local | NN/G Basic Patterns for Mobile Navigation: tab bars "are persistent, that is, they are always visible on the screen"; the article says nothing about the selected state on pushed screens. Evidence used instead: the prototype itself keeps Home lit on every screen pushed from Home (`08-neighbor-detail-1.png`, `05-request-detail-1.png`), so the behaviour is the prototype's navigation model, not a defect on this one screen. Say "convention and the prototype's own model", not "NN/G says" |
| Counts 4 · 2 · 6 · 1 · 1 unverifiable (14 rows) | ✅ local | `thu/DELIVERABLE.md` §1 table, recounted against the table |
| Fixed bar with no fade (Both, AI sharper: `thu/human-pass.md:52` noted it at low confidence) | ✅ | 04 · Scroll affordance: "Two signals are required together: a soft edge fade on the side with more content, and a next item peeking in by roughly 30%." (a pattern for rows; applied by analogy to the cut-off list, say so if asked) |

## Step 8 · From critique to code

| Claim | Status | Source, verbatim |
|---|---|---|
| Live v1 frame: a 37-character name widens the page and pushes the rating off-screen; v2 clips with an ellipsis | ✅ local | `fri/v1/render.png` (07:11) and the live `fri/v1/ProviderCard.v1.html` inside step 8; v1 lacks `min-width: 0` on the card root and its harness uses the original `auto` grid tracks (`fri/v1/harness.v1.jsx`); v2 adds `min-width: 0` (`fri/ProviderCard.css:10`) |
| The Friday skill is verification: side-by-side, token lint, a11y scan | ✅ | FRIDAY: "The Friday skill is verification, not generation. Generating a component is the easy 20%. The value is the audit: a side-by-side comparison against the reference screen, a token lint (every color/spacing/radius/type value must trace to a semantic token), and an accessibility scan (semantic HTML, focus order, contrast, labels)." |
| AI-generated UI hardcodes values and drifts to generic patterns | ✅ | FRIDAY: "It's fast, and it has a characteristic failure: AI-generated UI hardcodes values and drifts toward generic patterns instead of honoring the system." |
| Consume semantic tokens, not raw values | ✅ | FRIDAY: "The discipline is to consume semantic tokens, not raw values, so that when the system changes, your code follows." · 01 · Color: "Reference the semantic aliases in product code — the raw ramps exist so the aliases can move." · Raw ramps: "Do not reference these directly in product code unless no alias fits." |
| Unresolved is an answer | ✅ | FRIDAY: "Writing \"unresolved, ask the designer\" is the correct output, not a guess that looks confident. That list of unresolved values is the most useful thing you will hand back to design all week." |
| 12 → 0 flagged rows (10 drift + 2 raw ramps); 4 unresolved | ✅ local | `fri/v1/lint.txt` (10 drift · 2 raw-ramp), `fri/v2-lint.txt` (0 drift · 4 unresolved) |
| A tappable card must be a link or button | ✅ | `vello/04:314` Tappable cards · Accessibility: "Render a tappable card as as=\"a\" or as=\"button\" — a div with onClick is invisible to keyboards and screen readers." · `02:973` Card: "A clickable card must be a link or button, not a div with onClick". NotebookLM reported "not found"; both lines are in the files |
| Focus is a 3 px ring, never a color change alone | ✅ | 01 · Color · Contrast reference |
| Tap targets never below 44 px | ✅ | 01 · Spacing · Don't: "Do not let tap targets fall below 44px even when the visual is smaller." · Principles: "tap targets never below 44px, 4.5:1 contrast on all text." |

## Step 9 · The real file (+ Monday)

| Claim | Status | Source, verbatim |
|---|---|---|
| A radial lat/long query cannot produce a routed walking time | ✅ local | `mon/challenge.md` Challenge 2: "dynamic spatial queries, pedestrian routing APIs, and address masking logic"; `mon/DELIVERABLE.md` pushback 2 |
| sm = 36 px fails the 44 px rule | ✅ | `vello/02:142`: "md and lg meet the 44px minimum tap target; sm is 36px and is only for dense desktop toolbars." |
| DS ProviderCard shows miles, a Book button, olive Available, a div root | ✅ local | `vello/03-ds-providercard.md`: props `distance` "Distance in miles."; `<Button size="sm" variant="primary" onClick={onBook}>`; `<Badge variant="brand" size="sm" dot>Available</Badge>`; root `<div className={cls}>`. Not in any notebook |
| DS source hardcodes px | ✅ local | `vello/03`: `.vl-provider { display: flex; gap: 14px; … border: 1.5px solid var(--border-default); … padding: 16px; }`, `.vl-provider__meta { … margin-top: 6px }` |
| Contributing rule: tokens only | ✅ | 01 · Contributing: "Component.jsx — The implementation, using tokens only — no hard-coded hex or px outside the scale." |
| The brief's bet says minutes | 🟡 brief not in the package | Brief: "Help, minutes from your door."; home card copy "6 min walk"; "Data JetBrains Mono · 6 min walk · $90 per visit" |

## Step 10 · Failures kept on the record

| Claim | Status | Source, verbatim |
|---|---|---|
| Wednesday invented a 403 modal and a "New Request" CTA | ✅ local | `wed/DELIVERABLE.md` "Where I corrected Claude"; HTML "Earlier drafts vs source" rows |
| Eleven numbers drifted; the P06 price claim was checked and rejected | ✅ local | `where-i-corrected-claude.md`, last section; `Vello_Interview_P06.md:73` "charged four hundred pounds for a job worth eighty" |
| Wednesday draft said no cancel; prototype has Close request | ✅ local | `vello/07-prototype-screens.md:373–439` ("Close request", "Close this request?", "Keep it open / Close request"); the HTML v2's "Earlier drafts vs source" table |
| Lint had two regex bugs | ✅ local | `fri/DELIVERABLE.md` §6 |
| NotebookLM called two claims overstated; both verbatim | ✅ local | `vello/02:142` and `:580` (above). The notebook had read the shorter `Badge.prompt.md` and the Button usage line instead of the guidelines; re-queried, it returned "not found" for both while the lines exist |
| Graded on judgment, not polish; 8 dimensions | ✅ | assessment-source: "You are graded on judgment, not polish: the gaps you caught, the claims you verified, the pushbacks you made. A beautiful artifact you cannot defend scores worse than a rough one you can." Weights: AI Judgment 20, Craft 20, Problem Solving 15, Communication 10, Ownership 10, Learning Orientation 10, Collaboration 10, Product Sense 5 |
| Engineer's failure mode | ✅ | THURSDAY: "Failure mode to avoid: hardcoding values that should be tokens, and shipping components that pass visual review but fail keyboard, contrast, or screen-reader checks." |

## Step 11 · Close, and the stance

| Claim | Status | Source, verbatim |
|---|---|---|
| Thirteen rows across six phases; fifteen handoff rows, two from misses | ✅ local | `engineering-design-support-checklist.md` (13 rows, 6 phase labels); `handoff-checklist.md` (15 rows, two marked ▲) |
| Not overruling the designer | ✅ | MONDAY: "Your goal is not to overrule the designer; it's to give them better raw material and catch problems earlier." · "Design is shared - but ownership is not." |
| Monday's touchpoint the pushback contests | ✅ | MONDAY: "Engineers can flag technical constraints during Architect so the design doesn't assume something impossible." (the reflection argues Discover, for Vello) |
| Admin verifies before providers appear | ✅ | Brief · Core flows: "Admin verifies new providers before they appear" |
| Planted issues are everywhere but home | 🟡 brief not in the package | Brief: "The home screen is the polished reference. Everything past it carries planted UX issues on purpose." |
| One artifact, decision process, show failures | ⚪ | Mentors' Q&A as relayed by the user: "present the strongest artifact for Velo app, not every artifact"; "share failures and refinement process". Not in any notebook; the manual's own line is "Bring everything … open and ready to show" |
