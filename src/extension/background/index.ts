import { ActivityEvent } from '../shared/activity-event';
import type { AllActivityEvents } from '../shared/activity-event/events';

let ws: WebSocket;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'doingrn') return;

  port.onMessage.addListener((request: AllActivityEvents | ActivityEvent) => {
    console.log(request);

    switch (request.t) {
      case 'register_activity':
        console.log('[TODO] Handle register activity event');
        break;
      default:
        ws.send(JSON.stringify(request instanceof ActivityEvent ? request.toJSON() : request));
    }
  });
});

function setupWebsocket() {
  let closedBecauseAppClosed = false;
  ws = new WebSocket('ws://localhost:54548');

  const handleOpen = () => {
    console.log('[WS] Connected to Websocket.');
  };

  const handleError = () => {
    console.error('[WS] Unexpected Websocket error, reconnecting in 10 seconds.');
    closedBecauseAppClosed = true;
  };

  const handleClose = () => {
    setTimeout(() => setupWebsocket(), closedBecauseAppClosed ? 10_000 : 5000);
  };

  const handleMessage = (msg: MessageEvent) => {
    console.log(msg);
  };

  ws.addEventListener('open', handleOpen);
  ws.addEventListener('error', handleError);
  ws.addEventListener('close', handleClose);
  ws.addEventListener('message', handleMessage);
}

setupWebsocket();
