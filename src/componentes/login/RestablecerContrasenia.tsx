import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiRevista from '../../api/apiRevista'; 
import Swal from 'sweetalert2';
import './RestablecerContrasenia.css';

const RestablecerContrasenia = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string>('');
    const token = searchParams.get('token');
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();
        try {
            const response = await apiRevista.post<{ message: string }>('/restablecer-contrasenia', { token, password });
            setMessage(response.data.message);  

            Swal.fire({
                title: 'Contraseña Actualizada',
                text: 'Tu contraseña ha sido actualizada con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/login');
            });

        } catch (error: any) {  
            setMessage(error.response?.data?.message || 'Error al actualizar la contraseña.');

            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar la contraseña. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="restablecer-contrasenia-container">
            <h2>Actualizar Contraseña</h2>
            <form className="form" onSubmit={handleSubmit}> 
                <div className="field">
                    <input
                        className="input-field" 
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="submit-btn"> 
                        Actualizar
                    </button>
                </div>
            </form>
            {message && <p className="message">{message}</p>} 
        </div>
    );
};

export default RestablecerContrasenia;
