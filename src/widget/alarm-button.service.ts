import { Injectable } from "@angular/core";
import { AlarmService, IAlarm, Realtime } from "@c8y/client";
import type { SubscriptionHandle } from "cometd";

@Injectable({ providedIn: "root" })
export class AlarmButtonService {

  constructor(
    protected alarmService: AlarmService,
    protected realtime: Realtime
  ) {}

  async startListenToUpdate(device: string, callback: (data: any) => void): Promise<SubscriptionHandle> {
    return this.realtime.subscribe(`/alarms/${device}`, callback);
  }

  /** Returns data for current columns and pagination setup. */
  async createAlarm(alarm: IAlarm): Promise<IAlarm> {
    const { res, data } = await this.alarmService.create(alarm);
    // execute inventory query for the list of managed objects
    return data;
  }

  stopListenToUpdate(subscription: SubscriptionHandle): void {
    this.realtime.unsubscribe(subscription);
  }
}
