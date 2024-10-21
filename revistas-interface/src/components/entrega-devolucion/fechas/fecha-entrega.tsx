import React from 'react';

// Define las propiedades que recibirá el componente
interface FechaEntregaProps {
    fecha: string; // Tipo de fecha
    setFecha: React.Dispatch<React.SetStateAction<string>>; // Función para actualizar la fecha
}

const FechaEntrega: React.FC<FechaEntregaProps> = ({ fecha, setFecha }) => {
    return (
        <div>
            <label>
                Fecha de Entrega:
                <input
                    type="date"
                    value={fecha} // Asigna el valor de fecha al input
                    onChange={(e) => setFecha(e.target.value)} // Actualiza la fecha al cambiar
                />
            </label>
        </div>
    );
};

export default FechaEntrega;
