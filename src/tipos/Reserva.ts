
export interface tipoReserva{
    id:string;
    tiempoVigente: number | null;
    fechaAprobacion: string | null;
    fechaPedirReserva: string;
    fechaRechazo: string | null;
    estado:EstadoReserva ;
    usuario: string;
    revista: string;
}
export enum EstadoReserva{
    PENDIENTE='PENDIENTE',
    APROBADA='APROBADA',
    RECHAZADA='RECHAZADA',
}

