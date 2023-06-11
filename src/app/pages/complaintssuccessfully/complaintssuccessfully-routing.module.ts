import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplaintssuccessfullyPage } from './complaintssuccessfully.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintssuccessfullyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintssuccessfullyPageRoutingModule {}
