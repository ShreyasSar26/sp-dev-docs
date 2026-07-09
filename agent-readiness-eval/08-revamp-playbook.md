# SharePoint Embedded docs revamp — playbook & reference

**Purpose.** This is the canonical reference for *how* and *why* the SharePoint Embedded (SPE) documentation was
restructured from its legacy layout into the task-based information architecture (IA). Any agent (or human) that
needs to regenerate, extend, or validate the structure should start here. It captures the principles, the
source→target mapping, the authoring rules, and the validation loop — enough to reproduce the revamp from
scratch.

> Scope: everything under `docs/embedded`. The legacy folders (`development/`, `administration/`,
> `getting-started/`, `compliance/`) are intentionally **retained** as deep-dive sources and are not deleted.

---

## 1. Goals (the "why")

The revamp optimizes for **two readers at once**: humans landing cold, and **AI coding agents** asked to perform
an SPE task by reading the docs. Five governing principles:

1. **Persona delineation without forking the road.** Cleanly separate **developers** (build apps) from **admins**
   (install/govern apps on a tenant), while still serving secondary personas (IT decision-makers, architects,
   billing/SharePoint/compliance admins). Do this with **one routing entry point**, not parallel doc trees.
2. **Entry point routes, it doesn't teach.** The top-level `overview.md` is a **router**: "What is SPE?" + a
   persona/task table that sends each reader to the right node. It carries minimal conceptual payload.
3. **Task-based organization (the core principle).** Organize and order content by the **jobs people come to do**
   (get started, create a container type, open Office files, add a Copilot agent, set up billing, install an app,
   apply compliance controls…), not by feature or API surface.
4. **Agent-readiness as a first-class requirement.** Right-sized articles that fit comfortably in a context
   window, predictable headings, explicit prerequisites/next-steps, an `llms.txt` index, and stable relative
   links. The doc set must let an agent answer SPE questions and execute tasks **grounded only in the docs**.
5. **Correctness against the live product docs.** Every claim is validated against
   `https://learn.microsoft.com/sharepoint/dev/embedded/overview` and its descendants.

---

## 2. Target information architecture

The doc set is six top-level nodes, ordered along the **customer journey** (decide → plan → build → ship →
operate → look up):

```
SharePoint Embedded
├─ Overview                         # route + orient (router entry point)
│  ├─ What is SharePoint Embedded?
│  ├─ Scenarios and use cases
│  └─ What's new
├─ Plan a SharePoint Embedded solution     # decisions & architecture (pre-code)
├─ Build apps with SharePoint Embedded     # developer tasks (the bulk)
├─ Publish and onboard customers           # ISV go-to-market / multitenant
├─ Install and manage apps                 # admin / operate
└─ Reference                               # look-up: meters, audit, PowerShell, llms.txt
```

On disk this maps to:

| Node | Folder | Articles | Primary persona |
|---|---|---|---|
| Overview | `docs/embedded/*.md` (root) | `overview`, `scenarios-and-use-cases`, `whats-new` | All (routing) |
| Plan | `docs/embedded/plan/` | 7 | Architect / decision-maker / dev |
| Build | `docs/embedded/build/` | 16 | Developer |
| Publish | `docs/embedded/publish/` | 4 | ISV developer |
| Install & manage | `docs/embedded/admin/` | 10 | Admin |
| Reference | `docs/embedded/reference/` | 6 | All |

(Total: ~43 task articles + the router + `llms.txt`.) The authoritative ordering lives in the
**`SharePoint Embedded` node of `docs/toc.yml`** — that node is the single source of truth for the tree; this
playbook explains the reasoning behind it.

---

## 3. How tasks were derived (the method, not just the result)

The task list is not arbitrary. To regenerate it, follow this procedure:

1. **Enumerate the legacy surface.** List every existing article under `development/`, `administration/`,
   `getting-started/`, `compliance/`. Capture what *job* each one helps complete.
