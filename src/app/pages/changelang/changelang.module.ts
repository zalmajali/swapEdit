import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangelangPageRoutingModule } from './changelang-routing.module';

import { ChangelangPage } from './changelang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangelangPageRoutingModule
  ],
  declarations: [ChangelangPage]
})
export class ChangelangPageModule {}
