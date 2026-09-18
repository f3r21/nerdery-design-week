> Superseded. See `post-a-request-flow.html`, "Earlier drafts vs source".


---

### Unhappy Path Stress-Test Analysis

1. **What if the provider never responds? (Timeout / Expiry Path)**
   * **System State**: Transitions from `OPEN` to `EXPIRED` after a threshold (e.g., 24 hours) **[ASSUMPTION]**.
   * **UX Behavior**: While active with 0 responses, the Request View displays an animated waiting state (*"Looking for local neighbors..."*). Upon expiration, the open request card updates with an **Expired** badge and provides three explicit recovery actions: **[Repost Request]**, **[Edit Request / Broaden Scope]**, or **[Cancel Request]** **[ASSUMPTION]**.

2. **Where can the requester cancel? (Cancellation Path)**
   * **UX Access Points**:
     * **Home Screen**: Overflow menu option on the *"Your open request"* active request card **[ASSUMPTION]**.
     * **Request View Screen**: A prominent **[Cancel Request]** action button at the bottom of the screen or header overflow **[ASSUMPTION]**.
   * **State Rules**: Cancellation is allowed while status is `OPEN` (0 or N pending quotes). If a provider quote has already been accepted and paid, the system blocks simple cancellation (`HTTP 409 Conflict`) and redirects the user to the Booking Cancellation & Refund/Dispute flow **[ASSUMPTION]**.

3. **What does the admin see if verification fails? (Admin Verification Edge Case)**
   * **Admin Desk View**: The Admin Desk queue displays candidate provider profiles and submitted credentials. When the admin taps **"Reject / Fail Verification"**, a modal prompts for a rejection reason (e.g., *"Address outside neighborhood boundary"*, *"Unverifiable identification"*) **[ASSUMPTION]**.
   * **Backend & Provider Impact**: `POST /api/v1/admin/providers/{id}/verify` returns `200 OK` with status `REJECTED` **[ASSUMPTION]**. If the rejected or unverified provider attempts to view or respond to open requests, the API returns `403 Forbidden`, triggering a blocked state UI screen: *"Verification required before responding to local requests"* **[ASSUMPTION]**.

---

### 1. Revised User Flowchart (Including Unhappy & Edge Paths)

