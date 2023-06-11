import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationuserPage } from './evaluationuser.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationuserPageRoutingModule {}
