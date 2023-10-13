import React, { useRef, useState, useEffect } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';

//  Importing Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

//  Regular Expression
const USER_NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^\d{10}$/;

const Register = ({ setAuth }) => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [usernameFocus, setUserNameFocus] = useState(false);

    const [email_address, setEmail_Address] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [user_emailFocus, setUser_EmailFocus] = useState(false);

    const [login_pwd, setLogin_Pwd] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [match_login_pwd, setMatch_Login_Pwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [phone_number, setPhoneNumber] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    // const role = 'watcher';

    useEffect(() => {
        userRef.current.focus();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const result_user_name = USER_NAME_REGEX.test(username);
        setValidName(result_user_name);
    }, [username]);

    useEffect(() => {
        const result_email_address = USER_EMAIL_REGEX.test(email_address);
        setValidEmail(result_email_address);
    }, [email_address]);

    useEffect(() => {
        const result_user_password = PWD_REGEX.test(login_pwd);
        setValidPassword(result_user_password);
        const match = login_pwd === match_login_pwd;
        setValidMatch(match);
    }, [login_pwd, match_login_pwd]);

    useEffect(() => {
        const result_phone_number = PHONE_REGEX.test(phone_number);
        setValidPhone(result_phone_number);
    }, [phone_number]);

    useEffect(() => {
        setErrMsg('');
    }, [username, email_address, login_pwd, match_login_pwd, phone_number]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = USER_NAME_REGEX.test(username);
        const v2 = USER_EMAIL_REGEX.test(email_address);
        const v3 = PWD_REGEX.test(login_pwd);
        const v4 = PHONE_REGEX.test(phone_number);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg('Invalid Entry');
            return;
        }

        try {
            const body = { username, email_address, login_pwd, phone_number };

            const response = await fetch(
                'http://localhost:5005/auth/register',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem('token', parseRes.token);
                localStorage.setItem('role', parseRes.user_role);
                setAuth(true);
            } else {
                setAuth(false);
                setErrMsg(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };


    return (
        <>
            <div className="register">
                <div className="register-container">
                    <div className="title">REGISTER</div>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                        {errMsg}
                    </p>

                    <form className='register-form' onSubmit={handleSubmit}>
                        {/* -----USER NAME----- */}
                        <div className="form-input">
                            <label htmlFor="username">
                                User Name:
                                <CheckCircleIcon className={validName ? 'valid' : 'hide'} />
                                <CancelIcon className={ validName || !username ? 'hide' : 'invalid'} />
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserName(e.target.value)}
                                value={username}
                                required
                                onFocus={() => setUserNameFocus(true)}
                                onBlur={() => setUserNameFocus(false)}
                            />
                            <p
                                className={
                                    usernameFocus && username && !validName
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                                >
                                <InfoIcon className='info-icon'/>
                                4 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>

                        {/* -----USER EMAIL----- */}
                        <div className="form-input">
                            <label htmlFor="user_email">
                                Email ID:
                                <CheckCircleIcon className={validEmail ? 'valid' : 'hide'} />
                                <CancelIcon className={ validEmail || !email_address ? 'hide' : 'invalid' } />
                            </label>
                            <input
                                type="email"
                                id="email_address"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail_Address(e.target.value)}
                                value={email_address}
                                required
                                onFocus={() => setUser_EmailFocus(true)}
                                onBlur={() => setUser_EmailFocus(false)}
                            />
                            <p
                                className={
                                    user_emailFocus && email_address && !validEmail
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <InfoIcon className='info-icon'/>
                                Must begin with a letter.
                                <br />
                                Must contain @.
                                <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>

                        {/* -----PASSWORD----- */}
                        <div className="form-input">
                            <label htmlFor="login_pwd">
                                Password:
                                <CheckCircleIcon className={validPassword ? 'valid' : 'hide'} />
                                <CancelIcon className={ validPassword || !login_pwd ? 'hide' : 'invalid'} />
                            </label>
                            <input
                                type="password"
                                id="login_pwd"
                                onChange={(e) => setLogin_Pwd(e.target.value)}
                                value={login_pwd}
                                required
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p
                                className={
                                    passwordFocus && !validPassword
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <InfoIcon className='info-icon'/>
                                8 to 24 characters.
                                <br />
                                Must include uppercase and lowercase letters, a
                                number and a special character.
                                <br />
                                Allowed special characters: ! @ # $ %
                            </p>
                        </div>

                        {/* -----MATCH PASSWORD----- */}
                        <div className="form-input">
                            <label htmlFor="matchPassword">
                                Confirm Password:
                                <CheckCircleIcon className={ validMatch && match_login_pwd ? 'valid' : 'hide'} />
                                <CancelIcon className={ validMatch || !match_login_pwd ? 'hide' : 'invalid'} />
                            </label>
                            <input
                                type="password"
                                id="matchPassword"
                                onChange={(e) => setMatch_Login_Pwd(e.target.value)}
                                value={match_login_pwd}
                                required
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p
                                className={
                                    matchFocus && !validMatch
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <InfoIcon className='info-icon'/>
                                Must match the above password.
                            </p>
                        </div>    

                        {/* -----PHONE NUMBER----- */}
                        <div className="form-input">
                            <label htmlFor="phone_number">
                                Phone Number:
                                <CheckCircleIcon className={validPhone ? 'valid' : 'hide'}/>
                                <CancelIcon className={validPhone || !phone_number ? 'hide': 'invalid' }/>
                            </label>
                            <input
                                type="number"
                                id="phone_number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phone_number}
                                required
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false)}
                            />
                            <p
                                className={
                                    phoneFocus && phone_number && !validPhone
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <InfoIcon className='info-icon'/>
                                Please enter a 10-digit phone number.
                            </p>
                        </div>

                        <button
                            disabled={
                                !validName ||
                                !validEmail ||
                                !validPassword ||
                                !validMatch ||
                                !validPhone ? true : false
                            }
                        >
                            Register
                        </button>
                    </form>

                    <p>
                        Allready have Credentials?
                        <Link to={'/login'}> Click to Login.</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
