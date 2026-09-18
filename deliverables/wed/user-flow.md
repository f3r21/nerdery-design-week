> Superseded. See `post-a-request-flow.html`, "Earlier drafts vs source".


---

### 1. User Flow Flowchart: Post a Need / Request

```text
[ START: Home Screen / Bottom Navigation ]
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ GET /api/v1/requests/active [ASSUMPTION]            │
└─────────────────────────────────────────────────────┘
         │                       │                     │
  (System State:           (System State:       (System State:
   Loading)                 Empty)               Active Request)
         │                       │                     │
         ▼                       ▼                     ▼
┌──────────────────┐    ┌─────────────────┐   ┌─────────────────────────┐
│ Render Skeleton  │    │ Render Default  │   │ Display "Your open      │
│ Loader Card      │    │ Home Screen &   │   │ request" card with      │
│ [ASSUMPTION]     │    │ "New Request"   │   │ response counter  │
└──────────────────┘    │ CTA [ASSUMPTION]│   └─────────────────────────┘
                        └─────────────────┘                │
                                 │                         │
                                 ▼                         │
                    [ User Taps "New Request" ]            │
                    [ Screen / Tab ]                 │
                                 │                         │
                                 ▼                         │
                    ┌─────────────────────────┐            │
                    │ New Request Screen      │            │
                    │ (Form View)       │            │
                    └─────────────────────────┘            │
                                 │                         │
                                 ▼                         │
                    [ User Fills Form:        ]            │
                    [ Category, Title,        ]            │
                    [ Description, Schedule,  ]            │
                    [ Budget/Radius ] [ASSUMPTION]         │
                                 │                         │
                                 ▼                         │
                    [ User Taps "Submit" ]                 │
                                 │                         │
                         (Client Decision)                 │
                        /                 \                │
           (Validation Fails)          (Validation Passes) │
                  │                             │          │
                  ▼                             ▼          │
        ┌───────────────────┐      ┌─────────────────────┐ │
        │ Highlight Invalid │      │ POST /api/v1/requests│ │
        │ Fields inline     │      │ [ASSUMPTION]        │ │
        │ [ASSUMPTION]      │      └─────────────────────┘ │
        └───────────────────┘                 │            │
                                              │            │
             ┌────────────────────────────────┼──────────────────────────────┐
             │                                │                              │
      (System State:                   (System State:                 (System State:
       API Error - 400/500)             API Error - 403)               API Success - 201)
             │                                │                              │
             ▼                                ▼                              ▼
┌───────────────────────────┐   ┌───────────────────────────┐   ┌───────────────────────────┐
│ Toast / Inline Banner:    │   │ Modal Alert:              │   │ Navigate to Request View  │
│ "Failed to submit request.│   │ "Address outside local    │   │ Screen         │
│ Try again." [ASSUMPTION]  │   │ neighborhood scope" │   └───────────────────────────┘
└───────────────────────────┘   │ [ASSUMPTION]              │                 │
                                └───────────────────────────┘                 │
                                                                              ▼
                                                                ┌───────────────────────────┐
                                                                │ GET /api/v1/requests/{id} │
                                                                │ [ASSUMPTION]              │
                                                                └───────────────────────────┘
                                                                       │             │
                                                                (System State:  (System State:
                                                                 Empty / 0      Partial / N
                                                                 Responses)     Responses)
                                                                       │             │
                                                                       ▼             ▼
                                                                ┌──────────────┐ ┌───────────┐
                                                                │ Display      │ │ Display   │
                                                                │ "Looking for │ │ Provider  │
                                                                │ neighbors..."│ │ Response  │
                                                                │ animated     │ │ Cards     │
                                                                │ empty state  │ │     │
                                                                │ [ASSUMPTION] │ └───────────┘
                                                                └──────────────┘
```

---

### 2. State Table (State \\(\rightarrow\\) Trigger \\(\rightarrow\\) API Status \\(\rightarrow\\) UI)

