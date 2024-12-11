import { useState } from "react";
import apiRevista from "../../api/apiRevista"

const REPORTE='/sistema/reporte'
type tipoReporte = {
    revistasTotales: number;
    reservasTotales: number;
};

const useReporte=()=>{
    const [errMsg, setErrMsg] = useState<string>(''); 
    const [reporte, setReporte] =useState<tipoReporte>()
    const pedirReporte=async()=>{
        try{
            const response =await apiRevista.get<tipoReporte>(REPORTE);
                if(response.status===200 && response.data){
                    setReporte(response.data);
                }else{
                    setErrMsg('Error al obtener el reporte')
                }
        }catch (err:any){
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            }
        }
    }
    return {errMsg, reporte, pedirReporte}
}
export default useReporte;