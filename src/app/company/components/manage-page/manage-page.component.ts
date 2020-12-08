import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Block from 'src/app/models/block';
import Page from 'src/app/models/page';
import APIResponse from 'src/app/models/response';
import Swal from 'sweetalert2';
import { PageService } from '../../../core/services/shared/page.service';
import { RenderPageService } from 'src/app/core/services/shared/render-page.service';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss']
})
export class ManagePageComponent implements OnInit, OnDestroy {

  page: Page;
  loading = true;
  editBlock: Block;

  constructor(
    private router: ActivatedRoute,
    private pageService: PageService,
    private location: Location,
    private render: RenderPageService,
  ) { }

  ngOnInit(): void {
    const pageId = this.router.snapshot.params.pageId;
    this.pageService.getPage(pageId).subscribe((res: APIResponse) => {
      this.page = res.data;
      if (this.page.css) {
        this.render.setStyles(this.page.css);
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.render.removeStyles();
  }

  saveEditPage(data: any): void {
    const updatePage = { ...data, html: this.page.html };
    this.pageService.updatePage(this.page._id, updatePage).subscribe((res: APIResponse) => {
      if (res.status === 200) {
        Swal.fire('Página actualizada', 'La página se actualizó con exito', 'success')
          .then(() => this.location.back());

      } else {
        Swal.fire('Actualización fallida', 'Ocurrió un error al actualizar la página', 'error');
      }
    }, (error) => {
      console.log(error);
      Swal.fire('Error de registro', 'Ocurrió un error al crear la página', 'error');
    });
  }

  addBlock(block: Block): void {
    this.page.html.push(block);
  }


  getEditBlock(index: number): void {
    this.editBlock = this.page.html[index];
    this.editBlock._id = index;
  }

  updateBlock(newBlock: Block): void {
    this.page.html = this.page.html.map(
      (block) => block === this.editBlock ? newBlock : block
    );
  }

  removeBlock(index: number): void {
    if (this.page.html[index] === this.editBlock) {
      this.editBlock = null;
    }

    this.page.html.splice(index, 1);
  }

}
