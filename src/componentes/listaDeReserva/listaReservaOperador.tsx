import React, { useState } from "react";
import ReservaPendienteComponent from "./ReservaPendienteComponent";
import ReservaAprobadaComponent from "./ReservaAprobadaComponent";

const ListaReservaOperador: React.FC = () => {
    const [tipoReserva, setTipoReserva] = useState<'pendiente' | 'aprobada'>('pendiente');

    return (
        <div className="lista-reserva__contenedor">
            <div className="listado-reserva__header">
                <button onClick={() => setTipoReserva('pendiente')}>Pendientes</button>
                <button onClick={() => setTipoReserva('aprobada')}>Aprobadas</button>
            </div>

            {tipoReserva === 'pendiente' ? (
                <ReservaPendienteComponent />
            ) : (
                <ReservaAprobadaComponent />
            )}
        </div>
    );
};

export default ListaReservaOperador;
