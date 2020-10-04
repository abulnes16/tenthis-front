import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

// Module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ListComponent } from './components/list/list.component';
import { AceEditorModule } from 'ng2-ace-editor';


@NgModule({
  declarations: [NavComponent, SidebarComponent, WelcomeComponent, ListComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbDropdownModule,
    RouterModule,
    AceEditorModule,
  ],
  exports: [
    NavComponent,
    SidebarComponent,
    ListComponent,
    WelcomeComponent,
    AceEditorModule,
  ]
})
export class SharedModule { }
