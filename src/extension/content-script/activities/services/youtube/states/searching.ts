import { ActivityEvent } from '@/extension/background/activity-event';
import type { UpdateActivityEvent } from '@/extension/background/activity-event/events';
import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import type { Presence } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';
import { metadata } from '../metadata';

export const handleSearchState = (presence: Presence) => {
  const query = parseQuerystring(location.href) as { q: string };
  if (!query.q) return;

  presence.setDetails(`Searching for ${query.q}`).setStartTimestamp(Date.now());
  sendManagerMessage(
    new ActivityEvent<UpdateActivityEvent>('update_activity', { name: metadata.name, clientId: presence.clientId, presence })
  );
};
