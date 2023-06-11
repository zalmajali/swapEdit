import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangelangoutPageRoutingModule } from './changelangout-routing.module';

import { ChangelangoutPage } from './changelangout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangelangoutPageRoutingModule
  ],
  declarations: [ChangelangoutPage]
})
export class ChangelangoutPageModule {}
