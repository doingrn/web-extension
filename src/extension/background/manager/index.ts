import { ActivityEvent } from '@/extension/shared/activity-event';
import type { AllActivityEvents } from '@/extension/shared/activity-event/events';
import type { LoadedActivity } from '@/extension/shared/types/activity-metadata';
import { WebsocketManager } from './websocket';

interface ActivityStorage {
  enabled: boolean;
  [key: string]: unknown;
}

interface DoingRNStorage {
  activities: (LoadedActivity & { settings: ActivityStorage })[];
}

export class ActivityManager {
  public loadedActivities: LoadedActivity[] = [];

  private ws?: WebsocketManager;
  private portName: string;

  constructor(portName = 'doingrn') {
    this.portName = portName;

    this.setupActivityStorage();
    this.setupWebsocket();

    chrome.runtime.onConnect.addListener((port) => {
      if (port.name !== this.portName) return;

      port.onMessage.addListener((request: AllActivityEvents) => {
        console.log(request);

        switch (request.t) {
          case 'register_activity':
            if (this.loadedActivities.find((a) => a.clientId === request.d.clientId)) return;
            this.loadedActivities.push(request.d);
            this.addActivityToStorage(request.d);
            break;
          default:
            if (!this.ws || this.ws.readyState !== this.ws.OPEN) return;
            this.ws.send(JSON.stringify(request instanceof ActivityEvent ? request.toJSON() : request));
        }
      });
    });
  }

  private async setupActivityStorage() {
    const { doingrn } = await chrome.storage.local.get('doingrn');
    if (!doingrn || !doingrn.activities) await chrome.storage.local.set({ doingrn: { activities: [] } });
  }

  private async addActivityToStorage(activity: LoadedActivity) {
    const { doingrn } = (await chrome.storage.local.get('doingrn')) as { doingrn: DoingRNStorage };

    if (!doingrn.activities.find((a) => a.clientId === activity.clientId)) {
      await chrome.storage.local.set({ doingrn: { activities: [...doingrn.activities, { ...activity, settings: { enabled: true } }] } });
    }
  }

  async deleteActivityFromStorage(activity: LoadedActivity) {
    const { doingrn } = (await chrome.storage.local.get('doingrn')) as { doingrn: DoingRNStorage };
    doingrn.activities = doingrn.activities.filter((a) => a.clientId !== activity.clientId);
    await chrome.storage.local.set({ doingrn });
  }

  async getActivitySettings(name: string) {
    const { doingrn } = (await chrome.storage.local.get('doingrn')) as { doingrn: DoingRNStorage };
    for (const activity of doingrn.activities) {
      if (activity.metadata.name === name) {
        return activity.settings;
      }
    }

    return {} as ActivityStorage;
  }

  async setActivitySettings(name: string, settings: Record<string, unknown>) {
    const { doingrn } = (await chrome.storage.local.get('doingrn')) as { doingrn: DoingRNStorage };
    for (const activity of doingrn.activities) {
      if (activity.metadata.name === name) {
        activity.settings = { ...activity.settings, ...settings };
        await chrome.storage.local.set({ doingrn });
      }
    }
  }

  async getStoredActivities() {
    const { doingrn } = (await chrome.storage.local.get('doingrn')) as { doingrn: DoingRNStorage };
    return doingrn.activities;
  }

  private setupWebsocket() {
    this.ws = new WebsocketManager('wss://termination-exceed-genome-registrar.trycloudflare.com/');

    const handleClose = () => {
      setTimeout(() => this.setupWebsocket(), this.ws?.closedBecauseAppClosed ? 10_000 : 5000);
    };

    this.ws.addEventListener('close', handleClose);
  }
}
