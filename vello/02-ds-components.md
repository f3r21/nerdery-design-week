# Vello Design System — components

**Source:** https://vello-design-system.vercel.app/docs/index.html#/button  
**Extracted:** 2026-09-17

The rendered documentation page of every component except ProviderCard, which is source 03 so it can be switched off. Each page carries its usage rules, props and states as the site presents them.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/button -->

Components · Buttons

# Button

Pill-shaped action control. One filled olive primary leads each surface; everything else supports it.

6 variants

3 sizes

button / a

```
const { Button } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

Variant carries hierarchy, size carries context. A sheet or mobile CTA is lg and fullWidth; a toolbar action is sm and ghost.

#### Variants

Emphasis order: primary → accent → secondary → outline → accent-outline → ghost.

Show code

Book Maya

Get $10 off

Message

Save

Remind me

Skip

#### Sizes

sm 36px · md 44px · lg 52px. md and up meet the 44px tap target.

Show code

Search

Book now

Continue

#### Icons

Pass Lucide nodes. Icons clarify the action — they never replace the label.

Show code

Book now

See all

Save

#### States

Hover lifts, press settles, disabled drops to 45% and blocks pointer events.

Show code

Default

Disabled

Disabled

#### Full width

For bottom sheets and mobile CTAs. Stack with 12px gap, primary on top.

Show code

Confirm booking · $28/hr

Message Maya first

#### As a link

as="a" renders an anchor with identical styling — use it whenever the action navigates.

Show code

Browse neighbors

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'accent-outline' \| 'outline' \| 'ghost'` | 'primary' | Visual style. outline is an olive outline; accent-outline is the persimmon outline used as a low-key secondary beside a filled olive primary. |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | Control height. |
| `fullWidth` | `boolean` | false | Stretch to fill the container width. |
| `leadingIcon` | `ReactNode` | — | Icon rendered before the label. |
| `trailingIcon` | `ReactNode` | — | Icon rendered after the label. |
| `as` | `'button' \| 'a'` | 'button' | Render element. Pass href alongside as="a". |
| `children` | `ReactNode` | — | Label text. Sentence case, verb-led. |

## Guidelines

Do

- Lead every surface with exactly one filled olive primary.
- Pair a primary with a secondary, outline or ghost button.
- Write verb-led labels that name the outcome: "Book Maya", "Confirm booking".
- Use fullWidth lg buttons in sheets and at the bottom of mobile screens.

Don't

- Never place two filled primaries side by side.
- Never put persimmon and olive in the same button group — persimmon is a standalone moment.
- Do not use ghost buttons as the only action on a screen; they read as optional.
- Do not put sentence-length copy in a button — move it to the supporting line.

## Accessibility

Accessibility

- md and lg meet the 44px minimum tap target; sm is 36px and is only for dense desktop toolbars.
- Focus renders a 3px --focus-ring; it is never removed on mouse focus without a :focus-visible equivalent.
- Disabled buttons set the disabled attribute — they are removed from the tab order and announced as unavailable.
- Icon-only actions belong to IconButton, which requires a label; Button always needs visible text.
- White on --brand-primary is 4.6:1; white on --accent is 3.3:1, which passes only at the 16px semibold used in buttons.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/icon-button -->

Components · Buttons

# IconButton

Circular single-icon control for compact actions — favorite, share, back, more. Keeps a 44px tap target even at sm.

3 variants

3 sizes

label required

```
const { IconButton } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Variants

Show code

#### Sizes

The visual circle shrinks; the hit area does not.

Show code

#### Over imagery

ghost sits on photos; give it a scrim if the image is busy.

Show code

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label`REQ | `string` | — | Accessible name. There is no visible text, so this is required. |
| `variant` | `'default' \| 'solid' \| 'ghost'` | 'default' | default is white and bordered; solid is an olive fill; ghost is transparent for toolbars over imagery. |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | Visual size. The tap target stays at 44px. |
| `children` | `ReactNode` | — | The icon node. |

## Guidelines

Do

