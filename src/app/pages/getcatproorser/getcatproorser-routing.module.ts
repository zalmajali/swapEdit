import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetcatproorserPage } from './getcatproorser.page';

const routes: Routes = [
  {
    path: '',
    component: GetcatproorserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetcatproorserPageRoutingModule {}
