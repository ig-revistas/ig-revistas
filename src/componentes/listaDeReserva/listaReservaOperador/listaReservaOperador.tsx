import  { useEffect } from "react";
import useReservaPendiente from "./useReservaOperador";
import Swal from 'sweetalert2';
import "./listaReservaOperador.css"




const ReservaComponent = () => {
    const { pedirTodasLasReservas,
            aprobarRecerva,
            rechazarRecerva, 
            errMsg, 
            reservas,
            cargando } = useReservaPendiente();

    useEffect(() => {
        pedirTodasLasReservas();
    }, []); 
    const cartelDeExito=(estado: string)=>{
        Swal.fire("Éxito", "Reserva "+estado+" exitosamente.", "success");
    }
    const cartelWarningEstado=(estado: string, usuarioNombre: string, callback: () => void)=>{
        Swal.fire({
            title : "Advertencia",
            text:"¿Estas seguro de "+ estado+" la reserva de "+ usuarioNombre+" ?", 
            icon:"warning",
            showCancelButton: true,
            cancelButtonText: 'No, continuar',
            confirmButtonText: 'Sí, estoy seguro',
            
        }).then((result) => {
            if (result.isConfirmed) {
                callback(); 
            }
        });
             
    }
        
    const manejarAprobarRecerva=(id:string, usuarioNombre:string)=>{
       Swal.fire({
            title:"Especifique el tiempo vigente",
            text:`¿Cuantos dias tendra el usuario ${usuarioNombre} para devolver la revista?`,
            input: "text",
            inputAttributes:{
                inputmode:"numeric",
                placeholder:"Ingrese un numero."
            },
            showCancelButton:true,
            confirmButtonText:"Aceptar",
            cancelButtonText:"Cancelar",
            inputValidator: (value)=>{
                if(!value|| parseInt(value)<=0){
                    return "Debe ingresar un numero mayor a 0";
                }
            }
       }).then(async (result)=>{
                if(result.isConfirmed){
                    const tiempoVigente = parseInt(result.value);
                    cartelWarningEstado("aprobar",usuarioNombre ,async()=>{
                    
                        await aprobarRecerva(id, tiempoVigente)
                        cartelDeExito("aprobada")
                        pedirTodasLasReservas();
                        })
                }
            })
    }
    const manejarRechazarRecerva=(id:string, usuarioNombre:string)=>{
        cartelWarningEstado("rechazar", usuarioNombre,async()=>{
            await rechazarRecerva(id)
            cartelDeExito("rechazada")
            pedirTodasLasReservas();
            })
    }
    return (
        
        <div className="listado-reserva__contenedor">
            <div className="listado-reserva__header">
                <h1>Lista de reservas 'Pendientes'</h1>
                {cargando && <p>Cargando...</p>} 
                {errMsg && <p className="error">{errMsg}</p>} 
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Revista</th>
                        <th>Fecha de la petición</th>
                        <th>Estado</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                    {reservas && reservas.map((reserva) => {
                        console.log("Reserva: ", reserva); 
                        return ( 
                            <tr key={reserva.id}>
                                <td>{reserva.usuario.email}</td>
                                <td>{reserva.revista.titulo}</td>
                                <td>{reserva.fechaPedirReserva.toString()}</td>
                                <td>{reserva.estado}</td>
                                
                                <td>
                                    <button onClick={() => manejarAprobarRecerva(reserva.id, reserva.usuario.email)} className="listado-reserva__boton--aprobar">
                                        Aprobar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => manejarRechazarRecerva(reserva.id, reserva.usuario.email)} className="listado-reserva__boton--rechazar">
                                        Rechazar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ReservaComponent;
