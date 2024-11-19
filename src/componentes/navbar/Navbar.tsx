import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authprovider';
import Barrabusqueda from './barraBusqueda/Barrabusqueda';
import BurbujaDeUsuario from './BurbujaDeUsuario/BurbujaDeUsuario';
import { Revista } from '../../tipos/Revista';
import './Navbar.css';
import MenuUsuario from '../menuUsuario/MenuUsuario'; 

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
                    <li>
                        <Link to='/new_revista'>Nueva Revista</Link>
                    </li>
                )}
            </ul>

            <Barrabusqueda revistas={revistas} />

            <ul>
                {!isLoggedIn ? (
                    <li>
                        <Link className='registro' to="/Login">Iniciar Sesion</Link>
                    </li>
                ) : (
                    <li onClick={toggleMenu} className="usuario-icono"> 
                        <BurbujaDeUsuario />
                    </li>
                )}
            </ul>

            {menuVisible && (
                <div className="menu-container"> 
                    <MenuUsuario />
                </div>
            )}
        </nav>
    );
}

export default Navbar;
