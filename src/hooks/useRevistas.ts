import { useEffect, useState } from 'react';
import apiRevista from '../api/apiRevista'; 
import { Revista as tipoRevista } from '../tipos/Revista'; 

const useRevistas = () => {
    const [revistas, setRevistas] = useState<tipoRevista[]>([]); // Asegúrate de que el tipo sea tipoRevista[]
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const obtenerRevistas = async () => {
            setLoading(true);
            try {
                // Especifica el tipo de respuesta aquí, para que Axios sepa que es tipoRevista[]
                const response = await apiRevista.get<tipoRevista[]>('/revistas');
                setRevistas(response.data); // Aquí ya TypeScript sabrá que response.data es tipoRevista[]
            } catch (err: any) {
                setError('Error al obtener las revistas');
                console.error(err);
            } finally {
                setLoading(false); 
            }
        };

        obtenerRevistas();
    }, []);

    return { revistas, error, loading }; 
};

export default useRevistas;
