import { Presence, PresenceType } from '@/extension/shared/presence';
import { metadata } from './metadata';
import { handleSearchState } from './states/searching';
import { handleWatchingState } from './states/watching';

let presence: Presence | null = null;

async function runActivity() {
  // check if location.href matches metadata.supportedWebsites
  if (!metadata.supportedWebsites.some((website) => website.test(location.href))) return;

  presence = new Presence(metadata.clientId, {
    type: PresenceType.WATCHING,
    largeImageKey: metadata.images.youtubeLogo,
    startTimestamp: Date.now()
  });

  if (location.href.includes('/search')) return handleSearchState(presence);
  if (location.href.includes('/watch')) return handleWatchingState(presence);
}

runActivity();
