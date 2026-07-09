# 04 — Stress test: 54 edge-case queries

The stress test pushed the docs with harder, more specific questions than the persona
campaign: edge cases, exact limits, API nuances, permission distinctions, and **four
deliberate "negative probes"** (facts not in the doc set) to test agent honesty.

- **54 queries** in 6 groups of 9.
- One doc-restricted retrieval agent per group, run in parallel.
- Graded 0–3 (see [`01-methodology.md`](01-methodology.md) for the scale).

## Shared agent prompt

Every group agent received this prompt, with its 9 questions appended:

```
You are evaluating whether a documentation set can answer SharePoint Embedded (SPE)
questions. You may ONLY read files under this folder:
C:\...\docs\embedded
Do NOT use any outside/world knowledge. Simulate a coding agent doing keyword
retrieval: use grep/glob within that folder to FIND the answer, then read the matching
article. If the docs genuinely do not contain the answer, say so honestly — do not
invent it.

For EACH question below, output one block exactly in this format:
QID: <id>
ANSWER: <concise answer derived ONLY from the docs, or "NOT IN DOCS">
CITED: <relative path(s) under docs/embedded you found it in, or NONE>
FINDABILITY: <EASY|HARD|NONE — how easily keyword search located it>
SUFFICIENCY: <COMPLETE|PARTIAL|MISSING>
GAP: <if PARTIAL/MISSING/HARD, what's missing or hard to find; else NONE>

Output only the blocks, nothing else.
```

---

## Group 1 — security / compliance (q22–q30)

**Questions**

- q22 Do sensitivity labels applied to a container get inherited by files inside it?
- q23 How do I run eDiscovery against SharePoint Embedded content?
- q24 Can I apply DLP policies to containers?
- q25 How do I set a retention policy on container content?
- q26 What conditional access policy options exist for a container?
- q27 What license do I need to block downloads from a container?
- q28 Which audit fields identify the specific SPE container in an event?
- q29 Does SharePoint Embedded support customer-managed encryption keys? *(negative probe)*
- q30 In which Microsoft 365 geographies/regions is SPE available? *(negative probe)*

**Raw agent output**

```
QID: q22
ANSWER: NOT IN DOCS
CITED: NONE
FINDABILITY: HARD
SUFFICIENCY: MISSING
GAP: Docs discuss applying sensitivity labels to containers (Set-SPOContainer) but do
not specify whether labels are inherited by files within the container.

QID: q23
ANSWER: Yes. Search all SPE containers by selecting "All SharePoint sites" or limit to
specific containers by providing container URLs in the SharePoint sites workload.
CITED: admin/apply-security-compliance-controls.md, compliance/security-and-compliance.md
FINDABILITY: EASY
SUFFICIENCY: COMPLETE
GAP: NONE

QID: q24
ANSWER: Yes. Apply DLP broadly to all SharePoint sites and SPE containers, or
selectively to specific containers by specifying container URLs.
CITED: admin/apply-security-compliance-controls.md, compliance/security-and-compliance.md
FINDABILITY: EASY
SUFFICIENCY: COMPLETE
GAP: NONE

QID: q25
ANSWER: Yes, through Microsoft Purview. "All SharePoint sites" applies to all
containers; you can also target specific containers by URL.
CITED: admin/apply-security-compliance-controls.md, compliance/security-and-compliance.md, plan/security-compliance-governance.md
FINDABILITY: EASY
SUFFICIENCY: COMPLETE
GAP: NONE

QID: q26
ANSWER: Three options: AllowFullAccess, AllowLimitedAccess (web-only), and BlockAccess.
CITED: admin/apply-security-compliance-controls.md, compliance/security-and-compliance.md, plan/security-compliance-governance.md
FINDABILITY: EASY
SUFFICIENCY: COMPLETE
GAP: NONE

QID: q27
ANSWER: A SharePoint Advanced Management (SAM) license is required to enforce block
download on containers.
CITED: admin/apply-security-compliance-controls.md, compliance/security-and-compliance.md
FINDABILITY: EASY
SUFFICIENCY: COMPLETE
GAP: NONE

QID: q28
ANSWER: ContainerInstanceId (the specific container instance) and ContainerTypeId.
CITED: admin/review-audit-events.md, admin/apply-security-compliance-controls.md, compliance/security-and-compliance.md
FINDABILITY: EASY
SUFFICIENCY: COMPLETE
GAP: NONE

QID: q29
ANSWER: NOT IN DOCS
CITED: NONE
FINDABILITY: NONE
SUFFICIENCY: MISSING
GAP: No documentation on customer-managed encryption keys (BYOK).

QID: q30
ANSWER: NOT IN DOCS
CITED: NONE
FINDABILITY: HARD
SUFFICIENCY: MISSING
GAP: Docs mention a region must be specified at container-type creation but do not list
supported M365 geographies.
```

