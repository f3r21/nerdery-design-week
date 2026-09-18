# Vello Design System — ProviderCard

**Source:** https://vello-design-system.vercel.app/docs/index.html#/provider-card  
**Extracted:** 2026-09-17

The rendered ProviderCard page, then its usage notes, props and source. Switch this source off in the Friday notebook.

---

<!-- https://vello-design-system.vercel.app/docs/index.html#/provider-card -->

Components · Cards

# ProviderCard

The signature Vello listing — photo, trust mark, rating, distance, price and a book CTA in one row. Composes Avatar, Rating, Badge and Button.

Composed

featured slot

app kit

```
const { ProviderCard } = window.VelloDesignSystem_182a1b;
```

import

Copy

## Usage

#### Default

Show code

MR

Maya Rivera

Available

Dog walker · 3 yrs

4.9

(

213

)

0.4

mi

Brings supplies

Pet first-aid

$

28

per

hr

Book

#### Featured

The brand-glow treatment for one promoted slot per list. Never two.

Show code

DC

Devon Clarke

House cleaning · 6 yrs

4.8

(

91

)

1.1

mi

$

35

per

hr

Book Devon

#### Minimal

Everything but name, service and rating is optional. Drop price and distance in contexts where they are already known.

Show code

AS

Ana Silva

Tutor · Math, 4–8th grade

5.0

(

12

)

Book

## Props

All other native attributes are forwarded to the underlying element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name`REQ | `string` | — | Provider name. |
| `service`REQ | `string` | — | Service line, e.g. "Dog walker · 3 yrs". |
| `rating`REQ | `number` | — | Star score, e.g. 4.9. |
| `photo` | `string` | — | Photo URL. Initials fallback if omitted. |
| `reviews` | `number` | — | Review count. |
| `distance` | `number` | — | Distance in miles. |
| `price` | `number` | — | Hourly price, rendered as $price/unit. |
| `priceUnit` | `string` | 'hr' | Price unit. |
| `verified` | `boolean` | false | Shows the background-checked mark on the avatar. |
| `available` | `boolean` | false | Shows the live "Available" badge. |
| `featured` | `boolean` | false | Applies the brand-glow promoted treatment. |
| `interactive` | `boolean` | true | Hover-lift and pointer. |
| `badges` | `string[]` | — | Small neutral metadata chips. |
| `ctaLabel` | `string` | 'Book' | Primary CTA label. |
| `onBook` | `() => void` | — | Primary CTA handler. |
| `onMessage` | `() => void` | — | Secondary action handler. |

## Guidelines

Do

- Show verification and distance whenever you have them — they are why people book.
- Keep badges to two; they are metadata, not marketing.
- Use featured for at most one card per list and label it as promoted in the surrounding copy.

Don't

- Do not fake a rating for a new provider — omit it and let the card show no score.
- Do not set interactive on a card inside an already-tappable container.
- Do not use the persimmon accent for the Book CTA; it is an olive primary.

## Accessibility

Accessibility

- The card exposes one link (the provider) and one button (Book) — nested targets are spaced at least 8px apart.
- The verified mark is a shield shape with a label, not a green dot.
- Price and rating use tabular numerals so screen magnification keeps columns aligned.
- Ensure the photo has meaningful alt text or is marked decorative when the name is adjacent.

---

## Source

### `components/cards/ProviderCard.prompt.md`

```markdown
The signature Vello listing — one local provider with photo, rating, distance, price and a book CTA. Composes Avatar, Rating, Badge and Button.

```jsx
<ProviderCard
  name="Maya Rivera" service="Dog walker · 3 yrs"
  rating={4.9} reviews={213} distance={0.4} price={28}
  verified available badges={["Brings supplies","Pet-first aid"]}
  onBook={() => book(maya)} />
```

Use `featured` for the brand-glow promoted slot. Set `interactive={false}` inside a non-clickable context.
```

### `components/cards/ProviderCard.d.ts`

```ts
import React from 'react';

/**
 * Props for the Vello ProviderCard — the signature local-provider listing.
 *
 * @startingPoint section="Vello App" subtitle="Provider listing row — avatar, rating, price, CTA" viewport="700x140"
 */
