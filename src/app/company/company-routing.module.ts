import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../shared/components/welcome/welcome.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CompanyLayoutComponent } from './components/company-layout/company-layout.component';
import { CompanyPagesComponent } from './components/company-pages/company-pages.component';
import { ConfigComponent } from './components/config/config.component';
import { MediaComponent } from './components/media/media.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: WelcomeComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'pages',
        component: CompanyPagesComponent,
      },
      {
        path: 'media',
        component: MediaComponent,
      },
      {
        path: 'configuration',
        component: ConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