2. **Cluster by job-to-be-done, not by feature.** Group articles by the user's intent ("upload and manage
   files", "let users open Office files", "set up billing"), collapsing API-reference-shaped pages into the task
   they serve.
3. **Phrase every node as a task (verb-first) where it's an action.** Concepts in Plan/Reference can be noun
   phrases ("Understand container types"); everything in Build/Publish/Install is an imperative ("Create and
   configure a container type", "Grant admin consent and permissions").
4. **Assign each task to exactly one journey stage** (Plan/Build/Publish/Install) and one primary persona.
   Cross-persona needs are handled with links, not duplication.
5. **Order within a node by execution sequence.** Build starts with the quickstart, then container type →
   permissions → auth → containers → files → Office → preview → search → metadata → sharing → webhooks →
   archive → collaboration → agents → migration. A developer can read top-to-bottom and ship.

### Canonical task set (Build node, in order)

`Quickstart (VS Code)` → `Create & configure a container type` → `Register application permissions` →
`Configure authentication & authorization` → `Create & manage containers` → `Upload/download & manage files` →
`Open Office files` → `Preview files` → `Search containers & files` → `Store & query container metadata` →
`Share files & manage permissions` → `Webhooks for changes` → `Archive & restore containers` →
`Real-time collaboration (Fluid)` → `Microsoft 365 Copilot & agent experiences` → `Migrate from Azure Blob`.

---

## 4. Source → target mapping rules

When moving a legacy article into the new IA, apply these rules:

| Legacy location (examples) | New home | Rule |
|---|---|---|
| `getting-started/*` quickstart/setup | `build/quickstart-*`, `build/create-container-type` | First-run tasks live in **Build**. |
| `development/auth*`, `development/sharing-and-perm` | `build/configure-authentication-authorization`, `build/share-files-*` + `plan/authentication-permissions` | Split **concept (Plan)** from **how-to (Build)**. |
| `development/content-experiences/*` (files, search, metadata, Office) | `build/*` task articles | One task = one article. |
| `administration/*` (admin center, PowerShell, billing ops) | `admin/*` | Operator tasks live in **Install & manage**. |
| `administration/billing/meters`, audit lists | `reference/*` | Pure look-up tables → **Reference**. |
| `compliance/*` | `plan/security-compliance-governance` + `admin/*` controls | Strategy in Plan; enforcement steps in Install & manage. |

**Decision heuristics:**
- *Is the reader deciding or doing?* Deciding → **Plan**. Doing (writing code) → **Build**.
- *Does it require tenant-admin rights?* → **Install & manage**.
- *Is it a table you look up, not a procedure you follow?* → **Reference**.
- *Is it ISV-specific (multitenant onboarding, marketplace)?* → **Publish**.
- When a concept and its procedure both exist, **split** them: short concept in Plan that links to the Build/Admin
  how-to. This keeps each article right-sized and single-purpose.

---

## 5. Article authoring contract (agent-readiness)

Every task article follows the same skeleton so agents can parse predictably and so each fits a context window
(target **≈150–400 lines**; split anything larger by sub-task):

```markdown
---
title: <verb-first task>
description: <one sentence, what the reader will accomplish>
---

# <Task title>

<1–2 sentence intro: what this task achieves and for whom.>

## Prerequisites          # explicit, linkable; the #1 thing agents miss otherwise
## Steps / sections       # numbered, imperative; one concept per H2
## (Code/API blocks)      # exact endpoints, permissions, and IDs — no placeholders where a real value exists
## Next steps             # links to the adjacent task(s) in the journey
## Related / Reference    # links into Reference and deep-dive legacy pages
```

Rules that matter most for agents:
- **State prerequisites explicitly** — especially cross-cutting gotchas (container type **registration**,
  admin consent, the **intersection** permission model). These are the steps agents drop when they're implicit.
- **Name exact permissions/APIs/IDs** (`FileStorageContainer.Selected`, `Container.Selected` scope
  `19766c1b-905b-43af-8756-06526ab42875`, the Foundry app ID, the 250 MB upload threshold). Avoid vague
  paraphrases.
- **Use stable relative links** (`../reference/audit-events.md`), never absolute Learn URLs, so link-checking and
  offline agents work.
- **One task per article; one concept per heading.** Don't merge a quickstart with an architecture essay.
- **Don't quote volatile numbers the product docs omit** (e.g., per-message dollar prices) — describe the meter
  instead.

---

## 6. Entry point (router) design

`overview.md` must **route, not teach**. Required elements:
1. A one-paragraph "What is SharePoint Embedded?" answer.
2. A **persona/task routing table**: rows = intents ("I want to build my first app", "I need to install a vendor
   app", "I'm planning architecture", "I manage billing"), columns = the destination node/article.
3. Links to `scenarios-and-use-cases.md` and `whats-new.md`.
4. **No deep API content** — push that to Build/Reference.

The legacy entry URL (`/sharepoint/dev/embedded/overview`) must keep resolving; never rename or move
`overview.md` without redirects.

---

## 7. Machine-readable indexes & TOC wiring

- **`llms.txt`** at `docs/embedded/llms.txt`: a flat, link-rich index of every task article grouped by node,
  following the llms.txt convention so an agent can discover the whole set from one file.
- **`docs/toc.yml`**: the SPE node (search for `- name: SharePoint Embedded`) encodes the human-facing tree.
  Splice the six-node structure in as a single top-level node; keep child `href`s relative to `embedded/`.
- Keep `llms.txt` and `toc.yml` **in sync** — every article appears in both.

---

## 8. Validation loop (how "done" is proven)

Run these gates after any structural change; do not consider the revamp complete until all pass:

1. **Structural scorer** — `files/score_docs.py` scores all task articles on 4 dimensions
   (front-matter, headings, size/right-sizing, links). Target **100/100**, all articles present.
2. **Relative-link integrity** — 0 broken of all relative links under `docs/embedded`.
3. **Entry-link integrity** — `overview.md` and `docs/index.yml` hub cards resolve (a broken hub card was found
   and repointed to `build/quickstart-vscode` during the revamp).
4. **Q&A agent campaigns** — doc-restricted agents answer persona queries (21-query and 54-query banks). Target
   **100%**; fix any gap in the offending article, then re-test.
5. **Scenario audit** — doc-restricted agents execute the top-5 end-to-end tasks; grade outputs against
   ground-truth rubrics. Target **Excellent** on each.

All evaluation evidence lives in `docs/embedded/agent-readiness-eval/` (methodology, structural scoring, the two
Q&A rounds, scenario ground truths, and the live scenario audit results — final score 98/100, 5/5 Excellent).

---

## 9. Reproduction checklist (for a fresh agent)

To regenerate the structure from the legacy docs:

- [ ] Inventory legacy articles and capture each one's job-to-be-done (§3.1).
- [ ] Cluster into the six-node IA; phrase nodes as tasks (§2, §3).
- [ ] Map each legacy file to its new home using the rules in §4; **split concept vs. procedure**.
- [ ] Rewrite each article to the authoring contract in §5 (prereqs, exact IDs, next steps, relative links).
- [ ] Rewrite `overview.md` as a persona/task router (§6); preserve the legacy URL.
- [ ] Generate `llms.txt` and splice the SPE node into `docs/toc.yml`, kept in sync (§7).
- [ ] Run the full validation loop (§8) and iterate until structural 100/100, links 0-broken, Q&A 100%, and all
      scenarios Excellent.
- [ ] Retain (don't delete) legacy folders as deep-dive sources; link to them from Related sections.

---

## 10. Guardrails / non-goals

- **Don't delete legacy content** — it's the deep-dive layer and a citation source for agents.
- **Don't create persona-parallel trees** — one tree, routed at the top.
- **Don't merge tasks to "save files"** — right-sized, single-purpose articles are the point.
- **Don't introduce absolute Learn links inside articles** — breaks link-checking and offline agents.
- **Don't invent APIs, SDKs, CLIs, permissions, or prices** — every technical claim must trace to the live
  product docs.
