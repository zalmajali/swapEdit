import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetsubcatproorserPageRoutingModule } from './getsubcatproorser-routing.module';

import { GetsubcatproorserPage } from './getsubcatproorser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetsubcatproorserPageRoutingModule
  ],
  declarations: [GetsubcatproorserPage]
})
export class GetsubcatproorserPageModule {}
