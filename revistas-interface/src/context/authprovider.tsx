import React, { createContext, useState, ReactNode } from "react";

interface User {
    username: string;
    roles: string[]; 
}

interface AuthContextType {
    auth: { isLoggedIn: boolean; user: User | null };
    setAuth: React.Dispatch<React.SetStateAction<{ isLoggedIn: boolean; user: User | null }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<{ isLoggedIn: boolean; user: User | null }>({
        isLoggedIn: false,
        user: null,
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
