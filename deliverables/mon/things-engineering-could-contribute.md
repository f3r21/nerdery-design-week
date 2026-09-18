Five phases: the engineering contribution before or during design, and the data-model or API decision each Vello design decision forces.

---

### Phase 1: Discover
* **Engineering Contribution:** **Audit third-party spatial and identity SDKs.** Before design explores local discovery mechanisms, engineering audits geolocation accuracy, reverse geocoding limits, mapping APIs, and verification SDK costs/latency. This establishes technical boundaries for how precise "walking distance" calculations can be in real time.
* **Design Decision → Data-Model/API Implication:** Deciding to anchor provider discovery on dynamic walking-time proximity (e.g., displaying a `"6 min walk"` chip on the provider listing) **forces an API decision**. The backend cannot rely on standard radial latitude/longitude bounding-box queries; it must integrate a pedestrian routing engine / distance-matrix endpoint to return live walking durations based on local street networks.

---

### Phase 2: Define
* **Engineering Contribution:** **Establish security, privacy, and address-masking boundaries.** Before UX flows are drawn, engineering defines privacy constraints for sensitive location data. They establish rules for obfuscating exact home addresses (e.g., exposing only neighborhood blocks on public cards) until a booking is confirmed by both parties.
* **Design Decision → Data-Model/API Implication:** Deciding that a Provider cannot appear in public local feeds or search results until approved by a Community Admin **forces a Data-Model decision**. The user database schema must maintain an explicit verification state enum (`pending_admin_review`, `verified`, `rejected`), and all public feed API queries must enforce a strict server-side filter on `verification_status == verified`.

---

### Phase 3: Architect
* **Engineering Contribution:** **Map state machine logic and lifecycle transitions.** As design structures the information architecture across all three roles, engineering flags technical constraints and defines the complete booking state machine (`requested` → `offered` → `booked` → `completed` → `rated`), catching concurrency edge cases (e.g., two Providers accepting the same open request simultaneously).
* **Design Decision → Data-Model/API Implication:** Deciding to display active response counters on open request cards (e.g., `"3 neighbors responded"`) **forces a Data-Model and API decision**. Because the data model supports what information architecture implies, this requires a relational schema linking open requests to offer threads, backed by a real-time event stream (WebSockets/SSE) to push counter updates live to the Requester’s home feed.

---

### Phase 4: Design
* **Engineering Contribution:** **Co-create code-aligned design tokens and component props.** Before high-fidelity UI components are built, engineering and design establish matching design tokens (mapping color hexes like Forest `#16462F` and Olive `#557E26`, or JetBrains Mono for data displays) and component API props in code (e.g., React/Tailwind props) so Figma primitives match code 1:1.
* **Design Decision → Data-Model/API Implication:** Deciding that the signature `ProviderCard` must surface summary metrics—starting rate (`"from $24 / walk"`), walking distance (`"6 min walk"`), rating (`"4.9"`), service tags, and neighborhood verification badges—**forces an API payload decision**. To avoid client-side N+1 query overhead, the API must provide an aggregated DTO endpoint that joins provider profiles, dynamic proximity computations, rating averages, and verification statuses into a single response payload.

---

### Phase 5: Validate & Hand Off
* **Engineering Contribution:** **Define non-functional performance budgets and telemetry schemas.** During prototype validation and final handoff, engineering sets non-functional specs—such as initial feed load time under 200ms and analytics tracking event schemas for key conversion steps across all three roles.
* **Design Decision → Data-Model/API Implication:** Deciding to support optimistic UI updates and offline state retention for active bookings and neighborhood messaging **forces a Data-Model decision**. Engineering must implement local client-side database persistence (e.g., IndexedDB or SQLite) alongside a background synchronization queue with conflict-resolution logic for offline payload sync.

---

## Practice 1.3 · phase → contribution → failure mode


| Phase | Engineering contribution | Failure mode to avoid |
|---|---|---|
| Discover | Audit the spatial and identity SDKs before design picks a discovery model | Declaring "walking minutes is impossible" before checking; the API decides the product |
| Define | Set the privacy and address-masking boundaries early | Turning a privacy boundary into a feature veto ("no location at all") |
| Architect | Map the state machine and lifecycle transitions with design | Writing the state table alone and handing design a contract it never saw |
| Design | Co-create tokens and component props | Hardcoding values that look right today and drift from the system tomorrow (Friday v1: 10 drift rows) |
| Validate & hand off | Define performance budgets and telemetry schemas | Treating "it renders" as done without the side-by-side against the reference |
