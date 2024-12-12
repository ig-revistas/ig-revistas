import { useEffect } from "react";
import useReservaAprobada from "./useReservaAprobada"; 
import "./listaReservaOperador.css"

const ListaReservasAprobadas = () => {
  const { reservas, errMsg, cargando, pedirTodasLasReservasAprobadas } = useReservaAprobada();

  useEffect(() => {
    pedirTodasLasReservasAprobadas();
  }, []);

  return (
    <div className="listado-reserva__contenedor">
      <div className="listado-reserva__header">
        <h1>Lista de reservas Aprobadas</h1>
        {cargando && <p>Cargando...</p>} 
        {errMsg && <p className="error">{errMsg}</p>} 
      </div>
      <table className="listado-reserva__tabla">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Revista</th>
            <th>Estado de la Revista</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.mailUsuario}</td>
              <td>{reserva.tituloRevista}</td>
              <td>{reserva.estadoRevista}</td>
              <td>{reserva.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaReservasAprobadas;
