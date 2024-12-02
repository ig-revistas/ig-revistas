import React, { createContext, useState, ReactNode } from "react";

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
    const [auth, setAuth] = useState<{ isLoggedIn: boolean; user: User | null }>(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const user = { id: "1", name: "Usuario", roles: ["USER"], email: "user@example.com", token };
            return { isLoggedIn: true, user };
        }
        return { isLoggedIn: false, user: null };
    });

    const cerrarSesion = () => {
        setAuth({ isLoggedIn: false, user: null });
        localStorage.removeItem('accessToken');
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
