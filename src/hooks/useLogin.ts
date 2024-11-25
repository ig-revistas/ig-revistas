import { useState, useEffect, useRef, useContext } from "react";
import apiRevista from '../api/apiRevista';
import AuthContext from "../context/authprovider";
const LOGIN_URL = '/login';

interface LoginResponse {
    token: string;
    usuario: {
        id: string;  
        name: string;
        roles: string[];
        email: string;
        portadaUrl?: string;
    };
}

import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate(); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await apiRevista.post<LoginResponse>(
                LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const token = response.data.token;
            const userData = response.data.usuario;

            if (token) {
                localStorage.setItem('accessToken', token);
            }

            if (authContext) {
                authContext.setAuth({
                    isLoggedIn: true,
                    user: {
                        id: userData.id,
                        name: userData.name,
                        roles: userData.roles,
                        email: userData.email,
                        token: token,
                        portadaUrl: userData.portadaUrl,
                    },
                });
            }

            setUsername('');
            setPassword('');
            setLoading(false);

            navigate('/'); 
        } catch (err: any) {
            setLoading(false);

            if (!err?.response) {
                setErrMsg('El servidor no responde');
            } else if (err.response?.status === 400) {
                setErrMsg('Credenciales inválidas');
            } else if (err.response?.status === 401) {
                setErrMsg('No tienes autorización para hacer esto');
            } else {
                setErrMsg('Falló al iniciar sesión');
            }

            errRef.current?.focus();
        }
    };

    return {
        userRef,
        errRef,
        username,
        password,
        errMsg,
        loading,
        setUsername,
        setPassword,
        handleSubmit,
    };
};

export default useLogin;

