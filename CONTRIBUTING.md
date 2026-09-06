# Contributing to ONCALL

This repository is under local pre-launch review. Contributions should improve traceability, clarity and correctness. A contribution is not permission to publish a website, create a public remote, post on social media, connect a wallet or launch a token. Those actions require Erdem's explicit approval of the final concrete result.

## Propose a scoped change

Open one issue or pull request for a coherent problem. Explain the affected file and line, the current behaviour or claim, the planned change and its limits. For factual claims, supply the exact source, identifier where available, quoted supporting passage or precise section/table, source version and access date. Explain conflicting evidence and avoid drawing a broader conclusion than the source supports.

Keep Science Notes, company/market context and mascot humour distinct. Follow the [editorial contract](science-notes/README.md), [methodology](methodology/README.md) and [source ledger](SOURCE_LEDGER.md). Do not submit patient data, identifiable clinical examples, private records, confidential material, credentials or private keys. If the argument needs private material to be intelligible, do not put that material in a public issue or commit.

## Scientific review

Use the [science review template](.github/ISSUE_TEMPLATE/science-note-review.md). Drafts and work requiring review stay outside the site's publication collection. Scientific publication and final claims need a named human clinical/editorial reviewer, dated approval of the exact revision and disclosed conflicts. Passing tests, a reporting checklist and AI-generated prose do not replace this review. AI assistance must be disclosed and verified against underlying sources; AI is not an author or source.

## Corrections

Use the [correction template](.github/ISSUE_TEMPLATE/correction.md). Identify the exact problem, supporting evidence, urgency and affected revision. A maintainer may promptly repair a demonstrably broken link or factual error while recording what changed, why, when and by whom. An urgent correction must not silently introduce a new scientific conclusion. Material reinterpretations require human review; unreliable material may need a visible withdrawal notice while review continues.

Preserve the earlier public revision and link the correction to the issue and commit. Do not erase correction history. Do not place sensitive material in the record to prove an error; tell the maintainer which public claim is affected without disclosing private data.

## Code and documentation checks

For code changes, explain the user-visible behaviour, run the relevant tests and add meaningful coverage for new behaviour or fixed failures. Before a review-ready change, run:

```sh
npm run test
npm run test:e2e
npm run build
git diff --check
```

See [local setup](README.md) for dependencies. Report the actual results and any checks not run, with reasons. For documentation, resolve local links, use HTTPS external links, compare selected quote-asset addresses with the source data and confirm that no launch or approval is implied without evidence. Keep synced files under `sources/` read-only; the maintained public source ledger is [SOURCE_LEDGER.md](SOURCE_LEDGER.md).
