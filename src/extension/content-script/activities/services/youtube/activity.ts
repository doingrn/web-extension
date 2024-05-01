import { Presence, PresenceType } from '@/shared/presence';
import { metadata } from './metadata';
import { handleBrowsingState } from './states/browsing';
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

  switch (location.pathname) {
    case '/':
      handleBrowsingState(presence);
      break;

    case '/results':
      handleSearchState(presence);
      break;

    case '/watch':
      cleanup = handleWatchingState(presence);
      break;

    default: {
      break;
    }
  }
});
