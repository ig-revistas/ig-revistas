import { useState } from "react";
import apiRevista from '../api/apiRevista';
import {Revista as tipoRevista, Estado} from "../tipos/Revista";

const REGISTER_URL = '/revistas';
const UPDATE_URL = (id: string) => `/revistas/${id}`;


const initialRevista: tipoRevista = {
    id: '',
    titulo: '',
    autor: '',
    categoria: '',
    editorial: '',
    descripcion: '',
    portadaUrl: '',
    estado: Estado.DISPONIBLE,
    fechaDePublicacion: '',
    ejemplares: 1,
    updatedData: function (id: string, updatedData: any): void {
        throw new Error("Function not implemented.");
    }
};


const useRevistaNew = (isEditMode: boolean = false) => {
    const [revista, setRevista] = useState<tipoRevista>(initialRevista);
    const [errMsg, setErrMsg] = useState<string>('');
    const [exito, setExito] = useState<boolean>(false);
    

    const obtenerRevistaPorId = async (id: string) => {
        if (isEditMode) {
            try {
                const response = await apiRevista.get<tipoRevista>(`/revistas/${id}`);
                setRevista({ ...response.data, id: response.data.id.toString() }); 
            } catch (error) {
                setErrMsg("Error al cargar la revista.");
            }
        }
    };
    const manejarEnvio = async (formData: FormData, id: string | null = null) => {
        try {
            setErrMsg('');
            let response;
            if (isEditMode && id) {
                response = await apiRevista.put(UPDATE_URL(id), formData);
            } else {
                response = await apiRevista.post(REGISTER_URL, formData);
            }
            setExito(true); 
            return response.data; 
        } catch (error) {
            console.error("Error:", error); 
            setErrMsg("Ocurrió un error al enviar los datos. Intente nuevamente."); 
        }
    };
    return {
        revista,
        setRevista,
        manejarEnvio,
        obtenerRevistaPorId,
        errMsg,
        exito,
    };
};

export default useRevistaNew;
