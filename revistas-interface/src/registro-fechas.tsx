import React, { useState } from 'react';

const RegistroFechas: React.FC = () => {
  const [idRevista, setIdRevista] = useState<string>('');

  const registrarEntrega = async () => {
    try {
      const response = await fetch(`/prestamos/entregar/${idRevista}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('Fecha de entrega registrada correctamente.');
      } else {
        alert('Error al registrar la fecha de entrega.');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const registrarDevolucion = async () => {
    try {
      const response = await fetch(`/prestamos/devolver/${idRevista}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('Fecha de devolución registrada correctamente.');
      } else {
        alert('Error al registrar la fecha de devolución.');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <div>
      <h2>Registro de Fechas de Entrega y Devolución</h2>

      <div>
        <label htmlFor="idRevista">ID de la Revista:</label>
        <input
          type="text"
          id="idRevista"
          value={idRevista}
          onChange={(e) => setIdRevista(e.target.value)}
        />
      </div>

      <div>
        <button onClick={registrarEntrega}>Registrar Fecha de Entrega</button>
      </div>

      <div>
        <button onClick={registrarDevolucion}>Registrar Fecha de Devolución</button>
      </div>
    </div>
  );
};

export default RegistroFechas;
