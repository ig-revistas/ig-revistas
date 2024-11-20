import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuGestionRevista.css';

const MenuGestionRevista: React.FC = () => {
  const navigate = useNavigate();

  const handleNuevaRevista = () => navigate('/new_revista');
  const handleListaRevistas = () => navigate('/revistas');

  return (
    <div className="menu-gestion-revista">
      <ul className="menu-gestion-revista-list">
        <li className="menu-gestion-revista-item" onClick={handleNuevaRevista}>
          <svg
            className="lucide lucide-plus-circle"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <p className="menu-gestion-revista-label">Nueva Revista</p>
        </li>
        <li className="menu-gestion-revista-item" onClick={handleListaRevistas}>
          <svg
            className="lucide lucide-list"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <p className="menu-gestion-revista-label">Lista de Revistas</p>
        </li>
      </ul>
    </div>
  );
};

export default MenuGestionRevista;
