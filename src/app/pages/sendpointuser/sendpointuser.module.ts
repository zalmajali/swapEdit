import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendpointuserPageRoutingModule } from './sendpointuser-routing.module';

import { SendpointuserPage } from './sendpointuser.page';
import {AlertdatauserComponent} from "../alertdatauser/alertdatauser.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendpointuserPageRoutingModule
  ],
  declarations: [SendpointuserPage,AlertdatauserComponent],
  entryComponents:[AlertdatauserComponent]
})
export class SendpointuserPageModule {}
