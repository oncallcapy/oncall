import { describe, expect, it } from 'vitest';
import { scienceNoteSchema } from '../../src/content/schemas/scienceNote';

// Synthetic contract fixture only; never a reviewed or publishable article.
const reference = {
  url: 'https://example.org/evidence',
  title: 'Synthetic evidence source',
  authorOrGroup: 'Example research group',
  year: 2025,
  accessedAt: '2026-09-06',
  doi: '10.0000/example',
};
const note = {
  title: 'Interpreting absolute clinical effects',
  summary: 'An educational look at clinical evidence and uncertainty.',
  publishedAt: '2026-09-06',
  themes: ['clinical-evidence'],
  finding: 'Absolute effects need a stated baseline risk and time horizon.',
  limits: 'A group estimate does not predict an individual outcome.',
  mascotNote: 'Read the methods before the coffee gets cold.',
  references: [reference],
};
const framingFields = ['title', 'summary', 'finding', 'limits', 'mascotNote'] as const;

describe('Science Note publication structure and editorial guardrails', () => {
  it('accepts a fully sourced evidence-medicine note', () => {
    expect(scienceNoteSchema.safeParse(note).success).toBe(true);
  });

  it.each([undefined, []])('rejects missing or empty references: %s', (references) => {
    expect(scienceNoteSchema.safeParse({ ...note, references }).success).toBe(false);
  });

  for (const field of framingFields) {
    it.each(['LLY', 'jnj', '$HIMS', '(mRnA)', 'UNH'])
      (`rejects a candidate ticker in ${field}: %s`, (ticker) => {
        expect(scienceNoteSchema.safeParse({ ...note, [field]: `A note on ${ticker}.` }).success).toBe(false);
      });
    it.each(['Eli Lilly and Company', 'johnson & johnson', 'Hims & Hers Health', 'MODERNA', 'UnitedHealth Group'])
      (`rejects a candidate company in ${field}: %s`, (company) => {
        expect(scienceNoteSchema.safeParse({ ...note, [field]: `Evidence about ${company}.` }).success).toBe(false);
      });
  }

  it.each(['company', 'ticker', 'sponsor', 'product'])('rejects unapproved top-level field %s', (field) => {
    expect(scienceNoteSchema.safeParse({ ...note, [field]: 'extra framing' }).success).toBe(false);
  });

  it('rejects unapproved reference fields', () => {
    expect(scienceNoteSchema.safeParse({ ...note, references: [{ ...reference, promotion: true }] }).success).toBe(false);
  });

  it('rejects HTTP references', () => {
    expect(scienceNoteSchema.safeParse({ ...note, references: [{ ...reference, url: 'http://example.org/evidence' }] }).success).toBe(false);
  });

  it('rejects a reference without an identifier or authoritative-source classification', () => {
    expect(scienceNoteSchema.safeParse({ ...note, references: [{ ...reference, doi: undefined }] }).success).toBe(false);
  });

  it.each(['doi', 'pmid', 'registryId', 'authoritativeSource'])('accepts %s as the reference identifier/classification', (key) => {
    expect(scienceNoteSchema.safeParse({ ...note, references: [{ ...reference, doi: undefined, [key]: 'Explicit source value' }] }).success).toBe(true);
  });

  it.each(['doi', 'pmid', 'registryId', 'authoritativeSource'])('rejects blank %s even with another valid identifier', (key) => {
    expect(scienceNoteSchema.safeParse({ ...note, references: [{ ...reference, pmid: '12345678', [key]: '   ' }] }).success).toBe(false);
  });

  it('allows incidental company names in bibliographic attribution', () => {
    expect(scienceNoteSchema.safeParse({ ...note, references: [{ ...reference, authorOrGroup: 'Eli Lilly and Company' }] }).success).toBe(true);
  });

  it('does not reject innocent words through substring matching', () => {
    expect(scienceNoteSchema.safeParse({ ...note, title: 'Clinically useful evidence', mascotNote: 'Whimsical questions are allowed.' }).success).toBe(true);
  });

  it.each([{ themes: [] }, { themes: ['LLY'] }, { themes: ['Moderna'] }, { themes: ['unknown-theme'] }])('rejects empty, branded or unknown themes: $themes', ({ themes }) => {
    expect(scienceNoteSchema.safeParse({ ...note, themes }).success).toBe(false);
  });

  it.each(['title', 'summary', 'publishedAt', 'finding', 'limits', 'mascotNote'])('rejects blank required %s', (field) => {
    expect(scienceNoteSchema.safeParse({ ...note, [field]: '  ' }).success).toBe(false);
  });

  it.each(['title', 'authorOrGroup', 'accessedAt'])('rejects blank citation %s', (field) => {
    expect(scienceNoteSchema.safeParse({ ...note, references: [{ ...reference, [field]: ' ' }] }).success).toBe(false);
  });

  it('rejects impossible publication dates', () => {
    expect(scienceNoteSchema.safeParse({ ...note, publishedAt: '2026-02-30' }).success).toBe(false);
  });
});
