import type { ActivityEvent } from '@/extension/shared/activity-event';
import type { AllActivityEvents } from '@/extension/shared/activity-event/events';

let port: chrome.runtime.Port | null = null;

connect();

function connect() {
  port = chrome.runtime.connect({ name: 'doingrn' });

  port.onDisconnect.addListener(() => {
    connect();
  });
}

export function sendManagerMessage(data: AllActivityEvents | ActivityEvent) {
  port?.postMessage(data);
}
