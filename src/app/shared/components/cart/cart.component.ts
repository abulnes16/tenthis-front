import { Component, OnInit } from '@angular/core';
import { faBox, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { OrderService } from 'src/app/core/services/shared/order.service';
import { ActivatedRoute } from '@angular/router';
import Order from 'src/app/models/orders';
import APIResponse from 'src/app/models/response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartIcon = faCartPlus;
  productIcon = faBox;
  total = 0;
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrderService,
  ) {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (localCart) {
      this.cart = JSON.parse(localStorage.getItem('cart')).cart;
    } else {
      this.cart = [];
    }
  }

  ngOnInit(): void {
    this.mapCart();
  }

  getProductCount(products: any, productId: string): number {
    let counter = 0;
    products.forEach((id: string) => {
      if (id === productId) {
        counter++;
      }
    });
    return counter;
  }

  mapCart(): void {
    if (sessionStorage.getItem('products-store')) {
      const products = JSON.parse(sessionStorage.getItem('products-store')).products;
      const producstInCart = [...new Set(this.cart)];
      this.cart = producstInCart.map((productId: any) => {
        const product = products.find((p: any) => p._id === productId);

        product.quantity = this.getProductCount(this.cart, productId);
        this.total += product.price * product.quantity;
        return product;
      });
    }
  }

  discardOrder(): void {
    Swal.fire({
      title: '¿Esta seguro de descartar el pedido?',
      text: `Todos los datos del carrito se borraran`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#108b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, descartar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        localStorage.removeItem('cart');
        this.location.back();
      }
    });
  }

  makeOrder(): void {
    const orderProducts = this.cart.map(product => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }));

    const order: Order = {
      products: orderProducts,
      store: this.route.snapshot.params.companyId
    };

    this.orderService.createOrder(order).subscribe((res: APIResponse) => {
      if (res.status === 201) {
        Swal.fire('Orden creada', '¡Muchas gracias por comprar en nuestra tienda!', 'success');
        localStorage.removeItem('cart');
        this.location.back();
      } else {
        Swal.fire('Error de creación', 'Ocurrió un error al crear la orden', 'error');
      }
    }, (error) => {
      console.log(error);
      Swal.fire('Error de creación', 'Ocurrió un error al crear la orden', 'error');
    });
  }

}
