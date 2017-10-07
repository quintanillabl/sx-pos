import {Sucursal} from 'app/models';

export interface Sector {
  id: string;
  sucursal: Sucursal;
  sectorFolio: number;
  comentario: string;
  responsable1: string;
  responsable2: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}
