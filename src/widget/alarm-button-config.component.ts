import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  CoreModule,
  DynamicComponent,
  FormsModule,
  OnBeforeSave,
  AlertService,
  SelectModule,
} from "@c8y/ngx-components";
import { WidgetConfigService } from "@c8y/ngx-components/context-dashboard";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AlarmButtonComponent } from "./alarm-button.component";
import { ICONS } from "./icons.constant";

@Component({
  selector: "c8y-widget-plugin-config",
  templateUrl: "./alarm-button-config.component.html",
  standalone: true,
  imports: [CoreModule, FormsModule, SelectModule, BsDropdownModule, AlarmButtonComponent]
})
export class AlarmButtonConfig
  implements DynamicComponent, OnBeforeSave, OnInit
{
  @Input() config: any = {};

  severities: string[] = ["CRITICAL", "MAJOR", "MINOR", "WARNING"];

  buttonStyles = [
    { label: 'Default', value: 'btn-default' },
    { label: 'Primary', value: 'btn-primary' },
    { label: 'Danger', value: 'btn-danger' },
  ];

  buttonSizes = [
    { label: 'Normal', value: '' },
    { label: 'Large', value: 'btn-lg' },
    { label: 'Small', value: 'btn-sm' },
    { label: 'Extra Small', value: 'btn-xs' },
  ];

  availableIcons: string[] = ICONS;
  iconSearchTerm = '';

  get filteredIcons(): string[] {
    const term = this.iconSearchTerm.trim().toLowerCase();
    return term ? this.availableIcons.filter(i => i.includes(term)) : this.availableIcons;
  }

  @ViewChild('sampleWidgetPreview')
  set previewTemplateSet(template: TemplateRef<any>) {
    if (template) {
      this.widgetConfigService.setPreview(template);
      return;
    }
    this.widgetConfigService.setPreview(null);
  }

  constructor(private alert: AlertService, private widgetConfigService: WidgetConfigService) {}

  ngOnInit(): void {}

  onTypeChange(value: string): void {
    if (!value?.trim()) {
      this.config.alwaysUseDefault = false;
    }
  }

  onBeforeSave(_config: any): boolean {
    if (!this.config.text?.trim()) {
      this.alert.warning("Please enter a valid alarm reason.");
      return false;
    }
    if (!this.config.type?.trim()) {
      this.alert.warning("Please enter a valid alarm type.");
      return false;
    }
    if (this.config.alwaysUseDefault && !this.config.type?.trim()) {
      this.alert.warning("'Always use default values' requires an alarm type to be configured.");
      this.config.alwaysUseDefault = false;
      return false;
    }
    if (!this.config.buttonText?.trim()) {
      this.config.buttonText = "Button Text";
    }
    return true;
  }
}
