# ONCALL Science and Full Files Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Populate the cinematic website with five long-form Science dossiers containing three verified studies each, then replace every remaining temporary route with complete public-facing prose and source records.

**Architecture:** Five content records map one selected pair to one brand-neutral research dossier. Each dossier renders a long-form synthesis followed by exactly three study files with claim-level source links and limits. Other routes share the approved cinematic shell but retain separate science, market, technical, humour, and risk responsibilities.

**Tech Stack:** Astro content collections, TypeScript, Zod, semantic HTML, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-06-oncall-cinematic-redesign.md`

## Global Constraints

- Execution begins only after Erdem approves the cinematic UX prototype.
- Science launches with five dossiers and exactly three studies per dossier: 15 studies total.
- LLY, JNJ, HIMS, MRNA, and UNH are editorial metadata mappings; scientific titles, questions, findings, and conclusions remain brand-neutral.
- Preserve original publication titles in citations; do not imply issuer, journal, author, Robinhood, or PAR endorsement.
- Do not fabricate study results, effect sizes, citations, sponsor roles, corrections, human reviewer names, or review dates.
- Use `.superpowers/sdd/2026-09-06-oncall-cinematic-redesign/science-pack-a.md` and `science-pack-b.md` as the verified source-selection records. Re-open source links before publishing any exact numerical claim.
- The final public page must contain no `PENDING`, `empty file`, `working identity`, `provisional`, or disabled launch control.
- Unknown launch values stay out of the rendered interface until verified; existing contract observations retain their date and limits.
- Every dossier must be approved by a named human scientific reviewer before public website deployment. Repository push may contain clearly identified reviewable source files but must not label them clinically reviewed without that approval.
- Commit and request an independent review after each task.

---

### Task 1: Long-form Science dossier schema

**Files:**
- Modify: `src/content/schemas/scienceNote.ts`
- Modify: `src/content.config.ts`
- Create: `tests/unit/science-dossier-schema.test.ts`
- Modify: `science-notes/README.md`

**Interfaces:**
- Consumes: existing `ScienceThemeId` and evidence-framing exclusions.
- Produces: `scienceDossierSchema`, `ScienceDossier`, `StudyRecord`, and a five-record content collection.

- [ ] **Step 1: Write failing schema tests**

```ts
import { describe, expect, it } from 'vitest';
import { scienceDossierSchema } from '../../src/content/schemas/scienceNote';

describe('science dossier schema', () => {
  it('requires exactly three source-led study records', () => {
    const parsed = scienceDossierSchema.safeParse(validDossier);
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data.studies).toHaveLength(3);
    expect(scienceDossierSchema.safeParse({ ...validDossier, studies: validDossier.studies.slice(0, 2) }).success).toBe(false);
  });

  it('keeps company identity in mapping metadata only', () => {
    for (const field of ['title', 'dek', 'clinicalQuestion', 'whyItMatters', 'synthesis', 'limits'] as const) {
      expect(scienceDossierSchema.safeParse({ ...validDossier, [field]: `Moderna ${validDossier[field]}` }).success).toBe(false);
    }
    expect(scienceDossierSchema.safeParse({ ...validDossier, pair: { ticker: 'MRNA', company: 'Moderna' } }).success).toBe(true);
  });
});
```

The fixture must include all required values, three complete studies, direct HTTPS sources, access date `2026-09-06`, and no blank strings.

- [ ] **Step 2: Run the test and confirm it fails on the missing schema**

Run: `npm test -- tests/unit/science-dossier-schema.test.ts`

Expected: FAIL because `scienceDossierSchema` does not exist.

- [ ] **Step 3: Define the exact record types**

```ts
export const studyRecordSchema = z.object({
  id: z.string().min(2),
  originalTitle: z.string().min(8),
  citation: z.string().min(12),
  year: z.number().int().min(1900).max(2026),
  design: evidenceFraming,
  question: evidenceFraming,
  finding: evidenceFraming,
  limits: evidenceFraming,
  identifiers: z.object({ doi: z.string().optional(), pmid: z.string().optional() }),
  sources: z.array(referenceSchema).min(1),
  correction: z.string().min(12).optional(),
});