```text
[ START: Home Screen / Bottom Navigation ]
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ GET /api/v1/requests/active [ASSUMPTION]      │
└─────────────────────────────────────────────────────┘
         │                       │                     │
  (System State:           (System State:       (System State:
   Loading)                 Empty)               Active Request)
         │                       │                     │
         ▼                       ▼                     ▼
┌──────────────────┐    ┌─────────────────┐   ┌─────────────────────────┐
│ Render Skeleton  │    │ Render Default  │   │ Display "Your open      │
│ Loader Card│    │ Home Screen &   │   │ request" card with      │
└──────────────────┘    │ "New Request"   │   │ response counter  │
                        │ CTA [ASSUMPTION]│   └─────────────────────────┘
                        └─────────────────┘                │
                                 │                         ├─── [User Taps "Cancel Request"] ──┐
                                 ▼                         │                                   │
                    [ User Taps "New Request" ]            │                                   │
                                 │                         │                                   │
                                 ▼                         │                                   │
                    ┌─────────────────────────┐            │                                   │
                    │ New Request Screen      │            │                                   │
                    │ (Form View)             │            │                                   │
                    └─────────────────────────┘            │                                   │
                                 │                         │                                   │
                                 ▼                         │                                   │
                    [ User Fills Form & Taps  ]            │                                   │
                    [ "Submit" ]                           │                                   │
                                 │                         │                                   │
                        (Client Validation)                │                                   │
                        /                 \                │                                   │
           (Validation Fails)          (Validation Passes) │                                   │
                  │                             │          │                                   │
                  ▼                             ▼          │                                   │
        ┌───────────────────┐      ┌─────────────────────┐ │                                   │
        │ Highlight Invalid │      │ POST /api/v1/requests│ │                                   │
        │ Fields inline     │      └─────────────────────┘ │                                   │
        └───────────────────┘                 │            │                                   │
                                              │            │                                   │
             ┌────────────────────────────────┼────────────┴─────────────────┐                 │
             │                                │                              │                 │
      (API Error: 500)                 (API Error: 403)               (API Success: 201)       │
             │                                │                              │                 │
             ▼                                ▼                              ▼                 │
┌───────────────────────────┐   ┌───────────────────────────┐   ┌───────────────────────────┐  │
│ Banner: "Failed to submit.│   │ Modal: "Address outside   │   │ Navigate to Request View  │  │
│ Try again." [ASSUMPTION]  │   │ neighborhood scope" │   │ Screen [ASSUMPTION]       │  │
└───────────────────────────┘   └───────────────────────────┘   └───────────────────────────┘  │
                                                                               │               │
                                                                               ▼               │
                                                                ┌───────────────────────────┐  │
                                                                │ GET /api/v1/requests/{id} │  │
                                                                └───────────────────────────┘  │
                                                                       │       │        │      │
                                         ┌─────────────────────────────┤       │        └──────┤
                                         │                             │       │               │
                                 (0 Responses &                (N Responses)   │               │
                                  Within Time Limit)                   │       │               │
                                         │                             ▼       │               │
                                         ▼                       ┌───────────┐ │               │
                                  ┌──────────────┐               │ Display   │ │               │
                                  │ Display      │               │ Provider  │ │               │
                                  │ "Looking for │               │ Cards     │ │               │
                                  │ neighbors..."│               │     │ │               │
                                  └──────────────┘               └───────────┘ │               │
                                         │                             │       │               │
                                         │ (Timer Expires: 24h)        │       │               │
                                         ▼                             │       │               │
                                  ┌──────────────┐                     │       │               │
                                  │ State:       │                     │       │               │
                                  │ EXPIRED      │                     │       │               │
                                  │ Options:     │                     │       │               │
                                  │ Repost / Edit│                     │       │               │
                                  │ / Cancel     │                     │       │               │
                                  └──────────────┘                     │       │               │
                                         │                             │       │               │
                                         └─────────────────────────────┼───────┼───────────────┘
                                                                       │       │
                                                   [ User Taps "Cancel Request" ]
                                                                       │
                                                               (Check Request Status)
                                                               /                   \
                                                     (Status == OPEN)            (Provider Booked)
                                                            │                            │
                                                            ▼                            ▼
                                                ┌──────────────────────┐    ┌─────────────────────────┐
                                                │ DELETE /requests/{id}│    │ HTTP 409 Conflict       │
                                                │ HTTP 200 OK          │    │ "Booking in progress.   │
                                                │ Request CANCELLED    │    │ Go to Cancellation Flow"│
                                                └──────────────────────┘    └─────────────────────────┘
```

---

### 2. Revised State Table (State \\(\rightarrow\\) Trigger \\(\rightarrow\\) API Status \\(\rightarrow\\) UI)

