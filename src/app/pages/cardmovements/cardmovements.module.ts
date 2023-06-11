import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardmovementsPageRoutingModule } from './cardmovements-routing.module';

import { CardmovementsPage } from './cardmovements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardmovementsPageRoutingModule
  ],
  declarations: [CardmovementsPage]
})
export class CardmovementsPageModule {}
