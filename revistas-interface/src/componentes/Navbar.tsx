import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './css/Navbar.css';
import AuthContext from "../context/authprovider";

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);
    
    const isAdmin = () => {
        const rol = authContext?.auth.user?.roles;
        return rol?.includes('ADMIN_ROLE');
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
           
            <ul>
                <li>
                    <Link className='registro' to="/Login">Iniciar Sesion</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