**Grading:** q23–q28 → 3. q29, q30 → 3 (honest negative probes). **q22 → 1 (real gap).**

---

## Group 2 — billing / limits / ownership (q31–q39)

**Questions**

- q31 How is a single Microsoft Graph API call counted for billing?
- q32 Are downloads through Office clients charged as egress?
- q33 Are admin actions in the SharePoint admin center billed as transactions?
- q34 How many container types can one app own?
- q35 How many container types can a tenant create?
- q36 What is the maximum file size and version count?
- q37 How many owners can a SharePoint Embedded app have in the admin center?
- q38 Can I change the billing type after creating an app in the admin center?
- q39 How long are deleted containers retained before permanent purge?

**Raw agent output**

```
QID: q31
ANSWER: Each Graph call made explicitly by the app = one transaction. Internal service
calls (eDiscovery, admin actions in SPAC or SPO PowerShell) are not charged as app
transactions.
CITED: reference/billing-meters.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q32
ANSWER: No. Downloads to the customer's Office Desktop client or WAC are not charged as
egress. Only downloads to other client devices are charged.
CITED: administration/billing/meters.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q33
ANSWER: No. Admin actions in SPAC are nonchargeable.
CITED: administration/billing/meters.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q34
ANSWER: One. SPE mandates a 1:1 relationship between owning application and container type.
CITED: development/app-architecture.md, development/limits-calling.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q35
ANSWER: Up to 25 container types by default ... 5 per developer tenant ...
CITED: getting-started/containertypes.md, development/limits-calling.md
FINDABILITY: EASY  SUFFICIENCY: PARTIAL
GAP: "developer tenant" vs "partner tenant" distinction and trial-vs-standard unclear.

QID: q36
ANSWER: Max file size 250 GB; max 500 versions per file.
CITED: development/limits-calling.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q37
ANSWER: Up to three owners.
CITED: administration/consuming-tenant-admin/SPE_app_installation_on_SPAC.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q38
ANSWER: No. Billing type is permanent and cannot be changed after app creation.
CITED: administration/consuming-tenant-admin/SPE_app_installation_on_SPAC.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q39
ANSWER: 93 days unless a retention policy changes the outcome; restorable within that window.
CITED: admin/manage-containers-sharepoint-admin-center.md, administration/consuming-tenant-admin/ctapowershell.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE
```

**Grading:** q31–q34, q36–q39 → 3. **q35 → 2 (partial — trial vs standard / 5 vs 25 /
developer vs partner tenant distinction unclear).**

---

## Group 3 — auth / permissions / registration (q40–q48)

**Questions**

- q40 Difference between `Container.Selected` and `FileStorageContainer.Selected`?
- q41 Is the container type registration API a Microsoft Graph API?
- q42 What token type does the registration API require?
- q43 Which registration call wins if I call it multiple times?
- q44 What permission lets my app manage container membership/permissions?
- q45 Why can't admin consent complete for `Container.Selected`?
- q46 Can I use SPE app-only without any signed-in user?
- q47 What is the owning application relationship to a container type?
- q48 Does my app need a certificate for authentication?

**Raw agent output**

