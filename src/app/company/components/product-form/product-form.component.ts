import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import Category from 'src/app/models/category';
import Product from 'src/app/models/product';
import APIResponse from 'src/app/models/response';
import Swal from 'sweetalert2';

import { CategoryService } from '../../../core/services/company/category.service';
import { ProductService } from '../../../core/services/company/product.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() icon: Icon;
  @Input() editMode: boolean;
  @Output() createdProduct = new EventEmitter<Product>();

  gallery: any = [];
  categories: Category[];

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    category: new FormControl('0', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    tags: new FormControl(''),
    media: new FormControl([]),
  });

  get name(): AbstractControl {
    return this.productForm.get('name');
  }

  get description(): AbstractControl {
    return this.productForm.get('description');
  }

  get price(): AbstractControl {
    return this.productForm.get('price');
  }

  get category(): AbstractControl {
    return this.productForm.get('category');
  }

  get quantity(): AbstractControl {
    return this.productForm.get('quantity');
  }

  get tags(): AbstractControl {
    return this.productForm.get('tags');
  }

  get media(): AbstractControl {
    return this.productForm.get('media');
  }

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res: APIResponse) => {
      this.categories = res.data;
    });
  }

  createProduct(): void {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe((res: APIResponse) => {
        if (res.status === 201) {
          Swal.fire('Producto creado', 'El producto se registro con exito', 'success');
          this.productForm.reset();
          this.gallery = [];
          this.createdProduct.emit(res.data);
        } else {
          Swal.fire('Registro fallido', 'Ocurrió un error al crear el producto', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Registro fallido', 'Ocurrió un error al crear el producto', 'error');
      });
    }
  }

  addToGallery(event: any): void {
    if (event.target.files) {
      const files = event.target.files;
      if (files.length === 0) { return; }
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        Swal.fire('Formato incorrecto', 'Solo se pueden agregar imágenes', 'error');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      this.media.setValue([...this.media.value, files[0]]);
      reader.onload = () => {
        this.gallery = [...this.gallery, reader.result];
      };

    } else {
      Swal.fire(
        'Archivo vacío',
        'Debe cargar un archivo para poder añadirlo a la galeria',
        'error'
      );
    }

  }
  removeFromGallery(path: string): void {
    this.gallery = this.gallery.filter((imgPath: string) => imgPath !== path);
    const newGallery = this.media.value.filter((img: any) => img.path !== path);
    this.media.setValue(newGallery);
  }

}
