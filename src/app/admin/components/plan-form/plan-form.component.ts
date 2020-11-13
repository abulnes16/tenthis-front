import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { PlanService } from 'src/app/core/services/admin/plan.service';
import APIResponse from 'src/app/models/response';
import Swal from 'sweetalert2';

import Plan from '../../../models/plan';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit, OnChanges {

  @Input() icon: Icon;
  @Input() editMode: boolean;
  @Input() editPlan: Plan;
  @Output() createdPlan = new EventEmitter<Plan>();
  @Output() updatedPlan = new EventEmitter<Plan>();
  @Output() deletedPlan = new EventEmitter<string>();


  planForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    storage: new FormControl('', [Validators.required, Validators.min(1)]),
    pages: new FormControl('', [Validators.required, Validators.min(1)]),
    products: new FormControl('', [Validators.required, Validators.min(1)]),
    templates: new FormControl('', [Validators.required, Validators.min(1)])
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
    return this.planForm.get('pages');
  }
  get numProducts(): AbstractControl {
    return this.planForm.get('products');
  }
  get numTemplates(): AbstractControl {
    return this.planForm.get('templates');
  }

  constructor(private planService: PlanService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (!this.editMode) {
      this.planForm.reset();
    }
    this.setFormData();
  }

  createPlan(): void {
    if (this.planForm.valid) {
      this.planService.createPlan(this.planForm.value).subscribe((res: APIResponse) => {
        if (res.status === 201) {
          Swal.fire('Plan creado', 'El plan se creo con exito', 'success');
          this.planForm.reset();
          this.createdPlan.emit(res.data);
        } else {
          Swal.fire('Registro fallido', 'Ocurrió un error al crear el plan', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Registro fallido', 'Ocurrió un error al crear el plan', 'error');
      });
    }
  }

  updatePlan(): void {
    if (this.planForm.valid) {
      this.planService.updatePlan(
        this.editPlan._id,
        this.planForm.value
      ).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          console.log(res.data);
          Swal.fire('Plan actualizado', 'El plan se actualizó con exito', 'success');
          this.planForm.reset();
          this.updatedPlan.emit(res.data);
        } else {
          Swal.fire('Registro fallido', 'Ocurrió un error al actualizar el plan', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Registro fallido', 'Ocurrió un error al actualizar el plan', 'error');
      });
    }
  }

  async removePlan(): Promise<any> {

    const confirm = await Swal.fire({
      title: '¿Esta seguro de eliminar este plan?',
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
      this.planService.deletePlan(this.editPlan._id).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Plan eliminado', 'El plan se eliminó con exito', 'success');
          this.planForm.reset();
          this.deletedPlan.emit(this.editPlan._id);
        } else {
          Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar el plan', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar el plan', 'error');
      });
    }

  }

  setFormData(): void {
    if (this.editPlan) {
      const formData = {
        name: this.editPlan.name,
        price: this.editPlan.price,
        storage: this.editPlan.storage,
        pages: this.editPlan.numPages,
        templates: this.editPlan.numTemplates,
        products: this.editPlan.numProducts,
      };
      this.planForm.setValue(formData);
    }
  }

}
