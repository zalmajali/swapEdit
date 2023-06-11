import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesoutPageRoutingModule } from './servicesout-routing.module';

import { ServicesoutPage } from './servicesout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesoutPageRoutingModule
  ],
  declarations: [ServicesoutPage]
})
export class ServicesoutPageModule {}
