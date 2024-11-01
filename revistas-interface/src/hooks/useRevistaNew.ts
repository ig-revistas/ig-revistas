import { useState } from "react";
import apiRevista from '../api/apiRevista';
import {tipoRevista, Estado} from "../modelo/tipoRevista";

const REGISTER_URL = '/revistas';


const initialRevista: tipoRevista = {
    id: 0,
    titulo: '',
    autor: '',
    categoria: '',
    editorial: '',
    descripcion: '',
    portadaUrl: '',
    estado: Estado.DISPONIBLE,
    fechaDePublicacion: '',
    ejemplares: 0
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
