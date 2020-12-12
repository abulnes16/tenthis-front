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

  @ViewChild('fileModal') fileModal;
  @ViewChild('fileDetailModal') fileDetailModal;
  currentFile: Media;
  loading = true;

  // Media tabs
  currentTab = 'todo';
  galleryMessage = 'No hay imagenes en tu galeria';
  // File upload form
  file: any;
  progress = 0;
  fileName: string;

  // File filter
  fileFilter: string;

  // Modals
  modalReference: NgbModalRef;
  modalDetailReference: NgbModalRef;

  // Files array
  media: Media[] = [];
  images: Media[] = [];
  files: Media[] = [];


  constructor(
    private modalService: NgbModal,
    private mediaService: MediaService
  ) {
    this.file = null;
  }

  ngOnInit(): void {
    this.mediaService.getMediaFiles().subscribe((res: APIResponse) => {
      this.media = res.data;
      this.filterFiles(this.media);
      this.loading = false;
    });
  }

  filterFiles(media: Media[]): void {
    this.images = media.filter((m: Media) => (
      m.type.startsWith('image') || m.type.startsWith('video')
    ));
    this.files = media.filter((m: Media) =>
      (!m.type.startsWith('image') && !m.type.startsWith('video'))
    );
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
            this.media = res.data;
            this.filterFiles(this.media);
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

  showDetails(id: string): void {
    this.currentFile = this.media.find((m: Media) => m._id === id);
    this.modalDetailReference = this.modalService.open(this.fileDetailModal, { size: 'lg' });
  }

  closeModal(): void {
    this.file = null;
    this.modalReference.close();
  }

  changeMediaTab(tab: string): void {
    this.currentTab = tab;

    switch (tab) {
      case 'video':
        this.images = this.media.filter((m: Media) => m.type.startsWith('video'));
        this.galleryMessage = this.galleryMessage.replace('imagenes', 'videos');
        break;
      case 'img':
        this.images = this.media.filter((m: Media) => m.type.startsWith('image'));
        this.galleryMessage = this.galleryMessage.replace('videos', 'imagenes');
        break;
      case 'doc':
        this.files = this.media.filter((m: Media) =>
          (!m.type.startsWith('audio') && !m.type.startsWith('image') && !m.type.startsWith('video')));
        break;
      case 'sound':
        this.files = this.media.filter((m: Media) => m.type.startsWith('audio'));
        break;
      default:
        this.filterFiles(this.media);
        break;
    }
  }

  async deleteMedia(): Promise<void> {
    const confirm = await Swal.fire({
      title: '¿Esta seguro de eliminar esta archivo?',
      text: `Esta acción es irreversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (confirm.isConfirmed) {
      this.mediaService.deleteMedia(this.currentFile._id).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Archivo eliminado', 'El archivo se eliminó con exito', 'success');
          this.media = this.media.filter((m: Media) => m._id !== this.currentFile._id);
          this.filterFiles(this.media);
          this.currentFile = null;
          this.modalDetailReference.close();
        } else {
          Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar el archivo', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar el archivo', 'error');
      });
    }
  }
}
