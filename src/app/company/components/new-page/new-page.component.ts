import { Component, OnInit } from '@angular/core';
import Block from 'src/app/models/block';
import Page from 'src/app/models/page';
import APIResponse from 'src/app/models/response';
import Template from 'src/app/models/template';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {
  newPage: Page;
  template: Template;
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
    console.log(block);
    this.newPage.html.push(block);
  }

}
