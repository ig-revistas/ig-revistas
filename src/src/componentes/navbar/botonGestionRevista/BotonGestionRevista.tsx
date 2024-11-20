import React, { useState, useEffect, useRef } from 'react';
import './BotonGestionRevista.css';
import MenuGestionRevista from '../menuGestionRevista/MenuGestionRevista';

const BotonGestionRevista: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <div className="boton-gestion-revista-container" ref={menuRef}>
      <button className="gestion-revista-btn" onClick={handleMenuToggle}>
        Gestionar Revistas
      </button>

      {menuVisible && (
        <div className="menu-gestion-revista">
          <MenuGestionRevista />
        </div>
      )}
    </div>
  );
};

export default BotonGestionRevista;
