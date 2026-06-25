# 06 — Agent scenario evaluations (top 5)

This record analyzes 10 candidate scenarios for using an AI agent to run SharePoint
Embedded (SPE) tasks, ranks them by **relevancy and impact** to the customer and to SPE
as a product, and provides a full **input prompt + ground truth + evaluation rubric**
for the top scenarios — in the same template as the "Create a SharePoint Embedded
application" anchor example.

Each ground truth is derived from the live Microsoft Learn docs and the task articles in
this repo (`docs/embedded/...`), which were fact-checked against Learn during the
restructure.

---

## Scenario ranking (all 10)

Each scenario is scored on two axes (1–5):

- **Customer impact** — how many users hit this, and how badly they're blocked without good guidance.
- **Product impact** — how central the scenario is to SPE's differentiation and adoption.

| Rank | Scenario | Primary persona | Customer | Product | Total |
| --- | --- | --- | :---: | :---: | :---: |
| 1 | **Create a SharePoint Embedded application** *(anchor — example provided)* | Developer | 5 | 5 | 10 |
| 2 | **Design auth, container types, and the permission model** | Developer / Architect | 5 | 5 | 10 |
| 3 | **Add a Copilot/declarative agent grounded on container content** | Developer | 4 | 5 | 9 |
| 4 | **Meet enterprise compliance and data-governance requirements** | Admin / Compliance | 5 | 4 | 9 |
| 5 | **Build core document management (upload, versioning, metadata, search)** | Developer | 5 | 4 | 9 |
| 6 | Understand pricing, billing, and capacity planning | Admin / IT decision maker | 4 | 4 | 8 |
| 7 | Implement RAG / semantic retrieval for an LLM | Developer | 3 | 4 | 7 |
| 8 | Add document collaboration and co-authoring | Developer | 3 | 3 | 6 |
| 9 | Migrate existing content into SPE | Developer | 3 | 3 | 6 |
| 10 | Choose the right document-storage platform | Architect / Decision maker | 3 | 2 | 5 |

### Top 5 selected for full documentation

Scenario **#1 (Create an app)** is the anchor and is already fully templated in the
request, so it is documented here only by reference. The five scenarios documented in
full below are the next-highest priority and give balanced developer **and** admin
coverage:

| # in this doc | Scenario | Persona | Why it made the cut |
| --- | --- | --- | --- |
| A | Design auth, container types, and the permission model | Developer/Architect | The make-or-break design task; the container-type **registration** step is the single most-failed item. Gets auth wrong → everything returns access denied. |
| B | Add a Copilot/declarative agent grounded on container content | Developer | SPE's strategic differentiator — content stays in-tenant and grounds Copilot/Foundry agents. Highest product pull right now. |
| C | Meet enterprise compliance and data-governance requirements | Admin/Compliance | The top reason enterprises choose SPE (data in their own M365 boundary + Purview). Primary **admin** journey. |
| D | Build core document management (upload, versioning, metadata, search) | Developer | The everyday workload every SPE app needs. Broadest relevance. |
| E | Understand pricing, billing, and capacity planning | Admin/Decision maker | Gates production go-live; pass-through vs standard and capacity limits drive architecture. Primary **decision-maker** journey. |

