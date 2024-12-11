import useReporte from"./useReporte"
import "./Reporte.css"
import { useEffect } from "react";

const Reporte=()=>{
const { pedirReporte,
        errMsg,
        reporte}= useReporte();
useEffect(()=>{
    pedirReporte();
}, []);
return (
    <div className="reporte-contenedor">
        <h2>Reporte</h2>
        {errMsg && <p className="error">{errMsg}</p>}
        <div className="circulo circulo-revista-totales">
            <div className="texto">
                Revistas totales {reporte?.revistasTotales}
            </div>
        </div>
        <div className="circulo circulo-reservas-totales">
            <div className="texto">
                Reservas totales {reporte?.reservasTotales}
            </div>
        </div>
    </div>
)

}
export default Reporte;