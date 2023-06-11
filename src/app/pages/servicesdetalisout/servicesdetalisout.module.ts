import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesdetalisoutPageRoutingModule } from './servicesdetalisout-routing.module';

import { ServicesdetalisoutPage } from './servicesdetalisout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesdetalisoutPageRoutingModule
  ],
  declarations: [ServicesdetalisoutPage]
})
export class ServicesdetalisoutPageModule {}
