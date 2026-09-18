# Vello — source code

**Source:** https://vello-design-system.vercel.app and Vello-Prototype.html  
**Extracted:** 2026-09-17

Token CSS, component source and props, both UI kits, and the prototype's screens and CSS. ProviderCard is in source 03. The documentation itself is sources 01, 02 and 04.

---

### `SKILL.md`

```markdown
---
name: vello-design
description: Use this skill to generate well-branded interfaces and assets for Vello, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick facts
- **Vello** — hyperlocal services app (dog walkers, cleaners, handypeople, tutors) connecting people to trusted local providers on their block.
- **Feel:** warm, human, neighborhood-grounded, trustworthy. Cream paper, emerald-pine green, persimmon accent, amber stars.
- **Fonts:** Bricolage Grotesque (display), Hanken Grotesk (UI/body), JetBrains Mono (data). Loaded from Google Fonts.
- **Icons:** Lucide (CDN).

## Files
- `styles.css` — link this; pulls in all tokens + fonts.
- `tokens/` — colors, typography, spacing/radii/shadows/motion, base utilities.
- `assets/` — logo mark, app icon, wordmark (SVG).
- `components/` — React primitives (Button, IconButton, Input, Checkbox, Switch, Avatar, Badge, Tag, Rating, Card, ProviderCard, Tabs, BottomNav). Each has a `.prompt.md` (usage) and `.d.ts` (props).
- `ui_kits/vello-app/` — interactive mobile app recreation.
- `ui_kits/vello-site/` — marketing landing page recreation.
- `guidelines/` — foundation specimen cards.

## Using components in a static HTML mock
Load React + Babel + Lucide, then the bundle, then read components off the namespace:
```html
<link rel="stylesheet" href="styles.css">
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, ProviderCard } = window.VelloDesignSystem_182a1b;
  // …render, then call lucide.createIcons() (use a small setInterval to catch re-renders)
</script>
```
When copying this skill out of the project, also copy the assets and token CSS you reference. Follow the voice, color, type and component rules in README.md exactly.
```

### `styles.css`

```css
/* ============================================================
   VELLO DESIGN SYSTEM · GLOBAL ENTRY
   Consumers link this one file. Import-only — no rules here.
   ============================================================ */

@import url('tokens/fonts.css');
@import url('tokens/colors.css');
@import url('tokens/typography.css');
@import url('tokens/spacing.css');
@import url('tokens/base.css');
```

### `tokens/colors.css`

```css
/* ============================================================
   VELLO · COLOR TOKENS
   Cozy, literary, neighborhood-grounded (Fable-inspired).
   Warm cream paper + deep forest brand + olive/moss primary
   action + persimmon accent + amber for ratings.
   ============================================================ */

:root {
  /* ---- Neutrals (warm cream + near-black ink) ---- */
  --ink-900: #1B1C18; /* primary text, near-black buttons */
  --ink-800: #292A24;
  --ink-700: #3D3F37; /* body text */
  --ink-600: #54564C;
  --ink-500: #6E7064; /* secondary text */
  --ink-400: #8D8F80; /* muted / placeholder */
  --ink-300: #B6B7A6;
  --ink-200: #D6D6C6; /* strong borders */
  --ink-150: #E5E4D6; /* default borders */
  --ink-100: #EFEEE1; /* hairlines, sunken fills */
  --paper:   #F6F2E7; /* app background — warm Fable cream */
  --paper-2: #EFEADB; /* deeper cream section band */
  --white:   #FFFFFF;

  /* ---- Forest (deep brand green: splash, hero, dark surfaces) ---- */
  --forest-900: #0E3A28;
  --forest-800: #16462F; /* splash / hero field */
  --forest-700: #1D5337;
  --forest-600: #266B49;
  --forest-300: #8FB6A2;
  --forest-100: #DCE9E1;

  /* ---- Green = olive / moss (PRIMARY action, selected, tints) ---- */
  --green-900: #2B3D15;
  --green-800: #38511E;
  --green-700: #466621; /* press / brand text */
  --green-600: #557E26; /* PRIMARY (olive CTA) */
  --green-500: #6E9A3A;
  --green-400: #8FB663;
  --green-300: #B6CF92;
  --green-200: #D7E3BD;
  --green-100: #EBF1DB;
  --green-50:  #F5F8EC;

  /* ---- Persimmon (warm human accent / secondary CTA) ---- */
  --coral-700: #C5421F;
  --coral-600: #E2552C;
  --coral-500: #F0623B; /* ACCENT */
  --coral-300: #F7A488;
  --coral-100: #FCE3D9;
  --coral-50:  #FEF1EB;

  /* ---- Amber (ratings, sunlight highlights) ---- */
  --amber-700: #C77F12;
  --amber-600: #E09A1F;
  --amber-500: #F4B740; /* star rating fill */
  --amber-100: #FCEFCF;

  /* ---- Sky (info, links, map accents) ---- */
  --sky-700: #235A93;
  --sky-600: #2D6FB5;
  --sky-100: #E1ECF7;

  /* ---- Red (danger) ---- */
  --red-700: #B23636;
  --red-600: #D64545;
  --red-100: #FBE3E3;

  /* ============================================================
     SEMANTIC ALIASES — reference these in components
     ============================================================ */

  /* Surfaces & background */
  --color-bg:           var(--paper);
  --color-bg-subtle:    var(--paper-2);
  --surface-card:       var(--white);
  --surface-raised:     var(--white);
  --surface-sunken:     var(--ink-100);
  --surface-inverse:    var(--ink-900);
  --surface-brand:      var(--green-600);
  --surface-brand-deep: var(--forest-800); /* splash, hero, dark bands */
  --surface-brand-tint: var(--green-100);
  --surface-accent-tint:var(--coral-100);

  /* Text */
  --text-strong:   var(--ink-900);
  --text-body:     var(--ink-700);
  --text-muted:    var(--ink-500);
  --text-subtle:   var(--ink-400);
  --text-inverse:  var(--white);
  --text-brand:    var(--green-700);
  --text-on-brand: var(--white);
  --text-on-deep:  var(--paper);
  --text-link:     var(--sky-600);

  /* Borders */
  --border-subtle:  var(--ink-100);
  --border-default: var(--ink-150);
  --border-strong:  var(--ink-200);
  --border-focus:   var(--green-600);

  /* Brand actions */
  --brand-primary:        var(--green-600);
  --brand-primary-hover:  var(--green-700);
  --brand-primary-press:  var(--green-800);
  --brand-primary-tint:   var(--green-100);
  --brand-on-primary:     var(--white);

  /* Accent (persimmon) */
  --accent:        var(--coral-500);
  --accent-hover:  var(--coral-600);
  --accent-press:  var(--coral-700);
  --accent-tint:   var(--coral-100);
  --accent-on:     var(--white);

  /* Status */
  --rating:        var(--amber-500);
  --info:          var(--sky-600);
  --info-tint:     var(--sky-100);
  --success:       var(--green-600);
  --success-tint:  var(--green-100);
  --warning:       var(--amber-600);
  --warning-tint:  var(--amber-100);
  --danger:        var(--red-600);
  --danger-tint:   var(--red-100);

  /* Focus ring (used as box-shadow) */
  --focus-ring: 0 0 0 3px rgba(85, 126, 38, 0.32);
  --focus-ring-accent: 0 0 0 3px rgba(240, 98, 59, 0.28);
}
```

### `tokens/typography.css`

```css
/* ============================================================
   VELLO · TYPOGRAPHY TOKENS
   ============================================================ */

:root {
  /* ---- Families ---- */
  --font-display: 'Bricolage Grotesque', 'Hanken Grotesk', system-ui, sans-serif;
  --font-sans:    'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  /* ---- Weights ---- */
  --fw-regular:  400; /* @kind other */
  --fw-medium:   500; /* @kind other */
  --fw-semibold: 600; /* @kind other */
  --fw-bold:     700; /* @kind other */
  --fw-extra:    800; /* @kind other */

  /* ---- Type scale (px) ---- */
  --text-2xs:  11px;
  --text-xs:   12px;
  --text-sm:   14px;
  --text-base: 16px;
  --text-md:   18px;
  --text-lg:   20px;
  --text-xl:   24px;
  --text-2xl:  30px;
  --text-3xl:  38px;
  --text-4xl:  48px;
  --text-5xl:  60px;
  --text-6xl:  76px;

  /* ---- Line heights ---- */
  --lh-tight:   1.05; /* @kind other */
  --lh-snug:    1.18; /* @kind other */
  --lh-normal:  1.45; /* @kind other */
  --lh-relaxed: 1.6;  /* @kind other */

  /* ---- Letter spacing ---- */
  --ls-tight:   -0.02em; /* @kind other */
  --ls-snug:    -0.01em; /* @kind other */
  --ls-normal:  0;       /* @kind other */
  --ls-wide:    0.04em;  /* @kind other */
  --ls-wider:   0.12em;  /* @kind other */

  /* ---- Semantic roles ---- */
  --display-font:   var(--font-display);
  --display-weight: var(--fw-bold);
  --heading-font:   var(--font-display);
  --heading-weight: var(--fw-semibold);
  --body-font:      var(--font-sans);
  --label-font:     var(--font-sans);
  --label-weight:   var(--fw-semibold);
  --mono-font:      var(--font-mono);
}
```

### `tokens/spacing.css`

```css
/* ============================================================
   VELLO · SPACING, RADII, SHADOWS, MOTION, LAYERS
   4px base rhythm.
   ============================================================ */

:root {
  /* ---- Spacing scale (4px base) ---- */
  --space-0:  0;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* ---- Corner radii (friendly, generous) ---- */
  --radius-xs:   6px;
  --radius-sm:   10px;
  --radius-md:   14px;  /* inputs, small controls */
  --radius-lg:   20px;  /* cards */
  --radius-xl:   28px;  /* feature cards, sheets */
  --radius-2xl:  36px;
  --radius-pill: 999px; /* chips, primary CTAs, avatars */

  /* ---- Shadows (soft, warm-tinted, low) ---- */
  --shadow-xs: 0 1px 2px rgba(25, 28, 25, 0.06);
  --shadow-sm: 0 2px 6px rgba(25, 28, 25, 0.07);
  --shadow-md: 0 6px 18px rgba(25, 28, 25, 0.09);
  --shadow-lg: 0 14px 34px rgba(25, 28, 25, 0.11);
  --shadow-xl: 0 26px 60px rgba(25, 28, 25, 0.16);
  /* press / focus inset for cream surfaces */
  --shadow-inset: inset 0 1px 2px rgba(25, 28, 25, 0.06);
  /* warm brand-tinted lift used on featured provider cards */
  --shadow-brand: 0 14px 34px rgba(85, 126, 38, 0.20);

  /* ---- Motion ---- */
  --dur-fast:  120ms; /* @kind other */
  --dur-base:  200ms; /* @kind other */
  --dur-slow:  320ms; /* @kind other */
  --ease-standard: cubic-bezier(0.2, 0.6, 0.2, 1);   /* @kind other */
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);    /* @kind other */
  --ease-spring:   cubic-bezier(0.34, 1.4, 0.5, 1);  /* @kind other */

  /* ---- Z layers ---- */
  --z-base:    1;    /* @kind other */
  --z-sticky:  100;  /* @kind other */
  --z-nav:     200;  /* @kind other */
  --z-overlay: 800;  /* @kind other */
  --z-modal:   900;  /* @kind other */
  --z-toast:   1000; /* @kind other */

  /* ---- Container widths ---- */
  --container-app:    430px;  /* @kind other */
  --container-narrow: 720px;  /* @kind other */
  --container-wide:   1200px; /* @kind other */
}
```

### `tokens/base.css`

```css
/* ============================================================
   VELLO · BASE ELEMENT STYLES + TYPE UTILITIES
   Ships with the system so every surface inherits the brand.
   ============================================================ */

*,
*::before,
*::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--lh-normal);
  font-weight: var(--fw-regular);
  color: var(--text-body);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--green-200); color: var(--ink-900); }

a { color: var(--text-link); text-decoration: none; }
a:hover { text-decoration: underline; }

h1, h2, h3, h4, h5 {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  color: var(--text-strong);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-snug);
  margin: 0;
  text-wrap: balance;
}

p { margin: 0; text-wrap: pretty; }

button { font-family: inherit; }

/* ---- Display / heading utilities ---- */
.v-display {
  font-family: var(--display-font);
  font-weight: var(--display-weight);
  font-size: var(--text-5xl);
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-tight);
  color: var(--text-strong);
}
.v-h1 { font-family: var(--heading-font); font-weight: var(--fw-bold); font-size: var(--text-4xl); line-height: var(--lh-snug); letter-spacing: var(--ls-snug); color: var(--text-strong); }
.v-h2 { font-family: var(--heading-font); font-weight: var(--fw-semibold); font-size: var(--text-2xl); line-height: var(--lh-snug); letter-spacing: var(--ls-snug); color: var(--text-strong); }
.v-h3 { font-family: var(--heading-font); font-weight: var(--fw-semibold); font-size: var(--text-xl); line-height: var(--lh-snug); color: var(--text-strong); }

/* ---- Body ---- */
.v-body    { font-size: var(--text-base); line-height: var(--lh-relaxed); color: var(--text-body); }
.v-body-sm { font-size: var(--text-sm);   line-height: var(--lh-normal);  color: var(--text-body); }
.v-muted   { color: var(--text-muted); }

/* ---- Eyebrow / label ---- */
.v-eyebrow {
  font-family: var(--label-font);
  font-weight: var(--fw-bold);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-brand);
}

/* ---- Mono (data) ---- */
.v-mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
```

### `tokens/fonts.css`

```css
/* ============================================================
   VELLO · FONTS
   Bricolage Grotesque (display) — characterful, contemporary, warm
   Hanken Grotesk (UI/body)      — clean, friendly, highly legible
   JetBrains Mono (data)         — prices, distances, codes
   Loaded from Google Fonts. See readme.md for self-hosting note.
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

### `components/buttons/Button.prompt.md`

```markdown
Primary pill-shaped action button — use for the main call to action on any Vello surface (Book now, Find help, Confirm).

```jsx
<Button variant="primary" size="lg" leadingIcon={<i data-lucide="calendar-check" />}>
  Book Maya
</Button>
```

Variants: `primary` (emerald, default CTA), `accent` (persimmon, secondary emphasis / promos), `secondary` (white w/ border), `outline` (green hairline, on tinted surfaces), `ghost` (text-only, toolbars). Sizes: `sm` `md` `lg`. Use `fullWidth` for sheet/mobile CTAs. Pass `as="a"` plus `href` for link buttons.
```

### `components/buttons/Button.d.ts`

```ts
import React from 'react';

/**
 * Props for the Vello Button.
 *
 * @startingPoint section="Buttons" subtitle="Pill action button — 6 variants, 3 sizes" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `outline` = olive outline; `accent-outline` = persimmon outline (the recommended low-key secondary next to a filled olive primary). @default "primary" */
  variant?: 'primary' | 'secondary' | 'accent' | 'accent-outline' | 'outline' | 'ghost';
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill container width. */
  fullWidth?: boolean;
  /** Icon node rendered before the label (e.g. <i data-lucide="search" />). */
  leadingIcon?: React.ReactNode;
  /** Icon node rendered after the label. */
  trailingIcon?: React.ReactNode;
  /** Render as a different element, e.g. "a" for links. @default "button" */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
```

### `components/buttons/Button.jsx`

```jsx
import React from 'react';

/* Inject component CSS once. */
function useVelloStyle(id, css) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const BTN_CSS = `
.vl-btn {
  --_bg: var(--brand-primary);
  --_fg: var(--brand-on-primary);
  --_bgh: var(--brand-primary-hover);
  --_bga: var(--brand-primary-press);
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border: 1.5px solid transparent; cursor: pointer; white-space: nowrap;
  background: var(--_bg); color: var(--_fg);
  border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard);
}
.vl-btn:hover { background: var(--_bgh); }
.vl-btn:active { background: var(--_bga); transform: translateY(1px) scale(0.99); }
.vl-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.vl-btn[disabled] { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
.vl-btn--full { width: 100%; }

/* sizes */
.vl-btn--sm { height: 36px; padding: 0 16px; font-size: var(--text-sm); }
.vl-btn--md { height: 46px; padding: 0 22px; font-size: var(--text-base); }
.vl-btn--lg { height: 54px; padding: 0 28px; font-size: var(--text-md); }

/* variants */
.vl-btn--accent { --_bg: var(--accent); --_fg: var(--accent-on); --_bgh: var(--accent-hover); --_bga: var(--accent-press); }
.vl-btn--accent-outline {
  --_bg: transparent; --_fg: var(--coral-700);
  --_bgh: var(--coral-50); --_bga: var(--coral-100);
  border-color: var(--coral-300);
}
.vl-btn--secondary {
  --_bg: var(--surface-card); --_fg: var(--text-strong);
  --_bgh: var(--surface-sunken); --_bga: var(--ink-100);
  border-color: var(--border-strong);
}
.vl-btn--outline {
  --_bg: transparent; --_fg: var(--text-brand);
  --_bgh: var(--brand-primary-tint); --_bga: var(--green-200);
  border-color: var(--green-300);
}
.vl-btn--ghost {
  --_bg: transparent; --_fg: var(--text-strong);
  --_bgh: var(--surface-sunken); --_bga: var(--ink-100);
}
.vl-btn svg, .vl-btn .vl-btn__icon { width: 1.15em; height: 1.15em; flex: none; }
`;

/**
 * Vello Button — primary action control.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  useVelloStyle('vl-btn-css', BTN_CSS);
  const Tag = as;
  const cls = [
    'vl-btn',
    `vl-btn--${variant}`,
    `vl-btn--${size}`,
    fullWidth ? 'vl-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {leadingIcon ? <span className="vl-btn__icon">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="vl-btn__icon">{trailingIcon}</span> : null}
    </Tag>
  );
}
```

### `components/buttons/IconButton.prompt.md`

```markdown
Circular single-icon control for compact actions (favorite, share, back, more) — keeps a 44px tap target even at small sizes.

```jsx
<IconButton label="Save to favorites" variant="default">
  <i data-lucide="heart" />
</IconButton>
```

Variants: `default` (white, bordered), `solid` (emerald fill), `ghost` (transparent, for toolbars over imagery). Always pass `label`. Sizes `sm` `md` `lg`.
```

### `components/buttons/IconButton.d.ts`

```ts
import React from 'react';

/** Props for the Vello IconButton. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "default" */
  variant?: 'default' | 'solid' | 'ghost';
  /** Size / tap target. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (required — there is no visible text). */
  label: string;
  /** The icon node, e.g. <i data-lucide="heart" />. */
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
```

### `components/buttons/IconButton.jsx`

```jsx
import React from 'react';

const ICONBTN_CSS = `
.vl-iconbtn {
  display: inline-grid; place-items: center; cursor: pointer;
  background: var(--surface-card); color: var(--text-body);
  border: 1.5px solid var(--border-strong); border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.vl-iconbtn:hover { background: var(--surface-sunken); }
.vl-iconbtn:active { transform: scale(0.93); }
.vl-iconbtn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.vl-iconbtn[disabled] { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.vl-iconbtn--sm { width: 34px; height: 34px; }
.vl-iconbtn--md { width: 44px; height: 44px; }
.vl-iconbtn--lg { width: 52px; height: 52px; }
.vl-iconbtn--sm svg, .vl-iconbtn--sm .vl-iconbtn__i { width: 16px; height: 16px; }
.vl-iconbtn--md svg, .vl-iconbtn--md .vl-iconbtn__i { width: 20px; height: 20px; }
.vl-iconbtn--lg svg, .vl-iconbtn--lg .vl-iconbtn__i { width: 24px; height: 24px; }
.vl-iconbtn--solid { background: var(--brand-primary); color: var(--brand-on-primary); border-color: transparent; }
.vl-iconbtn--solid:hover { background: var(--brand-primary-hover); }
.vl-iconbtn--ghost { background: transparent; border-color: transparent; }
.vl-iconbtn--ghost:hover { background: var(--surface-sunken); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello IconButton — square-tap circular control for a single icon action. */
export function IconButton({
  variant = 'default',
  size = 'md',
  label,
  className = '',
  children,
  ...rest
}) {
  inject('vl-iconbtn-css', ICONBTN_CSS);
  const cls = ['vl-iconbtn', `vl-iconbtn--${size}`,
    variant !== 'default' ? `vl-iconbtn--${variant}` : '', className].filter(Boolean).join(' ');
  return (
    <button className={cls} aria-label={label} {...rest}>
      <span className="vl-iconbtn__i">{children}</span>
    </button>
  );
}
```

### `components/cards/Card.prompt.md`

```markdown
Base surface container for grouping content — the foundation other Vello cards build on.

```jsx
<Card elevation="raised" padding="lg">…</Card>
<Card interactive onClick={open}>…</Card>
```

`elevation`: `flat` (bordered, default), `raised`, `floating`. `padding`: `none`→`lg`. Use `interactive` for tappable cards (adds hover-lift). Set `padding="none"` when the card contains a full-bleed image header.
```

### `components/cards/Card.d.ts`

```ts
import React from 'react';

/** Props for the Vello Card surface. */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Shadow level. @default "flat" */
  elevation?: 'flat' | 'raised' | 'floating';
  /** Inner padding. @default "md" */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds hover-lift + pointer for clickable cards. */
  interactive?: boolean;
  /** Show the tappable chevron affordance in the top-right of the content area. Pair with `interactive`. */
  tappable?: boolean;
  /** Element tag. @default "div" */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
```

### `components/cards/Card.jsx`

```jsx
import React from 'react';

const CARD_CSS = `
.vl-card {
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.vl-card--pad-sm { padding: 14px; }
.vl-card--pad-md { padding: 20px; }
.vl-card--pad-lg { padding: 28px; }
.vl-card--pad-none { padding: 0; }
.vl-card--flat { box-shadow: none; }
.vl-card--raised { box-shadow: var(--shadow-md); border-color: transparent; }
.vl-card--floating { box-shadow: var(--shadow-lg); border-color: transparent; }
.vl-card--interactive { cursor: pointer; transition: transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard); }
.vl-card--interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.vl-card--interactive:active { transform: translateY(0); }

/* Tappable affordance — subtle chevron, top-right of the content area */
.vl-card--tappable { position: relative; }
.vl-card__tap {
  position: absolute; top: 14px; right: 14px; z-index: 1;
  width: 26px; height: 26px; border-radius: var(--radius-pill);
  display: grid; place-items: center; flex: none;
  color: var(--text-subtle); background: var(--surface-sunken);
  transition: color var(--dur-fast) var(--ease-standard),
              background var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard);
}
.vl-card__tap svg { width: 15px; height: 15px; stroke-width: 2.4; }
.vl-card--interactive:hover .vl-card__tap { color: var(--text-brand); background: var(--brand-primary-tint); transform: translateX(1px); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Card — base surface container. */
export function Card({ elevation = 'flat', padding = 'md', interactive = false, tappable = false, as = 'div', className = '', children, ...rest }) {
  inject('vl-card-css', CARD_CSS);
  const Tag = as;
  const cls = ['vl-card', `vl-card--${elevation}`, `vl-card--pad-${padding}`,
    interactive ? 'vl-card--interactive' : '', tappable ? 'vl-card--tappable' : '', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {tappable ? <span className="vl-card__tap" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></span> : null}
      {children}
    </Tag>
  );
}
```

### `components/display/Avatar.prompt.md`

```markdown
Round provider/neighbor avatar with initials fallback and an optional verified or online indicator.

```jsx
<Avatar src={maya.photo} name="Maya R." size="lg" verified />
<Avatar name="Devon K." online />
```

Sizes `xs`→`xl`. `verified` shows the emerald check (background-checked); `online` shows an availability dot. Initials are used automatically when `src` is absent.
```

### `components/display/Avatar.d.ts`

```ts
import React from 'react';

/** Props for the Vello Avatar. */
export interface AvatarProps {
  /** Image URL. If omitted, initials from `name` are shown. */
  src?: string;
  /** Full name — drives initials fallback and alt text. */
  name?: string;
  /** @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Accessible trust mark in the corner (shape + color, not color alone). Takes precedence over `online`. */
  badge?: 'verified' | 'pending' | 'top-rated' | 'unverified';
  /** Back-compat shorthand for badge="verified" (background-checked provider). */
  verified?: boolean;
  /** Show a green online/available status dot (ignored if a badge is set). */
  online?: boolean;
  className?: string;
}

export function Avatar(props: AvatarProps): JSX.Element;
```

### `components/display/Avatar.jsx`

```jsx
import React from 'react';
import { VerifiedMark } from './VerifiedBadge.jsx';

const AVATAR_CSS = `
.vl-avatar { position: relative; display: inline-flex; flex: none; }
.vl-avatar__img, .vl-avatar__fallback {
  border-radius: 999px; object-fit: cover; display: grid; place-items: center;
  background: var(--green-200); color: var(--green-800);
  font-family: var(--font-display); font-weight: var(--fw-bold);
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.9);
}
.vl-avatar--xs .vl-avatar__img, .vl-avatar--xs .vl-avatar__fallback { width: 28px; height: 28px; font-size: 11px; }
.vl-avatar--sm .vl-avatar__img, .vl-avatar--sm .vl-avatar__fallback { width: 36px; height: 36px; font-size: 14px; }
.vl-avatar--md .vl-avatar__img, .vl-avatar--md .vl-avatar__fallback { width: 48px; height: 48px; font-size: 18px; }
.vl-avatar--lg .vl-avatar__img, .vl-avatar--lg .vl-avatar__fallback { width: 64px; height: 64px; font-size: 24px; }
.vl-avatar--xl .vl-avatar__img, .vl-avatar--xl .vl-avatar__fallback { width: 88px; height: 88px; font-size: 32px; }
.vl-avatar__badge {
  position: absolute; right: -3px; bottom: -3px;
  display: block; line-height: 0;
  filter: drop-shadow(0 1px 1.5px rgba(25,28,25,0.18));
}
.vl-avatar__badge svg { display: block; }
.vl-avatar--xs .vl-avatar__badge svg { width: 13px; height: 13px; }
.vl-avatar--sm .vl-avatar__badge svg { width: 16px; height: 16px; }
.vl-avatar--md .vl-avatar__badge svg { width: 20px; height: 20px; }
.vl-avatar--lg .vl-avatar__badge svg { width: 25px; height: 25px; }
.vl-avatar--xl .vl-avatar__badge svg { width: 32px; height: 32px; }
.vl-avatar__status {
  position: absolute; right: 0; bottom: 0; border-radius: 999px;
  background: var(--green-500); box-shadow: 0 0 0 2.5px var(--surface-card);
  width: 30%; height: 30%; min-width: 9px; min-height: 9px;
}
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}

/**
 * Vello Avatar — provider / neighbor photo with an optional accessible trust
 * mark or status dot. The trust mark pairs shape + color (never color alone).
 */
export function Avatar({ src, name = '', size = 'md', badge, verified = false, online = false, className = '' }) {
  inject('vl-avatar-css', AVATAR_CSS);
  // Back-compat: `verified` boolean maps to badge="verified".
  const status = badge || (verified ? 'verified' : null);
  const cls = ['vl-avatar', `vl-avatar--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {src
        ? <img className="vl-avatar__img" src={src} alt={name} />
        : <span className="vl-avatar__fallback" aria-label={name}>{initials(name)}</span>}
      {status ? (
        <span className="vl-avatar__badge"><VerifiedMark status={status} /></span>
      ) : online ? <span className="vl-avatar__status" /> : null}
    </span>
  );
}
```

### `components/display/Badge.prompt.md`

```markdown
Compact pill for status and metadata — verification, availability, distance, promo flags.

```jsx
<Badge variant="success" icon={<i data-lucide="shield-check" />}>Background-checked</Badge>
<Badge variant="brand" dot>Available now</Badge>
<Badge variant="accent">$10 off</Badge>
```

Variants map to the status palette (`success` `info` `warning` `danger`), plus `brand`, `accent`, `neutral`, and `solid`. Use `dot` for live-status, `icon` for trust signals.
```

### `components/display/Badge.d.ts`

```ts
import React from 'react';

/** Props for the Vello Badge. */
export interface BadgeProps {
  /** Color intent. @default "neutral" */
  variant?: 'neutral' | 'brand' | 'success' | 'info' | 'warning' | 'danger' | 'accent' | 'solid';
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Show a leading status dot. */
  dot?: boolean;
  /** Leading icon node, e.g. <i data-lucide="shield-check" />. */
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
```

### `components/display/Badge.jsx`

```jsx
import React from 'react';

const BADGE_CSS = `
.vl-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border-radius: var(--radius-pill); white-space: nowrap; line-height: 1;
}
.vl-badge--sm { font-size: 11px; padding: 4px 9px; }
.vl-badge--md { font-size: 13px; padding: 6px 12px; }
.vl-badge__dot { width: 7px; height: 7px; border-radius: 999px; background: currentColor; }
.vl-badge svg { width: 1em; height: 1em; }
.vl-badge--neutral { background: var(--surface-sunken); color: var(--text-muted); }
.vl-badge--brand   { background: var(--brand-primary-tint); color: var(--text-brand); }
.vl-badge--success { background: var(--success-tint); color: var(--green-700); }
.vl-badge--info    { background: var(--info-tint); color: var(--sky-700); }
.vl-badge--warning { background: var(--warning-tint); color: var(--amber-700); }
.vl-badge--danger  { background: var(--danger-tint); color: var(--red-700); }
.vl-badge--accent  { background: var(--accent-tint); color: var(--coral-700); }
.vl-badge--solid   { background: var(--brand-primary); color: #fff; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Badge — compact status / metadata pill. */
export function Badge({ variant = 'neutral', size = 'md', dot = false, icon = null, className = '', children }) {
  inject('vl-badge-css', BADGE_CSS);
  const cls = ['vl-badge', `vl-badge--${variant}`, `vl-badge--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {dot ? <span className="vl-badge__dot" /> : null}
      {icon}
      {children}
    </span>
  );
}
```

### `components/display/Rating.prompt.md`

```markdown
Amber star rating with optional numeric score and review count — used everywhere providers appear.

```jsx
<Rating value={4.9} count={213} />
<Rating value={5} size="sm" starsOnly />
```

`starsOnly` drops the number for tight rows. Pass `count` to show "(213)" reviews.
```

### `components/display/Rating.d.ts`

```ts
import React from 'react';

/** Props for the Vello Rating. */
export interface RatingProps {
  /** Score, e.g. 4.9. */
  value?: number;
  /** Max stars. @default 5 */
  max?: number;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Show the numeric value next to the stars. @default true */
  showValue?: boolean;
  /** Review count rendered as "(123)". */
  count?: number;
  /** Render only the star glyphs (no number/count). */
  starsOnly?: boolean;
  className?: string;
}

export function Rating(props: RatingProps): JSX.Element;
```

### `components/display/Rating.jsx`

```jsx
import React from 'react';

const RATING_CSS = `
.vl-rating { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-sans); }
.vl-rating__stars { display: inline-flex; gap: 1px; color: var(--rating); }
.vl-rating__stars svg { width: 1em; height: 1em; }
.vl-rating--sm { font-size: 14px; }
.vl-rating--md { font-size: 18px; }
.vl-rating--lg { font-size: 22px; }
.vl-rating__star-bg { color: var(--ink-200); }
.vl-rating__value { font-family: var(--font-mono); font-weight: var(--fw-semibold); color: var(--text-strong); font-variant-numeric: tabular-nums; }
.vl-rating__count { color: var(--text-muted); font-size: 0.82em; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

const Star = ({ fill }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke="none">
    <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 18.9 6.1 21.3l1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" />
  </svg>
);

/** Vello star Rating — amber stars with optional numeric value and review count. */
export function Rating({ value = 0, max = 5, size = 'md', showValue = true, count, starsOnly = false, className = '' }) {
  inject('vl-rating-css', RATING_CSS);
  const rounded = Math.round(value);
  return (
    <span className={['vl-rating', `vl-rating--${size}`, className].filter(Boolean).join(' ')}>
      <span className="vl-rating__stars" aria-label={`${value} out of ${max} stars`}>
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < rounded ? '' : 'vl-rating__star-bg'}><Star fill="currentColor" /></span>
        ))}
      </span>
      {!starsOnly && showValue ? <span className="vl-rating__value">{value.toFixed(1)}</span> : null}
      {!starsOnly && count != null ? <span className="vl-rating__count">({count})</span> : null}
    </span>
  );
}
```

### `components/display/Tag.prompt.md`

```markdown
Selectable chip for service categories and filters — toggles between default and emerald-selected.

```jsx
<Tag icon={<i data-lucide="dog" />} selected>Dog walking</Tag>
<Tag icon={<i data-lucide="sparkles" />}>Cleaning</Tag>
<Tag onRemove={() => removeFilter('under-$30')}>Under $30</Tag>
```

Use `selected` for active filters, `onRemove` for applied-filter chips, `interactive={false}` for read-only labels.
```

### `components/display/Tag.d.ts`

```ts
import React from 'react';

/** Props for the Vello Tag (category / filter chip). */
export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected (active filter) state. */
  selected?: boolean;
  /** Leading icon node, e.g. <i data-lucide="dog" />. */
  icon?: React.ReactNode;
  /** When provided, renders a removable × button and calls this on click. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Set false for a non-clickable display chip. @default true */
  interactive?: boolean;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
```

