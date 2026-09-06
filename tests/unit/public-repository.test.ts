import { describe, expect, it } from 'vitest';
import { PUBLIC_REPOSITORY } from '../../src/config/site';

describe('public repository destination', () => {
  it('uses the agreed canonical HTTPS repository and visible label', () => {
    expect(PUBLIC_REPOSITORY).toEqual({
      href: 'https://github.com/oncallcapy/oncall',
      label: 'PUBLIC REPOSITORY',
    });
  });
});
