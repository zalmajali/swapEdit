import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeoutPage } from './homeout.page';

const routes: Routes = [
  {
    path: '',
    component: HomeoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeoutPageRoutingModule {}
