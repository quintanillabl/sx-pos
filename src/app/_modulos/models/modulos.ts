import { Modulo } from './modulo';

export const MODULOS: Modulo[] = [
  {
    id: 1,
    nombre: 'Compras',
    path: '/compras',
    descripcion: 'Compras de materia prima y sus cuentas por pagar ', 
    icon: 'shopping_cart'
  },
  {
    id: 2,
    nombre: 'Gastos',
    path: '/gastos',
    descripcion: 'Gastos, adquisiciones, servicios y sus cuentas por pagar',
    icon: 'domain'
  },

  {
    id: 3,
    nombre: 'CxC',
    path: '/cxc',
    descripcion: 'Cuentas por cobrar',
    icon: 'attach_money'
  },
  {
    id: 4,
    path: '/tesoreria',
    nombre: 'TES',
    descripcion: 'Tesorería y bancos',
    icon: 'account_balance'
  },
  {
    id: 5,
    path: '/contabilidad',
    nombre: 'CON',
    descripcion: 'Contabilidad y finanzas',
    icon: 'perm_data_setting'
  },
  {
    id: 6,
    path: '/rh',
    nombre: 'RH',
    descripcion: 'Recursos humanos',
    icon: 'directions_run'
  },
  {
    id: 7,
    nombre: 'CRM',
    path: '/crm',
    descripcion: 'Customer relationship management ',
    icon: 'people'
  },
  {
    id: 8,
    nombre: 'BI',
    path: '/bi',
    descripcion: 'Bussiness Intelligence ',
    icon: 'poll'
  },
  {
    id: 9,
    nombre: 'Admin',
    path: '/admin',
    descripcion: 'Adminsitracón de sistemas',
    icon: 'devices'
  },
];


