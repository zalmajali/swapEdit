import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsaddsuccessPage } from './productsaddsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsaddsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsaddsuccessPageRoutingModule {}
