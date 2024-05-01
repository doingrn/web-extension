import type { Presence } from '@/shared/presence';
import { parseQuerystring } from '@/shared/utils/querystring';

export const handleSearchState = (presence: Presence) => {
  const query = parseQuerystring(location.href) as { q: string };
  if (!query.q) return;

  presence.setDetails(`Searching for ${query.q}`).setStartTimestamp(Date.now()).send();
};
