import { NgModule } from '@angular/core';
import { RouterModule as ngRouterModule } from '@angular/router';
import { BootstrapComponent, CoreModule, RouterModule } from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlarmButtonModule } from './widget/alarm-button.module';

@NgModule({
  imports: [
    ngRouterModule.forRoot([], { enableTracing: false, useHash: true }),
    RouterModule.forRoot(),
    CoreModule.forRoot(),
    AlarmButtonModule,
  ],
  providers: [BsModalRef],
  bootstrap: [BootstrapComponent]
})
export class AppModule {}
