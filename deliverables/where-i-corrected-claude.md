# Where I corrected Claude · running log

One row per correction: claim → what was wrong → how verified.


## Monday · design process

| Claim | What was wrong | How verified |
|---|---|---|
| Claude's 5-phase map brought engineering in at *Architect* to review wireframes | For Vello the core UX depends on spatial queries, pedestrian routing and address masking; deferring feasibility to phase 3 means polishing unfeasible flows | Brief: "6 min walk" chip and walking-distance scope; a radial lat/long query cannot produce a routed walking time. Written up as Pushback 2 in `mon/DELIVERABLE.md` |
| Claude validated the process persona by persona through linear phase gates | A Requester cannot book without a Provider, and a Provider is invisible until a Community Admin approves them; single-role validation produces false positives | Brief, core flow 4: "Admin verifies new providers before they appear". Pushback 1 in `mon/DELIVERABLE.md` |


## Tuesday · research synthesis

| Claim | What was wrong | How verified |
|---|---|---|
| Claude: P02 demands formal background checks (DBS, ID, references) as a mandatory requirement for hiring home help | P02 hired Marta and gave her a key with zero formal checks. "Denise vouched for her. That's the check." A platform check "wouldn't have changed anything. I already had Denise." Stated attitude ≠ behaviour | Verbatim from `Vello_Interview_Transcripts/Vello_Interview_P02.md`; cross-checked against P01 ("I don't think the certificate is telling me what I actually want to know") and P05. Flagged as the loud-but-shallow theme in `tue/audit.md` |

## Wednesday · flow and contract

| Claim | What was wrong | How verified |
|---|---|---|
| Earlier draft: the Request screen "completely omits cancellation actions"; cancel is `DELETE` → `CANCELLED`; a 24h `EXPIRED` state offers Repost / Edit radius | Prototype: "Close request" → confirm sheet → `Closed`, "You can always post it again". No expiry exists | `vello/07-prototype-screens.md:324–501`; HTML v2 "Earlier drafts vs source". Contract now uses `PATCH status` (R11–R17) and a nudge instead of expiry (R7–R8), recorded as a decision |
| Earlier draft: `403` "Address outside neighborhood scope" modal; "New Request" CTA on Home | Neither exists. Entry is the `+` → create sheet | Same audit |


## Thursday · component audit

| Claim | What was wrong | How verified |
|---|---|---|
| AI pass: the lit "Home" tab on the detail screen is a navigation-state error | The detail is pushed from Home; a tab bar keeps the parent section selected | Prototype navigation; NN/G mobile navigation patterns. Dismissed in the human pass, before the AI ran |
| AI pass: missing states are unavailable / 0 reviews / loading / error | Also missing: a distance that is not a walk ("20 min by bus"). The walk-only chip hides providers like P04 | Tuesday transcripts, P04 ("I can't afford Kestrel Park"; "They've never asked. Not once, in nine years") |
| Claude's critique, and the demo built on it, covered the first viewport only | Asked about the scrolled part of the screen, it had nothing. The offers list and reviews were then audited against the source: 11 px review dates at 3.3:1, a trust row built from raw `--green-*` ramps, stars with no number, two date formats | `thu/DELIVERABLE.md` §7, `vello/05-source-code.md:7191,7205` |

## Friday · ProviderCard

| Claim | What was wrong | How verified |
|---|---|---|
| v1 set the summary at `--text-sm` and the stars at 18 px | Reference is 16 px text and 16 px stars; 18 px stars wrapped the meta row | Character-width and star-span measurements on `reference-home-card.png` |
| v1 copied the screenshot's persimmon "Available" badge | 4.10:1, fails AA at 12 px semibold; Badge docs reserve accent for offers; the DS source uses `brand` | Contrast from token hex; `vello/03` opened last |
| The first token-lint passed `var(--font-display)` as drift and missed v1's raw `72px` | Two regex bugs made the "before" count wrong | Fixed, re-ran on the frozen `v1/`, diffed |
| NotebookLM (the audit notebook, not Claude): "Badge docs never say accent is for time-limited offers" and "the docs never say sm is only for toolbars" | Both lines are verbatim in `vello/02` (Badge Don't; Button Accessibility). The notebook read the prompt.md and the usage line, not the guidelines | `grep -n` on `vello/02-ds-components.md`, lines 580 and 142 |
| Implicit all week: "the home card is the ProviderCard" | The DS ProviderCard shows miles and a Book button; the prototype's card shows walking minutes and a chevron. Different components with one name | Diff in `fri/DELIVERABLE.md` §4 |


## Numbers that drifted between file and slide

Numbers I had computed once and then copied were the ones that had drifted.

| Claim in a deliverable | What was wrong | How verified |
|---|---|---|
| "The dot is 2.70:1" (step 3, Thursday, Friday audit) | 2.70 was sampled from the screenshot pixels; the token pair `--accent` #F0623B on `--accent-tint` #FCE3D9 computes to 2.63:1. On a slide that says "computed, not eyeballed" | Recomputed from `vello/01-ds-foundations.md` hexes with the WCAG formula |
| "12 → 0 drift rows" (step 8) | 12 = 10 drift + 2 raw ramps; the label lied by one category | `fri/v1/lint.txt` |
| "Both 5 · human 2 · AI 6 · AI wrong 1 · unverifiable 2" (Thursday counts) | 16 against 14 rows; one row was counted twice. Real: 4 · 2 · 6 · 1 · 1 | Recounted the table's Verdict column |
| "Six rows only the AI listed, incl. the fixed bar with no fade" (step 7) | The human pass had noted the fixed bar at low confidence; the AI-only row is the "5.0" tile with no "out of 5" for a screen reader | `thu/human-pass.md:52`, `thu/ai-pass.md` A5 |
| "Denise vouched for her. That's the vetting" (Tuesday one-pager) | P02 said "That's the check." | `Vello_Interview_P02.md:37` |
| "Providers build 100% of their client base through word of mouth" (Tuesday synthesis) | P04: "Almost all of them come from each other"; a newsagent card and an app also happened | `Vello_Interview_P04.md:25,53` |
| "Eight questions went to the designer" (step 9) | The hand spec listed seven; the eighth (which card is canonical) lived in another file. Added as question 8 | `fri/spec-by-hand.md` |
| "State table of 85 rows" (Wednesday index) | 89 | Counted the HTML's `<tr>` rows per screen |
| "`ProviderCard.html` is self-contained" (Friday audit) | It loaded six avatars from pravatar.cc and the fonts from Google. Now inlined | `grep https:// fri/ProviderCard.html` |
| "v2 = 0 drift" (Friday) | The lint never printed a zero; the count was an absence. It prints `drift: 0 · raw-ramp: 0` now | `fri/v2-lint.txt` line 2 |

| Live v1 frame in the deck showed the long name with an ellipsis, contradicting the Friday audit's "the page widened" | The v1 harness carried v2's `minmax(0,1fr)` section tracks, which hid v1's own bug. Restored the original grids; the live frame now widens exactly as `fri/v1/render.png` did | Four controlled renders (with/without the reference image, with/without the long name) |

One critique rejected: that P06 never raises price exploitation. P06:73: older residents "get charged four hundred pounds for a job worth eighty." Theme 4 stays at four participants.

