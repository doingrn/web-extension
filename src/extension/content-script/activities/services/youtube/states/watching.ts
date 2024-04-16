import type { Presence } from '@/extension/shared/presence';
import { timeToMs } from '@/extension/shared/utils/time-to-ms';

let lastVideoUrl = '';

export const handleWatchingState = (presence: Presence) => {
  const target = document.querySelector('ytd-app') ?? document;

  const observer = new MutationObserver(() => {
    // if the DOM changes but we are on the same page, do nothing
    if (lastVideoUrl === location.href) return;

    lastVideoUrl = location.href;

    const videoDuration = document.querySelector<HTMLSpanElement>('.ytp-time-duration')?.textContent ?? '0:00';
    const videoTitle = document.querySelector<HTMLHeadingElement>('#title > h1.ytd-watch-metadata yt-formatted-string')?.textContent;
    const channel = document.querySelector<HTMLAnchorElement>('yt-formatted-string.ytd-channel-name a');
    const channelName = channel?.textContent;

    if (!videoTitle || !channelName) return;

    presence
      .setButtons([
        {
          label: 'Watch on YouTube',
          url: location.href
        },
        channel
          ? {
              label: 'Visit Channel',
              url: channel.href
            }
          : undefined
      ])
      .setState(channelName)
      .setDetails(`Watching ${videoTitle}`)
      .setEndTimestamp(Date.now() + timeToMs(videoDuration, 'mm:ss'))
      .send();
  });

  observer.observe(target, { childList: true, subtree: true });
};
