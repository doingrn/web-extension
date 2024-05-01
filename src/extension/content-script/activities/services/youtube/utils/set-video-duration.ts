import type { Presence } from '@/shared/presence';
import { timeToMs } from '@/shared/utils/time-to-ms';

export const setVideoDuration = (presence: Presence) => {
  const currentVideoDuration = document.querySelector<HTMLSpanElement>('.ytp-time-current')?.textContent;
  const videoDuration = document.querySelector<HTMLSpanElement>('.ytp-time-duration')?.textContent;

  if (!videoDuration || !currentVideoDuration) return;

  let durationFormat = 'mm:ss' as 'mm:ss' | 'hh:mm:ss';
  let currentDurationFormat = 'mm:ss' as 'mm:ss' | 'hh:mm:ss';
  if (videoDuration.split(':').length === 3) durationFormat = 'hh:mm:ss';
  if (currentVideoDuration.split(':').length === 3) currentDurationFormat = 'hh:mm:ss';

  presence
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + timeToMs(videoDuration, durationFormat) - timeToMs(currentVideoDuration, currentDurationFormat));
};
