# 02 — Structural scoring

A deterministic Python scorer grades every task article in `docs/embedded` on four
25-point dimensions. It is the fast, repeatable gate that runs before and after every
content change to prevent regressions.

## Rubric (4 × 25 = 100)

| Dimension | What it checks (25 pts each) |
| --- | --- |
| **Structure** | Single H1; YAML front matter with `title`/`description`/`ms.date`; heading hierarchy is well-formed; article is right-sized for a context window (not oversized). |
| **Correctness signals** | Has an `**Applies to:**` audience line; uses concrete API/cmdlet/permission names; code fenced with a language; intro paragraph present before the first H2. |
| **Agent-readiness** | Article fits comfortably in a context window; descriptive `description` for retrieval; explicit visible navigation (`## Next steps` and `## Related resources` / `See also`); stable headings usable as anchors. |
| **Task framing** | Verb-first, task-oriented title (e.g., "Create and manage containers"); imperative steps; one primary task per article. Reference and concept pages (`ms.topic` / `task_type: concept`) are exempt from the verb-first rule. |

### Scorer notes / fixes captured during development

- The `**Applies to:**` audience line is matched with both bold and plain variants.
- Intro detection must not be defeated by `DOTALL` regex (a bug that was found and fixed).
- Cross-link validity does not require a `../` prefix; same-folder `./x.md` links count.
- Navigation recognizes the variants `Next step`/`Next steps`/`Related`/
  `Related resources`/`See also`.

## Result

```
structure   : 25.00 / 25
correctness : 25.00 / 25
agent       : 25.00 / 25
task        : 25.00 / 25
  TOTAL     : 100.00 / 100
  Perfect articles: 43/43

=== ARTICLES WITH DEDUCTIONS / ISSUES ===
  (none)
```

The score was re-run after the stress-test fixes (see file 04) and remained
**100.00 / 100, 43/43 perfect**, confirming no regression.

## Articles graded (43)

Spread across the task-based information architecture:

| Section | Count | Examples |
| --- | --- | --- |
| Overview | 3 | `overview.md`, `scenarios-and-use-cases.md`, `whats-new.md` |
| Plan | 7 | `app-tenant-architecture.md`, `choose-app-model.md`, `authentication-permissions.md`, `limits-calling-patterns.md` |
| Build | 16 | `quickstart-vscode.md`, `create-container-type.md`, `manage-files.md`, `open-office-files.md`, `search-containers-files.md`, `agent-experiences.md` |
| Publish | 4 | `prepare-customer-installation.md`, `validate-customer-installation.md` |
| Install & manage (admin) | 10 | `admin-overview.md`, `install-sharepoint-embedded-app.md`, `manage-containers-powershell.md`, `review-audit-events.md` |
| Reference | 6 | `billing-meters.md`, `audit-events.md`, `troubleshooting.md`, `glossary.md` |

## Link integrity

A separate pass walks every relative Markdown link (`[..](../x.md)` and `./x.md`) under
`docs/embedded` and resolves it against the filesystem.

```
relative md links checked = 297   broken = 0
```

Entry-link integrity was also verified separately:

- `docs/embedded/overview.md` keeps H1 **"What is SharePoint Embedded?"**, so the
  published `/sharepoint/dev/embedded/overview` URL and its `#what-is-sharepoint-embedded`
  anchor do not break.
- `docs/index.yml` (the SharePoint-dev landing hub) — both SPE entry cards resolve
  (Overview → `/embedded/overview`, quickstart → `/embedded/build/quickstart-vscode`).
  A pre-existing broken "Enable SharePoint Embedded" card was repointed to the existing
  quickstart.
- `docs/toc.yml` — 46/46 SPE hrefs resolve.
