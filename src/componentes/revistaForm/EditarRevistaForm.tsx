import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./RevistaForm.css";

const CATEGORIAS = [
  "Ciencia",
  "Tecnología",
  "Arte",
  "Historia",
  "Entretenimiento",
  "Deporte",
];

const EditarRevistaForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const [revista, setRevista] = useState<any | null>(null); // Almacenar la revista
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRevista = async () => {
      try {
        const response = await fetch(`/api/revistas/${id}`);
        const data = await response.json();
        setRevista(data);
      } catch (error) {
        console.error("Error al obtener la revista:", error);
        Swal.fire("Error", "No se pudo obtener la revista.", "error");
      }
    };

    if (id) {
      fetchRevista();
    }
  }, [id]);

  const actualizarRevista = async () => {
    setLoading(true);
    try {
      await fetch(`/api/revistas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(revista),
      });
      Swal.fire("Éxito", "Revista actualizada exitosamente.", "success");
      return <Navigate to="/" />;
    } catch (error) {
      console.error("Error al actualizar la revista:", error);
      Swal.fire("Error", "No se pudo actualizar la revista.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="revista-form-container">
      {revista ? (
        <form onSubmit={actualizarRevista}>
          <h2>Editar Revista</h2>

          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              id="titulo"
              type="text"
              value={revista.titulo || ""}
              onChange={(e) => setRevista({ ...revista, titulo: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              value={revista.categoria || ""}
              onChange={(e) => setRevista({ ...revista, categoria: e.target.value })}
              required
            >
              {CATEGORIAS.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Actualizar Revista"}
          </button>
        </form>
      ) : (
        <p>Cargando datos de la revista...</p>
      )}
    </div>
  );
};

export default EditarRevistaForm;
