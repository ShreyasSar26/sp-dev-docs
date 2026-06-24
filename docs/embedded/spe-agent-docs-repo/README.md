# SharePoint Embedded — Agent-Ready Docs

Agent-first documentation for **SharePoint Embedded (SPE)**, converted from the official
Microsoft Learn docs (`SharePoint/sp-dev-docs`) and the Microsoft Graph API reference.
Hand these to an AI agent (Copilot, Copilot Studio, or any LLM) so it can perform SPE
tasks — containers, files, permissions, search, Copilot grounding, and Microsoft Purview
compliance — grounded on documentation rather than guesswork.

## What's here
- **[llms.txt](llms.txt)** — the agent-consumable manifest. Point your agent at this file;
  it lists every page, grouped by topic, with the task scenarios each supports.
- **56 self-contained `.md` pages** — each with front matter (`persona`, `scenario_ids`,
  `source_of_truth`, `last_verified`), a lead answer, prerequisites, exact Microsoft Graph
  calls, errors/throttling, and the developer/admin persona boundary.
  - 38 conceptual/how-to pages (root).
  - 18 Microsoft Graph API reference pages in [`graph-api/`](graph-api/).
- **[AGENT-FIRST-STANDARD.md](AGENT-FIRST-STANDARD.md)** — the authoring standard and the
  procedure for converting a Learn page to agent-first format.

## How to use
- **Whole set:** give your agent `llms.txt`; it discovers and reads the pages it needs.
- **Single task:** give it the one page plus a grounding instruction ("answer only from this
  source, cite it, route admin actions, never bypass policy").

## Provenance & verification
Content is reformatted from the `live` branch of `SharePoint/sp-dev-docs` and the
`microsoftgraph/microsoft-graph-docs-contrib` Graph reference as of 2026-06-23. Each page
links back to its `source_of_truth` on Microsoft Learn. The SPE container-management APIs
are currently **beta** (`graph.microsoft.com/beta/...`) — verify against the source links
before relying on them, and re-check when the APIs reach GA.
