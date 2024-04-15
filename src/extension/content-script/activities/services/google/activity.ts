import { ActivityEvent } from '@/extension/background/activity-event';
import type { UpdateActivityEvent } from '@/extension/background/activity-event/events';
import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import { Presence, PresenceType } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';

const ALLOWED_WEBSITES = [
  /https:\/\/www\.google\.com\/search\?q=.*$/,
  /https:\/\/www\.google\.[a-z]{2}\/search\?q=.*$/,
  /https:\/\/www\.google\.com\.[a-z]{2}\/search\?q=.*$/
];

async function runActivity() {
  // check if location.href matches ALLOWED_WEBSITES
  if (!ALLOWED_WEBSITES.some((website) => website.test(location.href))) return;

  let presence = new Presence('123', { name: 'google', type: PresenceType.GAME });
  sendManagerMessage(new ActivityEvent<UpdateActivityEvent>('update_activity', { name: 'google', presence }));

  const queryString = parseQuerystring(location.href) as { q: string };
  if (!queryString.q) return;

  presence = new Presence('123', { name: 'google', type: PresenceType.GAME, state: `Searching for ${queryString.q}` });
  sendManagerMessage(new ActivityEvent<UpdateActivityEvent>('update_activity', { name: 'google', presence }));
}

runActivity();
