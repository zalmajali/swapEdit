import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesdetalisoutPage } from './servicesdetalisout.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesdetalisoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesdetalisoutPageRoutingModule {}
