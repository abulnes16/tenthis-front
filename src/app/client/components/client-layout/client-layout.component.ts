import { Component, OnInit } from '@angular/core';
import { faGifts, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {

  clientSidebar = [
    {
      links: [
        {
          icon: faHome,
          linkName: 'Home',
          url: 'explore',
        }
      ]
    },
    {
      sectionName: 'Mis tenderos',
      links: [
        {
          icon: faGifts,
          linkName: 'Ordenes',
          url: 'orders'
        },
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
