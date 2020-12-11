import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/core/services/admin/template.service';
import { PageService } from 'src/app/core/services/shared/page.service';
import { RenderPageService } from 'src/app/core/services/shared/render-page.service';
import { StoreService } from 'src/app/core/services/shared/store.service';
import Page from 'src/app/models/page';
import APIResponse from 'src/app/models/response';
import Store from 'src/app/models/store';
import Template from 'src/app/models/template';
@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit, OnDestroy {
  store: Store;
  template: Template;
  pages: Page[];
  currentPage: Page;
  loading = true;
  storeHeader: SafeHtml;
  storeFooter: SafeHtml;

  constructor(
    private router: ActivatedRoute,
    private storeService: StoreService,
    private pageService: PageService,
    private templateService: TemplateService,
    private render: RenderPageService,
  ) { }

  ngOnInit(): void {
    const companyId = this.router.snapshot.params.companyId;
    sessionStorage.setItem('currentStore', companyId);
    this.loadData(companyId);
  }

  changeCurrentPage(): void {
    this.router.params.subscribe((params) => {
      this.currentPage = this.pages.find(p => p._id === params.pageId);
    });
  }

  loadData(companyId: string): void {

    this.storeService.getStore(companyId).subscribe((store: any) => {
      this.store = store;
      const { configuration: { useTemplate, template, header, footer, css } } = this.store;

      if (useTemplate) {
        this.templateService.getTemplateById(template).subscribe((res: APIResponse) => {
          this.template = res.data;
          this.render.setStyles(this.template.css);
        });
      }

      if (header) {
        this.storeHeader = this.render.sanitizeHTML(header);

      }

      if (footer) {
        this.storeFooter = this.render.sanitizeHTML(footer);

      }

      if (css) {
        this.render.setStyles(css);
      }

      this.pageService.getPages(companyId).subscribe((res: APIResponse) => {
        this.pages = res.data;
        const pageId = this.router.snapshot.params.pageId;
        if (pageId === 'home') {
          this.currentPage = this.pages.find(p => p.isMain);
        } else {
          this.currentPage = this.pages.find(p => p._id === pageId);
        }
        if (this.currentPage.css) {
          this.render.setStyles(this.currentPage.css);
        }
        this.loading = false;
      });

    });
  }

  ngOnDestroy(): void {
    this.render.removeStyles();
  }

  addToCart(productId: string): void {
    let cart: any = localStorage.getItem('cart');
    if (!cart) {
      cart = [productId];
    } else {
      cart = [...JSON.parse(cart).cart, productId];
    }
    localStorage.setItem('cart', JSON.stringify({ cart }));
  }

}
