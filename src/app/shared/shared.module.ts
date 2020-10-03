import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

// Module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './components/welcome/welcome.component';


@NgModule({
  declarations: [NavComponent, SidebarComponent, WelcomeComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbDropdownModule,
    RouterModule,
  ],
  exports: [
    NavComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
