import { describe, expect, it } from 'vitest';
import { scienceDossierSchema } from '../../src/content/schemas/scienceNote';

// Synthetic schema fixture only; this is not a reviewed or publishable dossier.
const reference = {
  url: 'https://example.org/study',
  title: 'Synthetic source for schema validation',
  authorOrGroup: 'Example research group',
  year: 2025,
  accessedAt: '2026-09-06',
  doi: '10.0000/schema-study',
};

const study = {
  id: 's1',
  originalTitle: 'Synthetic Study Title for Validation',
  citation: 'Example Group. Synthetic Study Citation. 2025.',
  year: 2025,
  design: 'Randomised trial with predefined outcomes.',
  question: 'Whether an intervention changed a measured outcome.',
  finding: 'The estimate is reported with uncertainty.',
  limits: 'This synthetic record does not establish patient benefit.',
  identifiers: { doi: '10.0000/schema-study' },
  sources: [reference],
};

const validDossier = {
  slug: 'evidence-under-uncertainty',
  theme: 'clinical-evidence',
  pair: { ticker: 'MRNA', company: 'Moderna' },
  title: 'Reading clinical evidence under uncertainty',
  dek: 'A synthetic dossier used only to specify the publication structure.',
  clinicalQuestion: 'How should a reader interpret an estimate and its uncertainty?',
  whyItMatters: 'The answer helps distinguish a result from a treatment recommendation.',
  methods: 'The dossier compares source-led study records and their stated limits.',
  synthesis: 'The studies answer related but distinct questions about clinical evidence.',
  limits: 'This structure cannot establish scientific truth or individual benefit.',
  studies: [study, { ...study, id: 's2' }, { ...study, id: 's3' }],
  searchedAt: '2026-09-06',
};

describe('science dossier schema', () => {
  it('requires exactly three source-led study records', () => {
    const parsed = scienceDossierSchema.safeParse(validDossier);
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data.studies).toHaveLength(3);
    expect(scienceDossierSchema.safeParse({ ...validDossier, studies: validDossier.studies.slice(0, 2) }).success).toBe(false);
    expect(scienceDossierSchema.safeParse({ ...validDossier, studies: [...validDossier.studies, study] }).success).toBe(false);
  });

  it('keeps company identity in mapping metadata only', () => {
    for (const field of ['title', 'dek', 'clinicalQuestion', 'whyItMatters', 'methods', 'synthesis', 'limits'] as const) {
      expect(scienceDossierSchema.safeParse({ ...validDossier, [field]: `Moderna ${validDossier[field]}` }).success).toBe(false);
      expect(scienceDossierSchema.safeParse({ ...validDossier, [field]: `MRNA ${validDossier[field]}` }).success).toBe(false);
    }
    expect(scienceDossierSchema.safeParse(validDossier).success).toBe(true);
  });

  it('allows biological lowercase mRNA while blocking ticker framing in study records', () => {
    expect(scienceDossierSchema.safeParse({
      ...validDossier,
      studies: validDossier.studies.map((record) => ({ ...record, finding: 'mRNA biology is discussed without ticker framing.' })),
    }).success).toBe(true);
    expect(scienceDossierSchema.safeParse({
      ...validDossier,
      studies: validDossier.studies.map((record) => ({ ...record, finding: 'MRNA ticker framing is excluded.' })),
    }).success).toBe(false);
  });

  it('requires reviewer and reviewedAt together while allowing both to remain absent', () => {
    expect(scienceDossierSchema.safeParse(validDossier).success).toBe(true);
    expect(scienceDossierSchema.safeParse({ ...validDossier, reviewer: 'Dr Example' }).success).toBe(false);
    expect(scienceDossierSchema.safeParse({ ...validDossier, reviewedAt: '2026-09-06' }).success).toBe(false);
    expect(scienceDossierSchema.safeParse({ ...validDossier, reviewer: 'Dr Example', reviewedAt: '2026-09-06' }).success).toBe(true);
  });
});
