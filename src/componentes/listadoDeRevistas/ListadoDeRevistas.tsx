import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useRevistas from '../../hooks/useRevistas'; 
import './ListadoDeRevistas.css'; 
import { Revista as tipoRevista } from '../../tipos/Revista'; 

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
                                        <button className="listado-revistas__boton--editar">
                                            Editar
                                        </button>
                                    </Link>
                                    <Link to={`/eliminarRevista/${revista.id}`}>
                                        <button className="listado-revistas__boton--eliminar">
                                            Eliminar
                                        </button>
                                    </Link>
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
