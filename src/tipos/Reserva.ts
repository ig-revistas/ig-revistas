export interface tipoReserva {
    tiempoVigente: number;
    fechaAprobacion: Date | null;        
    fechaPedirReserva: Date;     
    fechaRechazo: Date | null;    
    estado: EstadoReserva;
    usuario: string;
    revista: Revista;
    portadaRevista?: string; 
}

export type EstadoReserva = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

export interface Revista {
    id: string;
    titulo: string;
    autor: string;
    fechaPublicacion: Date;
    categoria: string;
    editorial: string;
    estado: string;
    cantidadDisponible: number;
    descripcion: string;
    portadaUrl: string;
}
