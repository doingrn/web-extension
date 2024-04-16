import { ActivityEvent } from '@/extension/background/activity-event';
import type { ClearActivityEvent } from '@/extension/background/activity-event/events';
import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import { Presence, PresenceType } from '@/extension/shared/presence';
import { metadata } from './metadata';
import { handleSearchState } from './states/searching';
import { handleWatchingState } from './states/watching';

let presence: Presence | null = null;

function clearActivity() {
  if (presence) sendManagerMessage(new ActivityEvent<ClearActivityEvent>('clear_activity', { clientId: presence.clientId }));
}

async function runActivity() {
  // check if location.href matches metadata.supportedWebsites
  if (!metadata.supportedWebsites.some((website) => website.test(location.href))) return;

  presence = new Presence(metadata.clientId, {
    type: PresenceType.WATCHING,
    largeImageKey: metadata.images.youtubeLogo,
    startTimestamp: Date.now()
  });

  window.addEventListener('beforeunload', () => {
    clearActivity();
  });

  if (location.href.includes('/search')) return handleSearchState(presence);
  if (location.href.includes('/watch')) return handleWatchingState(presence);
}

runActivity();
