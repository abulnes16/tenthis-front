import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() registerText: string;
  constructor() { }

  ngOnInit(): void {
  }

}
