import { Component, OnInit } from '@angular/core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryIcon = faClipboard;
  categories = [
    {
      name: 'Categoria'
    },
    {
      name: 'Categoria'
    },
    {
      name: 'Categoria'
    },
    {
      name: 'Categoria'
    },
    {
      name: 'Categoria'
    },
    {
      name: 'Categoria'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
