import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Revista, { Revista as RevistaType } from './Revista'; 
import '../css/Catalogo.css'; 

const Catalogo: React.FC = () => {
    const [revistas, setRevistas] = useState<RevistaType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const obtenerRevistas = async () => {
            try {
                const response = await axios.get<RevistaType[]>('http://localhost:8080/auth/revistas', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                });
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
