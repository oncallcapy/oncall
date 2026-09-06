# Science Notes

Science Notes are educational explanations of clinical and scientific evidence. No reviewed Science Note is published yet. This document is the editorial contract for future notes, not a claim that an editorial board or publication programme is already operating.

## Scope and framing

The five topic areas are:

- Metabolism & metabolic medicine
- Evidence-based clinical medicine & medical technology
- Digital health & patient communication
- Molecular medicine, immunology & vaccine science
- Health systems, outcomes & population health

Choose a focused evidence question within a topic. Article titles, summaries, findings, limitations and mascot notes must use clinical or scientific framing without company names, market symbols, promotional product framing or investment implications. Company and market analysis belongs in [pair files](../pair-files/README.md) and Market Rounds. Pair association may appear as explicit research-track metadata linked to the [fixed mapping](../pair-files/README.md#research-track-mapping); it must not be treated as endorsement or company sponsorship. Article titles and conclusions remain evidence-based and brand-neutral. Source citations may identify a sponsor or manufacturer where necessary to describe the actual evidence and conflicts of interest; that identity must not become the article's organising premise.

## Required note structure

The launch collection is a five-dossier programme: one dossier for each fixed
selected-pair research track and exactly three source-led study records in each
dossier, for 15 study records in total. The pair ticker and company name are
mapping metadata only. They must not frame a dossier title, question, methods,
findings, synthesis or limitations. A study's original publication title and
bibliographic citation remain intact, including a necessary author, sponsor or
manufacturer identity. Lowercase biological `mRNA` remains scientific language;
the selected-pair ticker `MRNA` is not scientific framing.

Every dossier records its search date. Every study record needs a direct HTTPS
source link and an access date, together with its persistent identifier or
authoritative-source classification. A correction record identifies what changed
and when; an initial dossier records an empty correction history. The selected
study set is an editorial evidence file, not a clinical guideline, treatment
recommendation or a systematic review.

`reviewer` and `reviewedAt` are optional while a dossier is prepared, but they
must be supplied together when an editorial review is recorded. Do not invent a
reviewer or review date. A dossier may enter the repository collection and a
static build as reviewable source material before that review; neither action is
public deployment, clinical review or publication approval. The production
deployment gate must require both fields and the renderer must never describe a
dossier without both as reviewed. Schema validity cannot grant that approval.

Every planned note must contain these visible sections, even where the honest answer is that evidence is insufficient:

1. **Clinical question:** population, intervention or exposure, comparator, relevant outcomes and time horizon.
2. **Why it matters:** the clinical or scientific context, without promising patient benefit.
3. **What the evidence shows:** study design, sample and setting, endpoint definitions, and a source-linked qualitative conclusion with explicit limits. Include exact effect estimates and uncertainty only when the underlying result and any correction have been directly verified and the final wording has received human review.
4. **What it does not prove:** distinguish association from causation, surrogate outcomes from patient benefit, and group averages from individual predictions.
5. **Uncertainty and limitations:** bias, applicability, harms, missing information and reasons the interpretation could change.
6. **ONCALL note:** restrained fictional mascot commentary that adds no unsupported medical claim or instruction.
7. **Complete references:** author or group, title, year, venue or issuing organisation, persistent identifier and HTTPS source link.
8. **Access dates:** a date for every cited source and the search date, so a later reviewer can distinguish version changes.
9. **Correction history:** initial version and dated corrections, reasons, affected claims and links to the relevant issue and commit. An initial version explicitly records that no corrections have been made.

## Sources and claim checks

References require at least one DOI, PMID, trial or study registry identifier, or an explicit authoritative-source classification. Acceptable classifications include an official clinical guideline with issuing body and version, a regulator's safety communication, an official public-health report or dataset, and an official reporting or evidence-methodology standard. A label such as “authoritative” alone is insufficient. Check that the identifier resolves to the cited item; registration is evidence of a recorded plan, not evidence that a treatment works. A news item or AI response cannot substitute for the underlying scientific source.

Match each factual claim to a source that actually supports its scope, population, endpoint and time horizon. Read the methods and results when access permits, and label abstract-only or summary-level access. A qualitative evidence summary may state the source's conclusion together with design and limits. Report an exact effect estimate or uncertainty interval only after directly verifying the underlying result, checking any linked correction, and obtaining human review of the final wording. Where those checks support quantitative reporting, prefer absolute alongside relative effects and identify the baseline risk, denominator and follow-up; otherwise keep the conclusion qualitative and link the source. Never invent or reconstruct an unavailable estimate.

Assess study-design limits, confounding, selection and measurement bias, endpoint relevance, applicability to other settings, harms and their ascertainment, missing data and attrition, multiplicity and selective reporting. Compare protocol or registration against the publication where available; flag absent plans, unexplained changes and exploratory analyses. Check the publisher and relevant indexing records for corrections, expressions of concern and retractions. Record what was checked and when. The [methodology](../methodology/README.md) explains this workflow and its official references.

Reporting checklists help expose missing reporting; checklist completion does not establish evidence certainty. A schema can validate required fields and known framing exclusions but cannot verify a source or assess scientific truth.

## Publication states and human review

**Draft** means work in progress and normally remains outside the Science
collection. **Human review required** means the evidence extraction and planned
text are ready for scrutiny; a reviewable source dossier in this state may live
in the Science collection and static review build. That inclusion does not make
it public, published or clinically reviewed. Production deployment and
publication require paired `reviewer` and `reviewedAt` metadata **and** an
explicit named human approval for the exact revision, including review scope,
decision, relevant expertise and conflicts of interest. Metadata alone never
establishes or permits a claim of clinical review. Disagreements and unresolved
material limitations must be visible before approval.

**Corrected** means the current published text carries a dated correction notice linked to the superseded revision, reason and review decision. **Retracted/withdrawn** means the text is no longer relied upon: remove it from normal publication listings and retain a clear notice, reasons and historical links. These are editorial workflow states, not fields currently enforced by the website schema. The present renderer does not implement a review queue or withdrawal workflow.

Open a [science review issue](../.github/ISSUE_TEMPLATE/science-note-review.md) for review or a [correction issue](../.github/ISSUE_TEMPLATE/correction.md) for a problem. Urgent factual or broken-link corrections can be made promptly with a visible record; new scientific conclusions still require human review.

## Privacy and use

Do not submit patient data, identifiable case histories, private records or confidential material, including supposedly anonymised examples that could be reidentified. Do not request or provide individual diagnosis or treatment. Notes do not replace a clinician's assessment and must not imply clinical validation of the project. See [contribution rules](../CONTRIBUTING.md).
