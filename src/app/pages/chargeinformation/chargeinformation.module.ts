import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargeinformationPageRoutingModule } from './chargeinformation-routing.module';

import { ChargeinformationPage } from './chargeinformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargeinformationPageRoutingModule
  ],
  declarations: [ChargeinformationPage]
})
export class ChargeinformationPageModule {}
