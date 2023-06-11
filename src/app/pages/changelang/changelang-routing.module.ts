import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangelangPage } from './changelang.page';

const routes: Routes = [
  {
    path: '',
    component: ChangelangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangelangPageRoutingModule {}
