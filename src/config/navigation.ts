export type FileId = 'triage' | 'chart' | 'pairs' | 'chain' | 'science' | 'markets' | 'night' | 'sources';

export const NAV_ITEMS = [
  { id: 'triage', href: '/', label: 'TRIAGE', shortLabel: '01' },
  { id: 'chart', href: '/chart/', label: 'THE CHART', shortLabel: '02' },
  { id: 'pairs', href: '/pairs/', label: 'FIVE PAIRS', shortLabel: '03' },
  { id: 'chain', href: '/robinhood-chain/', label: 'ROBINHOOD CHAIN', shortLabel: '04' },
  { id: 'science', href: '/science/', label: 'SCIENCE NOTES', shortLabel: '05' },
  { id: 'markets', href: '/market-rounds/', label: 'MARKET ROUNDS', shortLabel: '06' },
  { id: 'night', href: '/night-shift/', label: 'NIGHT SHIFT', shortLabel: '07' },
  { id: 'sources', href: '/sources-and-risks/', label: 'SOURCES & RISKS', shortLabel: '08' },
] as const;

const normalize = (path: string) => path.replace(/\/+$/, '') || '/';

export const resolveFileId = (pathname: string): FileId => {
  const normalized = normalize(pathname);
  const match = [...NAV_ITEMS]
    .sort((a, b) => b.href.length - a.href.length)
    .find(item => normalized === normalize(item.href) || (item.href !== '/' && normalized.startsWith(`${normalize(item.href)}/`)));
  return match?.id ?? 'triage';
};
