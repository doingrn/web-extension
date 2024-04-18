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
      console.log(msg);
    };

    this.addEventListener('open', handleOpen);
    this.addEventListener('error', handleError);
    this.addEventListener('message', handleMessage);
  }
}
