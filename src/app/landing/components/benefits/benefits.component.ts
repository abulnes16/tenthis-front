import { Component, OnInit } from '@angular/core';
import { faStoreAlt, faShoppingCart, faColumns } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  data: any[] = [
    {
      icon: faStoreAlt,
      title: 'Tu tienda en linea',
      description: `Con Tenthis puedes generar tu tienda y controlar:
                    tus clientes, tus ordenes, tus productos,
                    ademas de la configuración de tu página.
                   `
    },
    {
      icon: faShoppingCart,
      title: 'Vende rapidamente',
      description: `Tu solo debes crear tu catalogo de productos y
                    nosotros nos encargamos del resto, atrae clientes y
                    comienza a vender.¡Que esperas!
                   `
    },
    {
      icon: faColumns,
      title: 'Tienda personalizada',
      description: `¡Crea tu tienda y personaliza a tu gusto!
                    Con nuestro sistema de plantillas puedes montar
                    tu tienda a tu estilo
                   `
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
