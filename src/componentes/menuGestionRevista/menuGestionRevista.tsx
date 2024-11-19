import React, { useState } from 'react';

const MenuGestionRevista: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); 

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible); 
  };

  return (
    <div className="card">
      <ul className="list">
        <li className="element" onClick={toggleMenu}>
          <svg
            className="lucide lucide-book"
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
            <path d="M6 2H18C18.55 2 19 2.45 19 3V21C19 21.55 18.55 22 18 22H6C5.45 22 5 21.55 5 21V3C5 2.45 5.45 2 6 2ZM6 4V20H18V4H6Z" />
          </svg>
          <p className="label">Gestión de Revistas</p> 
        </li>

        {isMenuVisible && (
          <ul className="sub-menu">
            <li className="sub-item">Nueva Revista</li>
            <li className="sub-item">Editar Revista</li>
            <li className="sub-item">Eliminar Revista</li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default MenuGestionRevista;