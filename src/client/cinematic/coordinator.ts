import { CINEMATIC_ASSETS, getSurfaceForPath } from '../../config/cinematic';
import { NAV_ITEMS, resolveFileId, type FileId } from '../../config/navigation';
import { initialCinematicState, reduceCinematic } from './machine';

const SEEN_KEY = 'oncall-opening-seen';

/** One document-level coordinator. The image plates are a motion prototype, not a 3D rig. */
export function installCinematicCoordinator() {
  let state = initialCinematicState;
  let seen = false;
  let active: { epoch: number; fileId: FileId; finished: boolean; loaded: boolean } | undefined;
  const animations = new Set<Animation>();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 47.999rem)');
  const stage = () => document.querySelector<HTMLElement>('[data-cinematic-stage]');
  const plate = () => stage()?.querySelector<HTMLImageElement>('[data-scene-plate] img');
  try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* In-memory session fallback. */ }

  function remember() {
    seen = true;
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* Navigation stays available. */ }
  }
  function cancelAnimations() {
    for (const animation of animations) animation.cancel();
    animations.clear();
  }
  function effect(element: Element | null | undefined, frames: Keyframe[], duration: number): Promise<boolean> {
    if (reduced.matches || !element?.animate) return Promise.resolve(true);
    const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.2,.7,.25,1)', fill: 'none' });
    animations.add(animation);
    return animation.finished.then(() => { animations.delete(animation); return true; }, () => { animations.delete(animation); return false; });
  }
  function currentLink(fileId: FileId) {
    document.querySelectorAll<HTMLAnchorElement>('[data-file-link]').forEach(link => {
      if (link.dataset.fileId === fileId) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  function showPlate(fileId: FileId) {
    const image = plate();
    const src = fileId === 'triage' ? CINEMATIC_ASSETS.opening : CINEMATIC_ASSETS.openFile;
    if (image && image.getAttribute('src') !== src) image.src = src;
  }
  function focusHeading() {
    const heading = document.querySelector<HTMLElement>('[data-file-content] h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
  function settleOpening() {
    state = reduceCinematic(state, { type: 'SKIP_OPENING' });
    const room = stage();
    if (room) room.dataset.opening = 'settled';
    remember();
  }
  function clearFinished() {
    if (!active?.finished || !active.loaded) return;
    stage()?.removeAttribute('data-target-file');
    active = undefined;
  }
  function reconcile() {
    const room = stage();
    if (!room) return;
    const fileId = resolveFileId(location.pathname);
    room.dataset.fileId = fileId;
    room.dataset.surface = getSurfaceForPath(location.pathname);
    currentLink(fileId);
    if (active?.fileId === fileId) {
      active.loaded = true;
      focusHeading();
      clearFinished();
      return;
    }
    cancelAnimations();
    active = undefined;
    state = reduceCinematic(state, { type: 'SELECT', fileId, epoch: state.epoch + 1 });
    room.dataset.motion = fileId === 'triage' ? 'idle' : 'inspect';
    room.dataset.opening = 'settled';
    room.removeAttribute('data-target-file');
    showPlate(fileId);
  }
  async function select(link: HTMLAnchorElement, fileId: FileId) {
    cancelAnimations();
    const epoch = state.epoch + 1;
    state = reduceCinematic(state, { type: 'SELECT', fileId, epoch });
    active = { epoch, fileId, finished: false, loaded: false };
    settleOpening();
    const room = stage();
    if (!room) return;
    room.dataset.targetFile = fileId;
    currentLink(fileId);
    if (!reduced.matches) {
      room.dataset.motion = 'walk';
      // A short scene-plate move suggests attention; it does not simulate a rigged walk.
      const offset = compact.matches ? '12px' : `${4 + NAV_ITEMS.findIndex(item => item.id === fileId) / 7 * 2}vw`;
      await Promise.all([
        effect(link, [{ transform: 'translateX(0)' }, { transform: compact.matches ? 'translateX(-12px)' : 'translateX(-2rem) rotateY(-7deg)' }], 260),
        effect(plate(), [{ transform: 'scale(1.06) translateX(0)', opacity: 1 }, { transform: `scale(1.06) translateX(${offset})`, opacity: 0.78 }], 260),
      ]);
    }
    if (state.epoch !== epoch || active?.epoch !== epoch) return;
    showPlate(fileId);
    room.dataset.motion = fileId === 'triage' ? 'idle' : 'inspect';
    await effect(plate(), [{ opacity: 0.78, transform: compact.matches ? 'translateY(12px)' : 'scale(1.035)' }, { opacity: 1, transform: 'none' }], 360);
    if (state.epoch !== epoch || active?.epoch !== epoch) return;
    state = reduceCinematic(state, { type: 'OPEN_FINISHED', fileId, epoch });
    active.finished = true;
    clearFinished();
  }
  function onClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('#cinematic-skip')) {
      cancelAnimations();
      settleOpening();
      document.querySelector<HTMLElement>('[data-file-content]')?.focus();
      return;
    }
    const link = target?.closest<HTMLAnchorElement>('a[data-file-link]');
    if (!link || link.hasAttribute('download') || link.hasAttribute('data-astro-reload') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    const item = NAV_ITEMS.find(item => item.id === link.dataset.fileId && item.href === url.pathname);
    if (item) void select(link, item.id);
    // Never preventDefault: Astro owns navigation, cancellation, history and its native fallback.
  }
  function onPreparation(event: Event) {
    const navigation = event as Event & { to: URL; sourceElement?: Element; navigationType: string; signal: AbortSignal };
    if (active && navigation.navigationType !== 'traverse' && navigation.sourceElement?.matches('[data-file-link]') && resolveFileId(navigation.to.pathname) === active.fileId) {
      const epoch = active.epoch;
      navigation.signal.addEventListener('abort', () => queueMicrotask(() => {
        // Hash-only navigation can abort Astro's fetch without preparing a new page.
        // A newer file selection owns a different epoch and must remain untouched.
        if (active?.epoch !== epoch) return;
        active = undefined;
        reconcile();
      }), { once: true });
      return;
    }
    cancelAnimations();
    active = undefined;
    state = reduceCinematic(state, { type: 'SELECT', fileId: resolveFileId(navigation.to.pathname), epoch: state.epoch + 1 });
    settleOpening();
  }
  function onPageShow(event: PageTransitionEvent) {
    if (!event.persisted) return;
    active = undefined;
    reconcile();
  }
  function onMotionChange() {
    if (!reduced.matches) return;
    cancelAnimations();
    settleOpening();
    const room = stage();
    showPlate(state.desiredFile);
    if (room) room.dataset.motion = state.desiredFile === 'triage' ? 'idle' : 'inspect';
    if (active) active.finished = true;
    clearFinished();
  }

  const room = stage();
  if (room) {
    room.dataset.enhanced = 'true';
    const firstFile = resolveFileId(location.pathname);
    room.dataset.motion = firstFile === 'triage' ? 'idle' : 'inspect';
    state = { ...state, desiredFile: firstFile };
    if (seen || reduced.matches || firstFile !== 'triage') settleOpening();
    else {
      room.dataset.opening = 'playing';
      void effect(plate(), [{ filter: 'brightness(.65)', transform: 'scale(1.025)' }, { filter: 'brightness(1)', transform: 'none' }], 2400).then(completed => { if (completed) settleOpening(); });
    }
  }
  // Warm the approved blank plate without delaying the first useful HTML frame.
  const preload = new Image();
  preload.src = CINEMATIC_ASSETS.openFile;
  document.addEventListener('click', onClick, true);
  document.addEventListener('astro:before-preparation', onPreparation);
  // Initial page-load must not interrupt the opening; route swaps reconcile below.
  document.addEventListener('astro:after-swap', reconcile);
  document.addEventListener('astro:page-load', () => {
    if (active?.loaded) focusHeading();
  });
  window.addEventListener('pageshow', onPageShow);
  window.addEventListener('pagehide', () => { cancelAnimations(); active = undefined; });
  reduced.addEventListener('change', onMotionChange);
}
