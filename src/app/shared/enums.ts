import { environment } from "src/environments/environment";

export const BACKEND_URL = environment.backend;

export enum ApiUrl {
    obtenerClientes = "clientes",
    cuentasCobro = "cuentas_cobro",
    productos = "productos"
}

export enum Estados {
    pendiente = "Pendiente",
    pagado = "Pagado",
    anulado = "Anulado"
}