export const scienceDossierSchema = z.object({
  slug: z.string().min(3),
  theme: scienceThemeIdSchema,
  pair: z.object({ ticker: z.enum(['LLY', 'JNJ', 'HIMS', 'MRNA', 'UNH']), company: z.string().min(2) }),
  title: evidenceFraming,
  dek: evidenceFraming,
  clinicalQuestion: evidenceFraming,
  whyItMatters: evidenceFraming,
  methods: evidenceFraming,
  synthesis: evidenceFraming,
  limits: evidenceFraming,
  studies: z.array(studyRecordSchema).length(3),
  searchedAt: z.iso.date(),
  reviewer: z.string().min(3).optional(),
  reviewedAt: z.iso.date().optional(),
  correctionHistory: z.array(z.object({ date: z.iso.date(), note: z.string().min(8) })).default([]),
}).superRefine((data, context) => {
  if ((data.reviewer && !data.reviewedAt) || (!data.reviewer && data.reviewedAt)) {
    context.addIssue({ code: 'custom', path: ['reviewer'], message: 'reviewer and reviewedAt must be recorded together' });
  }
});
```

Reuse and expand the existing brand-exclusion validator so company/ticker terms are prohibited in scientific framing and allowed only in `pair` metadata. Preserve biological lowercase `mRNA` while continuing to block ticker `MRNA` in framing fields.

- [ ] **Step 4: Update the editorial contract**

Document the five-dossier/15-study structure, source-access notes, correction records, metadata-only pair association, named human review requirement, and the rule that a selected study is not a clinical guideline.

- [ ] **Step 5: Run all unit tests and commit**

Run: `npm test`

Expected: all unit tests pass.

```bash
git add src/content.config.ts src/content/schemas/scienceNote.ts tests/unit/science-dossier-schema.test.ts science-notes/README.md
git commit -m "feat: define long-form Science dossier records"
```

### Task 2: Five dossiers and fifteen verified studies

**Files:**
- Create: `src/content/science/beyond-weight-and-cardiometabolic-outcomes.json`
- Create: `src/content/science/evaluating-clinical-evidence-and-devices.json`
- Create: `src/content/science/digital-care-and-patient-communication.json`
- Create: `src/content/science/inside-mrna-evidence.json`
- Create: `src/content/science/health-systems-and-recorded-outcomes.json`
- Create: `science-notes/source-review/2026-09-06-study-selection.md`
- Test: `tests/unit/science-dossier-content.test.ts`

**Interfaces:**
- Consumes: `scienceDossierSchema`, the 15 verified records in source packs A/B, and the exact five pair mappings.
- Produces: five valid dossier records, three studies each, with 15 unique DOI/PMID identities.

- [ ] **Step 1: Write failing content-integrity tests**

```ts
import { describe, expect, it } from 'vitest';
import dossiers from './fixtures/load-science-dossiers';

