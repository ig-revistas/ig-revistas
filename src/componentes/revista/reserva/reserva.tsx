import React, { useState, useContext } from 'react';
import apiRevista from '../../../api/apiRevista';
import AuthContext from '../../../context/authprovider';

interface ReservaProps {
    revista: string;
}

const Reserva: React.FC<ReservaProps> = ({ revista }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.auth.isLoggedIn;

    const handleReserva = async () => {
        if (!isLoggedIn) {
            setErrorMsg('Debes iniciar sesión para reservar una revista.');
            return;
        }
    
        const reservaData = {
            revista,
            usuario: authContext?.auth.user?.id?.toString(), 
            
        };
    
        try {
            const response = await apiRevista.post('/reserva/reservar', reservaData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
    
            if (response.status === 201) {
                setSuccessMsg('¡Reserva realizada con éxito!');
                setErrorMsg('');
            }
        } catch (error: any) {
            setSuccessMsg('');
            if (error.response) {
                setErrorMsg(error.response.data);
            } else {
                setErrorMsg('Hubo un problema al realizar la reserva.');
            }
        }
    };

    return (
        <div className="reserva">
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            {successMsg && <p className="success-message">{successMsg}</p>}
            <button onClick={handleReserva}>Reservar</button>
        </div>
    );
};

export default Reserva;
