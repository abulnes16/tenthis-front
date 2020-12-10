import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import ShortTypes from '../../../constants/shortcouts';
@Injectable({
  providedIn: 'root'
})
export class RenderPageService {

  static shortcoutTypes: Array<any>;

  constructor(private sanitize: DomSanitizer) {
    RenderPageService.shortcoutTypes = ShortTypes;
  }



  setStyles(css: string): any {
    const head = document.getElementsByTagName('head')[0];
    let style = document.querySelector('#page-style');

    // Si existe el nodo page-style de la página entonces le añadimos los nuevos estilos a los actuales
    if (style) {
      const newStyles = `${style.innerHTML} ${css}`;
      style.innerHTML = newStyles;
    } else {

      // Si no creamos el nodo y lo añadimos al DOM
      style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      style.id = 'page-style';
      head.appendChild(style);
    }
  }

  removeStyles(): void {
    const style = document.querySelector('#page-style');
    style.remove();
  }

  sanitizeHTML(html: string): SafeHtml {
    return this.sanitize.bypassSecurityTrustHtml(html);
  }
}
