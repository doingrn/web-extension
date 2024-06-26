import type { DiscordAPIUser } from '@/background/managers/activity-manager/user-manager';
import type { Presence } from '@/shared/presence';
import type { ActivityEvent } from '.';
import type { LoadedActivity } from '../types/activity-metadata';

export interface BaseActivityEvent {
  t: AllActivityEvents['t'];
  d: AllActivityEvents['d'];
}

export type RegisterActivityEventPayload = LoadedActivity;

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

export type UpdateUserActivityEventPayload = DiscordAPIUser;

export type UpdateUserActivityEvent = ActivityEvent<{ t: 'update_user'; d: UpdateUserActivityEventPayload }>;

export type AllActivityEvents = UpdateActivityEvent | ClearActivityEvent | RegisterActivityEvent | UpdateUserActivityEvent;
