# Source ledger

This ledger separates platform statements, dated technical observations and editorial methodology. **Access date: 2026-09-06**, as recorded during project preparation. An access date is not a promise that a page is unchanged or currently reachable. Recheck relevant pages and versions before a new claim or launch decision. These sources are not endorsements of ONCALL.

Each source can establish only what it actually documents or reports. Platform documentation does not establish an ONCALL deployment; an API status does not establish PAR eligibility or execution quality; a methodology standard does not establish the truth of a medical claim. The opening Science Notes collection has its own complete, claim-matched [fifteen-study selection record](science-notes/source-review/2026-09-06-study-selection.md) under the [editorial contract](science-notes/README.md).

## Platform and asset sources

| Source | Accessed | What it supports | What it does not establish |
| --- | --- | --- | --- |
| [PAR documentation](https://par.family/docs) | 2026-09-06 | PAR's description of multi-market pools, quote eligibility, launch metadata and its unaudited-contract statement. | ONCALL deployment, current selected-pair eligibility, liquidity, safety or final settings. |
| [Robinhood Chain overview / About Robinhood Chain](https://docs.robinhood.com/chain/) | 2026-09-06 | Official platform description and documentation entry point. | Endorsement, ONCALL launch status or the availability of a specific route. |
| [Connecting to Robinhood Chain](https://docs.robinhood.com/chain/connecting/) | 2026-09-06 | Published network settings, including mainnet chain ID 4663 and ETH gas. | A user's connected network, successful transaction or correct destination contract. |
| [Stock Token API documentation](https://docs.robinhood.com/chain/stock-token-apis/) | 2026-09-06 | Official metadata and deployment API interface and interpretation. | A current response, executable price or independently verified chain state. |
| [Official assets API](https://api.robinhood.com/rhj/assets) | 2026-09-06 | The recorded ACTIVE entries for five selected quote-asset contracts at 2026-09-06T15:38:34Z. | Continuous activity, PAR eligibility, route depth, executable liquidity or ONCALL pools. |
| [Official contract directory](https://docs.robinhood.com/chain/contracts/) | 2026-09-06 | Canonical reference information for Stock Token contracts. | ONCALL contracts, pooled collateral, an audit or suitability. |
| [Stock Token product explanation](https://robinhood.com/rhj/stocktokens/) | 2026-09-06 | Robinhood's explanation of economic exposure, debt-security structure, absence of legal or beneficial rights in the underlying issuer, and availability limits. | Share ownership for ONCALL holders, advice for a particular jurisdiction, or guaranteed tracking. |
| [Robinhood Chain explorer](https://robinhoodchain.blockscout.com/) | 2026-09-06 | A public interface for inspecting addresses and transaction records when real identifiers exist. | An ONCALL launch by its mere existence, contract safety, or complete independent validation of indexed data. |
| [Robinhood Chain brand guidelines](https://docs.robinhood.com/chain/brand-guidelines/) | 2026-09-06 | Published naming and brand-use guidance. | Affiliation, endorsement or permission for unrelated claims. |

The [pair files](pair-files/README.md) record the fixed five pair identities and reproduce their quote-asset addresses from repository data. Their status is SELECTED / TECHNICAL CHECK PENDING: a failed technical check blocks launch and requires an explicit new decision, never silent substitution. The active observation records chain ID 4663, 154149 response bytes and SHA-256 `af6387ef7bad187d8a45d1ec9e94807bdd96cd1485d0f7ca85246b70d70119ee`. The raw response is not included in this public layer; the hash is a receipt identifier, not a reproducible snapshot by itself. Current requests may differ.

## Medical and editorial methodology sources

| Source and classification | Accessed | What it supports | What it does not establish |
| --- | --- | --- | --- |
| [ICMJE Recommendations](https://www.icmje.org/recommendations/), official editorial recommendations, updated January 2026 | 2026-09-06 | Editorial responsibility, authorship and publication guidance used to shape the review policy. | Journal status, ICMJE endorsement, a completed review or scientific accuracy. |
| [CONSORT published statements](https://www.consort-spirit.org/published-statements), official reporting guidance including CONSORT 2025 | 2026-09-06 | Reporting requirements for relevant randomised trials. | Low risk of bias, evidence certainty, efficacy or patient benefit from checklist completion. |
| [PRISMA 2020](https://www.prisma-statement.org/prisma-2020), official reporting guideline | 2026-09-06 | Transparent reporting of systematic reviews. | A comprehensive search or reliable synthesis merely because the checklist is cited. |
| [GRADE Book](https://book.gradepro.org/), official evidence-certainty methodology | 2026-09-06 | Structured assessment of certainty across a body of evidence and related methods. | A formal rating for any ONCALL note without a documented assessment. |
| [EQUATOR reporting guideline library](https://www.equator-network.org/reporting-guidelines/), authoritative reporting-guideline directory | 2026-09-06 | Finding guidance suited to a study design. | Critical appraisal or validation of an individual paper. |

The [methodology](methodology/README.md) explains how these roles differ. A reporting standard can improve transparency; it cannot certify an evidence summary or replace subject-matter review.

## Science dossier source collection

The repository contains five evidence dossiers with exactly three primary study identities each. On 2026-09-07, an independent source-access pass reopened the authoritative PubMed, PubMed Central, publisher, Cochrane or Nature record used for every one of the fifteen studies. The pass checked source identity, design, access level and known correction links. It was an editorial source check, not peer review, a systematic search, a GRADE assessment or named human clinical approval.

| Editorial file | Three primary study identities | Source and correction record |
| --- | --- | --- |
| [Metabolic medicine and cardiometabolic outcomes](src/content/science/beyond-weight-and-cardiometabolic-outcomes.json) | DPP — `10.1056/NEJMoa012512`; Look AHEAD — `10.1056/NEJMoa1212914`; SELECT cardiovascular outcomes — `10.1056/NEJMoa2307563` | [Selection record, studies 1–3](science-notes/source-review/2026-09-06-study-selection.md#metabolic-medicine-and-cardiometabolic-outcomes). The Look AHEAD article carries correction DOI `10.1056/NEJMx140022`; the blocked correction page prevented numerical transfer. |
| [Clinical evidence, procedures and appraisal](src/content/science/evaluating-clinical-evidence-and-devices.json) | ORBITA — `10.1016/S0140-6736(17)32714-9`; BEST-Living — `10.1016/S2213-2600(23)00417-4`; blinding meta-epidemiology — `10.1136/bmj.l6802` | [Selection record, studies 4–6](science-notes/source-review/2026-09-06-study-selection.md#clinical-evidence-procedures-and-appraisal). ORBITA has erratum DOI `10.1016/S0140-6736(17)33366-4`, PMID `29323656`; its full text was inaccessible, so its content was not inferred. The blinding study has author-information correction DOI `10.1136/bmj.m358`. |
| [Digital care and patient communication](src/content/science/digital-care-and-patient-communication.json) | HOME BP — `10.1136/bmj.m4858`; telephone consultation — `10.1089/tmj.2023.0002`; teach-back — `10.1371/journal.pone.0231350` | [Selection record, studies 7–9](science-notes/source-review/2026-09-06-study-selection.md#digital-care-and-patient-communication). The summaries retain access, heterogeneity and care-pathway limits. |
| [mRNA evidence, mechanism and safety](src/content/science/inside-mrna-evidence.json) | vaccine evidence synthesis — `10.1002/14651858.CD015477`; germinal-centre response — `10.1038/s41586-021-03738-2`; nationwide safety analysis — `10.1056/NEJMoa2110475` | [Selection record, studies 10–12](science-notes/source-review/2026-09-06-study-selection.md#mrna-evidence-mechanism-and-safety). Search cutoff, mechanistic sample size, observational design and transfer limits remain explicit. |
| [Health systems and recorded outcomes](src/content/science/health-systems-and-recorded-outcomes.json) | Oregon insurance experiment — `10.1056/NEJMsa1212321`; population-algorithm proxy bias — `10.1126/science.aax2342`; regional diagnostic practice — `10.1056/NEJMsa0910881` | [Selection record, studies 13–15](science-notes/source-review/2026-09-06-study-selection.md#health-systems-and-recorded-outcomes). The regional-practice article carries correction DOI `10.1056/NEJMx100034`; the correction page could not be reopened, so disputed table values and percentages are absent. |

Three standard PubMed pages opened without readable body text during the 2026-09-07 recheck: DPP (PMID `11832527`), Look AHEAD (PMID `23796131`) and HOME BP (PMID `33468518`). The source-selection record labels those limitations and identifies which other records were available as abstracts, evidence summaries, article pages or full text. The industry-funded SELECT trial also retains an explicit sponsor-role and disclosure review warning.

The dossier JSON intentionally omits `reviewer` and `reviewedAt`. Schema checks, source identity checks and a successful static build make the material reviewable; they do not establish clinical accuracy or authorize a live scientific publication. The exact revision requires named human review before production deployment. See the [science review boundary](docs/release/2026-09-06-science-review.md).

## Updating a source or correcting a claim

Record the new access date, document version or response timestamp, the precise claim affected and any conflicting evidence. Link the issue and immutable commit identifying the change. A changed URL may need a narrow link repair; a changed source conclusion needs fresh appraisal and named human review before a scientific claim is revised. Keep a visible correction record and never treat an AI summary as the original source.

This ledger lives outside the synced, read-only `sources/` directory. Report errors using the [correction template](.github/ISSUE_TEMPLATE/correction.md).
