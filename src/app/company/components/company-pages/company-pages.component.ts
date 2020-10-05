import { Component, OnInit } from '@angular/core';
import { faColumns, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-pages',
  templateUrl: './company-pages.component.html',
  styleUrls: ['./company-pages.component.scss']
})
export class CompanyPagesComponent implements OnInit {

  pageIcon = faColumns;
  deleteIcon = faTrash;
  editIcon = faEdit;

  pages = [
    {
      name: 'Pagina'
    },
    {
      name: 'Pagina'
    },
    {
      name: 'Pagina'
    },
    {
      name: 'Pagina'
    },
    {
      name: 'Pagina'
    },
    {
      name: 'Pagina'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
