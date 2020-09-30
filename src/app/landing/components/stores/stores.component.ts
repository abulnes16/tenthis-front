import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  stores: any[] = [
    {
      img: './assets/images/store-1.jpg',
      name: 'Alfredos: La casa Italiana',
    },
    {
      img: './assets/images/store-2.jpg',
      name: 'Travel Escape',
    },
    {
      img: './assets/images/store-3.jpg',
      name: 'Cafe Detour',
    },
    {
      img: './assets/images/store-4.jpg',
      name: 'Succulent Garden',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
