import { Component, OnInit } from '@angular/core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import Category from 'src/app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryIcon = faClipboard;
  editMode = false;

  categories: Category[] = [
    {
      name: 'Categoria',
      description: '',
    },
    {
      name: 'Categoria',
      description: '',
    },
    {
      name: 'Categoria',
      description: '',
    },
    {
      name: 'Categoria',
      description: '',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  newCategory(): void {
    this.editMode = false;
  }

  editCategory(): void {
    this.editMode = true;
  }
}
