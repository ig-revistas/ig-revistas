import React from 'react';

export interface Revista {
    id: number;
    titulo: string;
    editorial?: string;
    categoria: string;
    autor: string;
    ejemplares: number;
    fechaPublicacion?: string;
    descripcion?: string;
}
export type RevistaItemProps={
    revista:Revista,
}

const RevistaItem: React.FC<RevistaItemProps> = ({ revista }) => {
    return (
        <div className="revista-item">
            <h3>{revista.titulo}</h3>
            {revista.editorial && <p>Editorial: {revista.editorial}</p>}
            <p>Categoría: {revista.categoria}</p>
            <p>Autor: {revista.autor}</p>
            <p>Ejemplares Disponibles: {revista.ejemplares}</p>
            {revista.fechaPublicacion && <p>Fecha de Publicación: {revista.fechaPublicacion}</p>}
            {revista.descripcion && <p>Descripción: {revista.descripcion}</p>}
        </div>
    );
};

export default RevistaItem;