import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import Block from 'src/app/models/block';
import Media from 'src/app/models/media';
import Page from 'src/app/models/page';
import APIResponse from 'src/app/models/response';
import Swal from 'sweetalert2';
import { MediaService } from '../../../core/services/company/media.service';
import { RenderPageService } from '../../../core/services/shared/render-page.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/core/services/company/category.service';
import Category from 'src/app/models/category';

@Component({
  selector: 'app-manage-page-form',
  templateUrl: './manage-page-form.component.html',
  styleUrls: ['./manage-page-form.component.scss']
})
export class ManagePageFormComponent implements OnInit, OnChanges {

  // tslint:disable-next-line: variable-name
  private _currentForm = 'nbt';
  columns: Array<number>;
  media: Media[];
  files: Media[];

  currentShortcout: string;
  shortcoutValue: any;
  modalRef: NgbModalRef;
  categories: Category[];
  shortTypes: Array<any>;

  @Input() editBlock: Block;
  @Input() page: Page;
  @Output() block = new EventEmitter<Block>();
  @Output() pageData = new EventEmitter<any>();
  @Output() updateBlock = new EventEmitter<Block>();

  @ViewChild('shortcoutModal') shortcoutModal;

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
    private render: RenderPageService,
    private location: Location,
    private modalService: NgbModal,
    private categoryService: CategoryService,
  ) {
    this.columns = Array(12).fill(0).map((x, i) => (i + 1));
    this.shortTypes = RenderPageService.shortcoutTypes;
  }

  ngOnInit(): void {
    this.mediaService.getMediaFiles().subscribe((res: APIResponse) => {
      this.media = res.data.filter(file => file.type.startsWith('image'));
      this.files = res.data.filter(file => !file.type.startsWith('image'));
    });

    this.categoryService.getCategories().subscribe((res: APIResponse) => {
      this.categories = res.data;
    });
  }

  ngOnChanges(): void {
    if (this.editBlock) {
      this.setBlockFormData();
    }

    if (this.page) {
      this.title.setValue(this.page.title);
      this.description.setValue(this.page.description);
      this.css.setValue(this.page.css);
      this.isMain.setValue(this.page.isMain);
      this.isVisible.setValue(this.page.isVisible);
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

  get isMain(): AbstractControl {
    return this.pageForm.get('isMain');
  }
  get isVisible(): AbstractControl {
    return this.pageForm.get('isVisible');
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

  setBlockFormData(): void {
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
      const css = this.css.value;
      const data = {
        title,
        description,
        isMain,
        isVisible,
        css
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


  showShortcoutsModal(): void {
    this.modalRef = this.modalService.open(this.shortcoutModal, { size: 'lg' });
  }

  addShortcout(): void {
    const shortcout = { type: this.currentShortcout, value: this.shortcoutValue };
    let currentHTML;
    if (this._currentForm === 'nbt') {
      currentHTML = this.wyswyg.value;
      this.wyswyg.setValue(`${currentHTML} ${JSON.stringify(shortcout)}`);
    } else {
      currentHTML = this.html.value;
      this.html.setValue(`${currentHTML} ${JSON.stringify(shortcout)}`);
    }
    this.modalRef.close();
  }

  clearValue(): void {
    this.shortcoutValue = '';
  }

}
