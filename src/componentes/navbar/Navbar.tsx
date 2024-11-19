import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authprovider';
import Barrabusqueda from './barraBusqueda/Barrabusqueda';
import { Revista } from '../../tipos/Revista';
import './Navbar.css';

interface NavbarProps {
    revistas: Revista[];
}

const Navbar: React.FC<NavbarProps> = ({ revistas }) => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext?.auth.isLoggedIn;

    const [menuVisible, setMenuVisible] = useState(false);

    const isAdmin = () => {
        const rol = authContext?.auth.user?.roles;
        return rol?.includes('ADMIN_ROLE');
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                {isAdmin() && (
                    <li className="gestion-revistas">
                        <button onClick={toggleMenu}>Gestión de Revistas</button>
                        {menuVisible && (
                            <div className="menu-opciones">
                                <div className="card">
                                    <ul className="list">
                                        <li className="element">
                                            <Link to="/new_revista">Nueva Revista</Link>
                                        </li>
                                        <li className="element">
                                            <Link to="/editar-revista">Editar Revista</Link>
                                        </li>
                                        <li className="element">
                                            <Link to="/eliminar_revista">Eliminar Revista</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </li>
                )}
            </ul>

            {/* Mostrar revistas en el home */}
            <Barrabusqueda revistas={revistas} />

            <ul>
                {!isLoggedIn ? (
                    <li>
                        <Link className="registro" to="/Login">
                            Iniciar Sesión
                        </Link>
                    </li>
                ) : (
                    <li>
                        <button onClick={() => authContext?.cerrarSesion()}>
                            Cerrar Sesión
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
