import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetcatproorserPageRoutingModule } from './getcatproorser-routing.module';

import { GetcatproorserPage } from './getcatproorser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetcatproorserPageRoutingModule
  ],
  declarations: [GetcatproorserPage]
})
export class GetcatproorserPageModule {}
