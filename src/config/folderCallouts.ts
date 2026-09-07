export type FolderCalloutKey =
  | 'triage'
  | 'chart'
  | 'pairs'
  | 'chain'
  | 'science'
  | 'market'
  | 'night'
  | 'sources';

export interface FolderCallout {
  file: FolderCalloutKey;
  asset: string;
  label: string;
  message: string;
}

export const FOLDER_CALLOUTS: Record<FolderCalloutKey, FolderCallout> = {
  triage: {
    file: 'triage',
    asset: '/brand/callouts/triage-v1.png',
    label: 'ONCALL / Intake note 01',
    message: 'STATE THE PROBLEM. CHECK THE CHART.',
  },
  chart: {
    file: 'chart',
    asset: '/brand/callouts/chart-v1.png',
    label: 'ONCALL / Chart note 02',
    message: 'THE CHART REMEMBERS WHAT HYPE FORGETS.',
  },
  pairs: {
    file: 'pairs',
    asset: '/brand/callouts/five-pairs-v1.png',
    label: 'ONCALL / Pair note 03',
    message: 'FIVE FILES. ONE TOKEN. NO SHORTCUTS.',
  },
  chain: {
    file: 'chain',
    asset: '/brand/callouts/robinhood-chain-v1.png',
    label: 'ONCALL / Chain note 04',
    message: 'CHAIN 4663. RECEIPTS BEFORE STORIES.',
  },
  science: {
    file: 'science',
    asset: '/brand/callouts/science-notes-v1.png',
    label: 'ONCALL / Evidence note 05',
    message: 'READ THE METHODS. THE ABSTRACT CAN WAIT.',
  },
  market: {
    file: 'market',
    asset: '/brand/callouts/market-rounds-v1.png',
    label: 'ONCALL / Rounds note 06',
    message: 'THE NARRATIVE IS NOT THE ENDPOINT.',
  },
  night: {
    file: 'night',
    asset: '/brand/callouts/night-shift-v1.png',
    label: 'ONCALL / Night note 07',
    message: 'EVIDENCE FIRST. MEMES AFTER ROUNDS.',
  },
  sources: {
    file: 'sources',
    asset: '/brand/callouts/sources-risks-v1.png',
    label: 'ONCALL / Ledger note 08',
    message: 'NO RECEIPT? OFF THE CHART.',
  },
};
