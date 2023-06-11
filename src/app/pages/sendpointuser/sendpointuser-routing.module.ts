import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendpointuserPage } from './sendpointuser.page';

const routes: Routes = [
  {
    path: '',
    component: SendpointuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendpointuserPageRoutingModule {}
