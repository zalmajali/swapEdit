import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangelangoutPage } from './changelangout.page';

const routes: Routes = [
  {
    path: '',
    component: ChangelangoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangelangoutPageRoutingModule {}
