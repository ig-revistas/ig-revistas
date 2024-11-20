import React from 'react';
import { Link } from 'react-router-dom'; 
import './Revista.css';
import { Revista as tipoRevista } from '../../tipos/Revista';

interface RevistaProps {
    revista: tipoRevista;
}


const Revista: React.FC<RevistaProps> = ({ revista }) => {
    return (
        <Link to={`/revista/${revista.id}`} className="revista-card">
            <img 
                src={`http://localhost:8080/revistas${revista.portadaUrl}`} 
                alt={revista.titulo} 
                className="revista-portada" 
            />
            <h3 className="revista-titulo">{revista.titulo}</h3>
        </Link>
    );
}

export default Revista;
