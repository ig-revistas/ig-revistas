import { useState} from "react";
import axios from '../api/axios';
const REGISTER_URL = '/revistas/crearRevista';


interface RevistaResponse {
    id: number;
    message: string;
}

const useRevistaNew = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [editorial, setEditorial] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [ejemplares, setEjemplares] = useState<number>(1);
    const [fechaDePublicacion, setFechaDePublicacion] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');


    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<RevistaResponse>(REGISTER_URL, 
                JSON.stringify({
                    titulo: titulo,
                    editorial: editorial,
                    categoria: categoria,
                    ejemplares: ejemplares,
                    fechaDePublicacion: fechaDePublicacion,
                    descripcion: descripcion,
                }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
         
        } catch (error: any) {
            if (!error?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else {
                setErrMsg('Error al crear la revista');
            }
        }
    };

    return {
        titulo,
        setTitulo,
        editorial,
        setEditorial,
        categoria,
        setCategoria,
        ejemplares,
        setEjemplares,
        fechaDePublicacion,
        setFechaDePublicacion,
        descripcion,
        setDescripcion,
        manejarEnvio,
        errMsg,
    };
};

export default useRevistaNew;
