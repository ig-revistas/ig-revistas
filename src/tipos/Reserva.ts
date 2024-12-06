export interface tipoReserva {
    id :string;
    tiempoVigente: number;
    fechaAprobacion: Date | null;        
    fechaPedirReserva: Date;     
    fechaRechazo: Date | null;    
    estado: EstadoReserva;
    idUsuario: string;
    revista: Revista;
    portadaRevista?: string;
    mailUsuario: string; 
    tituloRevista: string;
    estadoRevista: string;
}

export type EstadoReserva = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

export interface Revista {
    id: string;
    titulo: string;
    autor: string;
    fechaPublicacion: Date;
    categoria: string;
    editorial: string;
    estado: EstadoRevista;
    cantidadDisponible: number;
    descripcion: string;
    portadaUrl: string;
}
export type EstadoRevista = 'DISPONIBLE'|'PENDIENTE' | 'RESERVADA' | 'DEVUELTA';