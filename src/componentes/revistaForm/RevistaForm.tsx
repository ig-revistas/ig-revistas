import React, { useState } from "react";
import useRevistaNew from "../../hooks/useRevistaNew";
import { Estado, Revista } from "../../tipos/Revista";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import "./RevistaForm.css";

const CATEGORIAS = [
  "Ciencia",
  "Tecnología",
  "Arte",
  "Historia",
  "Entretenimiento",
  "Deporte",
];

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
    if (!revista?.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio.";
    if (!revista?.autor.trim()) nuevosErrores.autor = "El autor es obligatorio.";
    if (!revista?.editorial.trim()) nuevosErrores.editorial = "La editorial es obligatoria.";
    if (!revista?.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!revista?.categoria) nuevosErrores.categoria = "Debe seleccionar una categoría.";
    if (!revista?.fechaDePublicacion) nuevosErrores.fechaPublicacion = "La fecha de publicación es obligatoria.";
    if (!revista?.ejemplares || revista.ejemplares < 1) nuevosErrores.ejemplares = "Debe indicar una cantidad válida de ejemplares.";
    if (!portada) nuevosErrores.portada = "Debe subir una portada.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("revista", new Blob([JSON.stringify(revista)], { type: "application/json" }));
      if (portada) formData.append("portada", portada);

      await manejarEnvio(formData);
      Swal.fire("Éxito", "Revista creada exitosamente.", "success");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudo crear la revista.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="revista-form-container">
      <form onSubmit={enviarFormulario} className="revista-form">
        <h2>Crear Nueva Revista</h2>

        {errMsg && <p className="error">{errMsg}</p>}

        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            id="titulo"
            type="text"
            value={revista?.titulo || ""}
            onChange={(e) => setRevista({ ...revista, titulo: e.target.value })}
            required
          />
          {errores.titulo && <p className="error-mensaje">{errores.titulo}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor:</label>
          <input
            id="autor"
            type="text"
            value={revista?.autor || ""}
            onChange={(e) => setRevista({ ...revista, autor: e.target.value })}
            required
          />
          {errores.autor && <p className="error-mensaje">{errores.autor}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="editorial">Editorial:</label>
          <input
            id="editorial"
            type="text"
            value={revista?.editorial || ""}
            onChange={(e) => setRevista({ ...revista, editorial: e.target.value })}
            required
          />
          {errores.editorial && <p className="error-mensaje">{errores.editorial}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={revista?.descripcion || ""}
            onChange={(e) => setRevista({ ...revista, descripcion: e.target.value })}
            required
          />
          {errores.descripcion && <p className="error-mensaje">{errores.descripcion}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            value={revista?.categoria || ""}
            onChange={(e) => setRevista({ ...revista, categoria: e.target.value })}
            required
          >
            <option value="">Seleccionar...</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errores.categoria && <p className="error-mensaje">{errores.categoria}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="fechaPublicacion">Fecha de Publicación:</label>
          <input
            id="fechaPublicacion"
            type="date"
            value={revista?.fechaDePublicacion || ""}
            onChange={(e) => setRevista({ ...revista, fechaDePublicacion: e.target.value })}
            required
          />
          {errores.fechaPublicacion && <p className="error-mensaje">{errores.fechaPublicacion}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="ejemplares">Ejemplares:</label>
          <input
            id="ejemplares"
            type="number"
            min="1"
            value={revista?.ejemplares || ""}
            onChange={(e) => setRevista({ ...revista, ejemplares: parseInt(e.target.value, 10) })}
            required
          />
          {errores.ejemplares && <p className="error-mensaje">{errores.ejemplares}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="portada">Portada:</label>
          <input
            id="portada"
            type="file"
            onChange={(e) => e.target.files && setPortada(e.target.files[0])}
            accept="image/*"
          />
          {errores.portada && <p className="error-mensaje">{errores.portada}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Crear Revista"}
        </button>
      </form>
    </div>
  );
};

export default RevistaForm;
