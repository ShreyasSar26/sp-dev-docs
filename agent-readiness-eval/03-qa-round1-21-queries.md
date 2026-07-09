# 03 — Q&A campaign: 21 persona queries

The first empirical campaign tested whether doc-restricted agents could answer realistic
questions from the core SPE personas (new developer, developer, architect, admin, ISV,
compliance, billing, and an undecided "router" user). 21 queries were split into 5
groups and run by parallel doc-restricted agents, then graded 0–3.

## Agent prompt (template)

Each agent received this instruction plus its group's questions:

> You are evaluating whether a documentation set can answer SharePoint Embedded (SPE)
> questions. You may ONLY read files under `docs/embedded`. Do NOT use outside knowledge.
> Simulate a coding agent doing keyword retrieval: use grep/glob within that folder to
> FIND the answer, then read the matching article. If the docs genuinely do not contain
> the answer, say so honestly — do not invent it.
>
> For EACH question output one block:
> `QID / ANSWER / CITED / FINDABILITY / SUFFICIENCY / GAP`.

## Queries, expected article, and grades

| QID | Persona | Question | Intended article | R1 | R2 |
| --- | --- | --- | --- | --- | --- |
| q01 | dev-new | I am brand new to SPE. How do I build my first app? | `build/quickstart-vscode.md` | 3 | 3 |
| q02 | dev | How do I let my app users open and edit Word/Office files from my app? | `build/open-office-files.md` | 3 | 3 |
| q03 | dev | What permission lets my app read content in containers and how do I grant it? | `build/register-application-permissions.md` | 3 | 3 |
| q04 | dev | How do I get notified when a file changes in a container? | `build/respond-to-changes-webhooks.md` | 3 | 3 |
| q05 | dev | How do I create a container type and what is its relationship to my app? | `build/create-container-type.md` | 3 | 3 |
| q06 | dev | How do I search across files in my containers? | `build/search-containers-files.md` | 3 | 3 |
| q07 | dev | How do I archive an inactive container and reactivate it later? | `build/archive-restore-containers.md` | 3 | 3 |
| q08 | dev | How do I add custom metadata columns to containers and query them? | `build/container-metadata.md` | 2 | 3 |
| q09 | architect | Single-tenant vs multitenant: which app model should I choose? | `plan/choose-app-model.md` | 3 | 3 |
| q10 | architect | Who pays for storage, me or my customer? What billing models exist? | `plan/choose-billing-model.md` | 3 | 3 |
| q11 | architect | What size and throughput limits should I design around? | `plan/limits-calling-patterns.md` | 2 | 3 |
| q12 | admin | As a tenant admin, how do I install a vendor SPE app in my tenant? | `admin/install-sharepoint-embedded-app.md` | 3 | 3 |
| q13 | admin | How do I set up billing for an SPE app in my tenant? | `admin/setup-billing-m365-admin-center.md` | 3 | 3 |
| q14 | admin | How do I manage SPE containers with PowerShell? | `admin/manage-containers-powershell.md` | 3 | 3 |
| q15 | admin | What admin role do I need to manage SharePoint Embedded? | `admin/admin-overview.md` | 2 | 3 |
| q16 | compliance | How do I find audit events for SPE container type activity? | `admin/review-audit-events.md` | 3 | 3 |
| q17 | isv | I built an app. How do I prepare it for a customer to install? | `publish/prepare-customer-installation.md` | 3 | 3 |
| q18 | billing | What does SPE charge for? What are the billing meters? | `reference/billing-meters.md` | 3 | 3 |
| q19 | compliance | How do I apply a sensitivity label or block download on a container? | `admin/apply-security-compliance-controls.md` | 3 | 3 |
| q20 | dev | I get access denied / SubscriptionNotRegistered. How do I fix it? | `reference/troubleshooting.md` | 3 | 3 |
| q21 | router | I do not know if I am a developer or admin. Where do I start? | `overview.md` | 2 | 3 |

## Round 1 result

- **21/21 answered correctly**, overall quality ≈ **93.7%**.
- Four weaknesses surfaced (all scored 2, "correct but partial / mis-cited"):

| # | QID(s) | Weakness | Decision |
| --- | --- | --- | --- |
| A | several | Legacy folders (`development/`, `administration/`, `getting-started/`, `compliance/`) compete in keyword search and were sometimes cited instead of the new task article. | **Benign** — answers were still correct; legacy files are intentionally retained as deep-dive sources. Not deleted (out of scope, risky). |
| B | q21 | Router page lacked an explicit developer-vs-admin role identifier. | **Fixed** — added a "Not sure which path?" tip that splits on "do you write code, or manage a tenant?" |
| C | q08 | OWSTEXT custom-property search syntax lived only in the search article; the metadata article didn't cross-link to it. | **Fixed** — added a cross-link from `container-metadata.md` to `search-containers-files.md`. |
| D | q11 | The word "throughput" was absent and the limit-increase process was undocumented. | **Fixed** — added throughput/resource-unit wording and limit-increase guidance to `limits-calling-patterns.md`. |

## Fixes (committed)

The B/C/D fixes were committed as `1288ec1c7`:

- `docs/embedded/overview.md` — dev-vs-admin tip box before the routing table.
- `docs/embedded/build/container-metadata.md` — cross-link to free-text/OWSTEXT search.
- `docs/embedded/plan/limits-calling-patterns.md` — throughput + limit-increase guidance.

## Round 2 result

Re-test of the four weak queries (q08, q11, q15, q21) confirmed every gap closed:
**21/21 full score, 100%.**
