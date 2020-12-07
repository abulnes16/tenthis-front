import { Component, OnInit } from '@angular/core';
import {
  faBoxes,
  faCampground,
  faColumns,
  faHome,
  faImages,
  faList
} from '@fortawesome/free-solid-svg-icons';

import { StoreService } from '../../../core/services/shared/store.service';
import decode from 'jwt-decode';
import Store from 'src/app/models/store';
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
          url: './home',
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
          linkName: 'Media',
          url: 'media'
        }
      ]
    }
  ];

  currentStore: Store;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    const decodedToken = decode(token);
    this.storeService.getStore(decodedToken.store).subscribe((data) => {
      this.currentStore = data;
    })
  }

}