```
QID: q40
ANSWER: Container.Selected is a SharePoint permission for registration APIs on a
consuming tenant; FileStorageContainer.Selected is a Graph permission for accessing
containers (delegated or app-only).
CITED: build/configure-authentication-authorization.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q41
ANSWER: No. The registration API is a SharePoint REST API (v2), not a Graph API.
CITED: getting-started/register-api-documentation.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q42
ANSWER: An app-only token via client credentials grant with a certificate, for the
SharePoint resource.
CITED: getting-started/register-api-documentation.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q43
ANSWER: The last successful registration call determines the settings used in the
consuming tenant.
CITED: getting-started/register-api-documentation.md, plan/authentication-permissions.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q44
ANSWER: ManagePermissions (add/remove/update members in container roles).
CITED: getting-started/register-api-documentation.md, development/auth.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q45
ANSWER: Container.Selected is hidden in the Azure portal, so consent can't complete via
the Enterprise apps pane; use the constructed admin-consent URL.
CITED: reference/troubleshooting.md, development/auth.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q46
ANSWER: Yes. App-only access works without a signed-in user; needs
FileStorageContainer.Selected application permission with admin consent.
CITED: development/auth.md, plan/authentication-permissions.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q47
ANSWER: 1:1. Each container type has one owning application with full default access to
its containers and the right to invoke the registration API.
CITED: getting-started/containertypes.md, getting-started/register-api-documentation.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q48
ANSWER: Yes. The registration API requires a certificate via the client credentials grant.
CITED: getting-started/register-api-documentation.md, build/register-application-permissions.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE
```

**Grading:** all q40–q48 → 3.

---

## Group 4 — files / Office / preview / search / webhooks (q49–q57)

**Questions**

- q49 How do I upload a large file to a container?
- q50 How do I open an Office file in the desktop client specifically?
- q51 How do I generate a preview/thumbnail link for a file?
- q52 Is container search available in the v1.0 Graph endpoint?
- q53 How long does a webhook subscription last before it expires?
- q54 What content type must my webhook validationToken response use?
- q55 How do I restore a soft-deleted container?
- q56 How do I move data from Azure Blob Storage into SPE?
- q57 How do I search using a custom metadata property?

**Raw agent output**

```
QID: q49
ANSWER: For larger files use an upload session (LargeFileUploadTask, 320 KB chunks).
CITED: build/manage-files.md, build/migrate-azure-blob-storage.md
FINDABILITY: EASY  SUFFICIENCY: PARTIAL
GAP: No explicit size threshold for what counts as a "large" file.

QID: q50
ANSWER: Office URI schemes: ms-word:ofe|u|{webUrl}/{file} (and ms-excel, ms-powerpoint).
CITED: build/open-office-files.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE

QID: q51
ANSWER: POST .../drives/{driveId}/items/{itemId}/preview; use getUrl from the response.
CITED: build/preview-files.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE

QID: q52
ANSWER: No. Search requires /beta/search/query and is preview, delegated-only. For v1.0
use OData $filter on drive items.
CITED: build/search-containers-files.md
FINDABILITY: HARD  SUFFICIENCY: PARTIAL
GAP: Docs show the beta endpoint but don't explicitly state v1.0 lacks search.

QID: q53
ANSWER: Max lifetime 4,230 minutes before expiration.
CITED: build/respond-to-changes-webhooks.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE

QID: q54
ANSWER: Respond text/plain with the validationToken value as the body.
CITED: build/respond-to-changes-webhooks.md, development/tutorials/using-webhooks.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE

QID: q55
ANSWER: Restore-SPODeletedContainer -Identity <id>; restorable within 93 days;
reactivation instant in first 7 days, up to 24h after.
CITED: administration/consuming-tenant-admin/ctapowershell.md, build/create-manage-containers.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE

QID: q56
ANSWER: Download blobs to a stream, create an SPE upload session, upload with
LargeFileUploadTask (320 KB chunks), set conflictBehavior.
CITED: build/migrate-azure-blob-storage.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE

QID: q57
ANSWER: Append OWSTEXT to the custom property name in the search query (with
ContainerTypeId); OData $filter for single-container queries.
CITED: build/search-containers-files.md, build/container-metadata.md
FINDABILITY: EASY  SUFFICIENCY: PARTIAL
GAP: Less detail on when to use search vs OData filtering.
```

