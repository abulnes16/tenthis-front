import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import ShortTypes, { loginHTML } from '../../../constants/shortcouts';
import { shortcoutRegex as shortRegex } from '../../../constants/regex';
import { ProductService } from '../company/product.service';
import { MediaService } from '../company/media.service';
import APIResponse from 'src/app/models/response';
import Product from 'src/app/models/product';
import Media from 'src/app/models/media';
@Injectable({
  providedIn: 'root'
})
export class RenderPageService {

  static shortcoutTypes: Array<any>;
  static shortcoutRegex: RegExp;

  constructor(
    private sanitize: DomSanitizer,
    private productService: ProductService,
    private mediaService: MediaService,
  ) {
    RenderPageService.shortcoutTypes = ShortTypes;
    RenderPageService.shortcoutRegex = new RegExp(shortRegex);
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

  async transformHTMLShortcouts(html: string): Promise<string | SafeHtml> {

    if (RenderPageService.shortcoutRegex.test(html)) {
      const match = RenderPageService.shortcoutRegex.exec(html);
      const transformedHTML = await this.parseShortcout(html, match[0]);
      return this.sanitizeHTML(transformedHTML);
    } else {
      return html;
    }
  }

  async parseShortcout(html: string, stringShortcout: string): Promise<string> {

    const jsonShortcout = JSON.parse(stringShortcout);
    let transformHTML = '';
    switch (jsonShortcout.type) {
      case 'login':
        transformHTML = loginHTML;
        break;
      case 'productGallery':
        transformHTML = `
            <div class="row">
              ${await this.createProductCatalog(jsonShortcout)}
            </div>`;
        break;
      case 'imageGallery':
        transformHTML = `
            <div class="row">
              <div class="col-lg-12"><h3>Nuestra galeria</h3></div>
              ${await this.createGallery(jsonShortcout)}
            </div>`;
        break;
      case 'file':
      case 'image':
        transformHTML = await this.createFileResource(jsonShortcout);
        break;

    }

    return html.replace(stringShortcout, transformHTML);
  }

  async createProductCatalog(productShortcout: any): Promise<string> {
    const products = sessionStorage.getItem('products-store');
    let productCatalog = '';
    if (!products) {
      let category = null;
      if (productShortcout.value !== '') {
        sessionStorage.setItem('category-current', productShortcout.value);
        category = productShortcout.value;
      }
      const result = await this.productService.getProducts(category).toPromise();
      sessionStorage.setItem('products-store', JSON.stringify({ products: result.data }));
      productCatalog = this.makeCatalog(result.data);
    } else {
      productCatalog = this.makeCatalog(JSON.parse(products).products);
    }

    return productCatalog;
  }

  makeCatalog(products: Product[]): string {
    let html = ``;
    products.forEach((product) => {
      html += `
      <div class="col-lg-4">
        <div class="card text-center" style="width: 18rem;">
        <img src="${product.media[0].path}" class="card-img-top img-fluid"
          alt="${product.description.slice(0, 10)}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
                <p class="card-text"><strong>Precio:</strong>L. ${product.price} </p>
                <button  class="btn btn-primary">Agregar al carrito</button>
          </div>
        </div>
      </div>
      `;
    });

    return html;
  }

  async createGallery(mediaShortcout: any): Promise<string> {
    const media = sessionStorage.getItem('media-store');
    let gallery = '';
    if (!media) {
      const result = await this.mediaService.getMediaFiles(mediaShortcout.value).toPromise();
      sessionStorage.setItem('media-store', JSON.stringify({ media: result.data }));
      gallery = this.makeGallery(result.data);
    } else {
      gallery = this.makeGallery(JSON.parse(media).media);
    }

    return gallery;
  }

  makeGallery(media: Media[]): string {
    let html = ``;
    media.forEach((image) => {
      html += `
      <div class="col-lg-4">
        <div class="card text-center" style="width: 18rem;">
        <img src="${image.path}" class="card-img-top img-fluid"
          alt="${image.name}">
        </div>
      </div>
      `;
    }
    );
    return html;
  }

  async createFileResource(fileShortcout: any): Promise<string> {
    const fileId = fileShortcout.value;
    const result = await this.mediaService.getMediaFile(fileId).toPromise();
    const file = result.data;
    switch (fileShortcout.type) {
      case 'file':
        return `<a href="${file.path}" download>Descargar ${file.name}</a>`;
      case 'image':
        return `<img class="img-fluid" src="${file.path}" alt="${file.name}"/>`;
    }

  }



}
