export type CinematicSurface = 'opening' | 'file' | 'article';

export const CINEMATIC_ASSETS = {
  opening: '/brand/cinematic/oncall-opening-approved-v1.png',
  openFile: '/brand/cinematic/oncall-open-file-scene-plate-v1.png',
  idlePose: '/brand/cinematic/oncall-idle-pose-approved-v1.png',
} as const;

export const getSurfaceForPath = (pathname: string): CinematicSurface => {
  if ((pathname.replace(/\/+$/, '') || '/') === '/') return 'opening';
  return pathname.startsWith('/science/') && pathname !== '/science/' ? 'article' : 'file';
};
