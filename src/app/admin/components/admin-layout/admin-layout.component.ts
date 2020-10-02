import { Component, OnInit } from '@angular/core';
import { faCampground, faHome, faLayerGroup, faTag, faUsers } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  adminSidebar = [
    {
      links: [
        {
          icon: faHome,
          linkName: 'Home',
          url: '',
        }
      ]
    },
    {
      sectionName: 'Administración de roles',
      links: [
        {
          icon: faUsers,
          linkName: 'Usuarios',
          url: 'users'
        },
        {
          icon: faCampground,
          linkName: 'Tiendas',
          url: 'stores'
        },
      ]
    },
    {
      sectionName: 'Administración del sitio',
      links: [
        {
          icon: faTag,
          linkName: 'Planes',
          url: 'plans'
        },
        {
          icon: faLayerGroup,
          linkName: 'Plantillas',
          url: 'templates'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
