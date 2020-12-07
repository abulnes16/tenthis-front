import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import Page from 'src/app/models/page';
import APIResponse from 'src/app/models/response';
import Template from 'src/app/models/template';
import { TemplateService } from '../../../core/services/admin/template.service';
import { StoreService } from '../../../core/services/shared/store.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss']
})
export class PagePreviewComponent implements OnInit {
  @Input() page: Page;
  template: Template;
  styles: SafeHtml;
  constructor(
    private templateService: TemplateService,
    private storeService: StoreService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    const { configuration: { useTemplate, template } } = this.storeService.store;
    if (useTemplate) {
      this.templateService.getTemplateById(template).subscribe((res: APIResponse) => {
        this.template = res.data;
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(this.template.css));
        head.appendChild(style);
      });
    }

  }

  getStyles(css: string): any {
    const sanitizeCSS = css.replace('\n', '');
    console.log(sanitizeCSS);
    return css.replace('\n', '');
  }

  getHTML(html: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.URL, html);
  }

}
