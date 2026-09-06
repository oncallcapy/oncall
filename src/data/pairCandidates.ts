import { SCIENCE_FRAMING_EXCLUSIONS, SCIENCE_THEMES } from '../config/scienceThemes';
import type { VerificationStatus } from './projectFacts';
export type { VerificationStatus } from './projectFacts';

export type PairCandidate = Readonly<{
  symbol: 'LLY' | 'JNJ' | 'HIMS' | 'MRNA' | 'UNH';
  displayName: string;
  scienceTheme: keyof typeof SCIENCE_THEMES;
  robinhoodContract: `0x${string}`;
  robinhoodStatus: 'active';
  parStatus: VerificationStatus;
  routeStatus: VerificationStatus;
  observedAt: string;
  sourceUrl: string;
  riskNote: string;
}>;

export const ASSET_OBSERVATION = {
  observedAt: '2026-09-06T15:38:34Z',
  sourceUrl: 'https://api.robinhood.com/rhj/assets',
  chainId: 4663,
  responseBytes: 154149,
  responseSha256: 'af6387ef7bad187d8a45d1ec9e94807bdd96cd1485d0f7ca85246b70d70119ee',
} as const;

const details = [
  { scienceTheme: 'metabolic-medicine', robinhoodContract: '0x8005d266423c7ea827372c9c864491e5786600ea', riskNote: 'The metabolic-medicine theme is an editorial topic, not proof of a treatment benefit, company endorsement, or quote-market suitability.' },
  { scienceTheme: 'clinical-evidence', robinhoodContract: '0x03DfbBE0AC4E7bCDaFd08eD41A400326B77D8c80', riskNote: 'A broad clinical-evidence theme cannot stand in for evaluating individual studies or the separate risks of this quote asset.' },
  { scienceTheme: 'digital-health', robinhoodContract: '0xCceE82fE024c36fA15E1005edE3E9e4787e23D09', riskNote: 'A digital-health theme does not validate any service or health claim. The active API entry does not establish an executable PAR route.' },
  { scienceTheme: 'molecular-medicine', robinhoodContract: '0x43B07D15cE533bEc5476d70C22a78a1B2B662155', riskNote: 'Molecular-medicine education does not establish the success of a research program or the future value or liquidity of this quote asset.' },
  { scienceTheme: 'health-systems', robinhoodContract: '0xcF364ea52787e289De6F32077834056E3E70D6A8', riskNote: 'A health-systems theme is not a judgment about care quality, insurance coverage, or investment merit. Route depth still needs measurement.' },
] as const;

export const PAIR_CANDIDATES: readonly PairCandidate[] = SCIENCE_FRAMING_EXCLUSIONS.map((identity, index) => ({
  symbol: identity.symbol,
  displayName: identity.company,
  ...details[index]!,
  robinhoodStatus: 'active',
  parStatus: 'pending',
  routeStatus: 'pending',
  observedAt: ASSET_OBSERVATION.observedAt,
  sourceUrl: ASSET_OBSERVATION.sourceUrl,
}));
