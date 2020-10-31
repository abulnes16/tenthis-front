import { Component, OnInit, ViewChild } from '@angular/core';
import { faBan, faCampground, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Store from 'src/app/models/store';

@Component({
  selector: 'app-admin-stores',
  templateUrl: './admin-stores.component.html',
  styleUrls: ['./admin-stores.component.scss']
})
export class AdminStoresComponent implements OnInit {

  @ViewChild('storeModal') storeModal;

  tentIcon = faCampground;
  blockIcon = faBan;
  deleteIcon = faTrash;

  stores: Store[] = [
    {
      name: 'Tienda',
      owner: null,
      categories: null,
      description: '',
      configuration: null,
      media: null,
      pages: null,
      products: null
    },
    {
      name: 'Tienda',
      owner: null,
      categories: null,
      description: '',
      configuration: null,
      media: null,
      pages: null,
      products: null
    },
    {
      name: 'Tienda',
      owner: null,
      categories: null,
      description: '',
      configuration: null,
      media: null,
      pages: null,
      products: null
    },
    {
      name: 'Tienda',
      owner: null,
      categories: null,
      description: '',
      configuration: null,
      media: null,
      pages: null,
      products: null
    },
    {
      name: 'Tienda',
      owner: null,
      categories: null,
      description: '',
      configuration: null,
      media: null,
      pages: null,
      products: null
    },
    {
      name: 'Tienda',
      owner: null,
      categories: null,
      description: '',
      configuration: null,
      media: null,
      pages: null,
      products: null
    },
  ];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  showStore(): void {
    this.modalService.open(this.storeModal, { size: 'lg' });
  }

}
