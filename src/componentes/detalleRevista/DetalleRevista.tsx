import React from 'react';
import { useParams } from 'react-router-dom';
import { Revista } from '../../tipos/Revista';
import Reserva from '../revista/reserva/Reserva';
import './DetalleRevista.css';

interface DetalleRevistaProps {
    revista?: Revista;
    revistas?: Revista[];
}

const DetalleRevista: React.FC<DetalleRevistaProps> = ({ revistas, revista }) => {
   
    const { id } = useParams<{ id: string }>();

    const revistaActual = revista || revistas?.find((r) => r.id === id);

    if (!revistaActual) {
        return <p>No se encontró la revista.</p>;
    }

    return (
        <div className="detalleRevista">
            <h2>{revistaActual.titulo}</h2>
            <h4>{revistaActual.autor}</h4>
            <img
                src={`http://localhost:8080/revistas${revistaActual.portadaUrl}`}
                alt={revistaActual.titulo}
                className="revista-portada"
            />
            <p>{revistaActual.descripcion}</p>

            <Reserva revista={revistaActual.id} />
        </div>
    );
};

export default DetalleRevista;
