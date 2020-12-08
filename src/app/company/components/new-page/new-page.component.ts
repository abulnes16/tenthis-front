import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PageService } from 'src/app/core/services/shared/page.service';
import Block from 'src/app/models/block';
import APIResponse from 'src/app/models/response';
import Template from 'src/app/models/template';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {
  blocks: Block[];
  template: Template;
  editBlock: Block;
  constructor(
    private pageService: PageService,
    private location: Location,
  ) {
    this.blocks = [];
  }

  ngOnInit(): void {

  }

  savePage(data: any): void {
    const newPage = { ...data, html: this.blocks };
    this.pageService.createPage(newPage).subscribe((res: APIResponse) => {
      if (res.status === 201) {
        Swal.fire('Página creada', 'La página se creó con exito', 'success')
          .then(() => this.location.back());

      } else {
        Swal.fire('Error de registro', 'Ocurrió un error al crear la página', 'error');
      }
    }, (error) => {
      console.log(error);
      Swal.fire('Error de registro', 'Ocurrió un error al crear la página', 'error');
    });
  }

  addBlock(block: Block): void {
    this.blocks.push(block);
  }

  getEditBlock(index: number): void {
    this.editBlock = this.blocks[index];
    this.editBlock._id = index;
  }

  updateBlock(newBlock: Block): void {
    this.blocks = this.blocks.map(
      (block) => block === this.editBlock ? newBlock : block
    );
  }

  removeBlock(index: number): void {
    if (this.blocks[index] === this.editBlock) {
      this.editBlock = null;
    }

    this.blocks.splice(index, 1);
  }

}
