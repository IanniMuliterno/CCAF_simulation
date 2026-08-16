# Reading the official Exam Guide alongside this trainer

Everything in this repository derives from Anthropic's **Claude Certified Architect – Foundations Exam Guide** (version 1.0, exam code CCAR-F). The guide defines the domains, weights, scenarios and task statements that these practice questions are written against. It is the authoritative source; this trainer is a study aid built on top of it.

**Get the guide** from the [Anthropic Partner Academy](https://www.anthropic.com/partners) certification page for CCA-F. It's free and it's the single highest-value thing you can read before sitting the exam.

## Why this repo doesn't reproduce the guide's sample questions

Section 9 of the guide contains twelve worked sample questions with official answers and explanations. They're excellent, and you should read them **in the guide itself**.

We don't copy them here. The guide being publicly downloadable makes it available to read, not free to republish — attribution addresses credit, not copyright. Reproducing a substantial portion of someone else's document in a third-party repository is a different act from citing it, however carefully we credit the source.

So instead: the map below tells you which concepts those samples test, and which questions in this trainer exercise the same objective with original scenarios. Read the guide's samples for the authoritative reasoning; use these to practice.

## Concept map

| Guide § 9 sample tests | Trainer questions on the same objective |
|---|---|
| Programmatic enforcement vs prompt instructions for a required tool sequence | `CS4` — hook blocking over-limit refunds |
| Tool descriptions as the primary selection signal | `P6`, `DP3` — near-identical descriptions; MCP tool losing to a built-in |
| Escalation calibration with explicit criteria | `P5`, `CS5`, `MR1` — miscalibration in both directions; honoring an explicit request; valid triggers |
| Project vs user scope for custom commands | `P1` — a contractor who cloned the repo has no command |
| Plan mode for large, architecturally ambiguous work | `G7`, `CC6`, `F6` — irreversible migration with an approval gate; single-file fix; large but unambiguous rename |
| Path-scoped rules with glob patterns | `P2` — Terraform plus migrations scattered across services |
| Non-interactive CLI invocation for CI | `G10` — hangs, runaway turns, unparseable output |
| Message Batches API vs synchronous | `P3` — nightly audit vs blocking agentic triage |
| Splitting large reviews into focused passes | `P4` — recall trade-off across competing concerns |

## What to read in the guide, in priority order

1. **§ 6, Detailed Objectives by Domain** — the task statements every exam item is written against. If you only read one section, read this one.
2. **§ 9, Sample Questions** — twelve items with official reasoning. Study *why* each distractor fails; the patterns recur throughout the exam.
3. **§ 5, Exam Scenarios** — the six production contexts. Four appear on any given sitting.
4. **§ 4, Blueprint** — domain weights, so you know where the marks are.
5. **§ 17, Appendix** — the in-scope and out-of-scope lists. The out-of-scope list is genuinely useful for not wasting study time.

## Where the guide and current product docs disagree

The guide is the exam's reference, but the product has moved since. Answer the guide on exam day; know the docs for real work.

| Topic | Exam Guide | Current docs |
|---|---|---|
| Tool that spawns subagents | `Task` | `Agent` |
| `Edit` fails on a non-unique match | Fall back to Read + Write | Widen `old_string`, or set `replace_all: true` |
| Skill `allowed-tools` | Described as restricting tool access | Pre-approves tools for the turn; `disallowed-tools` restricts |
| CLI cost and turn limits | Not covered | `--max-turns`, `--max-budget-usd`, `--permission-mode` |

The last row matters: candidates report items on CLI controls the guide never documents. Read the [CLI reference](https://code.claude.com/docs/en/cli-reference) directly.

---

*The Claude Certified Architect – Foundations Exam Guide is © Anthropic, PBC. This repository is not affiliated with or endorsed by Anthropic or Pearson VUE, and contains no confidential exam content.*
