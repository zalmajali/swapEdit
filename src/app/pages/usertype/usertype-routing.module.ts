import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsertypePage } from './usertype.page';

const routes: Routes = [
  {
    path: '',
    component: UsertypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsertypePageRoutingModule {}
