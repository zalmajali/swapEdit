import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeoutPageRoutingModule } from './homeout-routing.module';

import { HomeoutPage } from './homeout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeoutPageRoutingModule
  ],
  declarations: [HomeoutPage]
})
export class HomeoutPageModule {}
