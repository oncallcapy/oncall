export type VerificationStatus = 'pending' | 'verified' | 'stale' | 'unavailable';

export type ProjectFact = Readonly<{
  id: string;
  label: string;
  displayValue: string;
  status: VerificationStatus;
  note: string;
  sourceUrl: string;
  evidenceUrl?: string;
  public: boolean;
}>;

// Documentation explains the field; it is not evidence of an ONCALL launch.
export const PROJECT_FACTS = [
  { id: 'token-contract', label: 'ONCALL token contract', note: 'No deployed ONCALL contract is recorded.' },
  { id: 'ticker', label: 'Final ticker', note: 'The working name does not establish a final token symbol.' },
  { id: 'launch-transaction', label: 'Launch transaction', note: 'No ONCALL launch receipt is recorded.' },
  { id: 'creator-tax', label: 'Final creator tax', note: 'Requires an explicit decision and verification of the launch settings.' },
  { id: 'pool-fee', label: 'Final pool fee', note: 'Requires final pool configuration and on-chain verification.' },
  { id: 'fee-recipient-policy', label: 'Fee recipient policy', note: 'Recipients and the policy for fees remain undecided.' },
  { id: 'launch-state', label: 'Final launch state', note: 'Pre-launch. No launch has been executed for this project.' },
].map((fact) => ({
  ...fact,
  displayValue: 'PENDING',
  status: 'pending' as const,
  sourceUrl: 'https://par.family/docs',
  // Unknown launch settings stay in the internal data contract so tests can
  // prevent fabrication. Public pages omit the entire row until evidence exists.
  public: false,
})) satisfies readonly ProjectFact[];

export const PUBLIC_PROJECT_RECORD = [
  {
    id: 'editorial-purpose',
    label: 'Editorial purpose',
    displayValue: 'Medicine / science / market culture',
    status: 'verified',
    note: 'Science, company context and mascot humour use separate files and separate claim standards.',
    sourceUrl: 'https://github.com/oncallcapy/oncall',
    evidenceUrl: 'https://github.com/oncallcapy/oncall',
    public: true,
  },
  {
    id: 'selected-pair-set',
    label: 'Selected quote identities',
    displayValue: 'LLY / JNJ / HIMS / MRNA / UNH',
    status: 'verified',
    note: 'These five identities define the editorial and intended quote-market structure. Selection alone proves no route or pool.',
    sourceUrl: 'https://github.com/oncallcapy/oncall/blob/main/pair-files/README.md',
    evidenceUrl: 'https://github.com/oncallcapy/oncall/blob/main/pair-files/README.md',
    public: true,
  },
  {
    id: 'science-collection',
    label: 'Science collection',
    displayValue: '5 dossiers / 15 studies',
    status: 'verified',
    note: 'Each dossier carries three direct study records, visible limitations and an access trail. Repository inclusion is not clinical review.',
    sourceUrl: 'https://github.com/oncallcapy/oncall/tree/main/src/content/science',
    evidenceUrl: 'https://github.com/oncallcapy/oncall/tree/main/src/content/science',
    public: true,
  },
] as const satisfies readonly ProjectFact[];
