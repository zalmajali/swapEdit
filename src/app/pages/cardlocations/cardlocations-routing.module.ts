import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardlocationsPage } from './cardlocations.page';

const routes: Routes = [
  {
    path: '',
    component: CardlocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardlocationsPageRoutingModule {}
