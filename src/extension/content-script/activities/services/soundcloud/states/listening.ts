import type { Presence } from '@/shared/presence';
import { setSongDuration } from '../utils/set-song-duration';

export const handleListeningState = (presence: Presence) => {
  const target = document;

  const observer = new MutationObserver(() => {
    const artistElement = document.querySelector<HTMLAnchorElement>(
      '.playbackSoundBadge__lightLink.sc-link-light.sc-link-secondary.sc-truncate.sc-text-h5'
    );
    const songElement = document.querySelector<HTMLAnchorElement>('.playbackSoundBadge__titleLink.sc-truncate.sc-text-h5.sc-link-primary');

    if (!artistElement?.textContent || !songElement?.textContent || !songElement?.title) {
      return;
    }

    const isDragging = document.querySelector<HTMLDivElement>('.playbackTimeline.is-dragging');

    const isPlaying = document
      .querySelector<HTMLButtonElement>('.playControl.sc-ir.playControls__control.playControls__play')
      ?.classList.contains('playing');

    // when the user changes the song duration, the presence does not update automatically
    // so we need to do this
    if (!isDragging) {
      if (
        presence.details === artistElement.textContent &&
        presence.state === songElement.title &&
        ((presence.smallImageText === 'Listening' && isPlaying) || (presence.smallImageText === 'Paused' && !isPlaying))
      ) {
        return;
      }
    }

    // we dont want to send the paused state.
    if (!isPlaying) {
      if (presence.smallImageText === 'Listening') {
        presence.setSmallImageText('Paused');
        presence.clearActivity();
      }
      return;
    }

    setSongDuration(presence);

    presence
      .setButtons([
        {
          label: 'Listen on SoundCloud',
          url: songElement.href
        },
        {
          label: 'View Artist',
          url: artistElement.href
        }
      ])
      .setSmallImageText(isPlaying ? 'Listening' : 'Paused')
      .setState(songElement.title)
      .setDetails(artistElement.textContent)
      .send();
  });

  observer.observe(target, { childList: true, subtree: true });

  return () => observer.disconnect();
};
