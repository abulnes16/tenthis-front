import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerGuard } from '../core/guards/owner.guard';
import { WelcomeComponent } from '../shared/components/welcome/welcome.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CompanyLayoutComponent } from './components/company-layout/company-layout.component';
import { CompanyPagesComponent } from './components/company-pages/company-pages.component';
import { ConfigComponent } from './components/config/config.component';
import { ManagePageComponent } from './components/manage-page/manage-page.component';
import { MediaComponent } from './components/media/media.component';
import { NewPageComponent } from './components/new-page/new-page.component';
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
    ],
    canActivate: [OwnerGuard]
  },
  {
    path: 'pages/create',
    component: NewPageComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: ':company-id/pages/:page-id',
    component: ManagePageComponent,
    canActivate: [OwnerGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
