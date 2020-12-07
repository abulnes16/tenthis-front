import { Component, EventEmitter, Input, OnInit, Output, SecurityContext } from '@angular/core';
import Page from 'src/app/models/page';
import APIResponse from 'src/app/models/response';
import Template from 'src/app/models/template';
import { TemplateService } from '../../../core/services/admin/template.service';
import { StoreService } from '../../../core/services/shared/store.service';
import { RenderPageService } from '../../../core/services/shared/render-page.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Block from 'src/app/models/block';
@Component({
  selector: 'app-page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss']
})
export class PagePreviewComponent implements OnInit {
  @Input() page: Page;
  template: Template;
  styles: SafeHtml;

  @Output() editedBlock = new EventEmitter<number>();
  @Output() deletedBlock = new EventEmitter<number>();
  constructor(
    private templateService: TemplateService,
    private storeService: StoreService,
    private sanitizer: DomSanitizer,
    private render: RenderPageService,
  ) { }

  ngOnInit(): void {
    const { configuration: { useTemplate, template } } = this.storeService.store;
    if (useTemplate) {
      this.templateService.getTemplateById(template).subscribe((res: APIResponse) => {
        this.template = res.data;
        this.render.setStyles(this.template.css);
      });
    }

  }

  getHTML(html: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.URL, html);
  }

  setBackground(block: Block): string {
    if (!block.background) {
      return;
    }

    return `background-image: url(${block.background});`;
  }

  editBlock(index: number): void {
    this.editedBlock.emit(index);
  }

  deleteBlock(index: number): void {
    this.deletedBlock.emit(index);
  }

}
