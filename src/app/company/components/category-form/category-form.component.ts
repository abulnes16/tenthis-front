import { Component, Input, OnInit } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input() icon: Icon;

  constructor() { }

  ngOnInit(): void {
  }

}
