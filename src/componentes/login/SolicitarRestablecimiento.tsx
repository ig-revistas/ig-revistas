import { useState } from 'react';
import apiRevista from '../../api/apiRevista';
import './SolicitarRestabecimiento.css'

const SolicitarRestauracion = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await apiRevista.post<{ message: string }>('/solicitar-restablecimiento', { email });
            setMessage(response.data.message); 
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error al enviar el enlace de restauración.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="solicitar-restauracion-container"> 
            <h2>Restaurar Contraseña</h2>
            <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>

            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        className="input-field" 
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="submit-btn" disabled={loading}> 
                        {loading ? 'Enviando...' : 'Enviar enlace de Restauración'}
                    </button>
                </div>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SolicitarRestauracion;
