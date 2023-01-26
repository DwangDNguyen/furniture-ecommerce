import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FaShoppingCart, FaUserPlus, FaUserMinus } from 'react-icons/fa';

import LogoImg from '../../../assets/image/logo.221f6b13e6eaaad5828372464f73a1a4.svg';
import Button from '~/components/Button';

import { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '~/context/AuthContext';
import { clearCart } from '~/redux/cartRedux';

const cx = classNames.bind(styles);

function Header() {
    const quantity = useSelector((state) => state.cart.quantity);
    // const dispatchCart = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(AuthContext);
    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: currentUser,
        });
        // dispatchCart(clearCart());
    };
    return (
        <header className={cx('wrapper')}>
            <nav className={cx('header-content')}>
                <div className={cx('header-logo')}>
                    <img src={LogoImg} alt="logo" />
                </div>
                <ul className={cx('header-list')}>
                    <li className={cx('header-items')}>
                        <Button href="/">Home</Button>
                    </li>
                    <li className={cx('header-items')}>
                        <Button href="/about">About</Button>
                    </li>
                    <li className={cx('header-items')}>
                        <Button href="/products">Products</Button>
                    </li>
                    {currentUser ? (
                        <li className={cx('header-items')}>
                            <Button href="/checkout">Checkout</Button>
                        </li>
                    ) : null}
                </ul>
                <div className={cx('header-cart-wrapper')}>
                    <Button href="/cart" className={cx('cart-btn')} rightIcon={<FaShoppingCart />}>
                        Cart
                        <span className={cx('badge')}>{quantity}</span>
                    </Button>
                    {currentUser ? (
                        <Button href="/login" rightIcon={<FaUserMinus />} onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button href="/login" rightIcon={<FaUserPlus />}>
                            Login
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
