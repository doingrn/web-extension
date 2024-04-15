import type { BaseActivityEvent } from './events';

export class ActivityEvent<Event extends BaseActivityEvent = BaseActivityEvent> {
  constructor(
    public t: Event['t'],
    public d: Event['d']
  ) {
    return;
  }

  setType(type: Event['t']) {
    this.t = type;
    return this;
  }

  setData(data: Event['d']) {
    this.d = data;
    return this;
  }
}
