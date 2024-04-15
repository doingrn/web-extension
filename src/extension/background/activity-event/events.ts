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
  clientId: string;
  presence: Presence;
}

export type UpdateActivityEvent = ActivityEvent<{ t: 'update_activity'; d: UpdateActivityEventPayload }>;

export interface ClearActivityEventPayload {
  name: string;
  clientId: string;
}

export type ClearActivityEvent = ActivityEvent<{ t: 'clear_activity'; d: ClearActivityEventPayload }>;

export type AllActivityEvents = UpdateActivityEvent | ClearActivityEvent;
