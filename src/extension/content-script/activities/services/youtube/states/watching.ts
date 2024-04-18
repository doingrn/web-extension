import type { Presence } from '@/extension/shared/presence';
import { timeToMs } from '@/extension/shared/utils/time-to-ms';

export const handleWatchingState = (presence: Presence) => {
  const target = document.querySelector('ytd-app') ?? document;

  const observer = new MutationObserver(() => {
    const currentVideoDuration = document.querySelector<HTMLSpanElement>('.ytp-time-current')?.textContent ?? '0:00';
    const videoDuration = document.querySelector<HTMLSpanElement>('.ytp-time-duration')?.textContent ?? '0:00';
    const videoTitle = document.querySelector<HTMLHeadingElement>('#title > h1.ytd-watch-metadata yt-formatted-string')?.textContent;
    const channel = document.querySelector<HTMLAnchorElement>('yt-formatted-string.ytd-channel-name a');
    const channelName = channel?.textContent;
    const video = document.querySelector<HTMLVideoElement>('#ytd-player .html5-video-container > video');

    if (!videoTitle || !channelName || !video) return;

    const oldTimestamp = presence.startTimestamp;

    if (video.paused) presence.setStartTimestamp().setEndTimestamp();
    else {
      let durationFormat = 'mm:ss';
      let currentDurationFormat = 'mm:ss';
      if (videoDuration.split(':').length === 3) durationFormat = 'hh:mm:ss';
      if (currentVideoDuration.split(':').length === 3) currentDurationFormat = 'hh:mm:ss';

      presence
        .setStartTimestamp(Date.now())
        // @ts-expect-error | format will always be one of 'mm:ss' or 'hh:mm:ss'
        .setEndTimestamp(Date.now() + timeToMs(videoDuration, durationFormat) - timeToMs(currentVideoDuration, currentDurationFormat));
    }

    // check if at least one property has changed
    if (
      (presence.details === `Watching ${videoTitle}` &&
        presence.state === channelName &&
        presence.startTimestamp === oldTimestamp &&
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
      .send();
  });

  observer.observe(target, { childList: true, subtree: true });
};
