import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargeinformationPage } from './chargeinformation.page';

const routes: Routes = [
  {
    path: '',
    component: ChargeinformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargeinformationPageRoutingModule {}
