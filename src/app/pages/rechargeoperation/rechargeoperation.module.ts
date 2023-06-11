import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargeoperationPageRoutingModule } from './rechargeoperation-routing.module';

import { RechargeoperationPage } from './rechargeoperation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechargeoperationPageRoutingModule
  ],
  declarations: [RechargeoperationPage]
})
export class RechargeoperationPageModule {}
