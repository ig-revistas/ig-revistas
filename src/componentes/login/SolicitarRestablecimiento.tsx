import { useState } from 'react';
import axios from 'axios';

const SolicitarRestauracion = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/solicitar-restauracion', { email });
            setMessage(response.data);  
        } catch (error: any) {
            setMessage(error.response?.data || 'Error al enviar el enlace de restauración.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Restaurar Contraseña</h2>
            <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar enlace de Restauración'}
                    </button>
                </div>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default SolicitarRestauracion;
