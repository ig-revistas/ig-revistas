import { useState, useEffect, useRef } from "react";
import apiRevista from '../api/apiRevista';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const REGISTER_URL = '/registrarse';

interface RegisterResponse {
    accessToken: string;
}

export const useRegistro = () => {
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
            const response = await apiRevista.post<RegisterResponse>(REGISTER_URL,
                JSON.stringify({
                    name: usuario,
                    password: contrasena,
                    email: correo
                }),
                { 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log("Token de acceso:", response.data.accessToken);
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

    return {
        userRef, errRef, usuario, setUsuario, validNombre, usuarioFocus, setUsuarioFocus,
        correo, setCorreo, validCorreo, correoFocus, setCorreoFocus,
        contrasena, setContrasena, validContrasena, contrasenaFocus, setContrasenaFocus,
        confirmarContrasena, setConfirmarContrasena, validConfirmar, confirmarFocus, setConfirmarFocus,
        errMsg, exito, manejarEnvio
    };
};
