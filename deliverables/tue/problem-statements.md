### Problem Statement 1: Vetting & Social Proof for Unconnected Requesters and Proxies

* **Who**: Home-service requesters who are new to a neighborhood, lack an established local social network, or act as remote proxy managers for dependent elderly family members.
* **What**: They cannot find trustworthy service providers for high-stakes home access or ongoing care because mainstream apps rely on generic 5-star ratings, while effective word-of-mouth recommendations remain locked inside closed, manually managed community networks.
* **Why**: This leaves unconnected residents and distant caretakers vulnerable to financial gouging, unreliable attendance, or severe anxiety when granting unknown individuals access to their homes and vulnerable relatives.

---

### Problem Statement 2: Pricing Transparency & Route Efficiency for Requesters and Providers

* **Who**: Local service providers and household service requesters.
* **What**: Requesters face upfront price ambiguity and multi-hour arrival windows, while independent service providers struggle with fragmented transit schedules, route gaps, and recurring platform commission fees.
* **Why**: Requesters waste entire days waiting or overpay on unquoted emergency work, while providers lose billable hours to unpaid travel between distant jobs and risk losing established long-term client relationships to transactional marketplace structures.

---

### Implied Data Entities & States

The verified problem statements imply the following core entities and operational states:

#### 1. User & Account Profile
* **Roles / Subtypes**: `Requester`, `Provider`, `Proxy Manager` (e.g., Adult Child), `Community Admin`.
* **States**: `Unverified`, `Peer-Vouched` (recommended by neighbor), `Identity-Verified`.

#### 2. Proxy / Delegation Relationship
* **Attributes**: `managing_user_id`, `recipient_user_id`, `permitted_actions` (Book, Pay, Message), `on_site_contact_notes`.
* **States**: `Pending_Approval`, `Active`, `Revoked`.

#### 3. Social Proof & Vouch Record
* **Attributes**: `recommender_id`, `provider_id`, `times_hired_count` (e.g., "used 11 times"), `vouch_context` (Neighbor, Admin, Trade Peer).
* **States**: `Draft`, `Published`, `Archived`.

#### 4. Provider Schedule & Operating Zone
* **Attributes**: `provider_id`, `primary_route_clusters`, `schedule_gap_windows`, `pricing_type` (Upfront Quote, Flat Rate).
* **States**: `Available`, `Booked`, `In_Transit`.

#### 5. Service Booking
* **Attributes**: `booking_id`, `requester_id`, `proxy_id` (optional), `provider_id`, `job_type` (One-off vs. Recurring), `agreed_price`, `time_slot` (Exact Time vs. Window), `key_access_flag`.
* **States**: `Requested`, `Quoted`, `Confirmed`, `In_Progress`, `Key_Handed_Over`, `Completed`, `Disputed`.

#### 6. Household Service History
* **Attributes**: `property_id`, `provider_id`, `job_description`, `final_cost`, `completion_date`.

---
