import { Component, OnInit } from '@angular/core';
import { faUsers, faCampground, faBuilding } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  plans: any[] = [
    {
      icon: faUsers,
      name: 'Client',
      description: `Usa la plataforma como cliente,
                    navega por las diferentes tiendas y compra
                    lo que quieras, disfruta de Tenthis sin ser dueño
                    `,
      features: [
        {
          category: 'Almacenamiento',
          value: 'Ninguno',
        },
        {
          category: 'N° de Páginas',
          value: 'Ninguno',
        },
        {
          category: 'Catalogo de Productos',
          value: 'Ninguno',
        },
        {
          category: 'Plantillas',
          value: 'Ninguno',
        }
      ],
      price: 'Gratis',
    },
    {
      icon: faCampground,
      name: 'TentMy',
      description: `Deseas crear una tienda, pero no tienes mucho presupuesto
                    entonces este plan es para ti. Monta tu tienda con lo minimo y
                    toda la potencia.
                   `,
      features: [
        {
          category: 'Almacenamiento',
          value: '5GB',
        },
        {
          category: 'N° de Páginas',
          value: '10 paginas',
        },
        {
          category: 'Catalogo de Productos',
          value: '25 productos',
        },
        {
          category: 'Plantillas',
          value: '3 plantillas',
        }
      ],
      price: '40$ / mes',
    },
    {
      icon: faBuilding,
      name: 'TentCorp',
      description: `Ya tienes una tienda grande y necesitas migrar al mundo digital. 
                    Crea sin limites y gestiona
                    tu tienda con todo el poder de Tenthis
                   `,
      features: [
        {
          category: 'Almacenamiento',
          value: 'Ilimitado',
        },
        {
          category: 'N° de Páginas',
          value: '+50 paginas',
        },
        {
          category: 'Catalogo de Productos',
          value: '+200 productos',
        },
        {
          category: 'Plantillas',
          value: '+10 plantillas',
        }

      ],
      price: '80$ / mes',
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
