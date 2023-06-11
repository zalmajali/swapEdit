import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardlocationsPageRoutingModule } from './cardlocations-routing.module';

import { CardlocationsPage } from './cardlocations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardlocationsPageRoutingModule
  ],
  declarations: [CardlocationsPage]
})
export class CardlocationsPageModule {}
