import { describe, expect, it } from 'vitest';
import { initialCinematicState, reduceCinematic } from '../../src/client/cinematic/machine';
import { NAV_ITEMS } from '../../src/config/navigation';

describe('cinematic motion state', () => {
  it.each(NAV_ITEMS)('selects $id without mutating the previous state', ({ id }) => {
    const selected = reduceCinematic(initialCinematicState, { type: 'SELECT', fileId: id, epoch: 1 });
    expect(selected).toEqual({ desiredFile: id, epoch: 1, pose: 'inspect', opening: 'settled' });
    expect(initialCinematicState).toEqual({ desiredFile: 'triage', epoch: 0, pose: 'idle', opening: 'playing' });
  });
  it('keeps latest selection through stale selections and completions', () => {
    const first = reduceCinematic(initialCinematicState, { type: 'SELECT', fileId: 'pairs', epoch: 1 });
    const second = reduceCinematic(first, { type: 'SELECT', fileId: 'science', epoch: 2 });
    expect(reduceCinematic(second, { type: 'OPEN_FINISHED', fileId: 'pairs', epoch: 1 })).toBe(second);
    expect(reduceCinematic(second, { type: 'SELECT', fileId: 'pairs', epoch: 1 })).toBe(second);
    expect(reduceCinematic(second, { type: 'OPEN_FINISHED', fileId: 'pairs', epoch: 2 })).toBe(second);
    expect(reduceCinematic(second, { type: 'OPEN_FINISHED', fileId: 'science', epoch: 2 })).toEqual(second);
  });
  it('settles the opening without changing the selected file', () => {
    expect(reduceCinematic(initialCinematicState, { type: 'SKIP_OPENING' })).toEqual({ ...initialCinematicState, opening: 'settled' });
  });
});