| Current System State | Trigger / User Action | API Endpoint & Status | UI Response / Rendered View State |
| :--- | :--- | :--- | :--- |
| **Idle / Unloaded** | User opens app home screen | `GET /api/v1/requests/active`<br>**HTTP 200 (Loading)** | Displays skeleton loader elements for active request card **[ASSUMPTION]**. |
| **Empty (Home)** | App load completes with 0 active requests | `GET /api/v1/requests/active`<br>**HTTP 200 OK (Empty Body)** | Hides "Your open request" banner; shows general service categories and "New Request" CTA. |
| **Active / Partial (Home)** | App load completes with an existing request | `GET /api/v1/requests/active`<br>**HTTP 200 OK (Data Present)** | Renders "Your open request" card displaying request title and response count (e.g., "3 neighbors responded"). |
| **Form Editing** | User selects category and fills out fields | *None (Client-side)* | Form inputs update dynamically; CTA remains active **[ASSUMPTION]**. |
| **Client Validation Failure** | User taps "Submit" with empty required fields | *None (Client-side)* | Blocks API call; highlights invalid fields in red with helper text **[ASSUMPTION]**. |
| **Submitting (In-Flight)** | User taps "Submit" with valid form | `POST /api/v1/requests`<br>**HTTP Pending (Loading)** | Disables form inputs; changes Submit button to loading spinner state **[ASSUMPTION]**. |
| **Submission Error (Server)** | API call fails due to network or server failure | `POST /api/v1/requests`<br>**HTTP 500 / Timeout** | Keeps user on form screen; displays error toast "Connection lost. Tap to retry." **[ASSUMPTION]**. |
| **Submission Error (Scope)** | User location is outside allowed neighborhood boundary | `POST /api/v1/requests`<br>**HTTP 403 Forbidden** | Displays modal: "Vello only operates within local neighborhood boundaries." **[ASSUMPTION]**. |
| **Success (Created)** | API accepts and persists new request | `POST /api/v1/requests`<br>**HTTP 201 Created** | Navigates immediately to **Request View** screen. |
| **Request View (Empty)** | Request view screen opens before any provider responds | `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (0 Responses)** | Displays **EmptyState** component with messaging: "Request posted! Waiting for local neighbors to respond..." **[ASSUMPTION]**. |
| **Request View (Partial)** | Providers submit availability/pricing | WebSocket / Polling updates `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (N Responses)** | Renders list of **ProviderCard** components showing pricing, walk distance, and rating. |

---

### 3. List of Endpoints & Associated System States

#### 1. `GET /api/v1/requests/active` **[ASSUMPTION]**
* **Description**: Fetches the current requester's active open request for the home screen banner.
* **System States**:
  * **Loading**: Returns pending promise; UI displays skeleton card **[ASSUMPTION]**.
  * **Success (200 OK - Active)**: Returns active request object (title, category, response count).
  * **Success (200 OK - Empty)**: Returns `null` or empty array; UI suppresses active request card **[ASSUMPTION]**.
  * **Error (500 Internal Error)**: Home screen defaults to general browsing view without active card **[ASSUMPTION]**.

#### 2. `POST /api/v1/requests` **[ASSUMPTION]**
* **Description**: Creates and publishes a new service request to nearby verified providers.
* **System States**:
  * **Loading**: Pending request; UI locks form submit button **[ASSUMPTION]**.
  * **Created (201 Created)**: Returns created `request_id`, timestamp, and initial status (`OPEN`); UI redirects to Request View.
  * **Bad Request (400 Bad Request)**: Returns field-specific validation errors; UI highlights erroneous input fields **[ASSUMPTION]**.
  * **Forbidden (403 Forbidden)**: Triggered when requester address is outside supported hyperlocal neighborhood boundaries; UI displays scope restriction modal **[ASSUMPTION]**.
  * **Server/Network Error (500 Error / Timeout)**: Returns error payload; UI displays retry banner **[ASSUMPTION]**.

#### 3. `GET /api/v1/requests/{request_id}` **[ASSUMPTION]**
* **Description**: Retrieves full details and provider responses for a specific request screen.
* **System States**:
  * **Loading**: Initial screen open; UI shows skeleton layout for request header and provider list **[ASSUMPTION]**.
  * **Success (200 OK - Empty State)**: `responses: []`; UI displays waiting animation and empty state **[ASSUMPTION]**.
  * **Success (200 OK - Partial State)**: `responses: [ProviderResponse, ...]`; UI displays candidate list using `ProviderCard` components.
  * **Not Found (404 Not Found)**: Request was deleted or canceled; UI shows alert and redirects to Home Screen **[ASSUMPTION]**.

#### 4. `DELETE /api/v1/requests/{request_id}` **[ASSUMPTION]**
* **Description**: Allows a requester to cancel an open request before a provider is booked **[ASSUMPTION]**.
* **System States**:
  * **Loading**: Cancellation request pending **[ASSUMPTION]**.
  * **Success (200 OK)**: Request status updated to `CANCELLED`; UI updates view and redirects to Home **[ASSUMPTION]**.
  * **Conflict (409 Conflict)**: Request cannot be canceled because a booking is already confirmed/paid; UI displays error modal **[ASSUMPTION]**.

---
