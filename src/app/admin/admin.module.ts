import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersComponent } from './components/users/users.component';

import { TemplatesComponent } from './components/templates/templates.component';
import { AdminPlansComponent } from './components/admin-plans/admin-plans.component';
import { AdminStoresComponent } from './components/admin-stores/admin-stores.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PlanFormComponent } from './components/plan-form/plan-form.component';



@NgModule({
  declarations: [AdminLayoutComponent, UsersComponent, TemplatesComponent, AdminPlansComponent, AdminStoresComponent, UserFormComponent, PlanFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ]
})
export class AdminModule { }
