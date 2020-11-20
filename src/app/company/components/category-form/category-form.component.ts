import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import Category from 'src/app/models/category';
import APIResponse from 'src/app/models/response';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../core/services/company/category.service';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnChanges {

  @Input() icon: Icon;
  @Input() editMode: boolean;
  @Input() editCategory: Category;
  @Output() createdCategory = new EventEmitter<Category>();
  @Output() deletedCategory = new EventEmitter<string>();
  @Output() updatedCategory = new EventEmitter<Category>();

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  get name(): AbstractControl {
    return this.categoryForm.get('name');
  }

  get description(): AbstractControl {
    return this.categoryForm.get('description');
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if (!this.editMode) {
      this.categoryForm.reset();
    }

    if (this.editCategory) {
      this.setFormData();
    }
  }

  createCategory(): void {
    if (this.categoryForm.valid) {
      const category = { ...this.categoryForm.value };
      this.categoryService.createCategory(category).subscribe((res: APIResponse) => {
        if (res.status === 201) {
          Swal.fire('Categoria creada', 'La categoria se creó con exito', 'success');
          this.categoryForm.reset();
          this.createdCategory.emit(res.data);
        } else {
          Swal.fire('Registro fallido', 'Ocurrió un error al crear la categoria', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Registro fallido', 'Ocurrió un error al crear la categoria', 'error');
      });
    }
  }

  updateCategory(): void {
    if (this.categoryForm.valid) {
      const category = { ...this.categoryForm.value };
      this.categoryService.updateCategory(this.editCategory._id, category).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Categoria actualizada', 'La categoria se actualizó con exito', 'success');
          this.categoryForm.reset();
          this.updatedCategory.emit(res.data);
        } else {
          Swal.fire('Registro fallido', 'Ocurrió un error al actualizar la categoria', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Registro fallido', 'Ocurrió un error al actualizar la categoria', 'error');
      });
    }
  }

  async deleteCategory(): Promise<any> {
    const confirm = await Swal.fire({
      title: '¿Esta seguro de eliminar esta categoria?',
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
      this.categoryService.deleteCategory(this.editCategory._id).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Categoria eliminada', 'La categoria se eliminó con exito', 'success');
          this.categoryForm.reset();
          this.deletedCategory.emit(this.editCategory._id);
        } else {
          Swal.fire('Eliminiación fallida', 'Ocurrió un error al eliminar la categoria', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Eliminiación fallida', 'Ocurrió un error al eliminar la categoria', 'error');
      });
    }
  }

  setFormData(): void {
    const formData = {
      name: this.editCategory.name,
      description: this.editCategory.description,
    };
    this.categoryForm.setValue(formData);
  }

}
