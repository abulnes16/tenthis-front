import { Component, OnInit } from '@angular/core';
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import APIResponse from 'src/app/models/response';
import Store from 'src/app/models/store';

import { StoreService } from '../../../core/services/shared/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  storeIcon = faCampground;

  stores: Store;
  storeFilter: string;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {

    this.storeService.getStores().subscribe((res: APIResponse) => {
      this.stores = res.data;
    });
  }

}
