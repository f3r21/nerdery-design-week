# Wednesday · Post a request: flow, state/API contract, gaps

A requester posts a need to verified neighbors nearby, then books one who replies.

**The deliverable is [`post-a-request-flow.html`](post-a-request-flow.html)**: Figure 1 (end-to-end flow), Figures 2–3 (the two lifecycles the stress test touched, and a failed ID check from both sides), a state table of 89 rows with one row per cause, 14 endpoints, 18 gaps against the prototype, the assumption list with what breaks if each is wrong, and the unresolved questions. Open it in a browser; this page is the one-screen index.

The three `.md` files beside it are the earlier drafts, kept as evidence and labelled as superseded.

## What the contract covers

| Screen | Success | Empty / waiting | Error |
|---|---|---|---|
| Home card | H2 open + waiting, H3 open + N replies | H4 no open request | H5 load failed |
| Post a request | F15 `201 {id}` → Request screen | F1 pristine, F8 abandoned (cancel point 1) | F3–F7 one row per missing field, F10 `422`, F11 out of area, F12 `409` already open, F13 `401`, F14 network |
| Your request | R5 N replies, R14 closed (`PATCH` `200`) | R4 no replies, R7–R8 quiet → nudged, never expired | R2 `404`, R3 load, R9 reply not delivered, R10 nudge `429`, R15 close `409`, R16 close failed |
| Booking | B11 `201 pending`, B12 accepted, B16 cancelled free | B14 no answer yet | B7 `409`, B8 `402`, B9 `422`, B10 network, B13 declined, B17 fee, B19 too late, B20 provider cancelled |
| Admin · ID check | V12 approved, V13 needs info, V14 rejected | V3 queue clear, V4 no match | V5 `403`, V6 load, V8 vendor stuck, V10 no reason, V11 no reason fits, V16 `409`, V17 failed |

Every endpoint is an assumption: the prototype has no network layer (`vello/07-prototype-screens.md`, header).

## The one gap I pick and defend

**G1 · A posted request can never receive replies.** `activeResponders = myRequest ? [] : F.RESPONDERS` (prototype source, cited as L2153 in the HTML). After a real post, the reply → book path is unreachable; replies exist only for the seed request. This is the gap with the highest contract impact: the whole second half of the flow (R5 → B1 → B11) has no screen to land on once a user actually posts.

Alternatives considered, in the HTML's order: **G2** a pending booking is drawn as confirmed (`BK_STATUS.pending` says "Waiting on reply", Manage renders "You're all set"); **G3** three cancellation policies in three places (24h + rating, "Nothing was charged", 1h + 50%). G2 and G3 are real, but G1 blocks the flow itself.

## Assumptions that carry the most weight

| `[ASSUMPTION]` | Rows | What breaks if wrong |
|---|---|---|
| A quiet request is nudged, never expired | R7, R8, B14 | R8 becomes an `expired` status with repost/edit actions; provider feeds need a sweeper |
| A booking starts `pending`; the provider accepts or declines | B11–B14 | Sourced from `BK_STATUS.pending`, not from a screen. If bookings are instant, B11–B14 collapse |
| One open request per requester | F12 | If many are allowed, the Home card becomes a list and F12 disappears |

Full list, plus "Unresolved, ask a mentor" (T1, T2, cancellation policy, reapply, who handles disputes) and "Defaults I chose that you never set", are in the HTML.

## Known defect in the HTML

Its line citations (`L<n>`) point at `vello/05-prototype-screens-jsx.md`, the pre-split source, later split into `vello/05-source-code.md` and `vello/07-prototype-screens.md`. The quotes are verbatim; the line numbers were not re-mapped, except G1's, which is at `vello/05-source-code.md:5108`.

## Where I corrected Claude

| Claim | What was wrong | How verified |
|---|---|---|
| Earlier draft: the Request screen "completely omits cancellation actions"; cancel is `DELETE /requests/{id}` → `CANCELLED`; a request hits a 24h `EXPIRED` state with Repost / Edit radius | The prototype has "Close request" → "Close this request?" sheet → `Closed` badge, "You can always post it again". No expiry exists anywhere. | Read the three request screens (`vello/07-prototype-screens.md:324–501`); listed in the HTML's "Earlier drafts vs source". Result: close is `PATCH status`, rows R11–R17; expiry replaced by a nudge (R7–R8) and recorded as a decision, not a fact |
| Earlier draft: a `403` modal "Address outside neighborhood scope" and a "New Request" CTA on Home | Neither exists in the prototype or the brief. Entry is the `+` button → create sheet; the address field has no scope error | Same audit. `403` kept only as an assumption row (F11 `422 out_of_area`), labelled |

