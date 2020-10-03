import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../shared/components/welcome/welcome.component';
import { CompanyLayoutComponent } from './components/company-layout/company-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
