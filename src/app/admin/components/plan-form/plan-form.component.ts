import { Component, OnInit, Input } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  @Input() icon: Icon;

  constructor() { }

  ngOnInit(): void {
  }

}
