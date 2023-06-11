import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendinvitationPage } from './sendinvitation.page';

const routes: Routes = [
  {
    path: '',
    component: SendinvitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendinvitationPageRoutingModule {}
