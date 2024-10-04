import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/authprovider";  
import axios from './api/axios';
import './login.css' 

const LOGIN_URL = '/auth/generateToken';

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null); 
    const errRef = useRef<HTMLDivElement>(null);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState('');
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
    }, [user, password]); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: password }),
                { 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            if (authContext) {
                authContext.setAuth({ isLoggedIn: true, user: { username: user, roles } });
            }
            setUser('');
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
                        <label htmlFor="username">Nombre De Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
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
