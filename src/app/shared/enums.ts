export const BACKEND_URL = "http://localhost:3000/";

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