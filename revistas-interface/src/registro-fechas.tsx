import React, { useState, useEffect } from 'react';

const RegistroFechas: React.FC = () => {
  const [idRevista, setIdRevista] = useState<string>('');
  const [role, setRole] = useState<string | null>(null); // Estado para almacenar el rol del usuario
  const [token, setToken] = useState<string | null>(localStorage.getItem('token')); // Asumiendo que el token está en el localStorage

  useEffect(() => {
    // Obtener el rol del usuario desde el backend
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/auth/user/roles', {
          headers: {
            Authorization: `Bearer ${token}`, // Pasar el token en las cabeceras
          },
        });
        if (response.ok) {
          const roles = await response.json();
          setRole(roles.includes('ROLE_OPERADOR') ? 'ROLE_OPERADOR' : 'OTHER'); // Almacenar el rol
        } else {
          console.error('Error al obtener el rol del usuario');
        }
      } catch (error) {
        console.error('Error en la petición para obtener el rol:', error);
      }
    };

    if (token) {
      fetchUserRole();
    }
  }, [token]);

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

  if (role !== 'ROLE_OPERADOR') {
    return <p>No tienes permisos para registrar fechas.</p>; // Mostrar este mensaje si no es operador
  }

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
