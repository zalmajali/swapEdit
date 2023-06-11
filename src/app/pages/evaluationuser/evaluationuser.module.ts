import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluationuserPageRoutingModule } from './evaluationuser-routing.module';

import { EvaluationuserPage } from './evaluationuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluationuserPageRoutingModule
  ],
  declarations: [EvaluationuserPage]
})
export class EvaluationuserPageModule {}
