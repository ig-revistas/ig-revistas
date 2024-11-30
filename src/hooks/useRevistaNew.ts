import { useState } from "react";
import apiRevista from '../api/apiRevista';
import {Revista as tipoRevista, Estado} from "../tipos/Revista";

const REGISTER_URL = '/revistas';


const initialRevista: tipoRevista = {
    id: '',
    titulo: '',
    autor: '',
    categoria: '',
    editorial: '',
    descripcion: '',
    portadaUrl: '',
    estado: Estado.DISPONIBLE,
    fechaPublicacion: '',
    cantidadDisponible: 1
};


const useRevistaNew = () => {
    const [revista, setRevista] = useState<tipoRevista>(initialRevista);
    
    const [errMsg, setErrMsg] = useState<string>('');
    const [exito, setExito] = useState<boolean>(false);
    

    const manejarEnvio = async (formData: FormData) => {
        try {
            setErrMsg('');
            const response = await apiRevista.post(
                REGISTER_URL,
                formData
            );
            setExito(true);
            return response.data; 
        } catch (error) {
            console.error("Error al enviar los datos:", error); 
            setErrMsg("Ocurrió un error al enviar los datos. Intente nuevamente."); 
        }
    };

    return {
        revista,
        setRevista,
        manejarEnvio,
        errMsg,
        exito,
    };
};

export default useRevistaNew;
