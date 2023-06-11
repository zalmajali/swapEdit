import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechargeoperationPage } from './rechargeoperation.page';

const routes: Routes = [
  {
    path: '',
    component: RechargeoperationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechargeoperationPageRoutingModule {}
