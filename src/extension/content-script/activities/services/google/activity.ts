import { Presence, PresenceType } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';
import { metadata } from './metadata';

let presence: Presence | null = null;

async function runActivity() {
  // check if location.href matches metadata.supportedWebsites
  if (!metadata.supportedWebsites.some((website) => website.test(location.href))) return;

  presence = new Presence(metadata.clientId, {
    type: PresenceType.GAME,
    largeImageKey: metadata.images.googleLogo,
    startTimestamp: Date.now()
  });

  const queryString = parseQuerystring(location.href) as { q: string };
  if (!queryString.q) return;

  presence.setDetails(`Searching for ${queryString.q}`).send();
}

runActivity();