describe('launch Science dossiers', () => {
  it('publishes five mapped dossiers with three unique studies each', () => {
    expect(dossiers).toHaveLength(5);
    expect(dossiers.map(d => d.pair.ticker)).toEqual(['LLY', 'JNJ', 'HIMS', 'MRNA', 'UNH']);
    expect(dossiers.every(d => d.studies.length === 3)).toBe(true);
    const identities = dossiers.flatMap(d => d.studies.map(s => s.identifiers.doi ?? `pmid:${s.identifiers.pmid}`));
    expect(new Set(identities).size).toBe(15);
  });
});
```

- [ ] **Step 2: Run the content test and confirm all five records are missing**

Run: `npm test -- tests/unit/science-dossier-content.test.ts`

Expected: FAIL because no launch dossiers exist.

- [ ] **Step 3: Create the LLY dossier from A1–A3**

Use these three exact publications and their verified details from source pack A:

1. Knowler et al., `Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin`, DOI `10.1056/NEJMoa012512`.
2. Look AHEAD Research Group, `Cardiovascular effects of intensive lifestyle intervention in type 2 diabetes`, DOI `10.1056/NEJMoa1212914`, including its recorded correction note.
3. Lincoff et al., `Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes`, DOI `10.1056/NEJMoa2307563`, with sponsor/generalizability limits.

Use the public title `Weight Is Not the Whole Outcome`. Synthesize diabetes prevention, risk-factor change, direct cardiovascular outcomes, adverse-event discontinuation, and why surrogate improvement is not automatically an event reduction. Do not make a treatment recommendation.

- [ ] **Step 4: Create the JNJ dossier from A4–A6**

Use these three exact clinical-evidence/device records and copy their verified design descriptions, findings, access notes, and corrections from source pack A:

1. ORBITA, `Percutaneous coronary intervention in stable angina (ORBITA): a double-blind, randomised controlled trial`, DOI `10.1016/S0140-6736(17)32714-9`.
2. BEST-Living, `Balanced crystalloids versus saline for critically ill patients: a systematic review and individual patient data meta-analysis`, DOI `10.1016/S2213-2600(23)00417-4`.
3. Moustgaard et al., `Impact of blinding on estimated treatment effects in randomised clinical trials: meta-epidemiological study`, DOI `10.1136/bmj.l6802`, including correction DOI `10.1136/bmj.m358`.

The public dossier must explain that procedure/device evidence, treatment synthesis, and meta-epidemiology answer different questions. Do not use Johnson & Johnson in any scientific framing field.

- [ ] **Step 5: Create the HIMS dossier from A7–A9**

Use:

1. McManus et al., HOME BP RCT, DOI `10.1136/bmj.m4858`.
2. Chair et al., telephone consultation systematic review/meta-analysis, DOI `10.1089/tmj.2023.0002`.
3. Talevski et al., teach-back systematic review, DOI `10.1371/journal.pone.0231350`.

The synthesis must separate a digital care pathway, telephone service delivery, and a communication technique. It must state that access requirements and heterogeneous settings limit generalization.

- [ ] **Step 6: Create the MRNA dossier from B-M1–B-M3**

Use:

1. Graña et al., Cochrane `Efficacy and safety of COVID-19 vaccines`, DOI `10.1002/14651858.CD015477`.
2. Turner et al., `SARS-CoV-2 mRNA vaccines induce persistent human germinal centre responses`, DOI `10.1038/s41586-021-03738-2`.
3. Barda et al., `Safety of the BNT162b2 mRNA Covid-19 Vaccine in a Nationwide Setting`, DOI `10.1056/NEJMoa2110475`.

Separate clinical efficacy, cellular mechanism, and observational safety. State the evidence cutoff, small mechanistic sample, time window, denominator, and current-variant limitations. Do not present this as a 2026 vaccination schedule.

- [ ] **Step 7: Create the UNH dossier from B-H1–B-H3**

Use:

1. Baicker et al., `The Oregon Experiment — Effects of Medicaid on Clinical Outcomes`, DOI `10.1056/NEJMsa1212321`.
2. Obermeyer et al., `Dissecting racial bias in an algorithm used to manage the health of populations`, DOI `10.1126/science.aax2342`.
3. Song et al., `Regional Variations in Diagnostic Practices`, DOI `10.1056/NEJMsa0910881`, with correction DOI `10.1056/NEJMx100034` and no disputed numerical transfer.

Explain multidimensional coverage outcomes, cost as an imperfect proxy for need, and diagnostic-intensity effects in claims. Do not make an insurer-quality or investment conclusion.

- [ ] **Step 8: Publish the source-selection record**

Convert the two internal source packs into one public, concise source-review document. Preserve access dates, full-text/abstract limits, correction warnings, sponsor-review requirements, and the statement that the selection is not a systematic review or clinical guideline.

- [ ] **Step 9: Run integrity tests and commit**

Run: `npm test`

Expected: five schema-valid dossiers, exactly three studies each, 15 unique identities, and all existing exact pair tests pass.

```bash
git add src/content/science tests/unit/science-dossier-content.test.ts science-notes/source-review
git commit -m "content: add fifteen verified Science studies"
```

### Task 3: Long-form Science index and dossier pages

**Files:**
- Modify: `src/pages/science/index.astro`
- Modify: `src/pages/science/[slug].astro`
- Modify: `src/components/ScienceNoteCard.astro`
- Create: `src/components/StudyRecord.astro`
- Create: `src/components/EvidenceHeader.astro`
- Modify: `src/components/CitationList.astro`
- Modify: `src/styles/editorial-file.css`
- Test: `tests/acceptance/science-dossiers.spec.ts`

**Interfaces:**
- Consumes: five `ScienceDossier` records.
- Produces: a populated Science index and five long-form dossier URLs with exactly three visible studies each.

- [ ] **Step 1: Write failing browser tests**

Test that `/science/` shows five dossier links and the five metadata tickers; each detail route shows the clinical question, synthesis, limits, exactly three `article[data-study-record]` blocks, direct source URLs, access dates, correction notes when present, and no company/ticker in scientific headings or conclusion. Confirm the Science detail page is longer than the other file summaries and remains readable at 390 px.

- [ ] **Step 2: Run the focused test and confirm the empty Science page fails**

Run: `npm run test:e2e -- tests/acceptance/science-dossiers.spec.ts`

Expected: FAIL because the current collection has no dossiers and the renderer lacks study records.

- [ ] **Step 3: Build semantic long-form components**

`EvidenceHeader` renders metadata, search date, clinical question, and review provenance. `StudyRecord` renders one numbered `<article>` with original title, citation, design, question, finding, limits, identifiers, correction, and an ordinary list of direct source links. `CitationList` remains responsible only for source links and never turns a mascot quote into evidence.

- [ ] **Step 4: Build the populated index**

Render five editorial folder entries in the fixed pair order. Show the pair ticker/company only in a clearly labelled `Editorial mapping` line. Use the brand-neutral dossier title and dek as the dominant text. Remove the empty-state component.

- [ ] **Step 5: Build the dossier page**

Render the full dossier in this order: title/dek, editorial mapping, clinical question, why it matters, methods/search date, synthesis, three study files, cross-study limits, reference access notes, correction history, and a short mascot annotation explicitly labelled `Commentary / not a scientific conclusion`.

- [ ] **Step 6: Run focused tests, accessibility tests, and build**

Run: `npm run test:e2e -- tests/acceptance/science-dossiers.spec.ts tests/acceptance/accessibility.spec.ts`

Expected: all focused tests pass with no serious accessibility violations.

Run: `npm run build`

Expected: eight top-level pages plus five Science detail routes build with zero Astro errors.

- [ ] **Step 7: Commit**

```bash
git add src/pages/science src/components src/styles/editorial-file.css tests/acceptance/science-dossiers.spec.ts
git commit -m "feat: publish long-form ONCALL Science dossiers"
```

### Task 4: Complete the remaining seven files

**Files:**
- Modify: `src/pages/chart.astro`
- Modify: `src/pages/pairs.astro`
- Modify: `src/pages/robinhood-chain.astro`
- Modify: `src/pages/market-rounds.astro`
- Modify: `src/pages/night-shift.astro`
- Modify: `src/pages/sources-and-risks.astro`
- Modify: `src/data/projectFacts.ts`
- Modify: `src/components/PairCaseCard.astro`
- Modify: `README.md`
- Test: `tests/acceptance/full-files.spec.ts`

**Interfaces:**
- Consumes: verified project facts, fixed pair records, source ledger, and cinematic file shell.
- Produces: complete public prose on all top-level files without false launch state.

- [ ] **Step 1: Write failing full-file acceptance tests**

For every top-level route, assert a unique heading, at least two substantive sections, ordinary links to related files, repository link, and absence of temporary-state language. On Five Pairs, assert exactly five selected records and all exact official contract addresses. On Chain and Sources, assert the dated API observation and unaudited/technical limits remain visible. On Market Rounds and Night Shift, assert the page explains its editorial role and contains prepared launch entries rather than an empty state.

- [ ] **Step 2: Run the focused test and record current incomplete routes**

Run: `npm run test:e2e -- tests/acceptance/full-files.spec.ts`

Expected: FAIL on temporary and empty-state copy.

- [ ] **Step 3: Complete each file without inventing launch facts**

Use the final-public voice. Hide unresolved token-address, pool, launch-transaction, tax, fee, route, priceability, and liquidity rows instead of rendering pending values. Keep the fixed pair identity and dated official contract observation. Add complete explanatory prose, cross-links, sources, and explicit medical/financial limits.

Market Rounds receives one launch article explaining why health-market narratives are not clinical evidence or investment recommendations. Night Shift receives three short original mascot entries that can also seed X, with no fake performance claim. The Chart explains ONCALL's purpose, editorial separation, and verified fields. Chain explains platform mechanics and what a multi-pair structure does and does not establish.

- [ ] **Step 4: Update README with the final information architecture and visuals**

Replace references to the former static chart shell and empty launch files. Link the approved opening, open Science state, turntable, 15-study source review, methodology, corrections, pair records, and public repository URL.

- [ ] **Step 5: Run all tests and build**

Run: `npm test`

Expected: all unit tests pass.

Run: `npm run test:e2e`

Expected: all browser, responsive, accessibility, no-script, science, and exact-data tests pass.

Run: `npm run build`

Expected: zero errors and all top-level plus Science routes generated.

- [ ] **Step 6: Commit**

```bash
git add src README.md tests/acceptance/full-files.spec.ts
git commit -m "content: complete the ONCALL public files"
```

### Task 5: Scientific human review, visual acceptance, and public repository push

**Files:**
- Modify: `src/content/science/*.json`
- Modify: `SOURCE_LEDGER.md`
- Modify: `README.md`
- Create: `docs/release/2026-09-06-science-review.md`
- Create: `docs/release/2026-09-06-visual-acceptance.md`

**Interfaces:**
- Consumes: complete local site, 15 source records, test evidence, and Erdem's review decisions.
- Produces: named science-review record, visual-acceptance record, and a public GitHub repository.

- [ ] **Step 1: Present the five dossiers for human scientific review**

Show the title, synthesis, three study findings, limits, correction notes, sponsor/access caveats, and every source link. Record requested edits. Do not populate `reviewer` or `reviewedAt` before explicit approval.

- [ ] **Step 2: Present final desktop/mobile visual evidence**

Open the local website and capture opening, every file, one full Science dossier, mobile navigation, reduced motion, and rapid selection. Record approved revision identifiers and any required changes.

- [ ] **Step 3: Apply approved review metadata**

After explicit approval, set the exact reviewer name and review date supplied by the reviewer. Add the review scope and limitations to `docs/release/2026-09-06-science-review.md`. Never infer credentials or approval scope.

- [ ] **Step 4: Run the fresh release gate**

Run: `npm test`

Run: `npm run test:e2e`

Run: `npm run build`

Run: `git diff --check`

Expected: zero failures/errors, generated routes include five Science dossiers, and the working tree contains only intended release records.

- [ ] **Step 5: Request independent whole-branch review and fix all Critical/Important findings**

Review from the original branch base through release HEAD for misleading medical/financial claims, citation errors, stale temporary language, asset omissions, accessibility, interaction races, secrets, and public repository documentation.

- [ ] **Step 6: Commit the acceptance record**

```bash
git add src/content/science SOURCE_LEDGER.md README.md docs/release
git commit -m "docs: record ONCALL science and visual acceptance"
```

- [ ] **Step 7: Push the authorized public repository**

Create or update public `oncallcapy/oncall`, push the reviewed branch/main state, and verify the remote commit and public README rendering. This authorization covers the GitHub repository only; it does not deploy the website, create a token, execute a PAR transaction, or post to X.
