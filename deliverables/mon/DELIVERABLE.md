# Design's Role on Vello — and Where Engineering Plugs In

Files behind this page: [`challenge.md`](challenge.md) (the two pushbacks, verbatim) · [`end-to-end-design-process-for-Vello-v1.md`](end-to-end-design-process-for-Vello-v1.md) (Claude's first map of the process) · [`things-engineering-could-contribute.md`](things-engineering-could-contribute.md) (phase → contribution → data-model implication → failure mode).

### 1. What Design Owns at Ravn
Design owns the strategic questions that have no single technically correct answer. On Vello, this spans three core areas:
* **The problem, not just the request:** Reframing a client request for a generic "booking app" into solving the underlying human problem of deciding whether to trust a neighbor two buildings away.
* **The trust model as a felt experience:** Replacing global star ratings with neighborhood-scoped verification, determining which specific signals a Requester reads in the first two seconds before booking.
* **Coherence across three roles:** Maintaining a unified product promise across three distinct user surfaces (**Requester**, **Provider**, and **Community Admin**), rather than designing three disconnected portals.

**Ownership Boundaries:** Design does not own technical feasibility, data schemas, or latency. It owns the strategic justification for why a technical constraint is worth paying for—making that argument early in engineering terms.

---

### 2. What Engineering Contributes Across the Lifecycle
Engineering delivers its highest value before design commits, serving as the partner that prices decisions while they remain cheap to modify.

| Lifecycle Phase | Engineering Contribution (Pre-Commitment) | UX Risk Mitigated |
| :--- | :--- | :--- |
| **Discover** | Audit geo-location, routing, and identity SDKs for accuracy, rate limits, cost, and latency. | Defines how precise "walking distance" calculations can honestly be in real time. |
| **Define** | Establish privacy rules and address-masking boundaries for home locations. | Determines what portion of a home address a public card may safely display. |
| **Architect** | Map the booking state machine and handle concurrency edge cases. | Prevents race conditions when two Providers accept the same open request simultaneously. |
| **Design** | Co-create code-aligned design tokens and component props 1:1 with Figma. | Ensures components like `ProviderCard` are buildable as drawn without client-side N+1 overhead. |
| **Validate & Hand off** | Set telemetry schemas and non-functional performance budgets (e.g., feed render under 200ms). | Guarantees the primary feed remains scannable under live production data loads. |

---

### 3. Two Documented Pushbacks Against Claude's Linear Model

#### **Pushback 1: Three Interdependent Roles Break Linear Phase Gates**
* **The Critique:** Traditional linear phase gates assume a single user persona moving sequentially through Discover, Define, Architect, Design, and Validate.
* **The Vello Context:** A Requester cannot complete a booking without an available Provider, and a Provider cannot appear in local search results without prior approval from a Community Admin. Wireframing a single role in isolation creates **false positives** by assuming supply and approval exist.
* **Practical Shift:** All three roles must be prototyped and tested together starting in the **Architect** phase, running the Admin verification desk as an active part of the Requester usability test.

#### **Pushback 2: Technical Constraints Cannot Wait for the Architect Phase**
* **The Critique:** Standard agency workflows bring engineering in during Phase 3 (*Architect*) to review wireframes and flag technical limits.
* **The Vello Context:** Core UX patterns—such as walking-distance discovery, masked addresses, and real-time proximity chips—depend directly on spatial queries, pedestrian routing APIs, and privacy logic. Deferring technical reviews to Phase 3 leads to expensive rework after polishing unfeasible assumptions.
* **Practical Shift:** An engineer must participate directly during **Discover**, auditing SDK limits and feasibility in the exact same week that user interviews take place.

---

### 4. The Reframe: "6 min walk" as a System Decision
* **Visual Component:** A UI chip on `ProviderCard` reading `"6 min walk"` appears to be simple microcopy.
* **Systemic Impact:** Displaying a routed walking time commits the product to a **backend pedestrian routing engine**. A standard radial distance query (latitude/longitude radius) cannot compute it, as a location 400 meters away across a railway line is not a 6-minute walk.
* **Architectural Implications:**
  * Introduces per-request API costs, third-party service dependencies, and caching strategies.
  * Mandates explicit **graceful degradation fallback states** when routing fails or location permissions are denied.
  * Defines neighborhood boundaries by actual street networks rather than arbitrary circles on a map.

---

### 5. Strategic Conclusion for Friday's Demo
The boundary between design and engineering on Vello is not a handoff milestone on a project timeline; **it is a line that cuts through every individual product decision**, where small visual elements encode fundamental system architecture.

---

## Where I corrected Claude

| Claim | What was wrong | How verified |
|---|---|---|
| Engineering enters at *Architect* to review wireframes | Vello's core UX (walking-distance scope, "6 min walk", masked addresses) depends on routing, spatial queries and privacy rules; reviewing at phase 3 means reworking polished flows | Brief: walking-distance scope and the "6 min walk" chip; a radial lat/long query cannot produce a routed walking time. Pushback 2 above |
| Phases validate one persona at a time through linear gates | A Requester cannot book without a Provider; a Provider is invisible until an Admin approves them. Single-role validation gives false positives | Brief, core flow 4: "Admin verifies new providers before they appear". Pushback 1 above |

