import { Component, OnInit } from '@angular/core';
import { faColumns, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PageService } from 'src/app/core/services/shared/page.service';
import Page from 'src/app/models/page';
import APIResponse from 'src/app/models/response';
import decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-pages',
  templateUrl: './company-pages.component.html',
  styleUrls: ['./company-pages.component.scss']
})
export class CompanyPagesComponent implements OnInit {

  pageIcon = faColumns;
  deleteIcon = faTrash;
  editIcon = faEdit;
  loading = true;
  store: string;
  pages: Page[];

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.pageService.getPages().subscribe((res: APIResponse) => {
      this.pages = res.data;
      this.loading = false;
    });

    const decodedToken = decode(sessionStorage.getItem('token'));
    this.store = decodedToken.store;
  }


  async deletePage(pageId: string): Promise<void> {
    const confirm = await Swal.fire({
      title: '¿Esta seguro de eliminar la página?',
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
      this.pageService.deletePage(pageId).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Página eliminada', 'Se eliminó la página con exito', 'success');
          this.pages = this.pages.filter((page) => page._id !== pageId);
        } else {
          Swal.fire('Error de eliminación', 'Ocurrió un error al intentar eliminar la página', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Error de eliminación', 'Ocurrió un error al intentar eliminar la página', 'error');
      });
    }
  }
}
