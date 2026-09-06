import { z } from 'zod';
import { SCIENCE_FRAMING_EXCLUSIONS, SCIENCE_THEMES } from '../../config/scienceThemes';

const nonBlank = z.string().trim().min(1);
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const excludedNames = SCIENCE_FRAMING_EXCLUSIONS.flatMap(({ symbol, company }) => [symbol, company]);
const framingPattern = new RegExp(
  `(?<![\\p{L}\\p{N}_])(?:${excludedNames.map((name) => escapeRegex(name).replace(/\s+/g, '\\s+')).join('|')})(?![\\p{L}\\p{N}_])`,
  'iu',
);
const evidenceFraming = nonBlank.refine((text) => !framingPattern.test(text), {
  message: 'Science Notes use evidence-based clinical framing. Candidate company and ticker framing belongs in FIVE PAIRS or MARKET ROUNDS.',
});

export const scienceReferenceSchema = z.strictObject({
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

// This validates structure and known candidate framing, not scientific truth.
// A human must review evidence, source quality, limitations and all other brand,
// product or sponsor framing before adding any note to the publication collection.
export const scienceNoteSchema = z.strictObject({
  title: evidenceFraming,
  summary: evidenceFraming,
  publishedAt: z.iso.date(),
  themes: z.array(z.enum(Object.keys(SCIENCE_THEMES) as [keyof typeof SCIENCE_THEMES, ...(keyof typeof SCIENCE_THEMES)[]])).min(1),
  finding: evidenceFraming,
  limits: evidenceFraming,
  mascotNote: evidenceFraming,
  references: z.array(scienceReferenceSchema).min(1),
});

export type ScienceNote = z.infer<typeof scienceNoteSchema>;
export type ScienceReference = z.infer<typeof scienceReferenceSchema>;
