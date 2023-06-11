import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendinvitationPageRoutingModule } from './sendinvitation-routing.module';

import { SendinvitationPage } from './sendinvitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendinvitationPageRoutingModule
  ],
  declarations: [SendinvitationPage]
})
export class SendinvitationPageModule {}
