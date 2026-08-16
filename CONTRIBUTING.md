# Contributing

The most valuable contribution is a **new original question** covering an objective the bank is thin on. Bug fixes and clearer explanations are welcome too.

## Before you write anything

Please read [Scope and ethics](README.md#scope-and-ethics). Questions recalled from a real exam sitting will be rejected — they put both you and everyone who studies from them at risk. Write from the published task statements instead.

## The schema

Add an object to the array in `questions.js`:

```js
{
  id:"D2-tooldesc-01",       // unique, any string
  scen:"MA",                 // CS | CC | MA | DP | CI | DE
  dom:"D2",                  // D1 | D2 | D3 | D4 | D5
  src:"modeled",             // modeled | modeled-adv | modeled-gap
  stem:`The question text. <code>inline code</code> and <b>bold</b> are fine.`,
  opts:[
    `The correct option.`,
    `A distractor.`,
    `Another distractor.`,
    `A fourth distractor.`],
  correct:[0],               // indices into opts
  exp:`Why the answer is right, then why each distractor fails.`
}
```

| Field | Notes |
|---|---|
| `scen` | `CS` support agent · `CC` code generation · `MA` multi-agent research · `DP` developer productivity · `CI` continuous integration · `DE` data extraction |
| `dom` | D1 Agentic Architecture · D2 Tool Design & MCP · D3 Claude Code Config · D4 Prompt Engineering · D5 Context Management |
| `src` | `modeled` standard · `modeled-adv` higher complexity · `modeled-gap` targets a specific objective. Shown as a badge on the question |
| `multi` | Set `multi:true` for multiple-response items, and state the count in the stem ("**Select TWO.**"). The real exam includes these |

### Options are shuffled — never write letters in explanations

Options are reordered every session, so `"Option B is wrong because..."` will point at the wrong thing. Reference distractors with `{n}` tokens, where `n` is the option's index **as written in the array**:

```js
opts:[
  `Add a PostToolUse hook that normalizes the formats.`,   // index 0
  `Document the formats in the system prompt.`,            // index 1
  `Add few-shot examples showing conversions.`],           // index 2
exp:`A hook makes normalization deterministic. {1} and {2} push a
     mechanical conversion into probabilistic model behavior.`
```

At render time `{1}` becomes whatever letter that option landed on. The validator rejects literal letter references.

You can put the correct answer at any index — the shuffler handles distribution.

## House style

Questions should reward reasoning, not recall. The pattern the real exam uses:

**Stems** describe a concrete production situation with specific numbers — a failure rate, a latency figure, a file count — and ask for the *most effective* fix, the *primary cause*, or the *best first step*. Where possible, include a detail that eliminates a plausible answer, so a careful reader can rule it out from the evidence.

**Distractors** should be things a competent architect might actually choose. These patterns recur:

| Pattern | Example |
|---|---|
| Over-engineered for the ask | A trained classifier when a description rewrite would do |
| Probabilistic where deterministic is needed | A prompt instruction for a financial guardrail |
| Solves a different problem | Fixes tool *availability* when the issue is tool *ordering* |
| Blames a component the stem exonerates | Stem says descriptions were already fixed |
| Non-existent feature | An invented flag or setting |
| Shifts burden to humans | "Require developers to..." |
| Hides information | Generic error status, empty-result-as-success |
| Post-hoc reconstruction | Recovering metadata already discarded |
| Reduces but doesn't eliminate | "Increase breadth to lower the chance of missing it" |

Use two or three different patterns per question rather than four of the same. Avoid joke options — every distractor should cost a careless reader a point.

**Explanations** say why the answer is right, then why each distractor fails. Name the principle, not just the verdict.

## Before opening a pull request

```bash
node scripts/validate.js
```

This checks structure, answer indices, token references, and multi-response flags, and prints domain coverage against blueprint weights. CI runs it on every PR.

If coverage drift is flagged, consider whether your question fits a thinner domain — the bank should stay roughly proportional to the real exam's weighting.

## Reporting a wrong answer

Open an issue with the question `id`, what you think the answer should be, and a link to the documentation or guide text supporting it. Product behavior changes; some items will go stale. Corrections backed by a source are always welcome.
