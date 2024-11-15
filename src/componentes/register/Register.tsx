import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useRegistro } from "../../hooks/useRegister";  
import './Register.css';

const Registro = () => {
    const {
        userRef, errRef, usuario, setUsuario, validNombre, usuarioFocus, setUsuarioFocus,
        correo, setCorreo, validCorreo, correoFocus, setCorreoFocus,
        contrasena, setContrasena, validContrasena, contrasenaFocus, setContrasenaFocus,
        confirmarContrasena, setConfirmarContrasena, validConfirmar, confirmarFocus, setConfirmarFocus,
        errMsg, exito, manejarEnvio
    } = useRegistro();  

    return (
        <>
            {exito ? (
                <section>
                    <h1>¡Éxito!</h1>
                    <p>
                        <Link to="/Login">Iniciar Sesión</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "mensaje-error" : "fuera-de-pantalla"} aria-live="assertive">{errMsg}</p>
                    <h1>Registro</h1>
                    <form onSubmit={manejarEnvio} className="formulario-registro">
                        <label htmlFor="usuario">
                            Usuario:
                            <FontAwesomeIcon icon={faCheck} className={validNombre ? "valido" : "oculto"} />
                            <FontAwesomeIcon icon={faTimes} className={validNombre || !usuario ? "oculto" : "invalido"} />
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
                            onFocus={() => setUsuarioFocus(true)}
                            onBlur={() => setUsuarioFocus(false)}
                        />
                        <p id="uidnote" className={usuarioFocus && usuario && !validNombre ? "instrucciones" : "fuera-de-pantalla"} >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 a 24 caracteres.<br />
                            Debe comenzar con una letra.<br />
                            Se permiten letras, números, guiones bajos y guiones.
                        </p>

                        <label htmlFor="correo">
                            Correo:
                            <FontAwesomeIcon icon={faCheck} className={validCorreo ? "valido" : "oculto"} />
                            <FontAwesomeIcon icon={faTimes} className={validCorreo || !correo ? "oculto" : "invalido"} />
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
                        <p className={correoFocus && !validCorreo ? "instrucciones" : "fuera-de-pantalla"} >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Debe ser un correo electrónico válido.
                        </p>

                        <label htmlFor="contrasena">
                            Contraseña:
                            <FontAwesomeIcon icon={faCheck} className={validContrasena ? "valido" : "oculto"} />
                            <FontAwesomeIcon icon={faTimes} className={validContrasena || !contrasena ? "oculto" : "invalido"} />
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
                        <p id="pwdnote" className={contrasenaFocus && !validContrasena ? "instrucciones" : "fuera-de-pantalla"} >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 a 24 caracteres.<br />
                            Debe incluir letras mayúsculas y minúsculas y un número.<br />
                        </p>

                        <label htmlFor="confirmar_contrasena">
                            Confirmar Contraseña:
                            <FontAwesomeIcon icon={faCheck} className={validConfirmar && confirmarContrasena ? "valido" : "oculto"} />
                            <FontAwesomeIcon icon={faTimes} className={validConfirmar || !confirmarContrasena ? "oculto" : "invalido"} />
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
                        <p id="confirmnote" className={confirmarFocus && !validConfirmar ? "instrucciones" : "fuera-de-pantalla"} >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Debe coincidir con el primer campo de contraseña.
                        </p>

                        <button disabled={!validNombre || !validCorreo || !validContrasena || !validConfirmar}>Registrarse</button>

                        <p className="ya-registrado">
                            ¿Ya estás registrado? <Link to="/login" className="enlace-iniciar-sesion">Iniciar Sesión</Link>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
};

export default Registro;
