import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() icon: Icon;
  @Input() editMode: boolean;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    category: new FormControl('0', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    tags: new FormControl('')
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

  constructor() { }

  ngOnInit(): void {
  }

}
