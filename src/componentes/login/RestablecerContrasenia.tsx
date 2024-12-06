import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios  from 'axios';  

const RestablecerContrasenia = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();
        try {
            const response: AxiosResponse<string> = await axios.post('/restablecer-contrasenia', { token, password });
            setMessage(response.data);
        } catch (error: any) {  
            setMessage(error.response?.data || 'Error al actualizar la contraseña.');
        }
    };

    return (
        <div className="actualizar-contrasenia-container">
            <h2>Actualizar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Actualizar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RestablecerContrasenia;
