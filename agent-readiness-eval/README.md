# SharePoint Embedded docs — agent-readiness evaluation

This folder records how the task-based SharePoint Embedded (SPE) documentation set
was validated for **AI agent readiness**: the ability of a coding/retrieval agent to
find and correctly answer SPE questions using only the docs, with no outside knowledge.

These records are kept for **training and reproducibility**. They capture the exact
prompts, raw agent outputs, grading rubric, scores, the gaps that were found, and the
doc fixes that closed them.

> These files are evaluation artifacts. They are intentionally outside `docs/` and are
> **not** part of the published documentation TOC.

## Contents

| File | What it documents |
| --- | --- |
| [`01-methodology.md`](01-methodology.md) | How the evaluation was designed and run; scoring rubric; tooling |
| [`02-structural-scoring.md`](02-structural-scoring.md) | Automated 4-dimension structural scorer and its 100/100 result |
| [`03-qa-round1-21-queries.md`](03-qa-round1-21-queries.md) | First Q&A campaign: 21 persona queries, two rounds |
| [`04-qa-stress-test-54-queries.md`](04-qa-stress-test-54-queries.md) | Stress test: 54 edge-case queries (incl. negative probes), full prompts + raw outputs + grading |

## Headline results

| Evaluation | Round 1 | Round 2 (after fixes) |
| --- | --- | --- |
| Structural scorer (43 articles × 4 dims) | 100.00 / 100 | 100.00 / 100 |
| Q&A campaign (21 persona queries) | 21/21 correct, ~93.7% quality | 21/21, **100%** |
| Stress test (54 edge-case queries) | 153 / 162 (**94.4%**) | 162 / 162 (**100%**) |
| Relative-link integrity (`docs/embedded`) | — | 0 broken / 297 checked |

## Grading scale (Q&A campaigns)

Each query is scored 0–3 on whether a doc-restricted agent could answer it:

| Score | Meaning |
| --- | --- |
| 3 | Complete + correct, cited the intended task article, easy to find |
| 2 | Correct but partial, hard to find, or cited a legacy/secondary file |
| 1 | Answer missing or materially incomplete (real content gap) |
| 0 | Wrong/hallucinated answer |

"Negative probe" queries (deliberately asking for facts not in the doc set) score **3**
when the agent honestly answers "not in docs" instead of inventing an answer.
