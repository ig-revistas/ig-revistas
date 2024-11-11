import React, { useContext } from 'react';
import AuthContext from '../../../context/authprovider';
import './BurbujaDeUsuario.css';

const BurbujaDeUsuario: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.auth.user;

    console.log("User data:", user);
    console.log("Portada URL:", user?.portadaUrl);

    return (
        <div className="burbuja-usuario">
            <img 
            src={user?.portadaUrl ? `http://localhost:8080${user.portadaUrl}` : "/default-avatar.png"} 
            alt="Avatar" 
            className="avatar" 
            />
            <span>{user?.name}</span>
        </div>
    );
};

export default BurbujaDeUsuario;