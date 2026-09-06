import { z } from 'zod';
import { SELECTED_PAIR_IDENTITIES, SCIENCE_THEMES } from '../../config/scienceThemes';

const nonBlank = z.string().trim().min(1);
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const excludedNames = SELECTED_PAIR_IDENTITIES.flatMap(({ symbol, company }) => [symbol, company]);
const framingPattern = new RegExp(
  `(?<![\\p{L}\\p{N}_])(?:${excludedNames.map((name) => escapeRegex(name).replace(/\s+/g, '\\s+')).join('|')})(?![\\p{L}\\p{N}_])`,
  'giu',
);
// Exact biological spelling is allowed; uppercase MRNA and all other known
// selected pair framing remain excluded, including later matches in the same field.
const evidenceFraming = nonBlank.refine((text) =>
  [...text.matchAll(framingPattern)].every(([match]) => match === 'mRNA'), {
  message: 'Science Notes use evidence-based clinical framing. Selected pair company and ticker framing belongs in FIVE PAIRS or MARKET ROUNDS.',
});

export const referenceSchema = z.strictObject({
  url: z.url({ protocol: /^https$/ }),
  title: nonBlank,
  authorOrGroup: nonBlank,
  year: z.number().int().min(1).max(9999),
  accessedAt: z.iso.date(),
  doi: nonBlank.optional(),
  pmid: nonBlank.optional(),
  registryId: nonBlank.optional(),
  authoritativeSource: nonBlank.optional(),
}).refine((reference) => Boolean(
  reference.doi || reference.pmid || reference.registryId || reference.authoritativeSource,
), { message: 'A DOI, PMID, registry ID or explicit authoritative-source classification is required.' });

export const scienceReferenceSchema = referenceSchema;

const scienceThemeIds = Object.keys(SCIENCE_THEMES) as [keyof typeof SCIENCE_THEMES, ...(keyof typeof SCIENCE_THEMES)[]];
export const scienceThemeIdSchema = z.enum(scienceThemeIds);
export type ScienceThemeId = z.infer<typeof scienceThemeIdSchema>;

// This validates structure and known selected pair framing, not scientific truth.
// A human must review evidence, source quality, limitations and all other brand,
// product or sponsor framing before adding any note to the publication collection.
export const scienceNoteSchema = z.strictObject({
  title: evidenceFraming,
  summary: evidenceFraming,
  publishedAt: z.iso.date(),
  themes: z.array(scienceThemeIdSchema).min(1),
  finding: evidenceFraming,
  limits: evidenceFraming,
  mascotNote: evidenceFraming,
  references: z.array(referenceSchema).min(1),
});

export const studyRecordSchema = z.strictObject({
  id: z.string().min(2),
  originalTitle: z.string().min(8),
  citation: z.string().min(12),
  year: z.number().int().min(1900).max(2026),
  design: evidenceFraming,
  question: evidenceFraming,
  finding: evidenceFraming,
  limits: evidenceFraming,
  identifiers: z.strictObject({ doi: nonBlank.optional(), pmid: nonBlank.optional() }),
  sources: z.array(referenceSchema).min(1),
  correction: z.string().min(12).optional(),
});

export const scienceDossierSchema = z.strictObject({
  slug: z.string().min(3),
  theme: scienceThemeIdSchema,
  pair: z.strictObject({ ticker: z.enum(['LLY', 'JNJ', 'HIMS', 'MRNA', 'UNH']), company: z.string().min(2) }),
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
  correctionHistory: z.array(z.strictObject({ date: z.iso.date(), note: z.string().min(8) })).default([]),
}).superRefine((data, context) => {
  if ((data.reviewer && !data.reviewedAt) || (!data.reviewer && data.reviewedAt)) {
    context.addIssue({ code: 'custom', path: ['reviewer'], message: 'reviewer and reviewedAt must be recorded together' });
  }
});

export type ScienceNote = z.infer<typeof scienceNoteSchema>;
export type ScienceReference = z.infer<typeof referenceSchema>;
export type StudyRecord = z.infer<typeof studyRecordSchema>;
export type ScienceDossier = z.infer<typeof scienceDossierSchema>;
