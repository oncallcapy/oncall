import { describe, expect, it } from 'vitest';
import { NAV_ITEMS, resolveFileId } from '../../src/config/navigation';
import { CINEMATIC_ASSETS, getSurfaceForPath } from '../../src/config/cinematic';

describe('cinematic route contract', () => {
  it('maps all eight canonical routes and nested science entries', () => {
    expect(NAV_ITEMS.map(item => item.id)).toEqual([
      'triage', 'chart', 'pairs', 'chain', 'science', 'markets', 'night', 'sources',
    ]);
    expect(resolveFileId('/science/weight-is-not-the-whole-outcome/')).toBe('science');
    expect(getSurfaceForPath('/')).toBe('opening');
    expect(getSurfaceForPath('/pairs/')).toBe('file');
    expect(getSurfaceForPath('/science/example/')).toBe('article');
  });

  it('uses only approved, locally served scene assets', () => {
    expect(CINEMATIC_ASSETS.opening).toBe('/brand/cinematic/oncall-opening-approved-v1.png');
    expect(CINEMATIC_ASSETS.openFile).toBe('/brand/cinematic/oncall-open-file-scene-plate-v1.png');
    expect(Object.values(CINEMATIC_ASSETS).every(path => path.startsWith('/brand/cinematic/'))).toBe(true);
  });
});
