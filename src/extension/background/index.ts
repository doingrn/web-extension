import { ActivityEvent } from './activity-event';
import type { AllActivityEvents } from './activity-event/events';

const ws = new WebSocket('ws://localhost:54548/ws');

ws.addEventListener('open', () => {
  console.log('opened connection');
});

ws.addEventListener('close', () => {
  console.log('connection closed');
});

ws.addEventListener('message', (msg) => {
  console.log(msg);
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'doingrn') return;

  port.onMessage.addListener((request: AllActivityEvents | ActivityEvent) => {
    ws.send(JSON.stringify(request instanceof ActivityEvent ? request.toJSON() : request));
  });
});
