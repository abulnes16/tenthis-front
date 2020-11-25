import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StoreService } from '../../../core/services/shared/store.service';
import decode from 'jwt-decode';
import APIResponse from 'src/app/models/response';
import Swal from 'sweetalert2';
import Store from 'src/app/models/store';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  configForm = new FormGroup({
    storeName: new FormControl('', [Validators.required]),
    keywords: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    favicon: new FormControl(''),
    header: new FormControl(''),
    footer: new FormControl(''),
    css: new FormControl(''),
    js: new FormControl(''),
    useTemplate: new FormControl('', [Validators.required]),
    template: new FormControl(''),
  });

  faviconImg: any;
  logoImg: any;
  store: Store;

  get storeName(): AbstractControl {
    return this.configForm.get('storeName');
  }

  get logo(): AbstractControl {
    return this.configForm.get('logo');
  }

  get favicon(): AbstractControl {
    return this.configForm.get('favicon');
  }

  get header(): AbstractControl {
    return this.configForm.get('header');
  }

  get footer(): AbstractControl {
    return this.configForm.get('footer');
  }

  constructor(
    private storeService: StoreService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const decodedToken = decode(sessionStorage.getItem('token'));
    this.storeService.getStore(decodedToken.store).subscribe((res: APIResponse) => {
      const { configuration, name, description } = res.data;
      const { logo, favicon } = configuration;
      if (logo !== '') {
        this.logoImg = logo.path;
      }

      if (favicon !== '') {
        this.faviconImg = favicon.path;
      }

      this.store = res.data;
      this.configForm.setValue({
        ...configuration,
        storeName: name,
        description,
      });
    });

  }

  transformHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  addImage(event: any, image: string): void {
    if (event.target.files) {
      const files = event.target.files;
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        Swal.fire('Formato incorrecto', 'Solo se pueden agregar imágenes', 'error');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);


      if (image === 'favicon') {
        reader.onload = () => {
          this.faviconImg = reader.result;
          this.favicon.setValue(files[0]);
        };
      } else {
        reader.onload = () => {
          this.logoImg = reader.result;
          this.logo.setValue(files[0]);
        };
      }
    }
  }

  async resetConfig(): Promise<void> {

    const confirm = await Swal.fire({
      title: '¿Esta seguro de descartar los cambios?',
      text: `Esta acción es irreversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, descartar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (confirm.isConfirmed) {
      const { configuration, name, description } = this.store;
      const { logo, favicon } = configuration;
      this.configForm.setValue({ ...configuration, storeName: name, description });
      this.logoImg = logo.path;
      this.faviconImg = favicon.path;
    }

  }




}
