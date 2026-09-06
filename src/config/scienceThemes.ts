export const SCIENCE_THEMES = {
  'metabolic-medicine': 'Metabolism & metabolic medicine',
  'clinical-evidence': 'Evidence-based clinical medicine & medical technology',
  'digital-health': 'Digital health & patient communication',
  'molecular-medicine': 'Molecular medicine, immunology & vaccine science',
  'health-systems': 'Health systems, outcomes & population health',
} as const;

// Shared candidate identities; FIVE PAIRS can import this without reversing
// the dependency from Science Notes into market content.
export const SCIENCE_FRAMING_EXCLUSIONS = [
  { symbol: 'LLY', company: 'Eli Lilly and Company' },
  { symbol: 'JNJ', company: 'Johnson & Johnson' },
  { symbol: 'HIMS', company: 'Hims & Hers Health' },
  { symbol: 'MRNA', company: 'Moderna' },
  { symbol: 'UNH', company: 'UnitedHealth Group' },
] as const;
