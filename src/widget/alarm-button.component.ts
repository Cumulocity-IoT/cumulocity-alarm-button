import { Component, Input, OnInit } from "@angular/core";
import { AlarmButtonService } from "./alarm-button.service";
import { IAlarm } from "@c8y/client";
import { AlertService, CoreModule } from "@c8y/ngx-components";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AlarmButtonModalComponent } from "./alarm/alarm-button.component";

@Component({
  selector: "c8y-widget-plugin",
  template: `
    <div class="p-32 text-center">
      <button
        type="button"
        [ngClass]="['btn', config.buttonStyle || 'btn-default', config.buttonSize || '']"
        (click)="clickedRaiseAlarm()"
      >
        @if (config.buttonIcon) {
          <i [c8yIcon]="config.buttonIcon"></i>
        }
        {{config.buttonText}}
      </button>
    </div>
  `,
  standalone: true,
  imports: [CoreModule]
})
export class AlarmButtonComponent implements OnInit {
  @Input() config;
  constructor(
    private service: AlarmButtonService,
    private alertService: AlertService,
    public bsModalService: BsModalService
  ) {}

  ngOnInit(): void {
    if (this.config.listen) {
      this.service.startListenToUpdate(this.config?.device?.id, this.newUpdate.bind(this));
    }
  }

  clickedRaiseAlarm() {
    const timestamp: number = Date.now();
    const iso_string: string = new Date().toISOString();
    const text: string = this.interpolate(this.config.text ?? '', { timestamp, iso_string });
    const alarm: IAlarm = {
      severity: this.config.severity,
      source: { id: this.config?.device?.id },
      text: text,
      type: this.config.type,
      time: new Date().toISOString(),
    };

    if (this.config.alwaysUseDefault) {
      this.raiseAlarm(alarm);
      return;
    }

    const initialState = { alarm };
    const modalRef: BsModalRef = this.bsModalService.show(
      AlarmButtonModalComponent,
      { initialState }
    );
    modalRef.content.closeSubject.subscribe((result: IAlarm) => {
      if (result) {
        this.raiseAlarm(result);
      }
      modalRef.hide();
    });
  }

  async raiseAlarm(alarm: IAlarm) {
    try {
      const result: IAlarm = await this.service.createAlarm(alarm);
      this.alertService.info("Created new alarm: " + result.id);
    } catch (error: any) {
      this.alertService.danger(error?.message ?? "Failed to create alarm.");
    }
  }

  newUpdate(p: any): void {
    const config = this.config;
    const prop = p["data"]["data"][config.listenProperty];
    const data = p["data"]["data"];
    if (prop !== undefined) {
      this.alertService.info(`Update for alarm ${data.id}: ${config.listenProperty} = ${prop}`);
    }
  }

  private interpolate(template: string, vars: Record<string, unknown>): string {
    return template.replace(/\$\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
  }
}
