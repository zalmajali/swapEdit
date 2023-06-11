import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsaddsuccessPageRoutingModule } from './productsaddsuccess-routing.module';

import { ProductsaddsuccessPage } from './productsaddsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsaddsuccessPageRoutingModule
  ],
  declarations: [ProductsaddsuccessPage]
})
export class ProductsaddsuccessPageModule {}
