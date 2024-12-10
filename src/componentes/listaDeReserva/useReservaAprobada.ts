import { useState } from "react";
import apiRevista from "../../api/apiRevista";
import { tipoReserva } from "../../tipos/Reserva";

//___________Url______________
const RECERVA_URL = '/reserva';
const TODAS_LAS_RESERVAS_APROBADAS_URL = RECERVA_URL+'/todasLasAprobadas'; // Nueva URL para obtener reservas aprobadas
//____________________________

const useReservaAprobada = () => {
    const [errMsg, setErrMsg] = useState<string>(''); 
    const [reservas, setReservas] = useState<tipoReserva[]>([]); 
    const [cargando, setCargando] = useState<boolean>(false);

    const pedirTodasLasReservasAprobadas = async () => {
        setCargando(true); 
        try {
            const response = await apiRevista.get<tipoReserva[]>(TODAS_LAS_RESERVAS_APROBADAS_URL);

            if (response.status === 200 && response.data) {
                setReservas(response.data);
            } else {
                setErrMsg('Error al obtener las reservas aprobadas');
            }
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            }
        } finally {
            setCargando(false); 
        }
    };

    return { errMsg, reservas, pedirTodasLasReservasAprobadas, cargando };
};

export default useReservaAprobada;
