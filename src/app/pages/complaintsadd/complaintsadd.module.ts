import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplaintsaddPageRoutingModule } from './complaintsadd-routing.module';

import { ComplaintsaddPage } from './complaintsadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplaintsaddPageRoutingModule
  ],
  declarations: [ComplaintsaddPage]
})
export class ComplaintsaddPageModule {}
