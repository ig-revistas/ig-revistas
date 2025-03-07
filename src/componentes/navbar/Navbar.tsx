import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const [menuUsuarioVisible, setMenuUsuarioVisible] = useState(false);
    const usuarioMenuRef = useRef<HTMLLIElement>(null);

    const isAdmin = () => authContext?.auth.user?.roles?.includes('ADMIN_ROLE');
    const isUser = () => authContext?.auth.user?.roles?.includes('USER_ROLE');

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

    const handleRevistasReservadas = () => {
        navigate('/revistas-reservadas');
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
                    <Link to="/">Catálogo</Link>
                </li>

                {isAdmin() && (
                    <li>
                        <BotonGestionRevista />
                    </li>
                )}
                {isUser() && (
                    <li>
                        <button
                            className="boton-revistas-reservadas"
                            onClick={handleRevistasReservadas}
                        >
                            Mis Revistas
                        </button>
                    </li>
                )}
            </ul>

            <Barrabusqueda revistas={revistas} />
              
            <ul>
                {!authContext?.auth.isLoggedIn ? (
                    <li>
                        <Link className="registro" to="/Login">
                            Iniciar Sesión
                        </Link>
                    </li>
                ) : (
                    <li
                        onClick={toggleMenuUsuario}
                        ref={usuarioMenuRef}
                        className="usuario-icono"
                    >
                        {authContext?.auth.user?.portadaUrl ? (
                            <>
                                <img
                                    src={`http://localhost:8080${authContext.auth.user.portadaUrl}`}
                                    alt={`Foto de perfil de ${authContext.auth.user.name || 'Usuario'}`}
                                    className="perfil-avatar"
                                    onError={(e) => {
                                        console.error('Error al cargar imagen:', e.currentTarget.src);
                                        e.currentTarget.src = '/default.png';
                                    }}
                                />
                                <span>{authContext.auth.user.name}</span>
                            </>
                        ) : (
                            <BurbujaDeUsuario />
                        )}
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