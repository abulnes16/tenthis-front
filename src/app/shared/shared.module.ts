import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [NavComponent, SidebarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbDropdownModule,
  ],
  exports: [
    NavComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
