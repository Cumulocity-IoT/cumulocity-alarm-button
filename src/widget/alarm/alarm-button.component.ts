/*
 * Copyright (c) 2022 Software AG, Darmstadt, Germany and/or Software AG USA Inc., Reston, VA, USA,
 * and/or its subsidiaries and/or its affiliates and/or their licensors.
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @authors Christof Strack
 */
import { Component, Input, ViewEncapsulation } from "@angular/core";
import { IAlarm } from "@c8y/client";
import { CoreModule, FormsModule, ModalLabels, SelectModule } from "@c8y/ngx-components";
import { gettext } from "@c8y/ngx-components/gettext";
import { Subject } from "rxjs";

@Component({
  selector: "alarm-button",
  templateUrl: "alarm-button.component.html",
  styleUrls: ["../alarm-button.style.css"],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CoreModule, FormsModule, SelectModule]
})
export class AlarmButtonModalComponent {
  @Input() alarm: IAlarm;
  closeSubject: Subject<IAlarm | undefined> = new Subject();

  title = gettext("Raise Alarm");
  labels: ModalLabels = {
    ok: gettext("Raise Alarm"),
    cancel: gettext("Cancel"),
  };

  severities: string[] = ["CRITICAL", "MAJOR", "MINOR", "WARNING"];

  onDone() {
    this.closeSubject.next(this.alarm);
    this.closeSubject.complete();
  }

  onDismiss() {
    this.closeSubject.next(undefined);
    this.closeSubject.complete();
  }
}
