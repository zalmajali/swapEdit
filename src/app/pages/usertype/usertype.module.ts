import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsertypePageRoutingModule } from './usertype-routing.module';

import { UsertypePage } from './usertype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsertypePageRoutingModule
  ],
  declarations: [UsertypePage]
})
export class UsertypePageModule {}
