import { useState, useEffect } from 'react';
import apiRevista from '../api/apiRevista';
import { tipoReserva } from '../tipos/Reserva'; 

const useReservas = (usuarioId: string | undefined) => {
    const [reservas, setReservas] = useState<tipoReserva[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!usuarioId) {
            setError('El ID del usuario no está disponible.');
            setLoading(false);
            return;
        }

        const fetchReservas = async () => {
            try {
                const response = await apiRevista.get<tipoReserva[]>(`/reserva/usuario/${usuarioId}`);
                const reservas = response.data.map((reserva) => ({
                    ...reserva,
                    fechaAprobacion: reserva.fechaAprobacion ? new Date(reserva.fechaAprobacion) : null,
                    fechaPedirReserva: new Date(reserva.fechaPedirReserva),
                    fechaRechazo: reserva.fechaRechazo ? new Date(reserva.fechaRechazo) : null,
                }));
                setReservas(reservas);
            } catch (err: any) {
                setError(err.response?.data?.message || 'No se pudieron cargar las reservas.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [usuarioId]);

    return { reservas, loading, error };
};

export default useReservas;
