export interface Producto {
  id: string
  clave: string
  activo: boolean
  ajuste: number
  ancho: number
  calibre: number
  caras: number
  clase: {
    id: string
  }
  dateCreated: string
  deLinea: boolean
  descripcion: string
  gramos: number
  inventariable: boolean
  kilos: number
  largo: number
  lastUpdated: string
  linea: {
    id: string
  }
  m2XMillar: number
  marca: {
    id: string
  }
  modoVenta: string
  nacional: boolean
  precioContado: number
  precioCredito: number
  presentacion: string
  sw2: number
  unidad: string
}
