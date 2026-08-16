# MCP — CCA-F Study Notes

Scoped to what the exam guide actually tests. MCP is the core of **Domain 2 (18%)** but also surfaces in Domain 3 (server config in Claude Code), Domain 1 (tools inside agentic loops, hooks over tool results), and Domain 5 (error propagation between agents).

---

## 1. Tool descriptions — the single most tested idea

**The principle:** tool descriptions are the *primary mechanism the model uses to select a tool*. Minimal descriptions cause unreliable selection among similar tools.

A good description contains four things:

1. What the tool does and its purpose boundary
2. Input formats it accepts
3. Example queries that should route to it
4. **When to use it versus the similar-looking alternative**

That fourth item is what separates a right answer from a plausible one.

**Fix hierarchy when tool selection misfires:**

| Situation | Correct response |
|---|---|
| Descriptions are thin/minimal | Expand descriptions — the low-effort, high-leverage first step |
| Two tools functionally overlap | Rename + rescope (`analyze_content` → `extract_web_results` with a web-specific description) |
| One tool is too generic | Split into purpose-specific tools with defined I/O contracts (`analyze_document` → `extract_data_points`, `summarize_content`, `verify_claim_against_source`) |
| Descriptions are already good but misrouting persists | **Check the system prompt for keyword-sensitive instructions** |
| Agent prefers built-in Grep over a better MCP tool | Enhance the MCP tool's description to explain capabilities and outputs in detail |

**The system-prompt trap.** Keyword-sensitive wording can override well-written descriptions. A prompt saying "always begin by extracting the most relevant web results" will pull work toward a tool named `extract_web_results` no matter how clean the other description is. If a question states the descriptions were already fixed, the answer is upstream in the prompt.

**Watch for:** questions asking for the "most effective **first step**." Consolidating or splitting tools may be architecturally valid but is too much effort for a first step when descriptions are the obvious gap.

---

## 2. Tool distribution across agents

- Giving an agent ~18 tools instead of the 4–5 it needs **degrades selection reliability by increasing decision complexity**. This is the stated cause, not context-window pressure and not prompt conflicts.
- Agents holding tools outside their specialization tend to misuse them (synthesis agent attempting web searches).
- **Scoped tool access** is the fix: each agent gets only its role's tools.
- **Limited cross-role tools** are allowed for specific high-frequency needs — e.g. a scoped `verify_fact` for the synthesis agent covering simple lookups, while complex verification still routes through the coordinator. This is least privilege, not a loophole.
- Replace generic tools with constrained ones: `fetch_url` → `load_document` that validates document URLs.

**Exam framing:** "give it all the tools so it can handle anything" is always wrong (over-provisioning, breaks separation of concerns). So is "remove the capability entirely" when a scoped version would serve the common case.

---

## 3. `tool_choice`

| Value | Behavior | Use when |
|---|---|---|
| `"auto"` | Model may call a tool **or** return plain text | Default conversational behavior |
| `"any"` | Model **must** call some tool, chooses which | You need guaranteed structured output and several extraction schemas exist / document type unknown |
| `{"type":"tool","name":"..."}` | Model must call **that specific** tool | Forcing a specific step first, e.g. `extract_metadata` before enrichment — then handle subsequent steps in follow-up turns |

Note the pattern for forced selection: force the first tool, then continue in **follow-up turns**. A single forced call doesn't chain a whole pipeline.

---

## 4. Structured error responses

The MCP mechanism is the **`isError` flag**. What matters for the exam is what you put *alongside* it.

**Error categories:**

- **Transient** — timeouts, service unavailable → retryable
- **Validation** — invalid input
- **Business** — policy violations → *not* retryable
- **Permission** — access denied

**Return structured metadata:**

- `errorCategory` (transient / validation / permission)
- `isRetryable` boolean — prevents wasted retry attempts on non-retryable failures
- Human-readable description
- For business-rule violations: `retriable: false` **plus a customer-friendly explanation** so the agent can communicate appropriately

**Why uniform errors fail:** a generic "Operation failed" strips the agent of the information it needs to choose a recovery path. Same reason a generic "search unavailable" status hides valuable context from a coordinator.

**Critical distinction — access failure vs. valid empty result.** A timeout needs a retry decision; a successful query returning no matches is a legitimate answer. Collapsing these is a tested error.

---

## 5. Error propagation in multi-agent systems

Structured error context should include:

1. Failure type
2. What was attempted (the query)
3. Partial results
4. Potential alternative approaches

**Local recovery first.** Subagents handle transient failures themselves and propagate only what they can't resolve — with what was attempted and any partial results. This keeps coordinators out of routine error handling.

**Two anti-patterns, both tested:**

- **Silently suppressing** errors (returning empty results marked successful) — prevents recovery, risks incomplete output presented as complete
- **Terminating the entire workflow** on a single failure — when partial results plus coverage annotations would have sufficed

When sources are unavailable, synthesis output should carry **coverage annotations** distinguishing well-supported findings from gap areas.

---

## 6. Server configuration in Claude Code

| Scope | File | Purpose |
|---|---|---|
| **Project** | `.mcp.json` | Shared team tooling, version-controlled |
| **User** | `~/.claude.json` | Personal / experimental servers |

