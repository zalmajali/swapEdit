import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwaitingapprovalPage } from './awaitingapproval.page';

const routes: Routes = [
  {
    path: '',
    component: AwaitingapprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AwaitingapprovalPageRoutingModule {}
