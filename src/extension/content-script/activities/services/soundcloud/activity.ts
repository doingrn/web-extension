import { Presence, PresenceType } from '@/shared/presence';
import { metadata } from './metadata';
import { handleListeningState } from './states/listening';
import { handleSearchState } from './states/searching';

const presence = new Presence(metadata.clientId, {
  type: PresenceType.LISTENING,
  largeImageKey: metadata.images.main,
  startTimestamp: Date.now(),
  metadata
});

presence.on('update', () => {
  presence.reset();

  if (navigator.mediaSession.playbackState === 'playing') {
    handleListeningState(presence);
    return;
  }

  switch (location.pathname) {
    case '/search':
      handleSearchState(presence);
      break;

    default: {
      break;
    }
  }
});
