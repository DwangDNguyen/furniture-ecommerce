// import HeaderPath from '~/components/Layout/components/HeaderPath';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/components/firebase/fire';
import { AuthContext } from '~/context/AuthContext';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import Button from '~/components/Button';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);

function Login() {
    const initialValues = {
        email: '',
        password: '',
    };
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    // const [showingAlert, setShowingAlert] = useState(false);

    const { dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;
        setFormErrors(validate(values));
        setIsSubmit(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', payload: user });
            })
            .catch((error) => {
                setError(true);
            });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };

    const validate = (value) => {
        const error = {};
        if (!value.email) {
            error.email = 'Please enter this information';
        }
        if (!value.password) {
            error.password = 'Please enter this information';
        } else if (value.password.length < 6) {
            error.password = 'Password must be more than 6 characters';
        }
        return error;
    };
    useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }, [error]);
    return (
        <>
            <Header />
            <div className={cx('login')}>
                {error && <div className={cx('login-error')}>Error. Login Failed!!!</div>}
                <div className={cx('login-container')}>
                    <form className={cx('login-form')} onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                        />

                        <Button primary className={cx('login-btn')}>
                            Sign in
                        </Button>
                        <p className={cx('login-note')}>
                            Don't have an account?
                            <a href="/register"> Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
