import type { FileId } from '../../config/navigation';

export type MascotPose = 'idle' | 'walk' | 'inspect';
export type OpeningPhase = 'playing' | 'settled';
export type CinematicState = Readonly<{
  desiredFile: FileId;
  epoch: number;
  pose: MascotPose;
  opening: OpeningPhase;
}>;
export type CinematicEvent =
  | { type: 'SELECT'; fileId: FileId; epoch: number }
  | { type: 'OPEN_FINISHED'; fileId: FileId; epoch: number }
  | { type: 'SKIP_OPENING' };

export const initialCinematicState: CinematicState = {
  desiredFile: 'triage', epoch: 0, pose: 'idle', opening: 'playing',
};

export function reduceCinematic(state: CinematicState, event: CinematicEvent): CinematicState {
  if (event.type === 'SKIP_OPENING') return { ...state, opening: 'settled' };
  if (event.epoch < state.epoch) return state;
  if (event.type === 'SELECT') {
    return { desiredFile: event.fileId, epoch: event.epoch, pose: 'inspect', opening: 'settled' };
  }
  // Completion is allowed to settle only its own selection, never another route.
  if (event.epoch !== state.epoch || event.fileId !== state.desiredFile) return state;
  return { ...state, pose: 'inspect' };
}
