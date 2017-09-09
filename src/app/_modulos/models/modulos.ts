import { Modulo } from './modulo';

export const MODULOS: Modulo[] = [
  {
    id: 1,
    nombre: 'Ventas',
    path: '/ventas',
    descripcion: 'Pedidos, cotizaciónes y facturación', 
    icon: 'shopping_basket'
  },
  {
    id: 2,
    nombre: 'Compras',
    path: '/compras',
    descripcion: 'Compras de productos para su venta',
    icon: 'shopping_cart'
  },
  {
    id: 3,
    nombre: 'Caja',
    path: '/caja',
    descripcion: 'Sistema de cobranza y administración de caja',
    icon: 'attach_money'
  },
  {
    id: 4,
    path: '/logistica',
    nombre: 'Logistica',
    descripcion: 'Sistema de distribución, inventarios y embarques',
    icon: 'traffic'
  },
];


