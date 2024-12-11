import React from 'react';
import { useParams } from 'react-router-dom';
import { Revista } from '../../tipos/Revista';
import Reserva from '../revista/reserva/reserva';
import './DetalleRevista.css';

interface DetalleRevistaProps {
    revistas: Revista[];
}

const DetalleRevista: React.FC<DetalleRevistaProps> = ({ revistas }) => {
    const { id } = useParams<{ id: string }>();
    const revista = revistas.find((r) => r.id === id);

    if (!revista) {
        return <p>No se encontró la revista.</p>;
    }

    return (
        <div className="detalleRevista">
            <h2>{revista.titulo}</h2>
            <h4>{revista.fechaDePublicacion}</h4>
            <h4>{revista.autor}</h4>
           
            <img
                src={`http://localhost:8080/revistas${revista.portadaUrl}`}
                alt={revista.titulo}
                className="revista-portada"
            />
            <p>{revista.descripcion}</p>

            <Reserva revista={revista.id} />
        </div>
    );
};

export default DetalleRevista;
