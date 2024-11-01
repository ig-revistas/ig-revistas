import React, { useState } from "react";
import useRevistaNew from "../../hooks/useRevistaNew";
import { Estado } from "../../modelo/tipoRevista";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../css/RevistaForm.css';

const CATEGORIAS = ['Ciencia', 'Tecnología', 'Arte', 'Historia', 'Entretenimiento', 'Deporte'];

const RevistaForm: React.FC = () => {
    const {
        revista,
        setRevista,
        manejarEnvio,
        errMsg,
    } = useRevistaNew();

    const [portada, setPortada] = useState<File | null>(null);
    const [errores, setErrores] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const validarFormulario = () => {
        const nuevosErrores: string[] = [];
        
        if (revista?.titulo.trim().length < 3) nuevosErrores.push('El título debe tener más de 3 caracteres.');
        if (revista?.editorial.length > 50) nuevosErrores.push('La editorial no puede contener más de 50 caracteres.');
        if (!revista?.categoria) nuevosErrores.push('Debe seleccionar una categoría.');
        if (!revista?.autor.trim()) nuevosErrores.push('El campo autor es obligatorio.');
        if (revista?.ejemplares < 1) nuevosErrores.push('Debe haber 1 o más ejemplares.');
        if (revista?.fechaDePublicacion && new Date(revista?.fechaDePublicacion) > new Date()) {
            nuevosErrores.push('La fecha de publicación debe ser anterior o igual a la actual.');
        }
        if (revista?.descripcion.length > 200) nuevosErrores.push('La descripción no puede contener más de 200 caracteres.');
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
            const revistaData = {
                autor: revista.autor,
                titulo: revista.titulo,
                categoria: revista.categoria,
                descripcion: revista.descripcion,
                editorial: revista.editorial,
                estado: revista.estado,
                cantidad_disponible: revista.ejemplares, 
                fecha_publicacion: revista.fechaDePublicacion,
            };
    
            formData.append(
                'revista', 
                new Blob([JSON.stringify(revistaData)], { type: 'application/json' })
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
        setRevista({
            id: 0,
            titulo: '',
            autor: '',
            categoria: '',
            editorial: '',
            descripcion: '',
            portadaUrl: '',
            estado: Estado.DISPONIBLE,
            fechaDePublicacion: '',
            ejemplares: 1
        });
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
                    value={revista?.titulo || ''}
                    onChange={(e) => setRevista({ ...revista, titulo: e.target.value })}
                    required
                    placeholder="Mínimo 3 caracteres"
                />
            </label>

            <label>
                Editorial:
                <input
                    type="text"
                    value={revista?.editorial || ''}
                    onChange={(e) => setRevista({ ...revista, editorial: e.target.value })}
                    placeholder="Hasta 50 caracteres"
                />
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
            </label>

            <label>
                Autor:
                <input 
                    type="text"
                    value={revista?.autor || ''}
                    onChange={(e) => setRevista({ ...revista, autor: e.target.value })}
                    required
                />
            </label>

            <label>
                Ejemplares Disponibles:
                <input
                    type="number"
                    value={revista?.ejemplares || 1}
                    onChange={(e) => setRevista({ ...revista, ejemplares: parseInt(e.target.value)})}
                    min="1"
                    required
                />
            </label>

            <label>
                Fecha de Publicación:
                <input
                    type="date"
                    value={revista?.fechaDePublicacion || ''}
                    onChange={(e) => setRevista({ ...revista, fechaDePublicacion: e.target.value })}
                />
            </label>

            <label>
                Descripción:
                <textarea
                    value={revista?.descripcion || ''}
                    onChange={(e) => setRevista({ ...revista, descripcion: e.target.value })}
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
