import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import { ActivityEvent } from '@/extension/shared/activity-event';
import type { UpdateActivityEvent } from '@/extension/shared/activity-event/events';
import type { Presence } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';

export const handleSearchState = (presence: Presence) => {
  const query = parseQuerystring(location.href) as { q: string };
  if (!query.q) return;

  presence.setDetails(`Searching for ${query.q}`).setStartTimestamp(Date.now());
  sendManagerMessage(new ActivityEvent<UpdateActivityEvent>('update_activity', { clientId: presence.clientId, presence }));
};
