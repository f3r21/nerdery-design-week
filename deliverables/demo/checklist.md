# Every box, checked · manual + mentors

Source of the boxes: manual (Assessment, each day's "Deliverable", Friday practices, "The final package"), `CLAUDE.md` format rules, and the mentors' Q&A / office hour as relayed. ✅ = present, with the file. ⚠️ = present with a disclosed caveat.

## Assessment · "The deliverable" (Friday)

| Box | Where |
|---|---|
| ✅ A working Vello component implemented end to end with AI assistance | `fri/ProviderCard.html` (opens in any browser, offline: fonts and avatars inlined), `ProviderCard.jsx` + `.css` |
| ✅ One-page design-fidelity audit | `fri/FIDELITY-AUDIT.md` (one page); full version `fri/DELIVERABLE.md` |
| ✅ where the AI honored the design system | FIDELITY-AUDIT §1 |
| ✅ where it drifted token by token | FIDELITY-AUDIT §2, `v1/lint.txt` → `v2-lint.txt` |
| ✅ where it failed accessibility | FIDELITY-AUDIT §3 |
| ✅ how you corrected each | FIDELITY-AUDIT §2–3, v1 frozen in `fri/v1/` |
| ✅ Bring the CLAUDE.md guardrail you used | `fri/CLAUDE.md` |
| ✅ Bring everything: Monday's reflection, Tuesday's synthesis, Wednesday's flow, Thursday's critique open | second tab `demo/index.html`, links to all five |

## Friday practices 5.1–5.4

| Box | Where |
|---|---|
| ⚠️ 5.1 spec by hand, three columns, unresolved marked, handoff questions | `fri/spec-by-hand.md`; drafted with Claude and reviewed row by row; the file says so |
| ✅ 5.2 generate, then token-fidelity diff, fix at least one thing | v1 → v2; four things fixed |
| ✅ 5.3 a11y findings (issue → WCAG/APG → fix), highest severity fixed | FIDELITY-AUDIT §3; Available chip fixed |
| ✅ 5.4 guardrail with tokens to use, banned values, a11y baseline, "compare the render before done"; regenerate and show drift dropped | `fri/CLAUDE.md`; 12 → 0 flagged rows (10 drift + 2 raw ramps) |

## Close of week · "The final package"

| Box | Where |
|---|---|
| ✅ research read-out and entity list (Tuesday) | `tue/DELIVERABLE.md`, `tue/thematic-synthesis.md`, `tue/audit.md` |
| ✅ flow plus state/API contract (Wednesday) | `wed/post-a-request-flow.html`, index `wed/DELIVERABLE.md` |
| ✅ component audit (Thursday) | `thu/DELIVERABLE.md` |
| ⚠️ handoff checklist | `handoff-checklist.md`; drafted from the week's misses |
| ⚠️ engineering design-support checklist, grown from Monday's touchpoints | `engineering-design-support-checklist.md` (rows cite `mon/DELIVERABLE.md` §2) |

## Each day's "Deliverable" line

| Day | Boxes | Where |
|---|---|---|
| Mon | ✅ one page · ✅ what design owns · ✅ what engineering contributes across the lifecycle · ✅ one decision reframed as a system decision · ✅ two documented pushbacks, mine | `mon/DELIVERABLE.md` |
| Tue | ✅ audited synthesis · ✅ ≥2 themes audited to verbatim evidence · ✅ loud-but-shallow theme flagged · ✅ two problem statements, who/what/why, no solutions · ✅ entity list with states · ✅ at least one correction of Claude | `tue/*`; four quotes verified verbatim by the Tuesday notebook |
| Wed | ✅ revised flow artifact · ✅ state table state→trigger→API status→UI · ✅ endpoint list with states · ✅ three stress tests · ✅ one named gap vs Vello's screens (G1) · ✅ assumptions marked | `wed/post-a-request-flow.html` |
| Thu | ⚠️ first pass, no AI (disclosed in the file) · ✅ structured critique: hierarchy, tokens, a11y (contrast, targets, focus, semantics), missing states · ✅ compare: what Claude caught / missed / got wrong · ✅ resolved against the standard · ✅ planted issues · ✅ token drift · ✅ what each pass uniquely caught · ✅ below the fold (offers, reviews) audited against the source, `thu/DELIVERABLE.md` §7 | `thu/human-pass.md`, `thu/ai-pass.md`, `thu/DELIVERABLE.md` |
| Fri | see above | |

## `CLAUDE.md` format rules (mine)

| Box | Where |
|---|---|
| ✅ every deliverable ends with "Where I corrected Claude" | all five `DELIVERABLE.md` |
| ✅ appended to `where-i-corrected-claude.md` | rebuilt, entries Mon–Fri |
| ✅ screen deliverable opens with one purpose sentence; state table one row per cause | `wed/DELIVERABLE.md`, `fri/DELIVERABLE.md`, `thu/DELIVERABLE.md` |
| ✅ assumptions marked `[ASSUMPTION]`, unresolved listed, defaults listed | `fri/DELIVERABLE.md`, `wed/post-a-request-flow.html` |
| ✅ the `--text-*` collision in Friday's drift table and the handoff checklist | `fri/DELIVERABLE.md` §2 note, `handoff-checklist.md` row 3 |

## Mentors' Q&A and office hour

| Box | Where |
|---|---|
| ✅ present the strongest artifact, not every artifact | `demo/present.html`, one screen → code; Monday in step 9, Tuesday in step 6, Wednesday in step 1 and the closing strip |
| ✅ show the decision process, own rationale, failures and refinement | steps 7, 8, 10 |
| ✅ edge cases belong in Friday | step 6 (missing states), step 8 (long name) |
| ✅ four questions per screen; failure state named | step 1 |
| ✅ don't trust the first paragraph; validate AI output | steps 7 and 10 (tab dismissal, notebook wrong twice, second review wrong once) |

## Grading dimensions, where each is visible

- AI Judgment → steps 3, 5, 7, 10
- Craft → steps 4, 5, 8, `present.html` itself on DS tokens
- Problem Solving → steps 3, 8 (computed ratios, the render catching what the lint cannot)
- Communication → steps 1, 11, one sentence per step, numbers alone
- Ownership → steps 2, 9, 10, 11 ("my pass first")
- Learning Orientation → steps 8, 10, `fri/CLAUDE.md`
- Collaboration → steps 1, 6, 9, 11 (eight questions), checklists
- Product Sense → steps 1, 6, 9 (bus, minutes vs miles)

## Open caveats to say out loud if asked

1. The two no-AI steps state on their own pages how they were made; the verdicts are mine.
2. v1 and v2 came from the same session, so v2 benefits from the v1 audit. A clean-room regeneration would be the stronger test.
3. The Wednesday HTML's `L` citations refer to the pre-rename source file; the load-bearing one (G1, `activeResponders = myRequest ? [] : F.RESPONDERS`) was re-found verbatim at `vello/05-source-code.md:5108`. The other line numbers were not re-mapped.
4. Practice outputs not produced, because they are not the day's Deliverable line: 1.1, 1.2, 2.1, 2.2, 3.1, 3.3.
5. Numbers on the slides that the files contradicted have been corrected and logged in `where-i-corrected-claude.md` (last section).
