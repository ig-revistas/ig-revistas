import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authprovider';
import Barrabusqueda from './barraBusqueda/Barrabusqueda';
import BurbujaDeUsuario from './BurbujaDeUsuario/BurbujaDeUsuario';
import MenuUsuario from '../menuUsuario/MenuUsuario';
import BotonGestionRevista from './botonGestionRevista/BotonGestionRevista';
import { Revista } from '../../tipos/Revista';
import './Navbar.css';

interface NavbarProps {
    revistas: Revista[];
}

const Navbar: React.FC<NavbarProps> = ({ revistas }) => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.auth.isLoggedIn;

    const [menuUsuarioVisible, setMenuUsuarioVisible] = useState(false);
    const usuarioMenuRef = useRef<HTMLLIElement>(null); 

    const isAdmin = () => {
        const rol = authContext?.auth.user?.roles;
        return rol?.includes('ADMIN_ROLE');
    };

    const toggleMenuUsuario = () => {
        setMenuUsuarioVisible(!menuUsuarioVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            usuarioMenuRef.current &&
            !usuarioMenuRef.current.contains(event.target as Node)
        ) {
            setMenuUsuarioVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                {isAdmin() && (
                    <li>
                        <BotonGestionRevista />
                    </li>
                )}
            </ul>

            <Barrabusqueda revistas={revistas} />

            <ul>
                {!isLoggedIn ? (
                    <li>
                        <Link className="registro" to="/Login">
                            Iniciar Sesion
                        </Link>
                    </li>
                ) : (
                    <li
                        onClick={toggleMenuUsuario}
                        ref={usuarioMenuRef} 
                        className="usuario-icono"
                    >
                        <BurbujaDeUsuario />
                        {menuUsuarioVisible && (
                            <div className="menu-container">
                                <MenuUsuario />
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
