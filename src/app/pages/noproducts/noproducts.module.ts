import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoproductsPageRoutingModule } from './noproducts-routing.module';

import { NoproductsPage } from './noproducts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoproductsPageRoutingModule
  ],
  declarations: [NoproductsPage]
})
export class NoproductsPageModule {}