- Always pass label — it becomes the accessible name and the tooltip.
- Use for universally understood glyphs only: back, close, share, favorite, more.
- Group at most three in a row; beyond that use a menu.

Don't

- Do not use an IconButton for the primary action on a screen.
- Do not invent glyphs — stay inside the Lucide set the system ships with.
- Do not rely on a color change alone to show the favorited state; change the icon fill too.

## Accessibility

Accessibility

- label is rendered as aria-label and title — screen readers and hover tooltips both work.
- Tap target is 44×44 at every size, padded beyond the visible circle where needed.
- Toggle buttons (favorite, save) should also set aria-pressed from product code.
- ghost over photography needs a scrim or an outlined variant to hold 3:1 against the image.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/input -->

Components · Forms

# Input

Labeled text field for forms and search, with leading/trailing icons, hint and error states.

```
const { Input } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Anatomy

Label above, control, hint below. The hint slot is replaced by the error message.

Show code

Where do you need help?

We only show this to providers you book.

#### States

Show code

Email

*

Email

*

That email looks off

Neighborhood

#### Search

The ubiquitous Vello search bar: leading search glyph, no label, placeholder that names a real task.

Show code

## Props

Extends all native input attributes — type, value, onChange, placeholder, disabled.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | — | Field label rendered above the control and wired to it. |
| `hint` | `string` | — | Helper text below the field. |
| `error` | `string` | — | Error message. Turns the field red and replaces the hint. |
| `required` | `boolean` | false | Shows a required asterisk. |
| `leadingIcon` | `ReactNode` | — | Icon before the input. |
| `trailingIcon` | `ReactNode` | — | Icon after the input. |

## Guidelines

Do

- Always give a visible label, except for a search field where the icon and placeholder carry the meaning.
- Write errors as plain guidance: "That email looks off", not "Invalid input".
- Use placeholders for examples, never for the label.

Don't

- Do not validate on every keystroke; validate on blur or submit.
- Do not use color alone for the error state — the message text is required.
- Do not stack more than six fields without a section break.

## Accessibility

Accessibility

- label is associated with the control via htmlFor/id, so tapping the label focuses the field.
- error is announced: the message is linked with aria-describedby and the field sets aria-invalid.
- Field height is 44px so the control is comfortably tappable.
- Placeholder text uses --text-subtle and is never the only description of a field.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/checkbox -->

Components · Forms

# Checkbox

Custom olive check with an optional two-line label. Use in filters, preferences and consent rows.

```
const { Checkbox } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Basic and described

Show code

Background-checked only

Bring own supplies

Provider arrives with everything needed

Weekend availability

## Props

Extends all native input attributes — checked, defaultChecked, onChange, disabled.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Primary label text. |
| `description` | `ReactNode` | — | Secondary line. Promotes the label to a bold heading. |

## Guidelines

Do

- Use for choices that apply on submit, or filters applied with an "Apply" action.
- Write labels as positive statements so checked always means yes.
- Give the whole row a tappable label.

Don't

- Do not use a checkbox for an instantly-applied setting — that is a Switch.
- Do not nest checkbox groups more than one level.

## Accessibility

Accessibility

- The native input stays in the DOM, so keyboard, space toggling and screen readers work unmodified.
- The label wraps the control, giving a full-width 44px tap row.
- The checked state is a shape (check glyph) plus color, not color alone.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/switch -->

Components · Forms

# Switch

On/off toggle for settings that take effect immediately — notifications, availability, repeat booking.

```
const { Switch } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Switch

Show code

Notify me about new sitters

Show my availability to neighbors

Auto-rebook weekly

## Props

Extends all native input attributes — checked, defaultChecked, onChange, disabled.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Optional trailing label. |

## Guidelines

Do

- Use only where the change saves instantly.
- Label the thing being turned on, not the action: "Weekly reminders", not "Turn on reminders".
- Show the resulting state in the label when it is ambiguous.

Don't

- Do not pair a switch with a Save button.
- Do not use a switch for a destructive setting without a confirmation.

## Accessibility

Accessibility

- Backed by a native checkbox input with role semantics intact.
- State is conveyed by knob position and color together.
- Row height is 44px for the tap target.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/tag -->

Components · Display

# Tag

Selectable chip for service categories and filters — toggles between default and olive-selected.

```
const { Tag } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Selection

