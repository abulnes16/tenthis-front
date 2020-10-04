import { Component, OnInit } from '@angular/core';
import { faTag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.scss']
})
export class AdminPlansComponent implements OnInit {

  planIcon = faTag;
  plans = [
    {
      name: 'Plan'
    },
    {
      name: 'Plan'
    },
    {
      name: 'Plan'
    },
    {
      name: 'Plan'
    },
    {
      name: 'Plan'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
