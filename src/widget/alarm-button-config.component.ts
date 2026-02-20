import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  DynamicComponent,
  OnBeforeSave,
  AlertService,
} from "@c8y/ngx-components";
import { WidgetConfigService } from "@c8y/ngx-components/context-dashboard";

@Component({
  selector: "c8y-widget-plugin-config",
  templateUrl: "./alarm-button-config.component.html",
  standalone: false
})
export class AlarmButtonConfig
  implements DynamicComponent, OnBeforeSave, OnInit
{
  @Input() config: any = {};

  severities: string[] = ["CRITICAL", "MAJOR", "MINOR", "WARNING"];

  @ViewChild('sampleWidgetPreview')
  set previewTemplateSet(template: TemplateRef<any>) {
    if (template) {
      this.widgetConfigService.setPreview(template);
      return;
    }
    this.widgetConfigService.setPreview(null);
  }

  constructor(private alert: AlertService, private widgetConfigService: WidgetConfigService) {}

  ngOnInit(): void {
    console.log(`Current config is: `, this.config);
  }

  onBeforeSave(_config: any): boolean {
    if (!this.config.text?.trim()) {
      this.alert.warning("Please enter a valid text.");
      return false;
    }
    if (!this.config.buttonText?.trim()) {
      this.config.buttonText = "Button Text";
    }
    return true;
  }

  inputChange(evt: any): void {
    console.log("Has changed:", evt);
  }

  selectionChanged(e) {
    console.log("Changed configuration", e);
  }
}