Show code

Dog walking

Cleaning

Handyperson

Rides

#### Removable and read-only

onRemove renders an × for applied filters; interactive={false} makes a display label.

Show code

Under $30

Within 1 mi

Pet-friendly

## Props

Extends all native button attributes.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `selected` | `boolean` | false | Active filter state. |
| `icon` | `ReactNode` | — | Leading icon node. |
| `onRemove` | `(e) => void` | — | When provided, renders a removable × button and calls this on click. |
| `interactive` | `boolean` | true | Set false for a non-clickable display chip. |

## Guidelines

Do

- Put category chips in a ScrollRow so the overflow is discoverable.
- Use selected for active filters and onRemove for applied ones — not both patterns in the same row.
- Keep labels to one or two words.

Don't

- Do not use Tag for status — that is Badge.
- Do not make a read-only chip look tappable; pass interactive={false}.
- Do not exceed roughly eight chips in a filter row.

## Accessibility

Accessibility

- Selected state uses fill plus a check-weight border change, not color alone.
- Chips are real buttons — reachable by keyboard and announced as pressed when selected.
- The remove × has its own accessible name and its own 44px target.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/badge -->

Components · Display

# Badge

Compact pill for status and metadata — verification, availability, distance, promo flags.

```
const { Badge } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Variants

Show code

0.4 mi

Available now

Background-checked

New

Pending

Cancelled

$10 off

Top rated

#### Sizes

Show code

0.4 mi

0.4 mi

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'neutral' \| 'brand' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'accent' \| 'solid'` | 'neutral' | Color intent, mapped to the status palette. |
| `size` | `'sm' \| 'md'` | 'md' | Pill size. |
| `dot` | `boolean` | false | Leading status dot for live states. |
| `icon` | `ReactNode` | — | Leading icon, used for trust signals. |

## Guidelines

Do

- Pair status color with an icon or dot so meaning is not color-only.
- Keep badge text to three words.
- Use neutral for plain metadata like distance or duration.

Don't

- Do not use more than two badges on a single card.
- Do not use accent badges for anything but a time-limited offer.
- Do not use Badge as a button — it is not interactive.

## Accessibility

Accessibility

- Badges are text, so they are read in document order — place them after the thing they describe.
- The dot is decorative; the label carries the meaning.
- Every variant meets 4.5:1 for its text on its tint.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/rating -->

Components · Display

# Rating

Amber star rating with an optional numeric score and review count — used everywhere providers appear.

```
const { Rating } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Variants

Show code

4.9

(

213

)

4.5

5.0

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Score, e.g. 4.9. |
| `max` | `number` | 5 | Maximum stars. |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | Glyph size. |
| `showValue` | `boolean` | true | Show the numeric value beside the stars. |
| `count` | `number` | — | Review count, rendered as "(213)". |
| `starsOnly` | `boolean` | false | Stars only — no number or count. |

## Guidelines

Do

- Show the review count whenever you have one; a bare 5.0 from two reviews is misleading.
- Use starsOnly in dense rows where the number is repeated nearby.
- Round to one decimal.

Don't

- Do not show a rating for a provider with no reviews — show a "New" badge instead.
- Do not recolor the stars; amber is the rating color across the system.

## Accessibility

Accessibility

- The numeric value is the accessible content — stars alone are not readable, so keep showValue on unless the score is adjacent in text.
- Amber on cream meets 3:1 as a graphical object; the number carries the 4.5:1 text contrast.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/avatar -->

Components · Display

# Avatar

Round provider or neighbor avatar with an initials fallback and an optional trust or availability indicator.

```
const { Avatar } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Sizes

Show code

MR

MR

MR

MR

MR

#### Indicators

badge takes precedence over online. Each status is a distinct shape as well as a color.

Show code

MR

DC

AS

RV

SW

#### Initials fallback

With no src, initials are derived from name on a tinted ground.

Show code

PR

J

