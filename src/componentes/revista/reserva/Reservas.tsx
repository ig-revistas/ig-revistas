import React, { useContext } from 'react';
import AuthContext from '../../../context/authprovider';
import useReservas from '../../../hooks/useReservas';

const Reservas = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <p>Error: Contexto de autenticación no disponible.</p>;
    }

    const { auth } = authContext;
    const usuarioId = auth.user?.id;

    if (!auth.isLoggedIn) {
        return <p>Por favor, inicia sesión para ver tus reservas.</p>;
    }

    if (!usuarioId) {
        return <p>Error: El ID del usuario no está disponible.</p>;
    }

    const { reservas, loading, error } = useReservas(usuarioId);

    if (loading) return <p>Cargando reservas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Mis Reservas</h2>
            {reservas.length > 0 ? (
                <ul>
                    {reservas.map((reserva) => (
                        <li key={`${reserva.usuario}-${reserva.revista.id}`}>
                            {reserva.portadaRevista && (
                                <img
                                    src={reserva.portadaRevista}
                                    alt={`Portada de la revista ${reserva.revista.titulo}`}
                                    style={{ width: '150px', height: '200px' }}
                                />
                            )}
                            <p>
                                <strong>Revista:</strong> {reserva.revista.titulo}
                            </p>
                            <p>
                                <strong>Estado:</strong> {reserva.estado}
                            </p>
                            <p>
                                <strong>Fecha de Solicitud:</strong> {new Date(reserva.fechaPedirReserva).toLocaleDateString()}
                            </p>
                            {reserva.fechaAprobacion && (
                                <p>
                                    <strong>Fecha de Aprobación:</strong> {new Date(reserva.fechaAprobacion).toLocaleDateString()}
                                </p>
                            )}
                            {reserva.fechaRechazo && (
                                <p>
                                    <strong>Fecha de Rechazo:</strong> {new Date(reserva.fechaRechazo).toLocaleDateString()}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes reservas registradas.</p>
            )}
        </div>
    );
};

export default Reservas;
