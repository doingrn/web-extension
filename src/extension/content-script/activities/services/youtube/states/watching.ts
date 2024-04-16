import { ActivityEvent } from '@/extension/background/activity-event';
import type { UpdateActivityEvent } from '@/extension/background/activity-event/events';
import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import type { Presence } from '@/extension/shared/presence';
import { timeToMs } from '@/extension/shared/utils/time-to-ms';
import { metadata } from '../metadata';

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

    const buttons = [
      {
        label: 'Watch on YouTube',
        url: location.href
      }
    ];

    if (channel)
      buttons.push({
        label: 'Visit Channel',
        url: channel.href
      });

    presence.setState(channelName).setDetails(`Watching ${videoTitle}`);
    presence.setButtons(buttons).setEndTimestamp(Date.now() + timeToMs(videoDuration, 'mm:ss'));

    // ytp-time-duration
    sendManagerMessage(
      new ActivityEvent<UpdateActivityEvent>('update_activity', { name: metadata.name, clientId: presence.clientId, presence })
    );
  });

  observer.observe(target, { childList: true, subtree: true });
};
