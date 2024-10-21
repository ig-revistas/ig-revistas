import React from 'react';

// Define las propiedades que recibirá el componente
interface FechaDevolucionProps {
    fecha: string; // Tipo de fecha
    setFecha: React.Dispatch<React.SetStateAction<string>>; // Función para actualizar la fecha
}

const FechaDevolucion: React.FC<FechaDevolucionProps> = ({ fecha, setFecha }) => {
    return (
        <div>
            <label>
                Fecha de Devolución:
                <input
                    type="date"
                    value={fecha} // Asigna el valor de fecha al input
                    onChange={(e) => setFecha(e.target.value)} // Actualiza la fecha al cambiar
                />
            </label>
        </div>
    );
};

export default FechaDevolucion;
