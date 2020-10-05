import { Component, Input, OnInit } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() icon: Icon;

  constructor() { }

  ngOnInit(): void {
  }

}
