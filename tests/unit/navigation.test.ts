import { describe, expect, it } from 'vitest';
import { NAV_ITEMS } from '../../src/config/navigation';

describe('clinical chart navigation', () => {
  it('keeps the eight case files in their editorial order', () => {
    expect(NAV_ITEMS.map(({ label }) => label)).toEqual([
      'TRIAGE',
      'THE CHART',
      'FIVE PAIRS',
      'ROBINHOOD CHAIN',
      'SCIENCE NOTES',
      'MARKET ROUNDS',
      'NIGHT SHIFT',
      'SOURCES & RISKS',
    ]);
  });

  it('gives every case file a distinct local route and two-digit number', () => {
    expect(new Set(NAV_ITEMS.map(({ href }) => href)).size).toBe(8);
    expect(NAV_ITEMS.map(({ shortLabel }) => shortLabel)).toEqual([
      '01', '02', '03', '04', '05', '06', '07', '08',
    ]);
    for (const item of NAV_ITEMS) {
      expect(item.label.trim()).not.toBe('');
      expect(item.href).toMatch(/^\/(?:[a-z]+(?:-[a-z]+)*\/?)?$/);
    }
  });

  it('uses the shared case-file route contract', () => {
    expect(NAV_ITEMS.map(({ href }) => href)).toEqual([
      '/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/',
      '/market-rounds/', '/night-shift/', '/sources-and-risks/',
    ]);
  });
});
