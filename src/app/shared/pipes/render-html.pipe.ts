import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { RenderPageService } from 'src/app/core/services/shared/render-page.service';

@Pipe({
  name: 'renderHtml'
})
export class RenderHtmlPipe implements PipeTransform {

  constructor(private render: RenderPageService) {

  }

  async transform(html: string): Promise<string | SafeHtml> {
    return await this.render.transformHTMLShortcouts(html);
  }

}
