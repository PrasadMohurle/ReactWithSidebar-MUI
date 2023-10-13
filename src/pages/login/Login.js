import React, { useRef, useState, useEffect } from 'react';
import './login.scss';
import { Link } from 'react-router-dom';


const Login = ({setAuth}) => {
    const userRef = useRef();
    const errRef = useRef();

    const [email_address, setEmail_Address] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [login_pwd, setLogin_Pwd] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [errMsg, setErrMsg] = useState();

    useEffect(() => {
        userRef.current.focus();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }, []);

    useEffect(() => {
        setValidEmail(email_address);
    }, [email_address]);

    useEffect(() => {
        setValidPassword(login_pwd);
    }, [login_pwd]);

    useEffect(() => {
        setErrMsg('');
    }, [email_address, login_pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = { email_address, login_pwd };

            const response = await fetch('http://localhost:5005/auth/login', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem('token', parseRes.token);
                localStorage.setItem('role', parseRes.user_role);
                localStorage.setItem('username', parseRes.user_name);
                localStorage.setItem('email', parseRes.user_email);
                setAuth(true);
            } else {
                setErrMsg(parseRes.message);
                setAuth(false);  
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <div className="login">
                <div className="login-container">
                    <div className="title">LOGIN</div>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} >
                        {errMsg}
                    </p>
                    <form className='login-form' onSubmit={handleSubmit}> 
                        {/* -----USER EMAIL----- */}
                        <div className="form-input">
                            <label htmlFor="email_address">Email ID:</label>
                            <input
                                type="email"
                                id="email_address"
                                placeholder='your Email ID'
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail_Address(e.target.value)}
                                value={email_address}
                                required
                            />
                        </div>
                        
                        {/* -----PASSWORD----- */}
                        <div className="form-input">
                            <label htmlFor="login_pwd">Password:</label>
                            <input
                                type="password"
                                id="login_pwd"
                                placeholder='Your Password'
                                onChange={(e) => setLogin_Pwd(e.target.value)}
                                value={login_pwd}
                                required
                                />
                        </div>
                        <button disabled={!validEmail || !validPassword ? true : false}>
                            Login
                        </button>
                    </form>
                    <p>
                        Dont have Credentials?
                        <Link to={"/register"}> Click to Register.</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
