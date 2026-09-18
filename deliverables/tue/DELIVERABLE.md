Files behind this page: [`thematic-synthesis.md`](thematic-synthesis.md) (seven themes, counts, verbatim quotes, contradictions, entity tree) · [`audit.md`](audit.md) (two themes traced to source, the loud-but-shallow one, overstatements) · [`problem-statements.md`](problem-statements.md) (the two statements and the entity list). Transcripts: `../../Vello_Interview_Transcripts/`.

### 1. Audited Qualitative Synthesis
Synthesizes core qualitative themes across user interviews (P01–P06), establishing that interpersonal trust, peer recommendation, and shared social overlap drive user decisions far more than automated 5-star ratings or strict geographic boundaries.
* **Trust & Social Proof**: High-stakes tasks (childcare, home key access) require verified peer usage rather than generic platform badges.
* **Proxy Management**: Adult children frequently act as digital proxies for elderly parents who are digitally excluded or vulnerable to exploitation.
* **Provider Realities**: Independent tradespeople prioritize route density and filling schedule gaps over acquiring distant, one-off jobs.

### 2. Critical AI Audit (Correction to Claude)
* **Claude's Initial Analysis**: Claude claimed that Participant P02 demanded formal, documented background checks (such as DBS or police record checks) as a mandatory requirement for hiring home help.
* **Audited Correction (Attitude vs. Behavior Gap)**: The audit exposed a clear contradiction between P02's stated attitudes and actual actions. When P02 hired his cleaner Marta and gave her physical key access to his home, he performed **zero formal background checks**. He relied entirely on a verbal endorsement from his neighbor Denise ("Denise vouched for her. That's the check."). P02 acknowledged that formal certifications lose relevance when direct social proof exists.
* **Strategic Impact**: This correction shifted Vello's product strategy away from costly, low-trust background check badges and toward building a neighborhood vouching and social network framework.

### 3. Two Formatted Problem Statements
* **Problem Statement 1: Vetting & Social Proof for Unconnected Requesters and Proxies**
  * *Who*: New neighborhood residents, socially isolated homeowners, and remote proxy managers (adult children caring for elderly parents).
  * *What*: They cannot find reliable service providers for high-stakes home access because existing marketplaces rely on generic star ratings, while authentic word-of-mouth recommendations remain locked inside private local networks.
  * *Why*: Leaves non-connected residents and remote family proxies vulnerable to anxiety, overcharging, or unsafe home entry.
* **Problem Statement 2: Pricing Transparency & Route Efficiency for Requesters and Providers**
  * *Who*: Independent local service providers and home service requesters.
  * *What*: Requesters face quote ambiguity and broad multi-hour arrival windows, while providers contend with fragmented driving routes, schedule gaps, and ongoing platform commissions.
  * *Why*: Requesters waste entire days waiting or overpaying for unquoted jobs, while providers lose billable hours in transit and risk long-term client relationships to middleman platforms.

### 4. Entity List & System State Model
Defines the seven core data entities required to build the Vello backend (full attribute tree in [`thematic-synthesis.md`](thematic-synthesis.md)):
1. **User & Account Profile**: Roles (*Requester*, *Provider*, *Proxy Manager*, *Community Admin*) & verification states (*Unverified*, *Peer-Vouched*, *Identity-Verified*).
2. **Proxy / Delegation Relationship**: Connects proxy managers to aging parents, tracking permitted permissions & states (*Pending_Approval*, *Active*, *Revoked*).
3. **Social Proof & Vouch Record**: Tracks who vouched for whom, repeated usage counts, context, & states (*Draft*, *Published*, *Archived*).
4. **Provider Schedule & Operating Zone**: Captures route clusters, gap windows, pricing structures, & states (*Available*, *Booked*, *In_Transit*).
5. **Service Booking**: Handles job details, agreed prices, key handover flags, & states (*Requested*, *Quoted*, *Confirmed*, *In_Progress*, *Key_Handed_Over*, *Completed*, *Disputed*).
6. **Household Service History**: Maintains property-level service logs and costs across changing owners or tenants.
7. **Verification & Credentials**: Per-provider checks (ID, DBS, trade insurance, reference calls) with states (*Verified*, *Pending*, *Failed*); kept separate from the vouch record because the research ranks a neighbor's word above a certificate.

---

### Where I corrected Claude

| Claim | What was wrong | How verified |
|---|---|---|
| P02 demands formal background checks (DBS, ID, references) as a mandatory requirement | P02 hired Marta and handed over a key with zero formal checks: "Denise vouched for her. That's the check." A platform check "wouldn't have changed anything." Attitude ≠ behaviour | Verbatim in `Vello_Interview_Transcripts/Vello_Interview_P02.md`; cross-checked with P01 and P05. Logged as the loud-but-shallow theme in `audit.md` §2 |
