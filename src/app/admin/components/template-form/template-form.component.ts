import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import APIResponse from 'src/app/models/response';
import Swal from 'sweetalert2';

import Template from '../../../models/template';
import { TemplateService } from '../../../core/services/admin/template.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  @Input() icon: Icon;
  @Input() editMode: boolean;
  @Output() createdTemplate = new EventEmitter<Template>();

  templateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    html: new FormControl('', [Validators.required]),
    css: new FormControl('', [Validators.required]),
    js: new FormControl(''),
    media: new FormControl([]),
  });

  gallery: any = [];



  get name(): AbstractControl {
    return this.templateForm.get('name');
  }
  get description(): AbstractControl {
    return this.templateForm.get('description');
  }

  get html(): AbstractControl {
    return this.templateForm.get('html');
  }

  get css(): AbstractControl {
    return this.templateForm.get('css');
  }
  get js(): AbstractControl {
    return this.templateForm.get('js');
  }

  get media(): AbstractControl {
    return this.templateForm.get('media');
  }


  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
  }

  createTemplate(): void {
    if (this.templateForm.valid) {
      this.templateService.createTemplate(this.templateForm.value)
        .subscribe((res: APIResponse) => {
          if (res.status === 201) {
            Swal.fire('Plantilla creada', 'La plantilla se creó con exito', 'success');
            this.templateForm.reset();
            this.createdTemplate.emit(res.data);
          } else {
            Swal.fire('Registro fallido', 'Ocurrió un error al crear la plantilla', 'error');
          }
        }, (error) => {
          console.log(error);
          Swal.fire('Registro fallido', 'Ocurrió un error al crear la plantilla', 'error');
        });
    }
  }


  addToGallery(event): void {
    if (event.target.files) {
      const files = event.target.files;
      if (files.length === 0) { return; }
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        Swal.fire('Formato incorrecto', 'Solo se pueden agregar imágenes', 'error');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      this.media.setValue([...this.media.value, files[0]]);
      reader.onload = () => {
        this.gallery = [...this.gallery, reader.result];
      };

    } else {
      Swal.fire(
        'Archivo vacío',
        'Debe cargar un archivo para poder añadirlo a la galeria',
        'error'
      );
    }
  }
}
