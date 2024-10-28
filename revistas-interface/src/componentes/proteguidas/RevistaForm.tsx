import React, { useState } from "react";
import useRevistaNew from "../../hooks/useRevistaNew";
import { Estado } from "../../hooks/useRevistaNew";
import '../../css/RevistaForm.css';

const CATEGORIAS = ['Ciencia', 'Tecnología', 'Arte', 'Historia', 'Entretenimiento', 'Deporte'];

const RevistaForm: React.FC = () => {
    const {
        titulo,
        setTitulo,
        editorial,
        setEditorial,
        categoria,
        setCategoria,
        autor,
        setAutor,
        ejemplares,
        setEjemplares,
        fechaDePublicacion,
        setFechaDePublicacion,
        descripcion,
        setDescripcion,
        estado,
        setEstado,
        manejarEnvio,
        errMsg,
    } = useRevistaNew();

    const [portada, setPortada] = useState<File | null>(null);
    const [errores, setErrores] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const validarFormulario = () => {
        const nuevosErrores: string[] = [];
        if (titulo.trim().length < 3) nuevosErrores.push('El título debe tener más de 3 caracteres.');
        if (editorial.length > 50) nuevosErrores.push('La editorial no puede contener más de 50 caracteres.');
        if (!categoria) nuevosErrores.push('Debe seleccionar una categoría.');
        if (!autor.trim()) nuevosErrores.push('El campo autor es obligatorio.');
        if (ejemplares < 1) nuevosErrores.push('Debe haber 1 o más ejemplares.');
        if (fechaDePublicacion && new Date(fechaDePublicacion) > new Date()) {
            nuevosErrores.push('La fecha de publicación debe ser anterior o igual a la actual.');
        }
        if (descripcion.length > 200) nuevosErrores.push('La descripción no puede contener más de 200 caracteres.');
        if (!portada) nuevosErrores.push('Debe subir una portada para la revista.');

        setErrores(nuevosErrores);
        return nuevosErrores.length === 0;
    };

    const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        setLoading(true);
    
        try {
            const formData = new FormData();
            formData.append(
                'revista',
                new Blob([JSON.stringify({
                    autor,
                    titulo,
                    categoria,
                    descripcion,
                    editorial,
                    estado,
                    cantidad_disponible: ejemplares,
                    fecha_publicacion: fechaDePublicacion,
                })], { type: 'application/json' }) // Asegúrate de que el tipo sea JSON
            );
            if (portada) formData.append('portada', portada);
    
            await manejarEnvio(formData);
            resetFormulario();
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetFormulario = () => {
        setTitulo('');
        setEditorial('');
        setCategoria('');
        setAutor('');
        setEjemplares(1);
        setFechaDePublicacion('');
        setDescripcion('');
        setEstado(Estado.DISPONIBLE);
        setPortada(null);
        setErrores([]);
    };

    return (
        <form onSubmit={enviarFormulario} className="revista-form" aria-live="polite">
            <h2>Crear Nueva Revista</h2>

            {errores.length > 0 && (
                <div className="errores">
                    {errores.map((error, index) => (
                        <p key={index} className="error">{error}</p>
                    ))}
                </div>
            )}

            {errMsg && <p className="error" aria-live="assertive">{errMsg}</p>}

            <label>
                Título:
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    placeholder="Mínimo 3 caracteres"
                />
            </label>

            <label>
                Editorial:
                <input
                    type="text"
                    value={editorial}
                    onChange={(e) => setEditorial(e.target.value)}
                    placeholder="Hasta 50 caracteres"
                />
            </label>

            <label>
                Categoría:
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
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
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                />
            </label>

            <label>
                Ejemplares Disponibles:
                <input
                    type="number"
                    value={ejemplares}
                    onChange={(e) => setEjemplares(Number(e.target.value))}
                    min="1"
                    required
                />
            </label>

            <label>
                Fecha de Publicación:
                <input
                    type="date"
                    value={fechaDePublicacion}
                    onChange={(e) => setFechaDePublicacion(e.target.value)}
                />
            </label>

            <label>
                Descripción:
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    maxLength={200}
                    placeholder="Máximo 200 caracteres"
                />
            </label>

            <label>
                Portada:
                <input
                    type="file"
                    onChange={(e) => e.target.files && setPortada(e.target.files[0])}
                    accept="image/*"
                />
            </label>

            <button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Crear Revista'}
            </button>
            <button type="button" onClick={resetFormulario}>Cancelar</button>
        </form>
    );
};

export default RevistaForm;
