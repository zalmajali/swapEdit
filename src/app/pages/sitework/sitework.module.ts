import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiteworkPageRoutingModule } from './sitework-routing.module';

import { SiteworkPage } from './sitework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiteworkPageRoutingModule
  ],
  declarations: [SiteworkPage]
})
export class SiteworkPageModule {}
