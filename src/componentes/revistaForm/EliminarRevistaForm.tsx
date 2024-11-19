import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const EliminarRevistaForm: React.FC = () => {
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

  const eliminarRevista = async () => {
    setLoading(true);
    try {
      await fetch(`/api/revistas/${id}`, {
        method: "DELETE",
      });
      Swal.fire("Éxito", "Revista eliminada exitosamente.", "success");
      return <Navigate to="/" />;  // Redirigir a la página principal
    } catch (error) {
      console.error("Error al eliminar la revista:", error);
      Swal.fire("Error", "No se pudo eliminar la revista.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="revista-form-container">
      {revista ? (
        <div>
          <h2>¿Estás seguro de que quieres eliminar esta revista?</h2>
          <p>{revista.titulo}</p>
          <button onClick={eliminarRevista} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar Revista"}
          </button>
        </div>
      ) : (
        <p>Cargando datos de la revista...</p>
      )}
    </div>
  );
};

export default EliminarRevistaForm;
