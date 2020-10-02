import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyLayoutComponent } from './components/company-layout/company-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CompanyLayoutComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule { }
