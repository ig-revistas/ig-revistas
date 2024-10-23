import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';
import AuthContext from "../context/authprovider";

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);
    
    
    const isAdmin=()=>{
        const rol=authContext?.auth.user?.roles;
        return rol?.includes('ROL_ADMIN')
    }

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                
                    <li>
                        <Link to='/new_revista'>Nueva Revista</Link>
                    </li>
                 
            </ul>
           
            <ul >
                <li>
                    <Link className='registro' to="/registro">Registro</Link>
                </li>
            </ul>
            
                
        </nav>
    );
}

export default Navbar;
