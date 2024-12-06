import React, { useState } from 'react';
import apiRevista from '../../../api/apiRevista';
import './Settings.css';

const Settings: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUploadCover = async () => {
        if (!selectedFile) {
            setMessage('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('portada', selectedFile);

        try {
            const response = await apiRevista.post('/subir-portada', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage('Foto de portada subida con éxito.');
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            setMessage('Error al subir la portada.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="settings-container">
            <h1>Configuración</h1>
            <ul className="settings-options">
                <li className="settings-item">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button onClick={handleUploadCover}>Subir Portada</button>
                </li>
            </ul>
            {message && <p className="settings-message">{message}</p>}
        </div>
    );
};

export default Settings;
