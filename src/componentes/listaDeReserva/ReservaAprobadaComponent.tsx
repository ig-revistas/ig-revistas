import { useEffect } from "react";
import useReservaAprobada from "../../hooks/useReservaAprobada"; 
import Swal from 'sweetalert2';
import apiRevista from "../../api/apiRevista"; 
import "./listaReservaOperador.css";

const ReservaAprobadaComponent = () => {
    const { pedirTodasLasReservas,
            errMsg, 
            reservas,
            cargando } = useReservaAprobada(); 

    useEffect(() => {
        pedirTodasLasReservas(); 
    }, []);

    const cartelDeExito = (estado: string) => {
        Swal.fire("Éxito", "Reserva " + estado + " exitosamente.", "success");
    };

    const manejarDevolverReserva = async (idReserva: string, usuarioNombre: string) => {
        Swal.fire({
            title: "¿Está seguro de devolver la reserva?",
            text: `¿Está seguro de devolver la reserva de ${usuarioNombre}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, devolver",
            cancelButtonText: "No, continuar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token'); 
                    const response = await apiRevista.put<{ message: string }>(
                        `/reserva/devolver/${idReserva}`,
                        {}, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    if (response.status === 200) {
                        const message = typeof response.data === 'string' ? response.data : response.data.message || 'Reserva devuelta con éxito';
                        cartelDeExito(message);
                        pedirTodasLasReservas(); 
                    } else {
                        Swal.fire("Error", response.data?.message || "Error desconocido", "error");
                    }
                } catch (err: any) {
                    Swal.fire("Error", "Error al devolver la reserva", "error");
                    console.error("Error al llamar al endpoint de devolver reserva:", err);
                }
            }
        });
    };

    return (
        <div className="listado-reserva__contenedor">
            <div className="listado-reserva__header">
                <h1>Lista de reservas Aprobadas</h1>
                {cargando && <p>Cargando...</p>}
                {errMsg && <p className="error">{errMsg}</p>}
            </div>
            <div className="listado-reserva__tabla">
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Revista</th>
                        <th>Estado de la Revista</th>
                        <th>Fecha de la petición</th>
                        <th>Acciones</th> 
                    </tr>
                </thead>
                <tbody>
                    {reservas && reservas.map((reserva) => {
                        return (
                            <tr key={reserva.id}>
                                <td>{reserva.mailUsuario}</td>
                                <td>{reserva.tituloRevista}</td>
                                <td>{reserva.estadoRevista}</td>
                                <td>{reserva.fechaPedirReserva.toString()}</td>
                                <td>
                                    <button 
                                        onClick={() => manejarDevolverReserva(reserva.id, reserva.mailUsuario)} 
                                        className="listado-reserva__boton--devolver">
                                        Devolver
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ReservaAprobadaComponent;
