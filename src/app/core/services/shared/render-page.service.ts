import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import ShortTypes, { loginHTML } from '../../../constants/shortcouts';
import { shortcoutRegex as shortRegex } from '../../../constants/regex';
import { ProductService } from '../company/product.service';
import { MediaService } from '../company/media.service';
import Product from 'src/app/models/product';
import Media from 'src/app/models/media';

import decoded from 'jwt-decode';

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

  setScript(js: string): void {
    const body = document.getElementsByTagName('body')[0];
    let script = document.querySelector('#page-script');

    if (script) {
      const newScript = `${script.innerHTML} ${js}`;
      script.innerHTML = newScript;
    } else {
      script = document.createElement('script');
      script.appendChild(document.createTextNode(js));
      script.id = 'page-script';
      body.appendChild(script);
    }
  }

  removeScript(): void {
    const script = document.querySelector('#page-script');
    script.remove();
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
  getRole(): string {
    const decodedToken = decoded(sessionStorage.getItem('token'));
    return decodedToken.role;
  }

  getStoreId(role: string): string {
    let storeId = null;
    if (role === 'client') {
      storeId = sessionStorage.getItem('currentStore');
    }
    return storeId;
  }

  async parseShortcout(html: string, stringShortcout: string): Promise<string> {

    const jsonShortcout = JSON.parse(stringShortcout);
    const role = this.getRole();
    const storeId = this.getStoreId(role);
    let transformHTML = '';
    switch (jsonShortcout.type) {
      case 'login':
        transformHTML = loginHTML;
        break;
      case 'productGallery':
        transformHTML = `
            <div class="row">
              ${await this.createProductCatalog(jsonShortcout, storeId)}
            </div>`;
        break;
      case 'imageGallery':
        transformHTML = `
            <div class="row">
              <div class="col-lg-12"><h3>Nuestra galeria</h3></div>
              ${await this.createGallery(jsonShortcout, storeId)}
            </div>`;
        break;
      case 'file':
      case 'image':
        transformHTML = await this.createFileResource(jsonShortcout, storeId);
        break;

    }

    return html.replace(stringShortcout, transformHTML);
  }

  async createProductCatalog(productShortcout: any, storeId: string): Promise<string> {
    const products = sessionStorage.getItem('products-store');
    let productCatalog = '';
    let category = null;
    if (!products) {
      if (productShortcout.value !== '') {
        sessionStorage.setItem('category-current', productShortcout.value);
        category = productShortcout.value;
      }

      const result = await this.productService.getProducts(category, storeId).toPromise();
      sessionStorage.setItem('products-store', JSON.stringify({ products: result.data }));
      productCatalog = this.makeCatalog(result.data);
    } else {
      if (productShortcout.value !== '') {
        const currentCategory = sessionStorage.getItem('category-current');
        if (currentCategory !== productShortcout.value) {
          sessionStorage.setItem('category-current', productShortcout.value);
          const newProducts = await this.productService.getProducts(productShortcout.value, storeId).toPromise();
          productCatalog = this.makeCatalog(newProducts.data);
        }
        category = productShortcout.value;
      } else {
        productCatalog = this.makeCatalog(JSON.parse(products).products);
      }
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
                <button onclick="addToCart('${product._id}')" class="btn btn-primary">Agregar al carrito</button>
          </div>
        </div>
      </div>
      `;
    });

    return html;
  }

  async createGallery(mediaShortcout: any, storeId: string): Promise<string> {
    const media = sessionStorage.getItem('media-store');
    let gallery = '';
    if (!media) {
      const result = await this.mediaService.getMediaFiles(mediaShortcout.value, storeId).toPromise();
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

  async createFileResource(fileShortcout: any, storeId: string): Promise<string> {
    const fileId = fileShortcout.value;
    const result = await this.mediaService.getMediaFile(fileId, storeId).toPromise();
    const file = result.data;
    switch (fileShortcout.type) {
      case 'file':
        return `<a href="${file.path}" download>Descargar ${file.name}</a>`;
      case 'image':
        return `<img class="img-fluid" src="${file.path}" alt="${file.name}"/>`;
    }

  }



}
