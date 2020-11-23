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
import { FilterPipe } from './pipes/filter.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { CompanyPageComponent } from './components/company-page/company-page.component';


@NgModule({
  declarations: [NavComponent, SidebarComponent, WelcomeComponent, ListComponent, FilterPipe, TrimPipe, CompanyPageComponent],
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
    FontAwesomeModule,
    CompanyPageComponent,
    // Pipes
    FilterPipe,
    TrimPipe,
  ]
})
export class SharedModule { }
