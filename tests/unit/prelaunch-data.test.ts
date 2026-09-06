import { describe, expect, it } from 'vitest';
import { PAIR_SELECTIONS } from '../../src/data/pairSelections';
import { PROJECT_FACTS } from '../../src/data/projectFacts';
import { SELECTED_PAIR_IDENTITIES } from '../../src/config/scienceThemes';

describe('transparent pre-launch data', () => {
  it('identifies exactly five selected pairs in the agreed order', () => {
    expect(PAIR_SELECTIONS.map(({ symbol }) => symbol)).toEqual(['LLY', 'JNJ', 'HIMS', 'MRNA', 'UNH']);
    expect(PAIR_SELECTIONS.map(({ symbol, displayName }) => ({ symbol, company: displayName }))).toEqual(SELECTED_PAIR_IDENTITIES);
  });

  it('keeps PAR eligibility and route depth pending for every selected pair', () => {
    for (const pair of PAIR_SELECTIONS) {
      expect(pair.selectionStatus).toBe('selected');
      expect(pair.technicalStatus).toBe('pending');
      expect(pair.parStatus).toBe('pending');
      expect(pair.routeStatus).toBe('pending');
      expect(pair.robinhoodStatus).toBe('active');
    }
  });

  it('preserves distinct complete official contract addresses without zero placeholders', () => {
    expect(new Set(PAIR_SELECTIONS.map(({ robinhoodContract }) => robinhoodContract.toLowerCase())).size).toBe(5);
    for (const pair of PAIR_SELECTIONS) {
      expect(pair.robinhoodContract).toMatch(/^0x[0-9a-fA-F]{40}$/);
      expect(pair.robinhoodContract).not.toBe(`0x${'0'.repeat(40)}`);
    }
    expect(PAIR_SELECTIONS.map(({ robinhoodContract }) => robinhoodContract)).toEqual([
      '0x8005d266423c7ea827372c9c864491e5786600ea',
      '0x03DfbBE0AC4E7bCDaFd08eD41A400326B77D8c80',
      '0xCceE82fE024c36fA15E1005edE3E9e4787e23D09',
      '0x43B07D15cE533bEc5476d70C22a78a1B2B662155',
      '0xcF364ea52787e289De6F32077834056E3E70D6A8',
    ]);
  });

  it('records the actual ISO observation and HTTPS source', () => {
    for (const pair of PAIR_SELECTIONS) {
      expect(pair.observedAt).toBe('2026-09-06T15:38:34Z');
      expect(new Date(pair.observedAt).toISOString()).toBe('2026-09-06T15:38:34.000Z');
      expect(new URL(pair.sourceUrl).protocol).toBe('https:');
      expect(pair.riskNote.length).toBeGreaterThan(40);
    }
  });

  it('aligns each selected pair with its evidence-only science theme', () => {
    expect(PAIR_SELECTIONS.map(({ scienceTheme }) => scienceTheme)).toEqual([
      'metabolic-medicine', 'clinical-evidence', 'digital-health', 'molecular-medicine', 'health-systems',
    ]);
  });

  it('maps the selected pairs to the exact agreed research domains in order', () => {
    expect(PAIR_SELECTIONS.map(({ researchTrack }) => researchTrack)).toEqual([
      'obesity, diabetes, metabolic medicine, cardiometabolic outcomes',
      'broad clinical medicine, medical technology, evidence appraisal',
      'digital health, telemedicine, patient communication',
      'molecular medicine, immunology, vaccine science',
      'health systems, outcomes research, population health',
    ]);
  });

  it('displays all seven unresolved launch facts as pending without fabricated values', () => {
    expect(PROJECT_FACTS.map(({ id }) => id)).toEqual([
      'token-contract', 'ticker', 'launch-transaction', 'creator-tax', 'pool-fee', 'fee-recipient-policy', 'launch-state',
    ]);
    for (const fact of PROJECT_FACTS) {
      expect(fact.displayValue).toBe('PENDING');
      expect(fact.status).toBe('pending');
      expect(fact.displayValue).not.toMatch(/0x0{40}/);
      expect(new URL(fact.sourceUrl).protocol).toBe('https:');
    }
  });
});
