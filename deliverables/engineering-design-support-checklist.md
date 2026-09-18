# Engineering design-support checklist · Vello

Thirteen rows across six phases: what to do, the artifact, the failure mode it prevents, the source.

| Phase | What engineering does, before design commits | Artifact | Failure mode it prevents | Source |
|---|---|---|---|---|
| **Discover** | Audit the third-party SDKs the product bet depends on: geolocation accuracy, pedestrian routing, identity checks; report cost, rate limits and latency | One-page feasibility note per SDK | Design polishes a "6 min walk" chip that a radial lat/long query cannot compute; routing is a backend commitment | Monday deliverable, Pushback 2; brief: walking-distance scope |
| **Discover** | Read the transcripts as requirements: for each theme, name the **entity and state** it implies, and flag where the stated attitude contradicts the observed behaviour | Entity list with states (`tue/DELIVERABLE.md` §4) | Building a background-check badge because P02 *said* he wanted one, when he hired Marta on Denise's word alone | Tuesday audit, loud-but-shallow theme |
| **Define** | Set the privacy and address-masking rules before flows are drawn: what a public card may show, what unlocks at booking | Masking rule table | A ProviderCard that leaks a home address | Monday deliverable §2 |
| **Define** | Model the **gating**: a Provider is invisible until an Admin approves; write the status enum and the server-side filter | `verification_status` enum + feed filter | Requester flows tested as if supply and approval already exist (false positives) | Monday, Pushback 1; brief core flow 4 |
| **Architect** | Draw the **state machine** for each object before screens: request `open → closed`, booking `pending → confirmed / declined / cancelled`, verification `pending → needs_info / verified / rejected` | State table per screen, one row per cause (`wed/post-a-request-flow.html`) | The one screen that answers "did they answer yet?" rendering "You're all set" (gap G2) | Manual, Wednesday: "the data model supports what IA implies" |
| **Architect** | Ask the three stress questions on every flow: *never responds? where can they cancel? what does the admin see on failure?* Then write what stays **unresolved** instead of inventing it | Coverage matrix + unresolved list | Three cancellation policies in three places (gap G3); an expiry state nobody decided | Wednesday stress test, rounds 1–3 |
| **Architect** | Check every counter and live signal against its event: "3 neighbors responded" needs a `reply.created` event or a poll | Endpoint list with states | A reply arrives and the requester is never told (row R9) | Wednesday contract |
| **Design** | Co-own the token layer: names, semantic aliases, and the namespaces that collide (`--text-*` is both color and size) | Token lint rule + drift table | Hardcoded hex that stops following the system; specs that read as one token kind and mean the other | Manual, Thursday: "did this use a token or a hardcoded value?"; `fri/vendor/*.css` |
| **Design** | Run the four checkable a11y rules on every screen: **4.5:1**, **44px**, **not color alone**, **button not div** | Four findings with evidence | Components that pass visual review and fail keyboard, contrast or screen reader | Manual, Thursday practice 4.2; DS accessibility notes |
| **Design** | Do the human pass **before** the AI pass, then compare; resolve every disagreement against the standard or the system | Comparative audit (`thu/DELIVERABLE.md`) | Being anchored by Claude's critique and missing the context-dependent issue ("a stressed requester would never find the cancel button here") | Manual, Thursday |
| **Validate & hand off** | Give the AI a check to run against: reference screen, token lint, a11y baseline, "compare the render before declaring it done", as a saved guardrail | `fri/CLAUDE.md` guardrail + before/after drift count | Generated UI that "renders" and drifts to generic patterns | Manual, Friday practice 5.4 |
| **Validate & hand off** | Set the non-functional budget with design: feed render time, payload shape (one aggregated DTO for the card, no N+1) | Performance budget + DTO sketch | A card that needs four requests to fill | Monday deliverable §2 |
| **Every phase** | Talk about users, not metrics; name what you see in the design's vocabulary (hierarchy, tokens, states) | Critique in design terms | "Treating design as decoration you reverse-engineer after handoff, instead of a spec you read" | Zhuo cheat sheet; Manual, Monday |

## The three habits that carried the week

1. **Verify against the source before repeating a claim.** The false Wednesday gap ("no cancel") died on reading three prototype screens.
2. **Unresolvable is an answer.** T1, T2, the cancellation policy and the reapply rule went to a list, not into the contract.
3. **Your pass first.** 1.1, 2.1, 3.1, 4.1 and 5.1 are no-AI on purpose; the AI's breadth is only useful after your judgment exists.

