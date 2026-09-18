# Vello Design System — patterns

**Source:** https://vello-design-system.vercel.app/docs/index.html#/accent-usage  
**Extracted:** 2026-09-17

The rendered pattern pages: accent usage, trust and verification, scroll affordance, tappable cards, and voice and tone.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/accent-usage -->

Patterns

# Accent usage

Vello has two action colors: olive is the primary, persimmon is the accent. Olive leads. Persimmon is a standalone moment — never a second CTA sitting next to the first.

olive = primary

persimmon = rare

one primary per group

## The rule

One filled primary per button group, paired with a secondary, outline or ghost. Persimmon never shares a group with olive: two saturated fills side by side read as two equal choices, and the user stalls.

Olive filled + neutral secondary

Book Maya

Message

The default pairing. The secondary recedes without disappearing.

Olive filled + olive outline

Confirm

Change time

Same hue, lighter weight. Use when both actions belong to the same task.

Two filled primaries

Book Maya

Message

Equal weight, no hierarchy. Demote one to secondary or outline.

Persimmon + olive in one group

Get $10 off

Book Maya

Two saturated fills compete. Persimmon belongs on its own.

## Where persimmon belongs

One persimmon moment per screen, at most.

A standalone urgent action

Book for today

Nothing else competes in the group.

A single promo badge

$10 off first booking

Metadata, not an action.

A save / favorite state

Saved

Persimmon reads as human warmth here, not urgency.

Persimmon as the default CTA

Book Maya

Book Devon

If everything is urgent, nothing is. Olive is the CTA color.

## Choosing the secondary

Beside a filled olive primary, in descending emphasis:

| Secondary | Use when | Example |
| --- | --- | --- |
| `secondary` | The second action is genuinely useful and often taken | Message |
| `outline` | Both actions belong to the same task | Change time |
| `accent-outline` | The second action is a save or reminder, not a step forward | Remind me |
| `ghost` | The action is an escape hatch — skip, cancel, not now | Skip |

## Accessibility

Accessibility

- White on --accent is 3.3:1 — it passes only at the 16px semibold weight buttons use. Never set small persimmon text on cream.
- Hierarchy must survive greyscale: a filled primary beside an outline still reads; two fills of equal value do not.
- Persimmon is also the danger-adjacent warm hue — keep destructive actions in --danger and do not blur the two.
- The accent focus ring (--focus-ring-accent) is used on persimmon controls so the ring stays visible against the fill.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/trust -->

Patterns

# Trust & verification

Trust is the product. Every verification signal in Vello uses a distinct shape as well as a color, so it survives greyscale, colorblindness and a bad phone screen in sunlight.

## The four statuses

Background-checked

Background-checked

Top-rated neighbor

Top-rated neighbor

Verification pending

Verification pending

Not yet verified

Not yet verified

| Status | Shape | Means |
| --- | --- | --- |
| `verified` | Olive shield | ID checked and background-checked by Vello |
| `top-rated` | Amber star seal | 4.8+ across 50 or more bookings in the last year |
| `pending` | Amber dashed circle | Documents submitted, check in progress |
| `unverified` | Neutral hollow circle | No check on file — shown, never hidden |

## Placement

Mark on the avatar, pill beside the name

MR

Maya Rivera

Background-checked

Background-checked

The first mention on a screen is labeled; later mentions can use the bare mark.

A bare green dot or check

MR

Maya Rivera

Green dot ≠ verified

Color-only signals fail in greyscale and read as “online”, not “background-checked”.

## Guidelines

Do

- Show unverified honestly — hiding it erodes the whole ladder.
- Explain what a status means on first use, in a tooltip or a line of copy.
- Let Avatar place the corner mark rather than overlaying your own badge.

Don't

- Do not invent a fifth status.
- Do not soften "Not yet verified" to something vaguer.
- Do not use the shield shape for anything other than a completed background check.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/scroll-affordance -->

