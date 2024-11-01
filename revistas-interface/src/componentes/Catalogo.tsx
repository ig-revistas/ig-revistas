import React, { useEffect, useState } from 'react';
import apiRevista from '../api/apiRevista';
import Revista from './Revista';
import { tipoRevista } from '../modelo/tipoRevista'; 
import './css/Catalogo.css'; 

const Catalogo: React.FC = () => {
    const [revistas, setRevistas] = useState<tipoRevista[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const obtenerRevistas = async () => {
            try {
                const response = await apiRevista.get<tipoRevista[]>('/revistas');
                setRevistas(response.data);
            } catch (err: any) {
                setError('Error al obtener las revistas');
                console.error(err);
            }
        };

        obtenerRevistas();
    }, []);

    return (
        <div className="catalogo-container">
            {error && <p>{error}</p>}
            {revistas.map(revista => (
                <Revista key={revista.id} revista={revista} />
            ))}
        </div>
    );
};

export default Catalogo;
