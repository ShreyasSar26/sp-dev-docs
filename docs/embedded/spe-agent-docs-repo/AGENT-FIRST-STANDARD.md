# SharePoint Embedded — Agent-First Documentation Standard

How to write (and convert) SPE docs so a user can hand them to an AI agent and the agent can perform SPE tasks accurately. Modeled on the **Box developer docs** pattern: a machine-readable **`llms.txt`** index plus **per-page clean Markdown**, each page self-contained and task-oriented.

---

## 1. The two artifacts every agent-first doc set needs

1. **`llms.txt`** (root manifest) — a Markdown index of every doc, grouped by topic, each line `- [Title](page.md): one-line description`. This is what a user pastes/links so the agent can discover the whole set. (Box serves this at `developer.box.com/llms.txt`.)
2. **Per-page `.md`** — every topic as a single self-contained Markdown file. An agent grounds on the page directly; no JS, no nav chrome, no split-across-tabs content.

> The Microsoft Learn equivalent: publish an `llms.txt` for `/sharepoint/dev/embedded/`, and expose each page's raw Markdown (Learn pages already have a backing `.md`). The conversion below is what makes each page *agent-ready* rather than just *available*.

---

## 2. Page structure (the template)

Every task page follows this shape (concept pages drop Steps/Errors):

```markdown
---
title: <human title>
slug: <stable-slug>
persona: developer | admin | all          # who can do this — the persona boundary
scenario_ids: [D2]                          # links to the eval scenarios
source_of_truth: https://learn.microsoft.com/.../<page>   # canonical citation
last_verified: 2026-06-23
agent_ready: true
---

# <Title>

> <one-sentence description>                 # ranked first by retrieval

**Agent task:** <what the agent should accomplish using this page>

## Prerequisites            # permissions/scopes/roles, explicit
## Steps                    # numbered; each with the EXACT Graph call in a code block
## Parameters              # table: field | required | notes   (where useful)
## Errors & limits         # status codes, throttling, async/provisioning
## <Boundary/Rule>         # persona limits, "never bypass", "don't fabricate"
## Related                 # links to sibling .md pages

---
*Agent-first reformat. Verify facts against source_of_truth.*
```

---

## 3. The ten rules that make a page agent-ready

Each rule maps to a scoring dimension in `SPE-Grounding-Spec.json`, so a page written to this standard makes a grounded answer pass the harness.

1. **Lead with the answer** in one sentence under the title — retrieval ranks it first. *(Correctness)*
2. **One fact per section with a stable `{#anchor}`** — anchors are what citations point at. *(Citation)*
3. **Inline the exact endpoint/parameters** in a code block — never "call the relevant API". *(Correctness, Grounding)*
4. **State the required permission/scope and the persona** ("admin action", "developer cannot self-grant"). *(Permission, Persona)*
5. **State async / throttling / error behavior** (provisioning poll, `429`/`Retry-After`, delta). *(Robustness)*
6. **Mark runtime-only facts** ("usage comes from the report", "query the audit log") so the agent cites a source instead of inventing values. *(Grounding)*
7. **Encode safety rules in prose** the agent will repeat: "never disable/weaken a DLP policy", "confirm before tenant-wide changes". *(Safety)*
8. **`source_of_truth` + `last_verified` in frontmatter** give a citable, dated source — closes the citation gap. *(Citation)*
9. **`scenario_ids` + `persona` in frontmatter** let agents (and the eval harness) select the right page and boundary. *(Persona)*
10. **`Related` links use `.md` paths** so the agent can traverse the set the way it traverses `llms.txt`.

---

## 4. Converting an existing Learn page

1. Strip nav/JS; keep the prose, tables, and code.
2. Add the frontmatter block (rules 8–9).
3. Rewrite the intro to **lead with the answer** (rule 1).
4. Split into the standard sections; give each fact an **anchor** (rule 2).
5. Make every API reference **concrete** (rule 3) and add **permission/persona** + **errors/async** sections (rules 4–5).
6. Add the `source_of_truth` footer and register the page in `llms.txt`.
7. **Validate**: ground a test answer on the page and run `spe_eval_harness.py`. If the matching scenario scores ≥ 80% with no anti-assertion violation, the page is agent-ready.

---

## 5. How to hand these to an agent (the consumption pattern)

- **Whole set:** give the agent `llms.txt`; it discovers and fetches the `.md` pages it needs.
- **Single task:** give the agent the one `.md` page plus the runtime grounding prompt (Template B in `SPE-Grounding-Template.md`): *answer only from these sources, cite anchors, route admin actions, never bypass policy.*
- **Verification:** the answer should be scorable by `SPE-Grounding-Spec.json` — that spec is the contract these docs are written to satisfy.

This standard, the `llms.txt`, and the 26 converted pages in this folder are a complete, working example of the target state for all of SPE's Learn documentation.
