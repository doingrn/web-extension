import type { Presence } from '@/shared/presence';
import { setVideoDuration } from '../utils/set-video-duration';

export const handleWatchingState = (presence: Presence) => {
  const target = document.querySelector('ytd-app') ?? document;

  const observer = new MutationObserver(() => {
    const videoTitle = document.querySelector<HTMLHeadingElement>('#title > h1.ytd-watch-metadata yt-formatted-string')?.textContent;
    const video = document.querySelector<HTMLVideoElement>('#ytd-player .html5-video-container > video');
    const channel = document.querySelector<HTMLAnchorElement>('yt-formatted-string.ytd-channel-name a');
    const channelName = channel?.textContent;

    if (!videoTitle || !channelName || !video) return;

    if (
      presence.details === `Watching ${videoTitle}` &&
      presence.state === channelName &&
      (video.paused === (presence.smallImageText === 'Paused') || video.paused !== (presence.smallImageText === 'Watching'))
    )
      return;

    if (video.paused && !document.hidden) presence.setStartTimestamp().setEndTimestamp();
    else setVideoDuration(presence);

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

  return () => observer.disconnect();
};
