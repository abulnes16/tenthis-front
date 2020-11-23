import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { SharedModule } from '../shared/shared.module';
import { StoreListComponent } from './components/store-list/store-list.component';
import { ClientOrdersComponent } from './components/client-orders/client-orders.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientLayoutComponent, StoreListComponent, ClientOrdersComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ClientModule { }
