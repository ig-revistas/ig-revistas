import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuGestionRevista.css';

const MenuGestionRevista: React.FC = () => {
  const navigate = useNavigate();

  const handleNuevaRevista = () => navigate('/new_revista');
  const handleListaRevistas = () => navigate('/revistas');
  const handlePendientes = () => navigate('/reservasPendientes');
  const handleAprobadas = () => navigate('/reservasAprobadas');
  const handleReporteRevistas = () => navigate('/reporte-revistas');
  const handleReporte = () => navigate('/reporte')
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
          <p>Reservas Pendientes</p>
        </li>
        <li className="menuGestionRevistaItem" onClick={handleAprobadas}>
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
          <p>Reservas Aprobadas</p>
        </li>
        <li className="menuGestionRevistaItem" onClick={handleReporteRevistas}>
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="8" y1="3" x2="8" y2="21"></line>
            <line x1="16" y1="3" x2="16" y2="21"></line>
          </svg>
          <p>Reporte Revistas</p>
        </li>
        
        <li className="menuGestionRevistaItem" onClick={handleReporte}>
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
          <p>Reporte</p>
        </li>
      </ul>
    </div>
  );
};

export default MenuGestionRevista;