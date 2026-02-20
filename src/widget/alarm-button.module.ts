import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmButtonComponent } from './alarm-button.component';
import { AlarmButtonConfig } from './alarm-button-config.component';
import { CoreModule, FormsModule, SelectModule, hookComponent } from '@c8y/ngx-components';
import { gettext } from '@c8y/ngx-components/gettext';
import { AlarmButtonModalComponent } from './alarm/alarm-button.component';
import { assetPaths } from '../assets/assets';

@NgModule({
  declarations: [AlarmButtonComponent, AlarmButtonConfig, AlarmButtonModalComponent],
  imports: [CommonModule, CoreModule, FormsModule, SelectModule],
  exports: [],
  providers: [
    hookComponent({
      id: 'raise-alarm.widget.plugin',
      label: gettext('Button to raise alarm'),
      description: 'Button to raise alarm',
      component: AlarmButtonComponent,
      previewImage: assetPaths.previewImage,
      configComponent: AlarmButtonConfig,
    }),
  ],
})
export class AlarmButtonModule {}
