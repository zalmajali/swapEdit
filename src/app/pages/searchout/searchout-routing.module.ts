import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchoutPage } from './searchout.page';

const routes: Routes = [
  {
    path: '',
    component: SearchoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchoutPageRoutingModule {}
