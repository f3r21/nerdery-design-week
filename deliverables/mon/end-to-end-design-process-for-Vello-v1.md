
---

### Phase 1: Discover
**Objective:** Uncover the behaviors, mental models, and trust expectations across Vello’s three personas within a strictly localized context.

* **Key Decisions (Vello Specific):**
  * **Hyperlocal Scope:** Focus research strictly on block-by-block dynamics rather than city-wide gig platforms.
  * **Three Roles:** Research all three roles in parallel—Requesters (seeking safety and speed), Providers (seeking fair local work), and Community Admins (managing neighborhood integrity).
  * **Trust Model:** Identify what specific signals create trust between neighbors (e.g., shared building reviews vs. anonymous star ratings).
* **Artifacts Produced:** User Personas (Requester, Provider, Community Admin), Empathy Maps, Discovery Insights Deck/Synthesis Report, Customer Journey Maps.
* **Pre-Design Engineer Contribution:** Audit third-party geo-location, mapping, and identity verification SDKs to establish boundary constraints, rate limits, and latency baselines before any UI exploration starts.
* **Design Decision Forcing a Data-Model/API Decision:** Deciding to show real-time walking distance (e.g., "6 min walk") on provider cards forces the API to compute spatial proximity dynamically via pedestrian routing matrix endpoints rather than a simple radial distance calculation (lat/long radius).

---

### Phase 2: Define
**Objective:** Transform research synthesis into crisp problem statements, functional boundaries, and product positioning for Vello v1.

* **Key Decisions (Vello Specific):**
  * **Hyperlocal Scope:** Establish explicit neighborhood boundary rules (e.g., strict Kestrel Park/Bay Ridge perimeters).
  * **Three Roles:** Define mandatory onboarding gating—specifically requiring Community Admin approval before a Provider listing appears publicly in the local feed.
  * **Trust Model:** Prioritize neighborhood-verified badges and building association ties over high-volume transactional metrics.
* **Artifacts Produced:** Problem Statements, Product Requirements Document (PRD), Value Proposition Canvas, Product Scope & Feature Matrix.
* **Pre-Design Engineer Contribution:** Review privacy and data-handling architecture around home addresses, establishing masking rules (e.g., showing block/street names until a booking is confirmed).
* **Design Decision Forcing a Data-Model/API Decision:** Deciding that a Provider cannot be surfaced in search or feed results without prior Community Admin approval forces a multi-state user verification schema (`pending_review`, `admin_approved`, `rejected`) in the backend database and user auth services.

---

### Phase 3: Architect
**Objective:** Structure the information architecture, user flows, and interaction logic across all three roles.

* **Key Decisions (Vello Specific):**
  * **Hyperlocal Scope:** Structure navigation so browsing trusted local providers by category and proximity happens prior to or alongside posting an open request.
  * **Three Roles:** Map three distinct, interconnected portals: Request & Book (Requester), Job Management & Pricing (Provider), and Verification Desk (Admin).
  * **Trust Model:** Embed neighbor verification badges, shared building tags, and community ratings directly into the primary navigation and card hierarchies.
* **Artifacts Produced:** Information Architecture (IA) Map, End-to-End User Flow Diagrams, Service Blueprint (linking Requester actions to Admin verification steps), Low-Fidelity Wireframes.
* **Pre-Design Engineer Contribution:** Map out the state machine for the booking lifecycle (e.g., `requested` → `provider_responded` → `booked` → `completed` → `rated`) to flag invalid transitions or concurrency edge cases before screens are drawn.
* **Design Decision Forcing a Data-Model/API Decision:** Deciding to show active response counters on open request cards (e.g., "3 neighbors responded") forces a relational schema linking local request objects to offer threads, alongside a real-time push notification/WebSocket event stream to update counts live.

---

### Phase 4: Design
**Objective:** Craft the visual system, UI components, and high-fidelity interactive screens for the app.

* **Key Decisions (Vello Specific):**
  * **Hyperlocal Scope & Brand:** Apply a warm, community-rooted aesthetic—Paper (`#F6F2E7`), Forest (`#16462F`), Olive (`#557E26`), and Persimmon (`#F0623B`) paired with Bricolage Grotesque, Hanken Grotesk, and JetBrains Mono.
  * **Three Roles:** Design dedicated component sets, including the signature `ProviderCard` for Requesters and the queue-based Admin Verification Desk for Admins.
  * **Trust Model:** Establish a strict visual hierarchy for trust elements (`VerifiedBadge`, `Rating`, walk-time chips) so safety cues are instantly scannable.
* **Artifacts Produced:** Vello Design System (Tokens, Primitives, UI Components), High-Fidelity UI Screen Kits, Interactive Application Prototype, Micro-interaction Specs.
* **Pre-Design Engineer Contribution:** Co-create the design token structure and component props in code (mapping colors, typography scales, and spacing rhythms to CSS/Tailwind variables) so design primitives match 1:1 between Figma and the codebase.
* **Design Decision Forcing a Data-Model/API Decision:** Designing a `ProviderCard` that displays composite summary data—starting rates ("from \$24 / walk"), walking time ("6 min walk"), rating ("4.9"), and service tags—forces the backend API to return aggregated pricing and provider metadata in a single response payload to avoid client-side N+1 query overhead.

---

### Phase 5: Validate & Hand Off
**Objective:** Test the end-to-end experience with real neighborhood users, iterate on friction points, and deliver production-ready specs to engineering.

* **Key Decisions (Vello Specific):**
  * **Hyperlocal Scope:** Validate whether users intuitively understand neighborhood boundary limits when booking or posting.
  * **Three Roles:** Ensure cross-role usability by testing task completion across Requesters, Providers, and Admins.
  * **Trust Model:** Measure whether local verification badges and neighbor reviews provide sufficient confidence for users to book a provider.
* **Artifacts Produced:** Usability Testing Report & Recommendations, Dev Mode Handoff Specs, QA Edge-Case & State Matrix, Component Documentation.
* **Pre-Design Engineer Contribution:** Establish telemetry/analytics event schemas and define application performance budget targets (e.g., initial feed render under 200ms) prior to final prototype validation.
* **Design Decision Forcing a Data-Model/API Decision:** The UX decision to support offline access and optimistic UI updates for active bookings and messaging forces the engineering team to implement local storage persistence (IndexedDB/SQLite) and a background queue synchronization strategy.

---
