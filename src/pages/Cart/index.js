import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import HeaderPath from '~/components/Layout/components/HeaderPath';
import AboutImg from '../../components/assets/image/hero-bcg-1.jpeg';
import Button from '~/components/Button';
import CartItem from '~/components/Layout/components/CartItem';
import NoCart from '~/components/Layout/components/NoCart';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';

import {
    addProduct,
    clearCart,
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    calculateTotals,
} from '~/redux/cartRedux';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
const cx = classNames.bind(styles);

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const quantity = useSelector((state) => state.cart.quantity);
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <Header />
            <HeaderPath text1="Cart" />
            <main className={cx('cart')}>
                <section className={cx('cart-container')}>
                    {quantity > 0 ? <CartItem cart={cart} currentUser={currentUser} quantity={quantity} /> : <NoCart />}
                </section>
            </main>
            <Footer />
        </>
    );
}
export default Cart;