Patterns

# Scroll affordance

A horizontal row only works if it looks scrollable. Two signals are required together: a soft edge fade on the side with more content, and a next item peeking in by roughly 30%.

## Both signals, always

Fade + peek

Dog walking

Cleaning

Handyperson

Rides

Tutoring

Yard work

The half-shown chip is what tells people the row continues.

Everything fits exactly

Dog walking

Cleaning

Handyperson

A row that ends cleanly at the edge reads as complete. Users never swipe.

## Match the fade to the surface

The fade is a gradient to a solid color. If that color is not the background behind the row, you get a visible band.

```
{/* on the cream app background — default */}
<ScrollRow>{chips}</ScrollRow>

{/* inside a white card */}
<ScrollRow fade="var(--surface-card)">{cards}</ScrollRow>
```

jsx

Copy

## Sizing the peek

| Content | Item width | Result |
| --- | --- | --- |
| Provider cards | `min-width: 72–78%` | One full card plus a clear sliver of the next |
| Chips | `natural width` | The row overflows naturally; keep 6+ chips |
| Image tiles | `fixed 140–160px` | About 2.5 tiles visible in a 390px frame |

## Accessibility

Accessibility

- Every item stays in the tab order; focusing an off-screen item scrolls it into view.
- Never make a scroll row the only path to content — pair it with a "See all" link.
- The fade is decorative and must not sit over text at rest.
- Snap points align to item starts so keyboard scrolling never leaves an item half-cut.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/tappable-cards -->

Patterns

# Tappable cards

If a whole card navigates, say so. Vello marks tappable surfaces with a chevron and a hover lift, and keeps exactly one primary destination per card.

## Signal the target

Chevron + lift

Booking history

14 bookings since March

tappable adds the chevron; interactive adds the lift and pointer.

Silently clickable

Booking history

14 bookings since March

No affordance, no discovery. Users read it as a static panel.

## One destination per card

A card with its own buttons inside a tappable card creates ambiguous targets. Either the card navigates, or the buttons act — pick one.

Card navigates, one action escapes

Maya Rivera

Dog walker · 0.4 mi

Book

The Book button stops propagation and sits 12px clear of the card edge.

Three nested targets

Maya Rivera

Dog walker · 0.4 mi

Book

Message

Save

Every tap becomes a guess.

## Accessibility

Accessibility

- Render a tappable card as as="a" or as="button" — a div with onClick is invisible to keyboards and screen readers.
- The accessible name is the card heading; the chevron is decorative.
- Nested actions need their own focus stop and at least 8px of separation from other targets.
- The hover lift is paired with a border change so the state is not motion-only.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/voice -->

Brand

# Voice & tone

Warm, plain-spoken, neighbor-to-neighbor. Vello writes the way someone two doors down would talk to you — specific, unhurried, never salesy.

## Say this, not that

✓

Find help on your block.

Plain, local, active

✕

Leverage our marketplace.

Jargon, cold

✓

Maya can come by at 3.

Real names, specific

✕

A provider is available.

Faceless, generic

✓

You’re all set — see you Tuesday!

Friendly, reassuring

✕

Booking confirmation #2048.

Robotic

✓

No matches for “midnight dog walk”.

Names the situation

✕

Oops! Nothing here.

Cute, unhelpful

## Rules

Do

- Sentence case everywhere — headings, buttons, labels, toasts.
- Use real names and real times: "Maya, Tuesday at 3".
- Say what happens next after every action.
- Keep supporting copy to one or two lines.

Don't

- No marketplace jargon: provider-side, leverage, seamless, unlock.
- No exclamation stacking, no "Oops".
- No blaming the user in error copy.
- No emoji in product UI.

## Applied: empty states

#### The voice doing work

Same component, same layout — the copy is what makes it Vello.

No verified neighbors on your block yet

Be the first to vouch for someone — invite a neighbor you trust.

Invite a neighbor
