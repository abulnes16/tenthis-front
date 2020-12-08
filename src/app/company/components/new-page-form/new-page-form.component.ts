import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MediaService } from '../../../core/services/company/media.service';
import { RenderPageService } from 'src/app/core/services/shared/render-page.service';
import Block from '../../../models/block';
import Media from 'src/app/models/media';
import APIResponse from 'src/app/models/response';
import Template from 'src/app/models/template';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.scss']
})
export class NewPageFormComponent implements OnInit, OnChanges {

  @Input() editBlock: Block;

  // tslint:disable-next-line: variable-name
  private _currentForm = 'nbt';
  media: Media[];
  template: Template;
  columns: Array<number>;

  @Output() block = new EventEmitter<Block>();
  @Output() updateBlock = new EventEmitter<any>();
  @Output() pageData = new EventEmitter<any>();

  pageForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isMain: new FormControl(false),
    isVisible: new FormControl(true),
    html: new FormControl(''),
    css: new FormControl(''),
    wyswyg: new FormControl(''),
    columns: new FormControl(12, [Validators.min(1), Validators.max(12)]),
    bgBlock: new FormControl(''),
  });

  constructor(
    private mediaService: MediaService,
    private location: Location,
    private render: RenderPageService,

  ) {
    this.columns = Array(12).fill(0).map((x, i) => (i + 1));
  }

  ngOnInit(): void {
    this.mediaService.getMediaFiles().subscribe((res: APIResponse) => {
      this.media = res.data.filter(media => media.type.startsWith('image'));
    });
  }

  ngOnChanges(): void {
    if (this.editBlock) {
      this.setFormData();
    }
  }

  get currentForm(): string {
    return this._currentForm;
  }

  set currentForm(value: string) {
    this._currentForm = value;
  }

  get title(): AbstractControl {
    return this.pageForm.get('title');
  }

  get description(): AbstractControl {
    return this.pageForm.get('description');
  }

  get wyswyg(): AbstractControl {
    return this.pageForm.get('wyswyg');
  }

  get html(): AbstractControl {
    return this.pageForm.get('html');
  }

  get bgBlock(): AbstractControl {
    return this.pageForm.get('bgBlock');
  }

  get blockColumns(): AbstractControl {
    return this.pageForm.get('columns');
  }

  get css(): AbstractControl {
    return this.pageForm.get('css');
  }

  private getBlock(): Block {
    let blockHTML = null;
    if (this.currentForm === 'nbt' || this.currentForm === 'bt') {
      blockHTML = this.pageForm.get('wyswyg').value;
    } else {
      blockHTML = this.pageForm.get('html').value;
    }

    const columns = this.pageForm.get('columns').value;
    const background = this.pageForm.get('bgBlock').value;

    const block: Block = {
      html: blockHTML,
      columns: columns !== '' ? columns : '',
      background,
    };

    return block;
  }

  saveBlock(): void {
    const newBlock = this.getBlock();
    this.block.emit(newBlock);

    // Clean data
    this.pageForm.get('wyswyg').setValue('');
    this.pageForm.get('html').setValue('');
    this.pageForm.get('columns').setValue(12);
    this.pageForm.get('bgBlock').setValue('');
  }

  changeBlock(): void {
    const updateBlock = this.getBlock();
    this.updateBlock.emit(updateBlock);
  }

  setFormData(): void {
    this.html.setValue(this.editBlock.html);
    this.wyswyg.setValue(this.editBlock.html);
    this.bgBlock.setValue(this.editBlock.background);
    this.blockColumns.setValue(this.editBlock.columns);
  }

  cleanForm(): void {
    this.pageForm.reset();
    this.blockColumns.setValue(12);
    this.pageForm.get('isVisible').setValue(true);
  }

  savePage(): void {
    if (this.pageForm.valid) {
      const title = this.title.value;
      const description = this.description.value;
      const { isMain, isVisible } = this.pageForm.value;
      const data = {
        title,
        description,
        isMain,
        isVisible
      };
      this.pageData.emit(data);
    } else {
      Swal.fire(
        'Datos invalidos',
        'Debe ingresar un título, una descripción y al menos un bloque para guardar la página',
        'error'
      );
    }
  }

  setEditorTitle(): string {
    if (this._currentForm === 'nbt' && !this.editBlock) {
      return 'Nuevo bloque';
    } else if (this.editBlock) {
      return 'Edición de bloque';
    } else if (this.currentForm === 'ct') {
      return 'Bloques';
    }
  }

  discard(): void {
    Swal.fire({
      title: '¿Esta seguro de descartar los cambios?',
      text: `Esto borrará todos los datos de la página`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, descartar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((data) => {
      if (data.isConfirmed) {
        this.location.back();
      }
    });
  }

  addStyles(): void {
    const styles = this.css.value;
    this.render.setStyles(styles);
  }

}
