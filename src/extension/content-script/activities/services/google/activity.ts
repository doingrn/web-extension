import { ActivityEvent } from '@/extension/background/activity-event';
import type { ClearActivityEvent, UpdateActivityEvent } from '@/extension/background/activity-event/events';
import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import { Presence, PresenceType } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';
import { metadata } from './metadata';

const presence = new Presence(metadata.clientId, {
  name: metadata.name,
  type: PresenceType.GAME,
  largeImageKey: metadata.images.googleLogo,
  startTimestamp: Date.now()
});

async function clearActivity() {
  sendManagerMessage(new ActivityEvent<ClearActivityEvent>('clear_activity', { name: metadata.name, clientId: presence.clientId }));
}

async function runActivity() {
  // check if location.href matches metadata.supportedWebsites
  if (!metadata.supportedWebsites.some((website) => website.test(location.href))) return;

  window.addEventListener('beforeunload', () => {
    clearActivity();
  });

  const queryString = parseQuerystring(location.href) as { q: string };
  if (!queryString.q) {
    sendManagerMessage(
      new ActivityEvent<UpdateActivityEvent>('update_activity', { name: metadata.name, clientId: presence.clientId, presence })
    );
    return;
  }

  presence.setDetails(`Searching for ${queryString.q}`);
  sendManagerMessage(
    new ActivityEvent<UpdateActivityEvent>('update_activity', { name: metadata.name, clientId: presence.clientId, presence })
  );
}

runActivity();
