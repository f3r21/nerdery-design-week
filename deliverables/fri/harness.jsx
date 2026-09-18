/* Harness: renders ProviderCard next to the reference crop, with the five home cards and four edge cases. */
const P = window.ProviderCard;
const cards = [
  { name: 'Maya Rivera', photo: 'https://i.pravatar.cc/144?img=47', summary: 'Dog walker & pet sitter, just up on 4th Ave.', price: { amount: '$24', unit: 'walk', from: true }, walkMinutes: 6, rating: 4.9, available: true, status: 'verified', href: '#maya' },
  { name: 'Devon Clarke', photo: 'https://i.pravatar.cc/144?img=12', summary: 'Handyman — shelves, leaky faucets, flat-pack furniture.', price: { amount: '$65', unit: 'flat', from: true }, walkMinutes: 9, rating: 4.8, status: 'verified', href: '#devon' },
  { name: 'Priya Anand', photo: 'https://i.pravatar.cc/144?img=32', summary: 'Deep cleans & move-outs. Brings her own eco supplies.', price: { amount: '$90', unit: 'visit', from: true }, walkMinutes: 12, rating: 5.0, available: true, status: 'verified', href: '#priya' },
  { name: 'Grace Lin', photo: 'https://i.pravatar.cc/144?img=44', summary: 'Math and SAT prep, grades 7–12. Library or your place.', price: { amount: '$40', unit: 'hr', from: true }, walkMinutes: 14, rating: 5.0, available: true, status: 'verified', href: '#grace' },
];
const edge = [
  { name: 'Alexandra Konstantinopoulou-Whitfield', summary: 'A very long name and no photo: initials fallback, ellipsis on the name.', price: { amount: '$120', unit: 'visit', from: true }, walkMinutes: 12, rating: 4.7, reviewCount: 213, available: true, status: 'top-rated', href: '#long' },
  { name: 'Hana Kim', photo: 'https://i.pravatar.cc/144?img=5', summary: 'New tutor, no reviews yet: a "New" badge instead of a rating.', price: { amount: '$35', unit: 'hr', from: true }, walkMinutes: 4, status: 'pending', href: '#new' },
  { name: 'Ruth Okafor', summary: 'Not yet verified, no walk time, fixed price.', price: { amount: '$20', unit: 'walk' }, rating: 4.2, reviewCount: 3, status: 'unverified', href: '#ruth' },
  { name: 'Sofia Marino', photo: 'https://i.pravatar.cc/144?img=20', summary: 'Weekly and biweekly cleans on 79th and 80th St. Featured slot with the olive lift.', price: { amount: '$90', unit: 'visit', from: true }, walkMinutes: 11, rating: 4.9, reviewCount: 88, status: 'verified', featured: true, href: '#sofia' },
];
const inDeck = window.parent !== window; // embedded in demo/present.html: drop the page header so the reference and the first generated card share one screen
function App() {
  return (
    <div style={{ maxWidth: 'var(--container-app)', margin: '0 auto', padding: inDeck ? 'var(--space-2) var(--space-3)' : 'var(--space-6) var(--space-4)', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: inDeck ? 'var(--space-2)' : 'var(--space-6)' }}>
      {!inDeck && <header>
        <p className="v-eyebrow">Vello · ProviderCard v2</p>
        <h1 className="v-h2">Generated from docs and tokens only, v2 with guardrail</h1>
        <p className="v-body-sm v-muted">Left: the prototype's home card, cropped. Below: the component with the same data, then four edge cases.</p>
      </header>}
      {!inDeck && <section>
        <p className="v-eyebrow">Reference (screenshot)</p>
        <img src="reference-home-card.png" alt="Maya Rivera's card on the Vello home screen, as rendered by the prototype" style={{ width: '100%', borderRadius: 'var(--radius-lg)' }} />
      </section>}
      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--space-4)' }}>
        {!inDeck && <p className="v-eyebrow">Generated · home cards</p>}
        {(inDeck ? [cards[3], edge[0]] : cards).map(c => <P key={c.href} {...c} />)}
      </section>
      {!inDeck && <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--space-4)' }}>
        <p className="v-eyebrow">Generated · edge cases</p>
        {edge.map(c => <P key={c.href} {...c} />)}
      </section>}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
/* Inside the demo deck (present.html) the iframe steals focus; forward arrow keys so the deck keeps navigating. */
if (window.parent !== window) addEventListener('keydown', e => { if (['ArrowRight','ArrowLeft','PageDown','PageUp','Home','End',' '].includes(e.key)) { e.preventDefault(); parent.postMessage({ vello: 'key', key: e.key }, '*'); } });

