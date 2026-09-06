import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import dossiers from './fixtures/load-science-dossiers';

const selectedDois = [
  '10.1056/NEJMoa012512',
  '10.1056/NEJMoa1212914',
  '10.1056/NEJMoa2307563',
  '10.1016/S0140-6736(17)32714-9',
  '10.1016/S2213-2600(23)00417-4',
  '10.1136/bmj.l6802',
  '10.1136/bmj.m4858',
  '10.1089/tmj.2023.0002',
  '10.1371/journal.pone.0231350',
  '10.1002/14651858.CD015477',
  '10.1038/s41586-021-03738-2',
  '10.1056/NEJMoa2110475',
  '10.1056/NEJMsa1212321',
  '10.1126/science.aax2342',
  '10.1056/NEJMsa0910881',
] as const;

describe('launch Science dossiers', () => {
  it('publishes five mapped dossiers with three unique studies each', () => {
    expect(dossiers).toHaveLength(5);
    expect(dossiers.map((dossier) => dossier.pair.ticker)).toEqual(['LLY', 'JNJ', 'HIMS', 'MRNA', 'UNH']);
    expect(dossiers.every((dossier) => dossier.studies.length === 3)).toBe(true);

    const identities = dossiers.flatMap((dossier) =>
      dossier.studies.map((study) => study.identifiers.doi ?? `pmid:${study.identifiers.pmid}`),
    );
    expect(new Set(identities).size).toBe(15);
  });

  it('keeps the source collection reviewable without inventing human approval', () => {
    expect(dossiers.every((dossier) => dossier.reviewer === undefined && dossier.reviewedAt === undefined)).toBe(true);
  });

  it('uses the fifteen selected publication identities in dossier order', () => {
    expect(dossiers.flatMap((dossier) => dossier.studies.map((study) => study.identifiers.doi))).toEqual(selectedDois);
  });

  it('retains required correction and sponsor-access warnings', () => {
    const byStudyId = new Map(dossiers.flatMap((dossier) => dossier.studies).map((study) => [study.id, study]));

    expect(byStudyId.get('look-ahead-cardiovascular-events')?.correction).toContain('10.1056/NEJMx140022');
    expect(byStudyId.get('blinding-meta-epidemiology')?.correction).toContain('10.1136/bmj.m358');
    expect(byStudyId.get('regional-diagnostic-practices')?.correction).toContain('10.1056/NEJMx100034');
    expect(byStudyId.get('select-cardiovascular-outcomes')?.limits).toContain('industry funded');
    expect(dossiers.flatMap((dossier) => dossier.studies).every((study) =>
      study.sources.every((source) => source.url.startsWith('https://') && source.accessedAt === '2026-09-07'),
    )).toBe(true);
  });

  it('publishes a traceable selection record without treating it as a review or guideline', () => {
    const recordPath = fileURLToPath(new URL('../../science-notes/source-review/2026-09-06-study-selection.md', import.meta.url));
    const record = readFileSync(recordPath, 'utf8');

    expect(selectedDois.every((doi) => record.includes(doi))).toBe(true);
    expect(record).toContain('not a systematic review, clinical guideline');
    expect(record).toContain('named human scientific review not yet recorded');
  });
});
