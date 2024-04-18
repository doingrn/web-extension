import type { Presence } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';

export const handleSearchState = (presence: Presence) => {
  const query = parseQuerystring(location.href) as { search_query: string };
  if (!query.search_query) return;

  presence.setDetails(`Searching for ${query.search_query}`).setStartTimestamp(Date.now()).send();
};
