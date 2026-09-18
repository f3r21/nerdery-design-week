# Handoff checklist · design → engineering, Vello

▲ = a row this week's own work would have failed on.

| # | Before the file moves | Why | Source |
|---|---|---|---|
| 1 | Every color, type, spacing and radius value maps to a **semantic token name**, not a hex or a px | "Consume semantic tokens, not raw values, so that when the system changes, your code follows" | Manual, Friday concepts; DS Color page: "Reference the semantic aliases in product code" |
| 2 ▲ | Values that map to **no token are listed as "unresolved"**, with the question for the designer, not guessed | "Writing 'unresolved, ask the designer' is the correct output, not a guess that looks confident" | Manual, Friday concepts |
| 3 ▲ | The token namespace is unambiguous: Vello's `--text-*` prefix covers both **colors** (`--text-strong`, `--text-muted`) and **sizes** (`--text-sm`, `--text-lg`). Say which one a spec means | A spec line "text: --text-sm" is a size; "text: --text-muted" is a color; both read as "text token" | `fri/vendor/colors.css` vs `fri/vendor/typography.css`; goes in Friday's drift table |
| 4 | Every screen ships with its **state table**: one row per cause for success, empty and error, plus loading, permission, timeout and cancellation | The prototype has no network layer; every API state Wednesday drew is an assumption until design says what the screen shows | Manual, Wednesday concepts; `wed/post-a-request-flow.html` (89 rows, 18 gaps) |
| 5 | Trust and status signals use **shape plus color**, never color alone | "Every verification signal in Vello uses a distinct shape as well as a color, so it survives greyscale" | DS Patterns · Trust & verification |
| 6 | **One filled olive primary per surface**; persimmon is a standalone moment, never a second CTA in the same group | "Two saturated fills side by side read as two equal choices, and the user stalls" | DS Patterns · Accent usage |
| 7 | Contrast is stated for every text/surface pair: **4.5:1 body, 3:1 large (24px+ semibold) and UI components**; persimmon on white is 3.3:1 and only passes at 16px semibold | Checkable, not a matter of taste | DS Color page · Contrast reference; WebAIM |
| 8 | Tap targets **≥ 44×44** even when the visual is smaller; `sm` buttons (36px) only on dense desktop toolbars | "Do not let tap targets fall below 44px even when the visual is smaller" | DS Spacing guidelines; Button accessibility |
| 9 | Semantics named per element: a tappable card is `as="a"` or `as="button"`, never a `div` with `onClick`; icon-only controls carry a label | "A div with onClick is invisible to keyboards and screen readers" | DS Patterns · Tappable cards; IconButton |
| 10 | Copy is final, in **sentence case**, with real names and times, and empty/error copy names the situation | "No matches for 'midnight dog walk'", not "Oops! Nothing here" | DS Voice & tone |
| 11 | Layers are named, unused layers removed, assets have export settings, and **deviations from the system say why** | "If you've deviated from the design system or detached components, be sure to share why" | Figma, Designer's Handbook for Developer Handoff |
| 12 | Spacing and measurements are annotated, with **fixed vs responsive** stated | "Add spacing details, provide measurements, and state if something is a fixed value, and whether or not it's responsive" | Figma, Designer's Handbook for Developer Handoff |
| 13 | Realistic content is in the file: long names, 0 reviews, no photo, a 12-min walk, a $120 price | The card must survive "Priya Anand · Deep cleans & move-outs · from $90 / visit" and "New" with no rating | Figma handbook: "content variables with modes for text samples across languages or text lengths"; Rating guidelines: no rating with no reviews |
| 14 | The frame is tagged **Ready for dev** and the designer is reachable for the first questions | "tag the relevant sections or frames with the Ready for dev status" | Figma, Designer's Handbook for Developer Handoff |
| 15 | A new component arrives with the four DS artifacts: `Component.jsx` (tokens only), `Component.d.ts`, `Component.prompt.md`, `component.card.html` | "The implementation, using tokens only — no hard-coded hex or px outside the scale" | DS Overview · Contributing |

## The check engineering runs on receipt

1. Token lint: every color/spacing/radius/type value traces to a semantic token, or is on the unresolved list.
2. State coverage: every screen has its success, empty and error rows; every endpoint has its status list.
3. Accessibility scan: semantic HTML, focus order, 4.5:1, labels, 44px.
4. Side-by-side against the reference screen before declaring it done. "Never accept 'it renders' as 'it's done.'" (Manual, Friday.)

