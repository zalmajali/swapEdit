import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardmovementsPage } from './cardmovements.page';

const routes: Routes = [
  {
    path: '',
    component: CardmovementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardmovementsPageRoutingModule {}
