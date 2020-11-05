import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { WelcomeComponent } from '../shared/components/welcome/welcome.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminPlansComponent } from './components/admin-plans/admin-plans.component';
import { AdminStoresComponent } from './components/admin-stores/admin-stores.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: WelcomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'stores',
        component: AdminStoresComponent
      },
      {
        path: 'plans',
        component: AdminPlansComponent
      },
      {
        path: 'templates',
        component: TemplatesComponent
      }
    ],
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
