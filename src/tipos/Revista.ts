export interface Revista {
    updatedData(id: string, updatedData: any): void;

    id: string;
    titulo: string;
    autor: string;
    categoria: string;
    editorial: string;
    descripcion: string; 
    portadaUrl: string;
    estado: Estado;  
    fechaPublicacion: string;
    cantidadDisponible: number;
}

export enum Estado {
    DISPONIBLE,
    PRESTADA,
    DEVUELTA,
    SUSPENDIDA
}
