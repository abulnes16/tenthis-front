import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input() icon: Icon;
  @Input() editMode: boolean;

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

  constructor() { }

  ngOnInit(): void {
  }

}
