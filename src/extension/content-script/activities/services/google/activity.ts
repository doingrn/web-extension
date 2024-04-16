import { Presence, PresenceType } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';
import { metadata } from './metadata';

const presence = new Presence(metadata.clientId, {
  type: PresenceType.GAME,
  largeImageKey: metadata.images.googleLogo,
  startTimestamp: Date.now(),
  metadata
});

presence.on('update', () => {
  const queryString = parseQuerystring(location.href) as { q: string };
  if (!queryString.q) return;

  presence.setDetails(`Searching for ${queryString.q}`).send();
});
