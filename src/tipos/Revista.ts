export interface Revista {
    id: number;
    titulo: string;
    autor: string;
    categoria: string;
    editorial: string;
    descripcion: string; 
    portadaUrl: string;
    estado: Estado.DISPONIBLE;
    fechaDePublicacion: string;
    ejemplares: number;
}
export enum Estado {
    DISPONIBLE = 'DISPONIBLE',
    PRESTADA = 'PRESTADA',
    RESERVADA = 'RESERVADA',
    DEVUELTA = 'DEVUELTA'
}
