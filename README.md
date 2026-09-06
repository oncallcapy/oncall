# ONCALL

**Night shift. Clear head. Question everything.**

**PRE-LAUNCH / UNDER OBSERVATION**

![ONCALL public case file: the capybara mascot reviews a notebook in teal scrubs. Evidence first. Memes after rounds. Status: Under observation.](assets/github/oncall-repository-preview-1280x640.png)

ONCALL is an independent medicine, science, and market-culture meme project being prepared for a possible PAR multi-market launch on Robinhood Chain. The website and this research layer are local work for review. No token contract, pools, launch transaction, final ticker, fee settings, or live PAR eligibility has been published or verified yet.

Science Notes explain evidence and its limits. Market Rounds discuss company and market context. Night Shift is fictional mascot humour. None of these confers clinical authority or investment merit. ONCALL is not a medical product, investment product, index fund, collateralized asset, or guaranteed tracker. No endorsement by PAR, Robinhood, underlying issuers, journals, or authors is claimed.

## Read the record

Public repository: [github.com/oncallcapy/oncall](https://github.com/oncallcapy/oncall).

- [Website source](src/pages/index.astro) and [shared project brief](PROJECT_BRIEF.md)
- [Science Notes: editorial contract](science-notes/README.md)
- [Methodology: evidence workflow](methodology/README.md)
- [Pair files: selected quote-asset contracts and verification boundaries](pair-files/README.md)
- [Source ledger: dated sources and their limits](SOURCE_LEDGER.md)
- [Risk register](risk/README.md)
- [Contributing and corrections](CONTRIBUTING.md)

No reviewed Science Note is published yet. The empty science collection is intentional: a passing content schema is not a clinical review.

## Five selected pairs

**SELECTED / TECHNICAL CHECK PENDING.** LLY, JNJ, HIMS, MRNA and UNH are the selected and intended five pair identities. Selection is fixed as the project direction; ONCALL pools have not been launched. A failed technical check blocks launch and requires an explicit new decision. There is no silent substitution. The official [assets API](https://api.robinhood.com/rhj/assets) reported the entries active on chain ID 4663 at **2026-09-06T15:38:34Z**. This is a dated observation; PAR eligibility, routing and liquidity require separate fresh evidence.

| Selected symbol | Underlying company | API observation | PAR status | Route status |
| --- | --- | --- | --- | --- |
| LLY | Eli Lilly and Company | ACTIVE | PENDING | PENDING |
| JNJ | Johnson & Johnson | ACTIVE | PENDING | PENDING |
| HIMS | Hims & Hers Health | ACTIVE | PENDING | PENDING |
| MRNA | Moderna | ACTIVE | PENDING | PENDING |
| UNH | UnitedHealth Group | ACTIVE | PENDING | PENDING |

Contracts and the observation receipt are in the [pair register](pair-files/README.md). The [five research-track mappings](pair-files/README.md#research-track-mapping) are explicit project metadata: LLY covers metabolic medicine, obesity, diabetes and cardiometabolic outcomes; JNJ covers broad clinical medicine, medical technology and evidence appraisal; HIMS covers digital health, telemedicine and patient communication; MRNA covers molecular medicine, immunology and vaccine science; UNH covers health systems, outcomes and population health. These associations do not validate treatments, companies or trading decisions. Science articles remain evidence-based and brand-neutral in their titles and conclusions.

Stock Tokens provide economic exposure and do **not** grant legal or beneficial rights in the issuer of the underlying security. Robinhood describes them as debt securities issued by Robinhood Assets (Jersey) Limited. Availability restrictions and terms apply. [Official Stock Token explanation](https://robinhood.com/rhj/stocktokens/) (accessed 2026-09-06).

## Evidence architecture

The five selected pair identities organize research domains. Sources, claims and limits then pass through human review before a Science Note can be published. The separate PAR check concerns technical market readiness and provides no scientific validation. See the [methodology](methodology/README.md) and [visual asset notes](assets/github/README.md).

![Five selected pairs map to research domains: LLY to metabolic medicine; JNJ to clinical medicine and technology; HIMS to digital health; MRNA to molecular medicine; UNH to health systems. The lanes converge into source ledger, claim and limits, human review, and Science Note. A separate technical branch keeps PAR checks pending and blocks launch until validated.](assets/github/oncall-evidence-architecture.svg)

## AI assistance and accountability

AI may assist with code, design, copyediting, literature discovery and drafts. It is neither a source nor an author. A human must retrieve and check the underlying evidence, disclose relevant assistance, and take responsibility for the final text. Scientific publication and final claims require named human clinical/editorial review. Nothing is published automatically on the strength of generated text or passing tests. The [editorial contract](science-notes/README.md) defines the required review record.

## Local development

Use Node.js 22.12 or later and npm. From this repository:

```sh
npm ci
npm run dev
```

Open the local address printed by the development server. To validate the site:

```sh
npm run test
npx playwright install chromium
npm run test:e2e
npm run build
```

`npm run preview` serves the built site locally. Build and preview commands do not publish it. The browser installation command downloads the browser used by the test suite.

The recorded baseline at commit `b7cabe1` is **113 passing unit tests, 40 passing browser tests and 8 built routes**. These counts describe that local website revision, not scientific accuracy, accessibility certification, an audit, or production acceptance. Re-run the commands after any change; later counts may differ.

## Current limits

- The site, GitHub research layer and launch material are under local review; no public deployment is established by this repository.
- ONCALL contract, pools, launch receipt, final ticker, creator tax, pool fees and fee recipient policy remain pending.
- The five API entries are a timestamped metadata observation, not continuous monitoring or proof of PAR eligibility, route depth or executable liquidity.
- No reviewed Science Note, named reviewer approval, clinical validation or financial return evidence is published here.
- Contract audit assurance is absent; platform documentation and API results can change. Read the [risk register](risk/README.md) before interpreting planned market mechanics.
- A public repository, website publication, wallet connection or launch requires Erdem's explicit approval of the final concrete result.

The mascot can stay awake. The evidence still needs checking.
