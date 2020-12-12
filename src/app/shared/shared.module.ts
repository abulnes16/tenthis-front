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
import { MediaNamePipe } from './pipes/media-name.pipe';
import { MediaIconPipe } from './pipes/media-icon.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RenderHtmlPipe } from './pipes/render-html.pipe';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    NavComponent,
    SidebarComponent,
    WelcomeComponent,
    ListComponent,
    FilterPipe,
    TrimPipe,
    CompanyPageComponent,
    MediaNamePipe,
    MediaIconPipe,
    SpinnerComponent,
    RenderHtmlPipe,
    CartComponent,
  ],
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
    SpinnerComponent,
    // Pipes
    FilterPipe,
    TrimPipe,
    MediaNamePipe,
    MediaIconPipe,
    RenderHtmlPipe,
  ]
})
export class SharedModule { }
