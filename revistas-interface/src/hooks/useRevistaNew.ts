import { useState } from "react";
import axios from '../api/axios';


const REGISTER_URL = '/auth/CrearRevista';
// esto hay que cambiarlo
enum Estado{
    DISPONIBLE = 'DISPONIBLE',
    PRESTADA = 'PRESTADA',
    RESERVADA= 'RESERVADA', 
    DEVUELTA='DEVUELTA'
}
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
    const [estado, setEstado] = useState<Estado>()

    const [errMsg, setErrMsg] = useState<string>('');
    const [autor, setAutor]= useState<string>('');
    

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<RevistaResponse>(REGISTER_URL, 
                JSON.stringify({
                    titulo: titulo,
                    editorial: editorial,
                    categoria: categoria,
                    autor: autor,
                    ejemplares: ejemplares,
                    fechaDePublicacion: fechaDePublicacion,
                    descripcion: descripcion,
                    estado:Estado.DISPONIBLE,
                }), 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
                    },
                }
            );

            console.log("Revista creada:", response.data); 
            
        } catch (error: any) {
            if (!error?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else {
                setErrMsg('Error al crear la revista');
                console.error("Error detallado:", error.response.data); 
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
