import { useContext } from 'react';
import AuthContext from '../context/authprovider';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
    children: React.ReactNode;
    rol: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children:children,  rol }) => {
    
    const authContext = useContext(AuthContext);
    
    const hasAccess=  ()=>{
        
            try {
              const userRoles=authContext?.auth.user?.roles;
                console.log('roles del usario:',userRoles)
              if (userRoles?.includes(rol)) {
                return true
                
              } else {
                console.error('Error al obtener el rol del usuario');
                return false
              }
            } catch (error) {
              console.error('Error en la petición para obtener el rol:', error);
              return false
            }
        
    };
      
    
    
    return (
        <>
            {hasAccess() ? (
                children  
            ) : (
             /*
              TODO : HAcer mensaje de avido "no tenes permiso, logiate."
              */
              <Navigate to="/login" />
            )}
        </>
    );
};

export default PrivateRoute;
