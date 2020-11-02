import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  @Input() icon: Icon;
  @Input() editMode: boolean;

  planForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    storage: new FormControl('', [Validators.required, Validators.min(1)]),
    numPages: new FormControl('', [Validators.required, Validators.min(1)]),
    numProducts: new FormControl('', [Validators.required, Validators.min(1)]),
    numTemplates: new FormControl('', [Validators.required, Validators.min(1)])
  });

  get name(): AbstractControl {
    return this.planForm.get('name');
  }
  get price(): AbstractControl {
    return this.planForm.get('price');
  }
  get storage(): AbstractControl {
    return this.planForm.get('storage');
  }
  get numPages(): AbstractControl {
    return this.planForm.get('numPages');
  }
  get numProducts(): AbstractControl {
    return this.planForm.get('numProducts');
  }
  get numTemplates(): AbstractControl {
    return this.planForm.get('numTemplates');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
