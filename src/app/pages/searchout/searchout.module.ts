import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchoutPageRoutingModule } from './searchout-routing.module';

import { SearchoutPage } from './searchout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchoutPageRoutingModule
  ],
  declarations: [SearchoutPage]
})
export class SearchoutPageModule {}
