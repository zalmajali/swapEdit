import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsaddimagePageRoutingModule } from './productsaddimage-routing.module';

import { ProductsaddimagePage } from './productsaddimage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsaddimagePageRoutingModule
  ],
  declarations: [ProductsaddimagePage]
})
export class ProductsaddimagePageModule {}
