import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './register.css'
import axios from './api/axios';
import { Link } from 'react-router-dom';

interface RegisterResponse {
    accessToken: string;
}

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const REGISTER_URL = '/auth/Registrarse';

const Registro = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [usuario, setUsuario] = useState<string>('');
    const [validNombre, setValidNombre] = useState<boolean>(false);
    const [usuarioFocus, setUsuarioFocus] = useState<boolean>(false);

    const [correo, setCorreo] = useState<string>('');
    const [validCorreo, setValidCorreo] = useState<boolean>(false);
    const [correoFocus, setCorreoFocus] = useState<boolean>(false);

    const [contrasena, setContrasena] = useState<string>('');
    const [validContrasena, setValidContrasena] = useState<boolean>(false);
    const [contrasenaFocus, setContrasenaFocus] = useState<boolean>(false);

    const [confirmarContrasena, setConfirmarContrasena] = useState<string>('');
    const [validConfirmar, setValidConfirmar] = useState<boolean>(false);
    const [confirmarFocus, setConfirmarFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>('');
    const [exito, setExito] = useState<boolean>(false);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setValidNombre(USER_REGEX.test(usuario));
    }, [usuario]);

    useEffect(() => {
        setValidCorreo(EMAIL_REGEX.test(correo));
        setValidContrasena(PWD_REGEX.test(contrasena));
        setValidConfirmar(contrasena === confirmarContrasena);
    }, [correo, contrasena, confirmarContrasena]);

    useEffect(() => {
        setErrMsg('');
    }, [usuario, correo, contrasena, confirmarContrasena]);
    
    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(usuario);
        const v2 = PWD_REGEX.test(contrasena);
        if (!v1 || !validCorreo || !v2) {
            setErrMsg("Entrada no válida");
            return;
        }
        try {
            const response = await axios.post<RegisterResponse>(REGISTER_URL,
                JSON.stringify({
                    name: usuario,
                    email: correo,
                    password: contrasena,
                    roles: "ROLE_USER"
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.data.accessToken); 
            setExito(true);
            setUsuario('');
            setCorreo('');
            setContrasena('');
            setConfirmarContrasena('');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else if (err.response?.status === 409) {
                setErrMsg('Usuario ya tomado');
            } else {
                setErrMsg('Registro fallido');
            }
            errRef.current?.focus();
        }
    };
    

    return (
        <>
            {exito ? (
                <section>
                    <h1>¡Éxito!</h1>
                    <p>
                        <Link to="/login">Iniciar Sesión</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Registro</h1>
                    <form onSubmit={manejarEnvio}>
                        <label htmlFor="usuario">
                            Usuario:
                            <FontAwesomeIcon icon={faCheck} className={validNombre ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validNombre || !usuario ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsuario(e.target.value)}
                            value={usuario}
                            required
                            aria-invalid={validNombre ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUsuarioFocus(true)}
                            onBlur={() => setUsuarioFocus(false)}
                        />
                        <p id="uidnote" className={usuarioFocus && usuario && !validNombre ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 a 24 caracteres.<br />
                            Debe comenzar con una letra.<br />
                            Se permiten letras, números, guiones bajos y guiones.
                        </p>

                        <label htmlFor="correo">
                            Correo:
                            <FontAwesomeIcon icon={faCheck} className={validCorreo ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCorreo || !correo ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="correo"
                            onChange={(e) => setCorreo(e.target.value)}
                            value={correo}
                            required
                            aria-invalid={validCorreo ? "false" : "true"}
                            onFocus={() => setCorreoFocus(true)}
                            onBlur={() => setCorreoFocus(false)}
                        />
                        <p className={correoFocus && !validCorreo ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Debe ser un correo electrónico válido.
                        </p>

                        <label htmlFor="contrasena">
                            Contraseña:
                            <FontAwesomeIcon icon={faCheck} className={validContrasena ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validContrasena || !contrasena ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="contrasena"
                            onChange={(e) => setContrasena(e.target.value)}
                            value={contrasena}
                            required
                            aria-invalid={validContrasena ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setContrasenaFocus(true)}
                            onBlur={() => setContrasenaFocus(false)}
                        />
                        <p id="pwdnote" className={contrasenaFocus && !validContrasena ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 a 24 caracteres.<br />
                            Debe incluir letras mayúsculas y minúsculas y un número.<br />
                        </p>

                        <label htmlFor="confirmar_contrasena">
                            Confirmar Contraseña:
                            <FontAwesomeIcon icon={faCheck} className={validConfirmar && confirmarContrasena ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validConfirmar || !confirmarContrasena ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirmar_contrasena"
                            onChange={(e) => setConfirmarContrasena(e.target.value)}
                            value={confirmarContrasena}
                            required
                            aria-invalid={validConfirmar ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setConfirmarFocus(true)}
                            onBlur={() => setConfirmarFocus(false)}
                        />
                        <p id="confirmnote" className={confirmarFocus && !validConfirmar ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Debe coincidir con el primer campo de contraseña.
                        </p>

                        <button disabled={!validNombre || !validCorreo || !validContrasena || !validConfirmar}>Registrarse</button>
                    </form>
                    <p>
                        ¿Ya estás registrado?<br />
                        <span className="line">
                            <Link to="/login">Iniciar Sesión</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Registro;
