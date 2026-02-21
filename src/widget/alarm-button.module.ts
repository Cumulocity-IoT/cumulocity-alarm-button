import { NgModule } from '@angular/core';
import { AlarmButtonComponent } from './alarm-button.component';
import { AlarmButtonConfig } from './alarm-button-config.component';
import { hookComponent } from '@c8y/ngx-components';
import { gettext } from '@c8y/ngx-components/gettext';
import { AlarmButtonModalComponent } from './alarm/alarm-button.component';
import { assetPaths } from '../assets/assets';

@NgModule({
  imports: [AlarmButtonComponent, AlarmButtonConfig, AlarmButtonModalComponent],
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
