import { useState } from "react";
import apiRevista from "../api/apiRevista";
import { tipoReserva } from "../tipos/Reserva";

//___________URLS______________
const RECERVA_URL = '/reserva';
const TODAS_LAS_RESERVAS_APROBADAS_URL = RECERVA_URL + '/todasLasAprobadas';
const DEVOLVER_RESERVA_URL = RECERVA_URL + '/devolver'; 
//_____________________________

const useReservaAprobada = () => {
    const [errMsg, setErrMsg] = useState<string>(''); 
    const [reservas, setReservas] = useState<tipoReserva[]>([]); 
    const [cargando, setCargando] = useState<boolean>(false);

    const pedirTodasLasReservas = async () => {
        setCargando(true);
        try {
            const response = await apiRevista.get<tipoReserva[]>(TODAS_LAS_RESERVAS_APROBADAS_URL);
            console.log("Respuesta del servidor:", response);
    
            if (response.status === 200 && response.data) {
                console.log("Datos recibidos:", response.data);
                setReservas(response.data);
            } else {
                console.log("Error en la respuesta:", response);
                setErrMsg('Error al obtener las reservas aprobadas');
            }
        } catch (err: any) {
            console.error("Error en la solicitud:", err);
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            }
        } finally {
            setCargando(false);
        }
    };    

    const devolverReserva = async (id: string): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await apiRevista.patch<{ message: string }>(`${DEVOLVER_RESERVA_URL}/${id}`);

            if (response.status === 200) {
                return { success: true, message: response.data.message || 'Reserva devuelta con éxito' };
            } else {
                return { success: false, message: 'Error al devolver la reserva' };
            }
        } catch (err: any) {
            if (!err?.response) {
                return { success: false, message: 'Sin respuesta del servidor' };
            }
            return { success: false, message: err.response.data?.message || 'Error desconocido' };
        }
    };

    return { 
        errMsg, 
        reservas, 
        pedirTodasLasReservas, 
        devolverReserva, 
        cargando 
    };
};

export default useReservaAprobada;
