# 01 — Methodology

## Goal

Validate that the restructured, task-based SharePoint Embedded (SPE) documentation is
**agent-ready**: a coding agent that a user delegates an SPE question to should be able
to retrieve the answer from the docs alone, answer correctly, and cite the right task
article — without relying on the model's pre-training.

## Two complementary evaluations

1. **Structural scoring (deterministic).** A Python scorer grades every task article on
   four dimensions (structure, correctness signals, agent-readiness, task framing).
   This catches missing metadata, oversized articles, missing navigation, weak titles,
   and broken cross-links. See [`02-structural-scoring.md`](02-structural-scoring.md).

2. **Empirical Q&A (behavioral).** Real questions are answered by **doc-restricted
   retrieval agents** that may only read files under `docs/embedded`. The agents
   simulate a coding agent doing keyword retrieval: `grep`/`glob` to find a candidate
   article, read it, then answer. Outside/world knowledge is prohibited, and the agent
   must say "NOT IN DOCS" when the answer genuinely isn't present. See
   [`03-qa-round1-21-queries.md`](03-qa-round1-21-queries.md) and
   [`04-qa-stress-test-54-queries.md`](04-qa-stress-test-54-queries.md).

## Why doc-restricted agents

A general model can answer many SPE questions from pre-training, which would hide gaps
in the docs. Restricting the agent to `docs/embedded` forces every answer to be
*grounded in the documentation*, so a wrong or "NOT IN DOCS" result is a true signal of
a documentation gap, not a model limitation.

## Agent output contract

Every Q&A agent returns one structured block per question:

```
QID: <id>
ANSWER: <concise answer from docs, or "NOT IN DOCS">
CITED: <relative path(s) under docs/embedded, or NONE>
FINDABILITY: <EASY | HARD | NONE>   # how easily keyword search located it
SUFFICIENCY: <COMPLETE | PARTIAL | MISSING>
GAP: <what's missing or hard to find, or NONE>
```

`FINDABILITY` and `SUFFICIENCY` separate two distinct failure modes: the content can
exist but be **hard to find** (retrieval problem) or be **findable but incomplete**
(content problem). Both are actionable.

## Grading scale

| Score | Meaning |
| --- | --- |
| 3 | Complete + correct, cited the intended task article, easy to find |
| 2 | Correct but partial, hard to find, or cited a legacy/secondary file |
| 1 | Answer missing or materially incomplete (real content gap) |
| 0 | Wrong / hallucinated answer |

**Negative probes.** Some queries deliberately ask for facts not in the doc set (for
example, SLA, region availability, customer-managed keys). These test *honesty*: an
agent that answers "NOT IN DOCS" scores **3**; one that invents an answer scores **0**.

## Loop

1. Build a query bank with persona, question, expected file, and ground truth.
2. Split queries into groups; run one doc-restricted agent per group in parallel.
3. Grade each answer 0–3; record `FINDABILITY`/`SUFFICIENCY`/`GAP`.
4. For every score < 3 that is a real gap, edit the doc to close it.
5. Re-run the structural scorer and link check to confirm no regression.
6. Re-test the fixed queries with a fresh agent.
7. Commit and record results here.

## Tooling

- **Retrieval agents:** fast explore agents, scoped by prompt to `docs/embedded` only.
- **Structural scorer:** `score_docs.py` (4 × 25-point rubric). Kept with the session
  artifacts; summarized in [`02-structural-scoring.md`](02-structural-scoring.md).
- **Query bank + grades:** stored in a SQLite session database (`qa` for the 21-query
  campaign, `qa2` for the 54-query stress test) and exported into the records here.
- **Link integrity:** a small Python pass over every `[..](../x.md)` relative link in
  `docs/embedded`, checked against the filesystem.

## Reproducing

```powershell
# Structural score (from repo root)
python <path-to>/score_docs.py

# Relative-link integrity over docs/embedded
# (walks every ../*.md and ./*.md link and checks it resolves on disk)
```

Q&A campaigns are reproduced by re-issuing the prompts in files 03 and 04 to a
retrieval agent restricted to `docs/embedded`, then grading with the scale above.
