import { Presence, PresenceType } from '@/extension/shared/presence';
import { metadata } from './metadata';
import { handleSearchState } from './states/searching';
import { handleWatchingState } from './states/watching';

const presence = new Presence(metadata.clientId, {
  type: PresenceType.WATCHING,
  largeImageKey: metadata.images.main,
  startTimestamp: Date.now(),
  metadata
});

let cleanup: () => void;

presence.on('update', () => {
  cleanup?.();
  presence.reset();

  if (location.href.includes('/results')) return handleSearchState(presence);

  if (location.href.includes('/watch')) {
    cleanup = handleWatchingState(presence);
    return;
  }
});
