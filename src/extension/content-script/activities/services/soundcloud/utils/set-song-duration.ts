import type { Presence } from '@/extension/shared/presence';
import { timeToMs } from '@/extension/shared/utils/time-to-ms';

export const setSongDuration = (presence: Presence) => {
  const totalDuration = document.querySelector<HTMLSpanElement>(
    '.playbackTimeline__duration.sc-text-primary.sc-text-h5 > span[aria-hidden="true"]'
  )?.textContent;
  const currentDuration = document.querySelector<HTMLSpanElement>(
    '.playbackTimeline__timePassed.sc-text-primary.sc-text-h5 > span[aria-hidden="true"]'
  )?.textContent;

  if (!totalDuration || !currentDuration) return;

  let durationFormat = 'mm:ss' as 'mm:ss' | 'hh:mm:ss';
  let currentDurationFormat = 'mm:ss' as 'mm:ss' | 'hh:mm:ss';
  if (currentDuration.split(':').length === 3) durationFormat = 'hh:mm:ss';
  if (totalDuration.split(':').length === 3) currentDurationFormat = 'hh:mm:ss';

  presence
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + timeToMs(totalDuration, durationFormat) - timeToMs(currentDuration, currentDurationFormat));
};
