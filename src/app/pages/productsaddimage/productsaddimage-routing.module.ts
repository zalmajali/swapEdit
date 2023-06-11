import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsaddimagePage } from './productsaddimage.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsaddimagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsaddimagePageRoutingModule {}
