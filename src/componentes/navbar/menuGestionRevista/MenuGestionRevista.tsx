import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuGestionRevista.css';

const MenuGestionRevista: React.FC = () => {
  const navigate = useNavigate();

  const handleNuevaRevista = () => navigate('/new_revista');
  const handleListaRevistas = () => navigate('/revistas');
  const handlePendientes = () => navigate('/reservasPendientes'); // Lógica de "Pendiente"

  return (
    <div className="menuGestionRevistaContainer">
      <ul className="menuGestionRevistaList">
        <li className="menuGestionRevistaItem" onClick={handleNuevaRevista}>
          <svg
            className="menuGestionRevistaIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <p>Nueva Revista</p>
        </li>
        <li className="menuGestionRevistaItem" onClick={handleListaRevistas}>
          <svg
            className="menuGestionRevistaIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <p>Lista de Revistas</p>
        </li>
        <li className="menuGestionRevistaItem" onClick={handlePendientes}>
          <svg
            className="menuGestionRevistaIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <p>Reservas-Pendiente</p>
        </li>
      </ul>
    </div>
  );
};

export default MenuGestionRevista;
