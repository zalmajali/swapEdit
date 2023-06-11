import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsaddPageRoutingModule } from './productsadd-routing.module';

import { ProductsaddPage } from './productsadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsaddPageRoutingModule
  ],
  declarations: [ProductsaddPage]
})
export class ProductsaddPageModule {}
