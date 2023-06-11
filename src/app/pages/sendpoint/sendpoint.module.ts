import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendpointPageRoutingModule } from './sendpoint-routing.module';

import { SendpointPage } from './sendpoint.page';
import {AlertdataComponent} from "../alertdata/alertdata.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendpointPageRoutingModule
  ],
  declarations: [SendpointPage,AlertdataComponent],
  entryComponents:[AlertdataComponent]
})
export class SendpointPageModule {}