| Current System State | Trigger / Action | API Endpoint & Status | UI Response / Rendered View State |
| :--- | :--- | :--- | :--- |
| **Idle / Unloaded** | App launch / Home navigation | `GET /api/v1/requests/active`<br>**HTTP 200 (Loading)** | Skeleton loader for active request card **[ASSUMPTION]**. |
| **Empty (Home)** | Fetch returns 0 active requests | `GET /api/v1/requests/active`<br>**HTTP 200 OK (`[]`)** | Hides active request card; displays general search & service categories. |
| **Active Request (Home)** | Fetch returns active request | `GET /api/v1/requests/active`<br>**HTTP 200 OK (Data)** | Renders *"Your open request"* card with title & response count. |
| **Form Editing** | Requester fills form fields | *None (Client)* | Inputs update dynamically; CTA enabled **[ASSUMPTION]**. |
| **Validation Failure** | Taps "Submit" with missing required fields | *None (Client)* | Blocks submit call; displays red inline helper messages **[ASSUMPTION]**. |
| **Submitting (In-Flight)** | Valid form submit | `POST /api/v1/requests`<br>**HTTP Pending** | Locks form; button transitions to loading spinner state **[ASSUMPTION]**. |
| **Scope Forbidden** | Location outside neighborhood boundary | `POST /api/v1/requests`<br>**HTTP 403 Forbidden** | Modal: *"Address outside local neighborhood scope"* **[ASSUMPTION]**. |
| **Server Failure** | Network timeout / 500 error | `POST /api/v1/requests`<br>**HTTP 500** | Stays on form screen; banner *"Failed to submit request. Try again."* **[ASSUMPTION]**. |
| **Request Created** | API accepts request | `POST /api/v1/requests`<br>**HTTP 201 Created** | Navigates immediately to **Request View** screen. |
| **Waiting (0 Responses)** | Request open, timer active | `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (0 items)** | Animated empty state: *"Looking for local neighbors..."* **[ASSUMPTION]**. |
| **No Response Timeout** | 24 hours elapse with 0 responses **[ASSUMPTION]** | `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (`status: EXPIRED`)** | Banner: *"No providers responded in time."* Action CTAs: **[Repost]**, **[Edit Radius]**, **[Cancel]** **[ASSUMPTION]**. |
| **Responses Received** | Providers send quotes | `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (N items)** | Renders list of candidate `ProviderCard` components with rates and walk distance. |
| **Cancellation (Open)** | Requester taps "Cancel Request" while status is `OPEN` | `DELETE /api/v1/requests/{id}`<br>**HTTP 200 OK** | Status set to `CANCELLED`; toast confirmation and redirect to Home **[ASSUMPTION]**. |
| **Cancellation (Conflict)** | Requester cancels after provider is booked | `DELETE /api/v1/requests/{id}`<br>**HTTP 409 Conflict** | Modal alert: *"Booking in progress. Cancellation must go through refund/dispute flow."* **[ASSUMPTION]**. |
| **Admin Verification Review** | Admin opens desk verification queue | `GET /api/v1/admin/providers/pending`<br>**HTTP 200 OK** | Displays pending provider profiles & submitted credentials. |
| **Admin Verification Failure** | Admin rejects provider profile | `POST /api/v1/admin/providers/{id}/verify`<br>**HTTP 200 OK (`status: REJECTED`)** | Admin UI shows confirmation toast; profile removed from desk queue **[ASSUMPTION]**. |
| **Provider Blocked (Unverified/Failed)** | Rejected/unverified provider tries to respond | `POST /api/v1/requests/{id}/responses`<br>**HTTP 403 Forbidden** | Screen state: *"Verification required before responding to local requests."* **[ASSUMPTION]**. |

---

### 3. Revised Endpoint List with Associated States

1. `GET /api/v1/requests/active`
   * **Loading**: Returns pending promise; UI renders skeleton card **[ASSUMPTION]**.
   * **Success (200 OK - Active)**: Returns open request summary object (title, response count).
   * **Success (200 OK - Empty)**: Returns empty array; UI suppresses active request banner.

2. `POST /api/v1/requests`
   * **Loading**: Pending request; UI locks submit button **[ASSUMPTION]**.
   * **Created (201 Created)**: Returns `request_id`; UI redirects to Request View.
   * **Bad Request (400 Bad Request)**: Returns field validation errors; UI highlights inputs **[ASSUMPTION]**.
   * **Forbidden (403 Forbidden)**: Location outside neighborhood boundary; UI displays scope modal **[ASSUMPTION]**.
   * **Server Error (500 Error)**: Server failure; UI displays retry toast **[ASSUMPTION]**.

3. `GET /api/v1/requests/{request_id}`
   * **Success (200 OK - OPEN, 0 Responses)**: Returns request details; UI renders waiting animation **[ASSUMPTION]**.
   * **Success (200 OK - OPEN, N Responses)**: Returns candidate array; UI renders `ProviderCard` items.
   * **Success (200 OK - EXPIRED)**: Returns request with `EXPIRED` status; UI displays timeout banner with **[Repost]**, **[Edit]**, and **[Cancel]** CTAs **[ASSUMPTION]**.
   * **Not Found (404 Not Found)**: Request deleted/invalid; UI alerts user and returns to Home **[ASSUMPTION]**.

4. `DELETE /api/v1/requests/{request_id}`
   * **Success (200 OK)**: Status updated to `CANCELLED`; UI confirms and returns to Home **[ASSUMPTION]**.
   * **Conflict (409 Conflict)**: Booking is already active/paid; UI redirects to booking cancellation/dispute flow **[ASSUMPTION]**.

5. `POST /api/v1/admin/providers/{provider_id}/verify` **[ASSUMPTION]**
   * **Success (200 OK - Verified)**: Status set to `VERIFIED`; provider listed on marketplace.
   * **Success (200 OK - Rejected)**: Status set to `REJECTED`; provider removed from verification queue **[ASSUMPTION]**.

6. `POST /api/v1/requests/{request_id}/responses` *(Provider side)* **[ASSUMPTION]**
   * **Forbidden (403 Forbidden)**: Triggered when unverified or rejected provider attempts to submit a response; UI displays verification required screen **[ASSUMPTION]**.

---