MB

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | Image URL. Initials from name are shown if omitted. |
| `name` | `string` | — | Full name — drives initials and alt text. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 'md' | Diameter. |
| `badge` | `'verified' \| 'pending' \| 'top-rated' \| 'unverified'` | — | Trust mark in the corner — shape plus color. Takes precedence over online. |
| `verified` | `boolean` | false | Shorthand for badge="verified". |
| `online` | `boolean` | false | Availability dot. Ignored when a badge is set. |

## Guidelines

Do

- Always pass name, even with a photo — it drives alt text and the fallback.
- Use lg or xl on profile screens and md in lists.
- Let Avatar render the trust mark rather than overlaying your own.

Don't

- Do not show both a trust badge and an online dot; the badge wins by design.
- Do not crop non-square photos by stretching — the component covers and centers.
- Do not use avatars below xs; initials become unreadable.

## Accessibility

Accessibility

- Photos receive alt text from name; decorative avatars beside a visible name should be marked aria-hidden.
- Trust marks carry a title so the status is available to screen readers.
- The initials ground meets 4.5:1 against the initials text.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/verified-badge -->

Components · Display

# VerifiedBadge

Accessible trust mark for providers and neighbors. Never color alone — each status pairs a unique shape with its color so colorblind users can read it.

4 statuses

shape + color

mark or pill

```
const { VerifiedBadge, VerifiedMark } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Statuses

Shield, star, dashed circle, hollow circle — the shape carries the meaning.

Show code

Background-checked

Background-checked

Top-rated neighbor

Top-rated neighbor

Verification pending

Verification pending

Not yet verified

Not yet verified

#### Bare marks

VerifiedMark is the glyph alone — for avatar corners and inline name rows. It carries a paper-colored rim so it holds over a photo.

Show code

#### In context

Avatar renders the mark in its corner via badge/verified — do not place your own badge over an avatar.

Show code

MR

Maya Rivera

Dog walker · 0.4 mi

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `'verified' \| 'pending' \| 'top-rated' \| 'unverified'` | 'verified' | Trust status. Each maps to a distinct shape and color. |
| `size` | `'sm' \| 'md'` | 'md' | Pill size (VerifiedBadge). |
| `label` | `string` | — | Override the default label text for this status. |
| `markOnly` | `boolean` | false | Render just the shape glyph, no pill or text. |

## VerifiedMark props

The bare glyph, used inside Avatar and inline with names.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `VerifiedStatus` | 'verified' | Shield / star / dashed circle / hollow circle. |
| `size` | `number` | 16 | Pixel size of the square glyph. |
| `outline` | `boolean` | true | Paper-colored rim so the mark reads on top of photos. |
| `title` | `string` | — | Accessible label and tooltip. Defaults to the status label. |

## Guidelines

Do

- Show the labeled pill the first time a status appears on a screen; the bare mark can repeat after that.
- Let Avatar place the corner mark for you.
- Keep the outline rim on when the mark sits over photography.

Don't

- Never substitute a plain green dot or check for the shield — the shape is the accessible signal.
- Do not relabel a status to something softer; "Not yet verified" is deliberate.
- Do not place a separate badge element on top of an avatar.

## Accessibility

Accessibility

- Each status is distinguishable without color: shield, star, dashed circle and hollow circle read differently in greyscale.
- The mark exposes a title so hover and screen readers both surface the status.
- Pill text meets 4.5:1 on its tint; the mark meets 3:1 as a graphical object.
- The outline rim guarantees separation from any underlying photograph.

| Status | Shape + color | Default label |
| --- | --- | --- |
| `verified` | Olive shield, cream check | Background-checked |
| `pending` | Amber dashed circle, clock | Verification pending |
| `top-rated` | Amber star seal | Top-rated neighbor |
| `unverified` | Neutral hollow circle | Not yet verified |

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/card -->

Components · Cards

# Card

The base surface every other Vello card builds on. Elevation and padding are props, not one-off styles.

3 elevations

4 paddings

interactive

```
const { Card } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Elevation

flat is bordered and used on cream; raised and floating step up for popovers and sheets.

Show code

