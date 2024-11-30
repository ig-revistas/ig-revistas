import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiRevista from '../../api/apiRevista'; 
import { Revista } from '../../tipos/Revista'; 
import useRevistaNew from '../../hooks/useRevistaNew';
import './EditarRevistaForm.css';

const CATEGORIAS = ['Ciencia', 'Tecnología', 'Arte', 'Historia', 'Entretenimiento', 'Deporte'];

const EditarRevistaForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { revista, setRevista, manejarEnvio, errMsg } = useRevistaNew(true);
    const [portada, setPortada] = useState<File | null>(null);
    const [errores, setErrores] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        console.log(id);
        if (id) {
            apiRevista
                .get<Revista>(`/revistas/${id}`)
                .then((response) => {
                    setRevista(response.data); 
                })
                .catch((error) => {
                    console.error(error);
                    setErrores({ ...errores, general: 'No se pudo cargar la revista' });
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (revista) {
            setRevista((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setPortada(file);
    };

    const enviarFormulario = async (e: React.FormEvent,id:string) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('revista', new Blob([JSON.stringify(revista)], { type: 'application/json' }));
        if (portada) {
            formData.append('portada', portada);
        }
    
        try {
            await manejarEnvio(formData, id);
            navigate('/revistas');
        } catch (error) {
            setErrores({ ...errores, general: 'Error al actualizar la revista' });
        }
    };

    return (
        <div>
            <form onSubmit={x=>enviarFormulario(x,revista.id)}className="editar-revista-form" aria-live="polite">
                <h2>Editar Revista</h2>
                {errMsg && <p className="error">{errMsg}</p>}
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                        value={revista?.titulo || ''}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Editorial:
                    <input
                        type="text"
                        name="editorial"
                        value={revista?.editorial || ''}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Categoría:
                    <select
                        name="categoria"
                        value={revista?.categoria || ''}
                        onChange={handleInputChange}
                        required
                    >
                         <option value="">Seleccionar...</option>
                        {CATEGORIAS.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Autor:
                    <input
                        type="text"
                        name="autor"
                        value={revista?.autor || ''}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Ejemplares Disponibles:
                    <input
                        type="number"
                        name="ejemplares"
                        value={revista?.ejemplares || 1}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </label>
                <label>
                    Fecha de Publicación:
                    <input
                        type="date"
                        name="fechaDePublicacion"
                        value={revista?.fechaDePublicacion || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Descripción:
                    <textarea
                        name="descripcion"
                        value={revista?.descripcion || ''}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                Portada:
    <button
        type="button"
        onClick={() => document.getElementById("portada-input")?.click()}
        className="portada-button"
    >
        <svg
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeWidth="2"
                stroke="#ffffff"
                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                strokeLinejoin="round"
                strokeLinecap="round"
            ></path>
            <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#ffffff"
                d="M17 15V18M17 21V18M17 18H14M17 18H20"
            ></path>
        </svg>
        ADD FILE
    </button>
        <input
            type="file"
            id="portada-input"
            onChange={(e) => e.target.files && setPortada(e.target.files[0])}
            accept="image/*"
            style={{ display: "none" }}
        />
        {errores.portada && <p className="error-mensaje">{errores.portada}</p>}
    </label>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarRevistaForm;