import { Component, OnInit } from '@angular/core';
import Block from 'src/app/models/block';
import Page from 'src/app/models/page';
import Template from 'src/app/models/template';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {
  newPage: Page;
  template: Template;
  editBlock: Block;
  constructor(

  ) {
    this.newPage = {
      title: '',
      description: '',
      html: [],
      css: '',
      isMain: false,
      isVisible: true
    };
  }

  ngOnInit(): void {

  }

  addBlock(block: Block): void {
    this.newPage.html.push(block);
  }

  getEditBlock(index: number): void {
    this.editBlock = this.newPage.html[index];
    this.editBlock._id = index;
  }

  updateBlock(newBlock: Block): void {
    this.newPage.html = this.newPage.html.map(
      (block) => block === this.editBlock ? newBlock : block
    );
  }

  removeBlock(index: number): void {
    if (this.newPage.html[index] === this.editBlock) {
      this.editBlock = null;
    }

    this.newPage.html.splice(index, 1);
  }

}
