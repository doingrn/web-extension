import type { ActivityEvent } from '@/extension/background/activity-event';
import type { AllActivityEvents } from '@/extension/background/activity-event/events';

const port = chrome.runtime.connect({ name: 'doingrn' });

export function sendManagerMessage(data: AllActivityEvents | ActivityEvent) {
  port.postMessage(data);
}
