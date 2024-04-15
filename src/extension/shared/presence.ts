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
  public name = 'DoingRN';
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

  constructor(
    public readonly clientId: string,
    options?: Partial<Presence>
  ) {
    if (options) Object.assign(this, options);
    return;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setType(type: PresenceType) {
    this.type = type;
    return this;
  }

  setButtons(buttons?: PresenceButton[]) {
    this.buttons = buttons;
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
      name: this.name,
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
}
