import type { ActivityEvent } from '@/shared/activity-event';
import type { AllActivityEvents } from '@/shared/activity-event/events';

export function sendManagerMessage(data: AllActivityEvents | ActivityEvent) {
  chrome.runtime.sendMessage({ name: 'doingrn', d: data });
}
