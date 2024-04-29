import type { Presence } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';

export const handleSearchState = (presence: Presence) => {

  const query = parseQuerystring(location.href) as { q: string };
  if (!query.q) return;

  presence.setDetails(`Searching for ${query.q}`).setStartTimestamp(Date.now()).send();
};
