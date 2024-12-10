import React, { useEffect, useState } from 'react';
import './ReporteRevistas.css';
import apiRevista from '../../api/apiRevista';

interface ReporteRevista {
  titulo: string;
  cantidadReservadas: number;
  cantidadDevueltas: number;
}

const ReporteRevistas: React.FC = () => {
  const [reporte, setReporte] = useState<ReporteRevista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await apiRevista.get<ReporteRevista[]>('/reporte/revistas');
        setReporte(response.data); 
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
        setLoading(false);
      }
    };

    fetchReporte();
  }, []);

  if (loading) return <p>Cargando reporte...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reporte-revistas__contenedor">
      <h2 className="reporte-revistas__header">Reporte de Revistas</h2>
      <table className="reporte-revistas__tabla">
        <thead>
          <tr>
            <th>Título</th>
            <th>Cantidad Reservadas</th>
            <th>Cantidad Devueltas</th>
          </tr>
        </thead>
        <tbody>
          {reporte.map((item, index) => (
            <tr key={index}>
              <td>{item.titulo}</td>
              <td>{item.cantidadReservadas}</td>
              <td>{item.cantidadDevueltas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteRevistas;
