> Superseded. See `post-a-request-flow.html`, "Earlier drafts vs source".

### 1. State Table per Screen

To ensure full coverage of the **Post a Need / Request** flow, each screen is broken down across all essential system states (loading, empty, partial, success, error, permission-denied, timeout, and cancellation):

#### Screen 1: Home Screen (`/home`)
| System State | Trigger / User Action | API Endpoint & Status | UI Response & Rendered View |
| :--- | :--- | :--- | :--- |
| **Loading** | App launches or user navigates to Home | `GET /api/v1/requests/active`<br>**HTTP Pending** | Renders skeleton loader card for active request section. |
| **Empty** | Response returns 0 active requests | `GET /api/v1/requests/active`<br>**HTTP 200 OK (`[]`)** | Hides *"Your open request"* banner; displays service categories and primary *"New Request"* CTA. |
| **Active / Partial** | Response returns an open request | `GET /api/v1/requests/active`<br>**HTTP 200 OK (Data)** | Displays *"Your open request"* card with request title and response counter (e.g., *"3 neighbors responded"*). |
| **Error** | Network dropped or server offline | `GET /api/v1/requests/active`<br>**HTTP 500 / Offline** | Hides active card section gracefully; shows offline toast banner. |

---

#### Screen 2: New Request Form (`/requests/new`)
| System State | Trigger / User Action | API Endpoint & Status | UI Response & Rendered View |
| :--- | :--- | :--- | :--- |
| **Initial / Empty** | User taps *"New Request"* CTA | *None (Client)* | Renders empty form fields (Category, Title, Description, Schedule, Budget/Radius). |
| **Editing** | User enters data into form fields | *None (Client)* | Form inputs update dynamically; CTA remains active. |
| **Validation Error** | User taps *"Submit"* with missing fields | *None (Client)* | Blocks API call; highlights required fields in red with helper text. |
| **Submitting** | User submits valid form | `POST /api/v1/requests`<br>**HTTP Pending** | Disables form inputs; transitions button to loading spinner state. |
| **Scope Denied** | Address is outside neighborhood boundary | `POST /api/v1/requests`<br>**HTTP 403 Forbidden** | Displays modal: *"Address outside local neighborhood scope"*. |
| **Server Error** | Submission fails due to server error/timeout | `POST /api/v1/requests`<br>**HTTP 500 Error** | Keeps form state intact; displays inline error: *"Failed to submit request. Try again."*. |
| **Success** | Backend accepts new request | `POST /api/v1/requests`<br>**HTTP 201 Created** | Redirects immediately to **Request View Screen** (`/requests/{id}`). |

---

#### Screen 3: Request View Screen (`/requests/{id}`)
| System State | Trigger / User Action | API Endpoint & Status | UI Response & Rendered View |
| :--- | :--- | :--- | :--- |
| **Loading** | Screen loads initial data | `GET /api/v1/requests/{id}`<br>**HTTP Pending** | Renders skeleton layout for request header and provider list. |
| **Empty (0 Quotes)** | Request open, awaiting providers | `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (0 items)** | Animated empty state: *"Looking for local neighbors..."*. |
| **Partial (N Quotes)** | Providers submit responses | `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (N items)** | Renders candidate list using `ProviderCard` components showing pricing, walk distance, and rating. |
| **Timeout / Expired** | 24 hours elapse with 0 responses | `GET /api/v1/requests/{id}`<br>**HTTP 200 OK (`status: EXPIRED`)** | Displays expiration banner with CTAs: **[Repost]**, **[Edit Radius]**, **[Cancel]**. |
| **Cancellation (Open)** | User taps *"Cancel Request"* (`OPEN` status) | `DELETE /api/v1/requests/{id}`<br>**HTTP 200 OK** | Updates status to `CANCELLED`; shows toast confirmation and redirects to Home. |
| **Cancellation (Conflict)**| User cancels after booking provider | `DELETE /api/v1/requests/{id}`<br>**HTTP 409 Conflict** | Displays alert modal: *"Booking in progress. Redirecting to refund/dispute flow."*. |

---

### 2. Endpoint List with Response States

* **`GET /api/v1/requests/active`**
  * `200 OK (Active)`: Returns open request summary object (title, response count).
  * `200 OK (Empty)`: Returns `[]`; UI suppresses active request card.
  * `500 Internal Server Error`: Server failure; UI suppresses active request card and displays offline indicator.

* **`POST /api/v1/requests`**
  * `201 Created`: Returns created `request_id`; UI redirects to Request View.
  * `400 Bad Request`: Returns field validation errors; UI highlights invalid input fields.
  * `403 Forbidden`: Address outside scope; UI displays neighborhood restriction modal.
  * `500 Internal Server Error`: Backend error; UI displays retry toast and preserves form inputs.

* **`GET /api/v1/requests/{request_id}`**
  * `200 OK (OPEN - 0 Responses)`: Returns request object with 0 quotes; UI displays waiting animation.
  * `200 OK (OPEN - N Responses)`: Returns array of provider quotes; UI renders `ProviderCard` components.
  * `200 OK (EXPIRED)`: Returns request with `EXPIRED` status; UI presents timeout banner and action options.
  * `404 Not Found`: Request does not exist; UI alerts user and redirects to Home.

* **`DELETE /api/v1/requests/{request_id}`**
  * `200 OK`: Request canceled successfully; UI confirms and redirects to Home.
  * `409 Conflict`: Request locked due to confirmed booking; UI redirects to booking cancellation/dispute flow.

---

### 3. Key Gap Between the Flow and Vello's Current Screens

**Missing Cancellation and Expiry Controls on the Request Screen**:
Vello's brief explicitly notes that while the Home screen is a polished reference, screens past it contain **planted UX issues for training purposes**.

In the current prototype, the *Request View* screen only presents the "happy path" (showing active responses like *"3 neighbors responded"*). It completely omits **cancellation actions** (`DELETE /requests/{id}`) and **timeout/expiration states** when no providers respond. A complete UX architecture requires explicit controls for cancelling open requests and recovering from expired ones.

---
