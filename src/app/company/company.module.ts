import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyLayoutComponent } from './components/company-layout/company-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CompanyPagesComponent } from './components/company-pages/company-pages.component';
import { MediaComponent } from './components/media/media.component';
import { ConfigComponent } from './components/config/config.component';
import { ManagePageComponent } from './components/manage-page/manage-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { NewPageComponent } from './components/new-page/new-page.component';
import { NewPageFormComponent } from './components/new-page-form/new-page-form.component';
import { ManagePageFormComponent } from './components/manage-page-form/manage-page-form.component';
import { PagePreviewComponent } from './components/page-preview/page-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CompanyLayoutComponent,
    ProductsComponent,
    CategoriesComponent,
    OrdersComponent,
    CompanyPagesComponent,
    MediaComponent,
    ConfigComponent,
    ManagePageComponent,
    ProductFormComponent,
    CategoryFormComponent,
    NewPageComponent,
    NewPageFormComponent,
    ManagePageFormComponent,
    PagePreviewComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class CompanyModule { }
