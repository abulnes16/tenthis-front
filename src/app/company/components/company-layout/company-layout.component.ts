import { Component, OnInit } from '@angular/core';
import { faBoxes, faCampground, faColumns, faHome, faImages, faList } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.scss']
})
export class CompanyLayoutComponent implements OnInit {



  companySidebar = [
    {
      links: [
        {
          icon: faHome,
          linkName: 'Home',
          url: './',
        }
      ]
    },
    {
      sectionName: 'Mi tienda',
      links: [
        {
          icon: faCampground,
          linkName: 'Tienda',
          url: 'orders'
        },
        {
          icon: faBoxes,
          linkName: 'Productos',
          url: 'products'
        },
        {
          icon: faList,
          linkName: 'Categorias',
          url: 'categories'
        },
      ]
    },
    {
      sectionName: 'Administración del sitio',
      links: [
        {
          icon: faColumns,
          linkName: 'Páginas',
          url: 'pages'
        },
        {
          icon: faImages,
          linkName: 'Multimedia',
          url: 'media'
        }
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
