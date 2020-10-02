import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyLayoutComponent } from './components/company-layout/company-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