export interface ProviderCardProps {
  /** Provider name. */
  name: string;
  /** Photo URL (initials fallback if omitted). */
  photo?: string;
  /** Service line, e.g. "Dog walker · 3 yrs". */
  service: string;
  /** Star score, e.g. 4.9. */
  rating: number;
  /** Review count. */
  reviews?: number;
  /** Distance in miles. */
  distance?: number;
  /** Hourly price (number, rendered as $price/unit). */
  price?: number;
  /** Price unit. @default "hr" */
  priceUnit?: string;
  /** Show verified (background-checked) badge on avatar. */
  verified?: boolean;
  /** Show "Available" live badge. */
  available?: boolean;
  /** Apply the brand-glow featured treatment. */
  featured?: boolean;
  /** Hover-lift + pointer. @default true */
  interactive?: boolean;
  /** Small neutral metadata chips, e.g. ["Brings supplies","Pet-friendly"]. */
  badges?: string[];
  /** Primary CTA label. @default "Book" */
  ctaLabel?: string;
  onBook?: () => void;
  onMessage?: () => void;
  className?: string;
}

export function ProviderCard(props: ProviderCardProps): JSX.Element;
```

### `components/cards/ProviderCard.jsx`

```jsx
import React from 'react';
import { Avatar } from '../display/Avatar.jsx';
import { Rating } from '../display/Rating.jsx';
import { Badge } from '../display/Badge.jsx';
import { Button } from '../buttons/Button.jsx';

const PROVIDER_CSS = `
.vl-provider {
  display: flex; gap: 14px; align-items: flex-start;
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 16px;
  transition: transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard);
}
.vl-provider--interactive { cursor: pointer; }
.vl-provider--interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: transparent; }
.vl-provider--featured { box-shadow: var(--shadow-brand); border-color: transparent; }
.vl-provider__body { flex: 1; min-width: 0; }
.vl-provider__top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.vl-provider__name { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-lg); color: var(--text-strong); letter-spacing: -0.01em; }
.vl-provider__service { font-size: var(--text-sm); color: var(--text-muted); }
.vl-provider__meta { display: flex; align-items: center; gap: 12px; margin-top: 6px; flex-wrap: wrap; }
.vl-provider__dist { display: inline-flex; align-items: center; gap: 4px; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
.vl-provider__dist svg { width: 13px; height: 13px; }
.vl-provider__badges { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.vl-provider__aside { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex: none; }
.vl-provider__price { text-align: right; line-height: 1; }
.vl-provider__price b { font-family: var(--font-mono); font-weight: var(--fw-semibold); font-size: var(--text-xl); color: var(--text-strong); white-space: nowrap; }
.vl-provider__price span { font-size: var(--text-xs); color: var(--text-muted); display: block; margin-top: 3px; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello ProviderCard — the signature listing for a local service provider. */
export function ProviderCard({
  name, photo, service, rating, reviews, distance,
  price, priceUnit = 'hr', verified = false, available = false,
  featured = false, interactive = true, badges = [],
  ctaLabel = 'Book', onBook, onMessage, className = '',
}) {
  inject('vl-provider-css', PROVIDER_CSS);
  const cls = ['vl-provider', interactive ? 'vl-provider--interactive' : '',
    featured ? 'vl-provider--featured' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <Avatar src={photo} name={name} size="lg" verified={verified} />
      <div className="vl-provider__body">
        <div className="vl-provider__top">
          <span className="vl-provider__name">{name}</span>
          {available ? <Badge variant="brand" size="sm" dot>Available</Badge> : null}
        </div>
        <div className="vl-provider__service">{service}</div>
        <div className="vl-provider__meta">
          <Rating value={rating} count={reviews} size="sm" />
          {distance != null ? (
            <span className="vl-provider__dist"><i data-lucide="map-pin"></i>{distance} mi</span>
          ) : null}
        </div>
        {badges.length ? (
          <div className="vl-provider__badges">
            {badges.map((b, i) => <Badge key={i} variant="neutral" size="sm">{b}</Badge>)}
          </div>
        ) : null}
      </div>
      <div className="vl-provider__aside">
        {price != null ? (
          <div className="vl-provider__price"><b>${price}</b><span>per {priceUnit}</span></div>
        ) : null}
        <Button size="sm" variant="primary" onClick={onBook}>{ctaLabel}</Button>
      </div>
    </div>
  );
}
```
