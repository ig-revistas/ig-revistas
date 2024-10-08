import { useRef, useState, useEffect } from "react";

const Login = () =>  {
    const userRef = useRef(); 
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState(''); 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); 
    
    useEffect(() => {
        userRef.current.focus(); 
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, password]); 

    return (
        <div>
            {                }
        </div>
    );
}

export default Login;

