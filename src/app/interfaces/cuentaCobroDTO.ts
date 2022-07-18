import { ProductoDTO } from './productoDTO';
export interface CuentaCobroDTO{
    id: string;
    numero: string;
    estado: string;
    descripcion: string;
    productos: ProductoDTO[];
    valorTotal: number;
    clienteId: string;
}