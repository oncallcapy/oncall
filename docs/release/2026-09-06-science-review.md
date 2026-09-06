# ONCALL Science Notes — release review record

> **Release state:** source checked and structurally validated; named human scientific approval of the exact wording is not recorded.

This record separates what has been verified from the decision that still belongs to a human reviewer. It covers the five Science Notes dossiers introduced in `ff29d95`, the ORBITA erratum addition in `2fcc74e`, the long-form renderer in `f7cf981`, and the evidence-presentation refinements in `b8b6b99`. The release candidate inspected for this record is based on `4f1da56`.

## Review packet

| Pair metadata | Evidence dossier | Three-study scope | Review material |
| --- | --- | --- | --- |
| `LLY` · Eli Lilly and Company | **Weight Is Not the Whole Outcome** | Diabetes prevention; intensive lifestyle intervention; cardiovascular outcomes in obesity | [Dossier source](../../src/content/science/beyond-weight-and-cardiometabolic-outcomes.json) · [studies 1–3](../../science-notes/source-review/2026-09-06-study-selection.md#metabolic-medicine-and-cardiometabolic-outcomes) |
| `JNJ` · Johnson & Johnson | **Three Questions, Three Kinds of Evidence** | Sham-controlled procedure evidence; critical-care fluid synthesis; blinding meta-epidemiology | [Dossier source](../../src/content/science/evaluating-clinical-evidence-and-devices.json) · [studies 4–6](../../science-notes/source-review/2026-09-06-study-selection.md#clinical-evidence-procedures-and-appraisal) |
| `HIMS` · Hims & Hers Health | **The Screen Is Not the Intervention** | Digitally supported blood-pressure care; telephone consultation; teach-back | [Dossier source](../../src/content/science/digital-care-and-patient-communication.json) · [studies 7–9](../../science-notes/source-review/2026-09-06-study-selection.md#digital-care-and-patient-communication) |
| `MRNA` · Moderna | **Inside mRNA Evidence** | Vaccine evidence synthesis; germinal-centre biology; population safety surveillance | [Dossier source](../../src/content/science/inside-mrna-evidence.json) · [studies 10–12](../../science-notes/source-review/2026-09-06-study-selection.md#mrna-evidence-mechanism-and-safety) |
| `UNH` · UnitedHealth Group | **The Record Is Not the Whole Patient** | Medicaid access; proxy bias in population algorithms; regional diagnostic practice | [Dossier source](../../src/content/science/health-systems-and-recorded-outcomes.json) · [studies 13–15](../../science-notes/source-review/2026-09-06-study-selection.md#health-systems-and-recorded-outcomes) |

The pair names above are editorial mapping metadata. They do not attribute the studies to those companies, imply sponsorship or endorsement, validate a product, or support an investment conclusion. Scientific titles, questions, findings and conclusions remain brand neutral.

## Checks completed

- **Fifteen distinct primary study identities:** three per dossier, with DOI or equivalent persistent records captured beside each study.
- **Authoritative source access:** PubMed, PubMed Central, publisher, Cochrane or Nature records were independently reopened on 2026-09-07. Access class and access failures are retained in the [study-selection record](../../science-notes/source-review/2026-09-06-study-selection.md).
- **Correction surveillance:** four affected source records carry their correction or erratum identifiers. The files avoid transferring numerical details from correction pages that could not be reopened.
- **Scope discipline:** study design, question, finding and limitation travel together. The collection is explicitly educational and is not a systematic review, guideline, treatment recommendation or investment analysis.
- **Machine validation:** schema and content tests enforce five dossiers, three studies per dossier, the fixed metadata mappings, unique primary identities, correction notices and absent review metadata. Browser checks verify the long-form structure and source links render.

## Correction and access notes requiring human attention

1. **Look AHEAD:** correction DOI `10.1056/NEJMx140022` concerns a secondary composite label. Its page returned HTTP 403 during recheck; no corrected numerical value is reproduced.
2. **ORBITA:** PubMed links erratum DOI `10.1016/S0140-6736(17)33366-4`, PMID `29323656`. The erratum text was inaccessible; its substance is not inferred and no possibly affected detail is transferred.
3. **Blinding meta-epidemiology:** correction DOI `10.1136/bmj.m358` concerns author information. The publisher page and PubMed correction record were inaccessible during the latest check.
4. **Regional diagnostic practice:** correction DOI `10.1056/NEJMx100034` could not be reopened. Disputed table values and percentages are not reproduced.
5. **Access limits:** the standard PubMed pages for DPP, Look AHEAD and HOME BP opened without readable body text on 2026-09-07. Other records vary among abstract, evidence-summary, article-page and full-text access.
6. **Sponsor context:** the SELECT cardiovascular-outcomes trial was industry funded. Sponsor role, protocol, analysis and disclosures require full-paper human review before publication-level interpretation.

## Human decision still required

No reviewer identity, credentials, review date or approval scope has been supplied for the exact five-dossier revision. Accordingly:

- `reviewer` and `reviewedAt` remain absent from all five JSON files;
- this record does not call the dossiers clinically reviewed, peer reviewed or approved;
- the repository may expose the materials for inspection, but production deployment of the Science collection remains prohibited until exact-revision approval is documented;
- later approval must name the reviewer exactly as supplied, record the review date and revision, state the scope and limitations, and preserve any requested corrections in the repository history.

The acceptance act belongs to the human reviewer. A passing test, an AI source check, a GitHub commit or a deployment cannot perform it.
