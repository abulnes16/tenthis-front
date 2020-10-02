import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ]
})
export class AdminModule { }
