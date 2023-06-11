import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendpointPage } from './sendpoint.page';

const routes: Routes = [
  {
    path: '',
    component: SendpointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendpointPageRoutingModule {}
