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

presence.on('update', () => {
  if (location.href.includes('/search')) return handleSearchState(presence);
  if (location.href.includes('/watch')) return handleWatchingState(presence);
});
