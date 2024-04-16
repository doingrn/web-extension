import type { Presence } from '@/extension/shared/presence';
import type { ActivityEvent } from '.';

export interface BaseActivityEvent {
  t: string;
  d: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any;
  };
}

export interface RegisterActivityEventPayload {
  clientId: string;
  icon: string;
}

export type RegisterActivityEvent = ActivityEvent<{ t: 'register_activity'; d: RegisterActivityEventPayload }>;

export interface UpdateActivityEventPayload {
  clientId: string;
  presence: Presence;
}

export type UpdateActivityEvent = ActivityEvent<{ t: 'update_activity'; d: UpdateActivityEventPayload }>;

export interface ClearActivityEventPayload {
  clientId: string;
}

export type ClearActivityEvent = ActivityEvent<{ t: 'clear_activity'; d: ClearActivityEventPayload }>;

export type AllActivityEvents = UpdateActivityEvent | ClearActivityEvent;
