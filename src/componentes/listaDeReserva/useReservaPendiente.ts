import { useState } from "react";
import apiRevista from "../../api/apiRevista";
import {  tipoReserva } from "../../tipos/Reserva";


//___________Url______________
const RECERVA_URL = '/reserva'
const TODAS_LAS_RESERVAS_URL = RECERVA_URL+'/todasLasPendientes';
const RECHAZAR_RECERVA_URL= RECERVA_URL+'/rechazar'
const APROBAR_RECERVA_URL= RECERVA_URL+'/aprobar'
//____________________________


const useReservaPendiente = () => {
    const [errMsg, setErrMsg] = useState<string>(''); 
    const [reservas, setReservas] = useState<tipoReserva[]>([]); 
    const [cargando, setCargando] = useState<boolean>(false);

    const pedirTodasLasReservas = async () => {
        setCargando(true); 
        try {
            const response = await apiRevista.get<tipoReserva[]>(TODAS_LAS_RESERVAS_URL);

            if (response.status === 200 && response.data) {
               
                setReservas(response.data);
            } else {
                setErrMsg('Error al obtener reservas');
            }
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            }
        } finally {
            setCargando(false); 
        }
    };

    const aprobarReserva=async(idRecerba: string, tiempoVigente: number )=>{
        try{
        const aprobarResponce = await apiRevista.put(`${APROBAR_RECERVA_URL}/${idRecerba}/${tiempoVigente}`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }

        })
        if(aprobarResponce.status === 201){
            console.log("La recerava se aprobo con exito.")
        }else{
            console.error("Hubo un problema al aprobar la recerva.")
        }

    }catch(err:any){
        console.error('Error al aprobar la recerva: ', err)
    }

    }
    const rechazarReserva=async(id_Recerva: string)=>{

        try{
            const rechazarResponce = await apiRevista.put(`${RECHAZAR_RECERVA_URL}/${id_Recerva}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            
            if(rechazarResponce.status === 201){
                console.log("Reserva rechazada con exito")
            }else {
                console.error("Hubo problema al rechazar la reserva.")
            }
        }catch (err: any){
            console.error("Error al rechazar la reserva: ", err)
        }
    }
    return { errMsg, reservas, pedirTodasLasReservas, cargando ,aprobarReserva, rechazarReserva};
};

export default useReservaPendiente;
