import React from 'react';
import './css/Revista.css';
import {tipoRevista} from '../modelo/tipoRevista';


interface RevistaProps {
    revista: tipoRevista;
}

const Revista: React.FC<RevistaProps> = ({ revista }) => {
    return (
        <div className="revista-card">
            <img 
                src={`http://localhost:8080/revistas${revista.portadaUrl}`} 
                alt={revista.titulo} 
                className="revista-portada" 
            />
            <h3 className="revista-titulo">{revista.titulo}</h3>
        </div>
    );
}

export default Revista;
