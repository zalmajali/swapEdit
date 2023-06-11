import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppnotificationPageRoutingModule } from './appnotification-routing.module';

import { AppnotificationPage } from './appnotification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppnotificationPageRoutingModule
  ],
  declarations: [AppnotificationPage]
})
export class AppnotificationPageModule {}