**Grading:** q50, q51, q53–q56 → 3. **q49 → 2** (no size threshold). **q52 → 2**
(doesn't state v1.0 lacks search). **q57 → 2** (search-vs-OData guidance thin).

---

## Group 5 — admin / install / onboarding (q58–q66)

**Questions**

- q58 Admin consent URL format to install a vendor app?
- q59 Where in the M365 admin center do I configure SPE billing?
- q60 Which PowerShell cmdlet sets a sensitivity label on a container?
- q61 How do I connect PowerShell to manage SPE?
- q62 What happens to users if billing is invalid or SPE is turned off?
- q63 Which permissions must a customer consent to for an ISV app to register and use containers?
- q64 How do I validate that a customer installed my app correctly?
- q65 What does a SharePoint Embedded Administrator role NOT have access to?
- q66 How do I monitor SPE cost in Azure?

**Raw agent output**

```
QID: q58
ANSWER: https://login.microsoftonline.com/<ConsumingTenantID>/adminconsent?client_id=<OwningTenantClientID>
CITED: admin/grant-admin-consent-permissions.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q59
ANSWER: Setup > Files and Content > Automate Content with Microsoft Syntex > Go to
Syntex settings > Apps > SharePoint Embedded.
CITED: admin/setup-billing-m365-admin-center.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q60
ANSWER: Set-SPOContainer -Identity <id> -SensitivityLabel <label>.
CITED: admin/manage-containers-powershell.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q61
ANSWER: Connect-SPOService -Url https://<tenant>-admin.sharepoint.com, then SPO cmdlets.
CITED: admin/manage-containers-powershell.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q62
ANSWER: Users immediately lose access to apps built on the service.
CITED: admin/setup-billing-m365-admin-center.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q63
ANSWER: FileStorageContainer.Selected (Graph) and Container.Selected (SharePoint, for
registration); admin consent required on the consuming tenant.
CITED: build/register-application-permissions.md, development/auth.md, publish/prepare-customer-installation.md
FINDABILITY: HARD  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q64
ANSWER: Use the validation checklist (IDs match, admin consent, registration, billing,
sign-in, container create/open, file ops, admin visibility, sharing/compliance).
CITED: publish/validate-customer-installation.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q65
ANSWER: Cannot see Active/Deleted sites pages in SPAC; cannot run site-specific cmdlets.
CITED: administration/adminrole.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q66
ANSWER: Azure Cost Management (Cost analysis) on the linked subscription; group by meter
(storage/transactions/egress); set budgets/alerts.
CITED: admin/monitor-usage-billing-cost.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE
```

**Grading:** all q58–q66 → 3. (q63 noted HARD-to-find but complete and correct.)

---

## Group 6 — advanced + negative probes + routing (q67–q75)

**Questions**

- q67 How do I add real-time collaboration with Fluid Framework?
- q68 How do I let Copilot/agents use my container content as a knowledge source?
- q69 What hosts can embed the SPE Copilot chat, and how do I set them?
- q70 Does the Foundry knowledge source need a license during preview?
- q71 Can I use SharePoint Embedded without writing any code?
- q72 Where exactly is my application data physically stored?
- q73 Is there a published SLA and uptime guarantee for SPE? *(negative probe)*
- q74 Does SPE support multi-geo placement of individual containers? *(negative probe)*
- q75 I am a billing admin who only cares about cost. Where do I go?

**Raw agent output**

```
QID: q67
ANSWER: Use Fluid Framework for synchronized collaborative state; install the Fluid
client libs, configure container type + auth, use the sample/item-counter.
CITED: build/fluid-framework.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q68
ANSWER: Configure agent experiences via the React SDK; for Foundry (Preview) set a
SharePoint knowledge source with remoteSharePointParameters.containerTypeId and grant
the Foundry app permission to the container type.
CITED: build/agent-experiences.md, development/declarative-agent/spe-da.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q69
ANSWER: Set-SPOContainerTypeConfiguration -CopilotEmbeddedChatHosts <host URLs>; default
frame-ancestors 'none'; consuming-tenant admins can narrow via Set-SPOApplication.
CITED: build/agent-experiences.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q70
ANSWER: Yes — during preview at least one Copilot license is required on the tenant.
CITED: build/agent-experiences.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q71
ANSWER: NOT IN DOCS
CITED: NONE
FINDABILITY: NONE  SUFFICIENCY: MISSING
GAP: Docs focus on developer/API usage; no explicit statement about no-code capability.

QID: q72
ANSWER: In the consuming tenant's M365 boundary; a region is set at container-type
creation, but specific data-center locations are not documented.
CITED: overview.md, administration/billing/billing.md
FINDABILITY: HARD  SUFFICIENCY: PARTIAL
GAP: Specific data-center locations / residency options not documented.

QID: q73
ANSWER: NOT IN DOCS
CITED: NONE
FINDABILITY: NONE  SUFFICIENCY: MISSING
GAP: No published SLA / uptime info.

QID: q74
ANSWER: NOT IN DOCS
CITED: NONE
FINDABILITY: NONE  SUFFICIENCY: MISSING
GAP: Multi-geo placement of individual containers not addressed.

QID: q75
ANSWER: Go to "Monitor usage, billing, and cost" (admin/monitor-usage-billing-cost.md).
CITED: admin/monitor-usage-billing-cost.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE
```

**Grading:** q67–q70, q75 → 3. q73, q74 → 3 (honest negative probes). **q71 → 1**
(real gap). **q72 → 2** (core answer present but rated hard to find; deeper residency
detail genuinely out of scope).

---

## Round 1 score

| | Count |
| --- | --- |
| Score 3 | 47 |
| Score 2 | 5 (q35, q49, q52, q57, q72) |
| Score 1 | 2 (q22, q71) |
| **Total** | **153 / 162 = 94.4%** |

All four negative probes (q29, q30, q73, q74) were answered honestly → no hallucinations.

## Gaps and fixes

| QID | Gap | Fix | File |
| --- | --- | --- | --- |
| q22 | Sensitivity-label scope/inheritance to files not stated | Added: label applies at container level; existing files not retroactively relabeled; each file carries its own label | `plan/security-compliance-governance.md` |
| q35 | Trial vs standard container types unclear | Added a note distinguishing the free **trial** container type from **standard** (billed) types, linking to the container-type article | `plan/limits-calling-patterns.md` |
| q49 | No large-file size threshold | Added the **250 MB** simple-upload vs upload-session threshold | `build/manage-files.md` |
| q52 | Doesn't state v1.0 lacks search | Added: search is **beta-only**, no `v1.0` container search | `build/search-containers-files.md` |
| q57 | Search-vs-OData choice thin | Added a one-line decision rule (full-text search for free-text + ranking; OData `$filter` for known metadata) | `build/search-containers-files.md` |
| q71 | No explicit "API-only / no no-code" statement | Added to the intro: SPE has no standalone UI and no no-code path; access is via Microsoft Graph | `overview.md` |
| q72 | Data-residency answer hard to find | Already present in `overview.md` ("dedicated storage partition inside that customer's tenant"); confirmed findable after the q71 edit | `overview.md` |

The negative probes (q29 CMK, q30 region list, q73 SLA, q74 multi-geo) were **left as-is**:
they are out of scope for this doc set, and honest "NOT IN DOCS" answers are the desired
behavior. Legacy-folder citations (e.g., `administration/`, `development/`) were judged
benign — answers were correct, and legacy files are intentionally retained as deep dives.

All fixes were committed as `74702b1bb`.

## Round 2 re-test

A fresh doc-restricted agent re-ran the 7 fixed queries (q22, q35, q49, q52, q57, q71,
q72). The re-test prompt was identical to the group prompt above. Raw output:

```
QID: q22
ANSWER: Sensitivity labels on a container do NOT auto-inherit to files, and existing
files are NOT retroactively relabeled. The label applies at the container level
(conditional access, guest sharing); each file carries its own label.
CITED: docs/embedded/plan/security-compliance-governance.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q35
ANSWER: Up to 25 container types per tenant; one can be a free trial container type
(limited containers/storage, for development), the rest standard (billed, Azure-linked).
CITED: docs/embedded/getting-started/containertypes.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q49
ANSWER: Up to 250 MB: simple upload (single PUT). Over 250 MB: upload session in
byte-range chunks (e.g., 320 KB multiples).
CITED: docs/embedded/build/manage-files.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q52
ANSWER: Only on /beta — there is no v1.0 search API for containers.
CITED: docs/embedded/build/search-containers-files.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q57
ANSWER: Full-text search (beta/search/query) for free-text + ranking; OData $filter
($expand/$orderby on v1.0) for known metadata values without ranking.
CITED: docs/embedded/build/search-containers-files.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q71
ANSWER: No no-code option. SPE has no standalone end-user UI; you build/deploy an app
that calls Microsoft Graph.
CITED: docs/embedded/overview.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE

QID: q72
ANSWER: In the customer's M365 tenant — a dedicated storage partition inside that
tenant's boundary; content physically resides in the customer's tenant.
CITED: docs/embedded/overview.md
FINDABILITY: EASY  SUFFICIENCY: COMPLETE  GAP: NONE
```

All 7 returned **EASY / COMPLETE**.

## Final score

| | Count |
| --- | --- |
| Score 3 | **54** |
| Score 2 | 0 |
| Score 1 | 0 |
| **Total** | **162 / 162 = 100%** |

Structural scorer re-run after fixes: **100.00 / 100, 43/43 perfect**.
Relative-link integrity: **0 broken / 297**.

## Full grade ledger (all 54)

| QID | Persona | Grp | R1 | R2 | Note |
| --- | --- | --- | --- | --- | --- |
| q22 | compliance | 1 | 1 | 3 | fixed+verified |
| q23 | compliance | 1 | 3 | 3 | |
| q24 | compliance | 1 | 3 | 3 | |
| q25 | compliance | 1 | 3 | 3 | |
| q26 | compliance | 1 | 3 | 3 | |
| q27 | compliance | 1 | 3 | 3 | |
| q28 | compliance | 1 | 3 | 3 | |
| q29 | compliance | 1 | 3 | 3 | negative probe — honest |
| q30 | architect | 1 | 3 | 3 | negative probe — honest |
| q31 | billing | 2 | 3 | 3 | |
| q32 | billing | 2 | 3 | 3 | |
| q33 | billing | 2 | 3 | 3 | |
| q34 | architect | 2 | 3 | 3 | |
| q35 | architect | 2 | 2 | 3 | fixed+verified |
| q36 | architect | 2 | 3 | 3 | |
| q37 | admin | 2 | 3 | 3 | |
| q38 | admin | 2 | 3 | 3 | |
| q39 | admin | 2 | 3 | 3 | |
| q40 | dev | 3 | 3 | 3 | |
| q41 | dev | 3 | 3 | 3 | |
| q42 | dev | 3 | 3 | 3 | |
| q43 | dev | 3 | 3 | 3 | |
| q44 | dev | 3 | 3 | 3 | |
| q45 | dev | 3 | 3 | 3 | |
| q46 | dev | 3 | 3 | 3 | |
| q47 | dev | 3 | 3 | 3 | |
| q48 | dev | 3 | 3 | 3 | |
| q49 | dev | 4 | 2 | 3 | fixed+verified |
| q50 | dev | 4 | 3 | 3 | |
| q51 | dev | 4 | 3 | 3 | |
| q52 | dev | 4 | 2 | 3 | fixed+verified |
| q53 | dev | 4 | 3 | 3 | |
| q54 | dev | 4 | 3 | 3 | |
| q55 | dev | 4 | 3 | 3 | |
| q56 | dev | 4 | 3 | 3 | |
| q57 | dev | 4 | 2 | 3 | fixed+verified |
| q58 | admin | 5 | 3 | 3 | |
| q59 | admin | 5 | 3 | 3 | |
| q60 | admin | 5 | 3 | 3 | |
| q61 | admin | 5 | 3 | 3 | |
| q62 | admin | 5 | 3 | 3 | |
| q63 | isv | 5 | 3 | 3 | hard-to-find but complete |
| q64 | isv | 5 | 3 | 3 | |
| q65 | admin | 5 | 3 | 3 | |
| q66 | admin | 5 | 3 | 3 | |
| q67 | dev | 6 | 3 | 3 | |
| q68 | dev | 6 | 3 | 3 | |
| q69 | dev | 6 | 3 | 3 | |
| q70 | dev | 6 | 3 | 3 | |
| q71 | architect | 6 | 1 | 3 | fixed+verified |
| q72 | architect | 6 | 2 | 3 | fixed+verified |
| q73 | dev | 6 | 3 | 3 | negative probe — honest |
| q74 | architect | 6 | 3 | 3 | negative probe — honest |
| q75 | router | 6 | 3 | 3 | |
