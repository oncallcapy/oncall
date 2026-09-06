export type VerificationStatus = 'pending' | 'verified' | 'stale' | 'unavailable';

export type ProjectFact = Readonly<{
  id: string;
  label: string;
  displayValue: string;
  status: VerificationStatus;
  note: string;
  sourceUrl: string;
  evidenceUrl?: string;
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
].map((fact) => ({ ...fact, displayValue: 'PENDING', status: 'pending', sourceUrl: 'https://par.family/docs' })) satisfies readonly ProjectFact[];
