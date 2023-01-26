// import HeaderPath from '~/components/Layout/components/HeaderPath';
import { useState, useEffect } from 'react';

import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import Button from '~/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/components/firebase/fire';

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);

function Register() {
    const initialValues = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    };
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showingAlert, setShowingAlert] = useState(false);
    // const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, username, password, confirmPassword } = values;
        setFormErrors(validate(values));
        setIsSubmit(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => navigate('/login'))
            .catch((error) => console.log(error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setShowingAlert(true);
            setTimeout(() => {
                setShowingAlert(false);
            }, 3000);
        }
    }, [formErrors]);

    // useEffect(() => {
    //   if(isSubmit){}
    // })

    const validate = (value) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.username) {
            error.username = 'Please enter this information';
        }
        if (!value.email) {
            error.email = 'Please enter this information';
        } else if (!regex.test(value.email)) {
            error.email = 'This is not a valid email format';
        }
        if (!value.password) {
            error.password = 'Please enter this information';
        } else if (value.password.length < 6) {
            error.password = 'Password must be more than 6 characters';
        }
        if (!value.confirmPassword) {
            error.confirmPassword = 'Please enter this information';
        } else if (value.confirmPassword !== value.password) {
            error.confirmPassword = 'Please enter the correct password';
        }
        return error;
    };

    return (
        <>
            <Header />
            <div className={cx('register')}>
                {Object.keys(formErrors).length === 0 && isSubmit && showingAlert ? (
                    <div className={cx('success')}>Signed up Successfully</div>
                ) : null}
                <div className={cx('register-container')}>
                    <form className={cx('register-form')} onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            autoFocus
                            value={values.username}
                            onChange={handleChange}
                        />
                        <span class={cx('error')}>{formErrors.username}</span>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            autoFocus
                            value={values.email}
                            onChange={handleChange}
                        />
                        <span class={cx('error')}>{formErrors.email}</span>

                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <span class={cx('error')}>{formErrors.password}</span>

                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                        />
                        <span class={cx('error')}>{formErrors.confirmPassword}</span>

                        <Button primary className={cx('register-btn')}>
                            Sign up
                        </Button>
                        <p className={cx('register-note')}>
                            Have an account?
                            <a href="/login"> Sign in</a>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;