> **Reasoning notes.** RAG (#7) overlaps heavily with the Copilot agent scenario (B),
> which is the more concrete, product-aligned framing, so B is preferred. Collaboration
> (#8) and migration (#9) are valuable but narrower/one-time. "Choose a platform" (#10)
> is a pre-decision with low repeat use, so it ranks last.

---

## Scenario A — Design auth, container types, and the permission model

**Persona:** Developer / Architect.
**Microsoft Learn references:**
- [SharePoint Embedded authentication and authorization](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/auth)
- [SharePoint Embedded Container Types](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/containertypes)
- [Register file storage container type application permissions](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/register-api-documentation)
- Repo task articles: `plan/authentication-permissions.md`, `build/create-container-type.md`, `build/register-application-permissions.md`

### Input prompt

> You are a developer designing the authentication and permission model for a SharePoint
> Embedded application. Using the documentation at
> https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview as your starting
> point, produce a design that covers: the container type and its owning app, the
> Microsoft Graph permissions the app needs, how the container type is **registered** on
> a consuming tenant, the difference between delegated and app-only access, and the
> container-level roles that govern what users can do. Call out least-privilege choices
> and the most common failure modes.

### Ground truth: expected design

A complete and accurate design must include:

1. **Owning app ↔ container type (1:1)**
   - One Microsoft Entra ID application owns exactly **one** container type.
   - The container type ID is an immutable property stamped on every container; it drives access authorization, billing, and configurable behaviors.
   - The owning application ID and container type ID can't be changed later.

2. **Three permission layers (and the key gotcha)**
   - **Microsoft Graph permission** — lets the app call SPE endpoints.
   - **Container type application permission** — lets the app act on containers *of that type* (granted via registration).
   - **Container permission (role)** — governs what a *user* can do in a specific container (delegated access only).
   - Critical: **Graph permissions alone don't grant container access.** The app must also be granted container type permissions through registration.

3. **Graph permission: `FileStorageContainer.Selected`**
   - Delegated `FileStorageContainer.Selected` for on-behalf-of-user access; application `FileStorageContainer.Selected` for app-only access.
   - Both require **admin consent on the consuming tenant**.

4. **Container type registration (most-missed step)**
   - Registration is **not** currently a Graph API; it is a **SharePoint REST API v2** call.
   - The owning app requests SharePoint **`Container.Selected`** application permission (resource: *Office 365 SharePoint Online*, scope ID `19766c1b-905b-43af-8756-06526ab42875`) using an **app-only token via client-credentials with a certificate**.
   - Only the **owning application** can invoke registration in a consuming tenant, and the owning app must have a service principal + admin consent there.
   - Registration defines the container type application permission grants (for the owning app and any guest apps such as Foundry).
   - The **last successful registration call wins**.

5. **Delegated vs app-only**
   - Delegated = acts on behalf of a user; effective permission is the **intersection** of the app's container type permissions and the user's container role. Prefer this for auditability.
   - App-only = acts without a user; can reach **all** containers enabled by its container type permissions. Use only for background/service work, with least privilege.

6. **Container type application permissions (grant least privilege)**
   - Choose from `ReadContent`, `WriteContent`, `Create`, `Delete`, `Read`, `Write`, `EnumeratePermissions`, `AddPermissions`, `UpdatePermissions`, `DeletePermissions`, `DeleteOwnPermissions`, `ManagePermissions`, `ManageContent`, `Full` (and `None`).
   - Don't grant `Full` to an app that only needs read.

7. **Container roles (users, delegated)**
   - `Reader` → `Writer` → `Manager` → `Owner` (each is a superset of the previous).
   - The user who creates a container via a delegated call is auto-assigned **Owner**.

8. **Exceptional access patterns to plan for**
   - Container type *management* on the owning tenant via PowerShell; *registration* via SharePoint REST v2; SPE **agent** permissions via SharePoint REST v2; Microsoft **Search** scenarios needing extra permission during preview; operations that currently require a user license.

### Eval criteria (rubric) — score each 0/1/2

| # | Criterion | Weight | Description |
|---|---|---|---|
| 1 | 1:1 owning app ↔ container type | High | States the one-app-one-container-type rule and immutability of the IDs. |
| 2 | Three permission layers | High | Distinguishes Graph permission vs container type application permission vs container role, and states Graph alone is insufficient. |
| 3 | Correct Graph permission | High | Names `FileStorageContainer.Selected` (delegated and/or application) and admin consent on the consuming tenant. |
| 4 | Container type registration | High | Describes registration as a **SharePoint REST v2** call using `Container.Selected` app-only (certificate), invoked only by the owning app. Commonly missed. |
| 5 | Delegated vs app-only | Medium | Correctly explains intersection-of-permissions for delegated and all-container reach for app-only; recommends delegated. |
| 6 | Least privilege at type level | Medium | Picks minimal container type application permissions instead of `Full`. |
| 7 | Container roles | Medium | Lists Reader/Writer/Manager/Owner and the auto-Owner-on-create behavior. |
| 8 | Last-write-wins registration | Low | Notes the last successful registration call determines effective grants. |
| 9 | Exceptional access patterns | Low | Mentions at least one (registration via REST v2, agent permissions, or search preview). |
| 10 | No hallucinated permissions/APIs | High | Does **not** invent `Sites.ReadWrite.All`, a fictional SDK/CLI, or claim registration is a Graph call. |

### Scoring

| Rating | Score | Interpretation |
|---|---|---|
| Excellent | 18–20 | Production-ready auth design |
| Good | 14–17 | Usable with minor gaps |
| Fair | 10–13 | Significant gaps a developer would hit |
| Poor | 0–9 | Would misconfigure access |

### Key failure modes

- **Omitting container type registration** — the #1 cause of "access denied" on every container call.
- **Citing the wrong permission** — e.g., `Sites.ReadWrite.All` instead of `FileStorageContainer.Selected` / `Container.Selected`.
- **Calling registration a Graph API** — it is SharePoint REST v2 today.
- **Conflating Graph permission with container access** — forgetting the container type grant layer.
- **Over-granting** — `Full` app-only permission where read-only suffices.
- **Forgetting admin consent in the consuming tenant.**

---

## Scenario B — Add a Copilot/declarative agent grounded on container content

**Persona:** Developer.
**Microsoft Learn references:**
- [SharePoint Embedded agent](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/declarative-agent/spe-da)
- [SharePoint Embedded agent — advanced topics](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/declarative-agent/spe-da-adv)
- [Build an agent with VS Code (tutorial)](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/spe-da-vscode)
- Repo task article: `build/agent-experiences.md`

### Input prompt

> You are a developer who wants to add an AI agent that answers questions over files
> stored in your SharePoint Embedded containers. Using the documentation at
> https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview as your starting
> point, create a step-by-step plan to (a) embed a Copilot-style chat in your app
> grounded on a container, and (b) expose the same container content to a Microsoft
> Foundry agent as a knowledge source. Include prerequisites, container type
> configuration, the client SDK wiring, how grounding/scoping works, and licensing
> caveats.

### Ground truth: expected plan

1. **Understand the model & preview status**
   - Agent experiences answer questions over container files. The SDK/experience is in **preview** — confirm current SDK, billing, licensing, and container type requirements before deploying.

2. **Prerequisites**
   - An SPE app with **at least one container** and content uploaded.
   - For Foundry grounding (and currently for embedded chat scenarios) at least one **Microsoft 365 Copilot license** on the tenant during preview.
   - A **standard** container type (trial types expire in 30 days and can't convert).

3. **Configure the container type for discoverability**
   - Set `DiscoverabilityDisabled = $false` so the agent can find files: `Set-SPOContainerTypeConfiguration -ContainerTypeId <id> -DiscoverabilityDisabled $false`.
   - Allow up to **24 hours** for propagation before testing.

4. **Configure allowed chat hosts (embedded chat)**
   - Set `CopilotEmbeddedChatHosts` to the host URLs allowed to embed the chat iframe (default `frame-ancestors` is `none` if unset): `Set-SPOContainerTypeConfiguration -ContainerTypeId <id> -CopilotEmbeddedChatHosts @("http://localhost:3000","https://contoso.sharepoint.com")`.
   - A consuming-tenant admin can narrow (not widen) this via `Set-SPOApplication` (must be a subset).

5. **Wire the React chat SDK (embedded chat)**
   - Install the preview package, implement an `IChatEmbeddedApiAuthProvider` that returns a **SharePoint** token for the tenant host (scope `${hostname}/Container.Selected`).
   - Render `<ChatEmbedded ... containerId={container.id} />`, capture the API from `onApiReady`, then `chatApi.openChat({...})` with header/instruction/suggested prompts/locale.

6. **Scope the grounding**
   - Effective permissions = **intersection** of the user's access and the app's access.
   - Choose the smallest useful data source scope: `File`, `Folder`, `DocumentLibrary`, `Site`, `WorkingSet`, or `Meeting`. Surface the active scope in the UI.

7. **Expose SPE to Microsoft Foundry (Preview)**
   - Configure a SharePoint knowledge source with `remoteSharePointParameters.containerTypeId = <your container type>`.
   - Grant the **Foundry app** (`880da380-985e-4198-81b9-e05b1cc53158`) permission by updating the **container type registration** in consuming tenants:
     `PUT /storage/fileStorage/containerTypeRegistrations/{containerTypeId}/applicationPermissionGrants/880da380-985e-4198-81b9-e05b1cc53158` with `{"delegatedPermissions":["readContent"],"applicationPermissions":["none"]}` (can also be granted at initial registration).

8. **Test**
   - Sign in as a user with a Copilot license (when required), upload supported files, **wait for indexing**, open chat, ask answerable questions. If files are missing from answers, check discoverability, supported formats, app/user access, scope, and indexing delay.

9. **Billing awareness**
   - SPE agent interactions meter against the **Copilot Studio** message meter during private preview (the source states one interaction ≈ 12 messages).

### Eval criteria (rubric) — score each 0/1/2

| # | Criterion | Weight | Description |
|---|---|---|---|
| 1 | Preview/licensing caveat | High | Notes preview status and the Copilot-license prerequisite during preview. |
| 2 | Standard container type | Medium | Uses a standard (not trial) container type for agents. |
| 3 | Discoverability config | High | Sets `DiscoverabilityDisabled $false` and notes ~24h propagation. |
| 4 | Chat host config | Medium | Configures `CopilotEmbeddedChatHosts`; mentions default `frame-ancestors none` and subset override. |
| 5 | SDK auth provider + token | High | Auth provider returns a SharePoint token with `${hostname}/Container.Selected`; renders `ChatEmbedded` with `containerId`. |
| 6 | Grounding scope = intersection | High | States effective access is the intersection of user and app; picks a minimal data source scope. |
| 7 | Foundry knowledge source | High | Sets `remoteSharePointParameters.containerTypeId` and grants the Foundry app ID via container type registration with `readContent`. |
| 8 | Indexing/test loop | Medium | Includes upload → wait for indexing → ask, with the documented troubleshooting checks. |
| 9 | Agent billing meter | Low | Mentions Copilot Studio message metering for agent interactions. |
| 10 | No hallucinated APIs | High | Does not invent a non-existent agent SDK, endpoint, or the wrong Foundry app ID. |

### Scoring

| Rating | Score | Interpretation |
|---|---|---|
| Excellent | 18–20 | Ship-ready agent integration plan |
| Good | 14–17 | Works with minor gaps |
| Fair | 10–13 | Agent likely returns no/partial grounding |
| Poor | 0–9 | Misconfigured; agent can't ground on content |

### Key failure modes

- **Forgetting discoverability** (`DiscoverabilityDisabled $false`) or not waiting for propagation/indexing → empty answers.
- **Wrong Foundry app ID** or granting it via the wrong mechanism (must be via container type registration).
- **Using a trial container type** for an agent scenario.
- **Wrong token audience** — returning a Graph token instead of a SharePoint `Container.Selected` token for embedded chat.
- **Ignoring the intersection rule** and expecting the agent to see content the user can't.
- **Missing the Copilot-license preview prerequisite.**

---

## Scenario C — Meet enterprise compliance and data-governance requirements

**Persona:** Admin / Compliance admin.
**Microsoft Learn references:**
- [SharePoint Embedded security and compliance](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/security-and-compliance)
- Repo task articles: `plan/security-compliance-governance.md`, `admin/apply-security-compliance-controls.md`, `admin/review-audit-events.md`

### Input prompt

> You are a Microsoft 365 compliance/SharePoint administrator. A vendor's SharePoint
> Embedded app is being installed in your tenant. Using the documentation at
> https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview as your starting
> point, create a plan to bring its containers under your enterprise compliance and
> data-governance controls: discovery, auditing, eDiscovery, retention/DLP, sensitivity
> labels, block-download, and Conditional Access. Note where the app (not the admin) must
> provide a user experience, and any licensing requirements.

### Ground truth: expected plan

1. **Where the data lives / who governs it**
   - SPE content resides in the **consuming tenant's** M365 boundary; **consuming-tenant policies and admins govern it**. (For an enterprise LOB app the same tenant owns and consumes; for an ISV app each customer tenant governs its own content.)
   - SPE is API-only with no native UI — some compliance scenarios that need user interaction must be implemented by the **app**.

2. **Discover apps and containers (PowerShell)**
   - `Get-SPOApplication` to list registered SPE apps.
   - `Get-SPOContainer -OwningApplicationId <id>` to list containers.
   - `Get-SPOContainer -OwningApplicationId <id> -Identity <containerId>` for details incl. container **site URL** (needed to target policies).

3. **Auditing**
   - SPE user/admin operations flow to the **unified audit log**, mirroring SharePoint.
   - Filter SPE activity using **`ContainerInstanceId`** and **`ContainerTypeId`**.

4. **eDiscovery (Microsoft Purview)**
   - Search/hold/export via Purview eDiscovery. Use **"all SharePoint sites"** to cover all containers, or scope to specific containers by **container URL**.

5. **Data Lifecycle Management (retention)**
   - Retention/hold policies via Purview. "All SharePoint sites" applies to all containers; target specific containers by **URL**.
   - Retention-label *application by an end user* needs **app support** (no native UI).

6. **Data Loss Prevention (DLP)**
   - DLP across all sites or scoped to specific container URLs. Some DLP scenarios (e.g., business-justification override, policy tips) require **app-provided** user interaction via Graph.

7. **Sensitivity labels**
   - `Set-SPOContainer -Identity <id/URL> -SensitivityLabel <GUID>` (Global/SharePoint Admin).
   - The label applies at the **container level** (conditional access, guest sharing); it does **not** retroactively relabel existing files, and each file carries its own label.

8. **Block download**
   - `Set-SPOSite -Identity <ContainerSiteURL> -BlockDownloadPolicy $true`. Requires a **SharePoint Advanced Management (SAM)** license.

9. **Conditional Access**
   - `Set-SPOContainer -Identity <URL> -ConditionalAccessPolicy <type>` with `AllowFullAccess`, `AllowLimitedAccess`, or `BlockAccess`.

10. **Responsibility split**
    - Consuming-tenant admin configures audit/eDiscovery/DLP/retention/labels and grants consent; the app owner provides UX for policy-driven user interactions and preserves audit context. Don't assume every consuming tenant has identical policy.

### Eval criteria (rubric) — score each 0/1/2

| # | Criterion | Weight | Description |
|---|---|---|---|
| 1 | Data residency & governance owner | High | States content lives in the consuming tenant and that tenant's admins/policies govern it. |
| 2 | Container discovery | Medium | Uses `Get-SPOApplication` / `Get-SPOContainer` to enumerate apps/containers and capture URLs. |
| 3 | Audit fields | High | Names `ContainerInstanceId` and `ContainerTypeId` for unified-audit-log filtering. |
| 4 | eDiscovery scoping | Medium | All-sites vs specific-container-URL scoping. |
| 5 | Retention/DLP | High | Purview retention + DLP, all-sites or per-container-URL; notes app-provided UX for interactive scenarios. |
| 6 | Sensitivity labels | Medium | `Set-SPOContainer -SensitivityLabel`; container-level scope, no retroactive relabel. |
| 7 | Block download + license | Medium | `Set-SPOSite -BlockDownloadPolicy`; **SAM** license required. |
| 8 | Conditional Access options | Medium | Lists `AllowFullAccess`/`AllowLimitedAccess`/`BlockAccess`. |
| 9 | App-vs-admin responsibility | Medium | Calls out where the app must supply UI because SPE has no native UI. |
| 10 | No hallucinated controls | High | Doesn't invent SPE-specific compliance toggles or claim capabilities the docs don't list. |

### Scoring

| Rating | Score | Interpretation |
|---|---|---|
| Excellent | 18–20 | Audit-ready governance plan |
| Good | 14–17 | Solid with minor omissions |
| Fair | 10–13 | Gaps that would fail a compliance review |
| Poor | 0–9 | Misleads the admin |

### Key failure modes

- **Treating containers like ordinary SharePoint sites** and missing the URL-scoping mechanism.
- **Omitting the audit container fields** (`ContainerInstanceId`/`ContainerTypeId`).
- **Forgetting the SAM license** for block-download.
- **Claiming labels relabel existing files** or that SPE provides its own compliance UI.
- **Assuming uniform tenant policy** across all consuming tenants.

---

## Scenario D — Build core document management (upload, versioning, metadata, search)

**Persona:** Developer.
**Microsoft Learn references:**
- [SharePoint Embedded overview](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview)
- [fileStorageContainer Graph resource](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer)
- Repo task articles: `build/manage-files.md`, `build/container-metadata.md`, `build/search-containers-files.md`

### Input prompt

> You are a developer building the document-management core of a SharePoint Embedded app.
> Using the documentation at https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview
> as your starting point, create a plan to implement file upload (small and large),
> download, folders, versioning, custom metadata columns, and search across containers.
> Specify the Microsoft Graph calls, the small-vs-large upload threshold, how to query
> custom metadata, and when to use full-text search versus an OData filter.

### Ground truth: expected plan

1. **Map container → drive**
   - A container is exposed as a Graph **drive**; address content via `/drives/{containerId}/items/...` (a container behaves like an API-only document library).

2. **Upload**
   - **≤ 250 MB:** simple upload — single `PUT` to the item's content.
   - **> 250 MB:** create an **upload session** and send byte-range chunks (e.g., 320 KB multiples) until complete.

3. **Download** — `GET` the item's `/content`.

4. **Folders & item operations** — create folders, update content (`PUT`/upload session), rename/move (PATCH `parentReference`/`name`), delete (to recycle bin), and **restore** from the recycle bin.

5. **Versioning** — built-in; versions count toward storage. Default automatic version limit is **500** per file.

6. **Custom metadata**
   - Add columns to a container and read/write item field values via `listItem`/`fields`.
   - Query within a single container with OData: `GET /v1.0/drives/{containerId}/items?$filter=startswith(listitem/fields/{column}, '{value}')&$expand=listitem($expand=fields)`.
   - For containers with **> 5,000 items**, include `Prefer: HonorNonIndexedQueriesWarningMayFailRandomly` when using `$orderby`.

7. **Search**
   - Container/file search is **beta-only** (`POST /beta/search/query`), in preview, **delegated permissions only** — there is no `v1.0` container search.
   - To search a **custom property**, append `OWSTEXT` to the property name in the query, combined with `ContainerTypeId`.
   - **Choose:** use full-text **search** for free-text terms with relevance ranking across containers; use **OData `$filter`** (v1.0) for known metadata values without ranking.

8. **Validate & troubleshoot** — verify upload/download/metadata/search round-trips; expect indexing latency before search returns new content.

### Eval criteria (rubric) — score each 0/1/2

| # | Criterion | Weight | Description |
|---|---|---|---|
| 1 | Container → drive mapping | High | Uses `/drives/{containerId}/items` as the content surface. |
| 2 | Upload threshold | High | ≤250 MB simple `PUT`; >250 MB upload session with chunks. |
| 3 | Download/folders/CRUD | Medium | Covers download, folders, update, rename/move, delete. |
| 4 | Versioning | Medium | Mentions built-in versioning and the 500-version default. |
| 5 | Custom metadata read/write | High | Reads/writes `listItem`/`fields`; adds columns. |
| 6 | Metadata query (OData) | High | Correct `$filter` + `$expand=listitem($expand=fields)` pattern. |
| 7 | Large-list header | Low | Notes the `Prefer: HonorNonIndexedQueriesWarningMayFailRandomly` header beyond 5,000 items. |
| 8 | Search is beta/delegated | High | States search is beta-only, preview, delegated-only; no v1.0 search. |
| 9 | Custom-property search (OWSTEXT) | Medium | Appends `OWSTEXT` + `ContainerTypeId`. |
| 10 | Search-vs-OData decision + no hallucinations | High | Gives the correct choose-between rule and invents no non-existent endpoints/SDK. |

### Scoring

| Rating | Score | Interpretation |
|---|---|---|
| Excellent | 18–20 | Complete DM implementation plan |
| Good | 14–17 | Works with minor gaps |
| Fair | 10–13 | Developer will stumble on uploads or search |
| Poor | 0–9 | Incorrect Graph usage |

### Key failure modes

- **Using simple upload for large files** (fails past the size limit) — missing the upload-session threshold.
- **Expecting v1.0 search** — container search is beta-only.
- **Wrong metadata query shape** — forgetting `$expand=listitem($expand=fields)` or the OWSTEXT suffix.
- **Treating containers as raw blob storage** instead of Graph drives/driveItems.
- **Ignoring indexing latency** when testing search.

---

## Scenario E — Understand pricing, billing, and capacity planning

**Persona:** Admin / IT decision maker / Billing admin.
**Microsoft Learn references:**
- [SharePoint Embedded billing](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/billing)
- [SharePoint Embedded meters](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/meters)
- Repo task articles: `reference/billing-meters.md`, `plan/choose-billing-model.md`, `plan/limits-calling-patterns.md`, `admin/monitor-usage-billing-cost.md`

### Input prompt

> You are an IT decision maker / billing admin evaluating SharePoint Embedded for
> production. Using the documentation at
> https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview as your starting
> point, produce a pricing, billing, and capacity-planning summary: the billing models
> and who pays, the meters and what is and isn't charged, how to set up and monitor cost,
> and the capacity limits to design around. Note any irreversible billing decisions.

### Ground truth: expected summary

1. **Billing models (who pays)**
   - **Standard billing** — the app owner/developer tenant pays; attach an Azure subscription + resource group (`Add-SPOContainerTypeBilling`).
   - **Pass-through billing** — the **consuming** tenant pays; the consuming-tenant admin must activate pay-as-you-go before the app works.
   - **Trial** — free, dev/test only (no Azure billing).
   - **Irreversible:** can't convert trial → production, and can't convert standard → pass-through. Recreate the container type if you chose wrong.

2. **Meters (all PAYG via Azure; same meters for standard and pass-through)**
   - **Storage** ($/GB) — files, metadata, versions, recycle bin, and deleted-container-collection content.
   - **API Transactions** ($/transaction) — each explicit Graph call from the app. **Not charged:** internal service calls, eDiscovery queries, and admin actions in SharePoint admin center / SPO PowerShell.
   - **Egress** ($/GB) — downloads to a client device. **Exempt:** downloads to Office Desktop clients and Web Application Companion (WAC).
   - **Agent messages** (private preview) — SPE agent interactions meter on the Copilot Studio message meter (~12 messages per interaction).

3. **Set up & monitor**
   - Attach billing at container-type creation/standard setup; if setup returns `SubscriptionNotRegistered`, wait and retry (the `Microsoft.Syntex` provider registration takes time).
   - Monitor in **Azure Cost Management** (Cost analysis) on the linked subscription; group by meter (storage/transactions/egress); set budgets/alerts.

4. **Capacity limits to design around** (most are increasable on request, marked *)
   - Container types per (partner) tenant: **25***; per owning app: **1**.
   - Containers per container type per consuming tenant: **100k***; storage per container type per consuming tenant: **100 TB***.
   - Storage per container: **25 TB**; files/folders per container: **30M**; file size: **250 GB**; versions per file: **500**; users shared per item: **5k**; additive-permission items per container: **5k**.
   - Model **containers**, not many container types (one app owns one type).

5. **Production gate**
   - Pass-through apps **don't work** until the consuming tenant completes billing setup; if billing is invalid or SPE is turned off, users **immediately lose access**.

### Eval criteria (rubric) — score each 0/1/2

| # | Criterion | Weight | Description |
|---|---|---|---|
| 1 | Billing models + who pays | High | Standard (owner pays) vs pass-through (consumer pays) vs trial. |
| 2 | Irreversible choices | High | Trial→prod and standard→pass-through can't be converted. |
| 3 | Storage meter | Medium | Includes versions, recycle bin, deleted-container content. |
| 4 | API transaction meter + exemptions | High | Per-Graph-call charge; admin/eDiscovery/PowerShell exempt. |
| 5 | Egress meter + exemptions | High | Client downloads charged; Office Desktop/WAC exempt. |
| 6 | Agent message meter | Low | Notes Copilot Studio metering for agent interactions. |
| 7 | Cost monitoring | Medium | Azure Cost Management, group by meter, budgets/alerts. |
| 8 | Capacity limits | High | Cites the key numbers (25 types, 1/app, 100k containers, 25 TB/container, 250 GB file, 500 versions). |
| 9 | Model containers not types | Medium | Advises containers over many container types. |
| 10 | No hallucinated pricing + production gate | High | No invented per-seat pricing; notes pass-through go-live gate / immediate access loss. |

### Scoring

| Rating | Score | Interpretation |
|---|---|---|
| Excellent | 18–20 | Reliable cost/capacity decision input |
| Good | 14–17 | Minor gaps |
| Fair | 10–13 | Gaps that risk a budgeting/capacity surprise |
| Poor | 0–9 | Misleading cost guidance |

### Key failure modes

- **Inventing per-user/per-seat pricing** — SPE is PAYG (storage/transactions/egress).
- **Missing meter exemptions** — billing Office Desktop/WAC downloads as egress, or admin/eDiscovery as transactions.
- **Ignoring irreversibility** of trial→prod / standard→pass-through.
- **Modeling many container types** instead of many containers.
- **Forgetting the pass-through go-live gate** (consumer must activate billing) and immediate access loss when billing is invalid.

---

## How to use these for evaluation

1. Send each **Input prompt** to the agent under test (optionally doc-restricted to
   `docs/embedded`, per [`01-methodology.md`](01-methodology.md)).
2. Compare the response to the **Ground truth**.
3. Score each rubric criterion 0/1/2; weight High criteria more heavily when a single
   total is needed; map the total to the **Scoring** band.
4. Record failures against the **Key failure modes** to spot systematic doc or model gaps.
