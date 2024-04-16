import type { Presence } from '@/extension/shared/presence';
import { timeToMs } from '@/extension/shared/utils/time-to-ms';

export const handleWatchingState = (presence: Presence) => {
  const target = document.querySelector('ytd-app') ?? document;

  const observer = new MutationObserver(() => {
    const videoDuration = document.querySelector<HTMLSpanElement>('.ytp-time-duration')?.textContent ?? '0:00';
    const videoTitle = document.querySelector<HTMLHeadingElement>('#title > h1.ytd-watch-metadata yt-formatted-string')?.textContent;
    const channel = document.querySelector<HTMLAnchorElement>('yt-formatted-string.ytd-channel-name a');
    const channelName = channel?.textContent;
    const video = document.querySelector<HTMLVideoElement>('#ytd-player .html5-video-container > video');

    if (!videoTitle || !channelName || !video) return;

    // check if at least one property has changed
    if (
      (presence.details === `Watching ${videoTitle}` &&
        presence.state === channelName &&
        video.paused &&
        presence.smallImageText === 'Paused') ||
      (!video.paused && presence.smallImageText === 'Watching')
    )
      return;

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
      .setSmallImageText(video.paused ? 'Paused' : 'Watching')
      .setState(channelName)
      .setDetails(`Watching ${videoTitle}`)
      .setEndTimestamp(Date.now() + timeToMs(videoDuration, 'mm:ss'))
      .send();
  });

  observer.observe(target, { childList: true, subtree: true });
};
