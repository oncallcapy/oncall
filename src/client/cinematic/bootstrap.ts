import { installCinematicCoordinator } from './coordinator';

// Astro executes this bundled module once; the coordinator delegates across swaps.
installCinematicCoordinator();
