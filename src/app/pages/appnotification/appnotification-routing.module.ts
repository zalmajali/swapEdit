import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppnotificationPage } from './appnotification.page';

const routes: Routes = [
  {
    path: '',
    component: AppnotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppnotificationPageRoutingModule {}
