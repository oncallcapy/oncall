import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { scienceDossierSchema } from '../../../src/content/schemas/scienceNote';

const dossierFiles = [
  'beyond-weight-and-cardiometabolic-outcomes.json',
  'evaluating-clinical-evidence-and-devices.json',
  'digital-care-and-patient-communication.json',
  'inside-mrna-evidence.json',
  'health-systems-and-recorded-outcomes.json',
] as const;

const dossiers = dossierFiles.map((file) => {
  const path = fileURLToPath(new URL(`../../../src/content/science/${file}`, import.meta.url));
  return scienceDossierSchema.parse(JSON.parse(readFileSync(path, 'utf8')));
});

export default dossiers;
