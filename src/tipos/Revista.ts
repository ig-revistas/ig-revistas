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
    fechaDePublicacion: string;
    ejemplares: number;
}

export enum Estado {
    DISPONIBLE = 'DISPONIBLE',
    PRESTADA = 'PRESTADA',
    RESERVADA = 'RESERVADA',
    DEVUELTA = 'DEVUELTA',
    SUSPENDIDA = 'SUSPENDIDA'
}