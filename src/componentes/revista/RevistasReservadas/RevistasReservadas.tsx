import React, { useContext } from 'react';
import AuthContext from '../../../context/authprovider';
import useReservas from '../../../hooks/useReservas';
import { Revista } from '../../../tipos/Revista'; 
import './RevistasReservadas.css'; 

const RevistasReservadas: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <p>Error: Contexto de autenticación no disponible.</p>;
    }

    const { auth } = authContext;
    const usuarioId = auth.user?.id;

    if (!auth.isLoggedIn) {
        return <p>Debes iniciar sesión para ver tus reservas.</p>;
    }

    if (!usuarioId) {
        return <p>Error: El ID del usuario no está disponible.</p>;
    }

    const { reservas, loading, error } = useReservas(usuarioId);

    if (loading) {
        return <p>Cargando reservas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mis-reservas-container">
            <h2>Mis Revistas Reservadas</h2>
            {reservas.length === 0 ? (
                <p>No tienes revistas reservadas.</p>
            ) : (
                <div className="revistas-grid">
                    {reservas.map((reserva) => {
                        console.log(`Portada URL: ${reserva.revista.portadaUrl}`);
                        return (
                            <div key={reserva.revista.id} className="revista-card">
                                {reserva.revista.portadaUrl ? (
                                    <img
                                        src={`http://localhost:8080/revistas${reserva.revista.portadaUrl}`}
                                        alt={`Portada de ${reserva.revista.titulo}`}
                                        className="revista-portada"
                                    />
                                ) : (
                                    <p>Imagen no disponible</p>
                                )}
                                <p><strong>Título:</strong> {reserva.revista.titulo}</p>
                                <p><strong>Estado:</strong> {reserva.estado}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RevistasReservadas;
