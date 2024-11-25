import { useState } from "react";
import apiRevista from "../../../api/apiRevista";
import { EstadoReserva, tipoReserva } from "../../../tipos/Reserva";


//___________Url______________
const RECERVA_URL = '/reserva'
const TODAS_LAS_RESERVAS_URL = RECERVA_URL+'/todasLasPendientes';
const USUARIO_URL ='/usuario/';
const REVISTA_URL ='/revistas/';
const RECHAZAR_RECERVA_URL= RECERVA_URL+'/rechazar'
const APROBAR_RECERVA_URL= RECERVA_URL+'/aprobar'
//____________________________
export interface tipoReservaConDetalles{
    id: string;
    tiempoVigente: number | null;
    fechaAprobacion: string | null;
    fechaPedirReserva: string;
    fechaRechazo: string | null;
    estado: EstadoReserva;
    usuario: usuarioInfo,
    revista: revistaInfo
}
interface usuarioInfo{
    id:string,
    email: string,
}
interface revistaInfo{
    id: string,
    titulo: string,
}


const useReservaPendiente = () => {
    const [errMsg, setErrMsg] = useState<string>(''); 
    const [reservas, setReservas] = useState<tipoReservaConDetalles[]>([]); 
    const [cargando, setCargando] = useState<boolean>(false);

    const pedirTodasLasReservas = async () => {
        setCargando(true); 
        try {
            const response = await apiRevista.get<tipoReserva[]>(TODAS_LAS_RESERVAS_URL);
            if (response.status === 200 && response.data) {
                const reservaConDetalles = await obtenerDetalles(response.data);
                setReservas(reservaConDetalles);
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

    const obtenerDetalles=async(reservas: tipoReserva[])=>{
        try{
            const obtenerDetalles = await Promise.all(reservas.map(async(reserva) =>{
                const usuarioResponce = await apiRevista.get<usuarioInfo>(`${USUARIO_URL}${reserva.usuario}`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                })
                console.log(usuarioResponce.data)
                const revistaResponce = await apiRevista.get<revistaInfo>(`${REVISTA_URL}${reserva.revista}`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                })
                console.log("id revista: "+revistaResponce.data.id)
                console.log("id usuario: "+usuarioResponce.data.id)
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
                        id:revistaResponce.data.id,
                        titulo:revistaResponce.data.titulo,
                    },
                }
            }))
            return obtenerDetalles;
        }catch (err: any) {
            setErrMsg('Error al obtener detalles de reservas');
            return [];
        }
    }
    const aprobarRecerva=async(id_recerba: string, tiempoVigente: number )=>{
        try{
        const aprobarResponce = await apiRevista.put(`${APROBAR_RECERVA_URL}/${id_recerba}/${tiempoVigente}`,{
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
    const rechazarRecerva=async(id_Recerva: string)=>{

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
    return { errMsg, reservas, pedirTodasLasReservas, cargando ,aprobarRecerva, rechazarRecerva};
};

export default useReservaPendiente;