flat

Elm Heights

raised

Elm Heights

floating

Elm Heights

#### Interactive & tappable

interactive adds hover-lift and a pointer. tappable adds the chevron affordance so the whole card reads as a link.

Show code

Weekend availability

Hover to see the lift

Payment method

Visa ·· 4417

#### Full-bleed content

Set padding="none" when the card opens with an image or map header, then pad the content block yourself.

Show code

Elm Heights

42 verified neighbors nearby

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `elevation` | `'flat' \| 'raised' \| 'floating'` | 'flat' | Shadow level. |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | 'md' | Inner padding. |
| `interactive` | `boolean` | false | Adds hover-lift and pointer for clickable cards. |
| `tappable` | `boolean` | false | Shows the chevron affordance in the top-right. Pair with interactive. |
| `as` | `ElementType` | 'div' | Element tag — use "a" or "button" when the whole card is the control. |

## Guidelines

Do

- Use flat cards on cream and reserve raised for content that overlaps or floats.
- Give a tappable card a real focusable element (as="a" or as="button").
- Use padding="none" for image or map headers.

Don't

- Do not nest an elevated card inside another elevated card.
- Do not make a card interactive unless the whole surface navigates somewhere.
- Do not place two competing actions inside a tappable card — the nested click target gets lost.

## Accessibility

Accessibility

- A clickable card must be a link or button, not a div with onClick — keyboard users need it in the tab order.
- The chevron is decorative; the accessible name comes from the card heading.
- Hover-lift is accompanied by a border darkening so the state is not motion-only.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/tabs -->

Components · Navigation

# Tabs

Underline tab bar for switching between views of the same object — Upcoming / Past bookings, service categories.

```
const { Tabs } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Default

Show code

Upcoming

2

Past

Saved

Showing

upcoming

bookings.

#### Fill

Stretches tabs across the full width — the common mobile treatment.

Show code

Upcoming

2

Past

Saved

Showing

upcoming

bookings.

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items`REQ | `TabItem[]` | — | Each item: { id, label, icon?, count? }. |
| `value` | `string` | — | Active tab id. |
| `onChange` | `(id: string) => void` | — | Fired with the new tab id. |
| `fill` | `boolean` | false | Stretch tabs to fill the row equally. |

## Guidelines

Do

- Keep to two to four tabs; beyond that use a filter or a select.
- Use tabs for views of the same data, not for steps in a flow.
- Put the default view first and select it on load.

Don't

- Do not use tabs for primary app navigation — that is BottomNav.
- Do not change the tab set between renders; it disorients.
- Do not hide a destructive action behind a tab.

## Accessibility

Accessibility

- Tabs are buttons in a tablist; arrow keys move between them and the active tab sets aria-selected.
- The active state is an underline plus a weight change, not color alone.
- Counts are part of the accessible name, so "Upcoming, 2" is announced.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/bottom-nav -->

Components · Navigation

# BottomNav

Mobile bottom tab bar — the primary navigation for the Vello app. Handles the iOS safe-area inset automatically.

```
const { BottomNav } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Four destinations

Show code

home

Explore

2

Bookings

Messages

You

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items`REQ | `NavItem[]` | — | Each item: { id, label, icon?, badge? }. |
| `value` | `string` | — | Active destination id. |
| `onChange` | `(id: string) => void` | — | Fired with the new destination id. |

## Guidelines

Do

- Keep to three to five destinations.
- Always show both icon and label.
- Use badge only for counts the user must act on — messages, bookings.

Don't

- Do not hide the bar on scroll; it is the primary navigation.
- Do not put actions in the bar — it navigates, it does not act.
- Do not use persimmon badges for anything decorative.

## Accessibility

Accessibility

- Each destination is a 44px-tall target with the label always visible — no icon-only navigation.
- The active destination is marked with aria-current="page".
- The badge count is included in the accessible name: "Bookings, 2 new".
- Safe-area padding keeps targets clear of the iOS home indicator.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/scroll-row -->

Components · Navigation

# ScrollRow

A horizontally scrollable row that looks scrollable: a soft edge fade on whichever side has more content, plus scroll-snap.