### `components/display/Tag.jsx`

```jsx
import React from 'react';

const TAG_CSS = `
.vl-tag {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--font-sans); font-weight: var(--fw-medium); font-size: var(--text-sm);
  padding: 8px 14px; border-radius: var(--radius-pill); cursor: pointer;
  background: var(--surface-card); color: var(--text-body);
  border: 1.5px solid var(--border-strong);
  transition: all var(--dur-fast) var(--ease-standard);
}
.vl-tag:hover { border-color: var(--green-300); background: var(--green-50); }
.vl-tag svg { width: 16px; height: 16px; }
.vl-tag--selected {
  background: var(--brand-primary-tint); color: var(--text-brand);
  border-color: var(--brand-primary); font-weight: var(--fw-semibold);
}
.vl-tag--selected:hover { background: var(--green-200); }
.vl-tag__remove { display: inline-grid; place-items: center; opacity: 0.6; }
.vl-tag__remove:hover { opacity: 1; }
.vl-tag--static { cursor: default; }
.vl-tag--static:hover { border-color: var(--border-strong); background: var(--surface-card); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Tag — selectable category / filter chip. */
export function Tag({ selected = false, icon = null, onRemove, interactive = true, className = '', children, ...rest }) {
  inject('vl-tag-css', TAG_CSS);
  const cls = ['vl-tag', selected ? 'vl-tag--selected' : '', !interactive ? 'vl-tag--static' : '', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-pressed={interactive ? selected : undefined} {...rest}>
      {icon}
      {children}
      {onRemove ? (
        <span className="vl-tag__remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }} aria-label="Remove">
          <i data-lucide="x"></i>
        </span>
      ) : null}
    </button>
  );
}
```

### `components/display/VerifiedBadge.prompt.md`

```markdown
Accessible trust mark for providers and neighbors. **Never color alone** — each status pairs a unique shape with its color so colorblind users can read it.

| status | shape + color | label |
|---|---|---|
| `verified` | olive **shield** + cream check | Background-checked |
| `pending` | amber **dashed circle** + clock | Verification pending |
| `top-rated` | amber **star/seal** | Top-rated neighbor |
| `unverified` | neutral **hollow circle** | Not yet verified |

```jsx
// Labeled pill beside a name
<VerifiedBadge status="verified" />
<VerifiedBadge status="top-rated" size="sm" />

// Bare glyph (corner of an avatar, inline with a name)
<VerifiedMark status="pending" size={18} />
```

The mark carries a paper-colored outline (`outline` default `true`) so it stays legible over a photo; the pill turns the outline off since it sits on a tinted chip. `Avatar` renders this mark in its corner via its `badge` / `verified` props — don't place a separate badge over an avatar yourself.
```

### `components/display/VerifiedBadge.d.ts`

```ts
import React from 'react';

export type VerifiedStatus = 'verified' | 'pending' | 'top-rated' | 'unverified';

/**
 * Props for the bare shape glyph.
 * @startingPoint section="Components" subtitle="Accessible trust mark — shape + color" viewport="520x200"
 */
export interface VerifiedMarkProps {
  /** Trust status. Each maps to a distinct SHAPE (shield / star / dashed circle / hollow circle) AND color. @default "verified" */
  status?: VerifiedStatus;
  /** Pixel size of the square glyph. @default 16 */
  size?: number;
  /** Draw a paper-colored rim so the mark reads on top of photos. @default true */
  outline?: boolean;
  /** Accessible label / tooltip. Defaults to the status's human label. */
  title?: string;
  className?: string;
}

/** Props for the labeled trust pill. */
export interface VerifiedBadgeProps {
  /** Trust status. @default "verified" */
  status?: VerifiedStatus;
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Override the default label text for this status. */
  label?: string;
  /** Render just the shape glyph (no pill / text) — e.g. as an Avatar corner badge. */
  markOnly?: boolean;
  className?: string;
}

/** The bare accessible shape glyph (shield / star / dashed circle / hollow circle). */
export function VerifiedMark(props: VerifiedMarkProps): JSX.Element;
/** Labeled trust pill: shape mark + readable text. */
export function VerifiedBadge(props: VerifiedBadgeProps): JSX.Element;
```

### `components/display/VerifiedBadge.jsx`

```jsx
import React from 'react';

/* ============================================================
   Vello VerifiedBadge — accessible trust mark.
   Pairs COLOR with distinct SHAPE so the status is legible to
   colorblind users (never color alone):
     verified    → olive SHIELD + cream check
     pending     → amber dashed CIRCLE + clock
     top-rated   → amber STAR/seal
     unverified  → neutral hollow CIRCLE
   Every mark carries a contrasting (paper) outline so it reads
   on top of any avatar photo.
   ============================================================ */

const VBADGE_CSS = `
.vl-vbadge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border-radius: var(--radius-pill); white-space: nowrap; line-height: 1;
}
.vl-vbadge--sm { font-size: 12px; padding: 5px 11px 5px 8px; }
.vl-vbadge--md { font-size: 13px; padding: 6px 13px 6px 9px; }
.vl-vbadge--verified   { background: var(--success-tint); color: var(--green-700); }
.vl-vbadge--pending    { background: var(--warning-tint); color: var(--amber-700); }
.vl-vbadge--top-rated  { background: var(--amber-100);    color: var(--amber-700); }
.vl-vbadge--unverified { background: var(--surface-sunken); color: var(--text-muted); }
.vl-vbadge__mark { flex: none; display: block; }
.vl-vmark { display: block; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

const LABELS = {
  verified: 'Background-checked',
  pending: 'Verification pending',
  'top-rated': 'Top-rated neighbor',
  unverified: 'Not yet verified',
};

/**
 * VerifiedMark — the bare shape glyph (no label). Used standalone, as the
 * leading glyph in VerifiedBadge, and as the corner badge on Avatar.
 * `outline` draws a paper-colored rim so it reads on photos.
 */
export function VerifiedMark({ status = 'verified', size = 16, outline = true, title, className = '' }) {
  inject('vl-vbadge-css', VBADGE_CSS);
  const rim = outline ? 'var(--surface-card)' : 'none';
  const rimW = outline ? 2.4 : 0;
  const cls = ['vl-vmark', className].filter(Boolean).join(' ');
  const common = {
    className: cls, width: size, height: size, viewBox: '0 0 24 24',
    role: 'img', 'aria-label': title || LABELS[status] || status,
  };

  if (status === 'verified') {
    return (
      <svg {...common}>
        {title ? <title>{title}</title> : null}
        <path d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z"
          fill="var(--green-600)" stroke={rim} strokeWidth={rimW} strokeLinejoin="round" />
        <path d="m8.4 12 2.5 2.5 4.7-5" fill="none" stroke="var(--paper)" strokeWidth="2.1"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'top-rated') {
    return (
      <svg {...common}>
        {title ? <title>{title}</title> : null}
        <path d="M12 2.4 14.7 8l6.1.9-4.4 4.3 1 6.1L12 16.4 6.6 19.3l1-6.1L3.2 8.9 9.3 8 12 2.4Z"
          fill="var(--amber-500)" stroke={rim} strokeWidth={rimW} strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'pending') {
    return (
      <svg {...common}>
        {title ? <title>{title}</title> : null}
        <circle cx="12" cy="12" r="9.2" fill="var(--white)" stroke={rim} strokeWidth={rimW} />
        <circle cx="12" cy="12" r="8" fill="none" stroke="var(--amber-600)" strokeWidth="1.8"
          strokeDasharray="2.6 2.4" strokeLinecap="round" />
        <path d="M12 7.6V12l3 1.8" fill="none" stroke="var(--amber-700)" strokeWidth="1.9"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  /* unverified */
  return (
    <svg {...common}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="9.2" fill="var(--white)" stroke={rim} strokeWidth={rimW} />
      <circle cx="12" cy="12" r="8" fill="none" stroke="var(--ink-300)" strokeWidth="1.8"
        strokeDasharray="2.4 2.6" strokeLinecap="round" />
      <path d="M9 12h6" fill="none" stroke="var(--ink-400)" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/**
 * VerifiedBadge — labeled trust pill: shape mark + readable text.
 * Use beside a name in lists, profiles, and confirmations.
 */
export function VerifiedBadge({ status = 'verified', size = 'md', label, markOnly = false, className = '' }) {
  inject('vl-vbadge-css', VBADGE_CSS);
  const text = label != null ? label : LABELS[status] || status;
  const markPx = size === 'sm' ? 15 : 17;
  if (markOnly) return <VerifiedMark status={status} size={markPx} title={text} className={className} />;
  const cls = ['vl-vbadge', `vl-vbadge--${status}`, `vl-vbadge--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <VerifiedMark status={status} size={markPx} outline={false} title={text} className="vl-vbadge__mark" />
      {text}
    </span>
  );
}
```

### `components/feedback/EmptyState.prompt.md`

```markdown
Friendly, on-voice view for when there's nothing to show yet. Always: a small icon medallion, a clear headline, one supporting line in the warm neighbor voice, and a primary action.

```jsx
// Zero items in a list
<EmptyState
  tone="brand"
  icon={<i data-lucide="users" />}
  title="No verified neighbors on your block yet"
  body="Be the first to vouch for someone — invite a neighbor you trust."
  actionLabel="Invite a neighbor"
  onAction={invite}
/>

// Zero search results
<EmptyState
  tone="neutral"
  icon={<i data-lucide="search-x" />}
  title="No matches for “midnight dog walk”"
  body="Try a broader search or widen your distance to 2 mi."
  actionLabel="Clear filters"
  actionVariant="secondary"
  onAction={reset}
/>

// First-use setup prompt
<EmptyState
  tone="brand"
  icon={<i data-lucide="map-pin-house" />}
  title="Set up your neighborhood"
  body="Tell us where you live and we'll find trusted help within a few blocks."
  actionLabel="Set my neighborhood"
  secondaryLabel="Skip for now"
  onAction={setup}
/>
```

Voice rules apply: sentence case, specific over generic, reassuring. Use `tone="accent"` only for time-sensitive / urgent prompts — keep persimmon rare. `compact` shrinks it for in-card use.
```

### `components/feedback/EmptyState.d.ts`

```ts
import React from 'react';

/**
 * Props for the Vello EmptyState.
 * @startingPoint section="Components" subtitle="Zero-data, no-results & first-use prompts" viewport="420x420"
 */
export interface EmptyStateProps {
  /** Icon node for the medallion, e.g. <i data-lucide="users" />. */
  icon?: React.ReactNode;
  /** Short, warm headline (sentence case). */
  title?: React.ReactNode;
  /** One or two lines of supporting copy in the brand voice. */
  body?: React.ReactNode;
  /** Medallion color tone. @default "brand" */
  tone?: 'brand' | 'accent' | 'neutral';
  /** Tighter padding + smaller art for inline / in-card use. */
  compact?: boolean;
  /** Primary button label. Omit for a display-only state. */
  actionLabel?: string;
  onAction?: () => void;
  /** Primary button variant. @default "primary" */
  actionVariant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost';
  /** Optional low-emphasis text link below the primary action. */
  secondaryLabel?: string;
  onSecondary?: () => void;
  className?: string;
  children?: React.ReactNode;
}

/** Friendly, on-voice empty / zero-data view. */
export function EmptyState(props: EmptyStateProps): JSX.Element;
```

### `components/feedback/EmptyState.jsx`

```jsx
import React from 'react';
import { Button } from '../buttons/Button.jsx';

/* ============================================================
   Vello EmptyState — friendly, on-voice empty / zero-data view.
   Icon medallion + headline + supporting copy + primary action.
   Tones: brand (olive wash) · accent (persimmon) · neutral.
   ============================================================ */

const EMPTY_CSS = `
.vl-empty {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 6px; padding: 32px 24px; max-width: 360px; margin-inline: auto;
}
.vl-empty--compact { padding: 22px 18px; }
.vl-empty__art {
  position: relative; width: 88px; height: 88px; border-radius: var(--radius-pill);
  display: grid; place-items: center; margin-bottom: 10px;
  background:
    radial-gradient(120% 120% at 50% 18%, var(--_wash) 0%, transparent 72%),
    var(--_disc);
  box-shadow: inset 0 0 0 1.5px var(--_ring);
}
.vl-empty--compact .vl-empty__art { width: 68px; height: 68px; }
.vl-empty__art svg { width: 36px; height: 36px; stroke-width: 2; color: var(--_icon); }
.vl-empty--compact .vl-empty__art svg { width: 28px; height: 28px; }
.vl-empty--brand   { --_wash: var(--green-200);  --_disc: var(--green-50);  --_ring: var(--green-200);  --_icon: var(--green-700); }
.vl-empty--accent  { --_wash: var(--coral-100);  --_disc: var(--coral-50);  --_ring: var(--coral-300);  --_icon: var(--coral-700); }
.vl-empty--neutral { --_wash: var(--ink-100);    --_disc: var(--surface-sunken); --_ring: var(--border-default); --_icon: var(--ink-500); }
.vl-empty__title {
  font-family: var(--font-display); font-weight: var(--fw-bold);
  font-size: var(--text-lg); line-height: var(--lh-snug);
  letter-spacing: var(--ls-snug); color: var(--text-strong); text-wrap: balance;
}
.vl-empty__body { font-size: var(--text-sm); line-height: var(--lh-normal); color: var(--text-muted); text-wrap: pretty; }
.vl-empty__actions { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: 14px; width: 100%; }
.vl-empty__secondary {
  background: none; border: none; cursor: pointer; padding: 6px 8px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold); font-size: var(--text-sm);
  color: var(--text-brand);
}
.vl-empty__secondary:hover { text-decoration: underline; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello EmptyState — zero-data, no-results, or first-use prompt. */
export function EmptyState({
  icon, title, body, tone = 'brand', compact = false,
  actionLabel, onAction, actionVariant = 'primary',
  secondaryLabel, onSecondary, className = '', children,
}) {
  inject('vl-empty-css', EMPTY_CSS);
  const cls = ['vl-empty', `vl-empty--${tone}`, compact ? 'vl-empty--compact' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {icon ? <div className="vl-empty__art">{icon}</div> : null}
      {title ? <div className="vl-empty__title">{title}</div> : null}
      {body ? <p className="vl-empty__body">{body}</p> : null}
      {children}
      {(actionLabel || secondaryLabel) ? (
        <div className="vl-empty__actions">
          {actionLabel ? <Button variant={actionVariant} size="md" onClick={onAction}>{actionLabel}</Button> : null}
          {secondaryLabel ? <button type="button" className="vl-empty__secondary" onClick={onSecondary}>{secondaryLabel}</button> : null}
        </div>
      ) : null}
    </div>
  );
}
```

### `components/forms/Checkbox.prompt.md`

```markdown
Checkbox with a custom emerald check and optional two-line label — use in filters, preferences, and consent rows.

```jsx
<Checkbox label="Background-checked only" defaultChecked />
<Checkbox label="Bring own supplies" description="Provider arrives with everything needed" />
```

Pass `checked`/`defaultChecked`, `onChange`, `disabled` as normal. Give `description` to render a bold label with a muted sub-line.
```

### `components/forms/Checkbox.d.ts`

```ts
import React from 'react';

/** Props for the Vello Checkbox. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Primary label text. */
  label?: React.ReactNode;
  /** Optional secondary line — promotes label to bold heading. */
  description?: React.ReactNode;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
```

### `components/forms/Checkbox.jsx`

