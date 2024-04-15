import type { Presence } from '@/extension/shared/presence';
import type { ActivityEvent } from '.';

export interface BaseActivityEvent {
  t: string;
  d: {
    name: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any;
  };
}

export interface UpdateActivityEventPayload {
  name: string;
  presence: Presence;
}

export type UpdateActivityEvent = ActivityEvent<{ t: 'update_activity'; d: UpdateActivityEventPayload }>;

export type AllActivityEvents = UpdateActivityEvent;
