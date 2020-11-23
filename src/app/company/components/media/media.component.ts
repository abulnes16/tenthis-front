import { Component, OnInit, ViewChild } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { MediaService } from '../../../core/services/company/media.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import APIResponse from 'src/app/models/response';
import Media from 'src/app/models/media';
import Swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  fileIcon = faFile;
  file: any;
  fileName: string;
  @ViewChild('fileModal') fileModal;
  progress = 0;
  modalReference: NgbModalRef;
  media: Media[];
  images: Media[];

  files = [
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
  ];
  constructor(
    private modalService: NgbModal,
    private mediaService: MediaService
  ) {
    this.file = null;
  }

  ngOnInit(): void {
    this.mediaService.getMediaFiles().subscribe((res: APIResponse) => {
      this.media = res.data;
      this.images = res.data;
    });
  }

  saveFile(event: any): void {
    if (event.target.files) {
      this.file = event.target.files[0];
    }
  }

  uploadFile(): void {
    if (this.file && this.fileName) {
      this.progress = 0;
      this.mediaService.uploadMedia(this.file, this.fileName).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          Swal.fire('Archivo subido', 'El archivo se subió con exito', 'success');
          this.mediaService.getMediaFiles().subscribe((res: APIResponse) => {
            this.images = res.data;
          });
          this.modalReference.close();
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Subida fallida', 'No se pudo subir el archivo', 'error');
        this.progress = 0;
        this.file = null;
        this.fileName = '';
      });
    } else {
      Swal.fire('Datos invalidos', 'Debe agregar un archivo y un nombre para subirlo', 'error');
    }
    this.file = null;
  }

  showFileModal(): void {
    this.modalReference = this.modalService.open(this.fileModal, { size: 'lg' });
  }

  closeModal(): void {
    this.file = null;
    this.modalReference.close();
  }
}
