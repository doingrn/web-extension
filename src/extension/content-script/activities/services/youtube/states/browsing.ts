import type { Presence } from '@/shared/presence';

export const handleBrowsingState = (presence: Presence) => {
  presence.setDetails('Browsing feed').setStartTimestamp(Date.now()).send();
};
