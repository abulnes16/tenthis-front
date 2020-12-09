import { Component, OnInit, ViewChild } from '@angular/core';
import { faCampground, faLock, faLockOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import APIResponse from 'src/app/models/response';
import Store from 'src/app/models/store';
import Swal from 'sweetalert2';

import { StoreService } from '../../../core/services/shared/store.service';

@Component({
  selector: 'app-admin-stores',
  templateUrl: './admin-stores.component.html',
  styleUrls: ['./admin-stores.component.scss']
})
export class AdminStoresComponent implements OnInit {

  @ViewChild('storeModal') storeModal;

  tentIcon = faCampground;
  blockIcon = faLock;
  unblockIcon = faLockOpen;
  deleteIcon = faTrash;

  nameFilter: string;
  loading = true;

  stores: Store[];
  currentStore: Store;

  constructor(
    private modalService: NgbModal,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.getStores().subscribe((res: APIResponse) => {

      this.stores = res.data;
      this.loading = false;
    });
  }

  showStore(id: string): void {
    this.currentStore = this.stores.find((store: Store) => store._id === id);
    this.modalService.open(this.storeModal, { size: 'lg' });
  }

  updateStoreList(store: Store): void {
    this.stores = this.stores.map((s: Store) => s._id === store._id ? store : s);
  }

  popStore(id: string): void {
    this.stores = this.stores.filter((s: Store) => (s._id !== id));
  }

  async blockStore(id: string): Promise<any> {
    const confirm = await Swal.fire({
      title: '¿Esta seguro de bloquear la tienda?',
      text: 'Las tiendas bloqueadas no pueden crear contenido',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bloquear',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    });

    if (confirm.isConfirmed) {
      this.storeService.blockStore(id).subscribe((res: APIResponse) => {
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire('Bloqueo exitoso', 'La tienda se bloqueo con exito', 'success');
          this.updateStoreList(res.data);
        } else {
          Swal.fire('Bloqueo fallido', 'Ocurrió un error al bloquear la tienda', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Bloqueo fallido', 'Ocurrió un error al bloquear la tienda', 'error');
      });
    }
  }

  async unblockStore(id: string): Promise<any> {
    const confirm = await Swal.fire({
      title: '¿Esta seguro de desbloquear la tienda?',
      text: 'Las tiendas desbloquedas pueden volver a crear contenido',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desbloquear',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });

    if (confirm.isConfirmed) {
      this.storeService.blockStore(id, true).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Desbloqueo exitoso', 'La tienda se desbloqueo con exito', 'success');
          this.updateStoreList(res.data);
        } else {
          Swal.fire('Desbloqueo fallido', 'Ocurrió un error al desbloquear la tienda', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Desbloqueo fallido', 'Ocurrió un error al desbloquear la tienda', 'error');
      });
    }
  }

  async deleteStore(id: string): Promise<any> {
    const confirm = await Swal.fire({
      title: '¿Esta seguro de eliminar la tienda?',
      text: 'El usuario perdera todos los datos de su tienda',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    });

    if (confirm.isConfirmed) {
      this.storeService.deleteStore(id).subscribe((res: APIResponse) => {
        if (res.status === 200) {
          Swal.fire('Tienda eliminada', 'La tienda se elimino con exito', 'success');
          this.popStore(id);
        } else {
          Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar la tienda', 'error');
        }
      }, (error) => {
        console.log(error);
        Swal.fire('Eliminación fallida', 'Ocurrió un error al eliminar la tienda', 'error');
      });
    }
  }

}
