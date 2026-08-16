/* CCA-F Trainer - question bank.
   Original items written against the published exam blueprint.
   See CONTRIBUTING.md for the schema and how to add your own.
   Run `node scripts/validate.js` before opening a PR. */

window.CCAF_QUESTIONS = [

{id:"CS4",scen:"CS",dom:"D1",src:"modeled",
 stem:`Policy caps autonomous refunds at $500; anything higher must go to a human. You need a guarantee that the agent never issues a refund above that, regardless of how a customer phrases the request. What's the most reliable design?`,
 opts:[
  `A tool-call interception hook that inspects <code>process_refund</code> arguments and blocks any amount over $500, redirecting to the escalation workflow.`,
  `A system-prompt rule instructing the agent never to refund more than $500.`,
  `Few-shot examples that demonstrate declining over-limit refunds.`,
  `Post-hoc auditing that flags over-limit refunds for later reversal.`],
 correct:[0],
 exp:`Guaranteed compliance on a business rule calls for programmatic enforcement — an interception hook deterministically blocks the violating call and reroutes it. Prompt rules ({1}) and few-shot ({2}) are probabilistic. Post-hoc auditing ({3}) lets the bad action happen first. Choose hooks over prompt-based enforcement when the rule must always hold.`},

{id:"CS5",scen:"CS",dom:"D5",src:"modeled",
 stem:`A customer says "This is ridiculous — just give me a human." The requested issue (a delayed refund) is one the agent can resolve on its own. What's the correct escalation behavior?`,
 opts:[
  `Escalate to a human immediately, honoring the explicit request.`,
  `Refuse to escalate and resolve the refund, since the agent is capable.`,
  `Run a full investigation first, then escalate only if it can't resolve it.`,
  `Ask three qualifying questions before deciding whether to escalate.`],
 correct:[0],
 exp:`An explicit request for a human is a hard escalation trigger — honor it immediately without first attempting investigation. Acknowledging frustration while offering to resolve is appropriate only when the customer hasn't explicitly demanded a human; once they have, defer to their stated preference.`},

{id:"CS6",scen:"CS",dom:"D5",src:"modeled",
 stem:`Over a long dispute the conversation is periodically summarized to save tokens. Downstream, the agent starts citing the wrong refund amount and an approximate date, because the summary compressed "$247.18 refund approved on March 3" into "a refund was discussed." Best fix?`,
 opts:[
  `Extract transactional facts (amounts, dates, order numbers, statuses) into a persistent "case facts" block included in every prompt, outside the summarized history.`,
  `Stop summarizing and always pass the full raw transcript.`,
  `Instruct the model to summarize more carefully.`,
  `Raise the summarization frequency so summaries stay shorter.`],
 correct:[0],
 exp:`Progressive summarization reliably degrades exact numerical values, dates and customer-stated expectations. Pulling those facts into a structured, always-included case-facts block keeps them verbatim regardless of how history is compressed. Full transcripts ({1}) don't scale; "be careful" ({2}) is unreliable; more frequent summarizing ({3}) worsens the loss.`},

{id:"CC4",scen:"CC",dom:"D3",src:"modeled",
 stem:`A newly onboarded teammate reports Claude Code ignores several standards everyone else seems to get automatically. You keep those standards in <code>~/.claude/CLAUDE.md</code>. What's the diagnosis and fix?`,
 opts:[
  `The standards are user-level and not shared via version control; move them into the project-level CLAUDE.md so all teammates receive them.`,
  `The teammate's model version differs; pin the model in settings.`,
  `CLAUDE.md files don't support standards; convert them to slash commands.`,
  `The teammate must run <code>/compact</code> to load shared memory.`],
 correct:[0],
 exp:`Instructions in <code>~/.claude/CLAUDE.md</code> apply only to that user and aren't distributed through version control. Team-wide standards belong in the project-level CLAUDE.md (or <code>.claude/rules/</code>). The <code>/memory</code> command can confirm which files are loaded. The other options misattribute the cause.`},

{id:"CC5",scen:"CC",dom:"D3",src:"modeled",
 stem:`You have a codebase-analysis skill that emits very verbose exploration output. When run in the main session it floods the context and derails follow-up work. Which skill configuration best contains it?`,
 opts:[
  `Add <code>context: fork</code> to the skill's SKILL.md frontmatter so it runs in an isolated sub-agent context and returns only a summary.`,
  `Add <code>allowed-tools</code> restricting it to read-only tools.`,
  `Add an <code>argument-hint</code> so users pass fewer inputs.`,
  `Move the skill to <code>~/.claude/skills/</code> so it runs personally.`],
 correct:[0],
 exp:`<code>context: fork</code> runs the skill in an isolated sub-agent context, keeping verbose or exploratory output out of the main conversation and returning a clean summary. <code>allowed-tools</code> restricts capabilities (not context pollution), <code>argument-hint</code> prompts for parameters, and relocating scope doesn't isolate context.`},

{id:"CC6",scen:"CC",dom:"D3",src:"modeled",
 stem:`A colleague asks whether to fix a one-line date-validation bug (clear stack trace, single function) in plan mode or with direct execution. What's the right call?`,
 opts:[
  `Direct execution — it's a well-scoped, single-file change with clear scope.`,
  `Plan mode — every change benefits from an upfront plan.`,
  `Plan mode — validation logic always has architectural implications.`,
  `Direct execution, but only after forking the session.`],
 correct:[0],
 exp:`Direct execution fits simple, well-understood, single-file changes with clear scope. Plan mode is for large-scale changes, multiple valid approaches, and architectural decisions — overkill for a one-line fix with a clear stack trace.`},

{id:"MA12",scen:"MA",dom:"D1",src:"modeled",
 stem:`Your coordinator delegates web search, document analysis and synthesis strictly one after another, even when subtopics are independent. To cut latency you want two searches to run at the same time. How do you spawn subagents in parallel with the Task tool?`,
 opts:[
  `Emit multiple Task tool calls within a single coordinator response.`,
  `Emit one Task call per turn across several sequential responses.`,
  `Set a "parallel: true" flag on the AgentDefinition.`,
  `Give each subagent access to the Task tool so they spawn each other.`],
 correct:[0],
 exp:`Parallel subagents are spawned by emitting multiple Task tool calls in a single response. One-per-turn ({1}) is sequential by definition; there's no "parallel" flag on AgentDefinition ({2}); letting subagents spawn each other ({3}) breaks hub-and-spoke and isn't how parallelism is achieved.`},

{id:"DP1",scen:"DP",dom:"D2",src:"modeled",
 stem:`You need to find every caller of a function named <code>reconcileLedger</code> across a large codebase, then read the files that use it. Which built-in tools fit, in order?`,
 opts:[
  `Grep to search file contents for <code>reconcileLedger</code>, then Read on the matching files to trace usage.`,
  `Glob to match <code>reconcileLedger</code> by filename, then Edit the matches.`,
  `Read every file upfront, then Bash to filter for the name.`,
  `Glob for all files, then Write summaries of each.`],
 correct:[0],
 exp:`Grep searches file contents for patterns like function names — ideal for finding callers — and Read then loads the relevant files to follow the flow. Glob matches file paths/names, not contents ({1}, {3}). Reading everything upfront ({2}) wastes context; build understanding incrementally instead.`},

{id:"DP2",scen:"DP",dom:"D2",src:"modeled",
 stem:`You try to change a line with Edit, but the anchor text appears several times in the file, so Edit fails on the non-unique match. What's the reliable fallback?`,
 opts:[
  `Read the full file, then Write the modified contents back.`,
  `Retry Edit repeatedly until it happens to match.`,
  `Use Glob to narrow to the right file, then Edit again.`,
  `Use Bash <code>sed</code> to force the replacement.`],
 correct:[0],
 exp:`When Edit can't find a unique anchor, Read + Write is the reliable fallback: load the full contents, apply the change, and write it back. Retrying Edit ({1}) won't resolve the ambiguity; Glob ({2}) is for path matching; ad-hoc sed ({3}) is fragile and outside the intended tool flow.`},

{id:"DP3",scen:"DP",dom:"D2",src:"modeled",
 stem:`Your team wants Claude Code to use a capable internal MCP tool for code search, but it keeps preferring the built-in Grep. The MCP tool works when forced. What's the most effective fix?`,
 opts:[
  `Enhance the MCP tool's description to explain its capabilities and outputs in detail so the agent understands when it's the better choice.`,
  `Remove Grep from the agent's tool set entirely.`,
  `Rename the MCP tool to start with "grep".`,
  `Lower the agent's temperature so it picks tools more deterministically.`],
 correct:[0],
 exp:`Agents lean on built-ins when an MCP tool's description underspecifies its value. A detailed description of capabilities and outputs lets the model prefer the more capable tool for the right cases. Removing Grep ({1}) is heavy-handed and loses a useful tool; renaming ({2}) is a hack; temperature ({3}) doesn't address the selection signal.`},

{id:"DP4",scen:"DP",dom:"D2",src:"modeled",
 stem:`You want a shared MCP server (used by the whole team) authenticated with a GitHub token, without committing the secret. Where and how should it be configured?`,
 opts:[
  `In project-scoped <code>.mcp.json</code>, using environment-variable expansion such as <code>\${GITHUB_TOKEN}</code> for the credential.`,
  `In user-scoped <code>~/.claude.json</code>, with the token pasted inline.`,
  `In the project CLAUDE.md, with the token in a code block.`,
  `In <code>.claude/commands/</code> as a slash command that exports the token.`],
 correct:[0],
 exp:`Shared team tooling goes in project-scoped <code>.mcp.json</code>, and env-var expansion (<code>\${GITHUB_TOKEN}</code>) keeps secrets out of version control. <code>~/.claude.json</code> ({1}) is for personal/experimental servers; CLAUDE.md ({2}) is for context, never secrets; slash commands ({3}) don't configure MCP servers.`},

{id:"CI4",scen:"CI",dom:"D4",src:"modeled",
 stem:`Developers are ignoring your CI review bot because it produces too many false positives on trivial style nits. You've already tried adding "be conservative" and "only report high-confidence findings" to the prompt without improvement. Best next step?`,
 opts:[
  `Write specific categorical criteria defining which issues to report (bugs, security) versus skip (minor style, local patterns), rather than confidence-based hedging.`,
  `Add "you must be 95% sure" to every instruction.`,
  `Lower the model temperature to reduce spurious findings.`,
  `Ask the model to double its self-review before posting.`],
 correct:[0],
 exp:`Vague instructions like "be conservative" or "only high-confidence" don't improve precision. Explicit categorical criteria — what to flag vs skip — do. You can also temporarily disable a high-false-positive category to restore trust while you refine it. Confidence phrasing ({1}), temperature ({2}) and extra self-review ({3}) don't address unclear reporting criteria.`},

{id:"CI5",scen:"CI",dom:"D4",src:"modeled",
 stem:`Your CI posts inline PR comments and needs machine-parseable, schema-valid findings every run. Which combination best guarantees that in non-interactive mode?`,
 opts:[
  `Run with <code>-p</code> and use <code>--output-format json</code> with <code>--json-schema</code> to enforce structured output.`,
  `Run interactively and copy the console text into the PR.`,
  `Use <code>-p</code> alone and regex-parse the prose output.`,
  `Ask the model in the prompt to "please return valid JSON."`],
 correct:[0],
 exp:`<code>-p</code> makes it non-interactive; <code>--output-format json</code> plus <code>--json-schema</code> enforces a machine-parseable, schema-valid structure for automated posting. Interactive copy ({1}) can't be automated; regex over prose ({2}) is brittle; a prompt request ({3}) doesn't guarantee valid structure.`},

{id:"CI6",scen:"CI",dom:"D4",src:"modeled",
 stem:`The same Claude session that generated a module is also asked to review it, and it keeps missing subtle issues in its own code. What most reliably improves defect detection?`,
 opts:[
  `Run the review in a second, independent Claude instance without the generator's reasoning context.`,
  `Add "please review very carefully" to the generation prompt.`,
  `Turn on extended thinking in the same session before reviewing.`,
  `Have the same session review twice and compare.`],
 correct:[0],
 exp:`A model retains its generation reasoning and is less likely to question its own decisions, so an independent instance without that context catches subtle issues better than self-review instructions or extended thinking in the same session. {1}, {2} and {3} all keep the generator's context in play.`},

{id:"DE1",scen:"DE",dom:"D4",src:"modeled",
 stem:`You need guaranteed schema-compliant JSON from an extraction task and you're tired of fixing malformed JSON in the model's text output. Most reliable approach?`,
 opts:[
  `Define an extraction tool with a JSON schema as its input and read the structured data from the <code>tool_use</code> response.`,
  `Ask the model to "respond only in JSON" and parse the text.`,
  `Post-process text output with a JSON repair library.`,
  `Lower temperature to 0 so the JSON is always valid.`],
 correct:[0],
 exp:`Tool use with a JSON schema is the most reliable path to schema-compliant output — it eliminates syntax errors entirely. Prompted JSON ({1}) and repair libraries ({2}) still hit malformed output; temperature ({3}) reduces but doesn't guarantee validity. Note tool use removes syntax errors but not semantic ones.`},

{id:"DE2",scen:"DE",dom:"D4",src:"modeled",
 stem:`Some source documents lack a "tax_id" field entirely, but your schema marks it required — and the model fabricates plausible-looking values to satisfy it. Best schema fix?`,
 opts:[
  `Make fields that may be absent optional/nullable so the model returns null instead of inventing values.`,
  `Add a few-shot example with a fake tax_id to copy.`,
  `Increase max_tokens so it has room to reason.`,
  `Add "do not hallucinate" to the system prompt and keep the field required.`],
 correct:[0],
 exp:`A required field pressures the model to fabricate a value when the source lacks it. Designing such fields as optional/nullable lets it return null truthfully. Fake examples ({1}) teach fabrication; token budget ({2}) is irrelevant; a "don't hallucinate" instruction ({3}) fights the schema constraint rather than removing it.`},

{id:"DE3",scen:"DE",dom:"D4",src:"modeled",
 stem:`Extraction quality varies wildly across document layouts — inline citations vs bibliographies, narrative prose vs structured tables — and detailed prose instructions haven't fixed it. Most effective technique?`,
 opts:[
  `Add few-shot examples demonstrating correct extraction from each varied structure.`,
  `Write longer, more detailed prose instructions covering every format.`,
  `Split into one model call per format and merge results.`,
  `Ask the model to first describe the document's structure, then extract.`],
 correct:[0],
 exp:`Few-shot examples are the most effective way to get consistent, correct handling of structural variety — they demonstrate the transformation and let the model generalize to novel layouts. More prose ({1}) is what already failed; per-format calls ({2}) add orchestration cost; describe-then-extract ({3}) helps less than concrete examples.`},

{id:"DE4",scen:"DE",dom:"D4",src:"modeled",
 stem:`Your validation-retry loop appends validation errors and retries. It fixes format and structural errors well, but for one field it retries endlessly with no success — the field's information simply isn't present in the provided document (it lives in a separate file you didn't include). What's the right conclusion?`,
 opts:[
  `Retries can't succeed when the required information is absent from the source; detect this case and route it differently (e.g., surface the gap or fetch the missing document) instead of retrying.`,
  `Increase the retry count; it will eventually extract the value.`,
  `Add more few-shot examples of that field until it appears.`,
  `Loosen the schema to accept any string for that field.`],
 correct:[0],
 exp:`Retry-with-feedback corrects format and structural errors, but it's powerless when the information is genuinely missing from the source. The system should recognize absent-information cases and handle them separately rather than looping. More retries ({1}) and examples ({2}) can't conjure absent data; loosening the schema ({3}) invites fabrication.`},

{id:"DE5",scen:"DE",dom:"D4",src:"modeled",
 stem:`You must extract a document category. Most inputs fall into three known types, but a meaningful minority are genuinely ambiguous or don't fit any type. How should you design the schema field to avoid forced-fit errors?`,
 opts:[
  `Use an enum of the known types plus an "other" value with a detail string, and an "unclear" value for ambiguous cases.`,
  `Use a free-text string and normalize later.`,
  `Use only the three known enum values and pick the closest.`,
  `Make the field required with no default so the model must choose.`],
 correct:[0],
 exp:`Extensible categorization uses an enum with the known values plus "other" + a detail field, and "unclear" for ambiguity — this prevents forced-fitting the odd cases into a wrong bucket. Free text ({1}) loses structure; three-only enums ({2}) and required-no-default ({3}) both force incorrect classifications.`},

{id:"DE6",scen:"DE",dom:"D5",src:"modeled",
 stem:`Your extraction pipeline reports 97% overall accuracy, and there's pressure to reduce human review. Before automating high-confidence extractions, what's the most important validation to run?`,
 opts:[
  `Analyze accuracy by document type and field using stratified sampling, to confirm consistent performance across all segments — aggregate accuracy can mask poor performance on specific types or fields.`,
  `Re-run the whole set and confirm the 97% number is stable.`,
  `Lower the confidence threshold so more items auto-pass.`,
  `Trust the aggregate metric and automate everything above 97%.`],
 correct:[0],
 exp:`A high aggregate can hide a weak document type or field. Stratified sampling and per-segment accuracy analysis verify consistent performance before cutting review, and can catch novel error patterns. Re-confirming the aggregate ({1}) repeats the same blind spot; loosening thresholds ({2}) and blanket automation ({3}) increase risk.`},

{id:"DE7",scen:"DE",dom:"D5",src:"modeled",
 stem:`A verbose <code>lookup_order</code> tool returns 40+ fields per call, but only about 5 are relevant to a return. Across a long multi-issue session these payloads accumulate and crowd the context. Best practice?`,
 opts:[
  `Trim tool outputs to only the relevant fields before they accumulate in context.`,
  `Keep the full payloads for completeness and summarize the whole history periodically.`,
  `Raise the context limit by switching models.`,
  `Store the full payloads and re-fetch when needed.`],
 correct:[0],
 exp:`Tool results consume tokens disproportionately to their relevance; trimming to the return-relevant fields before they pile up keeps context lean without losing what matters. Keeping everything and summarizing ({1}) still bloats and risks lossy summaries; a bigger window ({2}) defers the problem; re-fetching ({3}) adds calls without solving accumulation.`},

{id:"AG1",scen:"CS",dom:"D1",src:"modeled",
 stem:`You're implementing the core agentic loop. Which condition correctly governs when to keep executing tools versus when to stop and return the final response?`,
 opts:[
  `Continue the loop while <code>stop_reason</code> is <code>"tool_use"</code> (execute the tools, append results, iterate); terminate when <code>stop_reason</code> is <code>"end_turn"</code>.`,
  `Continue until the assistant emits no text content, then stop.`,
  `Continue until you hit a fixed iteration cap, then stop.`,
  `Parse the assistant's natural-language output for a phrase like "done" to decide when to stop.`],
 correct:[0],
 exp:`Loop control keys off <code>stop_reason</code>: <code>"tool_use"</code> means execute the requested tools and iterate; <code>"end_turn"</code> means finish. Checking for text content ({1}), relying on an iteration cap as the primary stop ({2}), or parsing natural-language signals ({3}) are the classic anti-patterns.`},

{id:"MR1",scen:"CS",dom:"D5",src:"modeled",multi:true,
 stem:`Per the guide, which of the following are appropriate escalation triggers for the support agent? <b>(Select TWO.)</b>`,
 opts:[
  `The customer explicitly requests a human agent.`,
  `The request hits a policy gap or a policy the agent's rules are silent on.`,
  `The customer's message registers as negative in sentiment analysis.`,
  `The agent's self-reported confidence score dips below a set threshold.`],
 correct:[0,1],
 exp:`Valid triggers include an explicit request for a human, policy exceptions/gaps (not merely "complex" cases), and inability to make meaningful progress. Sentiment ({2}) and self-reported confidence ({3}) are unreliable proxies for actual case complexity and shouldn't drive escalation.`},

{id:"MR2",scen:"DP",dom:"D2",src:"modeled",multi:true,
 stem:`You're setting up MCP servers for a team project. Which TWO configurations are correct per the guide? <b>(Select TWO.)</b>`,
 opts:[
  `Put shared team servers in project-scoped <code>.mcp.json</code> with env-var expansion for tokens.`,
  `Put personal/experimental servers in user-scoped <code>~/.claude.json</code>.`,
  `Commit the raw API tokens directly into <code>.mcp.json</code> so teammates can use them.`,
  `Define MCP servers inside the project CLAUDE.md so they load with instructions.`],
 correct:[0,1],
 exp:`Shared tooling belongs in project-scoped <code>.mcp.json</code> (with <code>\${VAR}</code> expansion so secrets aren't committed), and personal/experimental servers go in user-scoped <code>~/.claude.json</code>. Committing raw tokens ({2}) leaks secrets; CLAUDE.md ({3}) is for context, not server definitions.`},

{id:"AX1",scen:"CS",dom:"D1",src:"modeled-adv",
 stem:`Your three MCP tools return time and status data in different shapes: <code>lookup_order</code> emits Unix epoch seconds, <code>get_customer</code> emits ISO 8601 strings, and the warehouse tool emits numeric status codes (<code>3</code> = delivered). The agent computes the 30-day return window incorrectly in roughly 9% of conversations and occasionally tells customers the wrong order status. Refunds depend on both. What most reliably fixes this?`,
 opts:[
  `Add a PostToolUse hook that normalizes timestamps and status codes into a single canonical format before the results ever reach the model.`,
  `Add a section to the system prompt documenting each tool's format along with the conversion rules the agent should apply.`,
  `Add few-shot examples showing correct conversions for each of the three formats.`,
  `Rewrite the three backend services so they all emit a shared response schema.`],
 correct:[0],
 exp:`Data normalization is a deterministic transformation, so it belongs in a PostToolUse hook that intercepts tool results before the model processes them — the agent then reasons over one consistent format and can't miscompute. {1} and {2} both push a mechanical conversion into probabilistic model behavior, which is what's already failing at 9% and is unacceptable when refunds hinge on it. {3} would work but rewrites systems you may not own to solve a problem the agent layer can fix cleanly — far more effort than the situation warrants.`},

{id:"AX2",scen:"CS",dom:"D1",src:"modeled-adv",
 stem:`A customer's opening message contains three things at once: a damaged-item refund, a duplicate charge, and a shipping-address change on an unshipped order. Logs show the agent resolves the refund, then escalates the duplicate charge because policy is silent on it — and never addresses the address change at all. Human agents who pick up the escalation don't have access to the conversation transcript. What's the most effective design?`,
 opts:[
  `Decompose the message into distinct items and investigate each in parallel against shared context, then synthesize one unified resolution — and when a single item escalates, hand off a structured summary (customer ID, root cause, amount, recommended action) while continuing to resolve the others.`,
  `Process the items strictly in order and hand the entire conversation to a human as soon as any one item requires escalation.`,
  `Instruct the agent to tell customers to open a separate conversation for each issue so every request stays single-purpose.`,
  `Attach the full raw conversation transcript to the escalation so the human agent can reconstruct whatever context they need.`],
 correct:[0],
 exp:`Two guide patterns combine here: decompose multi-concern requests into distinct items investigated in parallel against shared context, and compile a structured handoff for escalated items. Crucially, one item escalating shouldn't halt the others. {1} terminates the whole workflow on a single item's failure, abandoning two resolvable issues. {2} shifts the burden onto the customer without improving the system. {3} makes the human do the analysis the agent already performed — the guide calls for a compiled summary of customer ID, root cause, amount and recommended action, not a raw dump.`},

{id:"AX3",scen:"DP",dom:"D1",src:"modeled-adv",
 stem:`You spent a long session mapping a legacy payment module — class relationships, refund flow, dependency chains. Overnight a teammate merged a refactor that renamed about 40% of the classes you analyzed and deleted two modules entirely. You need to continue the work today. What's the most reliable way to restore working state?`,
 opts:[
  `Start a fresh session seeded with a structured summary of the durable findings (architecture, flows, high-impact areas), since the prior tool results no longer describe the code.`,
  `Use <code>--resume</code> on the named session and continue where you left off.`,
  `Use <code>--resume</code> and tell the session which files changed so it can re-analyze just those targets.`,
  `Use <code>fork_session</code> from the original analysis to branch a new line of work.`],
 correct:[0],
 exp:`The deciding factor is how much of the prior context is still valid. With 40% of classes renamed and modules deleted, most cached tool results are stale, and starting fresh with an injected structured summary is more reliable than resuming on top of them. {2} is the right move for a smaller delta — informing a resumed session about specific changed files beats full re-exploration — but at this scale you'd be correcting stale findings continuously. {1} carries all the stale results forward unflagged. {3} is for exploring divergent approaches from a shared baseline, not for recovering from staleness.`},

{id:"AX4",scen:"CI",dom:"D1",src:"modeled-adv",
 stem:`Two workstreams run through the same fixed five-step pipeline. The first reviews every PR for security, performance and style — aspects known ahead of time. The second handles requests like "add comprehensive tests to the legacy billing module," where what needs testing only becomes clear as dependencies surface. The second workstream produces shallow, poorly-prioritized results. How should you decompose these tasks?`,
 opts:[
  `Keep prompt chaining for the predictable multi-aspect review, and switch the open-ended work to dynamic decomposition — map structure first, identify high-impact areas, then build a prioritized plan that adapts as dependencies are discovered.`,
  `Move both workstreams to dynamic decomposition, since an adaptive plan is strictly more capable than a fixed sequence.`,
  `Keep the fixed pipeline for both and expand it to twelve steps so it covers the cases currently being missed.`,
  `Run both as single-pass prompts with the full module in context so nothing is missed between steps.`],
 correct:[0],
 exp:`Decomposition strategy should match the workflow: prompt chaining suits predictable multi-aspect reviews where the aspects are known in advance, while open-ended investigation needs subtasks generated from what each step discovers. {1} discards the consistency that makes the review reliable. {2} tries to enumerate unknowns in advance — the very thing that can't be pre-specified — and inflates the pipeline without addressing the cause. {3} reintroduces attention dilution across a large surface, which is what focused passes exist to prevent.`},

{id:"AX5",scen:"MA",dom:"D2",src:"modeled-adv",
 stem:`You already renamed <code>analyze_content</code> to <code>extract_web_results</code> with a web-specific description, and <code>analyze_document</code> now has a clearly scoped description covering PDFs and local files. Yet the document-analysis agent still routes roughly 20% of PDF work to <code>extract_web_results</code>. Its system prompt opens: "You are a research analyst. Always begin by extracting the most relevant web results for the topic before deeper analysis." What is the most likely cause?`,
 opts:[
  `The system prompt's keyword-laden instruction creates an unintended tool association that overrides the otherwise well-written descriptions.`,
  `The two tool descriptions still overlap and need further differentiation.`,
  `The agent has access to too many tools, pushing decision complexity past reliable selection.`,
  `The agent lacks few-shot examples demonstrating correct routing for PDF requests.`],
 correct:[0],
 exp:`System prompt wording is keyword-sensitive, and an instruction to "always begin by extracting the most relevant web results" maps directly onto <code>extract_web_results</code> regardless of how good the descriptions are. Reviewing system prompts for instructions that override tool descriptions is the intended skill here. {1} blames a cause the stem explicitly rules out — the descriptions were already fixed. {2} isn't supported either, since only two tools are in play. {3} would paper over a prompt conflict that will keep reasserting itself.`},

{id:"AX6",scen:"DP",dom:"D2",src:"modeled-adv",
 stem:`Before doing any real work, your agent burns eight to twelve exploratory tool calls per task just discovering what exists — which repositories are indexed, which runbooks are available, what the issue taxonomy looks like. The underlying catalog is stable and fully enumerable. What most effectively reduces this overhead?`,
 opts:[
  `Expose the catalog as an MCP resource so the agent can see what data is available without making exploratory calls.`,
  `Add a <code>list_all_assets</code> tool and use forced tool selection so the agent always calls it first each turn.`,
  `Prompt the agent to infer likely repository and runbook names from the task description instead of enumerating them.`,
  `Build a custom retrieval index over the catalog and have the agent query it semantically before each task.`],
 correct:[0],
 exp:`MCP resources exist to expose content catalogs — issue summaries, documentation hierarchies, schemas — giving agents visibility into available data without exploratory tool calls. {1} still spends a call every turn and forces it even when the agent already has what it needs. {2} replaces enumeration with guessing at names, which is unreliable. {3} builds retrieval infrastructure for a stable, enumerable catalog that a resource already covers.`},

{id:"AX7",scen:"CI",dom:"D3",src:"modeled-adv",
 stem:`Your CI review re-runs on every push to a pull request. Developers complain that each new commit re-posts the same fifteen comments, burying the two or three findings that are actually new. Reviews are otherwise accurate. What's the most effective fix?`,
 opts:[
  `Include the prior review's findings in context on re-runs and instruct Claude to report only new or still-unaddressed issues.`,
  `Run the review only on the first push of a pull request and skip subsequent commits.`,
  `Hash each posted comment and suppress any re-run finding whose text hash already exists.`,
  `Require developers to resolve each comment thread so resolved findings stop reappearing.`],
 correct:[0],
 exp:`Re-runs have no memory of what was already reported, so the fix is to supply prior findings as context and scope the output to new or still-unaddressed issues. {1} sacrifices coverage on exactly the commits most likely to introduce defects. {2} tries to reconstruct identity after the fact from wording that varies between runs, so near-duplicates slip through and genuine repeat findings get wrongly suppressed. {3} pushes cleanup onto developers instead of fixing the behavior.`},

{id:"AX8",scen:"CC",dom:"D3",src:"modeled-adv",
 stem:`You're migrating a library across 45+ files. In plan mode, the exploration phase fills the context with file dumps; by the time you approve a plan, the agent gives inconsistent answers and refers to "typical patterns" instead of the specific classes it found earlier. What best preserves plan quality?`,
 opts:[
  `Run the verbose discovery phase through the Explore subagent so only summaries return to the main conversation, then plan, then use direct execution for the approved changes.`,
  `Skip plan mode and execute file by file, letting the migration path emerge as you go.`,
  `Stay in plan mode and run <code>/compact</code> whenever the context fills during exploration.`,
  `Split the migration into 45 independent sessions, one per file, and merge the results at the end.`],
 correct:[0],
 exp:`The failure is context exhaustion during discovery, and the Explore subagent exists to isolate verbose discovery output and return summaries — pairing plan mode for investigation with direct execution for implementation. {1} abandons the architectural design a 45-file migration needs. {2} reclaims space reactively but compresses away the specific findings that were degrading in the first place. {3} destroys the cross-file view that makes the migration coherent.`},

{id:"AX9",scen:"CC",dom:"D3",src:"modeled-adv",
 stem:`Your team's <code>/migrate-endpoint</code> slash command expects a target file, but developers routinely invoke it bare. When they do, it guesses a target, and on two occasions it has overwritten unrelated files. The command is otherwise valuable and widely used. What's the best configuration change?`,
 opts:[
  `Add <code>argument-hint</code> frontmatter so developers are prompted for the required parameter, and <code>allowed-tools</code> to restrict the command to the file operations it actually needs.`,
  `Add a line to the command body instructing Claude to always ask for the target file before making any changes.`,
  `Move the command to <code>~/.claude/commands/</code> so only developers who understand it have access.`,
  `Add a hook that intercepts and blocks every write the command attempts until a human confirms it.`],
 correct:[0],
 exp:`Two frontmatter options address the two failures directly: <code>argument-hint</code> prompts for required parameters when invoked without arguments, and <code>allowed-tools</code> restricts tool access during execution to prevent destructive actions. {1} relies on the model reliably asking, which is probabilistic. {2} removes the command from version-controlled team access to solve a usability problem, and restricts by audience rather than behavior. {3} gates every write behind a human, which defeats the automation the command exists to provide.`},

{id:"AX10",scen:"DE",dom:"D4",src:"modeled-adv",
 stem:`Moving extraction to tool use with a strict JSON schema eliminated malformed output entirely. But about 4% of invoices now come back schema-valid and wrong: line items that don't sum to the stated total, and occasionally a tax amount sitting in the shipping field. Downstream systems accept them silently. What most effectively catches these?`,
 opts:[
  `Have the model emit a <code>calculated_total</code> alongside the <code>stated_total</code> plus a <code>conflict_detected</code> boolean, and flag any discrepancy for review.`,
  `Tighten the JSON schema with stricter types and additional required fields.`,
  `Run every extraction twice and accept the result only when both runs agree.`,
  `Add an instruction to the prompt telling the model to double-check its arithmetic before responding.`],
 correct:[0],
 exp:`Tool use with a strict schema eliminates syntax errors but does nothing about semantic ones — values that don't sum, or data in the wrong field. Self-correction validation catches these by extracting a computed value alongside the stated one and flagging conflicts explicitly. {1} tightens the very layer that already passes these records. {2} doubles cost and still agrees with itself on systematic errors. {3} asks probabilistically for the arithmetic guarantee that a validation check provides deterministically.`},

{id:"AY9",scen:"CS",dom:"D5",src:"modeled-gap",
 stem:`A dispute has run for 90 turns. You keep the last 20 turns verbatim and drop everything older. The agent now contradicts a shipping commitment it made at turn 6 and has forgotten the customer's stated deadline. Raising the window size only delays the problem. What best maintains quality as the conversation grows?`,
 opts:[
  `Extract durable facts and commitments into a structured state object carried in every prompt, and retain older turns selectively based on whether they contain such facts rather than by recency alone.`,
  `Increase the window to the last 60 turns and summarize anything older into a paragraph.`,
  `Summarize the entire history progressively at fixed intervals so nothing is ever dropped outright.`,
  `Keep the full transcript in every request and rely on the model to locate what matters.`],
 correct:[0],
 exp:`A sliding window drops information by position rather than importance, so early commitments vanish regardless of relevance. Extracting transactional facts, amounts, dates and customer-stated expectations into a persistent structured block outside the summarized history keeps them verbatim, and selective retention keeps what matters. {1} pushes the same failure further out and compresses the very details at risk. {2} is the progressive summarization pattern that degrades exact values into vague statements. {3} doesn't scale and invites position effects in a very long input.`},

{id:"AY12",scen:"DP",dom:"D2",src:"modeled-gap",
 stem:`You added a shared MCP server to the project configuration with its token supplied by environment variable expansion. A teammate pulls the repo, but the server's tools never appear to the agent, while your own machine works fine. Your personal experimental server, configured separately, still loads for you. What's the most likely cause and correct next step?`,
 opts:[
  `The teammate's environment doesn't define the referenced variable, so the server fails to authenticate at connection time — have them set it, then verify the tools are discovered.`,
  `Project and user scoped servers can't be active at the same time, so their personal server is blocking the shared one.`,
  `The token must be committed into the project configuration for teammates to authenticate.`,
  `MCP tools are discovered lazily on first use, so the teammate simply needs to name the tool explicitly in a prompt.`],
 correct:[0],
 exp:`Environment variable expansion keeps the secret out of version control, which means each person must supply the variable in their own environment; without it the server can't authenticate and its tools never register. {1} is false — tools from all configured servers are discovered at connection time and are available simultaneously. {2} defeats the entire purpose of expansion and leaks the credential. {3} misstates discovery, which happens at connection time rather than on demand.`},

{id:"G1",scen:"DP",dom:"D1",src:"modeled-gap",
 stem:`Yesterday's session mapped the checkout flow across roughly 30 files. Overnight, exactly two files changed: a bug fix in the tax calculator and a new helper module it calls. Everything else you analyzed is untouched. You want to continue today without re-exploring the whole flow. What's the right move?`,
 opts:[
  `Resume the named session with <code>--resume</code> and tell it specifically which two files changed, so it re-analyzes just those targets.`,
  `Start a new session seeded with a structured summary of yesterday's findings.`,
  `Resume the named session and simply continue asking questions from where you left off.`,
  `Use <code>--fork-session</code> from yesterday's session to branch a fresh line of work.`],
 correct:[0],
 exp:`When prior context is mostly still valid, resumption plus a targeted note about what changed beats full re-exploration — the guide calls for informing a resumed session about specific file changes. {1} is the correct answer when prior tool results are largely stale (say, a refactor renaming 40% of classes), but here it discards 28 files of valid analysis for no reason. {2} leaves the session confidently wrong about the two files that moved. {3} branches to explore divergent approaches from a shared baseline — it doesn't refresh stale findings.`},

{id:"G2",scen:"MA",dom:"D1",src:"modeled-gap",
 stem:`Your coordinator delegates four independent subtopic searches, each averaging about 25 seconds, and currently issues them one per turn for roughly 100 seconds total. None of the four depends on another's results. What most directly reduces total round-trip latency?`,
 opts:[
  `Emit all four Task tool calls within a single coordinator response so the subagents execute in parallel.`,
  `Keep one Task call per turn but narrow each subagent's scope so individual searches finish faster.`,
  `Combine all four subtopics into a single subagent prompt so only one delegation is needed.`,
  `Allow each subagent to spawn the next one directly, chaining the four without returning to the coordinator.`],
 correct:[0],
 exp:`Parallel execution comes from emitting multiple Task calls in a single response rather than across separate turns — the four run concurrently and total time approaches the slowest one. {1} keeps the work serialized and only trims the constant. {2} collapses the scope partitioning that keeps subagents from duplicating each other, and dilutes attention across four topics. {3} breaks hub-and-spoke: the coordinator loses observability, consistent error handling, and control of information flow.`},

{id:"G3",scen:"MA",dom:"D1",src:"modeled-gap",
 stem:`You're choosing the orchestration structure for a research system that must satisfy three requirements at once: broad topic coverage, low end-to-end latency, and the ability to finish usefully when one source is unavailable. Which structure best satisfies all three?`,
 opts:[
  `Coordinator-worker with partitioned subtopics executed in parallel, all inter-agent communication routed through the coordinator.`,
  `A fixed sequential pipeline where each agent's output feeds directly into the next stage.`,
  `A single agent that performs search, analysis and synthesis itself in one long session.`,
  `A peer-to-peer arrangement where each worker invokes whichever other worker it needs next.`],
 correct:[0],
 exp:`Coordinator-worker hits all three: partitioning subtopics across workers gives coverage without duplication, parallel dispatch gives latency, and routing everything through the coordinator means one worker's structured error leaves the others' partial results usable. {1} serializes latency and lets a single stage failure stall the run. {2} has no partitioning and accumulates everything in one context. {3} bypasses the coordinator entirely, giving up observability, consistent error handling and controlled information flow.`},

{id:"G4",scen:"DP",dom:"D1",src:"modeled-gap",
 stem:`The task is "find and fix all N+1 query problems in the ORM layer." Where they live isn't knowable until you trace model relationships and call sites. Your fixed five-step plan — read models, read queries, list issues, propose fixes, apply — returns shallow results that miss the worst offenders. How should the work be decomposed?`,
 opts:[
  `Generate subtasks dynamically: map the ORM structure first, identify high-impact areas from what surfaces, then build a prioritized plan that adapts as dependencies are discovered.`,
  `Expand the fixed plan from five steps to fifteen so it covers the cases currently being missed.`,
  `Run a single pass with the entire ORM layer in context so no relationship is missed between steps.`,
  `Have a developer list the suspect files first, then run the existing five-step plan against that list.`],
 correct:[0],
 exp:`Open-ended investigation calls for dynamic decomposition — subtasks generated from what each step discovers — rather than a sequence fixed before anything is known. {1} still tries to enumerate in advance the very findings that only emerge during tracing. {2} reintroduces attention dilution across a large surface, which is what focused passes exist to prevent. {3} moves the hard part onto a human and presumes they already know the answer.`},

{id:"G5",scen:"MA",dom:"D1",src:"modeled-gap",
 stem:`Your coordinator scripts exact procedural steps for the document-analysis subagent, which then fails on formats the script didn't anticipate. An earlier attempt to fix this by delegating with only "analyze these documents thoroughly" did make it adaptable — but the coordinator could no longer tell what had been examined or judge whether coverage was adequate. What delegation approach resolves both problems?`,
 opts:[
  `Delegate with research goals and explicit quality criteria, and require a structured output schema reporting what was analyzed and what was found.`,
  `Return to detailed procedural steps but append fallback directives for when a step fails.`,
  `Keep the minimal "analyze thoroughly" prompt and have the coordinator poll the subagent for status mid-run.`,
  `Have the coordinator classify each document by format first, then send the matching procedural script for that format.`],
 correct:[0],
 exp:`Goal-and-criteria delegation gives the subagent room to adapt its own strategy, and requiring structured output restores the coordinator's visibility into what was actually done — adaptability and oversight together. {1} reverts to the prescriptive style whose brittleness is the stated problem, patching one failure mode at a time. {2} keeps the visibility gap the stem says was unacceptable. {3} pushes procedural rigidity up a level and still can't cover unanticipated formats.`},

{id:"G6",scen:"MA",dom:"D1",src:"modeled-gap",
 stem:`The coordinator invokes the synthesis subagent with a prose paragraph summarizing what the earlier agents found. Synthesis completes, but its claims carry no publication dates and occasionally attach a finding to the wrong document. What should the coordinator pass instead?`,
 opts:[
  `Complete findings as structured data that separates content from metadata — each claim with its evidence excerpt, source name or URL, and publication date.`,
  `The same prose summary, plus instructions for synthesis to request any missing metadata from the coordinator.`,
  `The full raw documents and search results, so synthesis has everything the earlier agents saw.`,
  `The prose summary, with instructions for synthesis to infer approximate dates from the content of each claim.`],
 correct:[0],
 exp:`Subagents don't inherit context, so whatever synthesis needs must be in its prompt — and structured data separating content from metadata is what preserves attribution and temporal information through the handoff. {1} reintroduces the round trips that structured context exists to eliminate. {2} discards the extraction work already done and floods the context window. {3} invites fabricated dates, which is worse than missing ones.`},

{id:"G7",scen:"CC",dom:"D3",src:"modeled-gap",
 stem:`You need to change a production database schema and update the twelve services that read from it. The migration is effectively irreversible once applied, and your organization requires a human to sign off on the approach before any change lands. Which workflow fits?`,
 opts:[
  `Use plan mode to explore the schema and dependencies and produce a reviewable plan, get human approval, then use direct execution to carry out the approved plan.`,
  `Use direct execution with a detailed upfront prompt describing exactly how each service should be updated.`,
  `Use plan mode for the whole task, including applying the migration, so a plan governs every change.`,
  `Use direct execution to make the changes, then run an independent review pass over the applied migration.`],
 correct:[0],
 exp:`High scope, high risk and a required approval gate is the case plan mode exists for: explore safely, produce a plan a human can review, then execute the approved approach directly. {1} commits to a structure before the dependencies are understood, on a change that can't be undone. {2} misreads plan mode, which is for investigation and design rather than applying changes. {3} inverts the approval gate — reviewing an irreversible migration after it lands is too late.`},

{id:"G8",scen:"CC",dom:"D3",src:"modeled-gap",
 stem:`Your team's <code>/audit-deps</code> slash command enumerates every transitive dependency and prints several hundred lines. Developers report that after running it mid-session, Claude loses the thread of their feature work and starts answering follow-up questions in terms of the dependency dump. What's the correct configuration?`,
 opts:[
  `Set <code>context: fork</code> in the command's frontmatter so it executes in an isolated subagent context and returns only its result to the main session.`,
  `Set <code>allowed-tools</code> on the command to restrict it to read-only operations.`,
  `Instruct developers to run <code>/compact</code> immediately after each invocation of the command.`,
  `Move the command to <code>~/.claude/commands/</code> so it runs outside the shared project session.`],
 correct:[0],
 exp:`<code>context: fork</code> runs a skill or command in an isolated subagent context, which is exactly the remedy for verbose output contaminating the main conversation. {1} constrains what the command may do, not what it leaves behind in context. {2} is reactive and compresses the feature work along with the dump. {3} changes who can access the command; scope has nothing to do with context isolation.`},

{id:"G9",scen:"CI",dom:"D3",src:"modeled-gap",
 stem:`Your CI review invocation has three defects: it ignores the team's documented review conventions, it runs with file-write access it never needs, and it emits prose your posting script has to regex. Which configuration fixes all three?`,
 opts:[
  `Document the review criteria and conventions in CLAUDE.md so they load as project context, restrict the invocation to the read and search tools the review actually needs, and emit JSON with <code>--output-format json</code> and <code>--json-schema</code>.`,
  `Paste the conventions into the prompt on every run, leave the default tool set in place, and parse the prose output with a more robust regex.`,
  `Grant the reviewer the full tool set so it can verify findings by applying and testing candidate fixes, and have it summarize results at the end.`,
  `Add <code>--bare</code> so the run starts faster and stays minimal, then restrict tools and request JSON output.`],
 correct:[0],
 exp:`Each defect maps to its own mechanism: CLAUDE.md supplies project standards to CI-invoked runs, tool restriction removes capability the review never needs, and a JSON output format with a schema produces machine-parseable findings. {1} leaves two of the three unfixed and keeps the brittle parsing. {2} over-provisions a reviewer with write access, the opposite of the requirement. {3} is the trap: <code>--bare</code> skips discovery of CLAUDE.md along with hooks, skills and MCP servers, so it actively defeats the first requirement.`},

{id:"G10",scen:"CI",dom:"D3",src:"modeled-gap",
 stem:`Your pipeline shows three failure modes: some jobs hang waiting for a permission prompt no one can answer, one runaway job made more than sixty agentic turns before anyone noticed the spend, and the output is prose the posting step can't parse. Which invocation addresses all three?`,
 opts:[
  `Run in print mode with a non-prompting permission mode, cap the run with <code>--max-turns</code> (and a spend cap), and request <code>--output-format json</code> with a schema.`,
  `Run interactively with <code>--verbose</code>, parse stdout, and add a job-level timeout that retries once when the step hangs.`,
  `Run in print mode and raise <code>max_tokens</code> so the model finishes its work in fewer turns.`,
  `Add <code>--dangerously-skip-permissions</code> so nothing blocks, and keep the rest of the invocation as it is.`],
 correct:[0],
 exp:`Three defects, three controls: print mode plus a permission mode that doesn't prompt stops the hangs, a turn cap (with a budget cap alongside it) bounds runaway execution, and a JSON output format with a schema makes the result parseable. {1} keeps an interactive invocation in a context with no human. {2} confuses token budget with agentic turns and leaves prompts and parsing untouched. {3} fixes only the hang, removes the last guard against a runaway run, and should in any case be paired with tool restrictions and caps inside a sandboxed runner.`},

{id:"G11",scen:"DP",dom:"D2",src:"modeled-gap",
 stem:`Onboarding onto an unfamiliar 400-file service, your agent reads every file under <code>src/</code> in sequence. By file 60 the context is exhausted, and answers degrade into references to "typical patterns" instead of the specific classes it saw earlier. What exploration strategy fixes this?`,
 opts:[
  `Grep for entry points and key symbols first, then Read only the files those matches point to, following imports outward to trace flows.`,
  `Glob the full file list, then Read in batches, running <code>/compact</code> between each batch to reclaim space.`,
  `Continue reading every file but request a short summary after each one so the details are retained.`,
  `Use Bash to print the first fifty lines of every file, giving broad coverage at a fraction of the tokens.`],
 correct:[0],
 exp:`Codebase understanding should be built incrementally — Grep to locate entry points, Read to follow imports and trace flows — rather than loading everything upfront. {1} still reads all 400 files and compacts away the specifics that were degrading. {2} keeps the same consumption and adds summarization overhead. {3} truncates arbitrarily, so anything below line fifty is invisible regardless of relevance.`},

{id:"G12",scen:"DP",dom:"D2",src:"modeled-gap",
 stem:`Three subtasks in one session: (1) locate every file matching <code>**/*.integration.spec.ts</code>, (2) find all call sites of <code>computeTax</code>, and (3) determine which of those files were touched in the last ten commits. Which tool assignment is correct?`,
 opts:[
  `Glob for the first, Grep for the second, Bash for the third.`,
  `Grep for all three, since each is fundamentally a search.`,
  `Glob for the first and second, Bash for the third.`,
  `Bash with <code>find</code> and <code>grep</code> for all three, keeping the workflow in one tool.`],
 correct:[0],
 exp:`The three subtasks are different operations: Glob matches file paths by pattern, Grep searches file contents for symbols like a function name, and commit history is outside both, so Bash handles it. {1} misapplies Grep to a path-pattern match. {2} misapplies Glob to a content search — the call sites are inside files, not in their names. {3} bypasses purpose-built tools for shell equivalents that are harder to scope and reason about.`},

{id:"F1",scen:"CC",dom:"D3",src:"modeled-gap",
 stem:`Two team skills sit in <code>.claude/skills/</code>. One brainstorms six candidate architectures with lengthy comparative reasoning. The other establishes naming and error-handling standards that every subsequent turn in the session is expected to follow. A teammate has added <code>context: fork</code> to both. What is wrong with that?`,
 opts:[
  `Forking suits the brainstorming skill, but it's wrong for the standards skill — an isolated context returns only a summary, so the standards never land in the session that has to apply them.`,
  `Nothing is wrong: <code>context: fork</code> is the safe default for any skill that produces substantial output.`,
  `Forking is wrong for both; <code>allowed-tools</code> is the frontmatter option that governs how a skill affects the session.`,
  `Forking suits the standards skill, but the brainstorming skill should stay in the main session so its reasoning stays visible for later reference.`],
 correct:[0],
 exp:`<code>context: fork</code> exists to keep verbose or exploratory output from polluting the main conversation — exactly right for brainstorming alternatives. But isolation cuts both ways: a skill whose entire purpose is to establish standards the rest of the session must follow needs its output in that session, so forking it defeats the point. {1} treats isolation as universally safe and misses that dependency. {2} confuses tool restriction with context isolation. {3} inverts both cases — the verbose exploratory output is precisely what you want contained.`},

{id:"F2",scen:"DP",dom:"D2",src:"modeled-gap",
 stem:`<code>computeTax</code> is defined in <code>tax/engine.ts</code> and re-exported through the barrel file <code>billing/index.ts</code>. Most consumers write <code>import { computeTax } from '../billing'</code>. A single Grep for <code>computeTax</code> returns the definition plus two direct callers, missing roughly a dozen consumers that import through the barrel. How do you reliably find them all?`,
 opts:[
  `Identify every name the barrel re-exports, then search the codebase for each of those names and for the barrel's module path.`,
  `Read every file under <code>billing/</code> to find which ones import the function.`,
  `Glob for <code>**/*.ts</code> and Read each result in turn until all consumers are found.`,
  `Re-run Grep with a broader case-insensitive pattern such as <code>tax</code> to widen the net.`],
 correct:[0],
 exp:`Tracing usage across wrapper or barrel modules takes two steps: first establish the exported names, then search for each name and the module path consumers actually import from. A single Grep on the original symbol misses every indirect consumer. {1} looks in the wrong place — the consumers are outside <code>billing/</code>. {2} abandons targeted search for exhaustive reading, exhausting context. {3} floods the results with unrelated matches while still missing consumers that alias the import.`},

{id:"F3",scen:"DP",dom:"D2",src:"modeled-gap",
 stem:`You added a shared MCP server to project-scoped <code>.mcp.json</code> with environment variable expansion for its token. The agent never calls the server's tools and keeps falling back to Grep. Before you start rewriting tool descriptions, what should you check first?`,
 opts:[
  `Run <code>/mcp</code> to confirm the server actually connected and that its tools were discovered in this session.`,
  `Expand each of the server's tool descriptions with input formats, example queries and boundaries.`,
  `Move the server definition from <code>.mcp.json</code> to user-scoped <code>~/.claude.json</code>.`,
  `Force the server's tool with <code>tool_choice</code> so the agent has no option but to call it.`],
 correct:[0],
 exp:`Description quality only matters once the tools exist in the session. <code>/mcp</code> manages and inspects server connections, so it distinguishes a discovery or authentication failure — an unset environment variable, a server that never connected — from a genuine selection problem. {1} is the right fix for a real selection problem but wasted effort if nothing was discovered. {2} changes who gets the server, not whether it connects. {3} papers over a connection failure and would simply error.`},

{id:"F4",scen:"DP",dom:"D1",src:"modeled-gap",
 stem:`You have three separate investigation sessions running across the week: a performance trace, a dependency audit, and a flaky-test hunt. Today you need to pick up Tuesday's dependency audit specifically. What restores the right session?`,
 opts:[
  `Capture or name the session identifier and pass it to <code>--resume</code> so you continue that specific conversation.`,
  `Use <code>--continue</code>, which picks up where you left off.`,
  `Start a fresh session and re-run the dependency audit from the beginning.`,
  `Use <code>--fork-session</code> to branch back into the audit from the current session.`],
 correct:[0],
 exp:`<code>--resume</code> targets a specific prior conversation by its session identifier, which is what you need when several investigations are in flight. {1} is the trap: it resumes the most recent conversation, which here is whichever session you touched last — not necessarily Tuesday's audit. {2} discards valid prior work. {3} creates an independent branch from a shared baseline, which is for exploring divergent approaches rather than returning to an existing line of work.`},

{id:"F5",scen:"DP",dom:"D1",src:"modeled-gap",
 stem:`Halfway through migrating all data access to the repository pattern, the agent discovers that two modules use a second, undocumented legacy ORM nobody knew about. The plan it is executing has no step covering that ORM, so it continues through the remaining steps and leaves those two modules broken. What fixes this class of failure?`,
 opts:[
  `Use decomposition that regenerates the remaining subtasks from what has been discovered, so the second ORM becomes its own investigated and prioritized subtask.`,
  `Append a final catch-all step to the plan instructing the agent to handle anything unexpected it encountered.`,
  `Abandon the run and restart the migration with a longer plan that now includes the second ORM.`,
  `Have the agent record the anomaly in its final report and continue executing the original plan.`],
 correct:[0],
 exp:`The plan was fixed before the ORM was known, and no fixed sequence can contain a step for something not yet discovered. Dynamic decomposition generates subtasks from intermediate findings, so a discovery reshapes the remaining work. {1} is a placeholder that defers the real decision without adding investigation. {2} fixes this one instance and leaves the next unknown to break it again. {3} only documents the gap — the modules stay broken.`},

{id:"F6",scen:"CC",dom:"D3",src:"modeled-gap",
 stem:`You need to rename a configuration key across roughly 200 files. The change is mechanical, there's exactly one sensible way to do it, the repository is clean so <code>git</code> makes it fully reversible, and no approval gate applies. Which approach fits?`,
 opts:[
  `Direct execution — the scope is large but the change is unambiguous, with a single valid approach and no architectural decision to make.`,
  `Plan mode, because a change touching 200 files is by definition large-scale.`,
  `Plan mode for design, then a multi-phase workflow with human approval between each batch of files.`,
  `Split the work across 200 separate sessions so each file is handled in isolation.`],
 correct:[0],
 exp:`Plan mode is selected on scope <em>and</em> risk <em>and</em> ambiguity, not file count alone. Here there are no competing approaches, no architectural decision, no approval requirement, and the change is reversible — so direct execution is proportionate. {1} treats size as the only variable. {2} adds approval ceremony a low-risk reversible rename doesn't warrant. {3} fragments a single mechanical change into 200 contexts and loses all coherence.`},

{id:"F7",scen:"CC",dom:"D3",src:"modeled-gap",
 stem:`Two developers working from the same repository get different behavior: one of them has Claude applying a logging convention the team deprecated months ago. You suspect the instruction is coming from a memory file outside the project. Which command diagnoses this fastest?`,
 opts:[
  `<code>/memory</code>, which shows the memory files currently loaded and lets you edit them.`,
  `<code>/doctor</code>, which checks the health of the Claude Code installation.`,
  `<code>/config</code>, which opens the settings interface.`,
  `<code>/cost</code>, which reports token usage for the session.`],
 correct:[0],
 exp:`Inconsistent behavior between teammates on one repository usually traces to the memory hierarchy — most often a stale user-level <code>~/.claude/CLAUDE.md</code> that isn't shared through version control. <code>/memory</code> shows which files are actually loaded, which is exactly the diagnostic. {1} checks the installation, not loaded instructions. {2} exposes settings rather than memory contents. {3} is unrelated to configuration entirely.`},

{id:"F8",scen:"DP",dom:"D5",src:"modeled-gap",
 stem:`An extended exploration session is filling with verbose discovery output, and responses are starting to degrade. You still need the architectural findings established earlier in the session, and you're not finished with the task. What's the appropriate action?`,
 opts:[
  `Run <code>/compact</code> to summarize and compress the history while preserving key information, then continue in the same session.`,
  `Run <code>/clear</code> to wipe the conversation history and free the context window.`,
  `Start a new session immediately, since context degradation can't be recovered from.`,
  `Continue working and let older turns fall out of context on their own.`],
 correct:[0],
 exp:`<code>/compact</code> reduces context usage during extended exploration by summarizing older turns while keeping what matters — the standard move when a session is filling but the work isn't done. {1} wipes history outright, discarding the architectural findings you still need. {2} throws away valid context; a fresh session with an injected summary is for when prior results are <em>stale</em>, not merely voluminous. {3} lets important early findings drop silently, which is how sessions start referencing "typical patterns" instead of specifics.`},

{id:"P1",scen:"CC",dom:"D3",src:"modeled-gap",
 stem:`Your team relies on a <code>/release-notes</code> command that assembles changelog entries from merged pull requests. It works for the three engineers who built it, but a contractor who cloned the repository this morning reports that typing <code>/release-notes</code> does nothing. Where should the command live so everyone gets it on clone?`,
 opts:[
  `In <code>.claude/commands/</code> (or <code>.claude/skills/</code>) inside the repository, committed to version control.`,
  `In <code>~/.claude/commands/</code> on each engineer's machine, with setup instructions in the onboarding doc.`,
  `Defined inline in the project's root CLAUDE.md so it loads with the rest of the project context.`,
  `Registered in a <code>commands</code> array inside <code>.claude/settings.json</code>.`],
 correct:[0],
 exp:`Project-scoped commands live in the repository and travel through version control, so anyone who clones or pulls gets them automatically. {1} is the personal scope — it explains exactly the symptom here, since the three original engineers have local copies the contractor never received. {2} supplies project context and standards, not command definitions. {3} describes a registration mechanism that doesn't exist.`},

{id:"P2",scen:"CC",dom:"D3",src:"modeled-gap",
 stem:`Your repository has Terraform under <code>infra/</code>, database migrations scattered across a dozen service directories as <code>*/migrations/*.sql</code>, and everything else in application code. Each group has its own conventions, and you want Claude to apply the right ones automatically without loading all three sets on every edit. What's the most maintainable approach?`,
 opts:[
  `Create files in <code>.claude/rules/</code> with YAML frontmatter <code>paths</code> globs, so each rule set loads only when a matching file is being edited.`,
  `Put all three convention sets in the root CLAUDE.md under clear headings and let Claude infer which applies to the file at hand.`,
  `Place a CLAUDE.md in <code>infra/</code> and in each service's <code>migrations/</code> directory containing that area's conventions.`,
  `Create a skill per convention set and ask engineers to invoke the right one before editing.`],
 correct:[0],
 exp:`Glob-scoped rules attach conventions to file patterns rather than directories, so a rule for <code>*/migrations/*.sql</code> applies wherever those files live, and irrelevant conventions stay out of context. {1} relies on inference rather than explicit matching, which is unreliable and loads everything every time. {2} works for <code>infra/</code> but scales badly across a dozen scattered migration folders. {3} depends on a human remembering to invoke it, which isn't automatic application.`},

{id:"P3",scen:"CI",dom:"D4",src:"modeled-gap",
 stem:`Two jobs need costing decisions. Job A is a nightly dependency-license audit whose report is read the next morning. Job B is an agentic triage step that calls tools iteratively — querying an issue tracker, then following up based on what it finds — and posts back to a pull request within minutes. Someone proposes moving both to the Message Batches API for the 50% saving. What's the correct assessment?`,
 opts:[
  `Move only the nightly audit; the triage step is blocking and also needs multi-turn tool calling, which a batch request cannot do within a single request.`,
  `Move both, polling for completion so the triage step posts whenever its batch finishes.`,
  `Move only the triage step, since its individual requests are small and batching many small requests saves the most.`,
  `Keep both synchronous, because batch responses arrive out of order and can't be matched to their inputs.`],
 correct:[0],
 exp:`Two independent disqualifiers apply to the triage step: it blocks a pull request, and batch processing has up to a 24-hour window with no latency SLA — and separately, the batch API doesn't support executing tools mid-request and feeding results back. The nightly audit is latency-tolerant and fits. {1} treats an unbounded window as acceptable for blocking work. {2} inverts the analysis. {3} is a misconception: <code>custom_id</code> correlates each response with its request.`},

{id:"P4",scen:"CI",dom:"D4",src:"modeled-gap",
 stem:`Your single review prompt asks Claude to check security, business-logic correctness, and API design in one pass. Reviewers notice a recall trade-off: runs that catch subtle authorization bugs tend to miss API contract problems, and vice versa, even though every category is described carefully in the prompt. What restructuring most improves recall across all three?`,
 opts:[
  `Split into separate focused passes, one per concern, each with its own criteria and dedicated few-shot examples.`,
  `Keep the single prompt but add an instruction to weigh all three concerns equally before reporting.`,
  `Keep the single prompt and raise <code>max_tokens</code> so the response has room to cover all three areas.`,
  `Keep the single prompt and run it three times, reporting the union of all findings.`],
 correct:[0],
 exp:`Competing concerns in one prompt trade off against each other regardless of how well each is described; separating them into focused passes lets each carry its own criteria and examples without competing for attention. {1} restates the goal without changing the structure that causes the trade-off. {2} confuses output length with attention — the findings aren't being truncated, they're not being made. {3} triples cost while each run still suffers the same internal trade-off.`},

{id:"P5",scen:"CS",dom:"D5",src:"modeled-gap",
 stem:`Your agent's escalation decisions are miscalibrated in both directions: it hands off routine address changes, while attempting to improvise answers on requests your policy simply doesn't address, such as matching a competitor's price. A teammate proposes having the agent rate its own certainty from 1 to 10 and escalate below 7. What should you do instead?`,
 opts:[
  `Write explicit escalation criteria into the system prompt with few-shot examples showing both escalate and resolve decisions, including policy-gap cases.`,
  `Adopt the self-rated certainty threshold, then tune the cutoff against historical tickets.`,
  `Escalate every request that touches pricing, refunds, or account changes, and resolve everything else.`,
  `Track which categories get escalated most and route those to humans automatically going forward.`],
 correct:[0],
 exp:`The failure is an unclear decision boundary, and explicit criteria plus worked examples address it directly — including the policy-gap case, which is a genuine escalation trigger the agent is currently improvising through. {1} fails because self-reported confidence is poorly calibrated: the agent is already confidently wrong on the hard cases, so no cutoff separates them. {2} is a blunt category rule that would escalate the routine address change it already over-escalates. {3} entrenches the current miscalibration by learning from it.`},

{id:"P6",scen:"CS",dom:"D2",src:"modeled-gap",
 stem:`Your agent has two tools whose descriptions read "Looks up ticket information" and "Looks up account information." Both accept an alphanumeric identifier. Logs show the agent picking the wrong one on roughly a fifth of requests, and users get confidently wrong answers. You want the highest-leverage fix you can ship today. What is it?`,
 opts:[
  `Rewrite both descriptions to state the identifier format each expects, give example queries, and explain when to use one rather than the other.`,
  `Add eight few-shot examples to the system prompt showing correct routing for the most common request phrasings.`,
  `Merge the two into a single lookup tool that inspects the identifier and queries the right backend internally.`,
  `Add a preprocessing step that pattern-matches the identifier against known formats and pre-selects the tool.`],
 correct:[0],
 exp:`Descriptions are the primary signal the model uses to choose a tool, and near-identical ones leave nothing to discriminate on — expanding them is both the root-cause fix and the cheapest to ship. {1} adds tokens to every request to compensate for information that belongs in the description. {2} is a defensible architecture but a larger change than a same-day fix, and the descriptions would still be wrong. {3} moves selection out of the model entirely, which is over-engineered when the model was never given what it needed to decide.`},

];
