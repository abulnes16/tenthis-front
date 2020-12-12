import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CartComponent } from './shared/components/cart/cart.component';
import { CompanyPageComponent } from './shared/components/company-page/company-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'admin-companies',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'companies/:companyId/cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'client' }
  },
  {
    path: 'companies/:companyId/pages/:pageId',
    component: CompanyPageComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'client' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