edge fade

scroll-snap

~30% peek

```
const { ScrollRow } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

Two affordances are required together — the edge fade and a partially visible next item. Set fade to the surface color behind the row or the gradient will band.

#### Category chips

On the cream app background. Scroll right — the left fade appears once you move.

Show code

Dog walking

Cleaning

Handyperson

Rides

Tutoring

Yard work

#### Card rail inside a card

Match fade to the surface behind the row — here white, not cream.

Show code

MR

Maya Rivera

Dog walker

4.9

(

213

)

$

28

per

hr

Book

DC

Devon Clarke

Cleaning

4.8

(

91

)

$

35

per

hr

Book

AS

Ana Silva

Tutor

5.0

(

12

)

Book

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | The scrollable items. Each becomes a snap point. |
| `fade` | `string` | var(--color-bg) | Fade color — must match the surface behind the row. Pass var(--surface-card) inside a card. |
| `gap` | `string \| number` | 12px | Gap between items. |

## Guidelines

Do

- Size items so roughly 30% of the next one peeks in — cards at 72–78% width.
- Set fade to the actual background behind the row.
- Use for chips, popular-service rails and recently-viewed rows.

Don't

- Do not use a scroll row for a list the user must read completely.
- Do not fit all items exactly to the width — the peek is the affordance.
- Do not add arrow buttons on mobile; the fade and peek do the work.

## Accessibility

Accessibility

- The row is keyboard scrollable and each item stays in the tab order — nothing is hidden from focus.
- Focusing an off-screen item scrolls it into view; the snap alignment keeps it fully visible.
- The fade is decorative and never covers text at rest.
- Content in a scroll row must also be reachable another way — a "See all" link — for users who cannot drag.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/empty-state -->

Components · Feedback

# EmptyState

Friendly, on-voice view for when there is nothing to show yet. Always: an icon medallion, a clear headline, one supporting line, and a way forward.

3 tones

compact

voice-led

```
const { EmptyState } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Zero data

Show code

No verified neighbors on your block yet

Be the first to vouch for someone — invite a neighbor you trust.

Invite a neighbor

#### No results

Name what was searched and offer the specific loosening that would help.

Show code

No matches for “midnight dog walk”

Try a broader search or widen your distance to 2 mi.

Clear filters

#### First use & compact

compact shrinks the art and padding for in-card use.

Show code

Set up your neighborhood

Tell us where you live and we'll find trusted help within a few blocks.

Set my neighborhood

Skip for now

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | — | Icon node for the medallion. |
| `title` | `ReactNode` | — | Short, warm headline in sentence case. |
| `body` | `ReactNode` | — | One or two lines of supporting copy in the brand voice. |
| `tone` | `'brand' \| 'accent' \| 'neutral'` | 'brand' | Medallion color tone. accent only for time-sensitive prompts. |
| `compact` | `boolean` | false | Tighter padding and smaller art for inline or in-card use. |
| `actionLabel` | `string` | — | Primary button label. Omit for a display-only state. |
| `onAction` | `() => void` | — | Primary button handler. |
| `actionVariant` | `'primary' \| 'accent' \| 'secondary' \| 'outline' \| 'ghost'` | 'primary' | Primary button variant. |
| `secondaryLabel` | `string` | — | Low-emphasis text link below the primary action. |
| `onSecondary` | `() => void` | — | Secondary link handler. |

## Guidelines

Do

- Name the specific situation — quote the search term, name the block.
- Always offer one clear way forward.
- Keep body copy to one or two lines in the warm neighbor voice.

Don't

- Do not use "Oops" or "Nothing here yet" — say what is missing and why.
- Do not use tone="accent" for routine empties; persimmon stays rare.
- Do not show an empty state where a skeleton loader belongs — it is not a loading state.

## Accessibility

Accessibility

- The medallion icon is decorative; the headline is the accessible content.
- The headline should be a real heading element in the surrounding page structure.
- Announce the state change politely (aria-live="polite") when a list empties after a filter change.
- The primary action meets the 44px target and carries a verb-led label.
