import { Component, OnInit } from '@angular/core';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Plan from 'src/app/models/plan';
import APIResponse from 'src/app/models/response';

import { PlanService } from '../../../core/services/admin/plan.service';
@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.scss']
})
export class AdminPlansComponent implements OnInit {

  editMode = false;
  planIcon = faTag;
  plans: Plan[];
  currentPlan: Plan;
  loading = true;

  constructor(private planService: PlanService) { }

  ngOnInit(): void {
    this.planService.getPlans().subscribe((res: APIResponse) => {
      this.plans = res.data;
      this.loading = false;
    });
  }

  newPlan(): void {
    this.editMode = false;
    this.currentPlan = null;
  }

  addPlan(plan: Plan): void {
    this.plans.push(plan);
  }

  updatePlan(plan: Plan): void {
    this.plans = this.plans.map((p: Plan) => p._id === plan._id ? plan : p);
  }

  deletePlan(id: string): void {
    this.plans = this.plans.filter((p: Plan) => p._id !== id);
  }

  editPlan(id: string): void {
    this.planService.getPlanById(id).subscribe((res: APIResponse) => {
      this.currentPlan = res.data;
    });
    this.editMode = true;
  }

}
