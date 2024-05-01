import { Presence, PresenceType } from '@/shared/presence';
import { parseQuerystring } from '@/shared/utils/querystring';
import { metadata } from './metadata';

const presence = new Presence(metadata.clientId, {
  type: PresenceType.GAME,
  largeImageKey: metadata.images.main,
  startTimestamp: Date.now(),
  metadata
});

presence.on('update', () => {
  presence.reset();

  const queryString = parseQuerystring(location.href) as { q: string };
  if (!queryString.q) return;

  presence.setDetails(`Searching for ${queryString.q}`).send();
});
