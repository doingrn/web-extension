import type { ActivityEvent } from './activity-event';
import type { AllActivityEvents } from './activity-event/events';

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'doingrn') return;

  port.onMessage.addListener((request: AllActivityEvents | ActivityEvent) => {
    const { t: type, d: data } = request;

    if (type === 'update_activity') {
      console.log('Received request to update activity', data.name, 'with data', data);
    }
  });
});
