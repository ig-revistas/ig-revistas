import React,{ useState }  from "react";
import useRevistaNew from "../../hooks/useRevistaNew";



const RevistaForm: React.FC=()=>{
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
    }=useRevistaNew();

    const [errores, setErrores]= useState<String[]>([]);
    const categorias=['Cinecia','Tecnología','Arte','Historia','Entretenimiento'];

    const validacionForm=()=>{
        const nuevosErrores: string[]=[];
        
        if(titulo.length<3){
            nuevosErrores.push('El titulo debe de tener mas de 3 caracteres.')
        }
        if(editorial.length>50){
            nuevosErrores.push('La editorial no pude contener mas de 50 caracteres')
        }
        if(!categoria){
            nuevosErrores.push('Debe de seleccionar una categoria.')
        }
        if(autor.length ===0){
            nuevosErrores.push('El campo autor es obligatorio')
        }
        if(ejemplares<1){
            nuevosErrores.push('Debe de haber 1 o mas ejemplares')
        }
        if(fechaDePublicacion && new Date(fechaDePublicacion) > new Date){
            nuevosErrores.push('La fecha de publicacion debe ser anterior o igual a la actual')
        }
        if(descripcion.length>200){
            nuevosErrores.push('La descripcion no puede contener mas de 200 caracteres.')
        }
        setErrores(nuevosErrores);
        return nuevosErrores.length ===0;
    }
    const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validacionForm()) {
            try {
                await manejarEnvio(e);
                console.log('Datos enviados:', { titulo, editorial, categoria, autor, ejemplares, fechaDePublicacion, descripcion, estado });
                resetFormulario();
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
        }
    };

    const resetFormulario = () => {
        setTitulo('');
        setEditorial('');
        setCategoria('');
        setEjemplares(1);
        setFechaDePublicacion('');
        setDescripcion('');
        setAutor(''),
        
        setErrores([]);
    };

    return (
        <form onSubmit={enviarFormulario} className="revista-form">
            <h2>Crear Nueva Revista</h2>
            {errores.length > 0 && (
                <div className="errores">
                    {errores.map((error, index) => (
                        <p key={index} className="error">{error}</p>
                    ))}
                </div>
            )}
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
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </label>
            <label>
                Autor:
                <input 
                    type="text"
                    value={autor}
                    onChange={(e)=> setAutor(e.target.value)}
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
            <button type="submit">Crear Revista</button>
            <button type="button" onClick={resetFormulario}>Cancelar</button>
        </form>
    );
};

export default RevistaForm;