import { Link } from 'react-router-dom';
import './Login.css';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const { 
        userRef, 
        errRef, 
        username, 
        password, 
        errMsg, 
        loading, 
        setUsername, 
        setPassword, 
        handleSubmit 
    } = useLogin();

    return (
        <div className="login-container">
            {loading ? (  
                <p>Cargando...</p>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form className="form" onSubmit={handleSubmit}>
                        <p id="heading">Login</p>

                        <div className="field">
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                placeholder="Usuario o Correo Electrónico"
                                required
                            />
                        </div>

                        <div className="field">
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Contraseña"
                                required
                            />
                        </div>

                        <div className="btn">
                            <button className="button1">Iniciar Sesión</button>
                            <Link to="/registro">
                                <button type="button" className="button2">Registrarse</button>
                            </Link>
                        </div>

                        <Link to="/solicitar-restauracion">
                        <button type="button" className="button3">Olvidé mi Contraseña</button>
                        </Link>
                    </form>
                </section>
            )}
        </div>
    );
};

export default Login;
