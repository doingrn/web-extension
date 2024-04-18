import { sendManagerMessage } from '../content-script/utils/send-manager-message';
import { ActivityEvent } from './activity-event';
import type { ClearActivityEvent, RegisterActivityEvent, UpdateActivityEvent } from './activity-event/events';
import type { ActivityMetadata } from './types/activity-metadata';

export enum PresenceType {
  GAME = 0,
  LISTENING = 2,
  WATCHING = 3
}

interface PresenceButton {
  label: string;
  url: string;
}

export class Presence {
  public type: PresenceType = PresenceType.GAME;
  public buttons?: PresenceButton[] = undefined;
  public details?: string;
  public state?: string;
  public largeImageKey = '';
  public smallImageKey?: string;
  public smallImageText?: string;
  public startTimestamp?: number;
  public endTimestamp?: number;

  protected largeImageText = '🐧 doignrn | 0.0.1';
  private metadata: ActivityMetadata;

  constructor(
    public readonly clientId: string,
    options: Partial<Presence> & { metadata: ActivityMetadata }
  ) {
    Object.assign(this, { ...options, metadata: undefined });
    this.metadata = options.metadata;

    sendManagerMessage(
      new ActivityEvent<RegisterActivityEvent>('register_activity', {
        clientId: this.clientId,
        icon: this.largeImageKey,
        metadata: this.metadata
      })
    );
  }

  send() {
    sendManagerMessage(
      new ActivityEvent<UpdateActivityEvent>('update_activity', {
        clientId: this.clientId,
        presence: this
      })
    );
  }

  on(event: 'update', callback: () => void) {
    if (event === 'update') {
      // if presence supports current website, run the activity
      if (
        this.metadata.supportedWebsites.some((website) => {
          if (website instanceof RegExp) return website.test(location.href);
          return website === location.href;
        })
      ) {
        window.addEventListener('beforeunload', () => {
          this.clearActivity();
        });

        callback();
      }
    }
  }

  setType(type: PresenceType) {
    this.type = type;
    return this;
  }

  setButtons(buttons?: (PresenceButton | undefined)[]) {
    this.buttons = buttons?.filter((button) => typeof button !== 'undefined') as PresenceButton[];
    return this;
  }

  setDetails(details?: string) {
    this.details = details;
    return this;
  }

  setState(state?: string) {
    this.state = state;
    return this;
  }

  setLargeImageKey(key: string) {
    this.largeImageKey = key;
    return this;
  }

  setSmallImageKey(key?: string) {
    this.smallImageKey = key;
    return this;
  }

  setSmallImageText(text?: string) {
    this.smallImageText = text;
    return this;
  }

  setStartTimestamp(timestamp?: number) {
    this.startTimestamp = timestamp;
    return this;
  }

  setEndTimestamp(timestamp?: number) {
    this.endTimestamp = timestamp;
    return this;
  }

  toJSON() {
    return {
      type: this.type,
      buttons: this.buttons,
      details: this.details,
      state: this.state,
      startTimestamp: this.startTimestamp,
      endTimestamp: this.endTimestamp,
      largeImageKey: this.largeImageKey,
      largeImageText: this.largeImageText,
      smallImageKey: this.smallImageKey,
      smallImageText: this.smallImageText
    };
  }

  private clearActivity() {
    sendManagerMessage(new ActivityEvent<ClearActivityEvent>('clear_activity', { clientId: this.clientId }));
  }
}
