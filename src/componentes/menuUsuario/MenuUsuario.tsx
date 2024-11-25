import React, { useContext } from 'react';
import AuthContext from "../../context/authprovider";
import { useNavigate } from 'react-router-dom';
import './MenuUsuario.css';

const MenuUsuario: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleCerrarSesion = () => {
    authContext?.cerrarSesion();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/revistas-reservadas');
  };

  return (
    <div className="menuUsuarioContainer">
      <ul className="menuUsuarioList">
        <li className="menuUsuarioItem" onClick={handleSettings}>
          <svg className="menuUsuarioIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a2 2 0 0 1 1.6 1.6 9 9 0 1 1-11.2-11.2A2 2 0 0 1 9 4.6a9 9 0 0 1 10.4 10.4z"></path>
          </svg>
          <p>Settings</p>
        </li>
        <li className="menuUsuarioItem" onClick={handleCerrarSesion}>
          <svg className="menuUsuarioIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <p>Cerrar Sesión</p>
        </li>
      </ul>
    </div>
  );
};

export default MenuUsuario;
