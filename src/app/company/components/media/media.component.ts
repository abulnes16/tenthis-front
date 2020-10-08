import { Component, OnInit } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  fileIcon = faFile;
  images = [
    {
      name: 'Nombre imagen',
      url: './assets/images/shopping.jpg'
    },
    {
      name: 'Nombre imagen',
      url: './assets/images/shopping.jpg'
    },
    {
      name: 'Nombre imagen',
      url: './assets/images/shopping.jpg'
    },
    {
      name: 'Nombre imagen',
      url: './assets/images/shopping.jpg'
    },
    {
      name: 'Nombre imagen',
      url: './assets/images/shopping.jpg'
    },
    {
      name: 'Nombre imagen',
      url: './assets/images/shopping.jpg'
    },
  ];

  files = [
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
    {
      name: 'Nombre archivo'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
