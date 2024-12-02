import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/authprovider';

const CambiarFotoPerfil: React.FC = () => {
    const [archivo, setArchivo] = useState<File | null>(null);
    const [mensaje, setMensaje] = useState<string>('');
    const authContext = useContext(AuthContext);

    const manejarArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setArchivo(event.target.files[0]);
        }
    };

    const actualizarFoto = async () => {
        if (!archivo) {
            setMensaje('Por favor, selecciona un archivo.');
            return;
        }

        try {
            const urlDeLaFoto = await subirFotoAlServidor(archivo);
            authContext?.actualizarFotoPerfil(urlDeLaFoto);
            setMensaje('Foto de perfil actualizada con éxito.');
        } catch (error) {
            setMensaje('Error al actualizar la foto de perfil.');
            console.error('Error:', error);
        }
    };

    const subirFotoAlServidor = async (archivo: File): Promise<string> => {
        const formData = new FormData();
        formData.append('foto', archivo);

        const respuesta = await fetch('http://localhost:8080/subir-foto', {
            method: 'POST',
            body: formData,
        });

        if (!respuesta.ok) {
            throw new Error('Error al subir la foto al servidor.');
        }

        const data = await respuesta.json();
        return data.fotoUrl;
    };

    return (
        <div>
            <input type="file" onChange={manejarArchivo} />
            <button onClick={actualizarFoto}>Actualizar Foto de Perfil</button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default CambiarFotoPerfil;
