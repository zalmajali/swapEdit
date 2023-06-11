import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplaintssuccessfullyPageRoutingModule } from './complaintssuccessfully-routing.module';

import { ComplaintssuccessfullyPage } from './complaintssuccessfully.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplaintssuccessfullyPageRoutingModule
  ],
  declarations: [ComplaintssuccessfullyPage]
})
export class ComplaintssuccessfullyPageModule {}
