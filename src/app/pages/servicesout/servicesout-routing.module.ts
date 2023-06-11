import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesoutPage } from './servicesout.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesoutPageRoutingModule {}
