import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesdetalisPageRoutingModule } from './servicesdetalis-routing.module';

import { ServicesdetalisPage } from './servicesdetalis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesdetalisPageRoutingModule
  ],
  declarations: [ServicesdetalisPage]
})
export class ServicesdetalisPageModule {}
