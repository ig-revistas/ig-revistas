import React, { useState } from 'react';

const FechaDevolucion = () => {
    const [fechaDevolucion, setFechaDevolucion] = useState<string>('');  // Estado local para manejar la fecha de devolución

    return (
        <>
            <h2>Fecha de Devolución:</h2>
            <input 
                type="date" 
                value={fechaDevolucion} 
                onChange={(e) => setFechaDevolucion(e.target.value)} 
                required 
            />
        </>
    );
};

export default FechaDevolucion;
