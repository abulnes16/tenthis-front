import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientGuard } from '../core/guards/client.guard';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { ClientOrdersComponent } from './components/client-orders/client-orders.component';
import { StoreListComponent } from './components/store-list/store-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full'
      },
      {
        path: 'explore',
        component: StoreListComponent,
      },
      {
        path: 'orders',
        component: ClientOrdersComponent
      }
    ],
    canActivate: [ClientGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
