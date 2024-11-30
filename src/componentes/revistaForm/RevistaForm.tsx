import React, { useState } from "react";
import useRevistaNew from "../../hooks/useRevistaNew";
import { Estado, Revista } from "../../tipos/Revista";
import Swal from 'sweetalert2';
import { Navigate } from "react-router-dom";
import './RevistaForm.css';


const CATEGORIAS = ['Ciencia', 'Tecnología', 'Arte', 'Historia', 'Entretenimiento', 'Deporte'];

const RevistaForm: React.FC = () => {
    const { revista, setRevista, manejarEnvio, errMsg, exito } = useRevistaNew();

    const [portada, setPortada] = useState<File | null>(null);
    const [errores, setErrores] = useState<{ [key: string]: string }>({});

    const [loading, setLoading] = useState(false);

    if (exito) {
        return <Navigate to="/" />;
    }

    const validarFormulario = () => {
        const nuevosErrores: { [key: string]: string } = {};
        if (revista?.titulo.trim().length < 3) nuevosErrores.titulo='El título debe tener más de 3 caracteres.';
        if (revista?.editorial.length > 50) nuevosErrores.editorial='La editorial no puede contener más de 50 caracteres.';
        if (revista?.categoria=='') nuevosErrores.categoria='Debe seleccionar una categoría.';
        if (revista?.autor=='') nuevosErrores.autor='El campo autor es obligatorio.';
        if (revista?.cantidadDisponible < 1) nuevosErrores.cantidadDisponible='Debe haber 1 o más ejemplares.';
        if (revista?.fechaPublicacion && new Date(revista?.fechaPublicacion) > new Date()) {
            nuevosErrores.fechaDePublicacion='La fecha de publicación debe ser anterior o igual a la actual.';
        }
        if (revista?.descripcion.length > 200) nuevosErrores.descripcion='La descripción no puede contener más de 200 caracteres.';
        if (!portada) nuevosErrores.portada='Debe subir una portada para la revista.';
        console.log("Errores:", nuevosErrores);
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        setLoading(true);

        try {
            const formData = new FormData();
            console.log('formData: '+formData)
            const revistaData = {
                autor: revista.autor,
                titulo: revista.titulo,
                categoria: revista.categoria,
                descripcion: revista.descripcion,
                editorial: revista.editorial,
                estado: revista.estado,
                cantidadDisponible: revista.cantidadDisponible,
                fechaPublicacion: revista.fechaPublicacion,
            };
            formData.append('revista', new Blob([JSON.stringify(revistaData)], { type: 'application/json' }));
            if (portada) formData.append('portada', portada);

            await manejarEnvio(formData);
            resetFormulario(true);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            Swal.fire({
                title:"Error",
                text:"Error al crear la revista. Por favor, inténtelo de nuevo." ,
                icon:"error"});
            resetFormulario(false);
        } finally {
            setLoading(false);
        }
    };
    
        

    const resetFormulario = (exito: boolean) => {
        const formularioVacio: Revista = {
            id: '',
            titulo: '',
            autor: '',
            categoria: '',
            editorial: '',
            descripcion: '',
            portadaUrl: '',
            estado: Estado.DISPONIBLE,
            fechaPublicacion: '',
            cantidadDisponible: 1
        }
        if (exito) {
            Swal.fire("Éxito", "Revista creada exitosamente.", "success");
            setRevista(formularioVacio);
            setPortada(null);
            setErrores({});
        } else {
            if (revista.titulo || revista.autor || revista.editorial || revista.categoria || revista.descripcion || portada) {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Perderás todos los datos ingresados",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, cancelar',
                    cancelButtonText: 'No, continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setRevista(formularioVacio);
                        setPortada(null);
                        setErrores({});
                    }
                });
            } else {
                setRevista(formularioVacio);
                setPortada(null);
                setErrores({});
            }
        }
    };

    return (
        <div>
            <form onSubmit={enviarFormulario} className="revista-form" aria-live="polite">
                <h2>Crear Nueva Revista</h2>

               
                {errMsg && <p className="error" aria-live="assertive">{errMsg}</p>}

                <label>
                    Título:
                    <input
                        type="text"
                        value={revista?.titulo || ''}
                        onChange={(e) => setRevista({ ...revista, titulo: e.target.value })}
                        required
                        placeholder="Mínimo 3 caracteres"
                    />
                    {errores.titulo && <p className="error-mensaje">{errores.titulo}</p>}
                </label>

                <label>
                    Editorial:
                    <input
                        type="text"
                        value={revista?.editorial || ''}
                        onChange={(e) => setRevista({ ...revista, editorial: e.target.value })}
                        placeholder="Hasta 50 caracteres"
                    />
                    {errores.editorial && <p className="error-mensaje">{errores.editorial}</p>}
                </label>

                <label>
                    Categoría:
                    <select
                        value={revista?.categoria || ''}
                        onChange={(e) => setRevista({ ...revista, categoria: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar...</option>
                        {CATEGORIAS.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errores.categoria && <p className="error-mensaje">{errores.categoria}</p>}
                </label>

                <label>
                    Autor:
                    <input
                        type="text"
                        value={revista?.autor || ''}
                        onChange={(e) => setRevista({ ...revista, autor: e.target.value })}
                        required
                    />
                    {errores.autor && <p className="error-mensaje">{errores.autor}</p>}
                </label>

                <label>
                    Ejemplares Disponibles:
                    <input
                        type="number"
                        value={revista?.cantidadDisponible || 1}
                        onChange={(e) => setRevista({ ...revista, cantidadDisponible: parseInt(e.target.value) })}
                        min="1"
                        required
                    />
                    {errores.ejemplares && <p className="error-mensaje">{errores.ejemplares}</p>}
                </label>

                <label>
                    Fecha de Publicación:
                    <input
                        type="date"
                        value={revista?.fechaPublicacion || ''}
                        onChange={(e) => setRevista({ ...revista, fechaPublicacion: e.target.value })}
                    />
                    {errores.fechaDePublicacion && <p className="error-mensaje">{errores.fechaDePublicacion}</p>}
                </label>

                <label>
                    Descripción:
                    <textarea
                        value={revista?.descripcion || ''}
                        onChange={(e) => setRevista({ ...revista, descripcion: e.target.value })}
                        maxLength={200}
                        placeholder="Máximo 200 caracteres"
                    />
                    {errores.descripcion && <p className="error-mensaje">{errores.descripcion}</p>}
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


                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Crear Revista'}
                </button>
                <button type="button" onClick={() => resetFormulario(false)}>Cancelar</button>
            </form>
        </div>
    );
};

export default RevistaForm;
