import { useState, useEffect, useRef, useContext } from "react";
import apiRevista from '../api/apiRevista';
import AuthContext from "../context/authprovider";

const LOGIN_URL = '/login';

// TODO
interface LoginResponse {
    token: string;
    usuario: {
        name: string;
        roles: string[];
        email: string;
    };
}

const useLogin = () => {
    const userRef = useRef<HTMLInputElement>(null); 
    const errRef = useRef<HTMLDivElement>(null);
    const authContext = useContext(AuthContext);

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); 

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
        console.log("Enviando JSON:", JSON.stringify({ username, password })); 
        try {
            const response = await apiRevista.post<LoginResponse>(LOGIN_URL,
                JSON.stringify({ username, password }),
                { 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response.data));

            const token = response.data.token;
            const userData = response.data.usuario; 
            
            if (token) {
                localStorage.setItem("accessToken", token); 
            }

            if (authContext) {
                authContext.setAuth({
                    isLoggedIn: true,
                    user: { 
                        name: userData.name,  
                        roles: userData.roles, 
                        email: userData.email,
                        token: token 
                    }
                });
            }

            setUsername(''); 
            setPassword('');
            setSuccess(true);

        } catch (err: any) {
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
        success,
        setUsername,
        setPassword,
        handleSubmit,
    };
};

export default useLogin;
