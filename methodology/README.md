# Evidence methodology

The purpose of this workflow is to make a claim inspectable and its limits visible. It does not promise a systematic review for every note or a validated evidence-rating service. The intended product is a carefully scoped educational explanation reviewed by a named human. No reviewed note has been published yet.

## Formulate a focused question

Record the population and setting, intervention or exposure, comparator, outcomes and follow-up of interest. Explain why those outcomes matter to patients or decision-makers. Separate a clinical question from a mechanistic hypothesis. Write the question before looking for a favourable result; document later changes and their reasons.

## Search and record provenance

Search primary research and authoritative sources appropriate to the question. Record databases or websites, search terms, search date, eligibility criteria, language or date restrictions and the reason each included source is relevant. Record important conflicting evidence and exclusions. A targeted educational search must be described as such; do not call it comprehensive or systematic without the corresponding methods. Preserve source version, complete citation, persistent identifier, HTTPS URL and access date in the note. The [source ledger](../SOURCE_LEDGER.md) lists infrastructure and methodological references, not a substitute bibliography for an individual note.

## Identify design and reporting guidance

Identify whether a source is a randomised trial, observational study, diagnostic accuracy study, review, guideline, laboratory study or another design. Choose a reporting guideline using the [EQUATOR library](https://www.equator-network.org/reporting-guidelines/). Use [CONSORT 2025](https://www.consort-spirit.org/published-statements) for relevant randomised-trial reporting and [PRISMA 2020](https://www.prisma-statement.org/prisma-2020) for relevant systematic-review reporting. Reporting checklists improve transparency; they are not scales of study quality and do not establish certainty or truth.

## Extract the evidence before interpreting it

Record population, sample size, eligibility, setting, intervention or exposure, comparator, outcomes and time. Extract effect estimates, denominators and uncertainty intervals; specify adjusted versus unadjusted estimates and key adjustment factors. Distinguish prespecified primary outcomes from secondary, subgroup and post hoc analyses. For harms, record ascertainment methods and observation time. Where feasible, present absolute and relative effects together using a stated baseline risk. Lack of statistical significance does not establish equivalence or safety; evaluate precision and the range of effects compatible with the data.

## Assess limitations and certainty

Examine risk of bias, indirectness, imprecision, inconsistency and publication concerns. Consider allocation and masking where relevant, selection, confounding, measurement, attrition, missing-data handling, multiplicity and selective outcome reporting. Compare registrations and protocols with the final report and check for publisher corrections, retractions and expressions of concern. Consider whether surrogate endpoints, short follow-up or selected populations limit application to patient-important outcomes and routine care.

Use the [GRADE Book](https://book.gradepro.org/) to understand structured assessment of evidence certainty across a body of evidence. A formal GRADE judgement requires an explicit, outcome-specific rationale and suitable expertise; do not attach a certainty label merely because a reporting checklist was completed. CONSORT and PRISMA address reporting, GRADE addresses evidence certainty, and none substitutes for critical appraisal. Where the note does not perform a formal assessment, describe the limitations directly and say so.

## Separate finding, interpretation and non-claims

Present what investigators observed with a supporting citation. Mark the note author's interpretation as interpretation and explain its assumptions. State what is not established: causal effects from an association, clinical benefit from a laboratory mechanism, individual outcomes from group estimates, or benefit from a surrogate alone. Keep company and market arguments out of Science Note framing. Mascot humour cannot supply evidence or diminish a material limitation.

## Obtain named human review

A human checks the sources, extracted values, interpretation, conflicts of interest, privacy and final wording. Record the reviewer's name, relevant expertise, review scope, date, exact revision and decision. Unresolved substantive objections block publication. Follow the [ICMJE Recommendations](https://www.icmje.org/recommendations/) (updated January 2026) as relevant editorial guidance; citing them does not confer journal approval or make this project a journal.

AI may assist with literature discovery, extraction drafts, code, design and copyediting. Check all generated citations against the actual source and all extracted quantities against the original report. Disclose the tool and nature of assistance in the review record when used. AI is not an author or evidence source and cannot give final scientific approval. Named humans remain accountable for publication and all final claims.

## Publish and preserve the correction path

Publish only the approved revision, with references, access dates and a visible correction history. Git commits identify immutable content snapshots; preserve public history without rewriting released revisions. Git alone does not prevent a maintainer from deleting or rewriting a branch, so this is also a maintenance commitment. Link each correction to the affected version, issue, reason, reviewer decision and replacement commit. For unreliable material, use a visible withdrawal or retraction notice rather than silently removing the history. See the [editorial states](../science-notes/README.md) and [correction template](../.github/ISSUE_TEMPLATE/correction.md).

## Official methodology references

All sources below were accessed on **2026-09-06** in preparation of the project source record. Recheck the current version before using a guideline for a new note.

- [ICMJE Recommendations](https://www.icmje.org/recommendations/), updated January 2026: editorial responsibilities, authorship and related publication guidance.
- [CONSORT official published statements](https://www.consort-spirit.org/published-statements), including CONSORT 2025: reporting randomised trials.
- [PRISMA 2020](https://www.prisma-statement.org/prisma-2020): reporting systematic reviews.
- [GRADE Book](https://book.gradepro.org/): assessing evidence certainty and related methodology.
- [EQUATOR reporting guideline library](https://www.equator-network.org/reporting-guidelines/): identifying reporting guidance for the study design.
