import { Component, OnInit } from '@angular/core';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Plan from 'src/app/models/plan';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.scss']
})
export class AdminPlansComponent implements OnInit {

  editMode = false;
  planIcon = faTag;
  plans: Plan[] = [
    {
      name: 'Plan',
      price: 0,
      storage: 0,
      numPages: 0,
      numProducts: 0,
      numTemplates: 0,
    },
    {
      name: 'Plan',
      price: 0,
      storage: 0,
      numPages: 0,
      numProducts: 0,
      numTemplates: 0,
    },
    {
      name: 'Plan',
      price: 0,
      storage: 0,
      numPages: 0,
      numProducts: 0,
      numTemplates: 0,
    },
    {
      name: 'Plan',
      price: 0,
      storage: 0,
      numPages: 0,
      numProducts: 0,
      numTemplates: 0,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  newPlan(): void {
    this.editMode = false;
  }

  editPlan(): void {
    this.editMode = true;
  }

}
