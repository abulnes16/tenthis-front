import { Component, OnInit } from '@angular/core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import Category from 'src/app/models/category';
import APIResponse from 'src/app/models/response';

import { CategoryService } from '../../../core/services/company/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryIcon = faClipboard;
  editMode = false;
  currentCategory: Category;

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res: APIResponse) => {
      this.categories = res.data;
    });
  }

  newCategory(): void {
    this.editMode = false;
    this.currentCategory = null;
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  updateCategory(category: Category): void {
    this.categories = this.categories.map((c: Category) => c._id === category._id ? category : c);
  }

  deleteCategory(id: string): void {
    this.categories = this.categories.filter((c: Category) => c._id !== id);
  }

  editCategory(id: string): void {
    this.editMode = true;
    this.categoryService.getCategory(id).subscribe((res: APIResponse) => {
      this.currentCategory = res.data;
    });
  }
}
