import { Presence, PresenceType } from '@/extension/shared/presence';
import { metadata } from './metadata';
import { handleSearchState } from './states/searching';
import { handleWatchingState } from './states/watching';
import { handleBrowsingState } from './states/browsing';

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