```jsx
import React from 'react';

const CHECK_CSS = `
.vl-check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-family: var(--font-sans); }
.vl-check__box {
  width: 22px; height: 22px; flex: none; border-radius: 7px; margin-top: 1px;
  border: 1.5px solid var(--border-strong); background: var(--surface-card);
  display: grid; place-items: center; color: #fff;
  transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.vl-check__box svg { width: 14px; height: 14px; stroke-width: 3; opacity: 0; transform: scale(0.6); transition: all var(--dur-fast) var(--ease-spring); }
.vl-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.vl-check input:checked + .vl-check__box { background: var(--brand-primary); border-color: var(--brand-primary); }
.vl-check input:checked + .vl-check__box svg { opacity: 1; transform: scale(1); }
.vl-check input:focus-visible + .vl-check__box { box-shadow: var(--focus-ring); }
.vl-check input:disabled + .vl-check__box { opacity: 0.45; }
.vl-check__label { font-size: var(--text-base); color: var(--text-body); line-height: 1.4; }
.vl-check__label b { font-weight: var(--fw-semibold); color: var(--text-strong); display: block; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Checkbox with optional rich label. */
export function Checkbox({ label, description, className = '', ...rest }) {
  inject('vl-check-css', CHECK_CSS);
  return (
    <label className={['vl-check', className].filter(Boolean).join(' ')}>
      <input type="checkbox" {...rest} />
      <span className="vl-check__box" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </span>
      {(label || description) ? (
        <span className="vl-check__label">
          {description ? <b>{label}</b> : label}
          {description}
        </span>
      ) : null}
    </label>
  );
}
```

### `components/forms/Input.prompt.md`

```markdown
Labeled text field for forms and search — supports leading/trailing icons, hint and error states.

```jsx
<Input label="Where do you need help?" placeholder="Enter your address"
       leadingIcon={<i data-lucide="map-pin" />} />
<Input label="Email" required error="That email looks off" />
```

Use `leadingIcon` with a `search` glyph for the ubiquitous Vello search bar. Pass standard input attributes (`type`, `value`, `onChange`, `placeholder`).
```

### `components/forms/Input.d.ts`

```ts
import React from 'react';

/** Props for the Vello Input. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — turns the field red and replaces the hint. */
  error?: string;
  /** Show a required asterisk. */
  required?: boolean;
  /** Icon node before the input, e.g. <i data-lucide="search" />. */
  leadingIcon?: React.ReactNode;
  /** Icon node after the input. */
  trailingIcon?: React.ReactNode;
}

export function Input(props: InputProps): JSX.Element;
```

### `components/forms/Input.jsx`

```jsx
import React from 'react';

const INPUT_CSS = `
.vl-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-sans); }
.vl-field__label { font-size: var(--text-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
.vl-field__req { color: var(--accent); margin-left: 2px; }
.vl-inputwrap {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface-card);
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 0 14px; height: 48px;
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.vl-inputwrap:focus-within { border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.vl-inputwrap--error { border-color: var(--danger); }
.vl-inputwrap--error:focus-within { box-shadow: var(--focus-ring-accent); }
.vl-inputwrap__icon { color: var(--text-subtle); display: grid; place-items: center; }
.vl-inputwrap__icon svg { width: 18px; height: 18px; }
.vl-input {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: inherit; font-size: var(--text-base); color: var(--text-strong);
  min-width: 0;
}
.vl-input::placeholder { color: var(--text-subtle); }
.vl-inputwrap[aria-disabled="true"] { background: var(--surface-sunken); opacity: 0.7; }
.vl-field__hint { font-size: var(--text-xs); color: var(--text-muted); }
.vl-field__hint--error { color: var(--danger); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello text Input with label, hint, error and optional leading/trailing icon. */
export function Input({
  label, hint, error, required = false,
  leadingIcon = null, trailingIcon = null,
  id, className = '', disabled = false, ...rest
}) {
  inject('vl-input-css', INPUT_CSS);
  const fieldId = id || (label ? 'vl-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className={['vl-field', className].filter(Boolean).join(' ')}>
      {label ? (
        <label className="vl-field__label" htmlFor={fieldId}>
          {label}{required ? <span className="vl-field__req">*</span> : null}
        </label>
      ) : null}
      <div className={['vl-inputwrap', error ? 'vl-inputwrap--error' : ''].filter(Boolean).join(' ')}
           aria-disabled={disabled || undefined}>
        {leadingIcon ? <span className="vl-inputwrap__icon">{leadingIcon}</span> : null}
        <input id={fieldId} className="vl-input" disabled={disabled} {...rest} />
        {trailingIcon ? <span className="vl-inputwrap__icon">{trailingIcon}</span> : null}
      </div>
      {(error || hint) ? (
        <span className={['vl-field__hint', error ? 'vl-field__hint--error' : ''].filter(Boolean).join(' ')}>
          {error || hint}
        </span>
      ) : null}
    </div>
  );
}
```

### `components/forms/Switch.prompt.md`

```markdown
On/off toggle for instantly-applied settings (notifications, availability, repeat booking).

```jsx
<Switch label="Notify me about new sitters" defaultChecked />
```

Use for settings that take effect immediately — for form choices that need a submit, use Checkbox instead.
```

### `components/forms/Switch.d.ts`

```ts
import React from 'react';

/** Props for the Vello Switch. */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional trailing label. */
  label?: React.ReactNode;
}

export function Switch(props: SwitchProps): JSX.Element;
```

### `components/forms/Switch.jsx`

```jsx
import React from 'react';

const SWITCH_CSS = `
.vl-switch { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; font-family: var(--font-sans); }
.vl-switch__track {
  width: 46px; height: 28px; border-radius: 999px; flex: none;
  background: var(--ink-200); position: relative;
  transition: background var(--dur-base) var(--ease-standard);
}
.vl-switch__thumb {
  position: absolute; top: 3px; left: 3px; width: 22px; height: 22px;
  border-radius: 999px; background: #fff; box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-spring);
}
.vl-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.vl-switch input:checked + .vl-switch__track { background: var(--brand-primary); }
.vl-switch input:checked + .vl-switch__track .vl-switch__thumb { transform: translateX(18px); }
.vl-switch input:focus-visible + .vl-switch__track { box-shadow: var(--focus-ring); }
.vl-switch input:disabled + .vl-switch__track { opacity: 0.45; }
.vl-switch__label { font-size: var(--text-base); color: var(--text-strong); font-weight: var(--fw-medium); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Switch — instant on/off toggle for settings. */
export function Switch({ label, className = '', ...rest }) {
  inject('vl-switch-css', SWITCH_CSS);
  return (
    <label className={['vl-switch', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="vl-switch__track" aria-hidden="true"><span className="vl-switch__thumb" /></span>
      {label ? <span className="vl-switch__label">{label}</span> : null}
    </label>
  );
}
```

### `components/navigation/BottomNav.prompt.md`

```markdown
Mobile bottom tab bar — the primary navigation for the Vello app.

```jsx
<BottomNav value={tab} onChange={setTab} items={[
  { id: 'home', label: 'Explore', icon: <i data-lucide="compass" /> },
  { id: 'bookings', label: 'Bookings', icon: <i data-lucide="calendar" />, badge: 2 },
  { id: 'messages', label: 'Messages', icon: <i data-lucide="message-circle" /> },
  { id: 'account', label: 'You', icon: <i data-lucide="user" /> },
]} />
```

Keep to 3–5 items. `badge` shows a persimmon count for messages/bookings. Handles iOS safe-area inset automatically.
```

### `components/navigation/BottomNav.d.ts`

```ts
import React from 'react';

export interface NavItem {
  id?: string;
  label: React.ReactNode;
  /** Icon node, e.g. <i data-lucide="home" />. */
  icon?: React.ReactNode;
  /** Optional notification count badge. */
  badge?: number;
}

/** Props for the Vello BottomNav. */
export interface BottomNavProps {
  items: NavItem[];
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function BottomNav(props: BottomNavProps): JSX.Element;
```

### `components/navigation/BottomNav.jsx`

```jsx
import React from 'react';

const BOTTOMNAV_CSS = `
.vl-bottomnav {
  display: flex; align-items: stretch; justify-content: space-around;
  background: var(--surface-card);
  border-top: 1.5px solid var(--border-default);
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom, 0px));
}
.vl-navitem {
  appearance: none; background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  flex: 1; padding: 4px 0; color: var(--text-muted);
  font-family: var(--font-sans); font-size: 11px; font-weight: var(--fw-semibold);
  transition: color var(--dur-fast) var(--ease-standard);
  position: relative;
}
.vl-navitem svg { width: 24px; height: 24px; stroke-width: 2; }
.vl-navitem:hover { color: var(--text-body); }
.vl-navitem--active { color: var(--text-brand); }
.vl-navitem--active svg { stroke-width: 2.4; }
.vl-navitem__badge {
  position: absolute; top: 0; left: 50%; margin-left: 6px;
  min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px;
  background: var(--accent); color: #fff; font-size: 10px; font-weight: var(--fw-bold);
  display: grid; place-items: center; line-height: 1;
}
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello BottomNav — mobile tab bar with icons. */
export function BottomNav({ items = [], value, onChange, className = '' }) {
  inject('vl-bottomnav-css', BOTTOMNAV_CSS);
  return (
    <nav className={['vl-bottomnav', className].filter(Boolean).join(' ')}>
      {items.map((it) => {
        const id = it.id ?? it.label;
        const active = id === value;
        return (
          <button key={id} className={['vl-navitem', active ? 'vl-navitem--active' : ''].join(' ')}
            aria-current={active ? 'page' : undefined} onClick={() => onChange && onChange(id)}>
            {it.badge != null ? <span className="vl-navitem__badge">{it.badge}</span> : null}
            {it.icon}
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```

### `components/navigation/ScrollRow.prompt.md`

```markdown
Horizontally scrollable row that *looks* scrollable: a soft gradient fade on whichever edge has more content, plus scroll-snap. Use for category chips, popular-services rails, recently-viewed providers — any row that overflows.

```jsx
// Category chips on the app background
<ScrollRow>
  <Tag icon={<i data-lucide="dog" />} selected>Dog walking</Tag>
  <Tag icon={<i data-lucide="sparkles" />}>Cleaning</Tag>
  <Tag icon={<i data-lucide="wrench" />}>Handyperson</Tag>
  {/* …more */}
</ScrollRow>

// A rail of cards INSIDE a white card — match the fade to that surface
<ScrollRow fade="var(--surface-card)">
  <div style={{ minWidth: '76%' }}><ProviderCard {...maya} /></div>
  <div style={{ minWidth: '76%' }}><ProviderCard {...devon} /></div>
</ScrollRow>
```

**Two affordances, both required:**
1. **Edge fade** — the right fade signals "there's more"; the left fade appears once scrolled. Set `fade` to the surface colour behind the row or the gradient won't blend.
2. **~30% peek** — size the items so a little over one is visible (e.g. card `min-width: 72–78%` of the viewport, or fixed widths in a container ~1.3 cards wide). The half-shown next item is what tells users the row continues.

The right fade hides automatically at the end of the scroll; the left fade hides at the start.
```

### `components/navigation/ScrollRow.d.ts`

```ts
import React from 'react';

/**
 * Props for the Vello ScrollRow.
 * @startingPoint section="Patterns" subtitle="Horizontal scroll with edge-fade + peek" viewport="440x240"
 */
export interface ScrollRowProps {
  /** The scrollable children (chips, cards, etc). Each becomes a snap point. */
  children?: React.ReactNode;
  /** Fade colour — must match the surface BEHIND the row. @default app paper (var(--color-bg)). Pass var(--surface-card) inside a card. */
  fade?: string;
  /** Override the gap between items (CSS length). @default 12px */
  gap?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/** Horizontally scrollable row with a soft edge-fade affordance. */
export function ScrollRow(props: ScrollRowProps): JSX.Element;
```

### `components/navigation/ScrollRow.jsx`

```jsx
import React from 'react';

/* ============================================================
   Vello ScrollRow — horizontally scrollable row with affordance.
   • Soft right-edge gradient fade signalling "more beyond the edge".
   • Left fade appears once the user has scrolled.
   • Scroll-snap for tidy stops.
   To get the ~30% PEEK of the next item, size the children so a
   little over one item is visible (e.g. min-width: 72% on mobile,
   or fixed-width cards in a container ~1.3 cards wide). The fade
   colour must match the surface behind the row — set it with the
   `fade` prop (default = app paper).
   ============================================================ */

const SCROLLROW_CSS = `
.vl-scrollrow { position: relative; --_fade: var(--color-bg); --_fadew: 56px; }
.vl-scrollrow__track {
  display: flex; gap: 12px; overflow-x: auto; overflow-y: hidden;
  scroll-snap-type: x proximity; scroll-behavior: smooth;
  padding: 4px 16px 14px; margin: -4px 0 0;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
}
.vl-scrollrow__track::-webkit-scrollbar { display: none; }
.vl-scrollrow__track > * { scroll-snap-align: start; flex: none; }
.vl-scrollrow__fade {
  position: absolute; top: 0; bottom: 0; width: var(--_fadew);
  pointer-events: none; z-index: 2; opacity: 0;
  transition: opacity var(--dur-base) var(--ease-standard);
}
.vl-scrollrow__fade--r { right: 0; background: linear-gradient(to left, var(--_fade) 18%, transparent); }
.vl-scrollrow__fade--l { left: 0;  background: linear-gradient(to right, var(--_fade) 18%, transparent); }
.vl-scrollrow[data-more-right="true"] .vl-scrollrow__fade--r { opacity: 1; }
.vl-scrollrow[data-more-left="true"]  .vl-scrollrow__fade--l { opacity: 1; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello ScrollRow — horizontally scrollable row with edge-fade affordance. */
export function ScrollRow({ children, fade, gap, className = '', style = {}, ...rest }) {
  inject('vl-scrollrow-css', SCROLLROW_CSS);
  const rootRef = React.useRef(null);
  const trackRef = React.useRef(null);

  const update = React.useCallback(() => {
    const root = rootRef.current, t = trackRef.current;
    if (!root || !t) return;
    const max = t.scrollWidth - t.clientWidth;
    root.setAttribute('data-more-left', String(t.scrollLeft > 2));
    root.setAttribute('data-more-right', String(t.scrollLeft < max - 2));
  }, []);

  React.useEffect(() => {
    update();
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('scroll', update, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro && ro.observe(t);
    window.addEventListener('resize', update);
    return () => {
      t.removeEventListener('scroll', update);
      ro && ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update, children]);

  const rootStyle = { ...style };
  if (fade) rootStyle['--_fade'] = fade;
  const trackStyle = gap != null ? { gap } : undefined;

  return (
    <div ref={rootRef} className={['vl-scrollrow', className].filter(Boolean).join(' ')} style={rootStyle} {...rest}>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--l" aria-hidden="true" />
      <div ref={trackRef} className="vl-scrollrow__track" style={trackStyle}>{children}</div>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--r" aria-hidden="true" />
    </div>
  );
}
```

### `components/navigation/Tabs.prompt.md`

```markdown
Underline tab bar for switching between views (Upcoming / Past bookings, service categories).

```jsx
<Tabs value={tab} onChange={setTab} items={[
  { id: 'upcoming', label: 'Upcoming', count: 2 },
  { id: 'past', label: 'Past' },
]} />
```

Use `fill` to stretch tabs across the full width (common on mobile). Items accept `icon` and `count`.
```

### `components/navigation/Tabs.d.ts`

```ts
import React from 'react';

export interface TabItem {
  /** Stable id (falls back to label). */
  id?: string;
  label: React.ReactNode;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Optional count pill. */
  count?: number;
}

/** Props for the Vello Tabs. */
export interface TabsProps {
  items: TabItem[];
  /** Active tab id. */
  value?: string;
  onChange?: (id: string) => void;
  /** Stretch tabs to fill the row equally. */
  fill?: boolean;
  className?: string;
}

export function Tabs(props: TabsProps): JSX.Element;
```

### `components/navigation/Tabs.jsx`

```jsx
import React from 'react';

const TABS_CSS = `
.vl-tabs { display: inline-flex; gap: 4px; border-bottom: 1.5px solid var(--border-default); }
.vl-tabs--fill { display: flex; }
.vl-tab {
  appearance: none; background: none; border: none; cursor: pointer;
  font-family: var(--font-sans); font-weight: var(--fw-semibold); font-size: var(--text-base);
  color: var(--text-muted); padding: 12px 14px; position: relative;
  display: inline-flex; align-items: center; gap: 7px; flex: 1; justify-content: center;
  transition: color var(--dur-fast) var(--ease-standard);
}
.vl-tab svg { width: 17px; height: 17px; }
.vl-tab:hover { color: var(--text-body); }
.vl-tab--active { color: var(--text-brand); }
.vl-tab--active::after {
  content: ''; position: absolute; left: 10px; right: 10px; bottom: -1.5px; height: 3px;
  background: var(--brand-primary); border-radius: 3px 3px 0 0;
}
.vl-tab__count { font-family: var(--font-mono); font-size: 11px; background: var(--surface-sunken); color: var(--text-muted); border-radius: 999px; padding: 1px 7px; }
.vl-tab--active .vl-tab__count { background: var(--brand-primary-tint); color: var(--text-brand); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Tabs — underline tab bar for switching views. */
export function Tabs({ items = [], value, onChange, fill = false, className = '' }) {
  inject('vl-tabs-css', TABS_CSS);
  return (
    <div className={['vl-tabs', fill ? 'vl-tabs--fill' : '', className].filter(Boolean).join(' ')} role="tablist">
      {items.map((it) => {
        const id = it.id ?? it.label;
        const active = id === value;
        return (
          <button key={id} role="tab" aria-selected={active}
            className={['vl-tab', active ? 'vl-tab--active' : ''].join(' ')}
            onClick={() => onChange && onChange(id)}>
            {it.icon}
            {it.label}
            {it.count != null ? <span className="vl-tab__count">{it.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
```

### `ui_kits/vello-app/index.html`

```html
<!-- @dsCard group="Vello App" viewport="430x880" name="Vello App" subtitle="Interactive mobile app — explore, book, manage" -->
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vello — App</title>
<link rel="stylesheet" href="../../styles.css">
<style>
  html, body { margin: 0; height: 100%; }
  body { background: radial-gradient(120% 120% at 50% 0%, #efe9db 0%, var(--color-bg) 60%);
    display: grid; place-items: center; padding: 28px 0; }
  .vl-on-green .vl-rating__value, .vl-on-green .vl-rating__count { color: #fff !important; }
  *::-webkit-scrollbar { width: 0; height: 0; }
</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script src="../../_ds_bundle.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" src="data.jsx"></script>
<script type="text/babel" src="shell.jsx"></script>
<script type="text/babel" src="screens-explore.jsx"></script>
<script type="text/babel" src="screens-results.jsx"></script>
<script type="text/babel" src="screens-profile.jsx"></script>
<script type="text/babel" src="screens-bookings.jsx"></script>
<script type="text/babel" src="app.jsx"></script>
<script type="text/babel" data-presets="react">
  const root = document.getElementById('root');
  ReactDOM.createRoot(root).render(React.createElement(window.VelloApp));
  // Convert any freshly-rendered <i data-lucide> on a gentle interval — no observer, no recursion.
  function draw() { try { window.lucide && window.lucide.createIcons(); } catch (e) {} }
  draw();
  setInterval(draw, 350);
</script>
</body></html>
```

### `ui_kits/vello-app/data.jsx`

```jsx
/* Vello app — mock data. Shared via window for the babel-loaded kit. */
const VELLO_CATEGORIES = [
  { id: 'dog',     label: 'Dog walking', icon: 'dog',        tint: 'var(--green-100)',  fg: 'var(--green-700)' },
  { id: 'clean',   label: 'Cleaning',    icon: 'sparkles',   tint: 'var(--coral-100)',  fg: 'var(--coral-700)' },
  { id: 'handy',   label: 'Handyperson', icon: 'wrench',     tint: 'var(--amber-100)',  fg: 'var(--amber-700)' },
  { id: 'tutor',   label: 'Tutoring',    icon: 'graduation-cap', tint: 'var(--sky-100)', fg: 'var(--sky-700)' },
  { id: 'garden',  label: 'Gardening',   icon: 'flower-2',   tint: 'var(--green-100)',  fg: 'var(--green-700)' },
  { id: 'sitter',  label: 'Babysitting', icon: 'baby',       tint: 'var(--coral-100)',  fg: 'var(--coral-700)' },
  { id: 'mover',   label: 'Moving help', icon: 'package',    tint: 'var(--amber-100)',  fg: 'var(--amber-700)' },
  { id: 'more',    label: 'More',        icon: 'grip',       tint: 'var(--ink-100)',    fg: 'var(--ink-600)' },
];

const VELLO_PROVIDERS = [
  { id: 'maya',  name: 'Maya Rivera', service: 'Dog walker · 3 yrs on Vello', cat: 'dog',
    rating: 4.9, reviews: 213, distance: 0.4, price: 28, verified: true, available: true,
    badges: ['Brings supplies', 'Pet first-aid'], featured: true,
    bio: "Hi! I'm Maya — I've walked dogs all over Bed-Stuy for three years. Your pup gets a 30-minute loop through Herbert Von King Park and a photo update every time.",
    services: [ { name: '30-min neighborhood walk', price: 28 }, { name: '60-min park adventure', price: 48 }, { name: 'Drop-in feed & play', price: 20 } ] },
  { id: 'devon', name: 'Devon King', service: 'Home cleaner', cat: 'clean',
    rating: 4.8, reviews: 88, distance: 1.2, price: 35, verified: true, available: false,
    badges: ['Eco products', 'Same-day'],
    bio: 'Deep cleans, move-outs, and weekly tidies. I bring my own eco-friendly supplies and treat your place like my own.',
    services: [ { name: 'Standard clean (2 br)', price: 90 }, { name: 'Deep clean', price: 150 }, { name: 'Hourly', price: 35 } ] },
  { id: 'sara',  name: 'Sara Lin', service: 'Math & SAT tutor', cat: 'tutor',
    rating: 5.0, reviews: 41, distance: 0.9, price: 45, verified: true, available: true,
    badges: ['Ivy grad', 'In-home or online'],
    bio: 'Patient, structured tutoring for grades 6–12. I build a custom plan after the first session — most students jump a full letter grade in a semester.',
    services: [ { name: '1-hour session', price: 45 }, { name: 'SAT prep package (4)', price: 160 } ] },
  { id: 'tom',   name: 'Tom Baptiste', service: 'Handyperson · licensed', cat: 'handy',
    rating: 4.7, reviews: 156, distance: 1.6, price: 60, verified: true, available: true,
    badges: ['Licensed', 'Free quotes'],
    bio: 'Furniture assembly, mounting, leaks, and the odd jobs that pile up. No job too small — most visits done in under an hour.',
    services: [ { name: 'First hour', price: 60 }, { name: 'TV mounting', price: 95 }, { name: 'Furniture assembly', price: 70 } ] },
  { id: 'priya', name: 'Priya N.', service: 'Babysitter · CPR certified', cat: 'sitter',
    rating: 4.9, reviews: 64, distance: 0.6, price: 25, verified: true, available: false,
    badges: ['CPR certified', 'Ages 0–10'],
    bio: 'Evenings and weekends, games and bedtime routines. Parents say their kids ask when I am coming back.',
    services: [ { name: 'Hourly sitting', price: 25 }, { name: 'Date-night package', price: 110 } ] },
];

const VELLO_BOOKINGS = [
  { id: 'b1', providerId: 'maya', service: '30-min neighborhood walk', when: 'Today · 3:00 PM', status: 'confirmed' },
  { id: 'b2', providerId: 'tom', service: 'TV mounting', when: 'Thu, Jun 12 · 10:00 AM', status: 'pending' },
];

window.VELLO_DATA = { VELLO_CATEGORIES, VELLO_PROVIDERS, VELLO_BOOKINGS };
```

### `ui_kits/vello-app/shell.jsx`

```jsx
/* Vello app kit — device shell + shared helpers. */
(function () {
  const { useState } = React;

  const I = (n, props = {}) => <i data-lucide={n} {...props}></i>;

  function StatusBar({ dark }) {
    const color = dark ? '#fff' : 'var(--ink-900)';
    return (
      <div style={{ height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '0 28px 8px', color, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, flex: 'none' }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {I('signal', { width: 17, height: 17 })}
          {I('wifi', { width: 17, height: 17 })}
          {I('battery-full', { width: 22, height: 22 })}
        </div>
      </div>
    );
  }

  /* Realistic phone bezel; children fill the screen. */
  function PhoneFrame({ children, statusDark = false, screenBg = 'var(--color-bg)' }) {
    return (
      <div style={{
        width: 390, height: 844, borderRadius: 54, background: '#0c0f0c',
        padding: 11, boxShadow: '0 40px 90px rgba(25,28,25,0.34), 0 0 0 1px rgba(0,0,0,0.4)',
        position: 'relative', flex: 'none' }}>
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)',
          width: 116, height: 33, background: '#0c0f0c', borderRadius: 999, zIndex: 30 }} />
        <div style={{ width: '100%', height: '100%', borderRadius: 44, overflow: 'hidden',
          background: screenBg, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <StatusBar dark={statusDark} />
          {children}
        </div>
      </div>
    );
  }

  /* Scroll region between header and bottom nav. */
  function Scroll({ children, style }) {
    return (
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', ...style }}>
        {children}
      </div>
    );
  }

  window.VelloShell = { I, PhoneFrame, StatusBar, Scroll };
})();
```

### `ui_kits/vello-app/screens-explore.jsx`

```jsx
/* Vello app kit — Explore (home) screen. */
(function () {
  const { I, Scroll } = window.VelloShell;
  const { Input, Tag, ProviderCard, Badge } = window.VelloDesignSystem_182a1b;
  const { VELLO_CATEGORIES, VELLO_PROVIDERS } = window.VELLO_DATA;

  function CategoryTile({ cat, onClick }) {
    return (
      <button onClick={onClick} style={{
        appearance: 'none', border: 'none', background: 'transparent', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 0 }}>
        <span style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: cat.tint,
          color: cat.fg, display: 'grid', placeItems: 'center' }}>
          <i data-lucide={cat.icon} style={{ width: 28, height: 28 }}></i>
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600,
          color: 'var(--text-body)', textAlign: 'center', lineHeight: 1.2 }}>{cat.label}</span>
      </button>
    );
  }

  function ExploreScreen({ onOpenProvider, onOpenCategory }) {
    const featured = VELLO_PROVIDERS.filter(p => p.available).slice(0, 3);
    return (
      <Scroll>
        <div style={{ padding: '4px 20px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600 }}>
            {I('map-pin', { width: 15, height: 15 })}
            <span>Bedford-Stuyvesant, Brooklyn</span>
            {I('chevron-down', { width: 15, height: 15 })}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '10px 0 14px', lineHeight: 1.1 }}>
            Good afternoon, Alex.<br />Who can we find you?
          </h1>
          <Input placeholder="Try ‘dog walker’ or ‘leaky faucet’" leadingIcon={I('search', { width: 18, height: 18 })} />
        </div>

        <div style={{ padding: '14px 20px 6px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {VELLO_CATEGORIES.map(c => (
            <CategoryTile key={c.id} cat={c} onClick={() => onOpenCategory(c)} />
          ))}
        </div>

        <div style={{ padding: '18px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
            color: 'var(--text-strong)', margin: 0 }}>Available near you</h2>
          <Badge variant="brand" size="sm" dot>5 online</Badge>
        </div>
        <div style={{ padding: '6px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {featured.map(p => (
            <ProviderCard key={p.id} {...p} onBook={() => onOpenProvider(p)} />
          ))}
        </div>
      </Scroll>
    );
  }

  window.VelloScreens = Object.assign(window.VelloScreens || {}, { ExploreScreen });
})();
```

### `ui_kits/vello-app/screens-results.jsx`

```jsx
/* Vello app kit — Results / category listing screen. */
(function () {
  const { useState } = React;
  const { I, Scroll } = window.VelloShell;
  const { Tag, ProviderCard, IconButton } = window.VelloDesignSystem_182a1b;
  const { VELLO_PROVIDERS } = window.VELLO_DATA;

  const FILTERS = ['Available now', 'Top rated', 'Under $30', 'Background-checked'];

  function ResultsScreen({ category, onBack, onOpenProvider }) {
    const [active, setActive] = useState({ 'Available now': false, 'Top rated': true });
    const list = category && category.id !== 'more'
      ? VELLO_PROVIDERS.filter(p => p.cat === category.id)
      : VELLO_PROVIDERS;
    const results = list.length ? list : VELLO_PROVIDERS;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '0 14px 12px', flex: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <IconButton label="Back" variant="ghost" onClick={onBack}><i data-lucide="arrow-left"></i></IconButton>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'var(--text-strong)' }}>
                {category ? category.label : 'All services'}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--text-muted)' }}>
                {results.length} near Bedford-Stuyvesant
              </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <IconButton label="Map view" variant="default"><i data-lucide="map"></i></IconButton>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingTop: 12, paddingBottom: 2 }}>
            <Tag icon={I('sliders-horizontal', { width: 15, height: 15 })}>Filters</Tag>
            {FILTERS.map(f => (
              <Tag key={f} selected={!!active[f]} onClick={() => setActive(a => ({ ...a, [f]: !a[f] }))}
                style={{ whiteSpace: 'nowrap', flex: 'none' }}>{f}</Tag>
            ))}
          </div>
        </div>
        <Scroll style={{ padding: '4px 16px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {results.map(p => (
              <ProviderCard key={p.id} {...p} ctaLabel="View" onBook={() => onOpenProvider(p)} />
            ))}
          </div>
        </Scroll>
      </div>
    );
  }

  window.VelloScreens = Object.assign(window.VelloScreens || {}, { ResultsScreen });
})();
```

### `ui_kits/vello-app/screens-profile.jsx`

```jsx
/* Vello app kit — Provider profile + booking sheet + confirmation. */
(function () {
  const { useState } = React;
  const { I, Scroll } = window.VelloShell;
  const { Avatar, Rating, Badge, Button, IconButton, Tag, Card } = window.VelloDesignSystem_182a1b;

  function ProfileScreen({ provider: p, onBack, onBook }) {
    const [sel, setSel] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        {/* hero */}
        <div style={{ background: 'var(--forest-800)', padding: '6px 16px 22px', flex: 'none', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 80% -10%, rgba(255,255,255,0.16), transparent 60%)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <IconButton label="Back" variant="ghost" onClick={onBack} style={{ color: '#fff' }}><i data-lucide="arrow-left"></i></IconButton>
            <IconButton label="Save" variant="ghost" style={{ color: '#fff' }}><i data-lucide="heart"></i></IconButton>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 4, position: 'relative' }}>
            <Avatar name={p.name} size="xl" verified={p.verified} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>{p.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)', fontSize: 14, marginTop: 2 }}>{p.service}</div>
              <div style={{ marginTop: 8, display: 'inline-flex', background: 'rgba(255,255,255,0.16)', padding: '5px 10px', borderRadius: 999 }}>
                <Rating value={p.rating} count={p.reviews} size="sm" className="vl-on-green" />
              </div>
            </div>
          </div>
        </div>

        <Scroll style={{ padding: '18px 20px 120px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.verified ? <Badge variant="success" icon={I('shield-check', { width: 14, height: 14 })}>Background-checked</Badge> : null}
            {p.available ? <Badge variant="brand" dot>Available today</Badge> : null}
            {p.badges.map(b => <Badge key={b} variant="neutral">{b}</Badge>)}
            <Badge variant="neutral" icon={I('map-pin', { width: 13, height: 13 })}>{p.distance} mi away</Badge>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', margin: '22px 0 8px' }}>About</h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>{p.bio}</p>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', margin: '22px 0 10px' }}>Services</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.services.map((s, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                appearance: 'none', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderRadius: 'var(--radius-md)', background: 'var(--surface-card)',
                border: '1.5px solid ' + (sel === i ? 'var(--brand-primary)' : 'var(--border-default)'),
                boxShadow: sel === i ? 'var(--focus-ring)' : 'none' }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, flex: 'none', display: 'grid', placeItems: 'center',
                  border: '2px solid ' + (sel === i ? 'var(--brand-primary)' : 'var(--border-strong)'),
                  background: sel === i ? 'var(--brand-primary)' : 'transparent', color: '#fff' }}>
                  {sel === i ? <i data-lucide="check" style={{ width: 13, height: 13, strokeWidth: 3 }}></i> : null}
                </span>
                <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--text-strong)' }}>{s.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 16, color: 'var(--text-strong)' }}>${s.price}</span>
              </button>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', margin: '22px 0 10px' }}>Recent reviews</h3>
          <Card elevation="flat" padding="md" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
              <Avatar name="Jordan P" size="sm" />
              <div><div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--text-strong)' }}>Jordan P.</div>
                <Rating value={5} size="sm" starsOnly /></div>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-subtle)' }}>2 days ago</span>
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)' }}>
              “Reliable, kind, and my dog adores them. The photo updates make my whole day.”
            </p>
          </Card>
        </Scroll>

        {/* sticky CTA */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 22px',
          background: 'linear-gradient(to top, var(--color-bg) 72%, transparent)',
          display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 22, color: 'var(--text-strong)' }}>${p.services[sel].price}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)' }}>{p.services[sel].name}</div>
          </div>
          <Button variant="primary" size="lg" fullWidth style={{ flex: 1 }}
            trailingIcon={I('arrow-right', { width: 18, height: 18 })}
            onClick={() => onBook(p, p.services[sel])}>Book {p.name.split(' ')[0]}</Button>
        </div>
      </div>
    );
  }

  function BookingSheet({ provider, service, onClose, onConfirm }) {
    const [day, setDay] = useState('Today');
    const [time, setTime] = useState('3:00 PM');
    const days = ['Today', 'Tomorrow', 'Sat 7', 'Sun 8'];
    const times = ['9:00 AM', '11:30 AM', '1:00 PM', '3:00 PM', '5:30 PM'];
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(25,28,25,0.45)' }} />
        <div style={{ position: 'relative', background: 'var(--surface-card)', borderRadius: '28px 28px 0 0', padding: '12px 20px 26px', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--ink-200)', margin: '0 auto 14px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Avatar name={provider.name} size="md" verified={provider.verified} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text-strong)' }}>{service.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}>with {provider.name}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 18, color: 'var(--text-strong)' }}>${service.price}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 13, color: 'var(--text-strong)', marginBottom: 8 }}>Pick a day</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
            {days.map(d => <Tag key={d} selected={day === d} onClick={() => setDay(d)} style={{ flex: 'none' }}>{d}</Tag>)}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 13, color: 'var(--text-strong)', marginBottom: 8 }}>Pick a time</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
            {times.map(t => <Tag key={t} selected={time === t} onClick={() => setTime(t)}>{t}</Tag>)}
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={() => onConfirm({ day, time })}>
            Confirm booking · ${service.price}
          </Button>
        </div>
      </div>
    );
  }

  function ConfirmScreen({ provider, service, slot, onDone }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--green-100)', display: 'grid', placeItems: 'center', marginBottom: 22 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--brand-primary)', display: 'grid', placeItems: 'center', color: '#fff' }}>
            <i data-lucide="check" style={{ width: 34, height: 34, strokeWidth: 3 }}></i>
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-strong)', margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1.1, textWrap: 'nowrap', whiteSpace: 'nowrap' }}>You're all set!</h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-body)', margin: '0 0 24px', lineHeight: 1.5 }}>
          {provider.name.split(' ')[0]} will see you <b style={{ color: 'var(--text-strong)' }}>{slot.day} at {slot.time}</b>. We sent the details to your messages.
        </p>
        <Card elevation="raised" padding="md" style={{ width: '100%', marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={provider.name} size="md" verified={provider.verified} />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{service.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}>{slot.day} · {slot.time}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 18, color: 'var(--text-strong)' }}>${service.price}</div>
          </div>
        </Card>
        <Button variant="primary" size="lg" fullWidth onClick={onDone}>Done</Button>
      </div>
    );
  }

  window.VelloScreens = Object.assign(window.VelloScreens || {}, { ProfileScreen, BookingSheet, ConfirmScreen });
})();
```

### `ui_kits/vello-app/screens-bookings.jsx`

```jsx
/* Vello app kit — Bookings, Messages, Account tab screens. */
(function () {
  const { useState } = React;
  const { I, Scroll } = window.VelloShell;
  const { Tabs, Card, Avatar, Badge, Button, Rating } = window.VelloDesignSystem_182a1b;
  const { VELLO_BOOKINGS, VELLO_PROVIDERS } = window.VELLO_DATA;
  const byId = id => VELLO_PROVIDERS.find(p => p.id === id);

  function TabHeader({ title }) {
    return <div style={{ padding: '2px 20px 6px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: 0 }}>{title}</h1>
    </div>;
  }

  function BookingCard({ b, onOpen }) {
    const p = byId(b.providerId);
    return (
      <Card elevation="raised" padding="md" interactive onClick={() => onOpen(p)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={p.name} size="md" verified={p.verified} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{b.service}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}>with {p.name}</div>
          </div>
          {b.status === 'confirmed'
            ? <Badge variant="success" dot>Confirmed</Badge>
            : <Badge variant="warning" dot>Pending</Badge>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', color: 'var(--text-body)', fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600 }}>
          {I('calendar', { width: 16, height: 16 })}<span>{b.when}</span>
        </div>
      </Card>
    );
  }

  function BookingsScreen({ onOpenProvider }) {
    const [tab, setTab] = useState('upcoming');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TabHeader title="Your bookings" />
        <div style={{ padding: '0 20px' }}>
          <Tabs value={tab} onChange={setTab} fill items={[
            { id: 'upcoming', label: 'Upcoming', count: VELLO_BOOKINGS.length },
            { id: 'past', label: 'Past' },
          ]} />
        </div>
        <Scroll style={{ padding: '16px 20px 24px' }}>
          {tab === 'upcoming' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {VELLO_BOOKINGS.map(b => <BookingCard key={b.id} b={b} onOpen={onOpenProvider} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '48px 20px', fontFamily: 'var(--font-sans)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', color: 'var(--text-subtle)' }}>
                <i data-lucide="history" style={{ width: 26, height: 26 }}></i>
              </div>
              Your completed bookings will show up here.
            </div>
          )}
        </Scroll>
      </div>
    );
  }

  function MessagesScreen({ onOpenProvider }) {
    const threads = VELLO_PROVIDERS.slice(0, 4);
    const snippets = ['On my way — see you in 10!', "Sounds good, I'll bring supplies.", 'Thanks for booking! Quick question…', 'Great session today — Sam did great.'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TabHeader title="Messages" />
        <Scroll style={{ padding: '10px 12px 24px' }}>
          {threads.map((p, i) => (
            <button key={p.id} onClick={() => onOpenProvider(p)} style={{
              appearance: 'none', border: 'none', background: 'transparent', cursor: 'pointer', width: '100%',
              display: 'flex', gap: 12, alignItems: 'center', padding: '12px 8px', textAlign: 'left',
              borderBottom: '1px solid var(--border-subtle)' }}>
              <Avatar name={p.name} size="md" verified={p.verified} online={i === 0} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{p.name}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-subtle)' }}>{i === 0 ? 'now' : i + 'h'}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: i === 0 ? 'var(--text-strong)' : 'var(--text-muted)', fontWeight: i === 0 ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{snippets[i]}</div>
              </div>
              {i === 0 ? <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--accent)', flex: 'none' }} /> : null}
            </button>
          ))}
        </Scroll>
      </div>
    );
  }

  function AccountScreen() {
    const rows = [
      { icon: 'map-pin', label: 'Saved addresses' },
      { icon: 'credit-card', label: 'Payment methods' },
      { icon: 'shield-check', label: 'Trust & safety' },
      { icon: 'bell', label: 'Notifications' },
      { icon: 'help-circle', label: 'Help center' },
    ];
    return (
      <Scroll style={{ padding: '6px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0 20px' }}>
          <Avatar name="Alex Morgan" size="xl" />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-strong)' }}>Alex Morgan</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)' }}>Member since 2024 · Bed-Stuy</div>
          </div>
        </div>
        <Card elevation="flat" padding="none">
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
              borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none', color: 'var(--text-body)' }}>
              <i data-lucide={r.icon} style={{ width: 20, height: 20, color: 'var(--text-brand)' }}></i>
              <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--text-strong)' }}>{r.label}</span>
              <i data-lucide="chevron-right" style={{ width: 18, height: 18, color: 'var(--text-subtle)' }}></i>
            </div>
          ))}
        </Card>
        <div style={{ marginTop: 18 }}>
          <Button variant="secondary" size="md" fullWidth leadingIcon={I('log-out', { width: 17, height: 17 })}>Sign out</Button>
        </div>
      </Scroll>
    );
  }

  window.VelloScreens = Object.assign(window.VelloScreens || {}, { BookingsScreen, MessagesScreen, AccountScreen });
})();
```

### `ui_kits/vello-app/app.jsx`

```jsx
/* Vello app kit — orchestrator. State machine over the screens. */
(function () {
  const { useState } = React;
  const { PhoneFrame } = window.VelloShell;
  const { BottomNav } = window.VelloDesignSystem_182a1b;
  const S = window.VelloScreens;

  function App() {
    const [tab, setTab] = useState('home');
    const [stack, setStack] = useState([]); // overlay screens on top of the active tab
    const [sheet, setSheet] = useState(null); // booking sheet
    const [confirm, setConfirm] = useState(null);

    const push = (v) => setStack(s => [...s, v]);
    const pop = () => setStack(s => s.slice(0, -1));
    const top = stack[stack.length - 1];

    const goTab = (id) => { setStack([]); setConfirm(null); setTab(id); };
    const openProvider = (p) => push({ type: 'profile', provider: p });
    const openCategory = (c) => push({ type: 'results', category: c });

    let body;
    if (confirm) {
      body = <S.ConfirmScreen {...confirm} onDone={() => { setConfirm(null); setStack([]); setTab('bookings'); }} />;
    } else if (top && top.type === 'profile') {
      body = <S.ProfileScreen provider={top.provider} onBack={pop}
        onBook={(provider, service) => setSheet({ provider, service })} />;
    } else if (top && top.type === 'results') {
      body = <S.ResultsScreen category={top.category} onBack={pop} onOpenProvider={openProvider} />;
    } else if (tab === 'home') {
      body = <S.ExploreScreen onOpenProvider={openProvider} onOpenCategory={openCategory} />;
    } else if (tab === 'bookings') {
      body = <S.BookingsScreen onOpenProvider={openProvider} />;
    } else if (tab === 'messages') {
      body = <S.MessagesScreen onOpenProvider={openProvider} />;
    } else {
      body = <S.AccountScreen />;
    }

    const hideNav = (top || confirm);
    const onGreen = top && top.type === 'profile' && !confirm;

    return (
      <PhoneFrame statusDark={!!onGreen}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {body}
        </div>
        {!hideNav ? (
          <BottomNav value={tab} onChange={goTab} items={[
            { id: 'home', label: 'Explore', icon: <i data-lucide="compass"></i> },
            { id: 'bookings', label: 'Bookings', icon: <i data-lucide="calendar"></i>, badge: 2 },
            { id: 'messages', label: 'Messages', icon: <i data-lucide="message-circle"></i>, badge: 1 },
            { id: 'account', label: 'You', icon: <i data-lucide="user"></i> },
          ]} />
        ) : null}
        {sheet ? (
          <S.BookingSheet provider={sheet.provider} service={sheet.service}
            onClose={() => setSheet(null)}
            onConfirm={(slot) => { setConfirm({ provider: sheet.provider, service: sheet.service, slot }); setSheet(null); }} />
        ) : null}
      </PhoneFrame>
    );
  }

  window.VelloApp = App;
})();
```

### `ui_kits/vello-site/index.html`

```html
<!-- @dsCard group="Vello Site" viewport="1280x820" name="Vello Marketing Site" subtitle="Landing page — hero, how it works, services, trust" -->
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vello — Trusted help on your block</title>
<link rel="stylesheet" href="../../styles.css">
<style>
  html, body { margin: 0; }
  body { background: var(--color-bg); }
  a:hover { color: var(--text-brand) !important; }
</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script src="../../_ds_bundle.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" src="../vello-app/data.jsx"></script>
<script type="text/babel" src="sections-content.jsx"></script>
<script type="text/babel" src="sections-hero.jsx"></script>
<script type="text/babel" data-presets="react">
  const M = window.VelloMkt;
  function Site() {
    return (
      <React.Fragment>
        <M.Header />
        <M.Hero />
        <M.HowItWorks />
        <M.Categories />
        <M.Featured />
        <M.Safety />
        <M.CTA />
        <M.Footer />
      </React.Fragment>
    );
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<Site />);
  function draw() { try { window.lucide && window.lucide.createIcons(); } catch (e) {} }
  draw(); setInterval(draw, 350);
</script>
</body></html>
```

### `ui_kits/vello-site/sections-hero.jsx`

```jsx
/* Vello marketing site — header + hero. */
(function () {
  const { Button, Input, Badge, Avatar, Rating } = window.VelloDesignSystem_182a1b;
  const I = (n, p = {}) => <i data-lucide={n} {...p}></i>;

  function Header() {
    const link = { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--text-body)', textDecoration: 'none' };
    return (
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,248,241,0.82)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 28 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
            <img src="../../assets/vello-sprout.svg" width="30" height="30" alt="" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>Vello</span>
          </a>
          <nav style={{ display: 'flex', gap: 24, marginLeft: 12 }}>
            <a href="#how" style={link}>How it works</a>
            <a href="#services" style={link}>Services</a>
            <a href="#trust" style={link}>Trust &amp; safety</a>
            <a href="#" style={link}>Become a provider</a>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <Button variant="ghost" size="sm">Log in</Button>
            <Button variant="primary" size="sm">Get the app</Button>
          </div>
        </div>
      </header>
    );
  }

  function Hero() {
    return (
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 88% 0%, var(--green-100), transparent 60%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '76px 28px 72px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center', position: 'relative' }}>
          <div>
            <Badge variant="brand" icon={I('map-pin', { width: 14, height: 14 })}>Now in Brooklyn &amp; Queens</Badge>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 62, lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '18px 0 18px' }}>
              Trusted help,<br />right on your block.
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 20, lineHeight: 1.5, color: 'var(--text-body)', maxWidth: 480, margin: '0 0 28px' }}>
              Dog walkers, cleaners, tutors and handypeople your neighbors already love — background-checked and a few doors down.
            </p>
            <div style={{ display: 'flex', gap: 10, maxWidth: 460 }}>
              <div style={{ flex: 1 }}>
                <Input placeholder="Enter your address" leadingIcon={I('map-pin', { width: 18, height: 18 })} />
              </div>
              <Button variant="primary" size="lg" trailingIcon={I('arrow-right', { width: 18, height: 18 })}>Find help</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
              <div style={{ display: 'flex' }}>
                {['Maya R', 'Devon K', 'Sara L', 'Tom B'].map((n, i) => (
                  <span key={n} style={{ marginLeft: i ? -10 : 0 }}><Avatar name={n} size="sm" /></span>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)' }}>
                <Rating value={4.9} size="sm" starsOnly /> &nbsp;Loved by <b style={{ color: 'var(--text-strong)' }}>12,000+</b> neighbors
              </div>
            </div>
          </div>
          <div style={{ justifySelf: 'center' }}>{window.VelloMkt.HeroCardStack()}</div>
        </div>
      </section>
    );
  }

  window.VelloMkt = Object.assign(window.VelloMkt || {}, { Header, Hero });
})();
```

### `ui_kits/vello-site/sections-content.jsx`

```jsx
/* Vello marketing site — hero visual + content sections + footer. */
(function () {
  const { ProviderCard, Card, Badge, Button, Avatar, Rating } = window.VelloDesignSystem_182a1b;
  const { VELLO_PROVIDERS, VELLO_CATEGORIES } = window.VELLO_DATA;
  const I = (n, p = {}) => <i data-lucide={n} {...p}></i>;

  function HeroCardStack() {
    const p = VELLO_PROVIDERS[0];
    return (
      <div style={{ width: 380, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -14, right: -6, transform: 'rotate(3deg)', width: 230 }}>
          <Card elevation="floating" padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>{I('sparkles', { width: 20, height: 20 })}</div>
              <div><div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>Cleaning booked</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)' }}>Sat 10:00 AM · Devon</div></div>
            </div>
          </Card>
        </div>
        <div style={{ marginTop: 64 }}>
          <ProviderCard {...p} featured interactive={false} onBook={() => {}} />
        </div>
        <div style={{ position: 'absolute', bottom: -22, left: -10, transform: 'rotate(-3deg)', width: 210 }}>
          <Card elevation="floating" padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name="Sara Lin" size="sm" verified />
              <div><Rating value={5} size="sm" starsOnly /><div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>“Booked in 2 minutes.”</div></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  function Section({ id, eyebrow, title, sub, children, bg }) {
    return (
      <section id={id} style={{ background: bg || 'transparent' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '76px 28px' }}>
          {eyebrow ? <div className="v-eyebrow" style={{ textAlign: 'center' }}>{eyebrow}</div> : null}
          {title ? <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, letterSpacing: '-0.02em', color: 'var(--text-strong)', textAlign: 'center', margin: '10px 0 0' }}>{title}</h2> : null}
          {sub ? <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 560, margin: '14px auto 0' }}>{sub}</p> : null}
          <div style={{ marginTop: 44 }}>{children}</div>
        </div>
      </section>
    );
  }

  function HowItWorks() {
    const steps = [
      { icon: 'map-pin', t: 'Tell us where', d: 'Drop your address and pick what you need done — from a dog walk to a leaky tap.' },
      { icon: 'badge-check', t: 'Pick a neighbor', d: 'Browse background-checked providers, real reviews, and prices up front.' },
      { icon: 'calendar-check', t: 'Book in seconds', d: 'Choose a time, confirm, and message them directly. No phone tag.' },
    ];
    return (
      <Section id="how" eyebrow="How it works" title="Help in three taps" sub="No quotes to chase, no strangers to vet. Vello does the trust part for you.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {steps.map((s, i) => (
            <Card key={s.t} elevation="flat" padding="lg">
              <div style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--green-100)', color: 'var(--green-700)', display: 'grid', placeItems: 'center', marginBottom: 16 }}>{I(s.icon, { width: 26, height: 26 })}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-brand)', marginBottom: 6 }}>0{i + 1}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--text-strong)', margin: '0 0 8px' }}>{s.t}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-body)', margin: 0 }}>{s.d}</p>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function Categories() {
    return (
      <Section id="services" eyebrow="Services" title="Whatever your week needs" bg="var(--color-bg-subtle)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {VELLO_CATEGORIES.filter(c => c.id !== 'more').map(c => (
            <Card key={c.id} elevation="flat" padding="lg" interactive>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: c.tint, color: c.fg, display: 'grid', placeItems: 'center', marginBottom: 14 }}>{I(c.icon, { width: 28, height: 28 })}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>{c.label}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--text-muted)', marginTop: 3 }}>From $20/visit</div>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function Featured() {
    return (
      <Section eyebrow="Near you" title="Top-rated this week">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {VELLO_PROVIDERS.slice(0, 4).map(p => <ProviderCard key={p.id} {...p} onBook={() => {}} />)}
        </div>
      </Section>
    );
  }

  function Safety() {
    const items = [
      { icon: 'shield-check', t: 'Background-checked', d: 'Every provider passes identity and background screening before they appear.' },
      { icon: 'message-circle', t: 'Reviewed by neighbors', d: 'Ratings come from people on your block — not anonymous strangers.' },
      { icon: 'lock', t: 'Secure payments', d: 'Pay in-app. Your card details never touch the provider.' },
    ];
    return (
      <section id="trust" style={{ background: 'var(--forest-800)', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="v-eyebrow" style={{ color: 'var(--forest-300)' }}>Trust &amp; safety</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', margin: '12px 0 14px', lineHeight: 1.08 }}>Safe enough to give a key to.</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', margin: 0 }}>We do the vetting so letting someone into your home feels as easy as asking a friend.</p>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {items.map(it => (
                <div key={it.t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
                  <div style={{ width: 44, height: 44, flex: 'none', borderRadius: 12, background: 'rgba(255,255,255,0.12)', color: 'var(--forest-300)', display: 'grid', placeItems: 'center' }}>{I(it.icon, { width: 22, height: 22 })}</div>
                  <div><div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{it.t}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'rgba(255,255,255,0.78)', marginTop: 4, lineHeight: 1.5 }}>{it.d}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  function CTA() {
    return (
      <Section>
        <Card elevation="raised" padding="lg" style={{ textAlign: 'center', padding: '56px 28px', background: 'var(--surface-brand-tint)', border: 'none' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '0 0 12px' }}>Your neighborhood, on call.</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, color: 'var(--text-body)', margin: '0 auto 26px', maxWidth: 480 }}>Get the Vello app and book trusted local help in minutes.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Button variant="primary" size="lg" leadingIcon={I('smartphone', { width: 18, height: 18 })}>App Store</Button>
            <Button variant="secondary" size="lg" leadingIcon={I('download', { width: 18, height: 18 })}>Google Play</Button>
          </div>
        </Card>
      </Section>
    );
  }

  function Footer() {
    const cols = [
      { h: 'Vello', links: ['How it works', 'Services', 'Pricing', 'Cities'] },
      { h: 'Providers', links: ['Become a provider', 'Provider app', 'Resources'] },
      { h: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
      { h: 'Legal', links: ['Privacy', 'Terms', 'Trust & safety'] },
    ];
    const link = { fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', display: 'block', padding: '5px 0' };
    return (
      <footer style={{ borderTop: '1px solid var(--border-default)', background: 'var(--color-bg-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 28px 36px', display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
              <img src="../../assets/vello-sprout.svg" width="28" height="28" alt="" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--text-strong)' }}>Vello</span>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', maxWidth: 230, margin: 0, lineHeight: 1.55 }}>Hyperlocal services from people your neighbors trust.</p>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)', marginBottom: 6 }}>{c.h}</div>
              {c.links.map(l => <a key={l} href="#" style={link}>{l}</a>)}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 28px', borderTop: '1px solid var(--border-default)', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-subtle)' }}>
          © 2026 Vello, Inc. · Made on your block.
        </div>
      </footer>
    );
  }

  window.VelloMkt = Object.assign(window.VelloMkt || {}, { HeroCardStack, HowItWorks, Categories, Featured, Safety, CTA, Footer });
})();
```

### Prototype — 1. Vello flow — shared primitives + prototype data.

```jsx
/* Vello flow — shared primitives + prototype data.
   Everything is published on window.VelloFlow (babel scripts don't share scope). */

const I = (name, props = {}) => <i data-lucide={name} {...props}></i>;

/* Accessible shape-based verified mark: olive shield + cream check (DS June 2026). */
function VerifiedMark({ size = 25 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Background-checked">
      <path d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z"
        fill="var(--green-600)" stroke="var(--surface-card)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="m8.4 12 2.5 2.5 4.7-5" fill="none" stroke="var(--paper)" strokeWidth="2.1"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AvatarVerified({ n, size = "lg" }) {
  const { Avatar } = window.VelloDesignSystem_182a1b;
  return (
    <span className="nb__avatar">
      <Avatar src={n.photo} name={n.name} size={size} />
      {n.verified && <span className="nb__vmark"><VerifiedMark /></span>}
    </span>
  );
}

/* Chevron used by the DS tappable-card pattern. */
const Chev = ({ cls = "" }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* Horizontal scroll row: edge fade + peek of the next item (DS ScrollRow). */
function ScrollRow({ children, className = "" }) {
  const { useEffect, useRef } = React;
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const update = () => {
    const root = rootRef.current, t = trackRef.current;
    if (!root || !t) return;
    const max = t.scrollWidth - t.clientWidth;
    root.setAttribute("data-more-left", String(t.scrollLeft > 2));
    root.setAttribute("data-more-right", String(t.scrollLeft < max - 2));
  };
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    // Re-measure once real layout lands: mount runs before DS CSS injection
    // and webfont metrics settle, when scrollWidth still equals clientWidth.
    const r1 = requestAnimationFrame(update);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(update));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    const ro = window.ResizeObserver ? new ResizeObserver(update) : null;
    if (ro) { ro.observe(t); if (t.firstElementChild) ro.observe(t.firstElementChild); }
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(r1); cancelAnimationFrame(r2);
      if (ro) ro.disconnect();
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [children]);
  return (
    <div ref={rootRef} className={"vl-scrollrow " + className}>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--l" aria-hidden="true"></div>
      <div ref={trackRef} className="vl-scrollrow__track">{children}</div>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--r" aria-hidden="true"></div>
    </div>
  );
}

function useIcons() {
  // Each screen owns its own state, so it must re-run icon creation after its
  // own renders — a single call in the root component would miss them.
  // Guarded on unconverted <i>: lucide stamps data-lucide onto its output <svg>,
  // so an unguarded call re-replaces React-owned nodes on every render.
  React.useEffect(() => {
    if (!window.lucide) return;
    if (!document.querySelector("i[data-lucide]")) return;
    window.lucide.createIcons();
  });
}

function StatusBar() {
  return (
    <div className="statusbar">
      <span className="statusbar__time">9:41</span>
      <span className="statusbar__icons">{I("signal")}{I("wifi")}{I("battery-full")}</span>
    </div>
  );
}

function AppBar({ title, onBack, action }) {
  const { IconButton } = window.VelloDesignSystem_182a1b;
  return (
    <div className="appbar">
      <IconButton variant="ghost" label="Back" onClick={onBack}>{I("arrow-left")}</IconButton>
      <span className="appbar__title">{title}</span>
      {action || <span className="appbar__spacer"></span>}
    </div>
  );
}

/* Zero-data / no-results view (DS EmptyState pattern). */
function EmptyState({ icon = "inbox", title, text, action }) {
  return (
    <div className="empty">
      <span className="empty__med">{I(icon)}</span>
      <div className="empty__title">{title}</div>
      {text && <p className="empty__text">{text}</p>}
      {action && <div className="empty__act">{action}</div>}
    </div>
  );
}

function Sheet({ title, text, children, onDismiss }) {
  return (
    <React.Fragment>
      <div className="scrim" onClick={onDismiss}></div>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet__grip"></div>
        <div className="sheet__title">{title}</div>
        {text && <p className="sheet__text">{text}</p>}
        {children}
      </div>
    </React.Fragment>
  );
}

function Toast({ text, desk }) {
  return <div className={"toast" + (desk ? " toast--desk" : "")}>{I("check")}<span>{text}</span></div>;
}

/* ---------------- Data ---------------- */
const CATEGORIES = [
  { id: "all", label: "All", icon: "compass" },
  { id: "cleaning", label: "Cleaning", icon: "sparkles" },
  { id: "dog", label: "Dog walking", icon: "dog" },
  { id: "handyman", label: "Handyman", icon: "wrench" },
  { id: "tutoring", label: "Tutoring", icon: "graduation-cap" },
];

const PHOTO = {
  maya: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  devon: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  priya: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  marcus: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  sofia: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  grace: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  tessa: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
};

const NEIGHBORS = [
  { id: "maya", name: "Maya Rivera", photo: PHOTO.maya, cat: "dog", service: "60-min neighborhood dog walk",
    bio: "Dog walker & pet sitter, just up on 4th Ave.", rating: 4.9, reviews: 213, walk: 6, blocks: 4, mi: 0.3,
    price: 24, unit: "per walk", verified: true, available: true, featured: true },
  { id: "devon", name: "Devon Clarke", photo: PHOTO.devon, cat: "handyman", service: "Mount a TV or floating shelves",
    bio: "Handyman — shelves, leaky faucets, flat-pack furniture.", rating: 4.8, reviews: 96, walk: 9, blocks: 6, mi: 0.4,
    price: 65, unit: "flat", verified: true, available: false },
  { id: "priya", name: "Priya Anand", photo: PHOTO.priya, cat: "cleaning", service: "Deep clean, 3 hours",
    bio: "Deep cleans & move-outs. Brings her own eco supplies.", rating: 5.0, reviews: 51, walk: 12, blocks: 8, mi: 0.6,
    price: 90, unit: "per visit", verified: true, available: true },
  { id: "marcus", name: "Marcus Tran", photo: PHOTO.marcus, cat: "dog", service: "45-min dog walk",
    bio: "Walks two dogs at a time. Weekday afternoons only.", rating: 4.8, reviews: 74, walk: 8, blocks: 5, mi: 0.4,
    price: 22, unit: "per walk", verified: true, available: true },
  { id: "sofia", name: "Sofia Marino", photo: PHOTO.sofia, cat: "cleaning", service: "Weekly apartment clean",
    bio: "Weekly and biweekly cleans on 79th and 80th St.", rating: 4.9, reviews: 128, walk: 11, blocks: 7, mi: 0.5,
    price: 90, unit: "per visit", verified: true, available: false },
  { id: "grace", name: "Grace Lin", photo: PHOTO.grace, cat: "tutoring", service: "Math & SAT tutoring",
    bio: "Math and SAT prep, grades 7–12. Library or your place.", rating: 5.0, reviews: 39, walk: 14, blocks: 9, mi: 0.7,
    price: 40, unit: "per hr", verified: true, available: true },
];

const byId = (id) => NEIGHBORS.find(n => n.id === id);

/* Per-neighbor profile detail (services, reviews, response time). */
const DETAIL = {
  maya: {
    about: "I've lived on 4th Ave for six years and I've been walking neighbourhood dogs for three of them. I keep it to two dogs at a time so everyone gets a real walk, and you'll get a photo and a short note after every visit.",
    since: "On Vello since 2023", responds: "Replies in ~20 min",
    services: [
      { label: "60-min neighborhood walk", price: 24, unit: "per walk" },
      { label: "30-min quick walk", price: 16, unit: "per walk" },
      { label: "Drop-in pet sitting", price: 30, unit: "per visit" },
    ],
    reviews: [
      { who: "Nadia H.", at: "2 weeks ago", stars: 5, text: "Maya sends a photo every single time. My beagle now waits by the door at 3." },
      { who: "Tom B.", at: "Apr 2026", stars: 5, text: "Reliable and genuinely kind with nervous dogs. Worth every dollar." },
    ],
  },
  devon: {
    about: "Handyman work is my weekend trade — shelves, faucets, flat-pack furniture, picture walls. I bring my own tools and I'll tell you honestly if a job needs a licensed pro instead.",
    since: "On Vello since 2024", responds: "Replies in ~2 hrs",
    services: [
      { label: "Mount a TV or floating shelves", price: 65, unit: "flat" },
      { label: "Flat-pack furniture build", price: 45, unit: "flat" },
      { label: "Small plumbing fix", price: 55, unit: "flat" },
    ],
    reviews: [
      { who: "Grace L.", at: "3 weeks ago", stars: 5, text: "Two shelves, dead level, done in an hour. Cleaned up after himself too." },
      { who: "Jordan R.", at: "Mar 2026", stars: 4, text: "Great work. Ran a bit late but messaged me ahead of time." },
    ],
  },
  priya: {
    about: "Deep cleans and move-outs are what I do best. I bring my own eco supplies — no harsh smells left behind, safe around pets and kids.",
    since: "On Vello since 2024", responds: "Replies in ~1 hr",
    services: [
      { label: "Deep clean, 3 hours", price: 90, unit: "per visit" },
      { label: "Move-out clean", price: 140, unit: "flat" },
      { label: "Kitchen & bath refresh", price: 60, unit: "per visit" },
    ],
    reviews: [
      { who: "Sofia M.", at: "1 week ago", stars: 5, text: "Spotless. She found grime I didn't know I had." },
      { who: "Hana K.", at: "May 2026", stars: 5, text: "Left the eco spray under the sink for next time. Lovely touch." },
    ],
  },
  marcus: {
    about: "Weekday afternoons only — I finish my shift at 2 and walk until about 6. Two dogs at a time, and I'm happy to do a meet-and-greet first.",
    since: "On Vello since 2025", responds: "Replies in ~45 min",
    services: [
      { label: "45-min dog walk", price: 22, unit: "per walk" },
      { label: "Two-dog walk", price: 34, unit: "per walk" },
    ],
    reviews: [
      { who: "Jordan R.", at: "May 2026", stars: 5, text: "Juniper did great. Photo attached to the walk summary, which I loved." },
      { who: "Ruth O.", at: "Apr 2026", stars: 5, text: "Punctual and easy to reach. My two go out together happily." },
    ],
  },
  sofia: {
    about: "I clean weekly and biweekly for a handful of homes on 79th and 80th. Same day, same time, every week — that's how I like to work.",
    since: "On Vello since 2023", responds: "Replies in ~3 hrs",
    services: [
      { label: "Weekly apartment clean", price: 90, unit: "per visit" },
      { label: "Biweekly clean", price: 105, unit: "per visit" },
    ],
    reviews: [
      { who: "Nadia H.", at: "2 weeks ago", stars: 5, text: "Three months in and she has never missed a week." },
      { who: "Tom B.", at: "Feb 2026", stars: 5, text: "Quiet, thorough, trustworthy with a key. Exactly what I wanted." },
    ],
  },
  grace: {
    about: "Math and SAT prep for grades 7 through 12. We can work at the Bay Ridge library or at your kitchen table — whichever helps your kid focus.",
    since: "On Vello since 2025", responds: "Replies in ~1 hr",
    services: [
      { label: "Math tutoring, 1 hour", price: 40, unit: "per hr" },
      { label: "SAT prep, 90 min", price: 55, unit: "per session" },
    ],
    reviews: [
      { who: "Hana K.", at: "1 month ago", stars: 5, text: "My daughter went from a C to an A- in one semester. Grace is patient." },
      { who: "Ruth O.", at: "Mar 2026", stars: 5, text: "Explains things three different ways until it lands. Rare skill." },
    ],
  },
};
const detailFor = (id) => DETAIL[id] || DETAIL.maya;

const POPULAR = [
  { id: "p1", title: "Weekly apartment clean", cat: "cleaning", catLabel: "Cleaning", by: "sofia",
    photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=420&q=70", price: 90, unit: "per visit", rating: 4.9 },
  { id: "p2", title: "60-min neighborhood dog walk", cat: "dog", catLabel: "Dog walking", by: "marcus",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=420&q=70", price: 24, unit: "per walk", rating: 4.8 },
  { id: "p3", title: "Mount a TV or floating shelves", cat: "handyman", catLabel: "Handyman", by: "devon",
    photo: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=420&q=70", price: 65, unit: "flat", rating: 4.8 },
  { id: "p4", title: "Math & SAT tutoring", cat: "tutoring", catLabel: "Tutoring", by: "grace",
    photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=420&q=70", price: 40, unit: "per hr", rating: 5.0 },
];

const NAV = [
  { id: "home", label: "Home", icon: I("home") },
  { id: "bookings", label: "Bookings", icon: I("calendar") },
  { id: "messages", label: "Messages", icon: I("message-circle"), badge: 2 },
  { id: "profile", label: "Profile", icon: I("user") },
];

/* Jordan's open help request */
const REQUEST = {
  title: "Weekday afternoon walks for Juniper",
  catLabel: "Dog walking",
  posted: "Posted 2 days ago",
  when: "Weekdays at 3:00 PM",
  starts: "Mon, Jun 15",
  where: "4th Ave & 82nd St",
  budget: "$20–30",
  budgetUnit: "per walk",
  notes: "Juniper is a 4-year-old beagle — friendly, pulls a little on the leash. She needs a 45–60 minute walk while I'm at work, ideally the same person each day so she gets used to them. Keys can live in the lockbox by the door.",
};

const RESPONDERS = [
  { id: "maya", quote: 24, top: true, reply: "Hi Jordan! I walk two beagles on 82nd already and I'm free at 3 every weekday. Happy to do a meet-and-greet with Juniper first." },
  { id: "marcus", quote: 22, reply: "I can take the 3 PM slot Monday through Thursday. Fridays I finish at 2, so I'd need to come by a little earlier that day." },
  { id: "tessa", quote: 28, reply: "Available all five afternoons and I send photo updates after every walk. I'm two blocks over on 84th.",
    person: { id: "tessa", name: "Tessa Boyd", photo: PHOTO.tessa, rating: 4.7, reviews: 18, walk: 7, blocks: 5, mi: 0.4, verified: true } },
];

const responderPerson = (r) => r.person || byId(r.id);

/* ---------------- Admin queue ---------------- */
const QTYPES = [
  { id: "application", label: "ID check", short: "ID checks", icon: "user-check" },
  { id: "review", label: "Flagged review", short: "Reviews", icon: "star" },
  { id: "message", label: "Reported message", short: "Messages", icon: "message-circle" },
  { id: "listing", label: "Reported request", short: "Requests", icon: "file-text" },
  { id: "dispute", label: "Payment dispute", short: "Disputes", icon: "credit-card" },
];
const qtype = (id) => QTYPES.find(t => t.id === id) || QTYPES[0];

const SEVERITY = {
  high: { label: "High", variant: "danger" },
  med: { label: "Medium", variant: "warning" },
  low: { label: "Low", variant: "neutral" },
};

const QUEUE = [
  { id: "q1", type: "application", severity: "high", age: 31,
    subject: "ID photo doesn't match selfie", detail: "Applicant: Ruth Okafor · dog walking",
    who: "Ruth Okafor", photo: PHOTO.tessa,
    quote: "Automated check flagged a mismatch between the submitted licence photo and the liveness selfie.",
    evidence: ["Licence expires Mar 2027 — valid", "Liveness selfie retried 3 times", "Address matches Bay Ridge service area"],
    stats: [["0", "Bookings"], ["—", "Rating"], ["2d", "In review"]] },
  { id: "q2", type: "dispute", severity: "high", age: 26,
    subject: "Charged twice for one clean", detail: "$180 · booking #4821 · Priya Anand",
    who: "Nadia Hassan", photo: PHOTO.priya,
    quote: "I was charged $90 twice for the same Tuesday clean. Priya only came once and she confirms it.",
    evidence: ["Two identical charges 40s apart", "Provider confirms a single visit", "Card network dispute not yet filed"],
    stats: [["14", "Bookings"], ["4.9", "Rating"], ["1d", "Open"]] },
  { id: "q3", type: "message", severity: "high", age: 9,
    subject: "Asked to pay outside Vello", detail: "Thread with Devon Clarke · 3 messages",
    who: "Devon Clarke", photo: PHOTO.devon,
    quote: "Reported message: “Cash is easier for me — can you just Venmo me instead of booking through the app?”",
    evidence: ["Off-platform payment request", "Provider has 2 prior warnings", "Booking was completed and paid in-app"],
    stats: [["96", "Bookings"], ["4.8", "Rating"], ["2", "Warnings"]] },
  { id: "q4", type: "review", severity: "med", age: 18,
    subject: "Review names a neighbor's child", detail: "1★ on Grace Lin · tutoring",
    who: "Anon reporter", photo: PHOTO.grace,
    quote: "Review contains a minor's full name and school schedule. Reported by the provider for privacy.",
    evidence: ["Names a minor and their school", "Reviewer had one completed session", "Rating itself is not disputed"],
    stats: [["39", "Reviews"], ["5.0", "Rating"], ["1", "Reports"]] },
  { id: "q5", type: "listing", severity: "med", age: 5,
    subject: "Request asks for unlicensed electrical work", detail: "“Rewire two outlets” · Bay Ridge",
    who: "Tom Bexley", photo: PHOTO.marcus,
    quote: "Neighbors flagged this request as out of scope for the handyman category — it needs a licensed electrician.",
    evidence: ["Panel work is outside handyman scope", "3 neighbor flags in 4 hours", "No provider has accepted yet"],
    stats: [["6", "Requests"], ["4.6", "Rating"], ["3", "Flags"]] },
  { id: "q6", type: "application", severity: "low", age: 3,
    subject: "Background check came back clear", detail: "Applicant: Hana Kim · tutoring",
    who: "Hana Kim", photo: PHOTO.sofia,
    quote: "All checks passed. Needs a final human approval before the profile goes live in Bay Ridge.",
    evidence: ["Criminal check clear", "ID verified on first try", "Two references confirmed"],
    stats: [["0", "Bookings"], ["—", "Rating"], ["3h", "In review"]] },
  { id: "q7", type: "review", severity: "low", age: 2,
    subject: "Suspected duplicate review", detail: "5★ on Maya Rivera · dog walking",
    who: "Auto-detect", photo: PHOTO.maya,
    quote: "Near-identical text posted twice by the same household within an hour.",
    evidence: ["Same device fingerprint", "Text 94% similar to review #2211", "Both tied to real bookings"],
    stats: [["213", "Reviews"], ["4.9", "Rating"], ["0", "Reports"]] },
  { id: "q8", type: "dispute", severity: "med", age: 12,
    subject: "Refund request after late cancel", detail: "$24 · booking #4907 · Marcus Tran",
    who: "Jordan Reyes", photo: PHOTO.marcus,
    quote: "Cancelled 40 minutes before the walk. Requester asks for a full refund; policy allows 50%.",
    evidence: ["Cancelled inside the 1-hour window", "Provider had already travelled", "First late cancel on this account"],
    stats: [["22", "Bookings"], ["4.9", "Rating"], ["1", "Late cancels"]] },
];

const REJECT_REASONS = ["Policy violation", "Not enough evidence", "Duplicate report", "Out of scope", "Needs legal review"];

const ADMIN_NAV = [
  { id: "queue", label: "Queue", icon: "inbox" },
  { id: "neighbors", label: "Neighbors", icon: "users" },
  { id: "bookings", label: "Bookings", icon: "calendar" },
  { id: "payouts", label: "Payouts", icon: "credit-card" },
  { id: "settings", label: "Settings", icon: "settings" },
];

/* ---------------- Bookings ---------------- */
const BOOKINGS = {
  upcoming: [
    { id: "b1", who: "maya", service: "60-min neighborhood dog walk", date: "Mon, Jun 15", time: "3:00 PM",
      price: 24, repeat: true, days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "confirmed", when: "Weekdays at 3:00 PM" },
    { id: "b2", who: "devon", service: "Mount a TV or floating shelves", date: "Thu, Jun 18", time: "10:00 AM",
      price: 65, repeat: false, status: "pending", when: "Thu, Jun 18 at 10:00 AM" },
  ],
  past: [
    { id: "b3", who: "priya", service: "Deep clean, 3 hours", date: "Tue, Jun 2", time: "1:00 PM",
      price: 90, status: "done", rated: 5 },
    { id: "b4", who: "marcus", service: "45-min dog walk", date: "Fri, May 29", time: "3:00 PM",
      price: 22, status: "done", rated: null },
    { id: "b5", who: "sofia", service: "Weekly apartment clean", date: "Wed, May 20", time: "11:00 AM",
      price: 90, status: "cancelled" },
  ],
};

const BK_STATUS = {
  confirmed: { label: "Confirmed", variant: "success" },
  pending: { label: "Waiting on reply", variant: "warning" },
  done: { label: "Completed", variant: "neutral" },
  cancelled: { label: "Cancelled", variant: "neutral" },
};

/* ---------------- Messages ---------------- */
const THREADS = [
  { id: "t1", who: "maya", unread: 2, at: "9:24 AM",
    messages: [
      { from: "them", text: "Hi Jordan! Just confirming 3 PM starting Monday — does Juniper have a favorite route?", at: "9:20 AM" },
      { from: "them", text: "Also happy to do a quick meet-and-greet Sunday if that helps.", at: "9:24 AM" },
    ] },
  { id: "t2", who: "devon", unread: 1, at: "Yesterday",
    messages: [
      { from: "me", text: "Hi Devon — two floating shelves in the hallway, about 4 ft each.", at: "Tue 4:02 PM" },
      { from: "them", text: "Got it. Plaster or drywall? Changes the anchors I bring.", at: "Yesterday" },
    ] },
  { id: "t3", who: "priya", unread: 0, at: "Jun 2",
    messages: [
      { from: "them", text: "All done! Left the eco spray under the sink for next time.", at: "Jun 2" },
      { from: "me", text: "Place looks amazing — thank you Priya!", at: "Jun 2" },
    ] },
  { id: "t4", who: "marcus", unread: 0, at: "May 29",
    messages: [
      { from: "them", text: "Juniper did great today. Photo attached to the walk summary.", at: "May 29" },
    ] },
];

/* ---------------- Profile ---------------- */
const PROFILE = {
  name: "Jordan Reyes",
  hood: "Bay Ridge, Brooklyn",
  since: "Neighbor since 2024",
  stats: [["22", "Bookings"], ["4.9", "Your rating"], ["6", "Neighbors"]],
};

const PROFILE_ROWS = [
  { id: "payment", label: "Payment methods", detail: "Visa ·· 4417", icon: "credit-card" },
  { id: "address", label: "Saved addresses", detail: "412 82nd St, Apt 3R", icon: "map-pin" },
  { id: "favorites", label: "Saved neighbors", detail: "3 saved", icon: "heart" },
  { id: "help", label: "Help & safety", icon: "shield-check" },
];

const DIST_ICON = { walk: "footprints", blocks: "milestone", mi: "map-pin" };
function distanceLabel(n, fmt) {
  if (fmt === "blocks") return `${n.blocks} blocks`;
  if (fmt === "mi") return `${n.mi} mi away`;
  return `${n.walk} min walk`;
}
const money = (v) => (Math.round(v * 100) / 100).toFixed(2);

window.VelloFlow = {
  I, VerifiedMark, AvatarVerified, Chev, ScrollRow, StatusBar, AppBar, EmptyState, Sheet, Toast, useIcons,
  CATEGORIES, NEIGHBORS, POPULAR, NAV, REQUEST, RESPONDERS, responderPerson, byId, DETAIL, detailFor,
  QTYPES, qtype, SEVERITY, QUEUE, REJECT_REASONS, ADMIN_NAV,
  BOOKINGS, BK_STATUS, THREADS, PROFILE, PROFILE_ROWS,
  DIST_ICON, distanceLabel, money, PHOTO,
};
```

### Prototype — 2. Vello flow — home screen (entry point for the whole flow).

```jsx
/* Vello flow — home screen (entry point for the whole flow). */

function HomeScreen({ tweaks, cat, setCat, favorites, toggleFav, onOpenRequest, onBook, request, responders, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, ScrollRow, AvatarVerified, Chev, EmptyState, distanceLabel, DIST_ICON, CATEGORIES, NEIGHBORS, POPULAR, byId } = F;
  const { Input, Tag, Avatar, Rating, IconButton, Button } = window.VelloDesignSystem_182a1b;
  const REQUEST = request || F.REQUEST;
  const RESPONDERS = responders || F.RESPONDERS;

  const neighbors = cat === "all" ? NEIGHBORS : NEIGHBORS.filter(n => n.cat === cat);
  const popular = cat === "all" ? POPULAR : POPULAR.filter(p => p.cat === cat);
  const catLabel = (CATEGORIES.find(c => c.id === cat) || {}).label;

  return (
    <div className="scroll">
      <div className="head">
        <div className="head__row">
          <LocationPicker variant={tweaks.locationStyle} />
          <span className="bell">
            <IconButton variant="secondary" label="Notifications" onClick={() => onToast("No new notifications")}>{I("bell")}</IconButton>
            <span className="bell__dot"></span>
          </span>
        </div>
        {tweaks.showGreeting && <h1 className="head__greet">Trusted hands<br />on your block.</h1>}
        <Input
          aria-label="Search for help"
          placeholder="Search cleaning, dog walking, tutors…"
          leadingIcon={I("search")}
          trailingIcon={I("sliders-horizontal")}
          style={tweaks.showGreeting ? undefined : { marginTop: 16 }}
        />
      </div>

      <div className="section" style={{ marginTop: 18 }}>
        <ScrollRow className="cats">
          {CATEGORIES.map(c => (
            <Tag key={c.id} selected={cat === c.id} icon={I(c.icon)} onClick={() => setCat(c.id)}>{c.label}</Tag>
          ))}
        </ScrollRow>
      </div>

      <div className="section" style={{ marginTop: 20 }}>
        <button className="orq" type="button" onClick={onOpenRequest}>
          <span className="orq__eyebrow">{I("file-text")}Your open request</span>
          <span className="orq__chev"><Chev /></span>
          <div className="orq__title">{REQUEST.title}</div>
          <div className="orq__foot">
            {RESPONDERS.length ? (
              <React.Fragment>
                <span className="orq__stack">
                  {RESPONDERS.map(r => {
                    const p = F.responderPerson(r);
                    return <Avatar key={r.id} src={p.photo} name={p.name} size="sm" />;
                  })}
                </span>
                <span className="orq__count">{RESPONDERS.length} neighbors responded</span>
              </React.Fragment>
            ) : (
              <span className="orq__count orq__count--wait">{I("clock")}Waiting for replies</span>
            )}
          </div>
        </button>
      </div>

      <div className="section">
        <div className="section__head">
          <div className="section__title">
            Trusted on your block
            <small>Verified by your neighborhood, minutes away</small>
          </div>
          <button className="section__link" onClick={() => onToast("Showing everyone nearby")}>See all</button>
        </div>
        <div className="section__tools">
          <button className="maplink" type="button" onClick={() => onToast("Map view is next up")}>{I("map")}View on map</button>
        </div>
        {neighbors.length ? (
          <div className="neighbors">
            {neighbors.map(n => (
              <NeighborCard key={n.id} n={n} distFmt={tweaks.distanceFormat} featuredOn={tweaks.featuredGlow} onClick={() => onBook(n)} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="compass"
            title={`No ${(catLabel || "").toLowerCase()} nearby yet`}
            text="We're still signing up neighbors in Bay Ridge for this one. Post a request and we'll find you someone."
            action={<Button variant="outline" size="sm" onClick={onOpenRequest}>See your open request</Button>}
          />
        )}
      </div>

      {popular.length > 0 && (
        <div className="section">
          <div className="section__head">
            <div className="section__title">Popular this week</div>
            <button className="section__link" onClick={() => onToast("Showing all services")}>See all</button>
          </div>
          <div className="pop">
            {popular.map(s => (
              <ServiceCard key={s.id} s={s} faved={!!favorites[s.id]} onFav={() => toggleFav(s.id)} onClick={() => onBook(byId(s.by), s)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LocationPicker({ variant = "inline" }) {
  const { I } = window.VelloFlow;
  const pin = I("map-pin", { className: "loc__pin" });
  const chev = I("chevron-down", { className: "loc__chev" });
  if (variant === "pill") {
    return (
      <button className="loc loc--pill" type="button">
        {pin}<span className="loc__name">Bay Ridge, Brooklyn</span>{chev}
      </button>
    );
  }
  if (variant === "stacked") {
    return (
      <button className="loc loc--stacked" type="button">
        <span className="loc__disc">{I("map-pin")}</span>
        <span>
          <span className="loc__eyebrow">Your neighborhood</span>
          <span className="loc__name">Bay Ridge, Brooklyn {chev}</span>
        </span>
      </button>
    );
  }
  return (
    <button className="loc loc--inline" type="button">
      <span className="loc__eyebrow">Your neighborhood</span>
      <span className="loc__line">{pin}<span className="loc__name">Bay Ridge, Brooklyn</span>{chev}</span>
    </button>
  );
}

function NeighborCard({ n, distFmt = "walk", featuredOn = true, onClick }) {
  const { I, AvatarVerified, Chev, distanceLabel, DIST_ICON } = window.VelloFlow;
  const { Rating } = window.VelloDesignSystem_182a1b;
  const featured = featuredOn && n.featured;
  return (
    <button className={"nb" + (featured ? " nb--featured" : "")} type="button" onClick={onClick}>
      <AvatarVerified n={n} />
      <div className="nb__body">
        <div className="nb__top">
          <span className="nb__name">{n.name}</span>
          {n.available && <span className="nb__avail"><i></i>Available</span>}
        </div>
        <p className="nb__bio">{n.bio}</p>
        <div className="nb__price">from ${n.price} <span>/ {n.unit.replace("per ", "")}</span></div>
        <div className="nb__meta">
          <span className="nb__walk">{I(DIST_ICON[distFmt])}{distanceLabel(n, distFmt)}</span>
          <Rating value={n.rating} size="sm" />
        </div>
      </div>
      <span className="nb__tap" aria-hidden="true"><Chev /></span>
    </button>
  );
}

function ServiceCard({ s, faved, onFav, onClick }) {
  const { I, byId } = window.VelloFlow;
  const { Avatar } = window.VelloDesignSystem_182a1b;
  const person = byId(s.by) || {};
  return (
    <button className="svc" type="button" onClick={onClick}>
      <div className="svc__thumb">
        <img src={s.photo} alt={s.title} loading="lazy" />
        <span
          className="svc__fav" role="button" aria-pressed={faved}
          aria-label={faved ? "Remove from favorites" : "Save to favorites"}
          onClick={(e) => { e.stopPropagation(); onFav(); }}
        >{I("heart")}</span>
        <span className="svc__cat">{s.catLabel}</span>
      </div>
      <div className="svc__pad">
        <div className="svc__title">{s.title}</div>
        <div className="svc__by">
          <Avatar src={person.photo} name={person.name} size="sm" />
          <span className="svc__byname">{person.name}</span>
        </div>
        <div className="svc__foot">
          <span className="svc__price"><b>${s.price}</b> <span>{s.unit}</span></span>
          <span className="svc__rate">{I("star")}{s.rating.toFixed(1)}</span>
        </div>
      </div>
    </button>
  );
}

Object.assign(window, { HomeScreen, LocationPicker, NeighborCard, ServiceCard });
```

### Prototype — 3. Vello flow — request detail: a help request Jordan posted, with the neighbors who replied.

```jsx
/* Vello flow — request detail: a help request Jordan posted, with the neighbors who replied. */

function RequestScreen({ tweaks, closed, request, responders, onClose, onBack, onBook, onHome, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, Sheet, AppBar, EmptyState, responderPerson, distanceLabel, DIST_ICON } = F;
  const { Badge, Button, IconButton, Rating } = window.VelloDesignSystem_182a1b;
  const [confirmClose, setConfirmClose] = useState(false);
  F.useIcons();
  const REQUEST = request || F.REQUEST;
  const RESPONDERS = responders || F.RESPONDERS;

  return (
    <React.Fragment>
      <AppBar title="Your request" onBack={onBack} />
      <div className="scroll">
        <div className={"rq" + (closed ? " rq--closed" : "")}>
          <div className="rq__head">
            {closed
              ? <Badge variant="neutral" icon={I("check")}>Closed</Badge>
              : <Badge variant="success" dot>Open</Badge>}
            <Badge variant="brand" icon={I(REQUEST.catId ? (F.CATEGORIES.find(c => c.id === REQUEST.catId) || {}).icon : "dog")}>{REQUEST.catLabel}</Badge>
          </div>
          <h1 className="rq__title">{REQUEST.title}</h1>
          <div className="rq__posted">{REQUEST.posted}</div>

          <div className="rq__grid">
            <div className="rq__cell">
              <span className="rq__label">{I("clock")}When</span>
              <div className="rq__val">{REQUEST.when}</div>
            </div>
            <div className="rq__cell">
              <span className="rq__label">{I("calendar")}Starts</span>
              <div className="rq__val">{REQUEST.starts}</div>
            </div>
            <div className="rq__cell">
              <span className="rq__label">{I("map-pin")}Where</span>
              <div className="rq__val">{REQUEST.where}</div>
            </div>
            <div className="rq__cell">
              <span className="rq__label">{I("banknote")}Budget</span>
              <div className="rq__val rq__val--mono">{REQUEST.budget} <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 12, color: "var(--text-muted)" }}>{REQUEST.budgetUnit}</span></div>
            </div>
          </div>

          <p className="rq__notes">{REQUEST.notes}</p>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">
              {RESPONDERS.length ? `${RESPONDERS.length} neighbors responded` : "Replies"}
              <small>{closed
                ? "This request is closed to new replies"
                : RESPONDERS.length ? "Verified by your neighborhood, minutes away" : "We've shown it to verified neighbors nearby"}</small>
            </div>
          </div>
          {RESPONDERS.length ? (
          <div className="neighbors">
            {RESPONDERS.map(r => {
              const p = responderPerson(r);
              return (
                <div key={r.id} className={"resp" + (r.top && !closed ? " resp--top" : "")}>
                  <div className="resp__row">
                    <AvatarVerified n={p} />
                    <div className="resp__body">
                      <div className="resp__top">
                        <span className="resp__name">{p.name}</span>
                        {r.top && !closed && <Badge variant="accent" size="sm">Best match</Badge>}
                      </div>
                      <div className="resp__meta">
                        <span className="nb__walk">{I(DIST_ICON[tweaks.distanceFormat])}{distanceLabel(p, tweaks.distanceFormat)}</span>
                        <Rating value={p.rating} count={p.reviews} size="sm" />
                      </div>
                    </div>
                  </div>
                  <p className="resp__quote">{r.reply}</p>
                  <div className="resp__foot">
                    <span className="resp__price">${r.quote} <span>per walk</span></span>
                    <IconButton variant="secondary" label={`Message ${p.name}`} onClick={() => onToast(`Message sent to ${p.name.split(" ")[0]}`)}>{I("message-circle")}</IconButton>
                    <Button variant="primary" size="sm" disabled={closed} onClick={() => onBook(p, r)}>
                      Book {p.name.split(" ")[0]}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          ) : (
            <EmptyState
              icon="clock"
              title="No replies yet"
              text="Neighbors usually answer within a couple of hours. We'll let you know the moment someone does."
              action={<Button variant="outline" size="sm" onClick={onHome}>Browse neighbors instead</Button>}
            />
          )}
        </div>

        {!closed && (
          <div className="rq__quiet">
            <button className="quietlink" onClick={() => onToast("Editing isn't wired up in this prototype")}>Edit request</button>
            <button className="quietlink quietlink--danger" onClick={() => setConfirmClose(true)}>Close request</button>
          </div>
        )}
      </div>

      {confirmClose && (
        <Sheet
          title="Close this request?"
          text="Your three neighbors will stop seeing it, and nobody new can reply. You can always post it again."
          onDismiss={() => setConfirmClose(false)}
        >
          <div className="sheet__actions">
            <Button variant="primary" size="lg" className="vl-btn--full" onClick={() => setConfirmClose(false)}>Keep it open</Button>
            <div className="sheet__quiet">
              <button className="quietlink quietlink--danger" onClick={() => { setConfirmClose(false); onClose(); onToast("Request closed"); }}>Close request</button>
            </div>
          </div>
        </Sheet>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { RequestScreen });
```

### Prototype — 4. Vello flow — post a help request. One screen, validated on submit.

```jsx
/* Vello flow — post a help request. One screen, validated on submit. */

const REQ_WHEN = ["Weekday afternoons", "Weekday mornings", "Evenings", "Weekends", "One-off"];
const REQ_BUDGET = ["$15–25", "$25–40", "$40–60", "$60+"];
const REQ_STARTS = ["Mon, Jun 15", "Tue, Jun 16", "Wed, Jun 17", "Flexible"];
const REQ_UNIT = { dog: "per walk", cleaning: "per visit", handyman: "flat", tutoring: "per hr" };
const REQ_NOTE_MAX = 400;

function NewRequestScreen({ onBack, onPost, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AppBar, CATEGORIES } = F;
  const { Button, Input, Tag } = window.VelloDesignSystem_182a1b;
  const [cat, setCat] = useState(null);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState(null);
  const [starts, setStarts] = useState(REQ_STARTS[0]);
  const [where, setWhere] = useState("412 82nd St, Apt 3R");
  const [budget, setBudget] = useState(null);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState({});
  F.useIcons();

  const cats = CATEGORIES.filter(c => c.id !== "all");
  const clear = (k) => setErr(e => ({ ...e, [k]: null }));

  const post = () => {
    const next = {};
    if (!cat) next.cat = "Pick what kind of help you need.";
    if (!title.trim()) next.title = "Give your request a short title.";
    if (!when) next.when = "Let neighbors know when you need them.";
    if (!where.trim()) next.where = "We need an address to show nearby neighbors.";
    if (!budget) next.budget = "A rough budget helps neighbors reply.";
    setErr(next);
    if (Object.keys(next).length) return;
    onPost({
      title: title.trim(),
      catLabel: (cats.find(c => c.id === cat) || {}).label,
      catId: cat,
      posted: "Posted just now",
      when,
      starts,
      where: where.trim(),
      budget,
      budgetUnit: REQ_UNIT[cat] || "per visit",
      notes: notes.trim(),
    });
  };

  const Err = ({ k }) => err[k] ? <div className="bk__err">{I("alert-triangle")}{err[k]}</div> : null;

  return (
    <React.Fragment>
      <AppBar title="Post a request" onBack={onBack} />
      <div className="scroll">
        <div className="nr">
          <p className="nr__lede">Tell your block what you need. Verified neighbors nearby can reply with a quote.</p>

          <div className="bk__group">
            <div className="bk__legend">What do you need?</div>
            <div className="bk__chips">
              {cats.map(c => (
                <Tag key={c.id} icon={I(c.icon)} selected={cat === c.id} onClick={() => { setCat(c.id); clear("cat"); }}>{c.label}</Tag>
              ))}
            </div>
            <Err k="cat" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">Title</div>
            <Input
              aria-label="Request title" placeholder="e.g. Weekday walks for Juniper"
              value={title} maxLength={70}
              onChange={(e) => { setTitle(e.target.value); clear("title"); }}
            />
            <Err k="title" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">When?</div>
            <div className="bk__chips">
              {REQ_WHEN.map(w => (
                <Tag key={w} selected={when === w} onClick={() => { setWhen(w); clear("when"); }}>{w}</Tag>
              ))}
            </div>
            <Err k="when" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">Starting</div>
            <div className="bk__chips">
              {REQ_STARTS.map(s => (
                <Tag key={s} selected={starts === s} onClick={() => setStarts(s)}>{s}</Tag>
              ))}
            </div>
          </div>

          <div className="bk__group">
            <div className="bk__legend">Where?</div>
            <Input
              aria-label="Address" placeholder="Street address" leadingIcon={I("map-pin")}
              value={where} onChange={(e) => { setWhere(e.target.value); clear("where"); }}
            />
            <Err k="where" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">
              <span>Budget</span>
              <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{REQ_UNIT[cat] || "per visit"}</span>
            </div>
            <div className="bk__chips">
              {REQ_BUDGET.map(b => (
                <Tag key={b} selected={budget === b} onClick={() => { setBudget(b); clear("budget"); }}>{b}</Tag>
              ))}
            </div>
            <Err k="budget" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">
              <span>Anything else?</span>
              <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>Optional</span>
            </div>
            <textarea
              className="bk__note" aria-label="Request details" maxLength={REQ_NOTE_MAX}
              placeholder="Pets, access, supplies — whatever a neighbor should know before replying."
              value={notes} onChange={(e) => setNotes(e.target.value)}
            />
            <div className="bk__counter">{notes.length} / {REQ_NOTE_MAX}</div>
          </div>
        </div>

        <div className="bk__cta">
          <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("send")} onClick={post}>
            Post to your block
          </Button>
        </div>
        <div className="bk__cancelwrap">
          <button className="quietlink" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { NewRequestScreen });
```

### Prototype — 5. Vello flow — neighbor detail: the full profile you land on from a card tap.

```jsx
/* Vello flow — neighbor detail: the full profile you land on from a card tap. */

function NeighborScreen({ n, tweaks, onBack, onBook, onMessage, onToast, favorited, onFav }) {
  const F = window.VelloFlow;
  const { I, VerifiedMark, AppBar, Chev, detailFor, distanceLabel, DIST_ICON } = F;
  const { Avatar, Badge, Button, IconButton, Rating } = window.VelloDesignSystem_182a1b;
  const d = detailFor(n.id);
  F.useIcons();

  return (
    <React.Fragment>
      <AppBar
        title={n.name}
        onBack={onBack}
        action={
          <IconButton variant="ghost" label={favorited ? "Remove from favorites" : "Save to favorites"} onClick={onFav}>
            <svg className={"nbd__heart" + (favorited ? " nbd__heart--on" : "")} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
          </IconButton>
        }
      />

      <div className="scroll">
        <div className="nbd__hero">
          <span className="nbd__avatar">
            <Avatar src={n.photo} name={n.name} size="xl" />
            {n.verified && <span className="nbd__vmark"><VerifiedMark size={32} /></span>}
          </span>
          <div className="nbd__name">{n.name}</div>
          <div className="nbd__svc">{n.service}</div>
          <div className="nbd__badges">
            {n.available
              ? <span className="nb__avail"><i></i>Available</span>
              : <Badge variant="neutral" size="sm">Booked up this week</Badge>}
            <span className="nb__walk">{I(DIST_ICON[tweaks.distanceFormat])}{distanceLabel(n, tweaks.distanceFormat)}</span>
          </div>
          <div className="nbd__stats">
            <div className="nbd__stat">
              <div className="nbd__statv">{n.rating.toFixed(1)}</div>
              <div className="nbd__statk">{n.reviews} reviews</div>
            </div>
            <div className="nbd__stat">
              <div className="nbd__statv">${n.price}</div>
              <div className="nbd__statk">from / {n.unit.replace("per ", "")}</div>
            </div>
            <div className="nbd__stat">
              <div className="nbd__statv nbd__statv--sm">{d.responds.replace("Replies in ", "")}</div>
              <div className="nbd__statk">response</div>
            </div>
          </div>
        </div>

        <div className="nbd__sec">
          <div className="nbd__h"><span>About</span></div>
          <p className="nbd__about">{d.about}</p>
          <div className="nbd__since">{I("shield-check")}{d.since} · Background-checked by Vello</div>
        </div>

        <div className="nbd__sec">
          <div className="nbd__h"><span>What {n.name.split(" ")[0]} offers</span></div>
          <div className="nbd__svcs">
            {d.services.map(s => (
              <button key={s.label} className="nbd__svcrow" type="button" onClick={() => onBook(n, s)}>
                <span className="nbd__svcl">{s.label}</span>
                <span className="nbd__svcp">${s.price} <span>{s.unit}</span></span>
                <span className="nbd__svcchev"><Chev /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="nbd__sec">
          <div className="nbd__h">
            <span>Reviews</span>
            <span className="nbd__hrate"><Rating value={n.rating} count={n.reviews} size="sm" /></span>
          </div>
          <div className="nbd__revs">
            {d.reviews.map(r => (
              <div key={r.who + r.at} className="nbd__rev">
                <div className="nbd__revtop">
                  <Avatar name={r.who} size="sm" />
                  <span className="nbd__revwho">{r.who}</span>
                  <span className="nbd__revat">{r.at}</span>
                </div>
                <Rating value={r.stars} size="sm" starsOnly />
                <p className="nbd__revtext">{r.text}</p>
              </div>
            ))}
          </div>
          <div className="nbd__more">
            <button className="quietlink" onClick={() => onToast(`All ${n.reviews} reviews aren't in this prototype`)}>
              Read all {n.reviews} reviews
            </button>
          </div>
        </div>
      </div>

      <div className="nbd__cta">
        <IconButton variant="secondary" label={`Message ${n.name}`} onClick={() => onMessage(n.id)}>{I("message-circle")}</IconButton>
        <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("calendar-check")} onClick={() => onBook(n)}>
          Book {n.name.split(" ")[0]}
        </Button>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { NeighborScreen });
```

### Prototype — 6. Vello flow — booking screen.

```jsx
/* Vello flow — booking screen.
   One screen, three states: review (unconfirmed) → confirmed → cancelled.
   Action hierarchy: confirm is the only filled button; cancel is a quiet link below it. */

const BK_DATES = ["Mon, Jun 15", "Tue, Jun 16", "Wed, Jun 17"];
const BK_TIMES = ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const BK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const NOTE_MAX = 240;

function BookingScreen({ booking, tweaks, onBack, onHome, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, Sheet, AppBar, money, distanceLabel, DIST_ICON } = F;
  const { Button, Input, Switch, Rating, Badge } = window.VelloDesignSystem_182a1b;

  const provider = booking.provider;
  const [stage, setStage] = useState(booking.stage || "review");
  const [date, setDate] = useState(booking.date || BK_DATES[0]);
  const [time, setTime] = useState(booking.time || null);
  const [repeat, setRepeat] = useState(booking.repeat != null ? booking.repeat : !!booking.fromRequest);
  const [days, setDays] = useState(booking.days || (booking.fromRequest ? [...BK_DAYS] : []));
  const [address, setAddress] = useState("412 82nd St, Apt 3R");
  const [access, setAccess] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [askCancel, setAskCancel] = useState(false);
  F.useIcons();

  const unitPrice = booking.price != null ? booking.price : provider.price;
  const visits = repeat ? Math.max(days.length, 1) : 1;
  const subtotal = unitPrice * visits;
  const fee = subtotal * 0.1;
  const total = subtotal + fee;

  const toggleDay = (d) => {
    setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    setErrors(e => ({ ...e, days: null }));
  };

  const confirm = () => {
    const next = {};
    if (!time) next.time = "Pick a time so " + provider.name.split(" ")[0] + " knows when to come by.";
    if (!address.trim()) next.address = "We need an address to send her to.";
    if (repeat && days.length === 0) next.days = "Choose at least one weekday to repeat.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStage("confirmed");
    onToast("Booking confirmed");
  };

  const summaryRows = [
    ["Service", booking.serviceLabel],
    ["When", repeat ? `${days.join(", ")} at ${time}` : `${date} at ${time}`],
    ["Starts", date],
    ["Where", address],
    ["Total", `$${money(total)}`, true],
  ];

  return (
    <React.Fragment>
      <AppBar title={stage === "review" ? "Confirm booking" : "Your booking"} onBack={stage === "review" ? onBack : onHome} />
      <div className="scroll">
        {stage !== "review" && (
          <div className={"bk__banner" + (stage === "cancelled" ? " bk__banner--dead" : "")} style={{ marginBottom: 22 }}>
            <span className="bk__bicon">{I(stage === "cancelled" ? "x" : "check")}</span>
            <div>
              <div className="bk__btitle">
                {stage === "cancelled" ? "Booking cancelled" : `You're all set — see you ${repeat ? days[0] : date.split(",")[0]}!`}
              </div>
              <p className="bk__btext">
                {stage === "cancelled"
                  ? `We let ${provider.name.split(" ")[0]} know. Nothing was charged.`
                  : `${provider.name.split(" ")[0]} has the details and will message you if anything changes.`}
              </p>
            </div>
          </div>
        )}

        <div className="bk">
          <div className="bk__prov">
            <AvatarVerified n={provider} />
            <div className="bk__provbody">
              <div className="bk__provname">{provider.name}</div>
              <div className="bk__provsvc">{booking.serviceLabel}</div>
              <div className="nb__meta" style={{ marginTop: 8 }}>
                <span className="nb__walk">{I(DIST_ICON[tweaks.distanceFormat])}{distanceLabel(provider, tweaks.distanceFormat)}</span>
                <Rating value={provider.rating} size="sm" />
              </div>
            </div>
          </div>

          {stage === "review" ? (
            <React.Fragment>
              <div className="bk__group">
                <div className="bk__legend">Date</div>
                <div className="bk__chips">
                  {BK_DATES.map(d => (
                    <button key={d} type="button" className="vl-tag" aria-pressed={date === d}
                      data-selected={date === d ? "true" : undefined}
                      style={date === d ? { background: "var(--brand-primary)", color: "var(--brand-on-primary)", borderColor: "transparent" } : undefined}
                      onClick={() => setDate(d)}>{d}</button>
                  ))}
                </div>
              </div>

              <div className="bk__group">
                <div className="bk__legend">Time</div>
                <div className="bk__chips">
                  {BK_TIMES.map(t => (
                    <button key={t} type="button" className="vl-tag" aria-pressed={time === t}
                      style={time === t ? { background: "var(--brand-primary)", color: "var(--brand-on-primary)", borderColor: "transparent" } : undefined}
                      onClick={() => { setTime(t); setErrors(e => ({ ...e, time: null })); }}>{t}</button>
                  ))}
                </div>
                {errors.time && <div className="bk__err">{I("alert-triangle")}{errors.time}</div>}
              </div>

              <div className="bk__group">
                <div className="bk__switchrow">
                  <span className="bk__switchlabel">
                    Repeat every week
                    <small>Same neighbor, same time</small>
                  </span>
                  <Switch checked={repeat} onChange={(e) => { setRepeat(e.target.checked); setErrors(er => ({ ...er, days: null })); }} />
                </div>
                {repeat && (
                  <React.Fragment>
                    <div className="bk__days">
                      {BK_DAYS.map(d => (
                        <button key={d} type="button" className="bk__day" aria-pressed={days.includes(d)} onClick={() => toggleDay(d)}>{d}</button>
                      ))}
                    </div>
                    {errors.days && <div className="bk__err">{I("alert-triangle")}{errors.days}</div>}
                  </React.Fragment>
                )}
              </div>

              <div className="bk__group">
                <div className="bk__legend">Where</div>
                <Input
                  aria-label="Address"
                  placeholder="Street address"
                  leadingIcon={I("map-pin")}
                  value={address}
                  aria-invalid={errors.address ? "true" : undefined}
                  onChange={(e) => { setAddress(e.target.value); setErrors(er => ({ ...er, address: null })); }}
                />
                {errors.address && <div className="bk__err">{I("alert-triangle")}{errors.address}</div>}
                <div style={{ marginTop: 10 }}>
                  <Input
                    aria-label="Access notes"
                    placeholder="Lockbox code, buzzer, side gate…"
                    leadingIcon={I("key")}
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                  />
                </div>
              </div>

              <div className="bk__group">
                <div className="bk__legend">
                  <span>Anything else?</span>
                  <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>Optional</span>
                </div>
                <textarea
                  className="bk__note" aria-label="Notes for the neighbor" maxLength={NOTE_MAX}
                  placeholder={`Juniper pulls a little on the leash — ${provider.name.split(" ")[0]} should know.`}
                  value={note} onChange={(e) => setNote(e.target.value)}
                />
                <div className="bk__counter">{note.length} / {NOTE_MAX}</div>
              </div>

              <div className="bk__sum">
                <div className="bk__line"><span>${unitPrice} × {visits} {visits === 1 ? "visit" : "visits"}</span><b>${money(subtotal)}</b></div>
                <div className="bk__line"><span>Vello service fee</span><b>${money(fee)}</b></div>
                <div className="bk__total">
                  <span className="bk__totall">{repeat ? "Per week" : "Total"}</span>
                  <span className="bk__totalv">${money(total)}</span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="bk__sum" style={{ marginTop: 18 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
                {stage === "cancelled"
                  ? <Badge variant="neutral">Cancelled</Badge>
                  : <Badge variant="success" icon={I("check")}>Confirmed</Badge>}
              </div>
              {summaryRows.map(([k, v, strong]) => (
                <div key={k} className="bk__ro">
                  <span className="bk__rok">{k}</span>
                  <span className={"bk__rov" + (strong ? " bk__rov--mono" : "")}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirm is the only filled button on this screen. */}
        {stage === "review" && (
          <React.Fragment>
            <div className="bk__cta">
              <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("calendar-check")} onClick={confirm}>
                Confirm booking
              </Button>
            </div>
            <div className="bk__cancelwrap">
              <button className="quietlink" onClick={onBack}>Cancel</button>
            </div>
          </React.Fragment>
        )}

        {stage === "confirmed" && (
          <React.Fragment>
            <div className="bk__cta">
              <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("message-circle")}
                onClick={() => onToast(`Message sent to ${provider.name.split(" ")[0]}`)}>
                Message {provider.name.split(" ")[0]}
              </Button>
            </div>
            <div className="bk__cancelwrap">
              <button className="quietlink quietlink--danger" onClick={() => setAskCancel(true)}>Cancel booking</button>
            </div>
          </React.Fragment>
        )}

        {stage === "cancelled" && (
          <div className="bk__cta">
            <Button variant="primary" size="lg" className="vl-btn--full" onClick={onHome}>Find another neighbor</Button>
          </div>
        )}
      </div>

      {askCancel && (
        <Sheet
          title={`Cancel ${provider.name.split(" ")[0]}'s visit?`}
          text={`She's expecting you ${repeat ? days[0] : date.split(",")[0]} at ${time}. Cancelling under 24 hours out can affect your neighbor rating.`}
          onDismiss={() => setAskCancel(false)}
        >
          <div className="sheet__actions">
            <Button variant="primary" size="lg" className="vl-btn--full" onClick={() => setAskCancel(false)}>Keep booking</Button>
            <div className="sheet__quiet">
              <button className="quietlink quietlink--danger" onClick={() => { setAskCancel(false); setStage("cancelled"); onToast("Booking cancelled"); }}>
                Cancel booking
              </button>
            </div>
          </div>
        </Sheet>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { BookingScreen });
```

### Prototype — 7. Vello flow — bookings tab: upcoming and past, with manage / rebook entry points.

```jsx
/* Vello flow — bookings tab: upcoming and past, with manage / rebook entry points. */

function BookingsScreen({ tweaks, onManage, onRebook, onMessage, onToast, onHome }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, EmptyState, BOOKINGS, BK_STATUS, byId } = F;
  const { Tabs, Badge, Button, IconButton, Rating } = window.VelloDesignSystem_182a1b;
  const [tab, setTab] = useState("upcoming");
  F.useIcons();

  const list = BOOKINGS[tab];

  return (
    <React.Fragment>
      <div className="appbar" style={{ paddingTop: 2 }}>
        <span className="appbar__title appbar__title--lead">Your bookings</span>
      </div>
      <div className="scroll">
        <div className="tabsrow">
          <Tabs
            value={tab} onChange={setTab}
            items={[
              { id: "upcoming", label: "Upcoming", count: BOOKINGS.upcoming.length },
              { id: "past", label: "Past", count: BOOKINGS.past.length },
            ]}
          />
        </div>

        {list.length ? (
          <div className="bkl">
            {list.map(b => {
              const p = byId(b.who);
              const st = BK_STATUS[b.status];
              const dead = b.status === "cancelled";
              return (
                <div key={b.id} className={"bkl__card" + (dead ? " bkl__card--dead" : "")}>
                  <div className="bkl__row">
                    <AvatarVerified n={p} />
                    <div className="bkl__body">
                      <div className="bkl__who">{p.name}</div>
                      <div className="bkl__svc">{b.service}</div>
                    </div>
                    <Badge variant={st.variant} size="sm">{st.label}</Badge>
                  </div>

                  <div className="bkl__meta">
                    <span className="bkl__chip">{I("calendar")}{b.repeat ? b.when : `${b.date} · ${b.time}`}</span>
                    <span className="bkl__price">${b.price}{b.repeat ? " / walk" : ""}</span>
                  </div>

                  {tab === "upcoming" ? (
                    <div className="bkl__acts">
                      <Button variant="primary" size="sm" onClick={() => onManage(b)}>Manage</Button>
                      <Button variant="secondary" size="sm" onClick={() => onMessage(b.who)}>Message</Button>
                    </div>
                  ) : (
                    <div className="bkl__acts">
                      {!dead && (b.rated
                        ? <span className="bkl__rated">You rated <Rating value={b.rated} size="sm" starsOnly /></span>
                        : <Button variant="secondary" size="sm" leadingIcon={I("star")} onClick={() => onToast(`Thanks — we'll pass it to ${p.name.split(" ")[0]}`)}>Leave a rating</Button>
                      )}
                      <Button variant={dead ? "primary" : "ghost"} size="sm" onClick={() => onRebook(p, b)}>Book again</Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon="calendar"
            title={tab === "upcoming" ? "Nothing booked yet" : "No past bookings"}
            text={tab === "upcoming"
              ? "When you book someone on your block, it'll show up here."
              : "Once a visit wraps up, you'll find it here."}
            action={<Button variant="outline" size="sm" onClick={onHome}>Find help nearby</Button>}
          />
        )}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { BookingsScreen });
```

### Prototype — 8. Vello flow — messages tab: thread list + conversation with a working composer.

```jsx
/* Vello flow — messages tab: thread list + conversation with a working composer. */

function MessagesScreen({ openId, setOpenId, threads, onSend, onToast, onHome }) {
  const { useEffect, useRef } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, EmptyState, AppBar, byId } = F;
  const { Avatar, Button, IconButton, Input, Badge } = window.VelloDesignSystem_182a1b;
  F.useIcons();

  const thread = threads.find(t => t.id === openId) || null;

  if (thread) return <Conversation thread={thread} onBack={() => setOpenId(null)} onSend={onSend} />;

  return (
    <React.Fragment>
      <div className="appbar" style={{ paddingTop: 2 }}>
        <span className="appbar__title appbar__title--lead">Messages</span>
      </div>
      <div className="scroll">
        {threads.length ? (
          <div className="msg__list">
            {threads.map(t => {
              const p = byId(t.who);
              const last = t.messages[t.messages.length - 1];
              return (
                <button key={t.id} className="msg__row" type="button" onClick={() => setOpenId(t.id)}>
                  <AvatarVerified n={p} size="md" />
                  <span className="msg__body">
                    <span className="msg__top">
                      <span className="msg__who">{p.name}</span>
                      <span className="msg__at">{t.at}</span>
                    </span>
                    <span className={"msg__snip" + (t.unread ? " msg__snip--unread" : "")}>
                      {last.from === "me" ? "You: " : ""}{last.text}
                    </span>
                  </span>
                  {t.unread > 0 && <span className="msg__unread">{t.unread}</span>}
                </button>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon="message-circle"
            title="No messages yet"
            text="Reach out to a neighbor and your conversation will live here."
            action={<Button variant="outline" size="sm" onClick={onHome}>Find help nearby</Button>}
          />
        )}
      </div>
    </React.Fragment>
  );
}

function Conversation({ thread, onBack, onSend }) {
  const { useState, useRef, useEffect } = React;
  const F = window.VelloFlow;
  const { I, AppBar, byId } = F;
  const { IconButton, Badge } = window.VelloDesignSystem_182a1b;
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);
  const p = byId(thread.who);
  F.useIcons();

  useEffect(() => {
    const el = endRef.current;
    // Keep the newest message in view without scrollIntoView.
    if (el && el.parentElement) el.parentElement.scrollTop = el.parentElement.scrollHeight;
  }, [thread.messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    onSend(thread.id, text);
    setDraft("");
  };

  return (
    <React.Fragment>
      <AppBar
        title={p.name}
        onBack={onBack}
        action={<IconButton variant="ghost" label={`Call ${p.name}`}>{I("phone")}</IconButton>}
      />
      <div className="conv">
        <div className="conv__scroll">
          <div className="conv__day">Today</div>
          {thread.messages.map((m, i) => (
            <div key={i} className={"bub bub--" + (m.from === "me" ? "me" : "them")}>
              <div className="bub__text">{m.text}</div>
              <div className="bub__at">{m.at}</div>
            </div>
          ))}
          <div ref={endRef}></div>
        </div>
        <div className="conv__composer">
          <input
            className="conv__input" aria-label={`Message ${p.name}`} placeholder="Write a message…"
            value={draft} onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <IconButton variant="primary" label="Send" onClick={send} disabled={!draft.trim()}>{I("send")}</IconButton>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { MessagesScreen, Conversation });
```

### Prototype — 9. Vello flow — profile tab: Jordan's own account.

```jsx
/* Vello flow — profile tab: Jordan's own account. */

function ProfileScreen({ tweaks, settings, setSetting, onOpenRequest, onOpenAdmin, queueCount, request, responderCount, onToast }) {
  const F = window.VelloFlow;
  const { I, PROFILE, PROFILE_ROWS, Chev } = F;
  const { Avatar, Button, Badge, Switch } = window.VelloDesignSystem_182a1b;
  F.useIcons();
  const REQUEST = request || F.REQUEST;
  const replies = responderCount != null ? responderCount : F.RESPONDERS.length;

  return (
    <React.Fragment>
      <div className="appbar" style={{ paddingTop: 2 }}>
        <span className="appbar__title appbar__title--lead">Profile</span>
        <span style={{ marginRight: 6 }}>
          <Button variant="ghost" size="sm" leadingIcon={I("pencil")} onClick={() => onToast("Editing isn't wired up in this prototype")}>Edit</Button>
        </span>
      </div>

      <div className="scroll">
        <div className="pro__hero">
          <Avatar name={PROFILE.name} size="xl" />
          <div className="pro__name">{PROFILE.name}</div>
          <div className="pro__hood">{I("map-pin")}{PROFILE.hood}</div>
          <div className="pro__since">{PROFILE.since}</div>
          <div className="pro__stats">
            {PROFILE.stats.map(([v, k]) => (
              <div key={k} className="pro__stat">
                <div className="pro__statv">{v}</div>
                <div className="pro__statk">{k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section" style={{ marginTop: 22 }}>
          <div className="section__head">
            <div className="section__title">Your open request</div>
          </div>
          <div style={{ padding: "0 20px" }}>
            <button className="pro__req" type="button" onClick={onOpenRequest}>
              <span className="pro__reqt">{REQUEST.title}</span>
              <span className="pro__reqm">
                <Badge variant="success" size="sm" dot>Open</Badge>
                <span className="pro__reqc">{replies} {replies === 1 ? "reply" : "replies"}</span>
              </span>
              <span className="pro__reqchev"><Chev /></span>
            </button>
          </div>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">Account</div>
          </div>
          <div className="pro__rows">
            {PROFILE_ROWS.map(r => (
              <button key={r.id} className="pro__row" type="button" onClick={() => onToast(`${r.label} isn't part of this prototype`)}>
                <span className="pro__rowicon">{I(r.icon)}</span>
                <span className="pro__rowl">{r.label}</span>
                {r.detail && <span className="pro__rowd">{r.detail}</span>}
                <span className="pro__rowchev"><Chev /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">Notifications</div>
          </div>
          <div className="pro__rows">
            <div className="pro__switch">
              <span className="bk__switchlabel">
                New neighbors nearby
                <small>When someone verified joins your block</small>
              </span>
              <Switch checked={settings.nearby} onChange={(e) => setSetting("nearby", e.target.checked)} />
            </div>
            <div className="pro__switch">
              <span className="bk__switchlabel">
                Booking reminders
                <small>An hour before each visit</small>
              </span>
              <Switch checked={settings.reminders} onChange={(e) => setSetting("reminders", e.target.checked)} />
            </div>
            <div className="pro__switch">
              <span className="bk__switchlabel">
                Request replies
                <small>When a neighbor answers your request</small>
              </span>
              <Switch checked={settings.replies} onChange={(e) => setSetting("replies", e.target.checked)} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">
              Staff tools
              <small>You're on the Bay Ridge trust &amp; safety team</small>
            </div>
          </div>
          <div className="pro__rows">
            <button className="pro__row" type="button" onClick={onOpenAdmin}>
              <span className="pro__rowicon pro__rowicon--staff">{I("shield-check")}</span>
              <span className="pro__rowl">Moderation queue</span>
              {queueCount > 0 && <span className="pro__rowbadge">{queueCount}</span>}
              <span className="pro__rowchev"><Chev /></span>
            </button>
          </div>
        </div>

        <div className="pro__out">
          <button className="quietlink" onClick={() => onToast("Signed out — not really")}>Sign out</button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { ProfileScreen });
```

### Prototype — 10. Vello flow — admin moderation queue. Desktop (1280) and mobile (375) share one state hook.

```jsx
/* Vello flow — admin moderation queue. Desktop (1280) and mobile (375) share one state hook. */

function useQueue(onToast, items, setItems) {
  const { useState, useEffect } = React;
  const F = window.VelloFlow;
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState([]);
  const [activeId, setActiveId] = useState(F.QUEUE[0].id);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState(null);
  const [reasonErr, setReasonErr] = useState(false);

  const q = query.trim().toLowerCase();
  const visible = items.filter(it =>
    (filter === "all" || it.type === filter) &&
    (!q || it.subject.toLowerCase().includes(q) || it.who.toLowerCase().includes(q) ||
      it.detail.toLowerCase().includes(q) || F.qtype(it.type).label.toLowerCase().includes(q))
  );
  const active = visible.find(it => it.id === activeId) || null;

  // Keep the detail panel pointed at something real when filters change.
  useEffect(() => {
    if (visible.length && !visible.some(it => it.id === activeId)) setActiveId(visible[0].id);
  }, [filter, query, items]);

  const counts = { all: items.length };
  F.QTYPES.forEach(t => { counts[t.id] = items.filter(i => i.type === t.id).length; });

  const closeReject = () => { setRejecting(false); setReason(null); setReasonErr(false); };

  const resolve = (ids, verb) => {
    const list = Array.isArray(ids) ? ids : [ids];
    setItems(prev => {
      const next = prev.filter(i => !list.includes(i.id));
      setActiveId(cur => (list.includes(cur) ? (next[0] ? next[0].id : null) : cur));
      return next;
    });
    setPicked(prev => prev.filter(id => !list.includes(id)));
    closeReject();
    onToast(list.length > 1 ? `${list.length} items ${verb}` : `Item ${verb}`);
  };

  const submitReject = () => {
    if (!reason) { setReasonErr(true); return; }
    resolve(active.id, `rejected — ${reason.toLowerCase()}`);
  };

  const togglePick = (id) => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return { items, visible, active, activeId, setActiveId, filter, setFilter, query, setQuery,
    picked, setPicked, togglePick, counts, resolve, rejecting, setRejecting, closeReject,
    reason, setReason, reasonErr, submitReject };
}

function TypeBadge({ type, size = "md" }) {
  const { I, qtype } = window.VelloFlow;
  const { Badge } = window.VelloDesignSystem_182a1b;
  const t = qtype(type);
  return <Badge variant="neutral" size={size} icon={I(t.icon)}>{t.label}</Badge>;
}

function SevBadge({ severity, size = "md" }) {
  const { SEVERITY } = window.VelloFlow;
  const { Badge } = window.VelloDesignSystem_182a1b;
  const s = SEVERITY[severity];
  return <Badge variant={s.variant} size={size}>{s.label}</Badge>;
}

const ageLabel = (h) => (h >= 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : `${h}h`);

/* ---------------- Detail panel body (shared) ---------------- */
function QueueDetail({ q, compact }) {
  const F = window.VelloFlow;
  const { I, REJECT_REASONS } = F;
  const { Button, Avatar } = window.VelloDesignSystem_182a1b;
  const it = q.active;
  return (
    <React.Fragment>
      <div className="adm__dbody">
        <p className="adm__dsec">Reported by</p>
        <div className="adm__who" style={{ fontSize: 13.5 }}>
          <Avatar src={it.photo} name={it.who} size="sm" />
          <span className="adm__whon">{it.who}</span>
          <span className={"adm__age" + (it.age >= 24 ? " adm__age--late" : "")} style={{ marginLeft: "auto" }}>
            {ageLabel(it.age)} old
          </span>
        </div>

        <p className="adm__dsec adm__dsec--sp">What was reported</p>
        <p className="adm__quote">{it.quote}</p>

        <p className="adm__dsec adm__dsec--sp">Evidence</p>
        <ul className="adm__ev">
          {it.evidence.map(e => <li key={e}>{I("check")}<span>{e}</span></li>)}
        </ul>

        <p className="adm__dsec adm__dsec--sp">Account history</p>
        <div className="adm__stats">
          {it.stats.map(([v, k]) => (
            <div key={k} className="adm__stat">
              <div className="adm__statv">{v}</div>
              <div className="adm__statk">{k}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="adm__dfoot">
        {q.rejecting ? (
          <div className="adm__reject">
            <div className="adm__rejt">Why are you rejecting this?</div>
            <div className="adm__rejchips">
              {REJECT_REASONS.map(r => (
                <button key={r} type="button" className="adm__rejchip" aria-pressed={q.reason === r} onClick={() => q.setReason(r)}>{r}</button>
              ))}
            </div>
            {q.reasonErr && <div className="bk__err">{I("alert-triangle")}Pick a reason before rejecting.</div>}
            <div style={{ display: "flex", gap: 9, marginTop: 13 }}>
              <button type="button" className="adm__danger" onClick={q.submitReject}>Confirm reject</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <button className="quietlink" onClick={q.closeReject}>Never mind</button>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <Button variant="primary" size={compact ? "md" : "lg"} className="vl-btn--full" leadingIcon={I("check")}
              onClick={() => q.resolve(it.id, "approved")}>
              Approve
            </Button>
            <div className="adm__frow">
              <Button variant="secondary" onClick={() => q.resolve(it.id, "escalated to legal")}>Escalate</Button>
              <Button variant="ghost" onClick={() => q.setRejecting(true)}>Reject</Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

/* ---------------- Desktop ---------------- */
function AdminDesktop({ onToast, onExit, items, setItems }) {
  const F = window.VelloFlow;
  const { I, EmptyState, QTYPES, ADMIN_NAV } = F;
  const { Input, Tabs, Checkbox, Button, Avatar } = window.VelloDesignSystem_182a1b;
  const q = useQueue(onToast, items, setItems);
  F.useIcons();

  const tabs = [{ id: "all", label: "All", count: q.counts.all }]
    .concat(QTYPES.map(t => ({ id: t.id, label: t.short, count: q.counts[t.id] })));

  return (
    <div className="adm">
      <aside className="adm__side">
        <div className="adm__brand">
          {I("sprout")}
          <span className="adm__brandname">Vello</span>
          <span className="adm__tagchip">Trust</span>
        </div>
        {ADMIN_NAV.map(n => (
          <button key={n.id} className="adm__navitem" aria-current={n.id === "queue" ? "true" : undefined}
            onClick={() => n.id !== "queue" && onToast(`${n.label} isn't part of this prototype`)}>
            {I(n.icon)}<span>{n.label}</span>
            {n.id === "queue" && q.counts.all > 0 && <span className="adm__navcount">{q.counts.all}</span>}
          </button>
        ))}
        <div className="adm__me">
          <Avatar name="Iris Bell" size="sm" />
          <div>
            <div className="adm__mename">Iris Bell</div>
            <div className="adm__merole">Trust &amp; safety</div>
          </div>
        </div>
        <button className="adm__exit" type="button" onClick={onExit}>
          {I("smartphone")}<span>Back to the app</span>
        </button>
      </aside>

      <main className="adm__main">
        <div className="adm__top">
          <h1 className="adm__h1">
            Moderation queue
            <small>{q.counts.all} open · Bay Ridge, Brooklyn</small>
          </h1>
          <div className="adm__search">
            <Input aria-label="Search the queue" placeholder="Search subject or neighbor…" leadingIcon={I("search")}
              value={q.query} onChange={(e) => q.setQuery(e.target.value)} />
          </div>
        </div>

        <div className="adm__tabs">
          <Tabs items={tabs} value={q.filter} onChange={q.setFilter} />
        </div>

        {q.picked.length > 0 && (
          <div className="adm__bulk">
            <span className="adm__bulkt">{q.picked.length} selected</span>
            <Button variant="primary" size="sm" leadingIcon={I("check")} onClick={() => q.resolve(q.picked, "approved")}>Approve selected</Button>
            <Button variant="ghost" size="sm" onClick={() => q.setPicked([])}>Clear</Button>
          </div>
        )}

        <div className="adm__list">
          {q.visible.length ? q.visible.map(it => (
            <div key={it.id} className="adm__row" role="button" tabIndex={0} aria-selected={it.id === q.activeId}
              onClick={() => q.setActiveId(it.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); q.setActiveId(it.id); } }}>
              <span onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={q.picked.includes(it.id)} onChange={() => q.togglePick(it.id)} aria-label={`Select ${it.subject}`} />
              </span>
              <TypeBadge type={it.type} size="sm" />
              <span className="adm__subj">
                <span className="adm__subjt">{it.subject}</span>
                <span className="adm__subjd">
                  <Avatar src={it.photo} name={it.who} size="sm" />
                  <span className="adm__subjdt">{it.who} · {it.detail}</span>
                </span>
              </span>
              <SevBadge severity={it.severity} size="sm" />
              <span className={"adm__age" + (it.age >= 24 ? " adm__age--late" : "")}>{ageLabel(it.age)}</span>
            </div>
          )) : (
            <EmptyState
              icon={q.query || q.filter !== "all" ? "search" : "inbox"}
              title={q.counts.all === 0 ? "Queue's clear" : "Nothing matches"}
              text={q.counts.all === 0
                ? "Every open report in Bay Ridge has been handled. Nice work."
                : "Try a different filter or clear the search."}
              action={q.counts.all > 0
                ? <Button variant="outline" size="sm" onClick={() => { q.setQuery(""); q.setFilter("all"); }}>Clear filters</Button>
                : null}
            />
          )}
        </div>
      </main>

      <aside className="adm__detail">
        {q.active ? (
          <React.Fragment>
            <div className="adm__dhead">
              <div className="adm__dbadges">
                <TypeBadge type={q.active.type} size="sm" />
                <SevBadge severity={q.active.severity} size="sm" />
              </div>
              <h2 className="adm__dtitle">{q.active.subject}</h2>
            </div>
            <QueueDetail q={q} />
          </React.Fragment>
        ) : (
          <div className="adm__dempty">
            <EmptyState icon="check" title="Nothing selected" text="Pick a report from the queue to review it." />
          </div>
        )}
      </aside>
    </div>
  );
}

/* ---------------- Mobile ---------------- */
function AdminMobile({ onToast, onBack, onDesktop, items, setItems }) {
  const F = window.VelloFlow;
  const { I, EmptyState, ScrollRow, AppBar, QTYPES } = F;
  const { Input, Tag, Button, Avatar, IconButton } = window.VelloDesignSystem_182a1b;
  const q = useQueue(onToast, items, setItems);
  const { useState } = React;
  const [open, setOpen] = useState(false);
  F.useIcons();

  const filters = [{ id: "all", label: "All", icon: "inbox" }]
    .concat(QTYPES.map(t => ({ id: t.id, label: t.short, icon: t.icon })));

  return (
    <React.Fragment>
      <AppBar
        title="Moderation"
        onBack={onBack}
        action={<IconButton variant="ghost" label="Open the desktop view" onClick={onDesktop}>{I("monitor")}</IconButton>}
      />

      <div className="scroll">
        <div style={{ padding: "0 16px" }}>
          <Input aria-label="Search the queue" placeholder="Search subject or neighbor…" leadingIcon={I("search")}
            value={q.query} onChange={(e) => q.setQuery(e.target.value)} />
        </div>

        <div className="section admm__filters" style={{ marginTop: 14 }}>
          <ScrollRow>
            {filters.map(f => (
              <Tag key={f.id} selected={q.filter === f.id} icon={I(f.icon)} onClick={() => q.setFilter(f.id)}>
                {f.label}{q.counts[f.id] ? ` ${q.counts[f.id]}` : ""}
              </Tag>
            ))}
          </ScrollRow>
        </div>

        {q.visible.length ? (
          <div className="admm__list">
            {q.visible.map(it => (
              <button key={it.id} className="admm__card" type="button" onClick={() => { q.setActiveId(it.id); setOpen(true); }}>
                <div className="admm__top">
                  <TypeBadge type={it.type} size="sm" />
                  <SevBadge severity={it.severity} size="sm" />
                </div>
                <div className="admm__t">{it.subject}</div>
                <div className="admm__d">{it.detail}</div>
                <div className="admm__foot">
                  <Avatar src={it.photo} name={it.who} size="sm" />
                  <span style={{ fontSize: 12.5, color: "var(--text-body)" }}>{it.who}</span>
                  <span className={"admm__age" + (it.age >= 24 ? " admm__age--late" : "")}>{ageLabel(it.age)}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={q.query || q.filter !== "all" ? "search" : "inbox"}
            title={q.counts.all === 0 ? "Queue's clear" : "Nothing matches"}
            text={q.counts.all === 0 ? "Every open report has been handled." : "Try another filter or clear the search."}
            action={q.counts.all > 0
              ? <Button variant="outline" size="sm" onClick={() => { q.setQuery(""); q.setFilter("all"); }}>Clear filters</Button>
              : null}
          />
        )}
      </div>

      {open && q.active && (
        <div className="admm__sheetwrap">
          <AppBar title="Review report" onBack={() => { setOpen(false); q.closeReject(); }} />
          <div className="adm__dhead" style={{ padding: "4px 20px 16px" }}>
            <div className="adm__dbadges">
              <TypeBadge type={q.active.type} size="sm" />
              <SevBadge severity={q.active.severity} size="sm" />
            </div>
            <h2 className="adm__dtitle" style={{ fontSize: 20 }}>{q.active.subject}</h2>
          </div>
          <QueueDetail q={q} compact />
        </div>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { AdminDesktop, AdminMobile, QueueDetail, TypeBadge, SevBadge, useQueue });
```

### Prototype — 11. Vello flow — router, frame scaling, and prototype chrome.

```jsx
/* Vello flow — router, frame scaling, and prototype chrome. */

const APP_FRAME = { w: 375, h: 812 };
const DESK_FRAME = { w: 1280, h: 840 };

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "locationStyle": "pill",
  "showGreeting": true,
  "distanceFormat": "walk",
  "featuredGlow": true,
  "accent": "#557E26"
}/*EDITMODE-END*/;

const ACCENTS = ["#F0623B", "#557E26", "#16462F"];

// The create action belongs to the tab bar; sub-screens have their own primary CTA.
const TAB_SCREENS = ["home", "bookings", "messages", "profile"];

function useViewport() {
  const { useState, useEffect } = React;
  const [vp, setVp] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = document.getElementById("stage");
    const read = () => {
      const w = (el && el.clientWidth) || document.documentElement.clientWidth || window.innerWidth;
      const h = (el && el.clientHeight) || document.documentElement.clientHeight || window.innerHeight;
      // Never write zeros — a zero read is "not laid out yet", not a real size.
      if (w > 0 && h > 0) setVp({ w, h });
    };
    read();
    // ResizeObserver fires exactly when the element first gets a non-zero box.
    // rAF can't cover that case: it's throttled in a zero-area iframe.
    const ro = window.ResizeObserver ? new ResizeObserver(read) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener("resize", read);
    return () => { if (ro) ro.disconnect(); window.removeEventListener("resize", read); };
  }, []);
  return vp;
}

function FlowApp() {
  const { useState, useEffect } = React;
  const F = window.VelloFlow;
  const { I, StatusBar, AppBar, Toast, Sheet, Chev, NAV, REQUEST } = F;
  const { BottomNav } = window.VelloDesignSystem_182a1b;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState("home");
  const [desk, setDesk] = useState(false);
  const [queue, setQueue] = useState(F.QUEUE);
  const [from, setFrom] = useState("home");
  const [booking, setBooking] = useState(null);
  const [requestClosed, setRequestClosed] = useState(false);
  const [cat, setCat] = useState("all");
  const [favorites, setFavorites] = useState({ p2: true });
  const [tab, setTab] = useState("home");
  const [toast, setToast] = useState(null);
  const [threads, setThreads] = useState(F.THREADS);
  const [openThread, setOpenThread] = useState(null);
  const [settings, setSettings] = useState({ nearby: true, reminders: true, replies: true });
  const [myRequest, setMyRequest] = useState(null);
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState(null);
  const vp = useViewport();

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, []);
  F.useIcons();

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const onToast = (text) => setToast({ text, at: Date.now() });

  const openBooking = (provider, opts = {}) => {
    if (!provider) return;
    setBooking({
      provider,
      serviceLabel: opts.serviceLabel || provider.service || "Help on your block",
      price: opts.price != null ? opts.price : provider.price,
      fromRequest: !!opts.fromRequest,
      stage: opts.stage,
      date: opts.date,
      time: opts.time,
      repeat: opts.repeat,
      days: opts.days,
    });
    setFrom(screen);
    setScreen("booking");
  };

  const openThreadFor = (who) => {
    const t = threads.find(x => x.who === who);
    if (!t) return;
    setThreads(prev => prev.map(x => x.id === t.id ? { ...x, unread: 0 } : x));
    setOpenThread(t.id);
    setTab("messages");
    setScreen("messages");
  };

  const selectThread = (id) => {
    if (id) setThreads(prev => prev.map(x => x.id === id ? { ...x, unread: 0 } : x));
    setOpenThread(id);
  };

  const sendMessage = (id, text) => {
    const at = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setThreads(prev => prev.map(t => t.id === id
      ? { ...t, at, messages: [...t.messages, { from: "me", text, at }] }
      : t));
  };

  const goHome = () => { setTab("home"); setScreen("home"); };

  const openNeighbor = (n) => {
    if (!n) return;
    setViewing(n);
    setFrom(screen);
    setScreen("neighbor");
  };

  const postRequest = (data) => {
    setMyRequest(data);
    setRequestClosed(false);
    setScreen("request");
    onToast("Request posted to your block");
  };

  const activeRequest = myRequest || F.REQUEST;
  const activeResponders = myRequest ? [] : F.RESPONDERS;

  const goTab = (id) => {
    setTab(id);
    setScreen(id === "home" ? "home" : id);
    if (id !== "messages") setOpenThread(null);
  };

  const frame = desk ? DESK_FRAME : APP_FRAME;
  const measured = vp.w > 0 && vp.h > 0;
  const pad = vp.w < 520 ? 16 : 40;
  // Unmeasured renders at scale(1), which clips — stay invisible for that one frame.
  const scale = measured
    ? Math.max(0.1, Math.min(1, (vp.w - pad) / frame.w, (vp.h - pad) / frame.h))
    : 1;

  let content = null;
  if (screen === "home") {
    content = (
      <HomeScreen
        tweaks={t} cat={cat} setCat={setCat}
        favorites={favorites}
        toggleFav={(id) => setFavorites(f => ({ ...f, [id]: !f[id] }))}
        onOpenRequest={() => { setFrom("home"); setScreen("request"); }}
        onBook={(n, s) => openNeighbor(n)}
        request={activeRequest}
        responders={activeResponders}
        onToast={onToast}
      />
    );
  } else if (screen === "request") {
    content = (
      <RequestScreen
        tweaks={t} closed={requestClosed}
        request={activeRequest} responders={activeResponders}
        onClose={() => setRequestClosed(true)}
        onBack={() => setScreen(from === "profile" ? "profile" : "home")}
        onHome={goHome}
        onBook={(p, r) => openBooking(p, { serviceLabel: activeRequest.title, price: r.quote, fromRequest: true })}
        onToast={onToast}
      />
    );
  } else if (screen === "neighbor" && viewing) {
    content = (
      <NeighborScreen
        n={viewing} tweaks={t}
        favorited={!!favorites[viewing.id]}
        onFav={() => setFavorites(f => ({ ...f, [viewing.id]: !f[viewing.id] }))}
        onBack={() => setScreen(from)}
        onBook={(n, s) => openBooking(n, s ? { serviceLabel: s.label, price: s.price } : {})}
        onMessage={openThreadFor}
        onToast={onToast}
      />
    );
  } else if (screen === "new-request") {
    content = (
      <NewRequestScreen
        onBack={() => setScreen(from === "new-request" ? "home" : from)}
        onPost={postRequest}
        onToast={onToast}
      />
    );
  } else if (screen === "booking" && booking) {
    content = (
      <BookingScreen
        booking={booking} tweaks={t}
        onBack={() => setScreen(from)}
        onHome={goHome}
        onToast={onToast}
      />
    );
  } else if (screen === "bookings") {
    content = (
      <BookingsScreen
        tweaks={t}
        onManage={(b) => openBooking(F.byId(b.who), {
          serviceLabel: b.service, price: b.price, stage: "confirmed",
          date: b.date, time: b.time, repeat: b.repeat, days: b.days,
        })}
        onRebook={(p, b) => openBooking(p, { serviceLabel: b.service, price: b.price })}        onMessage={openThreadFor}
        onHome={goHome}
        onToast={onToast}
      />
    );
  } else if (screen === "messages") {
    content = (
      <MessagesScreen
        threads={threads} openId={openThread} setOpenId={selectThread}
        onSend={sendMessage} onHome={goHome} onToast={onToast}
      />
    );
  } else if (screen === "profile") {
    content = (
      <ProfileScreen
        tweaks={t} settings={settings}
        setSetting={(k, v) => setSettings(s => ({ ...s, [k]: v }))}
        onOpenRequest={() => { setFrom("profile"); setScreen("request"); }}
        onOpenAdmin={() => setScreen("admin")}
        queueCount={queue.length}
        request={activeRequest}
        responderCount={activeResponders.length}
        onToast={onToast}
      />
    );
  } else if (screen === "admin") {
    content = (
      <AdminMobile
        items={queue} setItems={setQueue}
        onBack={() => setScreen("profile")}
        onDesktop={() => setDesk(true)}
        onToast={onToast}
      />
    );
  }

  const unread = threads.reduce((n, t) => n + t.unread, 0);
  const navItems = NAV.map(n => n.id === "messages" ? { ...n, badge: unread || undefined } : n);

  return (
    <React.Fragment>
      <div className="framewrap" style={{ transform: `translate(-50%, -50%) scale(${scale})`, visibility: measured ? "visible" : "hidden" }}>
        {desk ? (
          <AdminDesktop items={queue} setItems={setQueue} onExit={() => setDesk(false)} onToast={onToast} />
        ) : (
          <div className="phone" style={{ "--accent": t.accent }}>
            <StatusBar />
            <div className="screen">
              {content}
              <div className="navwrap">
                <BottomNav items={navItems} value={tab} onChange={goTab} />
                {TAB_SCREENS.includes(screen) && (
                  <button className="fab" type="button" aria-label="Create something new" onClick={() => setCreating(true)}>
                    {I("plus")}
                  </button>
                )}
                <div className="home-indicator"></div>
              </div>
            </div>
            {creating && (
              <Sheet title="What would you like to add?" onDismiss={() => setCreating(false)}>
                <div className="sheet__actions" style={{ gap: 9 }}>
                  <button className="createopt" type="button" onClick={() => { setCreating(false); setFrom(screen); setScreen("new-request"); }}>
                    <span className="createopt__icon">{I("file-text")}</span>
                    <span className="createopt__b">
                      <span className="createopt__t">Post a request</span>
                      <span className="createopt__d">Describe what you need and let neighbors reply</span>
                    </span>
                    <span className="createopt__chev"><Chev /></span>
                  </button>
                  <button className="createopt" type="button" onClick={() => { setCreating(false); goHome(); }}>
                    <span className="createopt__icon">{I("compass")}</span>
                    <span className="createopt__b">
                      <span className="createopt__t">Book a neighbor</span>
                      <span className="createopt__d">Browse verified neighbors on your block</span>
                    </span>
                    <span className="createopt__chev"><Chev /></span>
                  </button>
                  <div className="sheet__quiet">
                    <button className="quietlink" onClick={() => setCreating(false)}>Never mind</button>
                  </div>
                </div>
              </Sheet>
            )}
            {toast && <Toast key={toast.at} text={toast.text} />}
          </div>
        )}
      </div>

      {desk && toast && <Toast key={toast.at} text={toast.text} desk />}

      {!desk && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Header" />
          <TweakRadio
            label="Location picker" value={t.locationStyle}
            options={[{ value: "inline", label: "Inline" }, { value: "pill", label: "Pill" }, { value: "stacked", label: "Stacked" }]}
            onChange={(v) => setTweak("locationStyle", v)}
          />
          <TweakToggle label="Show greeting" value={t.showGreeting} onChange={(v) => setTweak("showGreeting", v)} />
          <TweakSection label="Listings" />
          <TweakRadio
            label="Distance shown as" value={t.distanceFormat}
            options={[{ value: "walk", label: "Min walk" }, { value: "blocks", label: "Blocks" }, { value: "mi", label: "Miles" }]}
            onChange={(v) => setTweak("distanceFormat", v)}
          />
          <TweakToggle label="Featured glow" value={t.featuredGlow} onChange={(v) => setTweak("featuredGlow", v)} />
          <TweakSection label="Theme" />
          <TweakColor label="Accent" value={t.accent} options={ACCENTS} onChange={(v) => setTweak("accent", v)} />
        </TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<FlowApp />);
setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 60);
```

### Prototype — Style block 1 of 7

```css
/* ============================================================
   VELLO · FONTS
   Bricolage Grotesque (display) — characterful, contemporary, warm
   Hanken Grotesk (UI/body)      — clean, friendly, highly legible
   JetBrains Mono (data)         — prices, distances, codes
   Loaded from Google Fonts. See readme.md for self-hosting note.
   ============================================================ */

/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 500;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 500;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 500;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("ff87e924-5834-4ab8-8605-06ec27533670") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("6770fa30-a222-4391-b610-8d2413329f5c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("4e52e265-73b6-4339-9e79-5a769974abd7") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("da9ab21c-e863-432e-9647-b6205133083c") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("ff87e924-5834-4ab8-8605-06ec27533670") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("6770fa30-a222-4391-b610-8d2413329f5c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("4e52e265-73b6-4339-9e79-5a769974abd7") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("da9ab21c-e863-432e-9647-b6205133083c") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("bb64571b-ecfa-4bb4-8cc7-9fb0c8a12164") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("bf1d1b8d-85f3-4581-82ea-445959b45285") format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("8c4af77d-4ad3-4c04-85d8-f07d23820e83") format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("39f5b54c-7aeb-45e5-ab13-be6cd855ef9c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("c91da774-76db-41bd-9741-0988505c59ae") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("ac1e052b-e265-440c-83e3-625f11a33810") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("bb64571b-ecfa-4bb4-8cc7-9fb0c8a12164") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("bf1d1b8d-85f3-4581-82ea-445959b45285") format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("8c4af77d-4ad3-4c04-85d8-f07d23820e83") format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("39f5b54c-7aeb-45e5-ab13-be6cd855ef9c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("c91da774-76db-41bd-9741-0988505c59ae") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("ac1e052b-e265-440c-83e3-625f11a33810") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("bb64571b-ecfa-4bb4-8cc7-9fb0c8a12164") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("bf1d1b8d-85f3-4581-82ea-445959b45285") format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("8c4af77d-4ad3-4c04-85d8-f07d23820e83") format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("39f5b54c-7aeb-45e5-ab13-be6cd855ef9c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("c91da774-76db-41bd-9741-0988505c59ae") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("ac1e052b-e265-440c-83e3-625f11a33810") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

### Prototype — Style block 2 of 7

```css
/* ============================================================
   VELLO · COLOR TOKENS
   Cozy, literary, neighborhood-grounded (Fable-inspired).
   Warm cream paper + deep forest brand + olive/moss primary
   action + persimmon accent + amber for ratings.
   ============================================================ */

:root {
  /* ---- Neutrals (warm cream + near-black ink) ---- */
  --ink-900: #1B1C18; /* primary text, near-black buttons */
  --ink-800: #292A24;
  --ink-700: #3D3F37; /* body text */
  --ink-600: #54564C;
  --ink-500: #6E7064; /* secondary text */
  --ink-400: #8D8F80; /* muted / placeholder */
  --ink-300: #B6B7A6;
  --ink-200: #D6D6C6; /* strong borders */
  --ink-150: #E5E4D6; /* default borders */
  --ink-100: #EFEEE1; /* hairlines, sunken fills */
  --paper:   #F6F2E7; /* app background — warm Fable cream */
  --paper-2: #EFEADB; /* deeper cream section band */
  --white:   #FFFFFF;

  /* ---- Forest (deep brand green: splash, hero, dark surfaces) ---- */
  --forest-900: #0E3A28;
  --forest-800: #16462F; /* splash / hero field */
  --forest-700: #1D5337;
  --forest-600: #266B49;
  --forest-300: #8FB6A2;
  --forest-100: #DCE9E1;

  /* ---- Green = olive / moss (PRIMARY action, selected, tints) ---- */
  --green-900: #2B3D15;
  --green-800: #38511E;
  --green-700: #466621; /* press / brand text */
  --green-600: #557E26; /* PRIMARY (olive CTA) */
  --green-500: #6E9A3A;
  --green-400: #8FB663;
  --green-300: #B6CF92;
  --green-200: #D7E3BD;
  --green-100: #EBF1DB;
  --green-50:  #F5F8EC;

  /* ---- Persimmon (warm human accent / secondary CTA) ---- */
  --coral-700: #C5421F;
  --coral-600: #E2552C;
  --coral-500: #F0623B; /* ACCENT */
  --coral-300: #F7A488;
  --coral-100: #FCE3D9;
  --coral-50:  #FEF1EB;

  /* ---- Amber (ratings, sunlight highlights) ---- */
  --amber-700: #C77F12;
  --amber-600: #E09A1F;
  --amber-500: #F4B740; /* star rating fill */
  --amber-100: #FCEFCF;

  /* ---- Sky (info, links, map accents) ---- */
  --sky-700: #235A93;
  --sky-600: #2D6FB5;
  --sky-100: #E1ECF7;

  /* ---- Red (danger) ---- */
  --red-700: #B23636;
  --red-600: #D64545;
  --red-100: #FBE3E3;

  /* ============================================================
     SEMANTIC ALIASES — reference these in components
     ============================================================ */

  /* Surfaces & background */
  --color-bg:           var(--paper);
  --color-bg-subtle:    var(--paper-2);
  --surface-card:       var(--white);
  --surface-raised:     var(--white);
  --surface-sunken:     var(--ink-100);
  --surface-inverse:    var(--ink-900);
  --surface-brand:      var(--green-600);
  --surface-brand-deep: var(--forest-800); /* splash, hero, dark bands */
  --surface-brand-tint: var(--green-100);
  --surface-accent-tint:var(--coral-100);

  /* Text */
  --text-strong:   var(--ink-900);
  --text-body:     var(--ink-700);
  --text-muted:    var(--ink-500);
  --text-subtle:   var(--ink-400);
  --text-inverse:  var(--white);
  --text-brand:    var(--green-700);
  --text-on-brand: var(--white);
  --text-on-deep:  var(--paper);
  --text-link:     var(--sky-600);

  /* Borders */
  --border-subtle:  var(--ink-100);
  --border-default: var(--ink-150);
  --border-strong:  var(--ink-200);
  --border-focus:   var(--green-600);

  /* Brand actions */
  --brand-primary:        var(--green-600);
  --brand-primary-hover:  var(--green-700);
  --brand-primary-press:  var(--green-800);
  --brand-primary-tint:   var(--green-100);
  --brand-on-primary:     var(--white);

  /* Accent (persimmon) */
  --accent:        var(--coral-500);
  --accent-hover:  var(--coral-600);
  --accent-press:  var(--coral-700);
  --accent-tint:   var(--coral-100);
  --accent-on:     var(--white);

  /* Status */
  --rating:        var(--amber-500);
  --info:          var(--sky-600);
  --info-tint:     var(--sky-100);
  --success:       var(--green-600);
  --success-tint:  var(--green-100);
  --warning:       var(--amber-600);
  --warning-tint:  var(--amber-100);
  --danger:        var(--red-600);
  --danger-tint:   var(--red-100);

  /* Focus ring (used as box-shadow) */
  --focus-ring: 0 0 0 3px rgba(85, 126, 38, 0.32);
  --focus-ring-accent: 0 0 0 3px rgba(240, 98, 59, 0.28);
}
```

### Prototype — Style block 3 of 7

```css
/* ============================================================
   VELLO · TYPOGRAPHY TOKENS
   ============================================================ */

:root {
  /* ---- Families ---- */
  --font-display: 'Bricolage Grotesque', 'Hanken Grotesk', system-ui, sans-serif;
  --font-sans:    'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  /* ---- Weights ---- */
  --fw-regular:  400; /* @kind other */
  --fw-medium:   500; /* @kind other */
  --fw-semibold: 600; /* @kind other */
  --fw-bold:     700; /* @kind other */
  --fw-extra:    800; /* @kind other */

  /* ---- Type scale (px) ---- */
  --text-2xs:  11px;
  --text-xs:   12px;
  --text-sm:   14px;
  --text-base: 16px;
  --text-md:   18px;
  --text-lg:   20px;
  --text-xl:   24px;
  --text-2xl:  30px;
  --text-3xl:  38px;
  --text-4xl:  48px;
  --text-5xl:  60px;
  --text-6xl:  76px;

  /* ---- Line heights ---- */
  --lh-tight:   1.05; /* @kind other */
  --lh-snug:    1.18; /* @kind other */
  --lh-normal:  1.45; /* @kind other */
  --lh-relaxed: 1.6;  /* @kind other */

  /* ---- Letter spacing ---- */
  --ls-tight:   -0.02em; /* @kind other */
  --ls-snug:    -0.01em; /* @kind other */
  --ls-normal:  0;       /* @kind other */
  --ls-wide:    0.04em;  /* @kind other */
  --ls-wider:   0.12em;  /* @kind other */

  /* ---- Semantic roles ---- */
  --display-font:   var(--font-display);
  --display-weight: var(--fw-bold);
  --heading-font:   var(--font-display);
  --heading-weight: var(--fw-semibold);
  --body-font:      var(--font-sans);
  --label-font:     var(--font-sans);
  --label-weight:   var(--fw-semibold);
  --mono-font:      var(--font-mono);
}
```

### Prototype — Style block 4 of 7

```css
/* ============================================================
   VELLO · SPACING, RADII, SHADOWS, MOTION, LAYERS
   4px base rhythm.
   ============================================================ */

:root {
  /* ---- Spacing scale (4px base) ---- */
  --space-0:  0;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* ---- Corner radii (friendly, generous) ---- */
  --radius-xs:   6px;
  --radius-sm:   10px;
  --radius-md:   14px;  /* inputs, small controls */
  --radius-lg:   20px;  /* cards */
  --radius-xl:   28px;  /* feature cards, sheets */
  --radius-2xl:  36px;
  --radius-pill: 999px; /* chips, primary CTAs, avatars */

  /* ---- Shadows (soft, warm-tinted, low) ---- */
  --shadow-xs: 0 1px 2px rgba(25, 28, 25, 0.06);
  --shadow-sm: 0 2px 6px rgba(25, 28, 25, 0.07);
  --shadow-md: 0 6px 18px rgba(25, 28, 25, 0.09);
  --shadow-lg: 0 14px 34px rgba(25, 28, 25, 0.11);
  --shadow-xl: 0 26px 60px rgba(25, 28, 25, 0.16);
  /* press / focus inset for cream surfaces */
  --shadow-inset: inset 0 1px 2px rgba(25, 28, 25, 0.06);
  /* warm brand-tinted lift used on featured provider cards */
  --shadow-brand: 0 14px 34px rgba(85, 126, 38, 0.20);

  /* ---- Motion ---- */
  --dur-fast:  120ms; /* @kind other */
  --dur-base:  200ms; /* @kind other */
  --dur-slow:  320ms; /* @kind other */
  --ease-standard: cubic-bezier(0.2, 0.6, 0.2, 1);   /* @kind other */
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);    /* @kind other */
  --ease-spring:   cubic-bezier(0.34, 1.4, 0.5, 1);  /* @kind other */

  /* ---- Z layers ---- */
  --z-base:    1;    /* @kind other */
  --z-sticky:  100;  /* @kind other */
  --z-nav:     200;  /* @kind other */
  --z-overlay: 800;  /* @kind other */
  --z-modal:   900;  /* @kind other */
  --z-toast:   1000; /* @kind other */

  /* ---- Container widths ---- */
  --container-app:    430px;  /* @kind other */
  --container-narrow: 720px;  /* @kind other */
  --container-wide:   1200px; /* @kind other */
}
```

### Prototype — Style block 5 of 7

```css
/* ============================================================
   VELLO · BASE ELEMENT STYLES + TYPE UTILITIES
   Ships with the system so every surface inherits the brand.
   ============================================================ */

*,
*::before,
*::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--lh-normal);
  font-weight: var(--fw-regular);
  color: var(--text-body);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--green-200); color: var(--ink-900); }

a { color: var(--text-link); text-decoration: none; }
a:hover { text-decoration: underline; }

h1, h2, h3, h4, h5 {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  color: var(--text-strong);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-snug);
  margin: 0;
  text-wrap: balance;
}

p { margin: 0; text-wrap: pretty; }

button { font-family: inherit; }

/* ---- Display / heading utilities ---- */
.v-display {
  font-family: var(--display-font);
  font-weight: var(--display-weight);
  font-size: var(--text-5xl);
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-tight);
  color: var(--text-strong);
}
.v-h1 { font-family: var(--heading-font); font-weight: var(--fw-bold); font-size: var(--text-4xl); line-height: var(--lh-snug); letter-spacing: var(--ls-snug); color: var(--text-strong); }
.v-h2 { font-family: var(--heading-font); font-weight: var(--fw-semibold); font-size: var(--text-2xl); line-height: var(--lh-snug); letter-spacing: var(--ls-snug); color: var(--text-strong); }
.v-h3 { font-family: var(--heading-font); font-weight: var(--fw-semibold); font-size: var(--text-xl); line-height: var(--lh-snug); color: var(--text-strong); }

/* ---- Body ---- */
.v-body    { font-size: var(--text-base); line-height: var(--lh-relaxed); color: var(--text-body); }
.v-body-sm { font-size: var(--text-sm);   line-height: var(--lh-normal);  color: var(--text-body); }
.v-muted   { color: var(--text-muted); }

/* ---- Eyebrow / label ---- */
.v-eyebrow {
  font-family: var(--label-font);
  font-weight: var(--fw-bold);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-brand);
}

/* ---- Mono (data) ---- */
.v-mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
```

### Prototype — Style block 6 of 7

```css
/* ============================================================
   VELLO DESIGN SYSTEM · GLOBAL ENTRY
   Consumers link this one file. Import-only — no rules here.
   ============================================================ */

/* ============================================================
   VELLO · FONTS
   Bricolage Grotesque (display) — characterful, contemporary, warm
   Hanken Grotesk (UI/body)      — clean, friendly, highly legible
   JetBrains Mono (data)         — prices, distances, codes
   Loaded from Google Fonts. See readme.md for self-hosting note.
   ============================================================ */

/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 500;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 500;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 500;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("0463fda6-c235-4882-a521-70a9a56ec2c0") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("55551e01-32ae-4cd2-bb3d-8f9bd89a3356") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 800;
  font-stretch: 100%;
  font-display: swap;
  src: url("a381e7c3-73b4-4698-a289-ee2fd88fc8f2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("ff87e924-5834-4ab8-8605-06ec27533670") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("6770fa30-a222-4391-b610-8d2413329f5c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("4e52e265-73b6-4339-9e79-5a769974abd7") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("da9ab21c-e863-432e-9647-b6205133083c") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("ff87e924-5834-4ab8-8605-06ec27533670") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("6770fa30-a222-4391-b610-8d2413329f5c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("4e52e265-73b6-4339-9e79-5a769974abd7") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url("da9ab21c-e863-432e-9647-b6205133083c") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("3e85830f-65a6-4c26-a4b8-9c720b0f8fce") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("aa177cda-e5ce-40ec-80fb-ceb28123ff21") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("08b7b232-0a78-4c3c-bdfa-5884bcd7f5e0") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Hanken Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("48da9e16-d22d-4081-94a5-136c304715c3") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("bb64571b-ecfa-4bb4-8cc7-9fb0c8a12164") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("bf1d1b8d-85f3-4581-82ea-445959b45285") format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("8c4af77d-4ad3-4c04-85d8-f07d23820e83") format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("39f5b54c-7aeb-45e5-ab13-be6cd855ef9c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("c91da774-76db-41bd-9741-0988505c59ae") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("ac1e052b-e265-440c-83e3-625f11a33810") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("bb64571b-ecfa-4bb4-8cc7-9fb0c8a12164") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("bf1d1b8d-85f3-4581-82ea-445959b45285") format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("8c4af77d-4ad3-4c04-85d8-f07d23820e83") format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("39f5b54c-7aeb-45e5-ab13-be6cd855ef9c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("c91da774-76db-41bd-9741-0988505c59ae") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("ac1e052b-e265-440c-83e3-625f11a33810") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("bb64571b-ecfa-4bb4-8cc7-9fb0c8a12164") format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("bf1d1b8d-85f3-4581-82ea-445959b45285") format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("8c4af77d-4ad3-4c04-85d8-f07d23820e83") format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("39f5b54c-7aeb-45e5-ab13-be6cd855ef9c") format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("c91da774-76db-41bd-9741-0988505c59ae") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("ac1e052b-e265-440c-83e3-625f11a33810") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}


/* ============================================================
   VELLO · COLOR TOKENS
   Cozy, literary, neighborhood-grounded (Fable-inspired).
   Warm cream paper + deep forest brand + olive/moss primary
   action + persimmon accent + amber for ratings.
   ============================================================ */

:root {
  /* ---- Neutrals (warm cream + near-black ink) ---- */
  --ink-900: #1B1C18; /* primary text, near-black buttons */
  --ink-800: #292A24;
  --ink-700: #3D3F37; /* body text */
  --ink-600: #54564C;
  --ink-500: #6E7064; /* secondary text */
  --ink-400: #8D8F80; /* muted / placeholder */
  --ink-300: #B6B7A6;
  --ink-200: #D6D6C6; /* strong borders */
  --ink-150: #E5E4D6; /* default borders */
  --ink-100: #EFEEE1; /* hairlines, sunken fills */
  --paper:   #F6F2E7; /* app background — warm Fable cream */
  --paper-2: #EFEADB; /* deeper cream section band */
  --white:   #FFFFFF;

  /* ---- Forest (deep brand green: splash, hero, dark surfaces) ---- */
  --forest-900: #0E3A28;
  --forest-800: #16462F; /* splash / hero field */
  --forest-700: #1D5337;
  --forest-600: #266B49;
  --forest-300: #8FB6A2;
  --forest-100: #DCE9E1;

  /* ---- Green = olive / moss (PRIMARY action, selected, tints) ---- */
  --green-900: #2B3D15;
  --green-800: #38511E;
  --green-700: #466621; /* press / brand text */
  --green-600: #557E26; /* PRIMARY (olive CTA) */
  --green-500: #6E9A3A;
  --green-400: #8FB663;
  --green-300: #B6CF92;
  --green-200: #D7E3BD;
  --green-100: #EBF1DB;
  --green-50:  #F5F8EC;

  /* ---- Persimmon (warm human accent / secondary CTA) ---- */
  --coral-700: #C5421F;
  --coral-600: #E2552C;
  --coral-500: #F0623B; /* ACCENT */
  --coral-300: #F7A488;
  --coral-100: #FCE3D9;
  --coral-50:  #FEF1EB;

  /* ---- Amber (ratings, sunlight highlights) ---- */
  --amber-700: #C77F12;
  --amber-600: #E09A1F;
  --amber-500: #F4B740; /* star rating fill */
  --amber-100: #FCEFCF;

  /* ---- Sky (info, links, map accents) ---- */
  --sky-700: #235A93;
  --sky-600: #2D6FB5;
  --sky-100: #E1ECF7;

  /* ---- Red (danger) ---- */
  --red-700: #B23636;
  --red-600: #D64545;
  --red-100: #FBE3E3;

  /* ============================================================
     SEMANTIC ALIASES — reference these in components
     ============================================================ */

  /* Surfaces & background */
  --color-bg:           var(--paper);
  --color-bg-subtle:    var(--paper-2);
  --surface-card:       var(--white);
  --surface-raised:     var(--white);
  --surface-sunken:     var(--ink-100);
  --surface-inverse:    var(--ink-900);
  --surface-brand:      var(--green-600);
  --surface-brand-deep: var(--forest-800); /* splash, hero, dark bands */
  --surface-brand-tint: var(--green-100);
  --surface-accent-tint:var(--coral-100);

  /* Text */
  --text-strong:   var(--ink-900);
  --text-body:     var(--ink-700);
  --text-muted:    var(--ink-500);
  --text-subtle:   var(--ink-400);
  --text-inverse:  var(--white);
  --text-brand:    var(--green-700);
  --text-on-brand: var(--white);
  --text-on-deep:  var(--paper);
  --text-link:     var(--sky-600);

  /* Borders */
  --border-subtle:  var(--ink-100);
  --border-default: var(--ink-150);
  --border-strong:  var(--ink-200);
  --border-focus:   var(--green-600);

  /* Brand actions */
  --brand-primary:        var(--green-600);
  --brand-primary-hover:  var(--green-700);
  --brand-primary-press:  var(--green-800);
  --brand-primary-tint:   var(--green-100);
  --brand-on-primary:     var(--white);

  /* Accent (persimmon) */
  --accent:        var(--coral-500);
  --accent-hover:  var(--coral-600);
  --accent-press:  var(--coral-700);
  --accent-tint:   var(--coral-100);
  --accent-on:     var(--white);

  /* Status */
  --rating:        var(--amber-500);
  --info:          var(--sky-600);
  --info-tint:     var(--sky-100);
  --success:       var(--green-600);
  --success-tint:  var(--green-100);
  --warning:       var(--amber-600);
  --warning-tint:  var(--amber-100);
  --danger:        var(--red-600);
  --danger-tint:   var(--red-100);

  /* Focus ring (used as box-shadow) */
  --focus-ring: 0 0 0 3px rgba(85, 126, 38, 0.32);
  --focus-ring-accent: 0 0 0 3px rgba(240, 98, 59, 0.28);
}

/* ============================================================
   VELLO · TYPOGRAPHY TOKENS
   ============================================================ */

:root {
  /* ---- Families ---- */
  --font-display: 'Bricolage Grotesque', 'Hanken Grotesk', system-ui, sans-serif;
  --font-sans:    'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  /* ---- Weights ---- */
  --fw-regular:  400; /* @kind other */
  --fw-medium:   500; /* @kind other */
  --fw-semibold: 600; /* @kind other */
  --fw-bold:     700; /* @kind other */
  --fw-extra:    800; /* @kind other */

  /* ---- Type scale (px) ---- */
  --text-2xs:  11px;
  --text-xs:   12px;
  --text-sm:   14px;
  --text-base: 16px;
  --text-md:   18px;
  --text-lg:   20px;
  --text-xl:   24px;
  --text-2xl:  30px;
  --text-3xl:  38px;
  --text-4xl:  48px;
  --text-5xl:  60px;
  --text-6xl:  76px;

  /* ---- Line heights ---- */
  --lh-tight:   1.05; /* @kind other */
  --lh-snug:    1.18; /* @kind other */
  --lh-normal:  1.45; /* @kind other */
  --lh-relaxed: 1.6;  /* @kind other */

  /* ---- Letter spacing ---- */
  --ls-tight:   -0.02em; /* @kind other */
  --ls-snug:    -0.01em; /* @kind other */
  --ls-normal:  0;       /* @kind other */
  --ls-wide:    0.04em;  /* @kind other */
  --ls-wider:   0.12em;  /* @kind other */

  /* ---- Semantic roles ---- */
  --display-font:   var(--font-display);
  --display-weight: var(--fw-bold);
  --heading-font:   var(--font-display);
  --heading-weight: var(--fw-semibold);
  --body-font:      var(--font-sans);
  --label-font:     var(--font-sans);
  --label-weight:   var(--fw-semibold);
  --mono-font:      var(--font-mono);
}

/* ============================================================
   VELLO · SPACING, RADII, SHADOWS, MOTION, LAYERS
   4px base rhythm.
   ============================================================ */

:root {
  /* ---- Spacing scale (4px base) ---- */
  --space-0:  0;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* ---- Corner radii (friendly, generous) ---- */
  --radius-xs:   6px;
  --radius-sm:   10px;
  --radius-md:   14px;  /* inputs, small controls */
  --radius-lg:   20px;  /* cards */
  --radius-xl:   28px;  /* feature cards, sheets */
  --radius-2xl:  36px;
  --radius-pill: 999px; /* chips, primary CTAs, avatars */

  /* ---- Shadows (soft, warm-tinted, low) ---- */
  --shadow-xs: 0 1px 2px rgba(25, 28, 25, 0.06);
  --shadow-sm: 0 2px 6px rgba(25, 28, 25, 0.07);
  --shadow-md: 0 6px 18px rgba(25, 28, 25, 0.09);
  --shadow-lg: 0 14px 34px rgba(25, 28, 25, 0.11);
  --shadow-xl: 0 26px 60px rgba(25, 28, 25, 0.16);
  /* press / focus inset for cream surfaces */
  --shadow-inset: inset 0 1px 2px rgba(25, 28, 25, 0.06);
  /* warm brand-tinted lift used on featured provider cards */
  --shadow-brand: 0 14px 34px rgba(85, 126, 38, 0.20);

  /* ---- Motion ---- */
  --dur-fast:  120ms; /* @kind other */
  --dur-base:  200ms; /* @kind other */
  --dur-slow:  320ms; /* @kind other */
  --ease-standard: cubic-bezier(0.2, 0.6, 0.2, 1);   /* @kind other */
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);    /* @kind other */
  --ease-spring:   cubic-bezier(0.34, 1.4, 0.5, 1);  /* @kind other */

  /* ---- Z layers ---- */
  --z-base:    1;    /* @kind other */
  --z-sticky:  100;  /* @kind other */
  --z-nav:     200;  /* @kind other */
  --z-overlay: 800;  /* @kind other */
  --z-modal:   900;  /* @kind other */
  --z-toast:   1000; /* @kind other */

  /* ---- Container widths ---- */
  --container-app:    430px;  /* @kind other */
  --container-narrow: 720px;  /* @kind other */
  --container-wide:   1200px; /* @kind other */
}

/* ============================================================
   VELLO · BASE ELEMENT STYLES + TYPE UTILITIES
   Ships with the system so every surface inherits the brand.
   ============================================================ */

*,
*::before,
*::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--lh-normal);
  font-weight: var(--fw-regular);
  color: var(--text-body);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--green-200); color: var(--ink-900); }

a { color: var(--text-link); text-decoration: none; }
a:hover { text-decoration: underline; }

h1, h2, h3, h4, h5 {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  color: var(--text-strong);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-snug);
  margin: 0;
  text-wrap: balance;
}

p { margin: 0; text-wrap: pretty; }

button { font-family: inherit; }

/* ---- Display / heading utilities ---- */
.v-display {
  font-family: var(--display-font);
  font-weight: var(--display-weight);
  font-size: var(--text-5xl);
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-tight);
  color: var(--text-strong);
}
.v-h1 { font-family: var(--heading-font); font-weight: var(--fw-bold); font-size: var(--text-4xl); line-height: var(--lh-snug); letter-spacing: var(--ls-snug); color: var(--text-strong); }
.v-h2 { font-family: var(--heading-font); font-weight: var(--fw-semibold); font-size: var(--text-2xl); line-height: var(--lh-snug); letter-spacing: var(--ls-snug); color: var(--text-strong); }
.v-h3 { font-family: var(--heading-font); font-weight: var(--fw-semibold); font-size: var(--text-xl); line-height: var(--lh-snug); color: var(--text-strong); }

/* ---- Body ---- */
.v-body    { font-size: var(--text-base); line-height: var(--lh-relaxed); color: var(--text-body); }
.v-body-sm { font-size: var(--text-sm);   line-height: var(--lh-normal);  color: var(--text-body); }
.v-muted   { color: var(--text-muted); }

/* ---- Eyebrow / label ---- */
.v-eyebrow {
  font-family: var(--label-font);
  font-weight: var(--fw-bold);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-brand);
}

/* ---- Mono (data) ---- */
.v-mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
```

### Prototype — Style block 7 of 7

```css
/* ==========================================================
   Vello — flow prototype styles
   Tokens come from the design system; this file only composes.
   ========================================================== */
html,body{margin:0;height:100%;background:radial-gradient(120% 80% at 50% -10%,var(--green-100) 0%,transparent 55%),var(--paper-2)}
#stage{position:fixed;inset:0;display:grid;place-items:center;overflow:hidden}
.framewrap{position:absolute;top:50%;left:50%;transform-origin:center center}
a{color:var(--text-brand)}
a:hover{color:var(--green-800)}

/* ---------- Phone frame ---------- */
.phone{position:relative;width:375px;height:812px;background:var(--color-bg);border-radius:46px;box-shadow:0 0 0 11px #1a1c18,0 0 0 13px #2c2e27,var(--shadow-xl);overflow:hidden;display:flex;flex-direction:column;font-family:var(--font-sans)}
.phone::before{content:"";position:absolute;top:0;left:0;right:0;height:320px;background:radial-gradient(130% 90% at 18% -20%,var(--green-100) 0%,rgba(235,241,219,0) 60%);pointer-events:none;z-index:0}
.phone--plain::before{display:none}
.statusbar{flex:none;height:50px;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:0 26px 0 30px;font-family:var(--font-sans);color:var(--ink-900)}
.statusbar__time{font-weight:700;font-size:15px;letter-spacing:.01em}
.statusbar__icons{display:flex;align-items:center;gap:7px}
.statusbar__icons svg{width:18px;height:18px}
.screen{flex:1;min-height:0;display:flex;flex-direction:column;z-index:1}
.scroll{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;padding-bottom:18px}
.scroll::-webkit-scrollbar{width:0;height:0}
.navwrap{position:relative;flex:none;z-index:3;box-shadow:0 -1px 0 var(--border-subtle);background:var(--surface-card)}
.fab{position:absolute;top:-23px;left:50%;transform:translateX(-50%);width:52px;height:52px;border-radius:var(--radius-pill);background:var(--brand-primary);color:var(--brand-on-primary);border:3px solid var(--color-bg);box-shadow:var(--shadow-lg);display:grid;place-items:center;cursor:pointer;padding:0;z-index:6;transition:transform var(--dur-fast) var(--ease-spring),background var(--dur-fast) var(--ease-standard)}
.fab:hover{background:var(--green-700)}
.fab:active{transform:translateX(-50%) scale(.95)}
.fab svg{width:24px;height:24px;stroke-width:2.4}
.createopt{display:flex;align-items:center;gap:13px;width:100%;box-sizing:border-box;text-align:left;font-family:inherit;cursor:pointer;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:14px;transition:box-shadow var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard)}
.createopt:hover{box-shadow:var(--shadow-sm);border-color:var(--border-strong)}
.createopt__icon{width:40px;height:40px;flex:none;border-radius:var(--radius-pill);background:var(--surface-brand-tint);color:var(--green-700);display:grid;place-items:center}
.createopt__icon svg{width:19px;height:19px}
.createopt__b{flex:1;min-width:0}
.createopt__t{display:block;font-family:var(--font-display);font-weight:700;font-size:15.5px;letter-spacing:-.01em;color:var(--text-strong)}
.createopt__d{display:block;font-size:12.5px;color:var(--text-muted);margin-top:3px;line-height:1.4}
.createopt__chev{flex:none;color:var(--text-subtle)}
.createopt__chev svg{width:16px;height:16px;stroke-width:2.4}

/* ---------- New request ---------- */
.nr{padding:0 20px}
.nr__lede{font-size:13.5px;line-height:1.55;color:var(--text-muted);margin:0;text-wrap:pretty}
.nr .bk__group:first-of-type{margin-top:18px}

/* ---------- Neighbor detail ---------- */
.nbd__hero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:6px 20px 0}
.nbd__avatar{position:relative}
.nbd__vmark{position:absolute;right:-2px;bottom:-2px;line-height:0;filter:drop-shadow(0 1px 2px rgba(25,28,25,.2))}
.nbd__vmark svg{display:block}
.nbd__name{font-family:var(--font-display);font-weight:800;font-size:23px;letter-spacing:-.02em;color:var(--text-strong);margin-top:13px}
.nbd__svc{font-size:13.5px;color:var(--text-body);margin-top:5px}
.nbd__badges{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:12px}
.nbd__stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border-subtle);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);overflow:hidden;width:100%;margin-top:18px}
.nbd__stat{background:var(--surface-card);padding:12px 6px}
.nbd__statv{font-family:var(--font-mono);font-size:17px;font-weight:700;color:var(--text-strong)}
.nbd__statv--sm{font-size:13px}
.nbd__statk{font-size:10.5px;font-weight:600;color:var(--text-muted);margin-top:3px}
.nbd__heart{width:19px;height:19px;fill:none}
.nbd__heart--on{fill:var(--coral-500);stroke:var(--coral-600)}
.nbd__sec{padding:0 20px;margin-top:26px}
.nbd__h{display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-family:var(--font-display);font-weight:700;font-size:17px;letter-spacing:-.01em;color:var(--text-strong);margin-bottom:11px}
.nbd__hrate{flex:none}
.nbd__about{font-size:13.5px;line-height:1.6;color:var(--text-body);margin:0;text-wrap:pretty}
.nbd__since{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--green-700);background:var(--green-50);border:1px solid var(--green-200);border-radius:var(--radius-md);padding:8px 11px;margin-top:13px}
.nbd__since svg{width:14px;height:14px;flex:none}
.nbd__svcs{display:flex;flex-direction:column;gap:8px}
.nbd__svcrow{display:flex;align-items:center;gap:11px;width:100%;box-sizing:border-box;text-align:left;font-family:inherit;cursor:pointer;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-md);padding:13px 14px;min-height:44px;transition:box-shadow var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard)}
.nbd__svcrow:hover{box-shadow:var(--shadow-sm);border-color:var(--border-strong)}
.nbd__svcl{flex:1;min-width:0;font-size:14px;font-weight:600;color:var(--text-strong);line-height:1.3}
.nbd__svcp{flex:none;font-family:var(--font-mono);font-size:14.5px;font-weight:600;color:var(--text-strong);white-space:nowrap}
.nbd__svcp span{font-family:var(--font-sans);font-size:11px;font-weight:500;color:var(--text-muted)}
.nbd__svcchev{flex:none;color:var(--text-subtle)}
.nbd__svcchev svg{width:15px;height:15px;stroke-width:2.4}
.nbd__revs{display:flex;flex-direction:column;gap:11px}
.nbd__rev{background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:14px}
.nbd__revtop{display:flex;align-items:center;gap:9px;margin-bottom:8px}
.nbd__revwho{flex:1;min-width:0;font-size:13.5px;font-weight:600;color:var(--text-strong);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nbd__revat{flex:none;font-family:var(--font-mono);font-size:11px;color:var(--text-subtle)}
.nbd__revtext{font-size:13px;line-height:1.5;color:var(--text-body);margin:8px 0 0;text-wrap:pretty}
.nbd__more{display:flex;justify-content:center;padding:16px 0 4px}
.nbd__cta{flex:none;display:flex;align-items:center;gap:10px;padding:12px 20px 14px;border-top:1px solid var(--border-subtle);background:var(--surface-card);z-index:3}
.nbd__cta .vl-btn{flex:1;min-width:0}
.home-indicator{height:5px;width:134px;border-radius:999px;background:var(--ink-900);opacity:.85;margin:6px auto 8px}

/* ---------- Home header ---------- */
.head{padding:4px 20px 0}
.head__row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.loc{appearance:none;border:none;background:none;padding:0;cursor:pointer;font-family:var(--font-sans);text-align:left;color:var(--text-strong);display:inline-flex;min-width:0}
.loc__eyebrow{font-size:11px;font-weight:700;letter-spacing:var(--ls-wider);text-transform:uppercase;color:var(--text-muted);line-height:1}
.loc__name{font-family:var(--font-display);font-weight:700;color:var(--text-strong);letter-spacing:-.01em;line-height:1}
.loc svg.loc__pin{color:var(--green-700);flex:none}
.loc svg.loc__chev{color:var(--ink-500);flex:none}
.loc--inline{flex-direction:column;align-items:flex-start;gap:7px}
.loc--inline .loc__line{display:inline-flex;align-items:center;gap:6px}
.loc--inline .loc__name{font-size:19px}
.loc--inline svg.loc__pin,.loc--inline svg.loc__chev{width:17px;height:17px}
.loc--pill{align-items:center;gap:8px;padding:9px 8px 9px 13px;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-pill);box-shadow:var(--shadow-xs);transition:background var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard)}
.loc--pill:hover{box-shadow:var(--shadow-sm)}
.loc--pill .loc__name{font-size:15px;font-weight:600}
.loc--pill svg.loc__pin{width:17px;height:17px}
.loc--pill svg.loc__chev{width:16px;height:16px}
.loc--stacked{align-items:center;gap:11px}
.loc--stacked .loc__disc{width:38px;height:38px;flex:none;border-radius:var(--radius-pill);background:var(--surface-brand-tint);color:var(--green-700);display:grid;place-items:center}
.loc--stacked .loc__disc svg{width:19px;height:19px}
.loc--stacked .loc__name{display:inline-flex;align-items:center;gap:4px;font-size:18px;margin-top:4px}
.loc--stacked svg.loc__chev{width:15px;height:15px}
.bell{position:relative}
.bell .vl-iconbtn{background:transparent;border-color:transparent;box-shadow:none}
.bell .vl-iconbtn:hover{background:var(--surface-sunken)}
.bell__dot{position:absolute;top:8px;right:9px;width:9px;height:9px;border-radius:999px;background:var(--coral-500);border:2px solid var(--surface-card)}
.head__greet{margin:16px 0 12px;font-family:var(--font-display);font-weight:800;font-size:26px;line-height:1.12;letter-spacing:-.02em;color:var(--text-strong)}

/* ---------- Sections ---------- */
.section{margin-top:26px}
.section__head{display:flex;align-items:baseline;justify-content:space-between;padding:0 20px;margin-bottom:14px}
.section__title{font-family:var(--font-display);font-weight:700;font-size:20px;letter-spacing:-.01em;color:var(--text-strong);flex:1;min-width:0}
.section__title small{display:block;font-family:var(--font-sans);font-weight:500;font-size:13px;color:var(--text-muted);letter-spacing:0;margin-top:3px}
.section__link{font-size:14px;font-weight:600;color:var(--text-brand);cursor:pointer;background:none;border:none;padding:0;font-family:var(--font-sans);flex:none;white-space:nowrap;align-self:center}
.section__tools{display:flex;padding:0 20px;margin:-4px 0 14px}
.maplink{display:inline-flex;align-items:center;gap:6px;flex:none;white-space:nowrap;font-family:var(--font-sans);font-weight:600;font-size:13px;color:var(--text-brand);background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-pill);padding:6px 12px 6px 10px;cursor:pointer;box-shadow:var(--shadow-xs);transition:box-shadow var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard)}
.maplink:hover{box-shadow:var(--shadow-sm);background:var(--brand-primary-tint)}
.maplink svg{width:15px;height:15px}

/* ---------- ScrollRow (DS pattern: edge fade + peek) ---------- */
.vl-scrollrow{position:relative;--_fade:var(--color-bg);--_fadew:48px}
.vl-scrollrow__track{display:flex;gap:9px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;scroll-behavior:smooth;padding:2px 20px;margin:0;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.vl-scrollrow__track::-webkit-scrollbar{display:none}
.vl-scrollrow__track>*{scroll-snap-align:start;flex:none}
.vl-scrollrow__track .vl-tag{white-space:nowrap}
.vl-scrollrow__fade{position:absolute;top:0;bottom:0;width:var(--_fadew);pointer-events:none;z-index:2;opacity:0;transition:opacity var(--dur-base) var(--ease-standard)}
.vl-scrollrow__fade--r{right:0;background:linear-gradient(to left,var(--_fade) 22%,transparent)}
.vl-scrollrow__fade--l{left:0;background:linear-gradient(to right,var(--_fade) 22%,transparent)}
.vl-scrollrow[data-more-right="true"] .vl-scrollrow__fade--r{opacity:1}
.vl-scrollrow[data-more-left="true"] .vl-scrollrow__fade--l{opacity:1}

/* ---------- Neighbor cards ---------- */
.neighbors{display:flex;flex-direction:column;gap:12px;padding:0 20px}
.nb{position:relative;display:flex;gap:14px;align-items:flex-start;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:15px;transition:transform var(--dur-base) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard),border-color var(--dur-base) var(--ease-standard);cursor:pointer;text-align:left;font-family:inherit;width:100%}
.nb:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);border-color:transparent}
.nb--featured{box-shadow:var(--shadow-brand);border-color:transparent}
.nb__body{flex:1;min-width:0}
.nb__top{display:flex;align-items:center;gap:8px;padding-right:34px}
.nb__name{font-family:var(--font-display);font-weight:700;font-size:17px;color:var(--text-strong);letter-spacing:-.01em}
.nb__bio{font-size:13.5px;line-height:1.4;color:var(--text-body);margin:3px 0 0}
.nb__meta{display:flex;align-items:center;gap:10px;margin-top:9px;flex-wrap:nowrap}
.nb__meta .vl-rating{flex:none;white-space:nowrap}
.nb__walk{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-mono);font-size:12px;font-weight:600;color:var(--green-700);background:var(--green-50);white-space:nowrap;border:1px solid var(--green-200);padding:3px 9px 3px 7px;border-radius:var(--radius-pill)}
.nb__walk svg{width:13px;height:13px}
.nb__avatar{position:relative;flex:none}
.nb__vmark{position:absolute;right:-3px;bottom:-3px;line-height:0;filter:drop-shadow(0 1px 1.5px rgba(25,28,25,.18))}
.nb__vmark svg{display:block;width:25px;height:25px}
.nb__avail{display:inline-flex;align-items:center;gap:5px;flex:none;font-family:var(--font-sans);font-weight:600;font-size:12px;line-height:1;color:var(--coral-700);background:var(--coral-100);padding:5px 11px 5px 9px;border-radius:var(--radius-pill);white-space:nowrap}
.nb__avail i{width:6px;height:6px;border-radius:999px;background:var(--coral-500);flex:none}
.nb__price{margin-top:8px;font-family:var(--font-mono);font-size:14px;font-weight:600;color:var(--text-strong)}
.nb__price span{color:var(--text-muted);font-family:var(--font-sans);font-weight:500;font-size:12px}
.nb__tap{position:absolute;top:14px;right:14px;z-index:1;width:26px;height:26px;border-radius:var(--radius-pill);display:grid;place-items:center;color:var(--text-subtle);background:var(--surface-sunken);transition:color var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard)}
.nb__tap svg{width:15px;height:15px;stroke-width:2.4}
.nb:hover .nb__tap{color:var(--text-brand);background:var(--brand-primary-tint);transform:translateX(1px)}

/* ---------- Service cards ---------- */
.pop{display:flex;gap:14px;overflow-x:auto;padding:2px 20px 6px;scrollbar-width:none}
.pop::-webkit-scrollbar{display:none}
.svc{flex:none;width:208px;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);overflow:hidden;cursor:pointer;transition:transform var(--dur-base) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard);text-align:left;font-family:inherit;padding:0}
.svc:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.svc__thumb{position:relative;height:124px;background:var(--surface-sunken)}
.svc__thumb img{width:100%;height:100%;object-fit:cover;display:block}
.svc__fav{position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:999px;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);display:grid;place-items:center;color:var(--coral-600);box-shadow:var(--shadow-sm);border:none;cursor:pointer;padding:0;transition:transform var(--dur-fast) var(--ease-spring)}
.svc__fav:hover{transform:scale(1.08)}
.svc__fav svg{width:17px;height:17px;stroke:var(--coral-600);fill:none;transition:fill var(--dur-fast) var(--ease-standard)}
.svc__fav[aria-pressed="true"] svg{fill:var(--coral-500)}
.svc__cat{position:absolute;left:10px;bottom:10px;font-size:11px;font-weight:700;letter-spacing:.02em;background:rgba(27,28,24,.62);color:#fff;backdrop-filter:blur(3px);padding:4px 9px;border-radius:var(--radius-pill)}
.svc__pad{padding:13px 14px 15px}
.svc__title{font-family:var(--font-display);font-weight:700;font-size:15.5px;color:var(--text-strong);line-height:1.2;letter-spacing:-.01em}
.svc__by{display:flex;align-items:center;gap:7px;margin-top:9px}
.svc__byname{font-size:12.5px;color:var(--text-muted)}
.svc__foot{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-top:12px}
.svc__price{white-space:nowrap}
.svc__price b{font-family:var(--font-mono);font-weight:600;font-size:17px;color:var(--text-strong)}
.svc__price span{font-size:12px;color:var(--text-muted)}
.svc__rate{display:inline-flex;align-items:center;gap:3px;font-family:var(--font-mono);font-size:12.5px;font-weight:600;color:var(--text-strong)}
.svc__rate svg{width:13px;height:13px;color:var(--rating);fill:var(--rating)}

/* ---------- Open-request entry card (home) ---------- */
.orq{position:relative;display:block;width:100%;margin:0 20px;box-sizing:border-box;width:calc(100% - 40px);text-align:left;font-family:inherit;cursor:pointer;background:var(--surface-card);border:1.5px solid var(--green-200);border-radius:var(--radius-lg);padding:15px 16px;transition:transform var(--dur-base) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
.orq:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.orq__eyebrow{display:flex;align-items:center;gap:6px;font-size:10.5px;font-weight:700;letter-spacing:var(--ls-wider);text-transform:uppercase;color:var(--text-brand)}
.orq__eyebrow svg{width:13px;height:13px}
.orq__title{font-family:var(--font-display);font-weight:700;font-size:16px;letter-spacing:-.01em;color:var(--text-strong);margin-top:7px;padding-right:24px}
.orq__foot{display:flex;align-items:center;gap:9px;margin-top:11px}
.orq__stack{display:flex}
.orq__stack .vl-avatar{margin-left:-8px;box-shadow:0 0 0 2px var(--surface-card);border-radius:999px}
.orq__stack .vl-avatar:first-child{margin-left:0}
.orq__count{font-size:12.5px;font-weight:600;color:var(--text-body)}
.orq__count--wait{display:inline-flex;align-items:center;gap:6px;color:var(--text-muted)}
.orq__count--wait svg{width:14px;height:14px}
.orq__chev{position:absolute;top:16px;right:14px;color:var(--text-subtle)}
.orq__chev svg{width:16px;height:16px;stroke-width:2.4}

/* ---------- App bar (secondary screens) ---------- */
.appbar{flex:none;display:flex;align-items:center;gap:6px;padding:0 12px 8px;z-index:3}
.appbar__title{flex:1;min-width:0;text-align:center;font-family:var(--font-display);font-weight:700;font-size:16.5px;letter-spacing:-.01em;color:var(--text-strong);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.appbar__spacer{width:44px;flex:none}
.appbar__title--lead{text-align:left;padding-left:8px;font-size:19px}
.tabsrow{padding:2px 20px 0;overflow-x:auto;scrollbar-width:none}
.tabsrow::-webkit-scrollbar{display:none}

/* ---------- Bookings ---------- */
.bkl{display:flex;flex-direction:column;gap:12px;padding:16px 20px 8px}
.bkl__card{background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:15px}
.bkl__card--dead{opacity:.62}
.bkl__row{display:flex;gap:13px;align-items:flex-start}
.bkl__body{flex:1;min-width:0}
.bkl__who{font-family:var(--font-display);font-weight:700;font-size:16.5px;letter-spacing:-.01em;color:var(--text-strong)}
.bkl__svc{font-size:13px;color:var(--text-muted);margin-top:3px;line-height:1.4}
.bkl__meta{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-top:12px}
.bkl__chip{display:inline-flex;align-items:center;gap:5px;flex:none;font-family:var(--font-mono);font-size:12px;font-weight:600;color:var(--green-700);background:var(--green-50);border:1px solid var(--green-200);padding:4px 10px 4px 8px;border-radius:var(--radius-pill);white-space:nowrap}
.bkl__chip svg{width:13px;height:13px}
.bkl__price{margin-left:auto;font-family:var(--font-mono);font-size:15px;font-weight:600;color:var(--text-strong);white-space:nowrap}
.bkl__acts{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-top:14px}
.bkl__rated{display:inline-flex;align-items:center;gap:6px;flex:1;min-width:0;font-size:12.5px;color:var(--text-muted);white-space:nowrap}

/* ---------- Messages ---------- */
.msg__list{display:flex;flex-direction:column;padding:8px 0 8px}
.msg__row{display:flex;align-items:center;gap:13px;width:100%;box-sizing:border-box;padding:13px 20px;background:none;border:none;border-bottom:1px solid var(--border-subtle);text-align:left;font-family:inherit;cursor:pointer;transition:background var(--dur-fast) var(--ease-standard)}
.msg__row:hover{background:var(--surface-sunken)}
.msg__body{flex:1;min-width:0;display:block}
.msg__top{display:flex;align-items:baseline;gap:10px;min-width:0}
.msg__who{flex:1;min-width:0;font-family:var(--font-display);font-weight:700;font-size:15.5px;letter-spacing:-.01em;color:var(--text-strong);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.msg__at{flex:none;font-family:var(--font-mono);font-size:11px;color:var(--text-subtle)}
.msg__snip{display:block;font-size:13px;line-height:1.4;color:var(--text-muted);margin-top:4px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.msg__snip--unread{color:var(--text-strong);font-weight:600}
.msg__unread{flex:none;min-width:20px;height:20px;padding:0 6px;box-sizing:border-box;border-radius:var(--radius-pill);background:var(--coral-500);color:#fff;font-family:var(--font-mono);font-size:11px;font-weight:700;display:grid;place-items:center}

.conv{flex:1;min-height:0;display:flex;flex-direction:column}
.conv__scroll{flex:1;min-height:0;overflow-y:auto;padding:8px 20px 14px;display:flex;flex-direction:column;gap:9px}
.conv__scroll::-webkit-scrollbar{width:0}
.conv__day{align-self:center;font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--text-subtle);padding:4px 0 8px}
.bub{max-width:78%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.45}
.bub__at{font-family:var(--font-mono);font-size:10px;margin-top:5px;opacity:.72}
.bub--them{align-self:flex-start;background:var(--surface-card);border:1.5px solid var(--border-default);border-bottom-left-radius:6px;color:var(--text-body)}
.bub--me{align-self:flex-end;background:var(--green-600);color:var(--paper);border-bottom-right-radius:6px}
.bub--me .bub__at{text-align:right}
.conv__composer{flex:none;display:flex;align-items:center;gap:9px;padding:11px 16px 13px;border-top:1px solid var(--border-subtle);background:var(--surface-card)}
.conv__input{flex:1;min-width:0;height:44px;box-sizing:border-box;padding:0 15px;font-family:var(--font-sans);font-size:14px;color:var(--text-strong);background:var(--color-bg);border:1.5px solid var(--border-default);border-radius:var(--radius-pill)}
.conv__input:focus{outline:none;border-color:var(--border-focus);box-shadow:var(--focus-ring)}

/* ---------- Profile ---------- */
.pro__hero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:14px 20px 20px}
.pro__name{font-family:var(--font-display);font-weight:800;font-size:22px;letter-spacing:-.02em;color:var(--text-strong);margin-top:13px}
.pro__hood{display:inline-flex;align-items:center;gap:5px;font-size:13.5px;color:var(--text-body);margin-top:6px}
.pro__hood svg{width:14px;height:14px;color:var(--green-700)}
.pro__since{font-family:var(--font-mono);font-size:11.5px;color:var(--text-subtle);margin-top:6px}
.pro__stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border-subtle);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);overflow:hidden;width:100%;margin-top:18px}
.pro__stat{background:var(--surface-card);padding:12px 8px}
.pro__statv{font-family:var(--font-mono);font-size:18px;font-weight:700;color:var(--text-strong)}
.pro__statk{font-size:11px;font-weight:600;color:var(--text-muted);margin-top:3px}
.pro__req{position:relative;display:block;width:100%;box-sizing:border-box;text-align:left;font-family:inherit;cursor:pointer;background:var(--surface-card);border:1.5px solid var(--green-200);border-radius:var(--radius-lg);padding:15px 40px 15px 16px}
.pro__req:hover{box-shadow:var(--shadow-sm)}
.pro__reqt{display:block;font-family:var(--font-display);font-weight:700;font-size:15.5px;letter-spacing:-.01em;color:var(--text-strong);line-height:1.25}
.pro__reqm{display:flex;align-items:center;gap:9px;margin-top:10px}
.pro__reqc{font-size:12.5px;font-weight:600;color:var(--text-body)}
.pro__reqchev{position:absolute;top:50%;right:14px;transform:translateY(-50%);color:var(--text-subtle)}
.pro__reqchev svg{width:16px;height:16px;stroke-width:2.4}
.pro__rows{display:flex;flex-direction:column;background:var(--surface-card);border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle)}
.pro__row{display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;padding:14px 20px;background:none;border:none;border-bottom:1px solid var(--border-subtle);text-align:left;font-family:inherit;cursor:pointer;min-height:44px}
.pro__row:last-child{border-bottom:none}
.pro__row:hover{background:var(--surface-sunken)}
.pro__rowicon{width:34px;height:34px;flex:none;border-radius:var(--radius-pill);background:var(--surface-brand-tint);color:var(--green-700);display:grid;place-items:center}
.pro__rowicon svg{width:17px;height:17px}
.pro__rowl{flex:1;min-width:0;font-size:14.5px;font-weight:600;color:var(--text-strong)}
.pro__rowd{flex:none;font-family:var(--font-mono);font-size:12px;color:var(--text-muted);white-space:nowrap}
.pro__rowchev{flex:none;color:var(--text-subtle)}
.pro__rowchev svg{width:15px;height:15px;stroke-width:2.4}
.pro__rowicon--staff{background:var(--coral-100);color:var(--coral-700)}
.pro__rowbadge{flex:none;min-width:20px;height:20px;padding:0 6px;box-sizing:border-box;border-radius:var(--radius-pill);background:var(--coral-500);color:#fff;font-family:var(--font-mono);font-size:11px;font-weight:700;display:grid;place-items:center}
.pro__switch{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 20px;border-bottom:1px solid var(--border-subtle)}
.pro__switch:last-child{border-bottom:none}
.pro__out{display:flex;justify-content:center;padding:26px 20px 10px}

/* ---------- Request detail ---------- */
.rq{padding:0 20px}
.rq__head{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.rq__title{font-family:var(--font-display);font-weight:800;font-size:23px;line-height:1.16;letter-spacing:-.02em;color:var(--text-strong);margin:12px 0 0;text-wrap:balance}
.rq__posted{font-size:12.5px;color:var(--text-muted);margin-top:7px;font-family:var(--font-mono)}
.rq__grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border-subtle);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);overflow:hidden;margin-top:16px}
.rq__cell{background:var(--surface-card);padding:12px 14px;min-width:0}
.rq__cell--wide{grid-column:1 / -1}
.rq__label{display:flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;letter-spacing:var(--ls-wider);text-transform:uppercase;color:var(--text-muted)}
.rq__label svg{width:12px;height:12px}
.rq__val{font-size:14px;font-weight:600;color:var(--text-strong);margin-top:5px;line-height:1.35}
.rq__val--mono{font-family:var(--font-mono);font-weight:600}
.rq__notes{font-size:13.5px;line-height:1.55;color:var(--text-body);margin:14px 0 0;text-wrap:pretty}
.rq__quiet{display:flex;gap:18px;padding:22px 20px 6px;border-top:1px solid var(--border-subtle);margin-top:24px}
.quietlink{background:none;border:none;padding:0;font-family:var(--font-sans);font-size:13.5px;font-weight:600;color:var(--text-muted);cursor:pointer;text-decoration:underline;text-decoration-color:var(--border-strong);text-underline-offset:3px}
.quietlink:hover{color:var(--text-strong)}
.quietlink--danger:hover{color:var(--red-700)}

/* Responder cards */
.resp{position:relative;display:flex;flex-direction:column;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:15px}
.resp--top{box-shadow:var(--shadow-brand);border-color:transparent}
.resp__row{display:flex;gap:13px;align-items:flex-start}
.resp__body{flex:1;min-width:0}
.resp__name{font-family:var(--font-display);font-weight:700;font-size:16.5px;color:var(--text-strong);letter-spacing:-.01em}
.resp__top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.resp__meta{display:flex;align-items:center;gap:9px;margin-top:7px;flex-wrap:wrap;min-width:0}
.resp__meta .vl-rating{flex:none;white-space:nowrap}
.resp__meta .nb__walk{flex:none}
.resp__quote{margin:12px 0 0;padding:11px 13px;background:var(--surface-sunken);border-radius:var(--radius-md);font-size:13px;line-height:1.5;color:var(--text-body);text-wrap:pretty}
.resp__foot{display:flex;align-items:center;gap:10px;margin-top:13px;flex-wrap:wrap}
.resp__price{flex:1;min-width:0;font-family:var(--font-mono);font-size:16px;font-weight:600;color:var(--text-strong);white-space:nowrap}
.resp__price span{font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--text-muted)}
.rq--closed .resp{opacity:.55}

/* ---------- Booking ---------- */
.bk{padding:0 20px}
.bk__prov{display:flex;align-items:center;gap:13px;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:14px}
.bk__provbody{flex:1;min-width:0}
.bk__provname{font-family:var(--font-display);font-weight:700;font-size:17px;letter-spacing:-.01em;color:var(--text-strong)}
.bk__provsvc{font-size:13px;color:var(--text-muted);margin-top:3px}
.bk__group{margin-top:22px}
.bk__legend{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:700;letter-spacing:var(--ls-wider);text-transform:uppercase;color:var(--text-muted);margin-bottom:10px}
.bk__chips{display:flex;flex-wrap:wrap;gap:8px}
.bk__days{display:flex;gap:7px;margin-top:10px}
.bk__day{flex:1;min-width:0;height:44px;border-radius:var(--radius-md);border:1.5px solid var(--border-default);background:var(--surface-card);font-family:var(--font-sans);font-size:13px;font-weight:600;color:var(--text-body);cursor:pointer;transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard)}
.bk__day:hover{background:var(--surface-sunken)}
.bk__day[aria-pressed="true"]{background:var(--brand-primary);border-color:transparent;color:var(--brand-on-primary)}
.bk__switchrow{display:flex;align-items:center;justify-content:space-between;gap:14px;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:14px 15px}
.bk__switchlabel{font-size:14px;font-weight:600;color:var(--text-strong)}
.bk__switchlabel small{display:block;font-weight:500;font-size:12.5px;color:var(--text-muted);margin-top:3px}
.bk__err{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:12.5px;font-weight:600;color:var(--red-700)}
.bk__err svg{width:14px;height:14px;flex:none}
.bk__note{width:100%;box-sizing:border-box;min-height:82px;resize:none;font-family:var(--font-sans);font-size:14px;line-height:1.5;color:var(--text-strong);background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-md);padding:12px 14px}
.bk__note:focus{outline:none;border-color:var(--border-focus);box-shadow:var(--focus-ring)}
.bk__counter{font-family:var(--font-mono);font-size:11px;color:var(--text-subtle);text-align:right;margin-top:5px}
.bk__sum{background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:15px;margin-top:22px}
.bk__line{display:flex;align-items:baseline;justify-content:space-between;gap:12px;font-size:13.5px;color:var(--text-body);padding:5px 0}
.bk__line b{font-family:var(--font-mono);font-weight:600;color:var(--text-strong)}
.bk__total{display:flex;align-items:baseline;justify-content:space-between;gap:12px;border-top:1px solid var(--border-subtle);margin-top:8px;padding-top:12px}
.bk__totall{font-family:var(--font-display);font-weight:700;font-size:16px;color:var(--text-strong)}
.bk__totalv{font-family:var(--font-mono);font-weight:700;font-size:22px;color:var(--text-strong)}
/* Action stack: confirm is the only filled button, cancel is a quiet link */
.bk__cta{padding:20px 20px 4px}
.bk__cancelwrap{display:flex;justify-content:center;padding:14px 20px 8px}
.bk__banner{display:flex;gap:12px;align-items:flex-start;margin:0 20px;padding:15px;border-radius:var(--radius-lg);background:var(--success-tint);border:1.5px solid var(--green-200)}
.bk__banner--dead{background:var(--surface-sunken);border-color:var(--border-default)}
.bk__bicon{width:34px;height:34px;flex:none;border-radius:999px;background:var(--green-600);color:var(--paper);display:grid;place-items:center}
.bk__banner--dead .bk__bicon{background:var(--ink-400)}
.bk__bicon svg{width:19px;height:19px;stroke-width:2.6}
.bk__btitle{font-family:var(--font-display);font-weight:700;font-size:16px;letter-spacing:-.01em;color:var(--text-strong)}
.bk__btext{font-size:13px;line-height:1.5;color:var(--text-body);margin-top:4px;text-wrap:pretty}
.bk__ro{display:flex;justify-content:space-between;gap:14px;padding:11px 0;border-bottom:1px solid var(--border-subtle)}
.bk__ro:last-child{border-bottom:none}
.bk__rok{font-size:13px;color:var(--text-muted)}
.bk__rov{font-size:13.5px;font-weight:600;color:var(--text-strong);text-align:right}
.bk__rov--mono{font-family:var(--font-mono)}

/* ---------- Bottom sheet ---------- */
.scrim{position:absolute;inset:0;background:rgba(27,28,24,.45);z-index:20;animation:fade var(--dur-base) var(--ease-standard)}
@keyframes fade{from{opacity:0}to{opacity:1}}
.sheet{position:absolute;left:0;right:0;bottom:0;z-index:21;background:var(--surface-card);border-radius:24px 24px 0 0;padding:22px 20px 18px;box-shadow:var(--shadow-xl);animation:up var(--dur-base) var(--ease-spring)}
@keyframes up{from{transform:translateY(100%)}to{transform:translateY(0)}}
.sheet__grip{width:38px;height:4px;border-radius:999px;background:var(--border-strong);margin:0 auto 16px}
.sheet__title{font-family:var(--font-display);font-weight:800;font-size:20px;letter-spacing:-.02em;color:var(--text-strong);text-wrap:balance}
.sheet__text{font-size:13.5px;line-height:1.55;color:var(--text-body);margin:9px 0 0;text-wrap:pretty}
.sheet__actions{display:flex;flex-direction:column;gap:4px;margin-top:20px}
.sheet__quiet{display:flex;justify-content:center;padding:10px 0 2px}

/* ---------- Empty state (DS pattern) ---------- */
.empty{display:flex;flex-direction:column;align-items:center;text-align:center;padding:34px 30px 30px}
.empty__med{width:54px;height:54px;border-radius:999px;background:var(--surface-brand-tint);color:var(--green-700);display:grid;place-items:center}
.empty__med svg{width:24px;height:24px}
.empty__title{font-family:var(--font-display);font-weight:700;font-size:17px;letter-spacing:-.01em;color:var(--text-strong);margin-top:14px}
.empty__text{font-size:13.5px;line-height:1.55;color:var(--text-muted);margin:6px 0 0;max-width:26ch;text-wrap:pretty}
.empty__act{margin-top:16px}

/* ---------- Toast ---------- */
.toast{position:absolute;left:20px;right:20px;bottom:112px;z-index:30;display:flex;align-items:center;gap:10px;background:var(--surface-inverse);color:var(--paper);border-radius:var(--radius-md);padding:12px 15px;font-size:13.5px;font-weight:500;box-shadow:var(--shadow-lg);animation:up var(--dur-base) var(--ease-standard)}
.toast svg{width:17px;height:17px;flex:none;color:var(--green-300)}
.toast--desk{position:fixed;left:auto;right:24px;bottom:24px;width:320px}

/* ---------- Surface switcher (prototype chrome) ---------- */
.switcher{position:fixed;left:14px;bottom:14px;z-index:60;display:flex;gap:2px;padding:4px;background:rgba(246,242,231,.86);backdrop-filter:blur(12px);border:1px solid var(--border-default);border-radius:var(--radius-pill);box-shadow:var(--shadow-md)}
.switcher__b{display:inline-flex;align-items:center;gap:6px;border:none;background:none;border-radius:var(--radius-pill);padding:7px 13px;font-family:var(--font-sans);font-size:12.5px;font-weight:600;color:var(--text-muted);cursor:pointer;white-space:nowrap}
.switcher__b:hover{color:var(--text-strong)}
.switcher__b[aria-pressed="true"]{background:var(--brand-primary);color:var(--brand-on-primary)}
.switcher__b svg{width:14px;height:14px}

/* ==========================================================
   Admin — moderation queue
   ========================================================== */
.adm{width:1280px;height:840px;display:grid;grid-template-columns:214px minmax(0,1fr) 348px;grid-template-rows:minmax(0,1fr);background:var(--paper);border-radius:16px;overflow:hidden;box-shadow:var(--shadow-xl);border:1px solid var(--border-default);font-family:var(--font-sans)}
.adm__side{background:var(--forest-800);padding:22px 16px;display:flex;flex-direction:column;gap:4px;min-width:0;min-height:0;overflow-y:auto}
.adm__brand{display:flex;align-items:center;gap:9px;padding:2px 8px 22px}
.adm__brandname{font-family:var(--font-display);font-weight:800;font-size:19px;letter-spacing:-.02em;color:var(--paper)}
.adm__brand svg{width:22px;height:22px;color:var(--green-300)}
.adm__tagchip{font-size:9.5px;font-weight:700;letter-spacing:var(--ls-wider);text-transform:uppercase;color:var(--forest-300);border:1px solid rgba(246,242,231,.28);padding:3px 7px;border-radius:var(--radius-pill)}
.adm__navitem{display:flex;align-items:center;gap:11px;width:100%;padding:10px 12px;border-radius:var(--radius-md);border:none;background:none;font-family:inherit;font-size:13.5px;font-weight:600;color:rgba(246,242,231,.72);cursor:pointer;text-align:left;transition:background var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard)}
.adm__navitem:hover{background:rgba(255,255,255,.09);color:var(--paper)}
.adm__navitem[aria-current="true"]{background:rgba(255,255,255,.17);color:var(--paper)}
.adm__navitem svg{width:17px;height:17px;flex:none}
.adm__navcount{margin-left:auto;font-family:var(--font-mono);font-size:11px;font-weight:700;background:var(--coral-500);color:#fff;padding:2px 7px;border-radius:var(--radius-pill)}
.adm__me{margin-top:auto;display:flex;align-items:center;gap:10px;padding-top:16px;border-top:1px solid rgba(255,255,255,.13)}
.adm__exit{display:flex;align-items:center;gap:9px;width:100%;margin-top:12px;padding:10px 12px;border-radius:var(--radius-md);border:1px solid rgba(246,242,231,.28);background:none;font-family:inherit;font-size:13px;font-weight:600;color:rgba(246,242,231,.82);cursor:pointer;text-align:left;transition:background var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard)}
.adm__exit:hover{background:rgba(255,255,255,.11);color:var(--paper)}
.adm__exit svg{width:16px;height:16px;flex:none}
.adm__mename{font-size:13px;font-weight:600;color:var(--paper)}
.adm__merole{font-size:11.5px;color:rgba(246,242,231,.6);margin-top:2px}
.adm__main{display:flex;flex-direction:column;min-width:0;min-height:0}
.adm__top{display:flex;align-items:flex-start;gap:18px;padding:22px 24px 0}
.adm__h1{font-family:var(--font-display);font-weight:800;font-size:23px;letter-spacing:-.02em;color:var(--text-strong)}
.adm__h1 small{display:block;font-family:var(--font-sans);font-weight:500;font-size:13px;color:var(--text-muted);margin-top:5px;letter-spacing:0}
.adm__search{margin-left:auto;width:264px;flex:none}
.adm__tabs{padding:16px 24px 0;overflow-x:auto;scrollbar-width:none}
.adm__tabs::-webkit-scrollbar{display:none}
.adm__tabs .vl-tab{flex:none;white-space:nowrap}
.adm__bulk{display:flex;align-items:center;gap:10px;margin:14px 24px 0;padding:9px 10px 9px 15px;background:var(--brand-primary-tint);border:1.5px solid var(--green-200);border-radius:var(--radius-md)}
.adm__bulkt{flex:1;min-width:0;font-size:13px;font-weight:600;color:var(--text-brand)}
.adm__list{flex:1;min-height:0;overflow-y:auto;padding:14px 24px 24px;display:flex;flex-direction:column;gap:9px}
.adm__row{display:grid;grid-template-columns:22px 116px minmax(0,1fr) 82px 50px;align-items:center;gap:13px;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-md);padding:13px 15px;cursor:pointer;text-align:left;font-family:inherit;transition:box-shadow var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard)}
.adm__row:hover{box-shadow:var(--shadow-sm);border-color:var(--border-strong)}
.adm__row[aria-selected="true"]{border-color:var(--green-600);box-shadow:var(--shadow-sm)}
.adm__subj{min-width:0;display:block}
.adm__subjt{display:block;font-size:13.5px;font-weight:600;color:var(--text-strong);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.adm__subjd{display:flex;align-items:center;gap:7px;min-width:0;font-size:12px;color:var(--text-muted);margin-top:4px}
.adm__subjd .vl-avatar{flex:none}
.adm__subjdt{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.adm__who{display:flex;align-items:center;gap:8px;min-width:0;font-size:12.5px;color:var(--text-body)}
.adm__whon{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.adm__age{display:block;font-family:var(--font-mono);font-size:12px;font-weight:600;color:var(--text-muted);white-space:nowrap;text-align:right}
.adm__age--late{color:var(--red-700)}
.adm__rowchev{color:var(--text-subtle);justify-self:end}
.adm__rowchev svg{width:16px;height:16px;stroke-width:2.4}
.adm__detail{border-left:1px solid var(--border-default);background:var(--surface-card);display:flex;flex-direction:column;min-width:0;min-height:0}
.adm__dhead{flex:none;padding:22px 22px 16px;border-bottom:1px solid var(--border-subtle)}
.adm__dbadges{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.adm__dtitle{font-family:var(--font-display);font-weight:800;font-size:19px;line-height:1.22;letter-spacing:-.02em;color:var(--text-strong);margin-top:12px;text-wrap:balance}
.adm__dbody{flex:1;min-height:0;overflow-y:auto;padding:18px 22px}
.adm__dsec{font-size:10.5px;font-weight:700;letter-spacing:var(--ls-wider);text-transform:uppercase;color:var(--text-muted);margin:0 0 9px}
.adm__dsec--sp{margin-top:22px}
.adm__quote{margin:0;padding:13px 15px;background:var(--surface-sunken);border-radius:var(--radius-md);font-size:13px;line-height:1.55;color:var(--text-body);text-wrap:pretty}
.adm__ev{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.adm__ev li{display:flex;gap:9px;align-items:flex-start;font-size:13px;line-height:1.45;color:var(--text-body)}
.adm__ev svg{width:15px;height:15px;flex:none;margin-top:2px;color:var(--text-subtle)}
.adm__stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border-subtle);border:1.5px solid var(--border-default);border-radius:var(--radius-md);overflow:hidden}
.adm__stat{background:var(--surface-card);padding:11px 12px}
.adm__statv{font-family:var(--font-mono);font-size:16px;font-weight:700;color:var(--text-strong)}
.adm__statk{font-size:10.5px;font-weight:600;letter-spacing:.02em;color:var(--text-muted);margin-top:3px}
.adm__dfoot{flex:none;border-top:1px solid var(--border-subtle);padding:16px 22px 20px;display:flex;flex-direction:column;gap:9px}
.adm__frow{display:flex;gap:9px}
.adm__frow>*{flex:1;min-width:0}
.adm__reject{background:var(--danger-tint);border:1.5px solid #F2CFCF;border-radius:var(--radius-md);padding:14px}
.adm__rejt{font-size:13px;font-weight:700;color:var(--red-700)}
.adm__rejchips{display:flex;flex-wrap:wrap;gap:7px;margin-top:11px}
.adm__rejchip{border:1.5px solid var(--border-default);background:var(--surface-card);border-radius:var(--radius-pill);padding:6px 12px;font-family:var(--font-sans);font-size:12.5px;font-weight:600;color:var(--text-body);cursor:pointer}
.adm__rejchip[aria-pressed="true"]{background:var(--red-600);border-color:transparent;color:#fff}
.adm__danger{width:100%;height:44px;border-radius:var(--radius-pill);border:none;background:var(--red-600);color:#fff;font-family:var(--font-sans);font-size:14px;font-weight:700;cursor:pointer;transition:background var(--dur-fast) var(--ease-standard)}
.adm__danger:hover{background:var(--red-700)}
.adm__dempty{flex:1;display:grid;place-items:center;padding:30px}

/* Admin — mobile variant */
.admm__filters{padding:2px 0 0}
.admm__list{display:flex;flex-direction:column;gap:10px;padding:14px 16px 20px}
.admm__card{display:block;width:100%;box-sizing:border-box;text-align:left;font-family:inherit;background:var(--surface-card);border:1.5px solid var(--border-default);border-radius:var(--radius-lg);padding:14px;cursor:pointer}
.admm__card:hover{box-shadow:var(--shadow-sm)}
.admm__top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.admm__t{font-size:14px;font-weight:600;color:var(--text-strong);margin-top:10px;line-height:1.3}
.admm__d{font-size:12.5px;color:var(--text-muted);margin-top:4px;line-height:1.4}
.admm__foot{display:flex;align-items:center;gap:9px;margin-top:11px}
.admm__age{font-family:var(--font-mono);font-size:11.5px;font-weight:600;color:var(--text-muted);margin-left:auto}
.admm__age--late{color:var(--red-700)}
.admm__sheetwrap{position:absolute;left:0;right:0;top:50px;bottom:0;z-index:25;background:var(--color-bg);display:flex;flex-direction:column;animation:up var(--dur-base) var(--ease-standard)}
```

### Prototype — Page markup (scripts removed)

```html
<div id="stage"><div id="root"></div></div>
```
