import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoproductsPage } from './noproducts.page';

const routes: Routes = [
  {
    path: '',
    component: NoproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoproductsPageRoutingModule {}
