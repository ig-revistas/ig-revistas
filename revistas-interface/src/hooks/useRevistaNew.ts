import { useState } from "react";
import axios from '../api/axios';

const REGISTER_URL = '/auth/CrearRevista';

export enum Estado {
    DISPONIBLE = 'DISPONIBLE',
    PRESTADA = 'PRESTADA',
    RESERVADA = 'RESERVADA',
    DEVUELTA = 'DEVUELTA'
}

const useRevistaNew = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [editorial, setEditorial] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [ejemplares, setEjemplares] = useState<number>(1);
    const [fechaDePublicacion, setFechaDePublicacion] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [estado, setEstado] = useState<Estado>(Estado.DISPONIBLE);
    const [errMsg, setErrMsg] = useState<string>('');

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    };

    const manejarEnvio = async (formData: FormData) => {
        try {
            setErrMsg('');
            const response = await axios.post(
                REGISTER_URL,
                formData,
                { 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': headers.Authorization
                    }
                }
            );
            return response.data; 
        } catch (error) {
            console.error("Error al enviar los datos:", error); 
            setErrMsg("Ocurrió un error al enviar los datos. Intente nuevamente."); 
        }
    };

    return {
        titulo,
        setTitulo,
        editorial,
        setEditorial,
        categoria,
        setCategoria,
        autor,
        setAutor,
        ejemplares,
        setEjemplares,
        fechaDePublicacion,
        setFechaDePublicacion,
        descripcion,
        setDescripcion,
        estado,
        setEstado,
        manejarEnvio,
        errMsg,
    };
};

export default useRevistaNew;
