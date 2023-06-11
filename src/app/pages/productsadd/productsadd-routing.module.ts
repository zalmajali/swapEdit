import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsaddPage } from './productsadd.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsaddPageRoutingModule {}
