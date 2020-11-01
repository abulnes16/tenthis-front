import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  configForm = new FormGroup({
    storeName: new FormControl('', [Validators.required]),
    keywords: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    favicon: new FormControl(''),
    header: new FormControl(''),
    footer: new FormControl(''),
    css: new FormControl(''),
    js: new FormControl('')
  });

  get storeName(): AbstractControl {
    return this.configForm.get('storeName');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