- **Environment variable expansion** in `.mcp.json` (e.g. `${GITHUB_TOKEN}`) handles credentials **without committing secrets**. Never inline a raw token.
- Tools from **all configured servers are discovered at connection time and available simultaneously** — project and user servers coexist.
- **Build vs. adopt:** use existing community MCP servers for standard integrations (Jira); reserve custom servers for team-specific workflows.

**Explicitly out of scope:** deploying or hosting MCP servers — infrastructure, networking, container orchestration. Don't over-study this.

---

## 7. Resources vs. tools

This distinction is easy to miss and directly tested.

- **Tools = actions.** Things the agent invokes to do or fetch something.
- **Resources = content catalogs.** Issue summaries, documentation hierarchies, database schemas — exposed so the agent can **see what data is available without making exploratory tool calls**.

If a scenario describes an agent burning calls just discovering what exists, and the catalog is stable and enumerable, the answer is a **resource**, not another tool and not a custom retrieval index.

---

## 8. Built-in tools (tested alongside MCP in Domain 2)

| Tool | Use for |
|---|---|
| **Grep** | Content search — function names, error messages, import statements |
| **Glob** | File **path/name** pattern matching — `**/*.test.tsx` |
| **Read / Write** | Full-file operations |
| **Edit** | Targeted modification via **unique** text matching |

- **Edit fails on non-unique text → fall back to Read + Write.** Memorize this.
- **Build understanding incrementally:** Grep to find entry points, then Read to follow imports and trace flows — *not* reading every file upfront.
- Tracing usage across wrapper modules: identify all exported names first, then search for each across the codebase.

Grep searches *contents*; Glob searches *paths*. Questions exploit the confusion.

---

## 9. Where MCP meets hooks (Domain 1 crossover)

Different MCP tools return heterogeneous formats — Unix timestamps, ISO 8601, numeric status codes. **`PostToolUse` hooks intercept and normalize tool results before the model processes them.**

The governing rule: **hooks give deterministic guarantees; prompts give probabilistic compliance.** When a business rule must always hold — blocking refunds over $500, requiring `get_customer` before `process_refund` — use a hook or programmatic prerequisite, never prompt instructions or few-shot examples.

---

## 10. Answer-selection heuristics for MCP questions

Distractors in the official samples are built from recurring patterns. Recognizing the pattern is often faster than reasoning from scratch:

- **Over-engineered** — a routing layer, a trained classifier, a custom index, an ML pipeline, when a description rewrite or config change solves it. Especially wrong when the stem says "first step."
- **Probabilistic where deterministic is required** — prompt instructions or few-shot examples for guarantees involving money, identity, or policy.
- **Solves a different problem** — addresses tool *availability* when the issue is tool *ordering*.
- **Blames a component the stem exonerates** — if the stem says descriptions were fixed or subagents executed correctly, don't blame them.
- **Non-existent feature** — invented flags and env vars (`--batch`, `CLAUDE_HEADLESS`).
- **Hides or suppresses information** — generic error statuses, empty-as-success.
- **Post-hoc reconstruction** — recovering metadata after it was already discarded, instead of preserving it by design.
- **Shifts burden to humans** — "require developers to…" rarely wins.
- **Speculative** — caching or predicting what will be needed later.

**Two reliable tiebreakers:**

1. Prefer the fix that addresses the **root cause** over one that mitigates symptoms or merely documents them.
2. Match the **effort to the ask** — "first step" and "most effective" reward proportionate responses.

---

## 11. Rapid self-check

Answer these without looking:

1. Two similar tools misroute. Descriptions are minimal. First step?
2. Descriptions are already detailed and distinct, yet misrouting persists. Where do you look?
3. Where does a shared team MCP server go, and how do you handle its API token?
4. Agent makes 10 exploratory calls just to learn what documents exist. Fix?
5. What three things beyond a message go in a structured MCP error response?
6. Difference between a timeout and an empty result set — why does it matter?
7. `Edit` fails because the anchor text appears three times. Next move?
8. Synthesis agent needs simple fact-checks 85% of the time. Give it all search tools?
9. `tool_choice: "any"` vs forced tool selection — when each?
10. Business rule: no refunds over $500, ever. Prompt or hook?

<details>
<summary>Answers</summary>

1. Expand each description with input formats, example queries, edge cases, and when to use it vs. the alternative.
2. The system prompt — keyword-sensitive instructions override tool descriptions.
3. Project-scoped `.mcp.json`, with environment variable expansion (`${TOKEN}`) so no secret is committed.
4. Expose the catalog as an **MCP resource**.
5. `errorCategory`, `isRetryable`, and partial results / what was attempted.
6. A timeout is an access failure needing a retry decision; an empty result is a successful query with no matches. Conflating them causes wrong recovery decisions.
7. Read the full file, then Write it back with the change.
8. No — give it a scoped `verify_fact` tool for the common case; complex verification still routes through the coordinator.
9. `"any"` guarantees *some* tool call when the schema/document type is unknown; forced selection guarantees a *specific* tool runs first, with later steps in follow-up turns.
10. Hook (tool-call interception). Prompts have a non-zero failure rate.

</details>

---

*Derived from the CCA-F Exam Guide v1.0 (Domain 2 task statements 2.1–2.5, plus MCP-relevant material in Domains 1, 3 and 5) and the answer patterns in its sample questions.*
