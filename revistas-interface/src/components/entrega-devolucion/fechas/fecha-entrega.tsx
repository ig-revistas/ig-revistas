import React, { useState } from 'react';

const FechaEntrega = () => {
    const [fechaEntrega, setFechaEntrega] = useState<string>('');  // Estado local para manejar la fecha de entrega

    return (
        <>
            <h2>Fecha de Entrega:</h2>
            <input 
                type="date" 
                value={fechaEntrega} 
                onChange={(e) => setFechaEntrega(e.target.value)} 
                required 
            />
        </>
    );
};

export default FechaEntrega;
