### Challenging the End-to-End Design Process

Standard agency frameworks map design as a structured, five-phase sequence moving through **Discover, Define, Architect, Design, and Validate & Hand off**. While this linear progression provides client clarity, it breaks down when applied blindly to complex products.

#### Challenge 1: The Three-Role Ecosystem Breaks Linear Phase Gates
Standard process models assume user research and architecture can be validated persona by persona in sequential stages. For Vello v1, this is a flaw. Vello relies on three interdependent roles: Requesters, Providers, and Community Admins. A Requester cannot complete a booking flow unless a Provider is available, and a Provider cannot even appear in search results until a Community Admin approves them.

Validating wireframes for a Requester in Phase 3 without running the Admin verification desk simultaneously creates false positives. The team must prototype and test multi-party interactions across all three roles early, forcing feedback loops between testing and problem re-definition.

#### Challenge 2: Deferring Technical Constraints to "Architect" Harms Core UX
Traditional agency workflows bring engineers in as downstream reviewers during the Architect phase to flag technical limits. For Vello, this creates massive rework. Core product decisions—such as restricting discovery to walking-distance neighborhoods—directly drive UX patterns (browsing neighbors before posting) and UI components (showing a `"6 min walk"` chip).

These UI elements rely directly on underlying dynamic spatial queries, pedestrian routing APIs, and address masking logic. Deferring engineering co-creation to Phase 3 risks designing visually polished interactions on top of unfeasible technical or latency assumptions. Technical feasibility must be co-designed from initial discovery.

---

### Where the Process is Generic

* **Structural Framework:** The macro sequencing relies on industry-standard 5-phase agency models or the 6-step Design Thinking framework (**Empathize, Define, Ideate, Prototype, Test, Implement**).
* **Standard Artifacts:** Deliverables such as user personas, empathy maps, wireframes, component libraries, and handoff specs follow standard design practices.
* **Cross-Functional Roles:** The division of responsibilities remains standard: product designers connect business goals with user needs, PMs sharpen requirements, QA flags edge cases, and engineers implement design tokens and components.

---

### Where Vello’s DNA Fundamentally Changes the Process

#### 1. Hyperlocal Scope
* **Cascading Design Hierarchy:** Product decisions to restrict scope to walking-distance neighborhoods directly dictate UX decisions (browsing local providers before posting) and UI details (displaying a `"6 min walk"` data chip in JetBrains Mono).
* **Bounded Research:** Discovery research cannot use broad demographic surveys; it requires location-bounded qualitative interviews and contextual mapping of micro-neighborhood boundaries.

#### 2. Three-Role Ecosystem
* **Service Blueprinting:** Information architecture cannot focus on a single user app; it requires a service blueprint mapping the interplay between Requester, Provider, and Community Admin.
* **Multi-Portal UI:** Design must deliver three distinct interface flows, including a dedicated **Admin Verification Desk** to process local provider applications.

#### 3. Trust-Based Nature
* **Rethinking Reputation UI:** Instead of relying on global star ratings, UI components like `ProviderCard` must highlight neighborhood-scoped verification badges, shared building tags, and repeat local bookings.
* **Progressive Address Disclosure:** UX flows must balance safety with privacy, masking exact home addresses to general neighborhood blocks until a booking is explicitly confirmed.
* **Warm Brand Identity:** Visual design moves away from cold marketplace aesthetics toward a warm, community-rooted palette using Paper (`#F6F2E7`), Forest (`#16462F`), Olive (`#557E26`), and Persimmon (`#F0623B`) paired with Bricolage Grotesque and Hanken Grotesk.

---
