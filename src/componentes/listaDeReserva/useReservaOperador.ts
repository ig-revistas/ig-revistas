import { useState } from "react";
import apiRevista from "../../api/apiRevista";
import {  tipoReserva } from "../../tipos/Reserva";


//___________Url______________
const RECERVA_URL = '/reserva'
const TODAS_LAS_RESERVAS_URL = RECERVA_URL+'/todasLasPendientes';
const RECHAZAR_RECERVA_URL= RECERVA_URL+'/rechazar'
const APROBAR_RECERVA_URL= RECERVA_URL+'/aprobar'
//____________________________
/*
export interface tipoReservaConDetalles{
    id: string;
    tiempoVigente: number | null;
    fechaAprobacion: Date | null;
    fechaPedirReserva: Date;
    fechaRechazo: Date | null;
    estado: EstadoReserva;
    usuario: usuarioInfo,
    revista: revistaInfo;
}
interface usuarioInfo{
    id:string,
    email: string,
}
interface revistaInfo{
    id: string,
    titulo: string,
    estadoRevista: EstadoRevista,
}
*/

const useReservaPendiente = () => {
    const [errMsg, setErrMsg] = useState<string>(''); 
    const [reservas, setReservas] = useState<tipoReserva[]>([]); 
    const [cargando, setCargando] = useState<boolean>(false);

    const pedirTodasLasReservas = async () => {
        setCargando(true); 
        try {
            const response = await apiRevista.get<tipoReserva[]>(TODAS_LAS_RESERVAS_URL);

            if (response.status === 200 && response.data) {
                //const reservaConDetalles = await obtenerDetalles(response.data);
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
/*
    const obtenerDetalles=async(reservas: tipoReserva[])=>{
        try{
            const obtenerDetalles = await Promise.all(reservas.map(async(reserva) =>{
                const usuarioResponce = await apiRevista.get<usuarioInfo>(`${USUARIO_URL}${reserva.usuario}`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                })
                
                return{
                    id:reserva.id,
                    tiempoVigente: reserva.tiempoVigente,
                    fechaAprobacion: reserva.fechaAprobacion,
                    fechaPedirReserva: reserva.fechaPedirReserva,
                    fechaRechazo: reserva.fechaRechazo,
                    estado: reserva.estado,
                    usuario:{
                        id:usuarioResponce.data.id,
                        email:usuarioResponce.data.email,
                    },
                    revista:{
                        id:reserva.revista.id,
                        titulo:reserva.revista.titulo,
                        estadoRevista:reserva.revista.estado,
                    },
                }
            }))
            return obtenerDetalles;
        }catch (err: any) {
            setErrMsg('Error al obtener detalles de reservas');
            return [];
        }
    }
*/
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
