import React, { createContext, useState, ReactNode } from "react";

interface User {
    id: string;
    name: string;
    roles: string[];
    email: string;
    token: string;
    portadaUrl?: string;
}

interface AuthContextType {
    auth: { isLoggedIn: boolean; user: User | null };
    setAuth: React.Dispatch<React.SetStateAction<{ isLoggedIn: boolean; user: User | null }>>;
    cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<{ isLoggedIn: boolean; user: User | null }>({
        isLoggedIn: false,
        user: null,
    });

    const cerrarSesion = () => {
        setAuth({ isLoggedIn: false, user: null });
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
