import type { ActivityEvent } from '@/extension/shared/activity-event';
import type { AllActivityEvents } from '@/extension/shared/activity-event/events';

export function sendManagerMessage(data: AllActivityEvents | ActivityEvent) {
  chrome.runtime.sendMessage({ name: 'doingrn', d: data });
}
