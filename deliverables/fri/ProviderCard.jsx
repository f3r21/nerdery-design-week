/* ProviderCard · v2 (guardrail active), generated from spec-by-hand.md, the home screenshot and the
   design-system docs (foundations, components, patterns) plus vendor/*.css.
   NOT read: vello/03-ds-providercard.md (the real ProviderCard page and source).
   Plain React 18, no JSX runtime needed beyond React.createElement (esbuild --jsx=transform). */

const ICON = {
  footprints: [
    'M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z',
    'M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z',
    'M16 17h4', 'M4 13h4',
  ],
  chevron: ['m9 18 6-6-6-6'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
};

/** Lucide-style icon: 24 viewBox, 2px stroke, currentColor. Decorative unless a title is given. */
function Icon({ name, size = 16, fill = 'none', title, className }) {
  const paths = ICON[name];
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} focusable="false">
      {title ? <title>{title}</title> : null}
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const STATUS_LABEL = {
  verified: 'Background-checked',
  'top-rated': 'Top-rated neighbor',
  pending: 'Verification pending',
  unverified: 'Not yet verified',
};

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

/**
 * ProviderCard — the Vello listing row: photo + trust mark, name, availability, one-line summary,
 * starting price, walk time and rating. The whole card navigates; there is no nested action.
 *
 * @param {object} p
 * @param {string} p.name           Provider's full name (drives the accessible name and initials).
 * @param {string} [p.photo]        Image URL; initials fallback when omitted.
 * @param {string} p.summary        One or two lines, sentence case.
 * @param {{amount:string, unit:string, from?:boolean}} p.price   e.g. { amount:'$24', unit:'walk', from:true }
 * @param {number} [p.walkMinutes]  Walking time from the requester.
 * @param {number} [p.rating]       0–5, one decimal. Omit for a new provider.
 * @param {number} [p.reviewCount]  Shown as "(213)" when present.
 * @param {boolean} [p.available]   Live availability flag.
 * @param {'verified'|'top-rated'|'pending'|'unverified'} [p.status]  Trust status shown on the avatar.
 * @param {string} p.href           Destination (the neighbor detail screen).
 * @param {boolean} [p.featured]    Single featured slot in a list: olive-tinted lift.
 */
function ProviderCard({ name, photo, summary, price, walkMinutes, rating, reviewCount, available, status, href, featured }) {
  const id = React.useId();
  const showRating = typeof rating === 'number' && rating > 0;
  return (
    <a className={'pc' + (featured ? ' pc--featured' : '')} href={href} aria-labelledby={id}>
      <span className="pc__avatar">
        {photo
          ? <img className="pc__photo" src={photo} alt="" />
          : <span className="pc__initials" aria-hidden="true">{initials(name)}</span>}
        {status ? (
          <span className={'pc__mark pc__mark--' + status}>
            <Icon name="shield" size={12} fill="currentColor" title={STATUS_LABEL[status]} />
          </span>
        ) : null}
      </span>

      <span className="pc__body">
        <span className="pc__head">
          <span className="pc__name" id={id}>{name}</span>
          {available ? (
            <span className="pc__badge pc__badge--available">
              <span className="pc__dot" aria-hidden="true" />Available
            </span>
          ) : null}
          <span className="pc__chevron"><Icon name="chevron" size={18} /></span>
        </span>

        <span className="pc__summary">{summary}</span>

        <span className="pc__price">
          {price.from ? <span className="pc__from">from</span> : null}
          <span className="pc__amount">{price.amount}</span>
          <span className="pc__unit">/ {price.unit}</span>
        </span>

        <span className="pc__meta">
          {typeof walkMinutes === 'number' ? (
            <span className="pc__walk"><Icon name="footprints" size={16} />{walkMinutes} min walk</span>
          ) : null}
          {showRating ? (
            <span className="pc__rating">
              <span className="pc__stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={16} fill="currentColor" />)}
              </span>
              <span className="pc__score">{rating.toFixed(1)}</span>
              {reviewCount ? <span className="pc__count">({reviewCount})</span> : null}
              <span className="pc__sr">Rated {rating.toFixed(1)} out of 5{reviewCount ? `, ${reviewCount} reviews` : ''}</span>
            </span>
          ) : (
            <span className="pc__badge pc__badge--new">New</span>
          )}
        </span>
      </span>
    </a>
  );
}

window.ProviderCard = ProviderCard;
