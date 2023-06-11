import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AwaitingapprovalPageRoutingModule } from './awaitingapproval-routing.module';

import { AwaitingapprovalPage } from './awaitingapproval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AwaitingapprovalPageRoutingModule
  ],
  declarations: [AwaitingapprovalPage]
})
export class AwaitingapprovalPageModule {}
