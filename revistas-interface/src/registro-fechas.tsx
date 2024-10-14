import React, { useState } from 'react';
import FechaEntrega from './components/entrega-devolucion/fechas/fecha-entrega';
import FechaDevolucion from './components/entrega-devolucion/fechas/fecha-devolucion';

const RegistroFechas = () => {
    const [revista, setRevista] = useState<string>('');  // Maneja el título o nombre de la revista
    const [exito, setExito] = useState<boolean>(false);   // Estado para indicar si el registro fue exitoso

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario de revistas
        setExito(true); // Simulación de éxito
    };

    return (
        <section>
            {exito ? (
                <h1>¡Registro de Revista Exitoso!</h1>
            ) : (
                <form onSubmit={manejarEnvio}>
                    <label>
                        Revista:
                        <input 
                            type="text" 
                            value={revista} 
                            onChange={(e) => setRevista(e.target.value)} 
                            required 
                        />
                    </label>
                    <FechaEntrega />
                    <FechaDevolucion />
                    <button type="submit">Registrar Entrega y Devolución</button>
                </form>
            )}
        </section>
    );
};

export default RegistroFechas;
