import { sendManagerMessage } from '@/content-script/utils/send-manager-message';
import { ActivityEvent } from '@/shared/activity-event';
import type { UpdateUserActivityEvent } from '@/shared/activity-event/events';
import { manager } from '../..';

export class WebsocketManager extends WebSocket {
  public closedBecauseAppClosed = false;

  constructor(url: string) {
    super(url);

    this.setup();
  }

  private setup() {
    const handleOpen = () => {
      console.log('[WS] Connected to Websocket.');
    };

    const handleError = () => {
      console.error('[WS] Unexpected Websocket error, reconnecting in 10 seconds.');
      this.closedBecauseAppClosed = true;
    };

    const handleMessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data);
        switch (data.t) {
          case 'init_state':
            manager.user.setUser(data.d.user);
            sendManagerMessage(new ActivityEvent<UpdateUserActivityEvent>('update_user', data.d.user));
            break;
        }
      } catch (e) {
        console.log(e);
        this.close(1000);
      }
    };

    this.addEventListener('open', handleOpen);
    this.addEventListener('error', handleError);
    this.addEventListener('message', handleMessage);
  }
}
