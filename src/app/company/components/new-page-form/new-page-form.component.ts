import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MediaService } from '../../../core/services/company/media.service';
import Block from '../../../models/block';
import Media from 'src/app/models/media';
import APIResponse from 'src/app/models/response';
import Template from 'src/app/models/template';

@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.scss']
})
export class NewPageFormComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  private _currentForm = 'nbt';
  media: Media[];
  template: Template;
  columns: Array<number>;

  @Output() block = new EventEmitter<Block>();

  pageForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isMain: new FormControl(''),
    isVisible: new FormControl(true),
    html: new FormControl(''),
    css: new FormControl(''),
    wyswyg: new FormControl(''),
    columns: new FormControl(12, [Validators.min(1), Validators.max(12)]),
    bgBlock: new FormControl(''),
  });

  constructor(
    private mediaService: MediaService,

  ) {
    this.columns = Array(12).fill(0).map((x, i) => (i + 1));
  }

  ngOnInit(): void {
    this.mediaService.getMediaFiles().subscribe((res: APIResponse) => {
      this.media = res.data.filter(media => media.type.startsWith('image'));
    });
  }

  get currentForm(): string {
    return this._currentForm;
  }

  set currentForm(value: string) {
    this._currentForm = value;
  }

  saveBlock(): void {
    let blockHTML = null;
    if (this.currentForm === 'nbt' || this.currentForm === 'bt') {
      blockHTML = this.pageForm.get('wyswyg').value;
    } else {
      blockHTML = this.pageForm.get('html').value;
    }

    const columns = this.pageForm.get('columns').value;
    const background = this.pageForm.get('bgBlock').value;

    const newBlock: Block = {
      html: blockHTML,
      columns,
      background,
    };

    console.log(newBlock);

    this.block.emit(newBlock);
  }

}
