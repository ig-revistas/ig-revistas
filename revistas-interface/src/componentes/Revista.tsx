import React from 'react';
import '../css/Revista.css';

export interface Revista {
    id: number;
    titulo: string;
    autor: string;
    categoria: string;
    editorial: string;
    descripcion: string;
    portadaUrl: string;
}

interface RevistaProps {
    revista: Revista;
}

const Revista: React.FC<RevistaProps> = ({ revista }) => {
    return (
        <div className="revista-card">
            <img 
                src={`http://localhost:8080/auth${revista.portadaUrl}`} 
                alt={revista.titulo} 
                className="revista-portada" 
            />
            <h3 className="revista-titulo">{revista.titulo}</h3>
        </div>
    );
}

export default Revista;
