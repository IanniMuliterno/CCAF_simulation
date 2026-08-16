# CCA-F Trainer

A browser-based practice simulator for the **Claude Certified Architect – Foundations** exam (CCAR-F).

Open `index.html`. That's the whole setup — no build step, no dependencies, no server.

> **This repository contains no real exam content.** Every question is original, written against the publicly published exam blueprint and its task statements. See [Scope and ethics](#scope-and-ethics).

---

## What it does

- **62 scenario-based questions** across all five domains and all six published scenarios
- **Four modes** — full mock, quick 10, domain drill, scenario focus
- **Options shuffle every session**, with correct answers distributed evenly across A/B/C/D so you learn the reasoning rather than a position
- **Explanations for every item**, including why each distractor fails
- **Scaled-score readout** on the 100–1,000 range with the 720 cut line, plus a per-domain breakdown against blueprint weights
- **Optional timer** at exam pace (2 minutes per question)

## Quick start

```bash
git clone https://github.com/<your-username>/ccaf-trainer.git
cd ccaf-trainer
open index.html          # macOS   (Linux: xdg-open, Windows: start)
```

To share it with a team, enable GitHub Pages on the default branch and send people the URL. No other hosting is needed.

## How to study with it

1. **Baseline.** Run a full mock with instant feedback *off* and the timer *on*. Don't look anything up.
2. **Read the domain breakdown**, not the score. It tells you where to spend time.
3. **Drill your two weakest domains** with instant feedback on, reading every explanation — including the ones you got right, since a lucky guess and real knowledge look identical in the score.
4. **Re-run the mock** a few days later. Options will be in different positions, so you can't coast on recall.

The exam is 60 items in 120 minutes with a 720 cut on a 100–1,000 scale, drawing 4 scenarios from a bank of 6. Domain weights: Agentic Architecture 27%, Claude Code Configuration 20%, Prompt Engineering 20%, Tool Design & MCP 18%, Context Management 15%.

## Repository layout

```
index.html            the app - UI, scoring, shuffling logic
questions.js          the question bank (edit this to contribute)
scripts/validate.js   schema and consistency checks
docs/exam-guide-map.md  how to read the official guide alongside this
docs/mcp-notes.md     study notes on MCP and tool design
CONTRIBUTING.md       question schema, house style, distractor patterns
```

## Contributing

Questions are the point of this repo — more coverage helps everyone. `questions.js` is a plain array; adding one is a few lines. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the schema and the house style, then:

```bash
node scripts/validate.js
```

CI runs the same check on every pull request.

**Please don't contribute remembered exam questions.** See below.

## Scope and ethics

Sitting the exam means accepting a confidentiality agreement: exam content — questions, answer options, and scenarios — is Anthropic's confidential property, and reproducing it in any form can invalidate your result, revoke your credential, and ban you from future exams.

So this repository sticks to material that is safe to share:

- ✅ Original questions written from the **published** task statements and objective descriptions
- ✅ Explanations of publicly documented concepts and product behavior
- ❌ No questions recalled or reconstructed from a real exam sitting
- ❌ No verbatim reproduction of the Exam Guide's own sample questions

If you passed and want to help, the useful contribution is a **new original question targeting an objective you found underrepresented** — not a question you remember seeing.

## Credits and sources

The exam blueprint, domain weights, scenarios and task statements this trainer is built against all come from Anthropic's **Claude Certified Architect – Foundations Exam Guide** (v1.0, CCAR-F), © Anthropic, PBC. Download it free from the [Anthropic Partner Academy](https://www.anthropic.com/partners) — it is the authoritative reference and worth reading in full.

[**docs/exam-guide-map.md**](docs/exam-guide-map.md) maps the guide's own sample questions to the trainer questions covering the same objectives, and lists what to read in priority order.

We deliberately don't reproduce the guide's sample questions here. Public availability isn't a redistribution licence, and attribution addresses credit rather than copyright — so this repo cites the guide and points you to it instead of copying from it. Every practice question here is original.

## Authoritative sources

This is an unofficial study aid. It can be wrong, and it goes stale as the product changes. Always defer to:

- The official **Exam Guide** from the Anthropic Partner Academy — the blueprint of record
- [Claude Code documentation](https://code.claude.com/docs) — CLI flags, commands, skills, MCP configuration
- [Claude API documentation](https://platform.claude.com/docs) — tool use, `tool_choice`, Message Batches

Where the guide and current docs disagree — and they do, on the subagent tool name, `Edit` failure recovery, and `allowed-tools` semantics — see the table in [docs/exam-guide-map.md](docs/exam-guide-map.md#where-the-guide-and-current-product-docs-disagree). Answer the guide on exam day; know the docs for real work.

## License

Code and questions are MIT licensed — see [LICENSE](LICENSE). Not affiliated with, endorsed by, or sponsored by Anthropic or Pearson VUE. "Claude" is a trademark of Anthropic, PBC.
