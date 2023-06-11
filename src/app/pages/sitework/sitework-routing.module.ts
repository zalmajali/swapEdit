import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteworkPage } from './sitework.page';

const routes: Routes = [
  {
    path: '',
    component: SiteworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteworkPageRoutingModule {}
