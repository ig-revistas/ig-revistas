import { createContext, useState, ReactNode, useEffect } from "react";

interface User {
    id?: string; 
    name?: string; 
    roles?: string[]; 
    email?: string; 
    token?: string; 
    portadaUrl?: string; 
}

interface AuthContextType {
    auth: { isLoggedIn: boolean; user: User | null };
    setAuth: React.Dispatch<React.SetStateAction<{ isLoggedIn: boolean; user: User | null }>>; 
    cerrarSesion: () => void;
    actualizarFotoPerfil: (newFotoUrl: string) => void;  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Estado inicial basado en localStorage
    const [auth, setAuth] = useState<{ isLoggedIn: boolean; user: User | null }>({ isLoggedIn: false, user: null });

    // Cargar la información del usuario desde localStorage
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user') || '{}'); // Asegúrate de guardar la información del usuario también
            setAuth({ isLoggedIn: true, user });
        }
    }, []);

    const cerrarSesion = () => {
        setAuth({ isLoggedIn: false, user: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user'); // Elimina la información del usuario al cerrar sesión
    };

    const actualizarFotoPerfil = (newFotoUrl: string) => {
        if (auth.user) {  
            setAuth(prevState => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    portadaUrl: newFotoUrl || "/default.png", 
                }
            }));
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, cerrarSesion, actualizarFotoPerfil }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
