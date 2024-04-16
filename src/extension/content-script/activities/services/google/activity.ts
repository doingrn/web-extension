import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import { ActivityEvent } from '@/extension/shared/activity-event';
import type { ClearActivityEvent, UpdateActivityEvent } from '@/extension/shared/activity-event/events';
import { Presence, PresenceType } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';
import { metadata } from './metadata';

let presence: Presence | null = null;

function clearActivity() {
  if (presence) sendManagerMessage(new ActivityEvent<ClearActivityEvent>('clear_activity', { clientId: presence.clientId }));
}

async function runActivity() {
  // check if location.href matches metadata.supportedWebsites
  if (!metadata.supportedWebsites.some((website) => website.test(location.href))) return;

  presence = new Presence(metadata.clientId, {
    type: PresenceType.GAME,
    largeImageKey: metadata.images.googleLogo,
    startTimestamp: Date.now()
  });

  window.addEventListener('beforeunload', () => {
    clearActivity();
  });

  const queryString = parseQuerystring(location.href) as { q: string };
  if (!queryString.q) {
    sendManagerMessage(new ActivityEvent<UpdateActivityEvent>('update_activity', { clientId: presence.clientId, presence }));
    return;
  }

  presence.setDetails(`Searching for ${queryString.q}`);
  sendManagerMessage(new ActivityEvent<UpdateActivityEvent>('update_activity', { clientId: presence.clientId, presence }));
}

runActivity();
