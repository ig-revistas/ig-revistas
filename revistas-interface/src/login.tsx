import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/authprovider";  
import axios from './api/axios';
import './login.css';

const LOGIN_URL = '/auth/generateToken';

const Login = () => {
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
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ 
                    username, 
                    password 
                }),
                { 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken); 
            }
            if (authContext) {
                authContext.setAuth({ 
                    isLoggedIn: true, 
                    user: { username,roles: ["USER_ROLE"] } 
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

    return (
        <> 
            { success ? (
                <section>
                    <h1>Se inició sesión!</h1>
                    <br />
                    <p>
                        <a href="#">Ir al usuario</a>
                    </p>
                </section>
            ) : ( 
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Inicia sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Usuario o Correo Electronico:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Iniciar</button>
                    </form>
                </section>
            )}
        </>    
    );
}

export default Login;
