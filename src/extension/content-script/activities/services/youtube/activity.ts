import { ActivityEvent } from '@/extension/background/activity-event';
import type { ClearActivityEvent, UpdateActivityEvent } from '@/extension/background/activity-event/events';
import { sendManagerMessage } from '@/extension/content-script/utils/send-manager-message';
import { Presence, PresenceType } from '@/extension/shared/presence';
import { parseQuerystring } from '@/extension/shared/utils/querystring';
import { metadata } from './metadata';
import { timeToMs } from '@/extension/shared/utils/time-to-ms';

const presence = new Presence(metadata.clientId, {
  name: metadata.name,
  type: PresenceType.WATCHING,
  largeImageKey: metadata.images.youtubeLogo,
  startTimestamp: Date.now()
});

async function clearActivity() {
  sendManagerMessage(new ActivityEvent<ClearActivityEvent>('clear_activity', { name: metadata.name, clientId: presence.clientId }));
}

async function runActivity() {
  // check if location.href matches metadata.supportedWebsites
  if (!metadata.supportedWebsites.some((website) => website.test(location.href))) return;

  window.addEventListener('beforeunload', () => {
    clearActivity();
  });

  const handleSearchState = () => {
    const query = parseQuerystring(location.href) as { q: string };
    if (query.q) {
      presence.setDetails(`Searching for ${query.q}`).setStartTimestamp(Date.now());
      sendManagerMessage(
        new ActivityEvent<UpdateActivityEvent>('update_activity', { name: metadata.name, clientId: presence.clientId, presence })
      );
    }
  };

  const handleWatchingState = () => {
    const target = document.querySelector('ytd-app') ?? document;

    let lastVideoUrl = '';

    // create a mutation observer that listen for element changes and stops when an element with query selector: #title > h1.ytd-watch-metadata yt-formatted-string matches
    const observer = new MutationObserver(() => {
      if (lastVideoUrl === location.href) return;

      lastVideoUrl = location.href;

      const videoDuration = document.querySelector<HTMLSpanElement>('.ytp-time-duration')?.textContent ?? '0:00';
      const videoTitle = document.querySelector<HTMLHeadingElement>('#title > h1.ytd-watch-metadata yt-formatted-string')?.textContent;
      const channel = document.querySelector<HTMLAnchorElement>('yt-formatted-string.ytd-channel-name a');
      const channelName = channel?.textContent;

      if (videoTitle) presence.setDetails(`Watching ${videoTitle}`);
      if (channelName) presence.setState(channelName);

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

      presence.setButtons(buttons);
      presence.setEndTimestamp(Date.now() + timeToMs(videoDuration, 'mm:ss'));

      // ytp-time-duration
      sendManagerMessage(
        new ActivityEvent<UpdateActivityEvent>('update_activity', { name: metadata.name, clientId: presence.clientId, presence })
      );
    });

    observer.observe(target, { childList: true, subtree: true });
  };

  if (location.href.includes('/search')) return handleSearchState();
  if (location.href.includes('/watch')) return handleWatchingState();
}

runActivity();
