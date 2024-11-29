import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useRevistas from '../../hooks/useRevistas';
import './ListadoDeRevistas.css';
import { Estado, Revista as tipoRevista } from '../../tipos/Revista';
import Swal from 'sweetalert2';
import apiRevista from '../../api/apiRevista';

interface ListadoDeRevistasProps {
    revistas: tipoRevista[]; 
}

const ListadoDeRevistas: React.FC<ListadoDeRevistasProps> = () => {
    const { revistas, error, loading } = useRevistas(); 
    const [searchTerm] = useState<string>(''); 

  const filteredRevistas = revistas.filter(
    (revista) =>
      revista.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      revista.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const editarRevista = async (updatedData: tipoRevista) => {
    const response = await apiRevista.put(`/revistas/${updatedData.id}`);
    Swal.fire('Actualizado', 'La revista ha sido actualizada', 'success');
    navigate('/revistas');
  };

  const suspenderRevista = async (id: string) => {
    Swal.fire({
      title: '¿Por cuántos días deseas suspender la revista?',
      input: 'number',
      inputAttributes: {
        min: '1',
        step: '1',
      },
      showCancelButton: true,
      confirmButtonText: 'Suspender',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        const parameter = (!value) ? Number.parseInt(value) : 0;
        if (parameter < 1) {
          Swal.showValidationMessage('Por favor, ingresa un número válido de días.');
        } else {
          return value;
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const diasSuspension = result.value;

        try {
          await apiRevista.put(`/revistas/suspender/${id}`, { diasSuspension });
          Swal.fire(
            'Suspensión Exitosa',
            `La revista ha sido suspendida por ${diasSuspension} días.`,
            'success'
          );
          setRevistas((prevRevistas) =>
            prevRevistas.map((revista) =>
              revista.id === id
                ? { ...revista, estado: Estado.SUSPENDIDA, diasSuspension }
                : revista
            )
          );
        } catch (error) {
          Swal.fire(
            'Error',
            'No se pudo suspender la revista. Inténtalo nuevamente.',
            'error'
          );
        }
      }
    });
  };

  const eliminarRevista = async (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar esta revista?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiRevista.delete(`/revistas/${id}`);
          Swal.fire('Eliminado', 'La revista ha sido eliminada', 'success');
          setRevistas((prevRevistas: any[]) =>
            prevRevistas.filter((revista) => revista.id !== id)
          );
        } catch (error: any) {
          Swal.fire('Error', `No se pudo eliminar la revista: ${error.message || 'Desconocido'}`, 'error');
        }
      }
    });
  };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error al cargar las revistas: {error}</div>;
    }

  return (
    <div className="listado-revistas__contenedor">
      <div className="listado-revistas__header">
        <h1>Lista de Revistas</h1>
      </div>

      <div className="listado-revistas__tabla">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRevistas.map((revista) => (
              <tr key={revista.id}>
                <td>{revista.titulo}</td>
                <td>{revista.autor}</td>
                <td>{revista.categoria}</td>
                <td>{revista.estado}</td>
                <td>
                  <div className="listado-revistas__acciones">
                    <Link to={`/editarRevista/${revista.id}`}>
                      <button className="listado-revistas__boton--editar"
                        onClick={() => editarRevista(revista)}>
                        Editar
                      </button>
                    </Link>
                    <button
                      className="listado-revistas__boton--suspender"
                      onClick={() => suspenderRevista(revista.id)}
                    >
                      Suspender
                    </button>
                    <button
                      className="listado-revistas__boton--eliminar"
                      onClick={() => eliminarRevista(revista.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
)};
export default ListadoDeRevistas;
