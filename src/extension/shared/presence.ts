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
  public buttons: PresenceButton[] = [];
  public details?: string;
  public state?: string;

  constructor(
    public clientId: string,
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

  setButtons(buttons: PresenceButton[]) {
    this.buttons = buttons;
    return this;
  }

  setDetails(details: string) {
    this.details = details;
    return this;
  }

  setState(state: string) {
    this.state = state;
    return this;
  }

  toJSON() {
    return {
      name: this.name,
      type: this.type,
      buttons: this.buttons,
      details: this.details,
      state: this.state
    };
  }
}
